+++
title="Windows 10 Support ends in less than a month - here are your options."
date=2025-09-16
+++

![Screenshot of Fedora Linux showing a web browser window](/images/blog/windows-10-end-of-life/screenshot-1.png)

Windows 10 support is set to end on the 14th of October, and according to Microsoft, your only option is to switch to Windows 11 by any means necessary, otherwise you risk compromising your device. Is your device not supported? Maybe it's time for an upgrade. Don't want a Microsoft account? Maybe 1GB of OneDrive storage will sweeten the deal for you! 

I'm of course being a bit sarcastic here, since Windows 11 is... passable in respect to its predecessor. Don't get me wrong, I like the more consistent design and centred taskbar, but the push for AI, ads *everywhere* and lack of user control are all more than enough for me to at least try the main alternative: Linux. And if you read my [previous Linux blog](/blog/daily-driving-linux-for-six-months), you'll know that Linux has now become my new favourite thing. So, if you're thinking of trying Linux, let's figure out if it's the right choice for you, and how to get started. If not... keep reading anyway, as I'll discuss some other options, including mixing and matching.

## Addressing the penguin in the room

*Erm acksually, I think you mean the penguin and the wildebeest in the room*

Let me get the main selling points of Linux out of the way: it's free, doesn't require the internet to install or use, and highly customisable. But first you really need to consider if Linux is right for you. And that ultimately comes down to what software you want to use, since Windows has the distinct advantage of being the host to the largest software library of any operating system. If all of your work is contained within a web browser, for example, you should definitely consider switching! Just like Windows, you can say no to Edge or Firefox and go straight for Chrome if that's your cup of tea. If, however, there's other software you use, you'll have some thinking to do.

### Consider Linux if you use...

