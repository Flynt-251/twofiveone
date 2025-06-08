+++
title = "2 - Proof Systems"
+++

There are three main systems for proving that logical expressions are tautologies or contradictions: Tableau, Resolution and Natural Deduction. We can either use both of the first two in conjunction, or just Natural Deduction, to prove a set of expressions and its consequence ($S \vDash X$).

## It's not Tabula, it's Tableau

**Tableau Proofs** are based on the use of DNF to create a tree, where all possible routes are shown to have contradictions. We prove a formula is a tautology by showing that its negation has a *closed tableau proof*, where each branch we create is closed, or ends with a bottom.

To do a tableau proof on tautology $X$...

- Start with $¬X$ at the top of our proof.
- If we have a non-literal expression $N$ in the proof then...
  - If $N = ¬\top$, add $\bot$ to the end of this branch.
  - If $N = ¬\bot$, add $\top$ to the end of this branch.
  - If $N = ¬¬Z$, add $Z$ to the end of this branch.
  - If $N$ is an $\alpha$-expression, perform an **$\alpha$-expansion** and add $\alpha_1$ and $\alpha_2$ to the end of this branch
  - If $N$ is a $\beta$-expression, do a $\beta$-expansion, and create two new branches, one with $\beta_1$ at its end, and $\beta_2$ at its end.
- For any branch, if we can trace any sort of variable such that both $x$ and $¬x$ appear, close the branch by adding $\bot$ to the end of it (This means our CNF expression is $\langle ... x, ¬x, ... \rangle$).

The proof terminates when all branches are closed, or all expressions have been reduced to literals (ensuring we don't reduce the same expression twice!). If you can't create a closed proof, try again on its negation. If that fails, the expression could be *satisfiable*. Otherwise, if we are able to produce a closed tableau of $¬X$, then we can state $\vdash_t X$.

## Talkin' about a resolution sounds like a whisper

*Wait, that's not the line.*

**Resolution Proofs** are based on the use of CNF to show that we end up with a contradiction on the negation of the expression we're trying to prove. We construct new disjunctions within, that don't change the logic of the expression to result in an empty clause, which is equivalent to $\bot$, meaning the whole CNF expression cannot hold.

To do a resolution proof on tautology $X$...

- Start with $¬X$ at the start of our proof.
- If we have a non-literal expression $N$ inside a disjunction in the proof then...
  - If $N = ¬\top$, add a new disjunction, replacing $N$ with $\bot$.
  - If $N = ¬\bot$, add a new disjunction, replacing $N$ with $\top$.
  - If $N = ¬¬Z$, add a new disjunction, replacing $N$ with $Z$..
  - If $N$ is an $\alpha$-expression, perform an **$\alpha$-expansion** and create two new disjunctions, each replacing $N$ with $\alpha_1$ and $\alpha_2$ respectively.
  - If $N$ is a $\beta$-expression, do a $\beta$-expansion, and create a new disjunction, replacing $N$ with $\beta_1$ and $\beta_2$.
- If a disjunction contains both $x$ and $¬x$ for some variable, create a new disjunction that removes these.
- If there are two disjunctions where there are $x$ and $¬x$, combine these into a new disjunction, excluding these variables.

Again, our proof is closed once we end up with the clause $[]$ (the empty clause), which evaluates to bottom. A successful resolution proof of $X$ will create a closed resolution expansion of $¬X$, and we can then write $\vdash_r X$.

## Artificial Addition

> Note: Multi-line KaTeX rendering is a pain, so proofs will be shown like this:
> $X [ Z \cdot \cdot \cdot ] Y$
> Normally, you'd place expressions vertically.

Unlike a resolution proof or semantic tableau, it's not feasible to solve a boolean expression through natural deduction by means of a computer: it does not involve breaking down an expression into a simpler structure, rather it focusses on building assumptions to prove a consequence. Natural Deduction requires some level of "Working Backwards", so it may not be initially intuitive to work out at first.

Natural deductions work by deducing assumptions inside boxes. At the top of a box, we make an assumption. Then, at the bottom, we have some outcome. Then, outside of this box, we can say the assumption implies its outcome. It looks like this:

$[X \dotsb Y] X \rightarrow Y$

Which says that, from $X$, we can conclude $Y$, hence $X$ implies $Y$.

### Complete Rules

#### Constant

Or, what to do if you can do with a top or a bottom (make sure you've washed first).

$[... \bot] X$

So if an assumption is not satisfiable, we can make any conclusion we want to.

$[...] \top$

And we can produce top from any expression, since we've said our assumption was true anyway.

#### Negation Rules

Because you can't not not mess with nature. Confused? Me too.

$[X, ¬X] \bot$

If we immediately draw the negation of an expression, we can conclude bottom.

$[X \dotsb \bot] ¬X$

$[¬X \dotsb \bot] X$

And if we reach bottom from an assumption, then it clearly cannot hold and so we should conclude its negation.

#### Alpha and Beta rules

Are we really talking about this? Surely people don't talk about the Omegaverse anymore...

**Alpha Elimination** - $[\dotsb \alpha] \alpha_1$ or $[\dotsb \alpha] \alpha_2$

**Alpha Introduction** - $[\dotsb \alpha_1, \alpha_2] \alpha$

So if we have an alpha (conjunctive) expression, we can either only conclude one of its components, or combine both to give the full expression.

**Beta Elimination** - $[¬\beta_1, \beta] \beta_2$ or $[¬\beta_2, \beta] \beta_1$

**Beta Introduction** - $[¬\beta_1 \dotsb \beta_2] \beta$ or $[¬\beta_2 \dotsb \beta_1] \beta$

So for *elimination*, if we find that one portion of the beta (disjunctive) expression is false and immediately find that the beta expression is true, then we have to conclude that the other half is true. *Introduction* does the opposite, where if we assume the negation of one half, and conclude the other half is true, then we can we can infer the whole beta expression.

### Derrived Rules

You don't have to remember these rules, since you can use the previous info we know already to reach them, but they are very useful.

#### Double Negation

Because you can't not not not not mess with nature. ...what?

$[\dotsb ¬¬X] X$
$[\dotsb X] ¬¬X$

#### Copy Rule

Because you can't not not mess with nature. Confused? Me too.

I just pasted whatever was in my clipboard for that one.

$[X] X$

#### Implication

Did you consider them when choosing your career? I hope you did!

$[X \dotsb Y] X \rightarrow Y$

#### Modus Ponens and Tollens

Ew, Latin.

$[X, X \rightarrow Y] Y$

$[¬Y, X \rightarrow Y] ¬X$

#### Excluded Middle

It's no fun being excluded, especially as a middle child. Just read Diary of a Wimpy kid (only the good ones tho).

$[\dotsb] X \vee ¬X$