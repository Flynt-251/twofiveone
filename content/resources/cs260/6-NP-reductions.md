+++
title = "6 - NP, NP-Hard, NP-Complete and Reductions"
+++

There are some problems that computers are really good at solving, and others they're not as good at solving. That doesn't stop people using computers, probably more than they should, to solve their problems. This section of the module seeks to formalise how easy it is to solve a problem algorithmically, and show how certain problems are related to each other.

## Sorting Problems

Just quickly, we'll remind ourselves of the three different problems we solve using computers. This will be important later.

- **Search Problems** - Given the input, find some output that satisfies a set of conditions.
- **Optimisation Problems** - Produce an output that is max/minimal, in relation to the input.
- **Decision Problems** - Given the input, give a yes or no response.

Most of our discussion focusses on decision problems.

We define a set of different classes of complexity to describe how hard it is to solve different problems. Here's an explanation of each below.

## P, aka Tractable

All problems that are *solvable* in polynomial time, i.e. there exists some algorithm with time complexity $O(n^k)$ for some constant $k$.

**To prove a problem is in P, create a polynomial time algorithm for it.**

## NP, and how to create a verifier

All decision problems that are *verifiable* in polynomial time. These problems are not necessarily solvable in polynomial time, but we are able to, given a possible answer, verify the correctness of such an answer in polynomial time.

Problem $X$ is in NP, *iff* there exists a **verifier** $C$, such that...

$C$ is a function such that its inputs are a problem instance $i$, and a witness to said problem $w$, then it outputs yes or no, depending on whether or not the witness satisfies the instance. Keep in mind that if the original problem is impossible, then $C$ will always output "no".

That's a mouthful to get around. Better explain with an example.

Let's look at the **traveling salesman problem** (TSP). To summarise this problem, we are given a set of cities and their distances from each other. We want to figure out if it is possible to visit every city in less than $k$ distance. We will prove this is in NP by constructing the verifier $C_{TSP}(i,w)$.

Firstly, we need to define what a problem instance is, and what a witness to such an instance is. An instance of the TSP is some weighted graph $G$ which represents the set of cities and their distances, as well as a constant $k$, which is our limit for how far we can travel. So, a witness, then, is straightforward: it's a proposed path we can take to travel. Now let's build that verifier!

Define verifier $C_{TSP}(i,w)$ as such...
- Preconditions: $i = (G, k)$ (see above), $w$ is a path.
- Check that every vertex and edge in $w$ is also in $G$.
  - If not, give "No".
  - Takes $\Theta (|V| + |E|)$ time.
- Sum the weights of the edges in $w$ and check if this sum is less than $k$.
  - If it is, give "Yes", otherwise give "No".
  - Takes $O(|E|)$ time.

Trivially, this runs in polynomial time, and gives an output for any shape of $w$. The latter is important to keep in mind, as it may not conform to what we would always expect, e.g. the witness may contain non-existent edges (meaning we're taking a path that doesn't actually exist).

One of the great questions in CS is whether or not P = NP. If you'd like to irreversibly change the world, you could try making a proof for this. (But keep in mind that doing so may lead to bad consequences as well as good.)

**To prove a problem is in NP, show that given an instance of said problem, we can check whether an answer to said instance is correct.**

## NP-Complete and Reducibility

Any decision problem that is in NP, and is capable of reducing any other NP problem to this one. Wait, wtf is reducibility?

If problem $X$ is reducible to problem $Y$, we denote this by saying: $X \leq_P Y$, which colloquially means *"X is no harder than Y"*.

$X$ is **reducible** to $Y$, if it is possible to construct a polynomial-time algorithm for $X$, using a magic algorithm that solves $Y$ in polynomial or better time. We call this magical algorithm an **oracle** for $Y$, and we cannot at all alter the behavior of it, as we don't know how it works. I have to make the assumption that most, if not all of you are not wizards.

Let's say we have an oracle for the $MAX$ problem, which, given an array of numbers, gives the one of maximal value. Suppose we also have the problem $MIN$, which finds the minimal value of an array of numbers. We can prove very quickly that $MIN \leq_P MAX$:

- Given array $A$ of values, construct array $B$, such that for each $B[i]$...
  - $B[i] = -1 \times A[i]$
- Return $-1 \times MAX(B)$.
  
If we assumed $MAX$ takes constant or linear time, then this algorithm runs in linear (and hence polynomial) time. For the record, it's impossible for $MAX$ to run in constant time, unless you're doing it on LeetCode (PSA: NeetCode is better!).

**To prove a problem is NP-Complete, find a known NP-Complete problem, and reduce it to this problem.** You can also prove a problem is in NP if you can reduce it to an NP-Complete problem.

## NP-Hard and where Non-decision problems lie

*You know who **else** is-*

*Ahem*. An NP-Hard problem is any problem which you can reduce an NP-Complete problem to. Note that this does indeed mean any NP-Complete problem is also NP-Hard, **the distinction between the two is that any NP-Complete problem must also be a decision problem, else it is NP-Hard**.

**To prove a problem is NP-Hard, reduce an NP-Complete problem to it, i.e. given problem $X$ and NP-Complete problem $Y$, X is NP-Hard *iff* $Y \leq_P X$.**

## And for your reference...

A useful diagram from Wikipedia to help you visualise the relationship between these classes.

<a title="Behnam Esfahbod, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:P_np_np-complete_np-hard.svg"><img width="512" alt="P np np-complete np-hard" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/P_np_np-complete_np-hard.svg/512px-P_np_np-complete_np-hard.svg.png?20250417154839"></a>

And a very useful StackOverflow article: <https://stackoverflow.com/questions/1857244/what-are-the-differences-between-np-np-complete-and-np-hard>

