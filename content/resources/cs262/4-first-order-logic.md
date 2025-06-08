+++
title = "4 - First Order Logic"
+++

By now, we can quite easily work with boolean predicates, operators and proof systems. But what do we do when we don't just have true and false values? What happens when we start to work with numbers? Then we start working with **First Order Logic**.

## Babe wake up, new symbols dropped

We've already seen *propositional connectives*, i.e. $\wedge$, $\vee$ and $\rightarrow$, and constants. Now we introduce quantifiers, variables, constants, functions and relations.

- **Quantifiers:** $\exists, \forall$ - meaning "There Exists at least one", and "For all".
- **Variables:** $x, y, z$, etc. - Any symbol that isn't restricted to a single value.
- **Relations:** $=, <, >$ - Any function or operation that takes in values and gives a boolean value.
  - e.g. Equality, $x = y$.
- **Functions:** $s(x), f(x), x + y$, etc. - Something that outputs a new value based on its inputs
  - e.g. the successor function $s(x)$.
- **Constants:** $1,2,3$, etc. - Any symbol of a predetermined value.

## Je ne peux pas parle la français

A **First Order Language** defines the basic notation of first order logic, and is represented as a 3-tuple, $L(R, F, C)$. Generally this defines how we write mathematical notation.

- $R$ - The set of relation symbols. This is finite or countably infinite.
- $F$ - The set of function symbols. This is also finite or countably infinite.
- $C$ - The set of constant symbols. This too, is also finite or countably infinite.

Then, from this language, we can construct a set of **terms**, which consist of any variables, constant symbols and functions with all arguments filled (i.e. $f(x,y,z)$ where all values are terms). The **family of terms** is the smallest set which allows us to create any term we want.

**Atomic Formulas** are strings containing a relation of n terms, all of which are filled, such as $x = y$ or $\text{isPrime}(5)$. There is then a **family of formulas** which satisfy the following:

- Any atomic formula is a formula of $L(R,F,C)$.
- If $A$ is a formula, then so is $¬A$.
- If $\circ$ is some binary connective, then we can combine formulas $A$ and $B$ to get $A \circ B$, which is also a formula.
- If we have formula $A$ and variable $x$, then $\forall x A$ and $\exists x A$ are also formulas.

It's also important that we keep track of variables, as these can be **free** or **bounded**. We define **free-variable occurrences** as such:

- If the formula is atomic, all variables are free-variable occurrences.
- Free-variable occurrences in $A$ are also free-variable occurrences in $¬A$.
- For $A \circ B$, any free-variable occurrences in $A$ and $B$ are also in the new, joined formula.
- If we have $\forall x A$ or $\exists x A$, then any variables that are **not** $x$ are free-variable occurrences.

So now we know how to write first-order logic. But how can we interpret meaning from this?

## Notice how they never smile for the camera?

We create a **model**, $M = (D,I)$ for a language $L(R,F,C)$, where the non-empty set $D$ is the **domain** of the model, and $I$ is essentially a mapping function from the language to the domain.

- For any constant $c \in C$, this constant maps to a $c^I \in D$.
- Any function $f \in F$ with $n$ arguments, maps to some function $f^I : D^n \rightarrow D$.
- Any relation $\mathbf{R} \in R$ with $n$ arguments, maps to some relation $\mathbf{R}^I \subseteq D^n$.

We can then make **assignments** of sets of variables to the set $D$. When we do this, this is called a **mapping**. Where we define a mapping $A$, on a variable $x$, we denote that this value has been mapped using the notation $x^A$.

Constants are not affected by mappings, so $c^{I,A} = c^I$. Variables don't have a preset value in a model, so we have to rely on a mapping for them to be useful in a use case, so $x^{I,A} = x^{A}$. And for functions, we immediately interpret their meaning from the model, so $(f(x_1, x_2, ..., x_n))^{I,A} = f^I(x_1^{I,A}, x_2^{I,A}, ..., x_n^{I,A})$.

Now that we have some meaning in place, we can determine if certain formulas are true or not.

