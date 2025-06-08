+++
title = "1 - The basics of logic"
+++

Logic is very simple, we take statements with either "yes" or "no" answers, combine them, and find various ways we can manipulate and swap around these expressions to do interesting things. When we talk about a "yes or no" type of question, we mean that the statement (or formula, or proposition) *must* be either true or false. No "well, maybe"s, or "it depends"s or similar political faff, just yes or no. This may be why this module isn't available to politics students.

## Bit by bit, molecule by molecule, atom by atom

*Plankton accidentally becomes a force of destruction greater than the US*

We distinguish logical statements in two ways, atomic and compound. An **atomic proposition**, or **literal**, is one that can't be split, and itself has a value of either yes or no. An example of an atomic proposition might be "Are you having coffee?", or "Is this a pigeon?": there's no components of the problem here. By contrast, a **compound proposition**, or **non-literal**, has at least two parts to it, to constitute its final yes or no value. Such formulas may include "Are you coming, and will you bring vodka?" or "Will you play Smash Bros or Mario Kart?". Here, the structure of the sentences is important:

$\text{Coming to party} \rightarrow \text{Bringing vodka}$

$\text{Play Smash Bros} \oplus \text{Play Mario Kart}$

And so, we define our **connectives**, or *operators*.

### Constants

*How fitting that I'm writing this in June*

$\top$ - Top, which is always true.

$\bot$ - Bottom, which is always false.

### Unary Operators

$¬$ - Negation, which inverts a value.

|$A$|$¬A$|$¬¬A$|
|---|----|-----|
|True|False|True|
|False|True|False|

### Binary Operators

Here are the main ones:

- $\vee$ - Disjunction, or Or, so at least one of the two arguments.
- $\wedge$ - Conjunction, or And, so both arguments.
- $\rightarrow$ - Implication, meaning "A implies B will happen".

| $A$ | $B$ |$A \vee B$|$A \wedge B$|$A \rightarrow B$|
|-----|-----|----------|------------|-----------------|
|False|False| False    | False      | True            |
|True |False| True     | False      | False           |
|False|True | True     | False      | True            |
|True |True | True     | True       | True            |

...And here's the full list (there's 16 in all).

|Op |F,F|T,F|F,T|T,T|Common Name|Simple Equivalent|
|---|---|---|---|---|-----------|-----------------|
|$\top$|T|T|T|T|Top|
|$\bot$|F|F|F|F|Bottom|
|$1$|F|T|F|T|First op.|$X$|
|$\overline{1}$|T|F|T|F|Neg. of first op.|$¬X$|
|$2$|F|F|T|T|Second op.|$Y$|
|$\overline{2}$|T|T|F|F|Neg. of second op.|$¬Y$|
|$\wedge$|F|F|F|T|And|
|$\vee$|F|T|T|T|Or|
|$\rightarrow$|T|F|T|T|Implies|$¬X \vee Y$|
|$\leftarrow$|T|T|F|T|Reverse Implies|$X \vee ¬Y$
|$\uparrow$|T|T|T|F|Nand|$¬(X \wedge Y)$|
|$\downarrow$|T|F|F|F|Nor|$¬(X \vee Y)$|
|$\oplus$|F|T|T|F|Exclusive Or|$(X \wedge ¬Y) \vee (¬X \wedge Y)$|
|$=$|T|F|F|T|Equals|$(X \wedge Y) \vee (¬X \wedge ¬Y)$|
|$\nrightarrow$|F|F|T|F|Not Implies|$X \wedge ¬Y$|
|$\nleftarrow$|F|T|F|F|Not Reverse Implies|$¬X \wedge Y$|

We really only have to worry about negation, "And" and "Or", as these together are a *complete* set of operators. And by the way, these tables which show the outputs of logical formulas, are known as **truth tables**. Truth tables are simple to use, and good for writing the logic of smaller expressions, but are inefficient in the long run.

Your typical logical expression might look something like this:

$((p \rightarrow q) \oplus r) \uparrow ((¬s \wedge t) \vee (q \wedge u))$

Note that whenever we have a binary operator, we wrap this in brackets to avoid ambiguity. Something like $p \rightarrow q \downarrow r$ has two possible meanings, with two different truth tables.

## Held taut and being satisfied

*Okay wtf is that subheading am I okay*

Given an expression with variables we can assign, the expression will fall into one of three categories:

- **Tautology** - The expression is always true, regardless of how the variables are assigned.
- **Contradiction** - The expression is always false, regardless of how the variables are assigned.
- **Satisfiable** - The expression *could* be true, and our assignments determine this.

The negation of a tautology is always a contradiction, and vice versa.

Furthermore, sometimes we have a set of formulas, denoted by $S$, which are at least satisfiable. If under the same valuations as each $s$ in $S$, another formula $X$ holds, then we can say that $X$ is a **consequence** of $S$, written as $S \vDash X$. If $X$ is a tautology, then $\emptyset \vDash X$, or $\vDash X$.

## The lies of the law

We can represent some expressions as other expressions.

- **Commutativity**
  - $X \vee Y \equiv Y \vee X$
  - $X \wedge Y \equiv Y \wedge X$
- **Constants**
  - $X \vee \top \equiv \top$
  - $X \vee \bot \equiv X$
  - $X \wedge \top \equiv X$
  - $X \wedge \bot \equiv \bot$
- **Repeated Elements**
  - $X \vee ¬X \equiv \top$
  - $X \wedge ¬X \equiv \bot$
- **Idempotence**
  - $X \vee X \equiv X$
  - $X \wedge X \equiv X$
