+++
title = "OS6 - Deadlocks"
+++

A deadlock is a scenario where two or more processes are waiting indefinitely for an event that is triggered by another process that is also waiting. It's like that awkward moment when you're texting a friend and you see them typing, so you wait for them to send their message first. Unbeknownst to you, they've done the same: they're waiting for you to stop typing as well. Now neither of you are talking!

Let's look at a (fairly simple) example.

- Process $P_1$ accesses Lock $L_1$, and Process $P_2$ accesses Lock $L_2$
- Process $P_1$ accesses Lock $L_2$, and Process $P_2$ accesses Lock $L_1$
- Both processes complete their critical section.
- Process $P_1$ unlocks Lock $L_1$, and Process $P_2$ unlocks Lock $L_2$
- Process $P_1$ unlocks Lock $L_2$, and Process $P_2$ unlocks Lock $L_1$

See the problem? Hint, you only need to look at the first two lines.

The first line is fine, no process has the locks for $L_1$ or $L_2$, but immediately afterwards, both processes try to access the lock that the other has. This causes them both to wait for each other, meaning we've stagnated.

## How it happens

- **Mutual Exclusion** - Only one process is allowed to access a unit of a resource.
- **Hold and Wait** - A situation must occur, where a process is holding a resource, and is waiting for more to release from other processes.
- **No Preemption** - A resource cannot be forcibly revoked from a process, it must surrender it on its own.
- **Circular Wait** - There is a set of processes where A waits for B, B waits for C, and so on, until the last process of the set is waiting for A.

## Resource Allocation Graph

Resource Allocation Graphs are directed, unweighted graphs that allow us to identify potential deadlocks both mathematically, and visually. There are two types of vertices: process vertices ($P$), and resource vertices ($R$) (which could be grouped if multiple instances are accessible). A **request edge** is an edge $P \rightarrow R$, and an **assignment edge** is an edge $R \rightarrow P$.

If there are no cycles in a resource allocation graph, there can never be a deadlock. But, even if there is a cycle, this is not sufficient evidence to show that a deadlock can occur.

(Hopefully some examples tomorrow...)

## Deadlock Detection Algorithm

- Create three table of $|P| \times |R|$ size, each called "Allocation", "Currently Available" and "Request".
  - The Allocation table contains all resource allocations that are granted to each process (given an allocation graph, for example). This may be resources that the processes immediately call `lock()` for.
  - The Request table contains all requests processes are making for other resources. This may be resources that the processes later request using `lock()`.
  - The Currently Available table contains all resources that have not been allocated.
- Additionally track boolean array "Finish" of size $|P|$. Set all values as false.
- Repeat until all elements in the Finish array are true:
  - Find a process $P_i$ in the Request table, where no resources are being requested. Set Finish[$i$] to true.
  - Add the values of the Allocation of $P_i$ to the table of Currently Available resources, then set the values of the allocation to 0 (i.e. $P_i$ surrenders its resources).
  - Check the Currently Available resources table to see if there is a process $P_j$ whose requests can be satisfied.
  - Subtract the requested resources from what is Currently Available, and add it to $P_j$'s current allocation.
- If at any point we cannot proceed, we have encountered a deadlock.

## Preventing Deadlocks

A lot of the time, we can stop deadlocks from happening by planning ahead and making good design choices. We will refer back to the necessary conditions for a deadlock.

We cannot stop *mutual exclusion*, as this is also a property of an ideal system using synchronisation. However, we can prevent *Hold and Wait* and *No Preemption* by ensuring that when a process requests resources, it does not currently hold any resources. If a process requests resources while it holds others, and such resources cannot be immediately allocated, then it should drop the resources it currently has. Furthermore, we can prevent *Circular Waits* by, for a numbering of processes 1 to $n$, ensuring that where process holding resource $i$ requests a resource $j$ held by another process, $i > j$.

