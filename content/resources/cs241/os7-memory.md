+++
title="OS7 - Memory Management"
+++

We stated, close to the start, that a program becomes a process once it is loaded into memory. But should we organise our processes so that we're making good use of memory? Well, for the most part, we want to allocate blocks of space that can be used as a (seemingly) contiguous chunk. We should also make sure each process is isolated: no process can peek inside another process's space. Most of them aren't into the idea of being spied on.

## Losing touch with reality

If you've printed a memory location out in C, you likely aren't seeing the actual address in memory. Rather, you're seeing the **logical address**. This is translated in hardware from the CPU, to a **physical address** for lookup in memory, using an **MMU**. The CPU can only see so much memory space at a time, so an MMU allows us to make use of even more memory. Older computers did a similar thing, by using a technique called *banking*.

Just as there are many ways to skin a feline or canine (as much as I would advise against either), there are many ways to allocate memory, namely contiguous allocation, segmentation and paging.

## When things fit nicely

**Contiguous memory allocation** is the easiest allocation method to understand. If we're loading a process, stick it as one whole block, wherever there's space, making sure to take note of the *base address*. The MMU's job then, is to make sure the CPU/OS doesn't exceed the limit of a location, and to translate a logical address to the base address, plus the offset.

### That's right, the square hole!

We can choose to split memory into discrete, fixed partitions in which one process may reside, and is freed on termination. There is of course, then, the issue that processes are limited by size, and we can run a fixed limit of processes.

On the other hand, we can make varying-sized partitions, and stick new processes wherever they will fit. Likewise, when a process terminates, it leaves a big, process-shaped *hole* where new processes can go. The OS has a few options for how it decides to allocate new processes:

- **First-fit** - Find the first place the process can go.
- **Best-fit** - Find the tightest fit possible to minimise leftover holes.
- **Worst-fit** - Use the largest hole available. This may be preferrable to make sure there is sufficient space for other processes.

Of course, all of this mention of holes leads to one thing: isn't this a poor use of space, because there are so many un-fillable holes theoretically? Yes, and this is called **fragmentation**. This may be **external fragmentation**, where there is enough free memory for a process, but this is not contiguous, or **internal fragmentation**, where a process is allocated, but given way too much room to work in, like giving a toddler a king-sized bed (comfy, yes, but way too big for something so small). To deal with fragmentation, we could either **compact** memory to remove all of the gaps (which would need lots of overhead and fuckery!), or allow for **non-contiguous allocation**.

## `segmentation fault (core dumped)`

Whoops, sorry I scared you there...

**Segmentation** allows us to split a program into segments across memory. Then, a logical address is a tuple containing the segment number and offset, which the MMU can easily map. This allows memory use to be significantly more flexible.

The MMU here has to work a little differently. Here, it stores a **segment table**, which contains the *segment base*, which maps the segment number to the physical starting address of the segment, and the *segment limit*, which defines the length of the segment. This approach is still vulnerable to external fragmentation though.

## Pages stuck together

Gross...

We can avoid external fragmentation by using **Paging**. Programs are split into *pages*, and likewise, memory is split into equally-sized *frames*. For instance, 4KB is a common page/block size. Each page is assigned to a frame. It's like an art gallery, but more useful (jk art is very very cool)!

The MMU then, takes a logical address, consisting of a page number and offset, and maps the page number to the frame number. We don't need to check the offset, as it will be limited by the domain of the address itself. This information is stored in memory as a **page table**, which stores the page numbers and base addresses for each process.

If we're not sensible about our page size, however, we risk internal fragmentation. For instance, if we have a page size of 4KB (4096 bytes), and we have a process requesting 4528 bytes, we need two frames, the second of which means we allocate 432 bytes in a frame, wasting over 3KB. Doesn't sound like much, but this can scale up (plus there was a time where 3KB of memory was a lot!). This is yet another balancing act we must participate in, in the circus of Computer Science (got that clown suit ready for the internship hunt? Clowns make more than interns!)

## Printing is complicated

So, we have a page table in memory. This itself has a base address that the CPU needs to keep track of, using a **page table base register** (PTBR). This does mean that when we schedule a new process to run, we may need to access memory at least twice.

We can improve things with cash. No, sorry, cache. But either works, depending on how you look at it. A **translation lookaside buffer** (TLB) is a hardware cache that stores the frame numbers of frequently accessed pages. This can be checked before the page table, and is much quicker to access, at the cost of smaller capacity. As such, if we try to access a page not listed in the TLB, a *cache miss*, then we have to bring it into the buffer from the page table, using two memory accesses. This creates an **effective access time**, where we factor the likelihood of a cache miss into the average access time.

$E = S \cdot t_h + (1-S) \cdot t_m$

Where $E$ is the Effective Access Time, $t_h$ and $t_m$ are the times for a hit and miss respectively, and $S$ is the success rate.

Additionally, to separate entries in the TLB, we identify distinct processes using an **address space identifier** (ASID) to ensure the right process is calling for the right page. If there is a mismatch, we count this as a cache miss.

## Contents of contents of contents

Now let's talk about size. Sorry, but here it does matter. A smaller page table is perfectly fine and unobtrusive. The size depends on our page size and addressing space (which is generally 64 bits, hence 64-bit processors). The number of entries we need is usually the result of dividing the addressing space by the page size, so a 64-bit machine with an OS that uses 4KB pages needs $2^{20}$ entries. Even if each entry is only a few bytes, this requires at least a few megabytes of space! Furthermore, if we're only running a few, small processes, we have to make lots of these entries as invalid, using a *valid-invalid bit*. Let's see if we can do this a little better.

A **Hierarchial** or **Multi-level Paging Table** uses multiple page tables, the outer of which determines if there is content inside a *range* of page numbers. You can think of this, like the *contents* of a book, no need to immediately seek out random pages, instead, find what you want in the contents, *then* go to the page it points to! Of course, this means we don't have to store an entry for every single table, but we may need a few memory accesses to find what we're looking for, increasing the time taken in a cache miss in the TLB.

A **Hashed Page Table** is like a cross between a hash table and a page table. Page numbers are used as a hash key, with each value containing the page number, associated frame number, and a pointer to the next value, to handle hash collisions.

Lastly, an **Inverted Page Table** uses the frame number as the index, rather than the page number. Each entry contains the page number, alongside its associated process ID (PID), and the process ID and page number are used in a linear search across the table to identify the correct frame. This reduces memory footprint, at the expense of greater access times.