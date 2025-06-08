+++
title = "5 - Program Verification"
+++

Now, at long last, we get to the verification part of the module. We can use the skills we've learned up to this point to take program code, and formally ensure it's doing the right thing. If, like me, your immediate response is, "Why should I need to prove my own code works? It just does!", this might explain why you don't like doing proofs. Sometimes we forget to increment a value in a loop. Sometimes we use `1` instead of `-1`. Other times there are serious bugs that we need to detect.

## Making a language to verify

Here, we use a simple programming language with some basic constructs:

- **Assignment** - `x = <Int>`
- **Composition** - `<Instr 1>; <Instr 2>`
- **Conditional** - `if <Boolean> then {<Instr 1>} else {<Instr 2>}`
- **Loop** - `while <Boolean> {<Instr>}`

So, we could construct the following program:

```
x = 0;
y = 2;
while (x < 10) {
    if (x == 5) {
        y = 1;
    } else {
        y = 2;
    }
    x = x + 1;
}
```

## Prepostconditioning

*Yeah, that's not a real word.*

In verification, we have three main parts:

- **Precondition** - Conditions for values that we want to hold *before* the program runs.
  - If we don't have any preconditions, then we can set this to $\top$.
- **Program** - The... program itself.
- **Postcondition** - Conditions that must hold after the program runs. If we don't get these results, then something has gone horribly wrong.
  - If there's a postcondition that's ambiguous, then we state it as false.

Together, these form a **Hoare triple** (yes I know...).

$(|\text{Pre}|) Prog (|\text{Post}|)$

If values change in a program, we can retain historical values by using subscripts.

$(|x = x_0 \wedge y = y_0|) t = x; x = y; y = t (|x = y_0 \wedge y = x_0|)$

## Precon

*Okay I admit I'm being a bit deliberate here*

Consider this program:

$(|???|) x = x + 1 (|x > 2|)$

We obviously have a missing precondition here, and we can quite easily see that there are values which we can start with, that don't meet to requirements of the postcondition, e.g. $x = 0$. We can instead *imply* a precondition that allows the widest range of values, in this case $x > 1$. This is called the **weakest precondition**, since this is the weakest set of requirements we can impose to have our program work properly. We denote this using $wp(\text{P}, \text{Post})$, referring to the program and postcondition respectively.

$wp(x = E, \text{Post}) = \text{Post}[x/E]$

And if we have a composite program...

$wp(P; Q, \text{Post}) = wp(P, wp(Q, \text{Post}))$

### Example

Identify the weakest precondition of the program $x = y + 5; z = x \cdot 6$, with the postcondition of $z \geq 40$.

$wp(x = y + 5; z = x \cdot 6, z \geq 40)$

$ = wp(x = y + 5, wp(z = x \cdot 6, z \geq 40))$

$ = wp(x = y + 5, z \geq 40[z/6x])$

$ = wp(x = y + 5, 6x \geq 40)$

$ = 6x \geq 40[x/y + 5]$

$ = 6(y + 5) \geq 40$

$ = 6y + 30 \geq 40$

$ = 6y \geq 10$

## Dirty Logic

The weakest precondition of a conditional statement is found using this formula:

$wp(\text{if } B \text{ then } C_1 \text{ else } C_2, \text{Post})$

$= (B \rightarrow wp(C_1, \text{Post})) \wedge (¬B \rightarrow wp(C_2, \text{Post}))$

$= (B \wedge wp(C_1, \text{Post})) \vee (¬B \wedge wp(C_2, \text{Post}))$

**Hoare Logic** dictates that, for a composite program with $n$ commands, a program has the following structure.

$(|\phi_0|) \text{ } C_1 \text{ } (|\phi_1|) \text{ } C_2 \text{ } (|\phi_2|) \text{ } ... \text{ } (|\phi_{n-1}|) \text{ } C_n \text{ } (|\phi_n|)$

Which tells us, that from a postcondition $\phi_n$, we can work backwards, creating the associated weakest precondition, which is the postcondition of $C_{n-1}$.

We can also either **strengthen the precondition**, or **weaken the postcondition**, or restrict the scope of the precondition, or widen the outputs, and have the program still be valid. This is because, the weakest precondition provides a *bare minimum* set of rules that have to apply for the program to run correctly, and we can imply that widening the scope of outputs must accept the same outputs as before.

Finally, working with loops is interesting, let's say we have the program $\text{while} \text{ } B \text{ } \{C\}$. We can obviously assume the postcondition $¬B$, but we also need a **loop invariant**, $L$, to give us:

$(|L|) \text{ } while \text{ } B \text{ } \{C\} \text{ } (|¬B \wedge L|)$

$\Rightarrow (|B \wedge L|) \text{ } C \text{ } (|L|)$

It's up to you to find a loop invariant that works best for your proof, and it must always hold, even after the loop terminates. This takes some practice.

