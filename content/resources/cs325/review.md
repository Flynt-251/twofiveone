+++
title = "Review"
+++


> Please note this module review is based on teaching in the 2025/26 academic year. Remember that module contents, organisers, courseworks and exams are all subject to change.

## 1 - Why did I pick this module?

One of the core components of Linux, at least colloquially, is the GNU line of software, which of course means the GCC, or GNU C Compiler gets mentioned. In fact, when installing just about any software, a compiler is inevitably going to be involved. The point is, compilers are the common denominator for almost all of today's software, so in the pursuit of aiming to learn as much about how computers work as possible, it only made sense for me to select this module.

## 2 - Workload

The workload hit me like a tonne of bricks. It's only by Week 2 when the coursework gets released, and you're expected to start work on it. Then, it's not until the end of the term when you are required to submit it. At least I didn't need to do any documentation, I suppose. By term 2, I'd set this module aside before the exam season when I had to review everything, and I realised I couldn't remember absolutely everything, which is why as of writing, there aren't any notes.

## 3 - Assessments

There are two components, one programming assignment, and an exam. The split is 40/60.

### Programming Assignment

The idea: make a compiler using C++ and the LVM libraries. A small amount of work is already done for you, but ultimately, what you have to do is interact with LLVM itself to generate the required intermediate code, which is the hard bit. There was a lot of ground that needed to be covered here, from performing the most basic assignments, all the way to writing conditional logic, which for me was practically impossible due to LLVM's horrible documentation. I don't feel bad about using Github Copilot to help me out here, though I am slightly embarrassed about it (look, Visual Studio Code enabled it by default, okay?).

### Exam

The exam was slightly more difficult than the past papers I had worked on previously. Generally the consensus here is to focus on practicing a specific set of questions, and leaving out the other two, to drastically cut down on the required workload of revising. Even still, I found myself struggling a little with this exam, making some minor errors I had to correct. Some baseline drawing skill is required, and ideally you should stay up to date about your formal languages work.

## 4 - Teaching Quality

The module organiser is a decently good lecturer. Most sessions will somewhat consist of reading off of slides, of which there are *many*. The slides are decent enough for one to review the whole module through them, though many concepts tend to be under- or over-explained through them. Seminar teaching was decent, with the tutor going as far as offering assistance with the programming assignment. Unfortunately, due to personal circumstances, I did not engage with seminars as much as I would have hoped to.

## 5 - Content and Difficulty

The coursework is a major hurdle for people to overcome, due in no small part to the awful documentation LLVM has. Sure, its initial tutorial is enough for you to build a very simple language, but concepts that include conditional logic and arrays are nowhere to be found; for that sort of thing you have only the C++ reference to rely on, which is not beginner-friendly at all.

There are also many aspects of compilers that are covered, in great depth - this means there are many subjects that can be covered in the exam, hence the recommendation to stick to a prescribed set of questions. There is a blend of theory and practice, so you will be challenged on both of these sides in the exam.

## 6 - Did I actually enjoy it?

The overall concept of the module itself is quite interesting - the composition of a compiler itself is something that is intuitive to me, and something I'd be able to get my head around in my own time. I've applied concepts from this module to my own projects and ideas. However, the sheer length of the coursework meant I suffered quite a few late nights of working and begging for my solution to work. The amount of time it demanded for me stole time away from my dissertation, hence leaving a sour taste in my mouth. I didn't care too much for the exam, really just wanting to have it done and out of the way. I think I could have enjoyed this module more were it not for the amount of stress I was under.

## 7 - Who's this module for?

If you liked the theory of Formal Languages (or Logic and Automata for you newer folks), and the close-to-hardware natures of Organisation and Architecture or Advanced Computer Architecture, then the progression into this module should feel very natural. That being said, if like me, you're curious as to what composes many compilers today, including Clang, this module is definitely worth a look.

## 8 - The big tip

START THE COURSEWORK TODAY. I don't care that it isn't out yet. Get the push going now so that you're not scrambling to get it finished in the days leading up to the submission deadline. Start with getting familiar with C++, then look at the LLVM tutorial, then go from there.

## Final Verdict

8/10 difficulty, this module will definitely build your character.

For me, this module is a 6/10. It was a bit underwhelming for me and more demanding than I would have liked. Making your own compiler is cool, but there needs to be more support for dealing with LLVM's god-awful documentation. However, I do have more appreciation for Clang, which I now use in place of GCC. Clangd is also a good linter!