It's important to remember that deadlock prevention is *restrictive*, as it relies on certain criteria being met, and may not allow some programs to operate in their intended manner. Furthermore, techniques such as prevention of circular wait may block a large number of harmless accesses to resources.

## Avoiding Deadlocks

While initially this sounds the same as *preventing* deadlocks, deadlock avoidance allows us to develop code where a deadlock is possible, but avoidable, so this is a more relaxed approach. Our method above for using a resource allocation graph is not suitable, as the presence of a cycle is not sufficient information to tell us if we will encounter a deadlock. Instead, we use the **banker's safety algorithm**.

### Money is deadly!

The banker's safety algorithm has the prerequisite of needing some information in advance about the allocation of resources at the start of running time, and each process must declare how much of each resource it will need at most. The algorithm then uses this information to make a decision as to whether a particular process may proceed to its critical section.

To start with, three matrices are created: Allocation, Max, and Available. Let $P$ be the set of processes and $R$ the set of unique resources (does not contain instances).
- **Allocation** - $|P| \times |R|$, the initial allocation of resources to each process.
- **Max** - $|P| \times |R|$, the maximum allocation each process has declared.
- **Available** - $|R|$, the number of instances of each resource that are available, after initial allocations are made.

From these, we calculate the matrix Need, from Max - Allocation. This tells us what each process will require, in order for it to finish execution and then surrender all its allocations. From this information, we check which process's needs can be satisfied, given what is left available. This produces a **safe sequence** in which we can allow the processes to run, without worry of a deadlock. Let's use the following example, where we have resources $\{A,B,C\}$, with 10, 5 and 7 instances respectively.

|     |Allocation| Max |Available|
|-----|----------|-----|---------|
|     |  A,B,C   |A,B,C|  A,B,C  |
|$P_0$|  0,1,0   |7,5,3|  3,3,2  |
|$P_1$|  2,0,0   |3,2,2|         |
|$P_2$|  3,0,2   |9,0,2|         |
|$P_3$|  2,1,1   |2,2,2|         |
|$P_4$|  0,0,2   |4,3,3|         |

First, we create the Needs matrix from Max - Allocation

|     |  Need |
|-----|-------|
|     | A,B,C |
|$P_0$| 7,*4*,3 |
|$P_1$| *1*,2,2 |
|$P_2$| *6*,0,*0* |
|$P_3$| *0,1,1* |
|$P_4$| 4,3,*1* |

Now we go through each process's needs, and see if we have the sufficient number of resources available.

- Not enough resources for $P_0$, needs 7,4,3, have 3,3,2.
- Enough resources for $P_1$, needs 1,2,2, have 3,3,2.
  - Append $P_1$ to the safe sequence, then add its allocation to what's available.
  - We now have 5,3,2 available.
- Not enough resources for $P_2$, needs 6,0,0, have 5,3,2.
- Enough resources for $P_3$, needs 0,1,1, have 5,3,2.
  - Append $P_3$ to the safe sequence, then add its allocation to what's available.
  - We now have 7,4,3 available.
- Enough resources for $P_4$, needs 4,3,1, have 7,4,3.
  - Append $P_4$ to the safe sequence, then add its allocation to what's available.
  - We now have 7,4,5 available.
- Enough resources for $P_0$, needs 7,4,3, have 7,4,5.
  - Append $P_0$ to the safe sequence, then add its allocation to what's available.
  - We now have 7,5,5 available.
- *Skip $P_1$, since this is already in the safe sequence.*
- Enough resources for $P_2$, needs 3,0,2, have 7,5,5.
  - Append $P_2$ to the safe sequence, then add its allocation to what's available.
  - We now have 10,5,7 available.

Hence, the safe sequence is $P_1, P_3, P_4, P_0, P_2$.

During execution, a process may request any number of additional resources it needs, up to its maximum. The algorithm will verify that it has the number of necessary available resources to fulfill the demand, and if so, its allocation will be updated, and the check as shown above will be repeated to ensure that a safe sequence exists. If it does, the request will be granted. If not, the process will have to wait.
