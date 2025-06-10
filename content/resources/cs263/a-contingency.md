+++
title = "A - Contingency Planning"
+++

No matter how hard we try to defend against cyber attacks, unfortunately, shit happens, so we need a solid plan for when things do go wrong, hence, **Contingency Planning (CP)** (that's an unfortunate abbreviation...). Contingency Planning defines how we recover from an incident such as a DDoS attack or data leak, such that we can resume normal operation as soon as possible, while ensuring minimal cost and disruption. It's important we have this in place, as an attack or failure can be seriously devastating: FEMA found that 40% of businesses don't reopen after a disaster. We should also make sure to involve all managers, IT staff and information security staff in planning and make sure everyone agrees with the steps that should be taken. We split contingency planning into four types: Incident Response, Disaster Recovery, Business Continuity and Crisis Management.

**Indcident Response** sets out the plan for what should happen in regards to detecting, reacting to, and recovering from attacks or incidents. The NIST CSF is a common framework for this, with the steps: Identify, Protect, Detect, Respond and Recover.

**Disaster Recovery** describes what should happen in regards to recovering assets from the main facility after a disaster. This doesn't just mean a cyber attack, this could also refer to a natural disaster, war or theft. It should be clear who is carrying out the recovery from infrastructure failure or loss.

**Business Continuity** explains the follow-on steps after disaster recovery. In most cases, we can all just get back to work, but in some cases, our workplace may be inaccessible, meaning we need to either relocate, or work remotely. The key point here is we ensure that there's as little downtime as possible.

**Crisis Management** covers the general management and handling of emergencies, such as a fire, natural disasters, and so on. The plan created for this should ensure it protects people's health and welfare, supports employees, and keeps both the public and major stakeholders informed.

Of course, in the context of IT, **backups** are extremely important, possibly using real-time ones, especially for sensitive data. Backups can not only aid the recovery from an incident, but they can also defend against ransomware attacks. How do we make a backup? Well, there are a few ways. We could use a cloud storage solution, such as Google Drive or OneDrive, or we could make our own backups either using off-site servers and/or LTO backup tapes, possibly using **electronic vaulting**, which can automate the process of making off-site backups.

> This isn't mentioned in the module, but backups should follow the 3-2-1 rule:
> - At least three different backups...
> - Which are spread over at least two different mediums...
> - And at least one should be off-site.

We should also consider *backup servers*, not just from a cybersecurity perspective. In addition to our main server(s), we may also want hot, warm, and/or cold backup servers. **Hot servers** are on standby, ready to take over as soon as the main server goes down, **warm servers** are online but not on standby, to take over when the hot server is down, and **cold servers** are kept offline, only turned on once they are actually needed.