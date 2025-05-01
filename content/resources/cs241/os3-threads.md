+++
title = "OS3 - Threads"
+++

We've already covered *processes*, which are representations of programs in execution, each with their own portion of memory and only connected by shared memory or tree structure. But what if we want to run multiple instances of the same code, within the same memory space?

Well, usually when we want to do the same thing over and over again in program code, we either use a loop or recursion. However, *this is still sequential* and not particularly well-optimised for certain scenarios. Even multiple processes may not run in parallel. **This is what threads aim to fix.**

A **Thread** is the representation of a single unit of CPU execution. Most of the time, the code we write is *single-threaded*, meaning there's only one line of execution running in our process, including when we use if, for or while statements. **Multi-threading** means a single process uses more than one thread. Each such thread shares the same code, data and I/O access, but they have their own registers, program counter, thread ID and call stack, allowing them to execute code independently from one another.

Thread creation introduces far less overhead than creating a new process via `fork()` or similar, and allow much easier sharing of resources. So, threads are very useful for *parallel processing* within an application, and help break up the components of a program. Processes are used to separate different programs, whereas threads are a tool for individual programs to boost their own performance.

## Threads on the web? Why are we talking about spiders?

Almost any web server (or server in general, really) utilises threads, again, due to the lower overhead of creation compared to processes, resource sharing, and greater scalability. Their hardware is also tailored to maximising parallel processing of dozens of threads, with up to hundreds of cores in recent server/workstation grade CPUs.

### A thread for a request, and a tooth for an eye

**One-thread-per-request** strategy means software is designed such that a new thread is made for each request that comes into the web server. The processing for the request is handled by that thread, before sending the output to the recipient and terminating. If lots of requests come into the web server, this can drastically slow down the server as it will end up handling a number of threads greater than what it can handle in parallel, meaning lots of switching may occur. An overwhelmingly large number of requests (i.e. thousands) may generate so many threads that the program becomes unstable.

### Pool's closed.

**Thread Pooling** uses a pre-determined number of *worker threads* along with a *main server thread* and a request queue. The main thread takes in requests and packages them into a format that is enqueued for the worker threads to process once one is free. When a request is complete, the worker thread will simply wait until a new request can be dequeued for them to work on, until the entire process terminates. This is overall slightly faster than one-thread-per-request as the overhead for making new threads is already accounted for, and the pre-determined number of threads makes it easier to gauge memory usage and performance. Nonetheless, some requests may have to wait for a worker thread to become available, and determining the correct number of workers is not exactly trivial.

### The infinite customer service desk

To compare these two strategies, imagine a customer service office (easy for me, having survived a few months in one). There are of course, a finite number of representatives who are available to take calls, and some may be busy doing other tasks, like writing a report, chasing down clients, or having a liquid lunch with their mates.

Under the one-thread-per-request strategy, callers are immediately sent to each representative's phone. This may initially cause seemingly lower wait times, but this would put additional stress on the representatives, who may have to make customers wait, or swap between multiple callers. Eventually, it becomes too chaotic to manage all of the calls.

With thread-pooling, callers will have to wait in a queue before they are passed to a representative, which only happens once one is idle (i.e. they're not currently on the phone). This makes life a good bit easier for the representatives, and in the long run, improves the experience for the customer, as they don't have to put up with the representative juggling multiple calls. Of course, the manager needs to make sure they've hired enough representatives for the job, but then again, some quick five-minute training sessions should do the trick.

## Household Chores Vs Ambidexterity

When we talk about doing multiple things at the same time, we talk about **Concurrency** and **Parallelism**.

We've already mentioned **concurrency**, which essentially refers to performing multiple jobs with overlapping completion times. It's like doing jobs around the house: you may start by putting your laundry in the washing machine, then cleaning your dishes, then cleaning the floor. You'll go back to the washing machine once it finishes its cycle, and put the washing in the dryer, then go back to cleaning the floor. In the context of an OS, threads may not necessarily be running at the same time, the CPU may switch between multiple threads over a single processing unit.

**Parallelism** is when things are literally running at the same time. It's like doing the dishes, cleaning the floor, and changing the batteries in the smoke detector at the same time. Impossible in humans, unless you're willing to submit to the will of a mad scientist (not judging). However, modern computers are more than capable of doing this, with four parallel processing units (or, cores) being the minimum for processors nowadays.

Remember that concurrency and parallelism are not mutually exclusive, nor are they dependent on each other.

## Parallel numbers and parallel dishes

You may need to distinguish between **Data parallelism** and **Task parallelism**. **Data parallelism** refers to when distinct data is processed using the same set of instructions in parallel, whereas **task parallelism** is where processing units are all working on different tasks. This distinction is particularly important from a hardware standpoint, particularly in the world of GPUs, which are optimised for data-level parallelism (if you took CS257, you should already know this!).

## Amdahl's Law (because speeeeeeeeed)

We humans like to put things into metrics (except those folks who can't stop talking about feet), so Amdahl's law describes how much a program could speed up if we multithread it. Suppose we have $N$ processing units, then we can split up the parallel-isable code among them, but we still have to account for some $S$ time that has to be ran sequentially (so we can't parallelise it). Then, Amdahl's Law states...

$speedup \leq \frac{1}{S + \frac{(1-S)}{N}}$

In simple terms, divide the parallelisable task time ($1-S$) by $N$, and add the time for the sequential part $S$. This gives you a maximum factor by which you can expect your program to run.

