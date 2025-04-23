+++
title = "8 - Security and PSMs"
+++

## I have prepared a statement about this course. It's dumb.

Without putting too much thought into it, it makes the most sense to construct an SQL statement in the programming language of your choice like this:

```java
String query = "SELECT title, msrp FROM GAMES WHERE title LIKE %" + searchTerm + "%;";
database.execute(database.createQuery(query));
```

At first this looks okay. But bear in mind that `searchTerm` could equal *any* string. For example...

```java
searchTerm = "; DELETE FROM GAMES WHERE title LIKE ";
// So that means we get the following SQL query...
//   SELECT title, msrp FROM GAMES WHERE title LIKE %;
//   DELETE FROM GAMES WHERE title LIKE %;
```

And just like that, all of our games are gone. And now we are sad.

This is **SQL Injection**, and it's a very common type of cyber attack. To defend against SQL injection then, we use **Prepared Statements**, which are written like this:

```java
String query = "SELECT title, msrp FROM GAMES WHERE title LIKE %?%;";
PreparedStatement ps = conn.prepareStatement(query);
ps.setString(1, searchTerm);
ps.execute();
```

Prepared statements are superior to just using strings, as they're much more easily reusable, and they enable better separation between the structure of a query and its data. Virtually all of the time, prepared statements are the most secure way to interact with a database, and should be used the vast majority of the time.

## CIA? Am I being investigated?

In cybersecurity, you'll quite frequently come across the acronym CIA, which stands for Confidentiality, Integrity and Availability. Each of these principles describe protection against unauthorised access of, unauthorised modification or corruption of, and right of access to, sensitive data respectively.

In the context of databases, there are a few methods to ensure these principles, namely **Access Control**, **Inference Control**, **Flow Control** and **Encryption**.

## Access Control

There are two types of access control: **Discretionary**, where data is *owned* by a single person or entity, and permissions on that data may be handed down by that owner, and **Mandatory**, where data and users are allocated levels of data access.

### Discretionary (DAC)

Remember how in the first page we gave authorisation to the user `flynt`? This means this user is the owner of the schema `GAMES` and can pass certain permissions onto other users.

```sql
GRANT SELECT ON DISCS TO clyde;
```

```sql
REVOKE SELECT ON DISCS TO clyde;
```

We could replace `SELECT` with `UPDATE`, and we could instead create a `VIEW` to abstract what is made available to other users. This is particularly useful when different types of people are accessing the same database, e.g. Staff and Customers on a shopping website.

Note that many DBMSs may impose propagation limits, where only up to a certain number of users can be granted permissions on a table/view. This may be *horizontal*, meaning one user can only grant access to so many other users, or *vertical*, where a chain of access is limited in length (i.e. a grants b, b grants c, c grants d and so on).

### Mandatory (MAC)

(There are like three things in CS that MAC stands for and I hate it)

This is typically represented using the Bell-LaPadula Model, in which there are four security categories that users (**subjects**) and tables (**objects**) may be placed in: **Top Secret**, **Secret**, **Classified** and **Unclassified**, where each ranking is lower than its predecessor. The following confinements are then enforced:

- *No read up* - class(subject) >= class(object)
  - Only users who have the correct security level of the object or higher can read the object.
- *No write down* - class(object) >= class(subject)
  - Only users who have up to or below the security level of the object may write/append to it.

#### Multi-level Security

*It's not a pyramid scheme*

This assigned security classifications to individual attributes, so an "object" refers to a single piece of data. This creates **Tuple Classifications**, which represents the highest security class for a tuple. These may be different for each tuple, for instance a HR manager can read the salaries of all employees, except for anyone in the HR department, or those of executives. This often makes it necessary to hide the primary key and use an **Apparent key**. If multiple records share the same apparent key, this is called **polyinstantiation**.

### Very loud DAC or Yummy big MAC?

Most of the time, DAC is preferrable as it's more flexible in how permissions are managed, but this makes it vulnerable to attacks and does not control how information in the database is used, both characteristics which need to be addressed in sensitive scenarios such as government data, so the rigidity of MAC is more suitable in these scenarios.

### Roleplay Access Control

Wait hang on, that sounds weird. **Role-based Access Control** (RBAC) creates a set of roles that can be applied to users. Each role may enable access to a set of tables and/or set of allowed query statements. This concept should be familiar to you if you use discord at least once a week.

```sql
CREATE ROLE administrator;
GRANT UPDATE ON DISCS TO administrator;
GRANT ROLE administrator TO flynt;
DESTROY ROLE administrator;
```

## Numbers and Numbers and Numbers

We've previously talked about data aggregation, and naturally sometimes we want to record some statistical information from a database. However, this presents a problem: what stops a researcher from grabbing the personal data of an individual (doesn't stop some people...)? Well, we could revoke access to selecting single records, or prevent the use of select without aggregation, but there are fairly simple ways to get past such measures.

Instead, a common technique is to introduce *noise* into data. This is done by (essentially) flipping a coin, and if heads, record the data. If it's tails, record bogey data (for boolean values, always give true). This way, it's impossible to be certain what data is real.

## Go with the flow (control)

Flow describes the movement of information, i.e. data being read from one program and written into another. Sometimes there are certain flows that we want to prevent, e.g. login information of users into a user search database. We can either explicitly define where data is allowed to move and in what direction, or we can apply blanket policies, e.g. don't write into non-confidential locations from confidential locations. It's important to recognise that the relationship between data may not always be obvious.

### Explicit Flow

```
a = b * 5;
// a directly reads the value of b
```

### Implicit Flow

```
a = a - 2;
b = 0;
if (a == 1) {
    b = 5;
}
// a is able to dictate the value of b given it has a certain value
```

In both cases, we may end up with the same output values, but with the implicit flow, we may need to prevent a's access to b in a more sophisticated manner than with the explicit flow.

## Oracle Label-based security

This gives both users and data labels, similar to MAC, which represent control policies and enable row-level access control. This can ensure that certain users can only see data that is relevant to them, e.g. different departments of a corporation. In a similar vein, **Virtual Private Databases** (VPD) bind policies to each database object, and these are appended to user queries in a manner that is transparent to the end-user.

## Persistent Stored Modules

Many DBMSs allow for the creation of procedures, which in essence, allow for the creation of procedural code in SQL. This *can* be more efficient than defining this logic in a different language.

```sql
CREATE PROCEDURE flushEmptyReviews (publishedBy VARCHAR(32))
LANGUAGE <psmNameHere> AS $$
    DELETE FROM REVIEWS WHERE publisher = publishedBy;
END;
$$;
```

```sql
CREATE FUNCTION getWordedReviewScore (title VARCHAR(32))
RETURNS VARCHAR(9) LANGUAGE <psmNameHere> AS $$
    DECLARE
        overallScore FLOAT;
    SELECT AVG(rating) INTO overallScore
    FROM REVIEWS WHERE REVIEWS.title = title;
    IF overallScore > 8 THEN RETURN 'Excellent'
    ELSEIF overallScore > 6.5 THEN RETURN 'Good'
    ELSEIF overallScore > 5 THEN RETURN 'Okay'
    ELSEIF overallScore > 3.5 THEN RETURN 'Bad'
    ELSE RETURN 'Terrible'
    END IF;
END;
$$;
```

You can also set a procedure to execute when a certain query occurs in the database. This is called a **trigger**. These can be especially useful for inserting data into multiple tables, allowing a user to only have to update one table.

```sql
CREATE FUNCTION triggerExample (parameters here...)
RETURNS trigger AS $$
    <procedure body here...>
    RETURN NEW;
END;
$$ <psmNameHere>;
```