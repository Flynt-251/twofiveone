+++
title = "OS5 - Scheduling"
+++

Processes enter a set of queues, as described previously, where they may be waiting for I/O or interrupts, or for CPU time. A process will typically alternate between bursts of CPU time and I/O bursts, in which time, the CPU can dedicate time to another waiting process. This section explains the different methods which may be used to schedule processes for CPU time.

## Setting some expectations

First we discuss how we measure how "good" a scheduling system is. There are five metrics:

- **CPU Utilisation** - How much time is the CPU spending doing work on processes while there are processes in the ready queue.
- **Throughput** - In a set time frame, how many processes complete execution.
- **Turnaround Time** - How long a process takes to complete.
- **Waiting Time** - How long a process spends in the ready queue.
- **Response Time** - Time taken from sending a request to receiving a response.

We also define two general types of scheduling: Non-preemptive and Preemptive. **Non-preemptive** schedulers assign one process during a CPU burst, and hold onto it for its duration. **Preemptive** schedulers, on the other hand, may interrupt the execution of a process to schedule another one, during a CPU burst.

Most modern OSs use preemptive schedulers, as they tend to be more responsive, however some additional considerations need to be made while using them, as multiple processes may be running together concurrently, causing race conditions and inconsistent updates of shared data. This is why we use existing synchronisation primitives, such as semaphores and mutex locks.

## First-come, First-served (FCFS)

*Non-preemptive*

A process is appended to the ready queue, in the order that it arrives. The next process in the queue is only assigned to the CPU, once the current one finishes execution.

> Suppose we queue processes $A$, $B$ and $C$, with burst times 15ms, 4ms and 4ms respectively.
>
> The waiting times for each are 0ms, 15ms and 19ms. This comes to an average of 11.3ms per process.
>
> However, if we swap the order such that the burst times are 4ms, 4ms and 15ms, the waiting time per process is reduced to 4ms.

So, the performance of FCFS is dependent on the order in which processes arrive into the ready queue, with shortest jobs first being favoured.

### Shortest Job First (SJF)

As processes are queued, they are sorted by ascending burst times so that the shortest job is completed first. If two processes have the same burst time, default to first-come first-served.

> Suppose we queue processes $A$, $B$ and $C$, with burst times 8ms, 17ms and 3ms respectively. These are sorted to give 3ms, 8ms and 17ms.
>
> The waiting times for each are 0ms, 3ms and 11ms, creating an average of 4.6ms. FCFS would cause an average wait time of 11ms.

SJF is provably optimal, especially compared to FCFS, but it comes with the overhead of needing to estimate the length of the next CPU burst: we cannot fully determine it.

#### Exponential Moving Average

This allows us to predict the size of the next CPU burst.

Suppose we have $t_n$, the length of the current CPU burst. We wish to find $\tau_{n+1}$, the predicted length of the next burst. We also define a constant factor $\alpha$ between 0 and 1 inclusive. We predict the length as such:

$\tau_{n+1} = \alpha t_n + (1 - \alpha ) \tau_n$

#### Preemptive or Non-preemptive?

We may run into a scenario where a new, shorter process arrives into the queue while a process is currently being executed. A **preemptive SJF** scheduler will immediately switch to the new process, whereas a **non-preemptive SJF** scheduler will let its current job finish first.

## Priority Scheduling

Processes are assigned a certain priority, which means some will be scheduled before others, based on how important they are. The CPU will be allocated the process in the ready queue, which has the highest priority. SJF is a type of priority scheduling, where the priority is the lowest CPU burst value. However, the issue with priority scheduling and by extension, SJF, is starvation, where a longer/lower priority process is never scheduled. This is fixed with **aging**, where processes increase in priority, the longer they have sat in the ready queue.

## Round Robin (RR)

*Preemptive*

Each process is given a slice of time to run, known as a time quantum $q$, after which that process is appended to the end of the ready queue, and the next process begins execution. This is typically done by order of arrival. Of $N$ processes in the queue, each process will get $1/N$ CPU time, in size $q$ chunks, waiting no more than $q(N-1)$ time for its next time slice.

It's important to set a proper time quantum, as you need to balance the overhead of performing a context switch (preempting), and ensuring the quantum isn't too long. If it's too small, the overhead will make scheduling inefficient, and if it's too big, scheduling will perform similar to FCFS, which is not optimal.