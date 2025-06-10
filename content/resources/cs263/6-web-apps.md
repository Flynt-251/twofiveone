+++
title = "6 - Web Application Security"
+++

Like it or not, web applications are ubiquitous nowadays, and maintaining their security is paramount, as almost anyone in the world can access and use them however they like (regardless of your TOS of course). Note that this isn't the same as penetration testing, as that tends to refer to closed-off subnets, testing for flaws and identifying vulnerabilities in them. Web application testing means we're testing the security of a web and/or mobile app, possibly replicating a real-life cyber attack on these services. Note that this may also include static code testing, and hence web app testing may make up part of the software development cycle.

## The boring bit

First, we need to go over **standards** for web app testing, and for this, we can follow the guides for either OWASP (Open Web Application Security Project), NIST SP 800-115 (National Institute of Standards and Technology) or the PTES (Penetration Testing Execution Standard).

The **OWASP** testing guide provides four techniques:

- **Manual Inspection and Review** - Review the application's documentation, security requirements, coding policies and architectural design by hand, focussing on the security implications of people, policies and processes. This ensures that the design itself is sound.
- **Threat Modelling** - Model the application based on its components and what data is sent between them, and use this to identify where there could be a chance of a threat. More on this later.
- **Source Code Review** - Again, read the code and make sure it's correct. This can eliminate lots of unintentional bugs which can compromise security.
- **Penetration Testing** - Bring the application to life, and begin performing tests to identify vulnerabilities and exploits.

OWASP also gives some methodology on testing itself, based on a black box approach, i.e. the attacker initially knows nothing about the application and how it works. Testing is split into two phases: **passive mode**, where the application is interacted with normally, but the attacker will analyse the HTTP data to make sense of how the application works, then feeding this into the second stage: **active mode**, which performs vulnerability tests.

**NIST SP 800-115** exists to help organisations in planning, performing and analysing the results of security tests on applications, giving recommendations on the design, implementation and maintenance of technical information from such tests. This standard can be used to either find vulnerabilities, or ensure compliance with relevant policy.

**PTES** splits application testing into seven steps:

- **Pre-engagement Interaction** - Discussion of what to test, when, where, how, and so on.
- **Intelligence Gathering** - See OSINT.
- **Threat Modelling** - focussed on attacker and assets.
- **Vulnerability Analysis**
- **Exploitation**
- **Post-Exploitation** - Review effects of exploitation.
- **Reporting**

There are many ways to split up the process of web application testing, but almost all of them include a planning phase which reviews the design of the application, and what sort of tests to perform, followed by information gathering, research and vulnerability checking, reporting of findings, and finally, support for the client to fix vulnerabilities.

## Tools

- **w3af** - Open-Source, Python-based framework for attacking and auditing.
- **SQLMap** - Open-source SQL Injection tool
- **THC Hydra** - Network logon cracker
- **OWASP Zed Attack Proxy (ZAP)** - Man-in-the-middle proxy, which intercepts HTTP traffic, generally used as an application security scanner.
- **Burp Suite** - A suite of tools for testing web applications, built upon being a proxy.
  - **Proxy** - Allows the interception, viewing and modification of all incoming and outgoing HTTP traffic.
  - **Repeater** - Lets users take HTTP requests, modify them as they like, and re-send them to the destination server.
  - **Intruder** - Automates custom attacks against web applications
  - **Target** - Creates a site map, allowing for scope targetting and better coordination in the planning of an attack
  - **Logger** - Records network activity, namely HTTP traffic that passes through Burp Suite.
  - **Sequencer** - Analyses sample data and assesses their randomness (useful in reverse-engineering PRNG algorithms).
  - **Comparer** - Allows two data objects to be compared quickly, e.g. two HTTP responses.
  - **Decoder** - Converts data to or from encoded or compressed forms, e.g. hexadecimal or HTML.
