+++
title = "8 - Program Security"
+++

Is `n = n + 1` a secure program? Not necessarily. This value `n` might already be at its maximum value and so incrementing it will cause it to overflow. It might not even be a numerical value, so adding 1 could seriously mess things up. These are the kinds of things you need to consider when creating secure programs: we need thorough and standardised testing, so that we can be certain that the software we deliver is reliable, and can uphold the CIA triad.

We used to maintain security on the basis of *penetrate and patch*, where once a fault was found, apply a patch for it, but programming bugs are very much like hydras: where one fault was fixed, a few new ones would emerge. Not very effective today, where exploiting an application is easier than ever. Today, we split faults and bugs into those that are caused by inadvertent human error, and those that are intentionally included.

## That's not gone well

*I wonder why all those commits are there*

The vast majority of unintentional faults are caused by poor memory safety, usually by either a buffer overflow, out-of-bounds array access, access after deallocation, and uninitialised variables.

A buffer describes some store of data, often for temporary usage while processing. A **buffer overflow** then, is what happens when more data is filled into the buffer, than the space it is allocated, essentially spilling over into the rest of the program. Many compilers do prevent overflows, mainly for higher level languages, although some C compilers may not do this. An example exploit using a buffer overflow comes from the early Nintendo 3DS hacking scene: both the [Gateway Cards](https://www.gamebrew.org/wiki/Gateway_Launcher_3DS) and [Ninjhax](https://www.3dbrew.org/wiki/Ninjhax) used buffer overflows to facilitate running custom code on the console. Gateway did this by performing an overflow on the DS settings, and Ninjhax did this by using an overflow bug on the game Cubic Ninja.

Here's an example of a buffer overflow:

```c
// greeting can store 10 characters...
char* greeting = malloc(10 * sizeof(char));
// But here, we store 12, exceeding the set capacity.
greeting = "Hello World!";
```

Similarly, if our program code isn't written very well, it may be possible to access array indexes beyond what's been allocated, potentially allowing us to manipulate a program in unintended ways. Deallocated memory and uninitialised can also be overwritten with other data, and expose pointers which allow for a similar effect.

If you've taken CS257, you may be aware of the fact that a CPU can swap around the order in which instructions execute, in order to better improve performance. This can unintentionally then, bypass security and memory safety measures, allowing for the use of a **time-of-check-to-time-of-use attack (TOCTTOU)**. TOCTTOU attacks can also be made intentionally, by modifying files on a system.

Of course, one of the most egregious cases of unintentional faults causing a failure of availability is the **CrowdStrike outage**, which caused *millions* of Windows machines to repeatedly show a BSoD (blue screen of death), rendering them completely unusable. CrowdStrike is a cybersecurity company based in the US, providing all kinds of businesses with endpoint security solutions. The one that caused the outage, is called the *Falcon endpoint detection and response agent*. Linux machines were largely unaffected. Another reason, why Linux is just better.

## It's a feature, not a bug

*Didn't say the feature was a good one*

So, let's say our program has been written securely, that means we should be totally fine right? You forget just how persistent hackers can be. They may in fact, make a compromised version of our program and utilise covert channels or side channels. A **covert channel** is a means of communication between a sender and receiver by using a component of software not intended to communicate in the first place, bypassing security policy. Covert channels nowadays, can in some cases, be easily detected with monitoring software, although some are very hard to detect, in which case we need to verify the integrity of our code. Similarly, **side channels** work the same way, but the sender, or victim in this case, is unaware of this communication. As such, side channels are often the blood and soul of spyware, allowing hackers access to potentially highly sensitive data.

- **Storage Channels** exchange information by abusing the (non-)existence of file objects. One example of this is a *file-lock* channel, where a program on the victim's device will repeatedly lock and unlock access to a file, creating a slow stream of data made available to the hacker.
- **Timing Channels** exploit process scheduling in operating systems. A process can either signal a 1 or a 0 to accept or reject an allocated time block, which a compromised application can use to, again, share information.

## Ah, so we're f***ed.

*Now for problems we can't fix*

Well, you can fix them, you just need to chuck your computer in the bin Ron Swanson style. **Hardware vulnerabilities** are capable of exposing sensitive information or allowing malicious code to run on a system, regardless of software. Scarily enough, there are two hardware vulnerabilities discovered in 2017 which are still causing issues today, that use side channels: **Meltdown** and **Spectre**. Meltdown exploits CPU caches, allowing us to access portions of memory where access would usually be denied, and Spectre abuses *speculative execution* to get a processor to run commands that would otherwise require elevated privileges.

These hardware vulnerabilities can be a massive problem, as correcting them is very slow, and you can't fix every system. If you want more examples of hardware vulnerabilities, have a look at game console modding: people will try all sorts of methods using hardware, to allow them to run unsigned code. [Some people were crazy enough to drill into their Xbox 360s to do this.](https://www.youtube.com/watch?v=RyW0lXnoFOA) Before we get too hung up on hardware, let's go back and talk about what we CAN fix without a chip fab.

## So soft and warm...

*Wait, aw, it's not the fun kind of fuzz. hmph.*

We can look for vulnerabilities in three different ways: Static Code analysis, which is basically, make sure we're actually writing good code, Reverse Engineering, when we can't access the source code, or Fuzzing. **Fuzzing** is the act of throwing random, unexpected and invalid data inputs at a program, and seeing what sticks. This can expose entrypoints which we can then use to further compromise an application.

## Love is in the air? Wrong, Heartbleed.

*Bazinga.*

**Heartbleed** was one of the most serious vulnerabilities in history, since it exploited TLS, *the* major component of HTTPS, which keeps website data encrypted. Heartbleed was capable of exposing very sensitive information, including encryption keys and user logins. It works by exploiting TLS's *heartbeat* protocol, where a client will ask a server if it is still alive by requesting a short payload, usually only a few bytes. The problem with this is, *the server does no check on whether the client is requesting a valid length of payload*, meaning other data can be sent. We finish this section with yet another xkcd comic.

![xkcd comic number 1354, accessible here: https://xkcd.com/1354/](https://imgs.xkcd.com/comics/heartbleed_explanation.png)