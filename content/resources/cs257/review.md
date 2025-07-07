+++
title = "Review and Additional Resources"
+++

What got me interested in Computer Science to begin with was the question "how do computers work?", so if you exhibit a similar itch at this point in your degree, have a look at this module, as it'll give you a better understanding about how today's computer systems work.

## Useful Links

### Intel SSE and AVX Documentation

The module resources should link to useful documentation anyway, but nevertheless, consider this [the bible of Intel processors](https://cdrdv2.intel.com/v1/dl/getContent/671200). This will be useful material on which to pray that your coursework doesn't segfault for the hundredth time.

### CS241 Notes

The CS241 notes on this site contain some detail about [memory management](/resources/cs241/os7-memory) and a less *fine-grained* look at [multithreading](/resources/cs241/os3-threads), which do indeed provide a base which these notes build upon. Note that in the CS241 coursework, you'll have used **POSIX Threads**, instead of **OpenMP**, which this module uses. POSIX threads are harder to work with, but the tradeoff is you get more control, so you may want to consider using a combination of the two implementations in your coursework (if you get the time).

## My Thoughts

I found I much more enjoyed and understood this module once I took the time to revise the content at my own pace: writing up the notes allowed me to better understand nearly all of the concepts covered.

### Teaching

The teaching is rushed, and consists of reading off of the slides, so you are likely better off reading the slides and/or textbook at your own pace. Again, I found that once I read the slides back over and did some additional digging into certain concepts, I began to understand the content much better. For instance, I had no idea that superscalar architecture had anything to do with pipelining! IMHO, the problem here is that there's simply too much content, leading to cramming in the 30 hours of lectures you get. Even then, we didn't cover all of the content, which is why there are no notes about storage (shame really, the stuff about RAID looked cool to me).

### Labs

The labs were fairly fun and not too challenging to go through. They'll get you up to speed (pun intended) on how to implement code optimisations, starting with simple ones like altering loops, to threads, to intrinsics. It also leads nicely into the coursework, where you'll use this knowledge to optimise some code. Speaking of...

### Coursework

The coursework for this module is decent: the main challenge here is figuring out what optimisations do work, and which ones don't, as some will paradoxically *increase* your running time! Usually this is due to overhead, such as importing an additional library or initialising something. You'll want to make sure you add optimisations or changes *one at a time*, performing regular testing at each step. This would be a great time to make use of git! The report isn't too hard to write, and you can easily soak up marks with this, if you don't write the whole thing within the last 12 hours before the deadline.

### Exam

The exam this year was slightly harder than previous years, not least because one question has you looking at a diagram for a specific architecture, something that was said to *not* come up in the exam. Nevertheless, I felt decent about this one, having developed a rich understanding from doing these notes. Even then there's some acronyms I forgot...