- **cURL** - CLI app which lets the user send HTTP requests and see the raw HTML response from the server.
- **Bug Magnet** - Browser Extension for testing input fields and value injection in Javascript.
- **FoxyProxy** - Allows for automatic switching between proxy servers based on the URL requested.
- **Selenium** - A testing framework which can automate browser interactions, with support for multiple languages.
- **Other Automated Testing Tools**
  - Watir
  - TestComplete
  - Katalon
  - TestRigor
- **Acunetix** - Web vulnerability scanner
- **SoreFang** - Exploit for a SangforVPN which allows for the delivery of malicious update binaries
- **ZxShell** - Creates reverse command shells
- **China Chopper** - Web shell

## Now the fun begins!

First, a review of the types of **HTTP requests**. This is useful to know, as the web server will be expecting one of these, depending on what we want to do.

- `GET` - Retrieve an HTML document.
- `POST` - Send some information to the server, e.g. login data, file uploads, or HTML form data.
- `HEAD` - Same as GET, but only retrieve the header, not the full document.
- `PUT` - Replace some target resource with the attached content.
- `DELETE` - Remove the specified resource.
- `CONNECT` - Start a tunnel between the client and server, usually to enable other protocols on restricted networks.
- `OPTIONS` - Ask the server what HTTP request types it may use.
- `TRACE` - Comparable to a "ping", ask server to repeat back this request.
- `PATCH` - Partially modify a resource, such as a JSON object.

If you fancy reading more, [Mozilla](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) lists these types of requests and gives detailed documentation. The MDN web docs are very useful for any web developer.

HTTP requests will also attach your **user agent**. Type "user agent" into a web browser of your choice, and your search engine will give you a string that looks like this:

```
Mozilla/5.0 (X11; Linux x86_64; rv:138.0) Gecko/xxxxxxxx Firefox/138.0
```

The user agent is used to tell web servers what kind of system you're running, including the browser, operating system and graphical engine, which is typically used to make sure the server provides a response that's most suitable for your machine. That being said, *spoofing* a user agent is very easy to do, and this is a common practice done by users to protect their privacy. Some web browsers even let you change your user agent quite easily, such as the built-in browsers on the 3DS and Wii U!

Next, we need a way of sending HTTP requests and viewing HTTP responses. We've already seen tools such as **Burp Suite** which let us do this alongside a browser such as Firefox, but we can use some other tools as well, such as `curl`, which lets us create HTTP requests from a CLI and immediately view the raw content of an HTTP response. We can also use browser extensions such as **FlagFox**, **FoxyProxy** and **Bug Magnet**. The developer window on most browsers also give us tools to view raw code, run Javascript code snippets and view real-time network traffic.

### There's a wasp in here oh god oh f***

We've already mentioned **OWASP**, a non-profit that provides lots of community-made resources for helping to improve web app security, from articles and documentation, to full-fat tools, including the OWASP top 10 security risks, top 10 API security risks and Web Security Testing Guide. They also have lots of projects which are categorised as follows:

- **Flagship** - Projects with significant value to OWASP and application development.
- **Production** - Projects suitable for use in a production environment, i.e. real-world businesses.
- **Lab** - Projects that OWASP has reviewed and deem valuable.
- **Incubator** - Projects currently still under development.

### Foxes have very soft fur

**Fuzzing** is a testing technique where we throw random input data into an application and analyse for bugs or vulnerabilities, where we may define a list of *dangerous values*, which could include negative numbers, strings with additional unicode, very long strings, etc. Fuzzing can mimic human error, and is useful for checking for server-side validation, since the same techniques used for fuzzing could be exploited by an attacker, hence additionally mitigating further bugs. This being said, the scope of fuzzing is limited, as it uses a black box approach, and only addresses specific kinds of vulnerabilities, not more complex bugs or malware attacks.

### Where are my keys?

We frequently make use of **Application Programming Interfaces (APIs)** when making web applications. APIs allow us to get data from different sources and interact with different services, so for instance, we can easily build a weather application without needing to do any forecasting ourselves: just use a common weather API, make a nice frontend, and that's it! But APIs can do much much more, so it's important that we make sure they're secure, and that we use them correctly.

