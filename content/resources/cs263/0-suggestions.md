+++
title = "0 - Flynt's Security Suggestions"
+++

> **Hold on!** The content in this section is not necessarily related to the module. This is just me giving my two cents about things that I think are important when considering your own security and privacy. These also present their own opportunity to learn more about security in your own time.
>
> As such, do take this section with a grain of salt, some of my recommendations may be misinformed or biased. If you have any suggestions of your own that you think are useful, let me know!

I took this module as I do care a lot about privacy and security online, plus I have growing distaste for the level of data collection that takes place on the internet. It's entirely possible for companies to profile you with relative ease, by just using information about your computer and browser. In this section, I'll talk a bit about the measures that have worked for me, as well as some sources which may be helpful to keeping yourself safe online.

## Use 2FA

Does an online service support using two factor authentication for logging in? **Use it then!** However, some websites may offer different "second factors", and each of these have their own strengths and weaknesses.

### Text Message Codes or Verify Links

This is probably the worst second factor. You'll give a mobile phone number, and the provider will send you a message over SMS text, which contains a code you need to enter, or an authorisation link. The reason this is so bad, is because **SMS is essentially unencrypted**, and has known vulnerabilities. This makes your codes fairly simple to intercept. If the service has alternatives, use them, but this is better than nothing.

### Email Codes or Verify Links

