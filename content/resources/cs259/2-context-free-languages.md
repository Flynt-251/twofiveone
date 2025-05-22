+++
title = "2 - Context-free Languages"
+++

A context-free language is one that has some more abilities compared to a regular language: we represent them using context-free grammars or push-down automata. Instead of just being able to extend in one direction as we've seen with regular languages, CFLs can "branch" into one of many different strings, much like the formation of English sentences or if statements in programming.

## Some of you need to learn this badly

Let's start by covering **grammars**, which tell us the structure by which a language can expand. It's often described as a set of rules to form a word. We use a four-tuple to represent these:

$(V, \Sigma, R, S)$

And here's what each symbol means:

- $V$ - **Variables (or Non-terminals):** expressions which may expand the string further.
- $\Sigma$ - **Alphabet**, often referred to as *terminals* in the context of CFLs.
- $R$ - **Rules**, a subset of $(V \cup \Sigma)^+ \times (V \cup \Sigma)^*$, which describes how a variable translates into a sequence of terminals and variables.
- $S$ - **Starting variable**, i.e. $S \in V$. This is the variable we start making a string with.

Commonly, you'll see a Grammar written in terms of its rules, like this:

$S \rightarrow T, \text{ } T \rightarrow A | B | \epsilon, \text{ } A \rightarrow aT, \text{ } B \rightarrow Tb$

This refers to the language $\{a^*b^*\}$, or any number of $a$s followed by any number of $b$s, which happens to be regular! This is an example of a **regular grammar**. We can then see quite clearly that the string $abb$ would be valid, and we call this a **derivation**, since we can form it like this:

$S \rightarrow T \rightarrow A \rightarrow aT \rightarrow aB \rightarrow aTb \rightarrow aBb \rightarrow abb$

A derivation is a **leftmost derivation**, if when we expand out variables, we start with the leftmost one, and work our way to the right.

### Everybody look to the left, everybody look to the right

We can convert a DFA to a Grammar fairly easily, by following the paths in which we could travel. We can either do this starting from the starting state, forming a **right linear grammar**, or from the final state(s), forming a **left linear grammar**. The term "X linear grammar" refers to a grammar where for each rule, we either have one terminal, or a terminal and a variable, with the variable on the *left*, or the *right*.

## What's the deal with Push-Ups?

*You push down, not up. \*Seinfeld theme intensifies\**

We can also represent CFLs using **Push-down automata** (PDA). These are essentially NFAs, but imagine that we additionally have a stack which we can store additional information on. So, their mathematical notation is quite similar to that of an NFA.

$(Q, \Sigma, \Gamma, \delta, q_0, F)$

$Q$, $\Sigma$, $q_0$ and $F$ are the same as in an NFA, but now we have $\Gamma$, and surely now $\delta$ will do something slightly different? Well, $\Gamma$ is the **stack language**, and usually contains $\Sigma$, plus some symbol to denote the bottom of the stack (here we use $\_$). Then, we define $\delta$ like this:

$\delta : Q \times \Sigma_\epsilon \times \Gamma_\epsilon \rightarrow 2^{Q \times \Gamma_\epsilon}$

Where $\Sigma_\epsilon$ and $\Gamma_\epsilon$ refer to each alphabet including $\epsilon$, so we can have epsilon-transitions.

Again, it's probably easier when we have a visual representation of a PDA, so let's draw the one for $\{a^nb^n : n \in \mathbb{N}\}$

![The corresponding PDA](/images/push-down-automaton-1.png)

The notation $x, y \rightarrow z$ means "read $x$ from the input, then pop $y$, then push $z$". We could represent this automaton as pseudocode, this may make it a little easier to understand.

```java
push(Stack.empty);
// read() reads the next character in the input, automatically
// moving to the next character.
while (read(input) == 'a') {
    push('a');
}
while (read(input) == 'b') {
    // pop() removes the specified item.
    // If there is a mismatch, it throws an error.
    pop('b');
}
pop(Stack.empty);
```

### Putting affection out of context

We can convert PDAs into CFGs, but first we need to make sure that the PDA we're using is *normalised*, which means:

- It only has one accepting state
  - If not, just make an epsilon-transition to the a new single state.
- It only accepts a string, if our stack is empty
  - Simply add the states required to empty the stack after the original accepting state, and make the last one the new accepting state.
