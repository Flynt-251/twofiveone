+++
title = "6 - Prolog"
+++

Prolog is short for "Programming Language that uses First Order Logic", and it is a nightmare to work with. If you're doing this module, and/or you have been forced to do work in prolog, I'm very sorry. It's okay though, I'll help you get through it. This will also be a little less painful if you've worked with functional programming before.

Here, I'm using SWI-Prolog, but you can also use GNU-Prolog. On Linux, all you need to do is install `swi-prolog` with your favourite package manager, and then run `swipl` to enter its CLI, or `swipl knowledge.pl` to use a "knowledge base" as it's called (yes it uses the same file extensions as perl files, and yes it's very annoying).

Prolog is declarative by nature, and is actually, kind of stupid. It works by having you, the programmer, write tautologies which dictate how the program works. Take a look at this example program:

```prolog
canine(wolf).
canine(fox).
canine(coyote).
```

So here, we have three tautologies, that state that the literals "wolf", "fox" and "coyote" all satisfy the "canine" predicate. If in `swipl`, we type `canine(wolf).` (make sure the full stops are there!), we get given `true.`, so prolog knows that this is a fact. But, if we write `canine(tiger)`, we get back `false.`.

But what if we want to be given all the possible literals that satisfy `canine`? Well, we can use any term starting with a capital letter, usually `X`.

```
?- canine(X).
X = wolf ;
X = fox ;
X = coyote.
```

Tip: use the semicolon key to read multiple results. Use the full stop key to finish.

When prolog is given a variable, it will explore all possible values in order to satisfy the predicate. We can also define multiple arguments in a predicate.

```prolog
hunts(wolf, deer).
hunts(fox, rabbit).
hunts(coyote, rodent).
```

Type signatures of predicates take the form `predicate/N` where N is the number of arguments the predicate takes. In this case, we have `hunts/2`.

## Gluing logic together

Being such a logic-forward language, prolog has constructs for chaining together expressions. Let's extend our program a bit.

```prolog
prey(X) :- hunts(_, X).
```

The `:-` symbol allows us to define predicates in terms of others. In this case, we define `prey` and checks the input to see if it is "hunted". We don't care about which predator the prey is associated to, so we can use an `_` for values we don't need. Usually defining a variable and not using it will make `swipl` throw a warning.

```
?- prey(X).
X = deer ;
X = rabbit ;
X = rodent.
```

We can chain together multiple predicates using this construction by using commas as separators.

```prolog
hunts(wolf, fox).

predatorAndPrey(X) :- 
    canine(X),
    prey(X).
```

Doing this acts as an "and", so all predicates used here must be satisfied. Hence, only `fox` can satisfy the `predatorAndPrey/1` predicate.

## Cut that out!

Let's extend our logic a little bit...

```prolog
hunts(wolf, deer).
hunts(wolf, rabbit).
hunts(wolf, fox).
hunts(fox, rabbit).
hunts(fox, rodent).
hunts(coyote, rodent).
hunts(coyote, rabbit).
```

So now one canine may have multiple different prey. Let's make a predicate that outputs the prey of an animal.

```prolog
preyOf(X) :-
    hunts(X, Y),
    write(Y).
```

Something you'll need to get used to in prolog is the fact you can't call other predicates inside of other predicates. Instead, call your inner predicate first, using a variable which you then pass on to your outer predicate. Oh, and you can use `write/1` and `writeln/1` to print stuff.

```
?- preyOf(wolf).
deer
true ;
rabbit
true ;
fox
true.
```

Hang on, that's way more output than we need! We just want to know one prey of our animals, and we can set this behaviour by using a **cut**.

```prolog
preyOf(X) :-
    hunts(X, Y),
    write(Y),
    !.
```

This tells prolog to stop what it's doing here, and return the result of the predicate, which is useful in improving performance, although bear in mind that the behaviour of prolog is deterministic, so it will always pick the first option it can. In our simple example then, the prey of a wolf will always be deer.

```
?- preyOf(wolf).
deer
true.
```

## Math time

Maths in prolog is weird. Let's make a simple predicate to demonstrate this.

```prolog
isFive(X) :-
    X = 2 + 3.
```

Not an efficient way of doing things, but that's not the point here. Based off of this code, we should get true if we enter `isFive(5).`, right? Well, uh...

```prolog
?- isFive(5).
false.
```

Uhh... what the fuck? Yeah, so that's the funny thing about prolog, *it doesn't automatically evaluate maths expressions*, you have to force this behaviour yourself. So we can enter `isFive(2 + 3).`, and this is true. To force prolog to stop being lazy and do maths, we need to use the `=:=` operator or `is`. Likewise, for not-equals, we use `=/=`.

```prolog
isFive(X) :-
    X =:= 2 + 3.
```

## I wish humans had tails

*Even prolog gets tails!*

**Lists** in prolog work similarly to those in Haskell, in that you have a head, and a tail, although you can manually index lists, and use `member/2` to do a linear search. But for any sort of iteration, you'll need to use recursion and head-tail notation. This also means considering your base case, otherwise you'll end up with some nasty stack overflows.

```prolog
square([], []).
square([Head | Tail], [SqHead | SqTail]) :-
    SqHead is Head * Head,
    square(Tail, SqTail).
```

Also, depending on the requirements of your code, you may need to get used to the concept of considering your outputs as parameters to your predicate. Remember that you can output these by using a variable in the CLI, or you can always use `write/1` and `writeln/1` as mentioned above.

```
?- square([1,2,3], X).
X = [1, 4, 9].
```

> Think anything else needs to be covered? Let me know and I'll write it down (within reason, I'm not gonna magically give you the answer to this module's coursework, someone else can do that).