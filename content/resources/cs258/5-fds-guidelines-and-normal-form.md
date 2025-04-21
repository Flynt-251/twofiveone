+++
title = "5 - Functional Dependencies, Guidelines and Normalisation"
+++


## My parents do not functionally depend on me

**Functional Dependencies** provide a good metric on how to determine if the design of a given database is "good". They describe how sets of attributes are related to each other, allowing us to seek improvements to an existing design, and better define how tables should be structured.

Given the sets of attributes in a table, $X$ and $Y$, we say that **$X$ functionally determines $Y$** with the notation $X \rightarrow Y$, which essentially states that some set of values defined from $X$, determines its own distinct set of values in $Y$, *much like a function would*. This means if the same tuple of $Y$ leads to two or more different $Y$ tuples, then $X$ cannot functionally determine $Y$.

|Publisher|                 Game                 | MSRP |
|---------|--------------------------------------|------|
|Nintendo |Super Mario Galaxy                    |£35.99|
|Nintendo |The Legend of Zelda: Twilight Princess|£39.99|
|  SEGA   |Sonic Generations                     |£32.99|

For the example table above, we can say that $Game \rightarrow MSRP$, since there are no cases where two different games have the same MSRP. However, We cannot say that $Publisher \rightarrow Game$, as we can see that Nintendo would give two separate values in this table. *Note that we can disprove a functional dependence, but we cannot prove one, as the data in the relation may change later on.*

## Toss me my keys!

A quick round-up on the types of keys in a relation

**Superkey** - Any subset of attributes that uniquely identify a record in the table, including the entire row itself

**Candidate key** - A **minimal superkey**, which is a *superkey* of the smallest possible size. Usually this can be pinned down to one "ID" attribute, or a small subset of attributes.

**Primary Key** - The chosen *candidate key* for the table.

**Foreign Key** - an attribute referencing the *primary key* of a record in another table.

**Composite Key** - A *primary key* consisting of more than one attribute. (Not seen in this module)

From this, you should be able to deduce that for a primary (or candidate) key $K$, then for any set of attributes $A$, $K \rightarrow A$.

## So apparently there's a "right" way of doing things

I'm personally sick of hearing the word "right" right now.

### Guideline 1 - Easy to Understand

There shouldn't be any ambiguity with what a table is primarily storing.

Take this table as an example, what is it storing? Item information? Basket contents? Customer details??

|Item ID|Item Name|Customer ID|
|-|-|-|
|7274835|Apples (x6) |284836|
|8283856|Bananas (x5)|882257|
|9043803|Cantaloupe  |284836|

### Guideline 2 - Remove Redundancy

This refers to data stored multiple times in the same table. This is usually a bad choice, given we can make a separate table and point to it using a foreign key. Furthermore, if one record gets updated, we run the risk of creating inconsistent/anomalous data.

- **Update Anomalies** - A duplicate attribute gets updated, making it inconsistent with the rest of the table. Most common when the name of something changes, or there are multiple aliases for it.
- **Insert Anomalies** - We may end up needing more information than what we currently have on hand at the moment. We could use NULL values but this is also bad practice if done frequently!
- **Delete Anomalies** - If we delete a record containing a unique but possibly reused attribute, we permanently lose information.

### Guideline 3 - [Content Not Found]

The `NULL` value should be used sparingly. It takes up unnecessary space, and can lead to problems down the line if they are used excessively, such as in aggregation functions. If an attribute contains values for only a small subset of records, it is better to create a new table, using the same primary key to store that information, i.e., **decomposing** the table.

### Guideline 4 - No spurious tuples

We just mentioned that it can be useful to *decompose* tables into more than one table, and this is particularly applies when we have lots of duplicate data or lots of null values. However, this guideline works both ways: if we decompose tables such that we end up with a poor design, we can *create more* spurious tuples, worsening the problem. As such, the general advice is to split, such that all tables share the same key, primary or foreign.

## Why can't you just be normal??

As I once said on an April 1st long ago, I will never be normal :)

**Normalisation** is a quantified method of determining how good a database design is. It generally works by taking a single, monolithic table of data, and splitting it up into multiple tables which can be re-joined to get the original table. We call these **lossless joins** or **dependency preservation**.

There are seven types of normal form: 1NF, 2NF, 3NF, BCNF, 4NF, 5NF and 6NF. We only need to worry about the first four. It should also be noted that for any normal form, it must exhibit all of the properties of its predecessors, including its own. All you need to remember for these is:

> *The Key, The Whole Key, and Nothing but the Key, so help me Codd!*

Which is to say, any non-key attribute must depend on the primary key (1NF), and not just a part of the key, if a composite key is used (2NF), and only this primary key (3NF). Furthermore, to be in BCNF, any functional dependencies that occur in this table must start from a superkey.

## What are you implying?

As you may expect from the definitions of the normal forms above, often there are functional dependencies on data that we don't expect. So, for a relation schema $R$, we call $F^+$ the closure set of functional dependencies, $F$, i.e. all possible functional dependencies in the relation. We imply them through **Armstrong's inference rules**.

**Reflexive** - If $Y \subseteq X$, then $X \rightarrow Y$.

**Augmentation** - If $X \rightarrow Y$, then $XZ \rightarrow YZ$.

**Transitive** - If $X \rightarrow Y$ and $Y \rightarrow Z$, then $X \rightarrow Z$.

From these, we can infer more rules, namely decomposition, where a set of dependent attributes can be split, union, which combines two dependent sets, and pseudotransitivity.

## May contain additives

Two tables, $R1$ and $R2$ are a lossless decomposition or non-additive join of $R$ *iff*...

$R1 \cap R2 \rightarrow (R1 - R2)$ OR $R1 \cap R2 \rightarrow (R2 - R1)$

Which means, the key that joins the two tables together, must functionally determine the non-key values in at least one of the tables. 

As a last note, we also want to check for **dependency preservation** in some cases, where we make sure that within our decomposed tables, the dependencies for that were in the original table are still in the new, decomposed tables.

Dependency preservation and lossless decomposition are not mutually exclusive, and one may not always imply the other.