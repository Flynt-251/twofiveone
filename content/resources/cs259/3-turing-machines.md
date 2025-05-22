+++
title = "3 - Turing Machines"
+++

Turing machines are a lot like the computers we use today. That's why we call programming languages *turing complete*. Both of these run on the same idea: you have some amount of memory you have read-write access to, a number of possible states, and the ability to accept or reject an input, or possibly run forever. The main difference is the memory for a Turing Machine is in an infinite tape, but we all know that in reality, such a thing is impossible. There is then a read/write head that can look at a symbol and modify it. To create a Turing Machine, we must first create the universe. Then knowing the notation is a good start.

$T = (Q, \Sigma, \Gamma, \delta, q_0, q_{accept}, q_{reject})$

Some of these terms will be familiar, namely $Q, \Sigma, \delta, q_0$ and $q_{accept}$, denoting the set of states, input alphabet, transition function, initial state, and accepting state.

But what are these new symbols? $\Gamma$ is the **tape language**, which is a superset of $\Sigma$. It contains $\Sigma$, plus the blank symbol "_", and possibly some additional symbols if needed. Often $\vdash$ will be used to denote the start or end of the tape on the left-hand side.

$q_{reject}$ is the **rejecting state**, where the string is rejected if this state is reached. Not so difficult to understand, but why would we need this? Well, *not all Turing Machines will halt on all inputs*! So if we do end up halting, we need to be able to say whether the string we ran is valid or not. So we have one of three ending states: Accept, Reject, and an infinite loop. If a Turing Machine always Accepts or Rejects, we call this a **Decider**, or a Total Turing Machine.

We've seen $\delta$ before, but as you can imagine, in a Turing Machine it acts a little differently. This time the function looks like this:

$\delta : Q \times \Gamma \rightarrow Q \times \Gamma \times \{L,R\}$

What this is saying is, given the symbol we've just read on the tape, and the current state we're in, write a new symbol in that place, move to another state, and either move the read head left ($L$) or right ($R$).

Again, since most, if not all programming languages are turing complete, it is absolutely acceptable to represent one using pseudocode.

## Talking Turing

We can define languages on a Turing Machine $M$ as we would a DFA, NFA, regular expression, PDA or CFG, as $L(M)$. Then, when we run $M$ on a string, say $w$, we're again looking for an accepting run to verify if $w \in L(M)$. Let's see how we get to an accepting run.

We start at the beginning of the tape, on $\vdash$, at state $q_0$, with the string $w$ ahead of us. The read head is on the first symbol of $w$. We can neatly define this as a **configuration**, $(\vdash, q_0, w)$, or more specifically, the start configuration. Then, once we run the turing machine on this first symbol in $w$, we get a configuration $x = (u, q, v)$ for some tape $uv$ and state $q$. To get to an accepting run, we must reach an accepting configuration, i.e. $(u, q_{accept}, v)$. Likewise, to reject, we need to reach a rejecting configuration, $(u, q_{reject}, v)$.

A language is **Turing Recognisable** if for any string $w \in L(M)$, $M$ accepts, but this doesn't always mean that the machine will always halt: recall that $w \in L(M)$ iff we reach an accepting configuration. That means then, if $w \notin L(M)$, then the machine either reaches a rejecting configuration, or never halts. If the machine *does* halt on every input, then we can say $L(M)$ is decided by $M$.

## This is where the fun begins

Remember that a Turing Machine shares a lot of similarity to a computer, or programming language. So, we can write turing machines, on the tape of a turing machine. This may sound confusing, but it's no different to running a python file on your computer. Such a "computer" as a Turing Machine is known as a **Universal Turing Machine**, and it takes an input of $\langle M, w \rangle$, i.e. some turing machine $M$ and a string $w$.

Now we cover the famous **Halting Problem**. The Halting Problem is so interesting, because there's not really a universal algorithm to solve it. But what is it, and why is it computationally impossible to solve?

Simply, the Halting Problem asks, given a Turing Machine $M$ and string $x$, *does $M$ halt on $x$*? Immediately, you may think *"yes, of course we can solve this problem, just run M on x, give yes if it halts and no if it goes into an infinite loop."*. But we want to solve this problem, on a Turing Machine, since if we can do this on a Turing Machine, we can solve this problem algorithmically. So the real question is, *is the halting problem decidable*?

### Proving the Decidability of the halting problem