Even still, APIs can be a common point of failure. Ever seen the meme of committing an API key to a public github repository? Yeah... things like that have led to data breaches. For instance, in 2021, researchers scanned for vulnerabilities in 55 different banking and finance apps: all but one of them had hard-coded API keys and authentication, which an attacker could easily use to obtain sensitive data. Some of these APIs even had broken authorisation! As such then, it's extremely important that we follow best practices in using APIs, but remember that we can't stop all API-related vulnerabilities, since keys can be obtained through social engineering and phishing attacks.

## Destroy them spiders

So, now we know how to test a web app, what are the common things that an attacker might do once they discover a vulnerability and exploit it? Well, these **web attacks** can take one of three forms:

- **Via Browser or App** - The attacker uses their own device to manipulate data in a way that compromises the web server (and other services).
- **Targetting other victims** - the attacker compromises the web server, hosting malicious content that gets sent to victims.
- **Going through another victim** - Man-in-the-middle attacks, i.e., the attacker uses their device as a proxy between the victim and the web server.

Web attacks can be seriously problematic in the healthcare industry, especially in the wake of web apps used by medical firms: in 2022, the CommonSpirit ransomware attack targeted a US firm holding health records for over 20 million patients. No confirmation has been made as to how many records were stolen. Medical data is probably the last type of data you want random people knowing!

### Protecc

We can protect against web attacks by, first and foremost, having good security practices as we described above, plus having automated vulnerability scans and tests to check for further issues. We can also make use of **Web application firewalls (WAFs)**, which can block malicious traffic, defending against a range of different attacks (but not all of them!). It's also recommended to use things like CAPTCHAs, login limits, login monitoring, credential screening, and multi-factor authentication.

### Attacc

**Same Origin policy** in Javascript prevents code from accessing elements outside of where it came from. This means, that a javascript file on this domain (twofiveone.xyz), may access other elements inside this domain, but may NOT source from another one, say google.com. Note that this is just a *policy*, Javascript does not enforce this behaviour in any way.

#### Vaccinate your databases

**SQL Injection (SQLi)** exploits databases by inserting SQL code into some input. Let's say in our application, we access data from a database like this:

```sql
SELECT inventory FROM users WHERE userID = "{username}";
```

Assume that statements in curly braces represent a placeholder, where we concatenate strings together to form the statement. Then, an SQL injection might cause the database to run this:

```sql
SELECT inventory FROM users WHERE userID = ""; DROP TABLE users; --";
```

Uh oh. We've just lost thousands of records. And it's because an attacker set the username input to `"; DROP TABLE users; --`. There are some variants of SQLi, such as **Blind SQL Injection**, where we aren't given the output of a database query (which is most common), or **Union attacks** where we query for multiple tables to obtain lots of data.

SQL injection is fairly simple to protect against, as we can try constructing our own queries to see what is accepted, and analyse inputs for common SQL strings. Most database connectors also allow for the use of *prepared statements*, which change how placeholders are interpreted, almost entirely preventing SQL injection. Use prepared statements, not string concatenation!

#### The website is cross

**Cross-site scripting (XSS)** is a type of attack where the attacker injects malicious Javascript code into a website on the client-side. That last bit is important, as same origin policy would prevent an attacker from compromising a web server and placing malicious code there. There are then three types of XSS:

- **Reflected** - The malicious code is placed into the client's HTTP request
- **Stored** - The malicious code is stored on the server's database
- **DOM-based** - The malicious code is placed into the client's code, i.e. the response data.

XSS vulnerabilities are usually straightforward to test for: see if there's any way for you to run your own Javascript code inside the website: often we use the `alert()` function for this, alongside tools such as *Burp Suite*. Typically, the strategy to test for XSS is to identify where all possible inputs are placed in HTTP requests and responses, and see if it is possible to use any of these inputs to then run custom Javascript code.

This can become a game of cat-and-mouse though, as some prevention strategies can be circumvented using *backslashes*. Instead, we should use **Content Secure Policy (CSP)**, which restricts the running of Javascript to trusted sources, and blocks any in-line Javascript from executing, drastically reducing the risk of XSS. Of course, the safest option by far is to disable Javascript!