This works on the same principle as SMS codes or links, but instead uses your email address. This is a bit better, as the [SMTPS](https://en.wikipedia.org/wiki/SMTPS) protocol can ensure your emails are encrypted using TLS, and email services such as ProtonMail add additional encryption. However, email accounts can be accessed on almost any modern device, so if you've not secured your inbox, you have basically no 2FA at all!

### Authenticator Apps

Almost every major tech company offers some sort of mobile authenticator app, and these all work in the same way: for any account, you scan a QR code or copy-paste a long string, then you get a six-digit code on your phone with a timer. This is called [TOTP](https://en.wikipedia.org/wiki/Time-based_one-time_password), and realistically, there's no difference between any apps that offer this (except maybe some nasty data scraping, who knows). I personally use [Ente Auth](https://ente.io/auth/). This now ties authentication to one device, most likely your phone, and so is much more secure than the other two options, *unless you use features such as TOTP on your password manager*, keep these separate, otherwise there's almost no point.

### Hardware Keys

You may have seen mention of "passkeys", which have coined a new, passwordless way of authenticating, by using information about your device. Hardware keys are basically the first implementation of this, requiring you to insert them into your device to authenticate yourself. You can further secure these with a digit code, and use different protocols based on your needs. Because the authentication is now handled on a separate device, **this is easily the most secure method of 2FA**, and I highly recommend investing.

I use a [YubiKey 5](https://www.yubico.com/gb/product/yubikey-5-series/yubikey-5-nfc/). If you do want to go this route, **buy more than one key**, in case you lose one or it becomes compromised! Most services let you register more than one to your account, so at least register a primary and a backup. This way, if the first one become compromised, you can grab your backup, log back in to your account, delete the old one, and get a new backup. This being said, some services do only let you use one key, which is *very* annoying.

## The P-word

**Passwords**. A topic hated by many, as we wrestle with BS password requirements and having to memorise dozens of different phrases. Unless you use the same password for all of your websites. *Don't do that, that's very, very bad.*

### Password managers

The main problem I have with most password managers is, they're all online. So you're storing your passwords in some remote, online database with thousands of other users. **That makes you part of a massive target.** And indeed, many password manager services have been compromised, again and again... That's not even the worst part for me. The worst bit is, you're most likely paying for it!!

So, let me offer you an alternative solution: [KeePassXC](https://keepassxc.org/). KeePassXC does things differently, by letting you make a local(!) database of your passwords, which is never sent over the internet unless you send it there yourself. I'd suggest watching [Mental Outlaw's video](https://www.youtube.com/watch?v=xfwQrXSutuY) on how to set up KeePassXC, and change all of the passwords you have, or offload them from your current manager (if it's google, you are definitely making an upgrade).

You don't have to just store passwords either! KeePassXC is quite flexible, so you can store things like account numbers, API tokens, IMEI numbers (you should note them down SOMEWHERE), or dare I say, drafts of your next AO3 novel.

Of course, we all use more than one computer, and having to copy databases between devices can get annoying very quickly, especially if you like to change passwords often, or sign up for lots of stuff. So, I use [SyncThing](https://syncthing.net/) to sync my passwords between my computers and phone. You can use [KeePassDX](https://www.keepassdx.com/) on Android to access passwords on your phone.

But, when you set up your password manager, there's an elephant in the room we need to address...

### How the fuck do you make a password?

People have their own tricks for making, and remembering secure passwords, but one rule remains triumphant: **Length is better than variety.** This is applicable to other aspects of life, depending on who you ask. And yes, I'm going to show you the xkcd comic.

![If this isn't showing up, the comic is here: https://xkcd.com/936/](https://imgs.xkcd.com/comics/password_strength.png)

All password cracking algorithms tend to work best on shorter passwords, and typically variety in characters is not a strong factor. Number permutations such as `Clyde` to `C1yd3` are also pretty much useless when you consider your typical dictionary attack. These are more useful in making an edgy, hacker-style username.

Instead, a longer password, even with a smaller variety of characters, is preferable. Sequences of just three words or less though, are susceptible to dictionary attacks, especially if you use common words. In fact, using common words, even in longer word sequences, may be vulnerable. Here's a way of making a nice, long password that hard for a human, or computer to guess.

1. Think of a set of words, just go for whatever pops into your head first and write these down.
    - If this is for an account, or something you don't care too much about, use 3 or 4 words.
    - If this is for something important, or a password manager, use 6, no less than 5.
    - Try to think of at least one word you wouldn't find in the dictionary, like "teleplanar" or "sakura".
2. Come up with a sequence of numbers, with a length that's a multiple of three.
3. Put the words into a sequence.
4. Capitalise the $n$th letter of each word, ideally not the first.
5. Interleave the number sequence into the words, at a regular interval
    - This could be before or after each word, or at the $n$th letter of each.
6. Use two other symbols to separate each word, alternating them.

Okay, let's put this together and make a password. But first, I'll employ another strategy of taking a word, substituting some numbers into it, then adding some punctuation symbols at the end.

![The password "N3pe9Enthe#5" is weak, with a length of 12 and entropy of 54.22 bits.](/images/nepenthe-password.png)

Hmm. This is a weak password. It may be passable in some peoples' books. Let's try my method. Did I mention KeePassXC has a password strength checker, by the way?

1. We want a nice, secure password, so I'll use six words here. Remember to make at least one an uncommon word!
   1. `direction`
   2. `passive`
   3. `tomato`
   4. `iqniq`
   5. `coordinate`
   6. `peaceful`
    If you're wondering what "iqniq" is, it's the name of [this guy](https://www.youtube.com/watch?v=pQoa2Y2cbz8).
2. Now let's do a sequence of numbers. I'll use `102132`.
3. And we build the password: `directionpassivetomatoiqniqcoordinatepeaceful`
   - Hey, KeePassXC says this is a good password already! But we can keep going.
4. I'll do every 4th letter: `dirEctionpasSivetomAtoiqnIqcooRdinatepeaCeful`
5. Then place a number after each word: `dirEction1pasSive0tomAto2iqnIq1cooRdinate3peaCeful2`
6. Finally, separate with punctuation. I'll use `€` and `&`: `dirEction1€pasSive0&tomAto2€iqnIq1&cooRdinate3€peaCeful2&`

And the result?

![The password is excellent, with a length of 57 and entropy of 245.03 bits.](/images/longer-password.png)

A massive improvement! I'd happily use this password to secure a password manager. Now, there's no shame in writing down your password on a piece of paper, somewhere secure while you get it into your memory. But once you're sure you've memorised the password, destroy the paper immediately! Of course, this password is very long, and typing it in may take a moment, but remember that often you need to sacrifice convenience for the sake of security.

## Surfin' the net

I hope by this stage, you understand that "private browsing" isn't actually private browsing. Sure, your cookies and browser history will (generally) be deleted once you close your browser, but your ISP and other services can still see that you're looking at an online comic with some *very* specific tags. You might not think this to be a problem, but this can still be attached to your profile using system details, and websites will log your activity anyway. Your little secrets are only known to you and everyone making chrome. Speaking of...

### Everything is Chrome in the future.

Ugh. You can't escape it. I even found, on accident, that the spotify app on Windows is just an installation of Chromium. And using Chrome anyway isn't great, what with Manifest V3 coming around the corner, which will massively reduce the impact of ad blockers. That means, yes, I will say it: use Firefox! If someone sends me that one discord meme again I swear to god...

...or, don't use Firefox! As of writing, there is some upset at the moment, regarding Mozilla's change in terms of service, which may allow for some data collection, which up to this point, their lack of such was a major selling point for Firefox. But that's not the reason I stopped using it: I'm not using it anymore as I don't support their motivation to start integrating AI tools into the browser: if I want them, I will use an extension!

Instead, I use [LibreWolf](https://librewolf.net/), which is based on Firefox, but has some privacy focussed settings, like disabling lots of trackers, disabling various features by default, deleting cookies on closing the browser, and preinstalling uBlock Origin! I'm willing to give up some Firefox-specific features such as browser sync in exchange for better privacy and tracking prevention.

If you want to stick with Chrome, for whatever reason that may be, you could consider using Brave, however just the fact that its wikipedia article has a "Controversies" section, is enough to put me off. And they messed with Tom Scott. No thanks.

### Extend the fox

Or wolf, if you're now using LibreWolf. Here's some Firefox extensions I'd recommend to further improve your tracking protection.

#### Privacy Badger

Privacy Badger blocks both cookies and remote domains that are referenced on a web page. It learns over time, what domains to block, but you can easily change what's blocked if something breaks, or you need certain cookies.

#### FlagFox

FlagFox, primarily, adds a small icon to your address bar, and shows you where a website has been fetched from. It can also give you the web server's IP address, and you can use "WhoIs" to get more information about the domain registration, among a litany of other helpful tools. It's also just fun to see where stuff comes from!

#### uBlock Origin or Adguard

It was inevitable that I was gonna bring up an ad blocker, but these are both great options. Ad blockers are actually quite important in protecting your privacy: they don't just make your life easier. Some companies use "spy pixels", which can be used to track you on a website: these aren't just ads, but uBlock can block these. Also, remember that not all ads are genuine: some can take you to a scam webpage, either selling you a fake toy, giving you malware, or pretending to state that your computer has been hacked. The FBI even recommends you use an ad blocker!

#### Cookie Managers

Any manager works, so long as the reviews aren't calling it a load of rubbish. But cookie managers can be useful to see who's putting tracking data on you, but also to see where login tokens are stored: browsers such as LibreWolf will delete all of your cookies when you exit the browser, so logins are deleted too. You can use a cookie manager to identify domains which you want to whitelist cookies for.

## Penguin Time

You thought I wasn't gonna talk about Linux? Nuh uh. In all seriousness though, Windows in recent years has gotten slower and slower, in no small part due to the added telemetry that Microsoft includes, as well as the bloatware. It's even worse if you're using a Copilot+PC machine, which has the new "recall" feature, which has been exploited in the past. Windows also forces features like OneDrive, storing your documents online, even if you don't realise it's happening, which can become a huge privacy concern too.

On the flipside, Linux is (mostly) open-source, so people will very quickly patch out anything that even remotely smells like telemetry. Or at least be very vocal about it. Furthermore, the vast majority of attacks on consumer devices are targeted at Windows users, since for most people, PCs mean Windows, immediately making lots of attacks against you useless. That being said, Linux isn't 100% safe, nothing is. It's still possible to make malware or do bad things to a Linux machine, it just requires a different set of tools and expertise.

And before you ask, *no*, Kali Linux is not any more secure than its parent, Debian. It also does not make you look cooler, it's literally just Debian with tonnes of cyber security tools like burp suite and metasploit.

## Cool People

Here's some other people and resources I recommend you check out:

**Reject Convenience** ([YouTube](https://www.youtube.com/@rejectconvenience)) - Want to learn about how you're tracked online? Why many VPNs are snake oil? Or what about living with a dumb phone? Reject Convenience talks about these topics and more, and their main motive is to spread awareness about data collection and allow people to better control what gets shared online.

**Mental Outlaw** ([YouTube](https://www.youtube.com/@MentalOutlaw)) - Mental Outlaw makes videos about things currently happening in the privacy and Linux tech spheres, and also has lots of good tutorials for stuff like switching to Linux, or using privacy tools. Were it not for this channel, I may not have been able to do my coursework for this module without their QEMU tutorial!

