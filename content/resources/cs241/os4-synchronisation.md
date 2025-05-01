+++
title = "OS4 - Synchronisation"
+++

By this point, we've established that we can run multiple processes in parallel to save time, whether this is through threads, inter-process communication and any other means. However, we touched upon the issue of using **shared variables**. If two or more processes are accessing the same piece of data, we can't be certain about what steps will execute in what order: a **race condition** is created. For instance, if we have two threads in a process, one which updates a value to 1, the other 2, we can't be certain whether the final value is 1 or 2.

## Okay, this section is critical

If we have a set of processes (or threads), they may or may not have a **critical section**, where they update a shared variable. From this we have the **critical section problem** which is, given a set of processes that contain a critical section in their code, *how can we design a protocol that ensures no two processes run their critical section at the same time*? We need to be sure of the following when designing a solution:

- **Mutual Exclusion** - If a process, say $P_i$ is running its critical section, then this means that no other process is running its critical section.
- **Progress** - If there is a point in time where no critical section is being ran, and there is a process waiting to run its critical section, then such a waiting process is allowed to start it.
- **Bounded Waiting** - No process should be waiting indefinitely in order to complete its critical section while others can.

## Peterson's Algorithm

*No, not that Peterson.*

**Concept:** Alongside whatever shared variables you want to use, initialise a shared integer, which represents the next process that will run their critical section, and a boolean array of size $n$, equivalent to the number of concurrent processes, which stores each process's *wish* to run their critical section. This works for any number of processes.

### Pseudo C Code

**Shared variables**

```c
int turn;
int flag[2] = {0,0};
char shared[13];
// Recall C doesn't have booleans or strings
```

**Process 0**

```c
while (1) {
    flag[0] = 1; // I want to update shared data
    turn = 1; // But I will let process 1 finish first
    while (flag[1] && turn == 1) {
        wait(); // Arbitrary wait function
    }
    // Now I can run my critical section.
    shared = "Duck Season";
    flag[0] = 0; // I'm finished!
    // Now I will do other stuff...
}
```

**Process 1**

```c
while (1) {
    flag[1] = 1; // I want to update shared data
    turn = 0; // But I will let process 0 finish first
    while (flag[0] && turn == 0) {
        wait(); // Arbitrary wait function
    }
    // Now I can run my critical section.
    shared = "Rabbit Season";
    flag[1] = 0; // I'm finished!
    // Now I will do other stuff...
}
```

I'm personally against hunting, but you do you Process 0 and 1...

### Evaluation

- **Mutual exclusion** - We can see that each process will check the other's intent to update data, *and* whether or not they are still working, before running their own critical section, ensuring mutual exclusion.
- **Progress** - The code clearly shows that, if a process wants to complete its critical section, and no critical section is being ran, then the while loop ensure that this process is allowed to proceed.
- **Bounded Waiting** - The `turn` variables cycles between all processes, ensuring that any process only has to wait a full turn before being able to run its own critical section.

So, this is ideal according to our three properties, however, it's still not a great algorithm to use nowadays, firstly because it uses busy waiting, which means it repeatedly runs a loop that doesn't do anything useful. Very inefficient!

But what's worse is the fact this is likely to fail in your typical modern processor. If you've studied CS257, you'll know that some processors may swap the order in which memory is accessed, to improve performance. This leads to some out-of-order read and write operations, which could make this algorithm completely useless.

## Keeping it locked up

*And you locked in!*

Most commonly, concurrent programs use some form of locking mechanism, which operates under the premise that only one process may obtain a lock, and this process will release the lock for use by another process when it is finished running its critical section. Imagine this like a meeting room: if it is empty, anyone can go inside and use it to do what they need, and no one else may enter. Then, once they leave, another person/group can come in and use it.

```c
while (1) {
    acquire_lock();
    // Critical Section
    talk_about_spiders();
    // End Critical Section
    release_lock();
    // Do other stuff
}
```

The major challenge to this, is that the operations of acquiring and releasing the lock need to be **atomic**, i.e. either they do happen, or they don't, there's no half-complete. This time, modern hardware saves us, as most modern architectures provide such atomic instructions. The function `test_and_set()` is one such example, which returns a parameter, and sets a replacement value of `true` (or 1 in C).

```c
// There's no C implementation in the real world,
// this would all be done on hardware

int test_and_set(int *target) {
    int retVal = *target;
    *target = 1;
    return retVal;
}
```