- **Browser Apps** - Linux has Chrome, Firefox and Edge, which work exactly as they would on Windows. If you only use a browser, the transition will be near seamless!
- **Steam** - Thanks to Proton, most if not all of your library will be playable on Linux. Even if a certain game doesn't immediately work, there are custom proton versions you can try.
	- Check [ProtonDB](https://www.protondb.com/) to see if your favourite games work.
- **Minecraft** - The Prism Launcher lets you run Java edition on Linux, AND makes it easy to install mods! Currently there is no support for Bedrock (but... why would you use Bedrock?).
- **Roblox** - Sober is a Linux Roblox client that works perfectly without hitches (results may vary).
- **osu!** - Try lazer!
- **Visual Studio Code** - Microsoft gives specific instructions for installing on Linux. Note that some shortcuts are different.
- **JetBrains IDEs** - There's official installation instructions for most, if not all of JetBrains' software.
- **Microsoft Office** - Unless you use really esoteric features, like Visual Basic Macros, you have the option to use either the online versions of Office, or LibreOffice for local work.
	- Tip: If you use LibreOffice, the "Tabbed" interface gives you a layout more similar to Office.

### Don't switch to Linux if you rely on...

- **Adobe Products** - Adobe does NOT provide Linux-compatible versions of their software, so you'll have to resort to either their web-based counterparts, or alternatives which have their own learning curve.
- **Competitive Online Games** - Many titles use anti-cheat software that generally isn't compatible with Linux, and trying to run these games in hacky ways on Linux will likely result in a ban. Such games include Fortnite and Competitive CS lobbies.
- **Professional Software** - DO NOT switch to Linux if your work laptop relies on Microsoft-based services, or uses software designed for Windows. Trying to source Linux alternatives and workarounds is generally a waste of time and will cause unnecessary headache.
- **iTunes** - There's no version for Linux, so if you have an old iPod laying around, either keep Windows, or consider using Rockband.

> **Update (15/10/2025)** - I previously mentioned on here that newer Nvidia GPUs don't have good support on Linux, however more recently, Nvidia has their own open-source drivers which run on Linux and support all of their most recent GPUs. So, your GPU shouldn't matter, you're good-to-go regardless of manufacturer! (Of course, your mileage may vary)
>
> Thanks to [@xenia.sh](https://bsky.app/profile/xenia.sh) on Bluesky for pointing this out!

Fear not if your favourite software isn't supported on Linux, try using [AlternativeTo](https://alternativeto.net) to seek out alternatives. For example, while there's no Adobe Illustrator, you could try learning to use Inkscape. Or instead of Photoshop, try GIMP (get your mind out of the gutter). Wine is also an option to run some Windows apps on Linux, but it's very unlikely to work on newer software: I've personally never had any luck with it.

## So, how can I start using Linux?

Well, first I have to answer with a question: what kind of Linux? If you're wondering why everyone doesn't just use Linux, it's because the term Linux itself doesn't just describe an operating system. Rather, Linux is what's called a kernel, which is the "skeleton" of an operating system. Other software simply hangs meat over said skeleton to form a complete OS. Hence, you have *distributions* of Linux, such as Ubuntu, Fedora, Mint and so on. You might have heard of one of these before.

Of course, if you're new to Linux, it's not fair of me to expect you to make the decision on which distribution to pick, so let me make some recommendations. **If you want the easiest option, choose [Linux Mint](https://linuxmint.com/).** The installer is very straightforward and you'll be up and running in a matter of minutes. The layout is very much the same as Windows, while still looking distinct (I'll explain why that's important). In fact, I've installed Mint onto used laptops for family, and they've loved it, way more than Windows.

If, however, you don't mind a short learning curve, I'd highly recommend trying [**Fedora Linux**](https://fedoraproject.org/workstation/download), this is what I use. However, note that by default, Fedora uses the GNOME *desktop environment*, which basically means it'll look and function more like MacOS rather than Windows. So, I use [Fedora KDE Plasma Desktop](https://fedoraproject.org/kde/download), which uses KDE Plasma, which looks more like Windows, and has more customisation options out of the box. A desktop environment is simply the user interface, or what you interact with directly. Other distributions also use GNOME or KDE Plasma, and there are other desktop environments too, like Hyprland, XFCE and Cinnamon.

I say Fedora has a slight learning curve, because the installer is a little technical, but if you're just getting rid of Windows, there's nothing to worry about. Once you're through to KDE Plasma, things should be looking rather familiar. But, you can very easily change up the look with widgets and extra taskbars (or Panels, as they're called). Have a look at [Mental Outlaw's video](https://www.youtube.com/watch?v=R4RwAm3woeo) on KDE Plasma for more about it.

![Screenshot of Fedora Linux showing a terminal window](/images/blog/windows-10-end-of-life/screenshot-2.png)

If Mint or Fedora don't take your fancy, think about these choices:

- **[Ubuntu](https://ubuntu.com/desktop)** - Arguably the most well-known version of Linux, which uses GNOME and its own software called "Snaps".
- **[Kubuntu](https://kubuntu.org/)** - The same thing as Ubuntu, except it uses KDE Plasma instead of GNOME.
- **[Debian](https://www.debian.org/)** - Essentially Ubuntu's older brother, Debian can run on older systems, but has a more technical installer, and requires some poking around to get up-to-date software.
- **[Bazzite](https://bazzite.gg/)** - This is essentially Fedora, with Steam, KDE Plasma and additional GPU drivers preinstalled.

You could try other options such as PopOS or Tumbleweed, but I've not tried these for myself before, and they're not as widely supported. I would also HIGHLY recommend that you DO NOT install Arch, Gentoo, Nix or Manjaro to start with. These versions of Linux are designed with user control in mind, which at first sounds great, until you realise that this leaves you in charge of *everything*. The installers for these are generally far more technical, and there's huge room for user error (trust me, I would know).

I would also advise against distributions designed to replicate Windows as closely as possible, such as AnduinOS, since these will make it easy to forget that you're not using Windows. Of course, things on Linux will work a little differently, so it helps if the interface has some differences so that you recognise that not everything will be the same.

Once you've picked your "distro", download the ISO file for it, then have a look at [How-To Geek's guide on installing Linux](https://www.howtogeek.com/693588/how-to-install-linux/). I'd also suggest verifying the integrity of the file you downloaded before proceeding with the install, to ensure that it isn't corrupted. It's not required, but it's better to be safe than sorry.

## The *other* other options

Okay, so let's say you don't want to use Linux, or, you can't use Linux. What can you do? Well, you can of course, try installing Windows 11 anyway, either by getting newer hardware, or you can instead try bypassing the installer to overcome the hardware restrictions. Of course, this isn't officially supported by Microsoft, so your mileage may vary, and you won't be able to get support if something goes wrong.

You might also consider MacOS, but that means either investing in Apple's ecosystem, which can be very costly (while having some benefits, such as better battery life), or trying to make a "Hackintosh", which is basically impossible. If you try the latter, good f\*\*\*ing luck. Not just with installation, but also with using the damn thing, drivers are gonna be a nightmare.

But lastly, you could always... do nothing. No, I'm deadly serious. The end of support for Windows 10 doesn't mean your computer will stop working completely, it just means you won't be able to receive support, and you'll no longer get security updates. What that means is, you're basically on your own, and your computer will be vulnerable to exploits discovered after 14th October. So, if you're not working with sensitive data, and you don't use the internet on your computer very much, you should be fine.

It's also worth mentioning there are other operating systems that aren't Windows or Linux, such as Haiku or ReactOS, but use these at your own risk. I've never tried these myself and don't really intend to, plus these have really small user bases, so you're unlikely to find appropriate support or documentation. But hey, don't let me stop you if you fancy a challenge.

## Why not both?

*I think more of us should be asking this question, but that's me.*

Okay, let's say you want the freedom of Linux, but you gotta keep your Crown Victory Royale streak going on Fortnite (I'm definitely not projecting wdym), then you may want to explore the option of *dual booting*, or, having multiple operating systems on your computer. This almost has the effect of splitting your computer into two separate devices, as each operating system will work completely independently of the other: this is great if you want a playground to do whatever you like in, while keeping your original system, but remember that files will remain separate in both. If you want to be able to access the same files in both systems, use either your own file server ([see my blog on Faelen](/blog/meet-faelen-home-server)), or use a cloud storage solution such as Google Drive or OneDrive.

Some Distros will allow you to install alongside Windows pretty easily, namely Mint and Ubuntu, but some may require more work. If you don't see an option to install Linux alongside Windows, follow [Geeks for Geeks' guide](https://www.geeksforgeeks.org/techtips/setup-dual-boot-with-linux-and-windows/) to make space on your hard drive, then follow the installation again. You may need to select an "advanced option" to make sure you select the right location.

Once installed, you should hopefully see GRUB, which lets you pick between Linux and Windows. It's a black screen with a box containing options for both OSs, use the arrow keys to select what you want to boot into, then press enter. If you *don't* see this, you'll have to install GRUB yourself, which will require you to use the terminal. Simply search up `[distro name here] install grub` and follow instructions there. *Make sure you back up your data when you do this*, because if something goes wrong, your system might be unable to boot. If that does happen, just reinstall Windows and try again. Some tinkering in your BIOS may also be needed to keep Windows from booting first.

Historically, some people have reported that dual booting has led to issues, namely Windows updates writing over Linux hard drive space, rendering Linux unusable on their system. However, I've never ran into any issues, so I imagine you'll be just fine, but as I like to say, don't shoot the messenger, I'm just saying this because your mileage may vary.

## Conclusion

Of course I was going to suggest Linux as an alternative to switching to Windows 11, but it's for good reason. Linux has become very usable and approachable for most people, considering that realistically, most people just use the web browser. But because Windows got ahold of the computer market first, and now has a choke-hold on it, computers will mean Windows to the general public. And, yeah, I don't think there's gonna be a "year of the Linux desktop", because on top of that, Linux is littered with its own issues, like differences in packaging software, controversies in communities and overall pompousness of some people in said communities. I say shut up, and let people use what they want!

So to close, I'll repeat what I said last time: pick a distro, load it onto a USB, and get going, you've nothing to lose and everything to gain.