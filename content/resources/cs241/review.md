+++
title = "Review and Additional Resources"
+++

The main things you'll learn in this module is how computers manage programs, using the concept of processes, and then discuss networking by explaining the inner workings of packets and how computer interactions happen.

## Useful Links

There's nothing outside of these notes and the lecture material I've used for these notes, so there's nothing here for now... It may be helpful to brush up on your [C knowledge](https://www.w3schools.com/c) for the coursework though.

## Personal Tips

If the coursework is anything like last year. you'll likely be working with network interfaces and checking the data of packets using TCPDump. On the documentation, you'll find [example code](https://www.tcpdump.org/pcap.html) on how to work with this data, I personally wouldn't shy away from simply using this code in your own work (it'll save you some time, don't ask me how I know that!). And **be careful with deleting files from any skeleton code you're given!**

The majority of this module is simply memorisation, so making flashcards or spamming some notes would be just fine, although some questions in the exam will require some working out, most notably ones requiring you to derive an equation, find Round Trip Time and sketch a scheduling diagram. Make sure you balance between your recall revision and application revision.

## My Thoughts

My experience with this module was quite similar to that with CS132, in that most of the module is simply memorisation, and the coursework drove me a little crazy.

### Teaching

The teaching for this module was about average: much of lectures consists of reading off of slides, except for the occasional vevox quiz after about 3 lectures of content. To be perfectly honest, you'd get by okay if you just read the lecture slides and/or used the textbook, there's not too much you're missing.

### Labs

The labs for this module are not particularly challenging: the worst part of them is learning how to work with C and making sure your programs don't seg-fault. Using valgrind *can* help, but also remember to make use of the GNU Debugger, `gdb`.

### Coursework

The subject matter of the coursework was quite interesting to me, being able to directly poke around with internet packets, and it allowed me to dive further into using C. What was not so interesting, was dealing with multiple seg-faults along the way, without having any lead on what might be causing them (thanks Raven for your help on that front). *When building your code, please remember to clean ALL of the old object code before you recompile.* I didn't do this, and so due to missing files I missed a crucial compilation error which initially caused me to get a failing mark. Save yourself the pain and learn from my mistakes!

### Exam

The exam was about the same in terms of difficulty with the past few years.