And here's how it would be used in an example program, but note that this would not satisfy the need for bounded waiting. Some additional logic would be needed to identify what processes are waiting, and ensure the correct process goes next. Some of the logic from Peterson's algorithm would help here.

```c
// SHARED
int lock = 0;

while (1) {
    while (test_and_set(&lock))  {
        wait();
    }
    // Critical Section
    play_song("Yp8o35zahgo");
    lock = 0; // I'm done!
    // do other stuff
}
```

## Should've stayed in the primordial soup

Fortunately, we don't have to worry too much about implementing a locking system, as there are constructs that do a lot of the work for us, namely mutex locks, semaphores and condition variables.

### Mutex Locks

Mutex locks are very simple: they store a boolean value which determines whether or not a process has that lock, and a list of references to processes that are waiting to use the lock. If a process wishes to use the lock, then the boolean is toggled, and if another process is already using it, then the process will be added to the list, sort of like a queue. If a process releases a mutex lock, then the lock will take a waiting process out of the list, and send a signal to "wake it up", so to speak. It will then toggle the boolean to show it is available.

```c
while (1) {
    lock(&mutex);
    // Critical Section
    contemplate_choices();
    unlock(&mutex); // Done!
}
```

### Semaphores

Semaphores are more flexible than Mutex Locks, as they can be used in instances where more than one process can access a certain resource at a single time, such as a queue, as they store an integer value which corresponds to how many concurrent processes may use it. If this value is positive, the semaphore is available. Otherwise, it isn't.

Semaphores use the functions `wait()`, which waits until the semaphore holds a positive value, then decrements it by 1 (signalling that a process now has the lock), and `signal()`, which increments the semaphore's value by 1, signalling that a process is done using the semaphore. Similar to mutex locks, semaphores may store a list of processes to reference to ensure bounded waiting.

```c
struct semaphore S;
S.value = 4; // Four processes may access the semaphore at once

wait(&S);
// Critical Section
play_mario_kart();
signal(&S);
```

## Keeping it all working

There are three common issues when synchronising processes: Deadlocks, Starvation and Priority Inversion.

### Deadlocks

Besides sounding cool (and being referenced everywhere), a deadlock is where two or more processes wait indefinitely for something to happen. My personal favourite analogy for this is that moment when you're texting somebody, but see they are typing, so you wait for them to finish their message. However, they also see you typing and wait for you, and neither of you are writing. We'll talk more about deadlocks later.

### Starvation

Starvation happens when there is at least one process is waiting indefinitely to run its critical section. This can occur when one process is hogging a lock/semaphore, or when the lock itself wakes up the same process repeatedly. Starvation can be prevented by ensuring the lock picks a random process to wake up.

### Priority Inversion

While more relevant to scheduling (which is the next set of notes), priority inversion occurs when a lower-priority process blocks a higher-priority process from accessing a lock. This can be prevented by using priority-inheritance protocol.

## Synchronisation Problems

Let's say you manage to find a new way to synchronise a set of processes. How can you test it theoretically to ensure it works as it should?

### Bounded Buffer

Suppose you have $n$ buffers, each of which can hold one element. You have producer processes, who can write to a buffer and hence fill it, but they must wait if all buffers are full, until one becomes empty. Likewise, there are consumer buffers, which will read and remove elements from the buffers, but will have to wait if all buffers are empty.

This problem is particularly well-suited to the use of semaphores, and tests the performance shared between producers and consumers.

### Readers and Writers

Some data set is shared between two types of processes: readers, who have read-only access to the data, and writers, who may read or write to the data. Only one writer may access this data at any given time.

There are variations on this problem, and overall this problem allows us to consider the possibility of using multiple types of locking. In this case we assume readers are given priority, and writers are allowed to starve.

### Dining Philosophers

*aka, the most abstract and fun problem.*

Imagine a group of philosophers, who have decided to spend their lives, sat around a round table. On the table, there is a chopstick placed between each pair of philosophers, and in the center, a large plate of rice. At any time, a philosopher may think, or eat rice by picking up the chopsticks that are beside them. They put them back in their original positions once they are done.

For example, if we have five philosophers, then there are five chopsticks, all for one plate of rice. In this problem, you need to consider your strategy to prevent deadlocking, and allowing the philosophers to take turns in a way that prevents any of them from starving to death. This tests your ability to handle deadlocking.

Speaking of rice, does anyone else feel a bit hungry right now?