- At any transition, we either push or pop, not both
  - Easy, just separate these actions out into separate states.

Now we produce rules for every pair of states $p,q \in Q \Rightarrow A_{pq}$.

- $A_{pp} \rightarrow \epsilon$, so do nothing on a self-loop.
- For any set of three states $p, q, r$, $A_{pq} \rightarrow A_{pr}A_{rq}$
- If we push a stack symbol $u$ and read $\alpha$ to go from $p$ to $r$, perform some further operations in $A_{rs}$, then pop $u$ and read $\beta$ to get from $s$ to $q$, then $A_{pq} \rightarrow \alpha A_{rs} \beta$.

### Putting context out of affection

We can also convert a CFG to a PDA, let's see how this would work by looking at an algorithm that uses a stack (since that's what a PDA basically is).

```java
// Start by filling the stack so that the leftmost character is at the top.
Stack s = new Stack(input.get());
String output = "";
while (!s.isEmpty()) {
    GrammarSymbol t = s.pop();
    if (t.isVariable()) {
        GrammarSequence tn = t.selectRandomRule();
        s.push(tn);
    } else {
        if (t != s.peek()) {
            fail("Invalid branch, try again.");
        } else {
            output += s.pop();
        }
    }
}
return output;
```

Now let's put this into context.

- Start at $q_0$, and transition to $q_1$ with the transition $\epsilon, \epsilon \rightarrow S\_$, so add the empty stack symbol, followed by the starting variable for the RegEx.
- At $q_1$, self-loop with each of the following rules for the leftmost symbol (or top of the stack):
  - For a variable $A \rightarrow B$, do transition $\epsilon, A \rightarrow B$.
  - For a terminal $a$, do transition $a, a \rightarrow \epsilon$.
- To get from $q_1$ to $q_2$, the accepting state, read the empty stack value, i.e. $\epsilon, \_ \rightarrow \epsilon$.

## Ignore the Wikipedia article for now

Now we talk about Chomsky. Yes, *that* Chomsky. Let's set aside the political stuff for now, and focus on his work in creating the **Chomsky Normal Form** (CNF). This is a standard way of writing context-free grammars, that ensures we don't have *ambiguity*, where a single string may be defined in multiple ways, and allows us to create each string of length $n$ in $2n-1$ steps. A grammar is in CNF if all of the rules fall under one of these definitions:

- $S \rightarrow \epsilon$, i.e. empty string is valid.
- $A \rightarrow x$, ending on a single terminal.
- $A \rightarrow BC$ where $B,C \in V \setminus \{S\}$.

If there's a rule that doesn't fit one of these templates, then it is not in CNF, but we can convert it using the following steps:

1. Make a new starting rule, $S_0 \rightarrow S$.
2. If there are any rules $A \rightarrow \epsilon$ that aren't $S_0$, remove them: they're unnecessary. Replace other rules with $\epsilon$ as needed, and do this repeatedly until all such rules are gone.
3. Remove any rules of the form $A \rightarrow B$, where $B$ is a variable, including self-references. Replace each such rule with its $A \rightarrow w$ form.
4. Split up any rules which give a mix of variables and terminals, or more than one terminal.

### Example

Let's try this on a grammar. Let's use this one:

$S \rightarrow bA | aB, \text{ } A \rightarrow bAA | aS | a, \text{ } B \rightarrow aBB | bS | b$.

So first, let's define $S_0 \rightarrow S$.

Now is where we'd normally remove any $A \rightarrow \epsilon$ rules, but there aren't any here, so let's move on.

We have *one* unit reference, which we just made: $S_0 \rightarrow S$. Let's convert this to $S_0 \rightarrow bA | aB$.

Now for the long part: splitting up the rules. *The best way to do this is, for each rule, to make a new rule using the two rightmost elements.*

We'll focus on the longer rules first: $A \rightarrow bAA$ and $B \rightarrow aBB$. Taking the two rightmost pairs from each, we get the new rules $U_1 \rightarrow AA$ and $U_2 \rightarrow BB$. We can translate the two original rules using these new ones:

$A \rightarrow bU_1, \text{ } B \rightarrow aU_2$

Now we have the following set of rules:

$S_0 \rightarrow bA | aB, S \rightarrow bA | aB$

$A \rightarrow bU_1 | aS | a$

$B \rightarrow aU_2 | bS | b$