- **Double Negation**
  - $¬¬X \equiv X$
- **Implication**
  - $X \rightarrow Y \equiv ¬X \vee Y$
- **Associativity**
  - $(X \vee Y) \vee Z \equiv X \vee (Y \vee Z)$
  - $(X \wedge Y) \wedge Z \equiv X \wedge (Y \wedge Z)$
- **De Morgan's Law**
  - $¬(X \vee Y) \equiv ¬X \wedge ¬Y$
  - $¬(X \wedge Y) \equiv ¬X \vee ¬Y$
- **Distributivity**
  - $X \wedge (Y \vee Z) \equiv (X \wedge Y) \vee (X \wedge Z)$
  - $X \vee (Y \wedge Z) \equiv (X \vee Y) \wedge (X \vee Z)$
- **Exportation**
  - $(X \wedge Y) \rightarrow Z \equiv X \rightarrow (Y \rightarrow Z)$
- **Absorption Law**
  - $X \rightarrow Y \equiv X \rightarrow (X \wedge Y)$
- **Contradiction**
  - $(X \rightarrow Y) \wedge (X \rightarrow ¬Y) \equiv ¬X$

These are useful in simplifying certain expressions.

## Let's face it, are any of us really "Normal"?

*Or perhaps I'm projecting.*

We now know that to represent any logical sentence, we only need $\vee$, $\wedge$, and $¬$. We can then swap around terms, such that we create a set of clauses split by disjunctions, or conjunctions. These are called **Disjunctive Normal Form (DNF)** and **Conjunctive Normal Form (CNF)** respectively, and look like this:

DNF - $C_1 \vee C_2 \vee ... \vee C_n$ or $[C_1, C_2, ..., C_n]$. For a DNF to hold, at least one of $C_i$ must hold. $[] \equiv \bot$.

CNF - $C_1 \wedge C_2 \wedge ... \wedge C_n$ or $\langle C_1, C_2, ..., C_n \rangle$. For a CNF to hold, each $C_i$ must hold. $\langle \rangle \equiv \top$.

Where each $C_i$ is a proposition, which may be atomic or compound. The last two, array-style notations are known as **generalised disjunctions and conjunctions** respectively. We can create algorithms to convert an expression to CNF or DNF, by mapping binary operators and their negations to conjunctive and disjunctive expressions. We call each of these **$\alpha-$** and **$\beta -$** **formulas**.

|**$\alpha$**|$\alpha_1$|$\alpha_2$|**$\beta$**|$\beta_1$|$\beta_2$|
|-|-|-|-|-|-|
|$X \wedge Y$|$X$|$Y$|$¬(X \wedge Y)$|$¬X$|$¬Y$|
|$¬(X \vee Y)$|$¬X$|$¬Y$|$X \vee Y$|$X$|$Y$|
|$¬(X \rightarrow Y)$|$X$|$¬Y$|$X \rightarrow Y$|$¬X$|$Y$|
|$¬(X \leftarrow Y)$|$¬X$|$Y$|$X \leftarrow Y$|$X$|$¬Y$|
|$¬(X \uparrow Y)$|$X$|$Y$|$X \uparrow Y$|$¬X$|$¬Y$|
|$X \downarrow Y$|$¬X$|$¬Y$|$¬(X \downarrow Y)$|$X$|$Y$|
|$X \nrightarrow Y$|$X$|$¬Y$|$¬(X \nrightarrow Y)$|$¬X$|$Y$|
|$X \nleftarrow Y$|$¬X$|$Y$|$¬(X \nleftarrow Y)$|$X$|$¬Y$|

To convert an expression $X$ to CNF, do the following:

- Place $X$ into $\langle [X] \rangle$.
- For each expression $D_i$ in $\langle D_1, D_2, ..., D_n \rangle$...
  - For each expression $N$ in $D_i$...
    - If $N = ¬\top$, replace with $\bot$
    - If $N = ¬\bot$, replace with $\top$
    - If $N = ¬¬Z$, replace with $Z$.
    - If $N$ is a $\beta$-formula, replace with the two entries $\beta_1, \beta_2$.
      - e.g. $[A \vee B] \Rightarrow [A,B]$
    - If $N$ is an $\alpha$-formula, then create two new disjunctions to replace this $D_i$, replacing $N$ with $\alpha_1$ and $\alpha_2$ respectively.
      - e.g. $\langle [A \wedge B, ...] \rangle \Rightarrow \langle [A, ...], [B, ...] \rangle$
- Terminate once we pass through the CNF without replacing anything.

To convert an expression $X$ to DNF, do the following:

- Place $X$ into $[ \langle X \rangle ]$.
- For each expression $D_i$ in $[D_1, D_2, ..., D_n]$...
  - For each expression $N$ in $D_i$...
    - If $N = ¬\top$, replace with $\bot$
    - If $N = ¬\bot$, replace with $\top$
    - If $N = ¬¬Z$, replace with $Z$.
    - If $N$ is an $\alpha$-formula, replace with the two entries $\alpha_1, \alpha_2$.
      - e.g. $\langle A \wedge B \rangle \Rightarrow \langle A,B \rangle$
    - If $N$ is a $\beta$-formula, then create two new conjunctions to replace this $D_i$, replacing $N$ with $\beta_1$ and $\beta_2$ respectively.
      - e.g. $[ \langle A \vee B, ... \rangle ] \Rightarrow [ \langle A, ... \rangle, \langle B, ... \rangle ]$
- Terminate once we pass through the CNF without replacing anything.


