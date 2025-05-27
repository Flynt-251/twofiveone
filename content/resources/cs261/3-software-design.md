+++
title = "3 - Software Design"
+++

So, now we've established what the user wants from us, and we have an idea of what the final system *should* look like, now for the fun part: the programming! Or rather, planning for the programming, as the decisions made at this point will dictate how the system runs. Namely, we're focussing on design **patterns**, i.e. identifying how to achieve certain complex things in code and system architecture. Hence, we're looking at Architectural and Software patterns. Let's cover the former first, since this is the largest factor in the structure of our code and system.

## Arky-tech-ture

Architecture patterns are what define your tech stack. You have have heard of some common tech stacks, like LAMP or MEAN. When we focus on the architectural pattern, *we are focussing on the flow of data between components*, which we should have already defined in our system design previously.

### Lay it on brick by brick

*Much like some of y'alls instagram feeds. Yeesh.*

In the **Layered Architecture**, everything is essentially on a stack. For any component in the system, it will only rely on the services below it, and serve the component above it. This paradigm is present in many cases, including OS Kernels and Transmission Control Protocol.

This allows for separation of concerns, as we can have a separate development team for each layer, and we can always swap out a layer so it can run on a different system, or to run more efficiently, for example. By not bundling everything together, we can be sure that minor changes to one layer don't affect the others, so long as outputs are the same. We can also add redundant facilities such as authentication at each layer, which may be important for enterprise systems.

Of course, this assumes your system *can* interact in such a way that communications can only be between adjacent components. This does also mean that there can be some overhead in performance, if a higher-up layer needs services from the bottom-layer component, which isn't ideal for an embedded system, for instance, where performance really counts. Also, if something causes one layer to fail, the whole system will go down.

### Hop on Repo

*And please don't scream this time...*

With **Repository Architecture**, we store all data on one monolithic *repository*, and all other software components read and write to this repository. You can think of this repository as a database (and quite often it is a database). All components will only talk to the repository. If there are services between components that are needed, such information must be passed through the repository exclusively.

Now, if one of these components goes out, the system as a whole can still function. Furthermore, we have a great means of ensuring integrity as we're only storing data in one central location: no chance for duplicate or redundant information, which also means changes are easy to propagate over all components. This also permits us to share lots of data all at once.

Of course, if the repository goes out, you're screwed. Additionally, there's still overhead in inter-component communication, and we're locked in to whatever design we use for the repository. What that means is, the scalability and flexibility of the system entirely depends on the repository. Want to update how data is stored? Add another table? Remove an attribute? Then you have to reflect that change in *all* of the software components.

This is best if you're working with lots of data over a long period of time , i.e. a Data Driven System. This is most notably popular in AI.

### Plumbing with a cup of Coffee

*Nothing says good morning like the smell of hot sewage*.

**Pipe and Filter Architecture** especially focusses on the flow of data. Each component has some data input, and a data output. Such inputs and outputs may feed into/out of components to produce an output that is returned to the user. Multiple components may even receive the same output information and digest it differently, or to process information in parallel or in batches.

We can easily add to a system of this structure, and it's well-known and widely used. We can also take components and re-use them elsewhere, and swap portions around to be either sequential or parallel as needed.

But, this assumes your inputs are *very* standard and non-deviating. If they do change, you may have to drastically change how each component works, ensuring it sticks to the same standard of functional-ness. This also ignores any need for GUI, this would be handled separately from this architecture, which for some of us isn't a problem. It's not *that* hard to figure out how to work a REST API after all.

### View it, Code it, Jam, Unlock it.

*Technologic.*

We can often separate a piece of software into three pieces, an overview of the information we need, the ability to update it, and a state that the application observes in the background: a View, Controller and Model. This is **Model-View-Controller Architecture**.

- **View** - Provides a useful rendition of the *Model*, and sends *User Events* to the *Controller*
- **Controller** - Selects the *View* used, and maps user interactions to the *Model*
- **Model** - Tracks the state of the application, and sends *Notifications of Change* to the *View*.

We see this behaviour in web apps, where the View is the front-end, the Controller is the client-side Javascript, and the Model is the server back-end.

Again, this allows us to separate each of the components such that we only care about ensuring inputs and outputs are correct, de-coupling the data from one certain method of representation: we can allow the user to display the data however we want.

This being said, the nature of these interactions and split can additionally complicate our solution, and each component is reliant on each other, which can make things a bit messy in terms of distributing development teams, and reduce portability of each component.

