+++
title = "OS2 - Processes"
+++

In order to run a **Program**, a *passive entity* that is stored on a disk, we must load it into memory, where it becomes a **Process**, which is active. A program can create multiple processes, e.g. by running multiple instances of it. Processes are what allow operating systems to run any sort of application, they define how running applications are stored in memory and how to manage them.

## A memory of a process

Each process is allocated its own address space in which it can store data, alongside some metadata such as a process ID. This data is split into four sections:

- **Text** - The program's code
- **Data** - Globally accessible variables
- **Heap** - Used for dynamic memory allocation, think `malloc`.
- **Stack** - Temporary data, such as function parameters, local variables or return addresses.

This data is stored in this order, starting with the Text data, ending with the last of the stack. Some additional empty space is allocated between the heap and stack to allow for the growing and shrinking of both of these portions of the process, since these will always require dynamic sizing.

## Stating the Obvious

A process may be in one of five states:

- **New** - The process is being loaded into memory. It is ready once it is *admitted*.
- **Ready** - The process is waiting to be *scheduled* for processing time.
- **Running** - The process is running on at least one processor, until its allocated time runs out, it is ready to *terminate*, or it needs to *wait* for something else to finish.
- **Waiting** - The process is waiting for the completion of some event or IO task.
- **Terminated** - The process is done executing, the address space can be used for something else.

## The way of PCBs

A **Process Control Block**, or PCB for short, is a representation of the process, and contains useful metadata used by the operating system, including:

