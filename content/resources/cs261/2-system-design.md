+++
title = "2 - System Design"
+++

Now that we have an idea of what we *want* from our solution, we now need to find out how it'll all fit together. By considering the system's design at this stage, we can start to turn these natural language requirements into unambiguous, strict constraints that can translate into a software solution. **System Modelling** lets us visualise the system in a mathematical-like model, helping us to identify the constructs we need, as well as how components are intended to interact. Such models may be **External**, **Interaction**-focussed, **Structural** or **Behavioural**. **Unified Modelling Language (UML)** is a widely accepted standard for system modelling, and encompasses a wide number of different types of diagram (see below). We'll only focus on class diagrams, activity diagrams, use case diagrams, sequence diagrams and state diagrams.

![Tree of diagrams under the UML standard, sourced from https://en.wikipedia.org/wiki/Unified_Modeling_Language#Diagrams](https://upload.wikimedia.org/wikipedia/commons/e/ed/UML_diagrams_overview.svg)

> Image Source: https://en.wikipedia.org/wiki/File:UML_diagrams_overview.svg

## Now that diagram's got class

A **class diagram** shows us the structure of a system that uses classes, showing each class's relationship to each other and how they interact. Here, we form class hierarchies, identify common behaviours, create interfaces, and determine attributes. Each class contains...

- **Name** - The identifier of the class
  - If the name is in italics, like *Canine*, this is an abstract class.
  - An interface must be prefixed with \<\<interface\>\>.
- **Attributes** - Data stored in the class. Each attribute has the form "x attr: type". Replace x with...
  - +, for a public attribute, accessible anywhere
  - -, for a private attribute, only accessible within the class
  - #, for a protected attribute, accessible to child classes
  - /, for a derived attribute, from other data
  - Underline the name if the attribute is static.
- **Methods** - Functions and subroutines that run within the class. These have the form "x method(arg: type): outputType". Replace x with...
  - +, for a public method, callable anywhere
  - -, for a private method, only callable by another method in that class
  - #, for a protected method, callable from a child classes
  - /, for a derived method, from other data
  - ~ , for a package method, that's auto-generated
  - Underline the name if the method is static.

Classes may be connected, by either inheriting from a parent class, implementing an interface, or by one of aggregation, composition, or dependency.

- If a class inherits from another, draw a line with a black arrow, pointing to the parent class.
- If a class inherits from an abstract class, draw a line with a white arrow, pointing to the abstract class.
- If a class implements an interface, draw a dashed line with a white arrow, pointing to the interface.

![A class diagram showing the relationship between three types of canid (not necessarily biologically accurate)](/images/uml-class1.png)

Classes may also be related as they use each other in some way that does not require inheritance:

- **Aggregation**, white diamond - A class is part of another
- **Composition**, black diamond - A class is made up from another
- **Dependency**, dotted line - A class temporarily uses another.

![A set of class diagrams showing how to represent aggregation, composition and dependency](/images/uml-class2.png)

## Putting things in context

A **Context Model** shows how *multiple systems* interact with each other. Let's say we were building a self-service checkout, we'd need to interface with at least two other systems: a payment processor to take card payments, and the shop's loyalty card program, as this is likely a separate system, given it likely has data also accessible on other devices, such as customers' mobile phones.

![A Context Diagram for a self-service checkout, as described above](/images/uml-context.png)

## Keep Active!

*Seriously, it's a bit of a problem with CS students.*

An *activity diagram* shows us the process that takes place when we take a certain action. For this example, let's look at what would happen for a recorder app, that lets us either record video or audio.

![Activity diagram for a recording app. The app allows for either audio only or audio and video in parallel](/images/uml-activity.png)

You might compare this to a flow diagram, but keep in mind that *activity diagrams can show us things that happen concurrently and/or in parallel*.

## The case of use and abuse

**Use Case Diagrams** are used to show how different types of user may interact with a system. Let's continue with our self-checkout example.

![Use Case Diagram for a self-checkout. A customer can add or remove items, and pay for their shopping and get cashback. A member of staff may also remove items, but may need to approve a sale, if the customer is buying alcohol](/images/uml-use-case.png)

If you have systems where a user may interact with another of the same type, such as on a messaging server, *do not put multiple instances of the same user*.

## KISS: Keep In Sequence, Silly

A **sequence diagram** shows us how certain processes interact with each other as the system runs. We may need to send data between multiple devices over a network on the internet, so a sequence diagram shows us who talks to who, generally what data is transmitted, and what the timings are.

Let's say we have a system where, a computer, on boot, connects to a local server, which reports to a "supervisor" server. The computer then shares with the local server continuously, until it shuts down. The exception to this, is if the local server detects an abnormality, then it reports this to the supervisor and instructs the computer to shut down. Here's what that would look like, on a sequence diagram.

![Sequence Diagram of the above description](/images/uml-sequence.png)

## In a familiar state

Lastly, we will look at **state machine diagrams**. State diagrams describe how the system may be in one of a set of states, and the actions needed to move between them. Let's use a variation on an example we saw earlier.

![A state diagram describing a similar system as the activity diagram above](/images/uml-states.png)

In fact, if you look at the UML tree at the top, you can see that activity diagrams and state machine diagrams are under the same family of behaviour diagrams. Again, you could compare these to flow charts, but the distinction here is that a state machine diagram will move state *in response to an event happening*, which in our case, is pressing the record button. But for a flow diagram, each box represents a procedure we carry out, before moving instantly to the next one.

## Need to make your own UML diagrams?

No problem, I used [Gaphor](https://gaphor.org/) to make these examples. It's available on Windows, MacOS and Linux, and I can say that it works fairly well. Now make some diagrams and pretend you know what you're talking about!