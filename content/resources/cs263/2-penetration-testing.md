+++
title = "2 - Penetration Testing"
+++

**Penetration testing** is the process of testing how easy it is to hack into a network, generally that of an organisation who has important information that they want to keep secure, and/or ensure they're following appropriate security standards. The whole process consists of planning, information gathering, scanning, attacking, then reporting. Please maintain yourselves...

## Why should we compromise you?

The first step is to perform an *interview* with your client to get a better understanding of why they need testing. What are they worried about? Do they have assets they want to keep safe? Might there be certain people who want to target them? Are they unsure if they're following regulations? Asking these types of questions can help you to gain some insight as to what sort of tests you should perform: an attack from a script kiddie is very different to a man-in-the-middle attack for example!

You'll also work out a scope between you two. You client may only want you to test some parts of their system, or to test a mock system (not ideal), which follows their security protocol, but doesn't contain any important data. You may be asked to not touch some things, like a database, or exclude certain IP addresses or domains.

You'll likely be working to attack the client's own servers and infrastructure, *not cloud services* like SaaS or web service providers, as these usually provide good security anyway, and you won't have permission to test these, you could get in serious trouble if you do!

After discussion, you'll create a set of **rules of engagement (RoE)**, which include *when* you plan to attack, *what* you plan to attack, *how* you will plan to attack (i.e. white box or black box), and *who* will be your points of contact (e.g. the IT admin). This will form part of an agreement, alongside an NDA, a waiver (for them, so you're not in trouble if data is lost) and possibly an [authorisation form](https://wiki.owasp.org/index.php/Authorization_form), which you both have to sign to proceed. Once you do, strap in, because this is where things get exciting.

## Hecking time

We won't cover how to do an attack here, there's more info about that elsewhere in this guide. This is moreso about knowing the formalities and paperwork.

While you're testing, you will need to make sure you're complying with the appropriate laws, in all of the following locations:

- **Where you are** - Your location for the base of operations.
- **Where they are** - Is your client in a different country? They may have different regulations.
- **Where you may pass through** - You also need to consider what countries your data may be flowing through, as you'll have to follow their regulations too.
  - Example: Lots of Canada's data may pass through the USA!

You should remember to be especially careful when handling personal data (PD) and personally identifiable information (PII), particularly minding the following regulations and acts:

- **Computer Fraud and Abuse Act** (US, 1986)
- **Computer Misuse Act** (UK, 1990)
- **General Data Protection Regulation** (EU, 2018)
- **California Consumer Privacy Act** (California US, 2020)
- **Digital Millennium Copyright Act** (US, 1998)

## Writing it all up

You should of course be logging all of the steps you take, and taking notes of the system and tests as you go. You then need to compile the information from these notes into a report which you hand back to your client, informing them what the results mean, and what steps they should take next. *Don't include raw results data*, instead put this into an appendix. There are a few standard structures for a report:

### PurpleSec

- **Executive Summary** - what happened?
- **Test Scope and Method** - what was tested and how?
- **Internal Phase** - write about tests conducted inside the organisation.
- **External Phase** - write about tests conducted on publicly accessible resources.
- **Conclusions** - what should your client do, and how severe are any exploits found?
- **References** - yes, you need these.

### SANS

- **Page Design** - Header/footer formatting, fonts, etc.
- **Document Control** - Version history and changelog
- **Report Content**
- **Executive Summary** - What happened?
- **Methodology** - How were tests conducted?
- **Findings** - What vulnerabilities were found? What are their impact and likelihood, and hence what is their risk? What actions could be taken?
- References, Appendix and Glossary

