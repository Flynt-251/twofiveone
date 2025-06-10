+++
title = "9 - Governance, Regulation and Compliance"
+++

This is gonna be a boring section for most, as it's talking about the legal aspects of cyber security. Like it or not, there are standards we must follow so that we don't get ourselves thrown into jail. This is all wrapped up in the abbreviation **GRC**, or Governance, Regulation and Compliance. Even ignoring legality, because the motivation for attacks is often data-related, a data breach can have serious effects on a business, ranging from privacy violations for stakeholders, to severe financial losses.

It might not even be your fault that a breach occurs in your organisation. A **supply chain attack** is where an attack occurs on a third party service that you rely on. If something like Google services, or AWS were to get compromised, *a lot* of organisations would suffer losses. Though it wasn't an attack, just look at the Crowdstrike incident (Linux Supremacy once again :fire:).

## Make your own government

Let's first look at governance. Some relevant standards here include [ISO 27002](https://www.iso.org/obp/ui/en/#iso:std:iso-iec:27002:ed-3:v2:en) and [COBIT](https://www.isaca.org/resources/cobit).

We typically have a board of directors in larger organisations, including a CEO, CFO, CMO, and most importantly, a CTO or Chief Technology Officer. We will also have at least a few cybersecurity officers to help manage the IT infrastructure too, but also to handle some non-technical matters too, such as:

- Reviewing Job postings to prevent leaks of important information
- Restricting area access to candidates
- Administering IT training and awareness
- Performing background checks
- Ensuring future employees sign an NDA, if needed.

For the **Holistic approach**, IT governance forms part of strategic management, and is split into four parts:

- **IT Governance** - Provides standards and processes for IT operations, to ensure compliance at an appropriate cost.
- **IT Risk Management** - Identifies security risks in the IT infrastructure according to standard assessment techniques (see below)
- **Infosec** - Focussed primarily on data security
- **Privacy** - Ensures adherence to privacy laws and ensures only the correct users have access to certain data.

These teams together should perform a few key roles, such as periodically evaluating the security of the computer system, implementing security management and policies, creating risk assessments and developing contingency plans and incident-response plans. They should also create **Security Education Training and Awareness (SETA)** for all personnel to engage with. [ISO 27014:2020](https://www.iso.org/standard/74046.html) gives some guidance for IT governance.

## Deadly, colourful tables

Anyone who's been society exec will know at least a little bit about **Risk Management**: it's ubiquitous. It usually consists of identifying potential problems, then what their impact is and how likely it is to occur to identify its *risk*, and then how we can lower this risk. Many standards exist for this, including ERM, NIST RMF, ISO 31000, etc.

We may carry out a **qualitative** risk assessment, where we categorise events by severity, based on a description of what could happen, and how likely they are to occur. This is how we get the well-known $\text{Risk} = \text{Likelihood} \times \text{Impact}$ formula. Or, we may do a **quantitative** risk assessment, which uses a **Risk Matrix**, and focus mainly on the levels of potential financial loss, or gain if we are looking at opportunities instead of risks.

Once we've found some risks, we may either...

- **Accept** - So, there's no serious harm in this happening.
- **Mitigate** - Take some steps to avoid this risk from occurring.
- **Transfer** - Let someone else take care of it, e.g. outsourcing databases to a cloud service.
- **Avoid** - Prevent the risk from occurring altogether.

But risk assessment is not a one-time thing! We need to **monitor** risks and **report** any that do in fact happen. This ensures that are existing frameworks are actually working, and we can learn better how to recover from such problems, or better prevent them from happening.

Also keep in mind that we need to check the risk of *any* technology that the organisation may use. A prominent example of this is AI: an employee may use a chatbot to discuss how to work on a project for example. At a surface level, this sounds fine, but *what if the employee discloses confidential data*? This may be used as training data, causing a breach. So, we should consider how we can avoid such breaches from happening. This is why many businesses are looking into locally hosted LLM services.

## You WILL comply!

Now let's talk compliance. We may have a **policy** that needs to be followed by adhering to certain **standards**, which will dictate some sort of **procedure** that we need to follow, creating **guidelines** for everyone to follow. For each, the last decides the next.

We've mentioned the **International Organisation for Standardisation (ISO)** already, but we also have the **International Electrotechincal Commission (IEC)**, who both provide various guidance on security standards, with the vast majority of organisations do follow, namely the 27000 family, which focusses on Information Security Management Systems (ISMS).

Here are some standards/regulations we very commonly need to follow.

- Privacy Act (1974) - Data collection
- Electronic Communications Privacy Act (ECPA) (1986) - Concerns any electrical means of passing data, e.g. telephone, email, messaging, etc.
- Computer Security Act (1987)
- Computer Fraud and Abuse Act (1986)
- Health Insurance Portability and Accountability Act of 1996 (HIPAA) - Data protection focussed on healthcare, there have been serious incidents in this sector in the past!
- Payment Card Industry Data Security Standard (PCI DSS) - Covers payment cards, i.e. debit and credit cards.

More importantly for us though, we're primarily concerned with the **UK GDPR**. This is a variant of the EU GDPR, which gives UK citizens protection at an equivalent level to EU citizens. Namely, the UK GDPR allows the charge of fines up to €17.5 million (or €20M for EU GDPR) or 4% of annual revenue, against organisations who have made severe violations against this regulation. The **Information Commissioner's Office (ICO)** may also take action against **data controllers** anywhere in the world, if they process the information of a UK citizen. You, a **data subject**, have the right to know if your data is collected, have it amended if incorrect, have it be deleted, or object to having it be used for automated decision making. [See more here](https://www.gov.uk/government/publications/data-subject-rights/data-subject-rights)

Know your rights!