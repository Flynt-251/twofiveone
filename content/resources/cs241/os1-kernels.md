+++
title = "OS1 - Kernels"
+++

At the very core of any operating system, is the kernel. It's the first thing that's loaded into memory once your system has successfully booted, and it will continue running until your system shuts down. If you're on Windows, this will be the NT Kernel (Standing for New Technology, a term from the 90s...), for Mac users, the XNU Kernel, and for Linux users, some flavour of the Linux Kernel. Fun fact, there's a version of the core linux kernel codenamed "Sheep on Meth". Hopefully that's given you the motivation to keep reading.

The kernel is responsible for the general housekeeping of your system, namely memory management, task scheduling, managing drivers, etc. Without the kernel, there would be no way of interfacing the hardware of your computer with your programs and files. In the context of our *Restaurant Ouvert Souvent* analogy, the kernel is the kitchen of the restaurant.

## Concepts

- Kernel and User Space
- System Calls
- Dual Mode Operation
- Simple, Monolithic, Layered, Micro- and Modular Kernels

## In Space, no one can hear you Call

Memory is split into two overall Spaces, **Kernel Space**, and **User Space**. As the names imply, the Kernel will perform its operations within the Kernel Space, and User Programs will run in User Space. It's necessary to hide kernel space away from the user space, otherwise it may be possible to change the way the system operates, and make things very unstable, but, we still need a way of performing tasks that only the kernel is allowed to do. For this, we use **System Calls**, such as `fork()` or `malloc()`.

**System Calls** can be thought of as an API mapping user processes to the kernel, facilitating many low-level operations such as file manipulation, process calls, multithreading and memory allocation. The advantage of this is that these *privileged operations* can be performed safely without the worry of corrupting data or, again, causing system instability. System Calls are also consistent, especially on Linux where Linus Torvalds quite famously says, *"We do not break User Space!"*, or at least, that's how it's meant to work in theory. However, we can generally expect that `malloc()` on one OS, has the same behaviour as another.

To further prevent bad things from happening, most OSs use **Dual Mode operation**, where the validity of certain operations is determined by a *single bit* on your system. Sounds scary, but it's what prevents you from accidentally zeroing out all of your memory, or discovering the "spin" operation on your hard drive. When is bit is set to 1, you're in User Mode. When it's set to 0, you're in Kernel Mode. Whenever a user process makes a system call, this bit is flipped from 1 to 0, and the necessary hardware operation is performed, before flipping the bit back and continuing. If such an operation is requested while in User Mode, the OS knows this is an illegal operation and so can stop it properly.

## Kernels of all shapes, sizes and colours

![Yellow and Red Corn Lot, photo by Markus Winkler](/images/corn.jpg)

Wait no, wrong kernel.

Anyway, as they say, there's more than one way to skin a cat, and as such there's more than one way to write a kernel, and this is generally split into four categories: Monolithic, Layered, Microkernels, and Modular Kernels.

**Monolithic and Simple Kernels** are one of the earliest, and simplest types of kernels. As the name suggests, all necessary functionality for a system is bundled into the whole kernel, without any separation of concerns or clear modularisation. This was the kernel of choice for early variants of UNIX and MS-DOS.

While making the kernel significantly harder to debug, this was the appropriate choice of the time, as this approach introduces minimal overhead for system calls, which was important when you consider the fact that hardware was extremely limited at the time. There wasn't even any Dual-mode operation, so any application could perform system operations directly!

**Layered Kernals** are like Ogres, they make me cry. But the important thing here is, the code is split into *layers* that have dependencies between each other. For any layer $k$, that layer makes requests to layer $k-1$, and produces an output for layer $k+1$, where layer 0 is the *Hardware Layer*, and layer $n$ is the *User Interface Layer*. Each layer has its own function it handles. This kernel type is used for more recent UNIX-based systems.

This allows for much easier debugging and updating, and enables abstraction away from the hardware, allowing for clear interfaces between layers, but this comes at the cost of significant overhead, reducing efficiency. Plus, with all of the different operations that a kernel needs to perform, defining layers and placing different functions into each, is not trivial and requires significant planning.

**Microkernels** are portions of a kernel, that make up the whole kernel. Each microkernel has its own function that it performs, so each one is single-purpose, e.g. managing memory, performing CPU scheduling, etc. Any components that aren't necessary for the system to run (e.g. Disk Drive controller), are removed from the equation and are implemented as System or User programs, hence greatly reducing the overall kernel size. The Mach Operating System, which the XNU Kernel is based on, uses microkernels.

What this results in, is an Operating System that is very modular and easily extendable, with additional security benefit, as additional services such as a display controller, are ran in the User Space, ensuring no changes are made to the Kernel Space unnecessarily. Yet again, though, this modularity comes at the expense of overhead, hampering performance.

**Modular Kernals** are what most modern-day operating systems use. As implied by the name, a core kernel is created, which can interface with other kernel modules, including device drivers, file system managers, an additional system calls API and so on, with each of these modules being *dynamically loadable*, ensuring we only run what we need. This is in use on Linux and current-day Windows.



### Sources

*All pages use the module's resources*

Wikipedia -
[Kernel](https://en.wikipedia.org/wiki/Kernel_%28operating_system%29),
[System Call](https://en.wikipedia.org/wiki/System_call),
[Mach](https://en.wikipedia.org/wiki/Mach_(kernel)),
[Loadable Kernel Module](https://en.wikipedia.org/wiki/Loadable_kernel_module)

GeeksForGeeks - 
[Dual Mode Operation](https://www.geeksforgeeks.org/dual-mode-operations-os/),
[Layered OS](https://www.geeksforgeeks.org/layered-operating-system/),
[OS Structures](https://www.geeksforgeeks.org/different-approaches-or-structures-of-operating-systems/)

#### Images

Corn - Markus Winkler on [Unsplash](https://unsplash.com/photos/yellow-and-red-corn-lot-Hmcpg4cnSRA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash)