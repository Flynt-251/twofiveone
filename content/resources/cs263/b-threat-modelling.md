+++
title = "B - Threat Modelling"
+++

Often it is useful to draw up an overview of how a system or network works, and how data is transferred between devices, to identify potential threats and properly prioritise fixes. This way, we patch up any clear pitfalls which could easily be exploited. The goal is to find **mitigations** which reduce the **liklihood** of an exploit being carried out, and/or reduce its potential **impact**.

Threat modelling should make up part of the process of software development, since we are likely following security guidelines are part of our requirements, and so this allows us to consider them in our design phase. We start by creating a flow diagram, or more specifically, a **data flow diagram**. Then, we may look at common risks and verify that our system can defend against them: we may source these from many locations, such as the [OWASP top ten](https://owasp.org/www-project-top-ten/), or [attack trees](https://www.schneier.com/academic/archives/1999/12/attack_trees.html), which takes a system and explores the possible routes an attacker could take to breach its security.

**STRIDE** is an acronym that covers the majority of types of exploits, namely Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege. We may use this with **DREAD** which calculates the risk of an exploit:

- $\text{Damage}$ - How bad is the impact of this attack?
- $\text{Reproducibility}$ - How easy is it to reproduce the attack?
- $\text{Exploitability}$ - How much effort is needed to perform the attack?
  - An exploit is useful, but it may only give an entry point, additional work may be needed for it to have any effect.
- $\text{Affected Users}$
- $\text{Discoverability}$ - How easily could an attacker identify the exploit(s)?

$\text{Risk Value} = (\text{Damage} + \text{Affected Users}) \times (\text{Reproducibility} + \text{Exploitability} + \text{Discoverability})$

## Example - OAuth

You may have seen or used **Open Authentication (OAuth)** before without even realising it. The simple idea behind it is, it enables applications limited access to a server's resources on behalf of a user, such as Google drive, through the use of authentication tokens. This acts as an alternative to having the user authenticate their account on the application, where the username and password would be stored. For example, let's say we want to add GitHub integration to a code editor. We *could* just let users sign in on GitHub through the editor, but if the editor is compromised in an update, this could enable an attacker unlimited access to many GitHub accounts. OAuth fixes this by only using a token, so even if our editor gets compromised, the attacker has limited access (unless our editor has way too many permissions!).

This being said, you need to be careful about how you implement OAuth into an application. It could easily be exploited if you don't manage your permissions properly. We may first model how we use OAuth to grant access to a server resource, using something like OWASP Threat Dragon (which has one of the cutest mascots I've ever seen), and then use STRIDE to see what types of attacks could happen.

|Type|Example|
|----|-------|
|Spoofing|An attacker could use a stolen token to appear as a legitimate user|
|Tampering|Data on the server resource could be illegitimately modified|
|Repudiation|-|
|Information Disclosure|The attacker can access sensitive data using the token|
|Denial of Service|-|
|Elevation of Privilege|-|