So let's say we have the set of every turing machine in the universe, we'll denote this using $\mathscr{M}$. This is a countably infinite set, so we'll use index $n$ to refer to one of these machines.

For some machine $\mathscr{M}_n$ then, we can run string $x$ and get one of two outcomes: either $\mathscr{M}_n$ halts, or it doesn't. In either scenario, we output yes, or no respectively. $x$ can be any string. So let's say we have a decider for the halting problem, $N$, which can take in any of these machines and strings, and determine if any combination will halt.

So if $N$ exists, the Turing Problem must be decidable right? Not quite. Let's do something a wee bit fucky.

Let's make a new universal machine, which we'll call $K$. $K$ is special, as it uses $N$ as a subroutine. Given input $\langle M,x \rangle$, $K$ will pass this input to $N$. If this input halts, then $K$ will loop forever. If the input doesn't halt, then $K$ will halt. So $K$ essentially inverts the result of $\langle M,x \rangle$.

Now comes the brain-melting bit. What happens when we run $K$, *on itself*? Well, if the inner $K$ runs forever, then the outer $K$ will halt. And, if the inner $K$ halts, then the outer $K$ runs forever.

**Wait a minute. If $N$ is meant to tell us that $K$ does or doesn't halt, then how does $K$ then do the opposite to what $N$ states?** Ah! This is a contradiction. Hence, the halting problem is undecidable because the existence of $N$ is contradicted by the existence of $K$.

### A similar, yet different problem approaches...

We can actually use this information on another Turing Machine Problem, namely the **Membership Problem**, which asks, can we create a decider which determines if a string is accepted by a turing machine? In formal set notation, this would be finding the set $\{\langle M,x \rangle : x \in L(M)\}$.

Well this is quite easy. Just grab a universal turing machine, run the input on that, and spit out the result. No, you're forgetting about what to do if the machine never halts. Instead, we can prove this is also undecidable.

Let's say the Membership Problem is decidable, so it has decided $N$ that we can use. Let's then try and use this to solve the halting problem, so if it's decidable, we also have decider $K$ that somehow makes use of $N$ (bear with me here).

Given input $\langle M,x \rangle$, let's modify this to get a slightly different machine, namely $M'$, with a new accepting state, and the old accepting and rejecting state both transition to this new state. So, if $M$ halts, this new machine will accept. We can run this new encoding $\langle M',x \rangle$ through $N$ then, so if $\langle M,x \rangle$ would normally accept or reject, then $N$ will accept, and if it never halts, then $N$ will reject. This is our definition of $K$, the decider for the halting problem.

So just like that, we've made a solution to the halting problem using the membership problem. In other words, **the halting problem is no harder than the membership problem**. So, if the halting problem is undecidable, the membership problem must be too!

## Further Implications

We've essentially just proven that $HP \leq_m MP$. There are two useful rules that tie into this:

- If $B$ is decidable and $A \leq_m B$, then $A$ is decidable.
- If $A$ is undecidable and $A \leq_m B$, then $B$ is undecidable.

Hence why we could conclude that the Membership problem was undecidable.

Let's say we have two alphabets, $\Sigma$ and $\Delta$. Each of these have their own languages $A$ and $B$. We say that $A$ has a **mapping reduction**, or $A \leq_m B$, if for every $x \in A$, there exists some value for function $\sigma : \Sigma* \rightarrow \Delta*$ where $\sigma(x) \in B$. $\sigma$ must also be a **compatible function**, which means we can create a decider which converts $x$ to $\sigma(x)$.

With this information, we can determine that the following problems are also undecidable:

- $\{\langle M \rangle : \epsilon \in L(M)\}$
- $\{\langle M \rangle : L(M) = \empty \}$
- $\{\langle M \rangle : L(M) = \Sigma* \}$

Furthermore, we have the theorem that a language $L$ is only decidable, if both $L$ and $\overline{L}$ are turing recognisable, which essentially eliminates any possibility of an input that never halts.

## I close with this

From our last line above, turing-recognised languages are not closed under complementation, and we know this because of the halting problem. Decidable langages are closed under this, though.

Union and Intersection are easy to figure out.

For **Union**, run an input on both machines. If for either of these, at least one accepts, accept the input. Otherwise, reject.

For **Intersection**, run an input on both machines, and if both accept, accept the input. Otherwise, reject.

Turing-recognisable languages are also closed under **Kleene Star**, just split the input into equal-sized substrings and run the machine on each.