## Coding and Funny Words, Magic Man

Programming Design patterns allow us to quickly and easily convey how we're doing something, so that we're not being incredibly verbose about how the current app randomly picks a picture of a toaster (and making sure it's not using the internet slang meaning). **Design Patterns** are standard solutions to programming problems, and represent the interaction between objects or classes. Yes, that means we're looking at Object-oriented programming here. Apologies to all of my fellow Haskell enthusiasts.

If anything, make sure you at least know the following four things about a design pattern: the **Name**, the **Problem** it's trying to solve, the **Solution** that the pattern adopts, and the **Consequences** of using the pattern. Because all of our actions have consequences.

### Let's warm ourselves up a bit...

*Hugs usually work great if you're cold, but we don't have time for that!*

Even without remembering any of the content in this model, you should be familiar with **Encapsulation**, **Inheritance**, **Iteration** and **Exceptions**. These each have a problem that they solve, which have some negative behaviours.

## The joy of creation (patterns)

**Creational Patterns**, as the name might suggest, focus on the ways that classes are defined, and how objects are created.

### The children yearn for the production lines

*Nothing beats the sweat and heat from working 12 hours a day in the factories*

**Name:** Factories

**Problem:** Repetitive code from instantiating multiple different objects over and over again, each with some variation.

**Solution:** Create a new class that bundles all of the classes we need into one, letting us add specialisations as we need them.

**Pros:** Reduces repeated code, and enables easier integration of new variations.

**Cons:** Additional classes needed, and extension of classes means extension of factories.

#### Example

```java
public class MultiLayerCake {
    public MultiLayerCake() {
        Cake layer1 = new Cake();
        layer1.setFlavor("Vanilla Sponge");
        Cake layer2 = new Cake();
        layer2.setFlavor("Vanilla Sponge");
        Cake layer3 = new Cake();
        layer3.setFlavor("Vanilla Sponge");
        String frosting = "Vanilla";
    }
}

public class OreoStyle extends MultiLayerCake {
    public OreoStyle() {
        Cake layer1 = new Cake();
        layer1.setFlavor("Double Chocolate");
        Cake layer2 = new Cake();
        layer2.setFlavor("Vanilla Sponge");
        Cake layer3 = new Cake();
        layer3.setFlavor("Double Chocolate");
        String frosting = "Vanilla";
    }
}

public class VictoriaDeluxe extends MultiLayerCake {
    public VictoriaDeluxe() {
        Cake layer1 = new Cake();
        layer1.setFlavor("Vanilla Sponge");
        Cake layer2 = new Cake();
        layer2.setFlavor("Jam-infused Sponge");
        Cake layer3 = new Cake();
        layer3.setFlavor("Vanilla Sponge");
        String frosting = "Strawberry";
    }
}
```

Those cakes may sound nice but Yuck! That's a lot of repeated code. Let's try that again.

```java
public class Cake {
    private String flavor;
    public Cake() {
        flavor = "Vanilla Sponge";
    } 
    public Cake(String flvr) {
        flavor = flvr;
    }
}

public class MultiLayerCake {
    public MultiLayerCake() {
        layer1 = new Cake();
        layer2 = new Cake();
        layer3 = new Cake();
        frosting = "Vanilla";
    }
    public MultiLayerCake(String frost) {
        MultiLayerCake();
        frosting = frst;
    }
}

public class OreoStyle extends MultiLayerCake {
    public OreoStyle() {
        super();
        layer1 = new Cake("Double Chocolate");
        layer3 = new Cake("Double Chocolate");
    }
}

public class VictoriaDeluxe extends MultiLayerCake {
    public VictoriaDeluxe() {
        super("Strawberry");
        layer2 = new Cake("Jam-infused Sponge");
    }
}
```

Now those sub-classes are looking much neater!

### Bob the Building

*He's a building, Bob the Building... oh no!*

**Name:** Builders

**Problem:** Some classes use the same constructors, or have a similar shape, but each vary slightly.

**Solution:** Construct one generic *builder*, which can then be specialised into one of many unique builders that's tailored to one class's needs.

**Pros:** More reusable code, and single responsibility principle.

**Cons:** Large number of new classes made, resulting in longer code.

#### Example

```java
class PsychologyDepartment {
    private ITSystem its;
    private int enrollmentCapacity;
    private int profCount;

    public setUpIT() {
        its = new ITSystem();
    }

    public PsychologyDepartment() {
        setUpIT();
        enrollmentCapacity = 500;
        profCount = 150;
    }
}

class ComputerScienceDepartment {
    private int enrollmentCapacity;
    private int profCount;

    public ComputerScienceDepartment() {
        enrollmentCapacity = 300;
        profCount = 100;
    }
}
```

We see here that both departments share some similarity. They both have a certain capacity of students they can enrol, and a number of professors working for that department. However, the Computer Science Department doesn't need to have any central IT systems they need installed.

```java
class Department {
    protected int enrollmentCapacity;
    protected int profCount;

    public setUpIT() {
        return new ITSystem();
    }
}

class PsychologyDepartment extends Department {
    private ITSystem its;

    public PsychologyDepartment() {
        its = setUpIT();
        enrollmentCapacity = 500;
        profCount = 150;
    }
}

class ComputerScienceDepartment extends Department {
    public ComputerScienceDepartment() {
        enrollmentCapacity = 300;
        profCount = 100;
    }
}
```

### It's a prototype

*Not the other thing starting with "Proto".*

**Name:** Prototypes

**Problem:** Multiple classes share the same or similar shape.

**Solution:** Have one object which other can *clone*, and each can modify its own data as needed.

**Pros:** Reduces need for subclasses, creating a simpler class hierarchy.

**Cons:** Can lead to circular references, i.e. objects referencing each other, and heavy modifications may be needed depending on use case.

#### Example

Let's go back to our cake example.

```java
public class MultiLayerCake {
    public MultiLayerCake() {
        Cake layer1 = new Cake();
        layer1.setFlavor("Vanilla Sponge");
        Cake layer2 = new Cake();
        layer2.setFlavor("Vanilla Sponge");
        Cake layer3 = new Cake();
        layer3.setFlavor("Vanilla Sponge");
        String frosting = "Vanilla";
    }
    public static cloneLayer1() {
        return layer1.clone();
    }
    public static cloneLayer2() {
        return layer2.clone();
    }
    public static cloneLayer3() {
        return layer3.clone();
    }
    public static cloneFrosting() {
        return frosting.clone();
    }
}

public class OreoStyle extends MultiLayerCake {
    public OreoStyle() {
        MultiLayerCake original = new MultiLayerCake();
        Cake layer1 = new Cake();
        layer1.setFlavor("Double Chocolate");
        Cake layer2 = original.cloneLayer2();
        Cake layer3 = new Cake();
        layer3.setFlavor("Double Chocolate");
        String frosting = original.cloneFrosting();
    }
}

public class VictoriaDeluxe extends MultiLayerCake {
    public VictoriaDeluxe() {
        MultiLayerCake original = new MultiLayerCake();
        Cake layer1 = original.cloneLayer1();
        Cake layer2 = new Cake();
        layer2.setFlavor("Jam-infused Sponge");
        Cake layer1 = original.cloneLayer3();
        String frosting = "Strawberry";
    }
}
```

## About as well-structured as a Twitter argument

**Structural Patterns** are useful in making implementations easier by acknowledging how objects interact between each other.

### Getting someone else to do your dirty work

*Your secret's safe with me...*

A **Proxy Design Pattern** is a fancy way to describe a placeholder. Like what you might see for an image if it's unable to load, like this one:

![This would be a really cool image, but it doesn't actually exist.]()

**Name:** Proxy

**Problem:** Need for a placeholder, i.e. some data may load after something else initialises/gets displayed.

**Solution:** Create a placeholder class which can then redirect to another object, the one that is actually needed.

**Pros:** Allows better management of objects that take longer to load, and/or have a life cycle that needs to be managed. Proxies are easy to introduce without massively altering the application.

**Cons:** More classes, and initialising a proxy creates some more overhead in fetching the required object.

### Wait it's not Christmas...

*Why are we getting decorations out, and why are you tangled in the lights?*

**Name:** Decorators

**Problem:** Multiple elements or objects have the same behaviour, but perform slightly differently.

**Solution:** Create a base class, and for each element, a *wrapper* around the base to add the small, different behaviour.

**Pros:** Can extend and combine behaviours without creating lots of additional subclasses, and ensures single responsibility principle.

**Cons:** Can be hard to remove later on, become order-dependent and create messy code.

### Why did my hairdryer blow up?

*It's because it's rated for 120V and you stuck it in a 240V adaptor...*

**Name:** Adaptor

**Problem:** Data stored in an object doesn't meet the right criteria for output, but changing the current object would require massive refactoring.

**Solution:** Create an extension class that either adds or modifies properties to fit the appropriate output needs.

**Pros:** Single responsibility principle, and prevents the need for major refactoring of code.

**Cons:** Not always suitable, may be less complex to just modify the original object.

### Buzz Off!

*It's that perfect time of year to have a gnat fly right into your eye.*

**Name:** Flyweight Pattern

**Problem:** Multiple instances of the same class share the same static data, leading to lots of unnecessary memory usage.

**Solution:** Define a supplementary data class, which acts as a constant variable that each instance is tied to.

**Pros:** Lower memory usage.

**Cons:** Some data may need to be re-calculated, increasing CPU load, and code complexity increases.

## Devs behaving badly

**Behavioural Patterns** describe how objects *interact* with each other. If we're able to standardise such behaviour, we can make it much easier to implement objects' communications.

### Again and again and again and again...

*Like how it feels revising at the moment...*

**Name:** Iterator Pattern

**Problem:** A class needs to be traversed over, needing its own function to organise data, potentially cluttering up the code.

**Solution:** Use a language-standard class to create a linear structure that can be looped over, an *iterator*. These are standard in Python and Java.

**Pros:** Single responsibility principle, and lots of flexibility, e.g. multiple types of iterator, ability to iterate in parallel, pause, etc.

**Cons:** Not a one-size-fits-all solution, some classes are highly specialised.

### Like and Subscribe to watch me blow u-

*We're not doing this again.*

**Name:** Observer Pattern

**Problem:** Some object (subscriber) needs to check for a change in state of another object (publisher), but constantly checking this other object is very inefficient.

**Solution:** Subscribers can opt in or *"subscribe"* to a publisher to get updates. Once the publisher changes state, it notifies its subscribers (push notify). This can work the other way too, with subscribers asking publishers if they have updated (pull notify).

**Pros:** Easy and dynamic interface for subscribers to access publishers, no need to directly tether the two, requiring a redesign of the code.

**Cons:** Not entirely deterministic, we can't be sure what order in which subscribers are notified by a publisher.

### "Take this as a memento"

*I remember this bit from Tomodachi Life and I actually cried.*

**Name:** Memento Pattern

**Problem:** We need to be able to *undo* certain actions without exposing the functionality of objects, such as superclasses.

**Solution:** Implement a *snapshot* class which takes in objects, and can restore information from these as necessary. A *caretaker* class can then store these snapshots and trigger restoration as needed. This encapsulates the undo function inside of another class, ensuring we keep the original class's workings unexposed.

**Pros:** Ensures we don't violate encapsulation, while still retaining important information.

**Cons:** Uses lots of memory and needs its own garbage collection to remove unneeded snapshots. Likewise, dynamic programming languages may alter the memento due to garbage collection or type casts.

### 4D Chess

*Every politician's favourite game!*

**Name:** Strategy Pattern

**Problem:** We have multiple different ways to solve a problem, and we need to select one particular way, based on our input.

**Solution:** Implement an abstract *strategy* class which then has a concrete class for each solution we want to implement. We can then determine the correct solution to use, when needed.

**Pros:** More modular, we can swap out an implementation later on quite easily, while additionally keeping us from needing to touch the original code and adding additional complexity to the class hierarchy.

**Cons:** Pointless if there are only a few algorithms to choose from, plus we need to understand how each strategy is different. Also... anonymous functions??

## Solid as Iraq!

*Wait no, solid as a rock, I've got Arrested Development on the mind...*

Either way, following **SOLID Principles** ensures that code written in Object-Oriented Programming Languages can be kept easy-to-understand, maintainable and flexible. Not much is worse than trying to de-tangle spaghetti code!

- **Single Responsibility** - Each class should be responsible for just one piece of functionality.
- **Open/Closed** - Open for extension, closed for modification, meaning we should always prefer to extend a class to add functionality, not change its original code.
- **Liskov Substitution** - A child class can act as its parent class without any distinction in behaviour.
- **Interface Segregation** - Prioritise small, specific interfaces over big, general ones to improve maintainability.
- **Dependency Inversion** - A higher level class should not depend on a function of a lower level class. Both classes should instead inherit from a common interface, to ensure fewer dependencies.