- **Process State** - See [Above](#stating-the-obvious)
- **Program Counter** - Location of next instruction
- **CPU Registers** - Values inside registers
- **CPU Scheduling Information** - Such as priority number, queue pointers, etc.
- **Memory Management Information** - How much memory space has been allocated to this process
- **Accounting Information** - Process IDs, and how much of the other resources is this process using? (Think Task Manager)
- **I/O Status** - What files does this process have open? What I/O devices is it using?

As we will see later on, the CPU needs to be able to swap out processes that are currently running and let other ones run: the process of switching out processes like this is called **Context Switching**. In a Context Switch, a process will capture the state of the currently running process in its associated PCB, and load the the state of the process it then wants to run next. The other data in the PCB then allows the next process to begin/resume as if it had always been running.

Context switching *is* an overhead, as the CPU does no useful work as a switch takes place. The impact of a switch is dependent on the complexity of the OS and PCB, and the hardware's ability to handle them. For instance, the Sun UltraSPARC systems use multiple sets of CPU registers so that performing a context switch is as simple as incrementing a pointer.

## Getting ahead of schedule

If it's possible to swap out which process we're currently running, we surely need a way to schedule which process runs when, right? We will get more into CPU scheduling later, but for now we will mention **Process Scheduling** in the context of resource utilisation. To maximise utilisation, most current-day OSs use concurrency to run multiple processes more efficiently.

The concept of *concurrency* can be thought of as being analogous to cooking a meal. You may first put a roast joint in the oven, and while it cooks, you put some water on the stove to boil, and peel and chop some potatoes as it comes to a boil. You will return to the stove and oven once you are free and when it is relevant to do so. OSs do the same thing, just swap kitchen appliances for I/O devices.

**OS Schedulers** choose which processes will get what resources and when. This is particularly important when you consider capturing of data such as that from a keyboard, camera or display device: many processes may need to take turns with access to these. Such scheduling is mainly handled with three types of queue:

- **Ready Queue/Short Term Scheduler** - Processes in the *ready* state, selecting which process to execute next.
  - This is accessed very frequently, and as such needs to be fast. Invoking the short-term scheduler takes up a certain percentage of a given burst for when a process executes, so this needs to be reduced for the greatest efficiency.
- **Job Queue/Long Term Scheduler** - Processes in the *new* state, selecting which processes to bring into the *ready queue*.
  - Accessed infrequently, depending on how often and when new processes are added.
  - Tries to ensure a good mix of CPU-bound and I/O-bound processes are introduced, in order to get the best efficiency
- **Device Queues** - Processes *waiting* for I/O devices. There is one queue per I/O device.

When a process is running on the CPU, it will stop running once it makes an I/O request, forks a child (nonono not like that), begins waiting for an interrupt, or simply runs out of its allotted time. For each of these scenarios, the process will begin waiting, except for when it runs out of time, and become ready once it passes through the I/O queue and gets the data it needs, or once its child finishes executing (also not like that), or once it gets the interrupt it's expecting.

## The lifecycle of a Process

Wait, didn't we just cover the different states of a process? Yes, but we're yet to discover the joys of how a process is born, how it grows up, and eventually dies. And we wonder yet again why computers are so analogous to real life. Well, you know what they say, life imitates art.

### The joy of creation

Processes form a tree, a **process tree**, if you will, where a system will start by calling one process, usually the scheduler, followed by all of the other processes required on boot-up, which can then create more processes underneath it. Each process has its own unique positive integer value, called its **Process ID** (PID). This then results in a few different processes, including a set of user processes (once they've logged in, of course). When a user wants to create a process (in layman's terms, start discord, steam and TOR, all normal programs), usually a system process will create the process for them.

But what if we have a user process that wants to make a user process itself? This is where *system calls* come in handy. In the case of UNIX systems (aka Linux and Mac users), we use the `fork()` system call. This call will create a copy of the process, called a child process, and will then return the child's PID to the parent process, or a negative value if the call fails, since PIDs are always positive integers. Here's how we'd typically use `fork()` in C.

```c
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>

int main() {
    pid_t pid; // Defaults to 0
    printf("[PARENT] Creating Child Process...");
    pid = fork();
    if (pid < 0) {
        printf("[PARENT] Oops! Something went wrong.");
    } else if (pid == 0) {
        printf("[CHILD] Starting execution...");
        execlp("./child-stuff"); // May have other parameters...
    } else { // pid > 0
        wait(NULL);
        printf("[PARENT] Finished execution.");
    }
    return 0;
}
```

Again, `fork()` makes an exact copy of the process calling it, only changing the PID, hence why the child process sees it as 0 in its case. You may have noticed another system call, `execlp()`, this allows us to change the process data so that the process now runs different code. In this case, we're running `child-stuff`. This executable file will take the place of the C code that we've written, and instead run this new program.

It's possible to change how new user processes are created, including sharing resources between the parent and child, or restricting the child's resources to a subset of the parent's, or sharing no resources at all. They can also run concurrently or, like in the example above, the parent can wait until the child terminates. Just let them fly the nest already!

### Death waits for no RAM

Finally, once a process has ran its last statement, it **terminates**, or you can use `exit()` to do this manually, specifying an exit code (or status code) that gets returned to the parent process. Once a process terminates, its resources are released by the OS, ready for more processes to live happy lives only to suffer the same gorey fate.

What's a little more terrifying though, is there's some time between the child terminating and its parent receiving its exit code. In this time frame, the child is referred to as a **zombie process**. At this point, its resources are released, but its PID remains in the OS's process table, until the exit code is delivered to the parent process. This is making me think of baby zombies from Minecraft, probably one of the most annoying additions to the game.

But what if the parent terminates without waiting for the child? Well, they become Batman Processes. Wait no, **Orphan Processes**, sorry, far less fun name. And they don't save the world either, instead, the parent process is assigned something called the `init process`, which periodically calls `wait()` so that the orphan's exit code can be collected, and hence its PID can be removed from the process table.

Lastly, not to get politics involved, but it is also possible for a parent to call `abort()`, which terminates a child early. This may be used if a child is naughty and exceeds its allocated resources, the output of its task is no longer needed, or the parent terminates (referred to as **Cascading termination**).

## Let's Talk

Sometimes it's necessary to get processes talking to each other, i.e. establishing **Interprocess Communication** (IPC), such as sharing data if two processes are working on a collective goal, or one process relies on data coming from another. They don't engage in small talk, which in my book is a plus.

In short, there are two ways to share data between processes, **Shared Memory**, and **Message Passing**. In Shared Memory, both processes agree on a memory location where they can read from and write to, with the kernel having minimal involvement, other than allocating the location, and in Message Passing, the kernel provides a logical communication channel or message queue in which the two processes can use system calls to send and receive messages.

### Save us some space, will ya?

In **Shared Memory**, one process allocates a section of its own memory to be shared, which the kernel sets up, alongside the appropriate permissions for other processes to access it. Once such permissions have been set up, other processes may access that portion of memory, and no more intervention with the kernel is needed: the processes themselves are responsible for maintaining proper synchronisation.

### I can see you two passing notes to each other!

In **Message Passing**, processes use `send()` and `recieve()` operations to share information, usually done with system calls, and a message buffer provided by the kernel. The way these are implemented depending on whether the processes are to communicate *directly* or *indirectly*, synchronisation, and the allowed buffer size on which the processes can communicate.

For **Direct Communication**, processes address each other by *Process ID*, e.g. `sendTo(17723, "Can you come in here?")` and `receiveFrom(17722, &str)`. This establishes a link between two processes, and is done automatically. Hardcoding IDs is often not possible, since they can vary. **Indirect Communication** uses the concept of **Shared Mailboxes** or ports, where two processes agree on a single Mailbox ID over which to share messages. This allows more than two processes to "subscribe" to the same mailbox much more easily.

### All you can eat!

Quite commonly when talking about IPC, we model the **Producer-Consumer Paradigm**, where one process is a *Producer*, which creates information, and a *Consumer*, which consume's the producer's information. Any one process may be either a consumer or producer, or both. To pass information on, the shared memory is treated as a *buffer*, which the producer writes to, and the consumer reads from and empties. A circular queue may be implemented to handle this.

### Five, Six, Seven, PATRICIA!!

Depending on how we're using IPC, we may need to establish some sort of **Synchronisation** in communications.

**Blocking Calls** ensure synchronisation. A *Blocking Send* allows a sender to send a message, but it must then wait until it confirms that the recipient has received the message. A *Blocking Receive* forces a receiver to wait until it gets a valid message. This creates back-and-forth communication, ensuring all data is sent in-order.

The compliment then, **Non-blocking Calls**, allow senders and receivers to move messages around as they wish, *asynchronously*. *Non-blocking Sends* allow the sender to send messages and continue execution as normal, and *Non-blocking Receives* will always instantly get some output regardless of whether a valid message is in the buffer. As such, it is possible to get a null message.

Each of these types of calls can be used in any combination, e.g. you may use a non-blocking send, and a blocking receive, where a sender gives out message after message, while the receiver has to wait for valid messages to arrive before executing.

### I like big buffers and I cannot lie

Communication links are structured as buffers, which may have a size of zero, meaning a sender may only send one message at a time, waiting for the recipient to get it, or can be bounded, blocking sends up to a certain capacity, or can be unbounded. I wish my email inboxes were bounded sometimes...

### Got a call about some Pipes?

There are three ways to share information between processes: using `mmap`, ordinary pipes, and named pipes.

`mmap()` is a system call that, when ran with some additional parameters, allows multiple processes to write to the same memory pointer.

**Ordinary Pipes** are unique to UNIX, and allow a one-way transfer of information from a producer to a consumer. If you've ever used the `|` symbol in Linux, that's what an ordinary pipe is! These pipes are single-use and are destroyed once a transfer has completed.

**Named Pipes** are an upgrade to ordinary pipes, in that they remain even after a transfer has occured. And, as the name implies, they are named, and can be referenced by any relevant process. You can try out named pipes on Linux and Mac using the command `mkfifo named-pipe`, where the named pipe will appear in your current directory as if it were a file. Make sure to run `rm named-pipe` once you're done.

I spent an entire day writing this, I'm gonna go home now and process me some fucking fried rice.