+++
title = "3 - OSINT"
+++

If you're the type who will spend hours on end googling their hyperfixation, you might like **Open Source Intelligence (OSINT)**, as it's all about using public knowledge to find out as much as you can about your target as possible. OSINT is usually a part of reconnaissance, where you determine what targets you want to scan or attempt to crack, as part of a penetration test, making sure you take plenty of notes about this. There's no hacking, or using insider information just yet. That being said, we can find information just about *anywhere* on the internet, including news articles, google maps, linkedin accounts, or even reddit. Good old reddit, the sanctuary of random useful tidbits of information. Of course, people do like to lie on the internet, so take what you see with a grain of salt at times.

Consider your target. What information do you already have, or can easily gather, which could help your cause? Their location? Their industry? Employees? Domain names? The list goes on. Some useful places to look might include job listings for the business you're tackling, if they're hiring IT professionals, there's a good chance they'll be looking for skills in certain frameworks. Great, so now we can start narrowing down the list of vulnerabilities we can check for.

## Planing to Google Google and find stuff to Google

*...what?*

OSINT can be split into five stages:

- **Planning and Direction** - What do you want to find out? What will help you in completing an attack on your client?
- **Collection** - Performing OSINT
- **Processing and exploitation** - Process the data you've collected. You may need to clean some of it, for example, or remove dubious sources.
- **Analysis and Production** - Create an analysis and report of your findings.
- **Dissemination and Integration** - Turn your report into a usable analytical product. This may trigger another round of collecting data.

Now to prepare our workspace. You want to search for data, while keeping as low a profile as possible, being extra weary of being compromised yourself. So, you should ensure you're using an operating system that's up-to-date and avoid using elevated accounts. Using a virtual machine might be helpful here! You also want to ensure minimal tracking, especially from the company you're trying to penetrate, as they could blacklist your devices if they detect a suspicious pattern of behaviour: you may wish to employ the use of a VPN to help out (but don't forget that VPNs don't hide your identity per se!). You also need a browser. Anything mainstream should be fine, i.e. Firefox or Chrome.

## Speaking of Browsers...

Here's some useful extensions you may consider installing:

- **uBlock Origin** - Not just for blocking adverts, but also a range of trackers which can be used for profiling.
- **DownThemAll** - Download all media on a webpage.
- **Hunchly** - Non-free extension which documents all pages that you visit, only available for chromium browsers.
- **KeePassXC** - Not just an extension, but good for saving passwords for temporary accounts.
- **Google Cache** - Allows you to access the google cached version of websites if they are down.
- **FlagFox** - Gives information about the source of a webpage.

You might also want to consider capture software such as **OBS** to record your data gathering, as this may reveal other avenues of research you'd like to explore. Additionally, you should make a database of the items you discover, including information such as the URL, relevant task, timestamp, tags, screenshot, and reliability score.

Before you truly get going, make sure you're logged out of any accounts, in fact it may be better to delete all cookies completely before you start. Also make sure any files on your computer are backed up, and take into account any security considerations you'd normally take when using a computer...

...or again, just use a virtual machine! Kali Linux is a good pick for a virtual machine, since it will automatically install a range of useful OSINT tools for you. But remember that malicious files can escape a VM if you're not careful, so it's better to remain cautious than over-confident.

## The great iceberg

Now the fun starts! And we'll begin by exploring the infamous iceberg that is the internet. Things like Google, social media, and all other easily accessible resources make up the **surface web**. Then, you'll start reaching the territories of paywalled, private, or otherwise hidden information in the **deep web**. And, lurking only within the TOR browser, you can find illegal information and services in the **dark web**.

Again, you can only access the dark web by using TOR, a.k.a. The Onion Router, aptly called so since it uses *onion routing*, where your connection will pass through three random nodes until it connects you to your destination, creating a high level of anonymity (but not full!). You can typically pay for goods and services using cryptocurrency such as bitcoin or monero.

## Other bits to check

**DNS Records** - What DNS records map to what domains? Who holds these domains?

**Archives** - Archive.org and the Wayback Machine are great ways of accessing older websites, where information may have changed or links hidden.

**Social Media** - We all know we post too much about ourselves. We can even use scraper extensions to save posts for later analysis.

**Communities** - Consult the forums, like Reddit, StackOverflow or god forbid... wait no, they got hacked didn't they?

**Pictures** can be extremely valuable. Not least because we can perform reverse image searches on Google or TinEye, but we can use tools such as `exiftool` to expose metadata on images. And if you can obtain GPS data... then there's room for some serious tomfoolery.

## Who you callin a dork?

**Google Dorking** is the use of additional filters on Google to further refine your search results. Below are some example filters:

- site:[domain] - Only look in this domain
- link:[domain] - Look for site that link to this domain
- inurl:[string] - Pattern matching on specific urls saved
- intitle:[title] - Titles matching at least some of these keywords
- allintitle[titles] - Titles containing all keywords
- filetype:[extension] - This type of file only (e.g. .pdf, .jpg, etc.)
- daterange[Juliandate]-[Juliandate] - In this time range
  - [Juliandate] means CYYDDD where...
  - C - Century, i.e. 19 -> 0, 20 -> 1.
  - YY - Last two digits of the year
  - DDD - Day 1 to 365 (or 366)

You can also use the logical operators OR, AND, - (exlcude), and * (wildcard).

Also, this is more reconnaissance-related than OSINT-related, but **Shodan** is a search engine for internet-connected devices, indexing almost every device connected to the internet. It contains lots of filters, and an API to track various metrics.