$U_1 \rightarrow AA, U_2 \rightarrow BB$

We're almost done here, we just need to get rid of those rules that mix up terminals and non-terminals. We'll create the rules $V_a \rightarrow a$ and $V_b \rightarrow b$. These are nice and easy to substitute in, giving us the following final answer:

$S_0 \rightarrow V_bA | V_aB, S \rightarrow V_bA | V_aB$

$A \rightarrow V_bU_1 | V_aS | a$

$B \rightarrow V_aU_2 | V_bS | b$

$U_1 \rightarrow AA, U_2 \rightarrow BB$

$V_a \rightarrow a, V_b \rightarrow b$

## I'm a mature adult, I swear

Naturally, we may ask *"is it possible to check if a string can be formed from a CFG?"*, to which we can say *"yes, but buckle up since we have to use 2D Dynamic Programming!"* This describes the functionality of the **Cocke-Younger-Kasami (CYK) Algorithm**, which determines the construction of a string in a "Chomskified" CFG (see above). For this 2D array, each cell stores a variable, with each row creating a representation of the whole string, and each column representing a substring which forms part of the construction.

We start by directly translating each terminal in the string, to the left-hand side value of its rule. Then, we group each of these variables into two and translate these pairs to their originating variable. This keeps going until we reach the final/start variable, $S$. If we don't reach $S$ by the end, then this means the string cannot be part of the language.

If you like pseudocode, enjoy.

```java
Variables[][] m = new Variables[n][n];
// Set first row of m to the input string
for (int i=2; i<n; i++) { // Rows
    for (int j=1; j<n-(i-1); j++) { // Columns
        for (int p=1; p<i-1; p++) { // Distance between variables checked
            m[i][j] = union(
                m[i][j],
                reverseRule(m[p][j], m[i-p][j-p])
                // Gets R of R -> XY.
            );
        }
    }
}
return m;
```

## We're gonna need a bigger... context?

There are also languages *beyond* context-free, which we will cover next. But how can we prove that a language isn't context free? Well, we've already covered the fact that we can represent a context-free language as a rooted tree, and we know that if the language is finite, then it's regular, so up to a certain point, we must have part of the language repeating over and over again, extending the tree infinitely... wait. That sounds familiar. It's a lot like the **pumping lemma**! Oh. Okay, please can I ask you to contain yourselves again...

### Nope, you're getting nothing outta me!

Again, we have a **pumping number** $m$, but this time the definition of this number is a little more involved. It's still at least 1, but we can apply some semantics.

- Define $b$, which is the largest number of values in the right-hand side of a rule. This would translate to the maximum number of children on a non-terminal leaf node in our (incomplete) tree.
- Hence, we must have at most $b^h$ terminals at the bottom, where $h$ is the height of the tree.
- If $b$ is relatively small, but we have a very long string, then $h$ must be increasing. If $h$ is greater than the number of variables, then we have to be repeating variables somewhere (pigeonhole principle, coo.).
- Pumping lemma suggests that we are repeating some variable, so the pumping number is $b^{|V| + 1}$.

This is intended as a guide of how big $m$ could be. We can of course get a string smaller, or bigger than this.

Now onto the rest of it. Instead of splitting the string into three parts, we split it into *five*, giving us $w = uvxyz$. We then have the following rules:

- $|vxy| \leq m$, i.e. $vxy$ is short.
- $|vy| \geq 1$, meaning either of $v$ or $y$ are nonempty.
- $\forall i \in \mathbb{N}, uv^ixy^iz \in L$

#### Make the proof!

Again, we'll want to make a proof of contradiction. We then set our pumping lemma to $m$, pick a string we want to split into five, and show that we can't split the string in a way that we can get $\forall i \in \mathbb{N}, uv^ixy^iz \in L$. Let's do this!

#### Example 1

$L = \{a^nb^nc^n : n \in \mathbb{N}\}$

We don't have much choice in terms of our string here, we can only really go with $a^mb^mc^m$. But how do we split this into five parts? Well, we can simplify this by only focussing on what $vxy$ is. We are able to position this substring anywhere within, so it could be $a^j$, $b^j$, $c^j$, $a^jb^k$ or $b^jc^k$. Now we can set our value $i$ to be any value other than 1, and we know that this will unbalance all of the counts of letters, no matter how we split the string. $\Box$