- $R(x_1, x_2, ..., x_n)^{I,A}$ is true, *iff* $(x_1^{I,A}, x_2^{I,A}, ..., x_n^{I,A}) \in R^I$
- $(¬X)^{I,A} = ¬(X^{I,A})$
- $(X \circ Y)^{I,A} = X^{I,A} \circ Y^{I,A}$
- For some formula $\phi$...
  - $(\forall x \phi)^{I,A}$ is true, *iff* $\phi^{I,A'}$ is true **for each** assignment of $x$ in $A$, which we express as $A'$.
  - $(\exists x \phi)^{I,A}$ is true, *iff* $\phi^{I,A'}$ is true **for some** assignment $x$ in $A$, which we express as $A'$.

If a logical formula $\phi$ is true for all possible assignments in a model, if $\phi^{I,A} = \top$.

A logical formula is *valid*, if for any model, it is always true, and a set of formulas are *satisfiable* if they share an assignment such that all can be true.

Usually, when performing proofs, we quantify away any free variables (so say, there exists, or for all) to convert formulas into sentences. As seen previously, a sentence $X$ is a consequence of the set of sentences $S$ where for any $s \in S$, $s \rightarrow X$, and we write this as $S \vDash X$.

## Application time

Now we're almost ready to apply this knowledge to solving resolution and tableau proofs, but we just need a couple more definitions, namely $\gamma$- and $\delta$-functions, which allow us to temporarily assign a variable under a universal ($\forall$) or existential ($\exists$) quantifier respectively.

|$\gamma$|$\gamma(t)$|$\delta$|$\delta(t)$|
|--------|-----------|--------|-----------|
|$\forall x \phi$|$\phi\{x / t\}$|$\exists \phi$|$\phi\{x / t\}$|
|$¬\exists x \phi$|$¬\phi\{x / t\}$|$¬\forall \phi$|$¬\phi\{x / t\}$|

Where the phrase $\phi\{x / t\}$ means "substitute the free variable $x$ for bounded value $t$".

When proving a formula, we use the set **par**, which is short for par parameters, which is a set of constants that is disjoint from $C$ in $L(R,F,C)$. We include these constants in $L^{\text{par}}$.

## Back to tableau

Tableau proofs are similar to what we've done prior, but now we introduce two new rules:

|**$\gamma$**|**$\delta$**|
|-|-|
|$\gamma(t)$|$\delta(p)$|

Where $t$ is a closed term, so one of those new constants we defined in $L^{\text{par}}$, and $p$ is a new parameter that we haven't introduced yet, so this is essentially saying "we can find some possible assignment which we define as $p$.

### Example

Prove the formula $\phi = \forall x (P(x) \vee Q(x)) \rightarrow (\exists x P(x) \vee \forall x Q(x))$.

What this is saying, in simple terms is, "For any possible value, if either of P(x) or Q(x) are true, then either Q(x) holds for all values, or there's some value where P(x) holds".

First, we should start by negating this expression.

$¬(\forall x (P(x) \vee Q(x)) \rightarrow (\exists x P(x) \vee \forall x Q(x)))$ (1)

Then, we can perform an alpha-expansion, since the negative of an implication is conjunctive.

$\forall x (P(x) \vee Q(x))$ (2)

$¬(\exists x P(x) \vee \forall x Q(x))$ (3)

Then perform another alpha-expansion on (3).

$¬\exists x P(x)$ (4)

$¬\forall x Q(x)$ (5)

Now we need to start introducing some new stuff. We'll use a delta-expansion on (5). It makes sense to do this first, as we should re-use variables we introduce in gamma-reductions.

$¬Q(r)$ (6)

This then lets us do gamma-expansions on (4) and (2), reusing $r$.

$¬P(r)$ (7)

$P(r) \vee Q(r)$ (8)

The last thing we can do here is a beta-expansion, so we branch.

$P(r)$ (9a)

$Q(r)$ (9b)

And we can immediately see that both (9a) and (9b) have contradictions with (7) and (6) respectively, hence we have a closed proof.

## Re-resolution

We use the same new rules as we did in tableau proof.

### Example

Prove $\exists x \forall y R(x,y) \rightarrow \forall y \exist x R(x,y)$.

Start by putting the negation into a DNF.

$[¬(\exists x \forall y R(x,y) \rightarrow \forall y \exist x R(x,y))]$ (1)

And immediately split this into two using an alpha-reduction again.

$[\exists x \forall y R(x,y)]$ (2)

$[¬(\forall y \exist x R(x,y))]$ (3)

Then, once more, we do a delta-expansion on (2).

$[\forall y R(p,y)]$ (4)

And another one on (3), since the negation of "for all" is, there exists a violating value...

$[¬\exists x R(x,q)]$ (5)

Hmm, we can see that a contradiction is forming here. Let's do the two resulting gamma-expansions.

$[R(p,q)]$ (6) from (4)

$[¬R(p,q)]$ (7) from (5)

And (6) and (7) clearly contradict, so we can merge the two DNFs here to get an empty clause.

$[]$ (8)

As before, a set of sentences $S$ has the consequence $X$, if we can form a closed tableau and resolution proof for any sentence from $S$ and $X$.
