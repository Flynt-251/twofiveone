+++
title = "I've daily driven Linux for over six months. Here are my thoughts."
date = "2025-05-04"
+++

![My laptop, showing the output of FastFetch and my browser, LibreWolf](/images/blog/daily-driving-linux-for-six-months/laptop.jpg)

At the start of the academic year, I finally made the decision to switch to Linux. And if you want the short answer to how it's going, **I love it**. It's true what people say, you are now in control of your computer on Linux, and that serves as both a blessing and a curse. So in this post, I want to share with you the things I've learned, what I think about Linux now, and the next steps I'm going to take. I may even do a bi-yearly update on my usage if there's demand for it!

<!-- more -->

## The first big question

I already know some of you are asking this question, so I'll answer it now for you. My distro of choice is [**Fedora Linux**](https://fedoraproject.org/) on both my work laptop and my main PC rig, dual-booting with Windows on both. At least, this was the case on my laptop until I did a clean install again. Now for the next question, *"Why Fedora?"*. Well, to be honest, I picked it because one of my friends suggested that they were trying it. I didn't even know myself what I was getting into, until I installed it onto my computers.

I *did* however, make a conscious choice of picking my desktop environment, KDE Plasma 6. At the time, I had seen [*The Linux Experiment*'s video](https://youtu.be/mtaQroi75M0) about Plasma 6, and I immediately knew that Plasma would enable me to create the interface of my dreams. More on that below. I've stuck with Fedora, because it turns out, it's very stable, and pretty much plug-and-play: no major issues requiring me to dig through forums or tether my phone in order to hunt for drivers, etc.

## The perfect desktop experience

The great thing about KDE Plasma is, it's highly customisable. Like, taskbars (or Panels, as they're called in Plasma) on any edge of the screen, widgets anywhere you like, an entire suite of custom animations, custom colours for windows, the list goes on. It puts Windows to shame! I personally take some inspiration from the [Avdan OS concept](https://youtu.be/tXFEiw1aJTw) with my panels, opting for three separate panels on the bottom of my screen, left for the "Start Menu" and system monitors, centre for apps like on Windows 11 and MacOS, and right for system tray and other widgets like media control. It may be a bit cursed, but I love it.

![Screenshot collage of my panels](/images/blog/daily-driving-linux-for-six-months/panels.png)

I have minimal experience with GNOME, and whenever I have used it, I haven't enjoyed it very much. I'm also aware that without the use of third party plugins, you can't really customise the desktop very much, which is a hard pass for me. Plus I'm not a fan of the top bar that persists on every screen: I'd like the ability to be able to collapse/hide it to make as much room as I can for whatever apps I'm using. This is a problem I have on Windows as well. Even though you can auto-hide the taskbar, the animation looks off, plus sometimes Windows will just completely reset the option! Plasma is in 2025 while Windows 11 is stuck in 2015.

## The fun in f***ing around and finding out

Linux is just fun to mess around in. There's very little that's left inaccessible to you, the user, and even then there's nothing that a little `sudo` can't fix. It can be super rewarding to solve some problem you have, and see the efforts of your work pay off. For instance, my laptop, a ThinkPad E16, has a trackpad that supports multi-finger gestures, and on Windows I used this to seek tracks on my playlists. Plasma doesn't have any options for this already, so I found you needed to install TouchEgg and Touché to enable use of gestures, then I used `playerctl` to create commands that let me interface with my media controls. And so, after doing a small amount of research, I had just brought back a very useful piece of functionality to my laptop!

But, just as it can be fun fixing problems, it can also be a bit daunting sometimes. On my main PC rig, a custom-built behemoth with a Ryzen 9 and RX 6700XT, I had some trouble running Steam games on my secondary SSD. I later found this is because Linux doesn't play well with NTFS drives (a Windows specific format, I installed this second drive before switching to Linux), so I had to spend some time editing my `fstab` file to get them working. Fortunately, I did find a [script](https://github.com/Hezkore/steam-ntfs) (thanks Hezkore!) to do a lot of the work for me. Nevertheless, this caused me some headache where it came to gaming with friends, since I had to switch to my Windows partition.

## Never look back

Despite my hardships at times, I still *greatly* prefer Fedora over Windows 11. My main issue with Windows is consistency: for example, the Win+Arrow key combinations allow you to move windows around, by moving them to each side of your screen, minimising, maximising, etc., but the behaviour of each of these combinations feels inconsistent. On Plasma, though, I know fully at any given time, what each of these key combinations will do, and I don't have to do any guess work as to what will happen, *that's the point of keyboard shortcuts*, you don't think about how you're gonna use them, you just use them.

And then of course, there's the gripes I have with Windows 11 that basically everyone else seems to have: the updates, the ads, and the AI. On Fedora, I can choose when to perform updates, I don't get reminders every 30 seconds to install important security updates, although I do still have to restart my system in order for updates to take effect, but this isn't too much of a hassle. Of course, since Fedora is FOSS, there are no ads, in comparison to Windows which has now decided to integrate pop-up ads into the OS... And I'm not going to talk about the AI side of things, other than I think it's entirely superfluous and ultimately provides a distraction from actually trying to improve the experience of the OS overall.

![Obligatory neofetch, or rather, fastfetch](/images/blog/daily-driving-linux-for-six-months/linux-desktop-screenshot.png)

> By the way, if you like the wallpapers, you can get them here: <https://unsplash.com/collections/iEpaN-UrBOo>

## My Takeaways

Here's where you want to look if you're interested in trying desktop Linux for yourself, after a few months of experience, I believe I can quite comfortably share some useful tips and advice for making the transition over from Windows or MacOS (since Asahi is a thing!).

### It's possible to avoid the terminal

As I said before, Fedora has been quite a plug-and-play experience for me: no issues with recognising important devices, USB drives work just fine, and I've never had to deal with major graphical or audio glitches. The times where I have used the terminal, have been for my programming projects, coursework, or tweaking very particular things about my system. If all you're doing is writing up documents and using a browser, you shouldn't ever need to use the terminal. Nevertheless, learning how to use the terminal if you can set aside the time is quite rewarding, and allows you to automate a lot of repetitive tasks with scripting.

### Use Flatpak in moderation

Using the included "Discover" shop, or software centre in the distro of your choice, you have access to thousands of apps, many of which are made available using Flatpak, which essentially works like docker: Flatpak apps are like containers which host the application, which somewhat addresses Linux's issue of having five-dozen different package managers and binary formats, but the trade-off is some system access is blocked for security reasons. This can be quite annoying, and while a lot of issues can be fixed using [Flatseal](https://flathub.org/apps/com.github.tchx84.Flatseal), native binaries just work so much better. For things like Steam and Visual Studio Code, I would suggest using their respective installation instructions.

### If in doubt, use [Mint](https://www.linuxmint.com/)

While Fedora is great and easy to use, the installer can be a little confusing as it has you assigning disk partitions yourself. It may also take some time for you to get familiar with GNOME or Plasma. If these are turn-offs for you, or you have zero prior Linux experience, **just use Linux Mint**. It shares components with Ubuntu, one of, if not the most well-known distro of Linux, and it's easy to set up and quite quick to get used to. The installer gives you a simple prompt to help you dual-boot your system with Windows if you'd like, and it uses the Cinnamon Desktop environment, which is very similar to the Windows user interface. I actually installed Mint on a family member's laptop, and they *loved* it compared to Windows 10, which I think speaks volumes.

### Know what you'll lose

Unfortunately, there's a lot of software in the Windows ecosystem that you'll have to say goodbye to, if you switch to Linux. This can be mitigated by dual-booting of course. You *could* also try using Wine in Linux, but results can vary massively, and very recent software will likely break. Most notably, you'll miss out on **Adobe products, games with anti-cheat (i.e. most competitive shooters), and some other licensed or older software**. The only thing I'm missing out on is Fortnite, but I'm still dual-booting my gaming rig, plus I won't shed too many tears over not being able to play a few rounds of zero build. If you use something like Adobe Photoshop or Illustrator, I'd suggest trying the GIMP or Inkscape, I've used the latter for years and it's perfectly cromulent for what I need. I used it to create my PolyCrane icon! It's worth looking at what free alternatives are available for your needs, and giving them a try. [AlternativeTo](https://alternativeto.net/) is a great resource for this.

### Don't listen to the "Experts"

If you at all get involved in the Linux community, it should hopefully be quite welcoming, but a small subset of people may get you to try Arch, Gentoo, Nix or some special distro with a very niche or technical feature to them. **Please don't listen to them unless you know what they're talking about.** The thing about these types of distros is, they assume you already know a fair bit about Linux, and so place more trust in you, the user, to perform maintenance and make informed decisions as to how you configure your system. For example, while Arch Linux gives you great control over what's installed on your system, you could very easily install an update which breaks your system, and there's no recovery option by default. It's just not worth the time if you're not willing to accept that things go wrong.

### App recommendations

Here's some of my favourite apps which I've used over the past few months:

#### Flatseal

Great for assigning permissions to flatpak apps, for when things just aren't working correctly, e.g. an app doesn't have access to a certain folder.

#### Cavasik

If like me, you're a big fan of visualisers to go with your music, Cavasik is highly configurable and just fun to use.

#### KDE Connect

Should already be on your system if you use KDE Plasma, but this is essentially like Windows Phone Link, but actually useful. Share files between your devices, ping them, remotely run commands, etc. You can even use your phone as a presentation remote, pointer included!

#### KeePassXC

A great, *offline* password manager, which is completely free to use. It also include a password generator and strength checker, and works with a browser extension. Works great with **SyncThing** to synchronise between devices. Use **KeePassDX** on Android devices.

#### TealDeer

If you want to start using the terminal more, this is a nice alternative to the `man` command, which provides a more brief and concise synopsis for commands, with plenty of examples.

#### Asunder

Got lots of CDs you'd like to rip and save to your collection digitally? This is a very simple app which gets the job done. It can automatically fetch album metadata from the internet, and allows you to export to a wide range of formats, including WAV, MP3, OGG, etc.

#### Touché/Touchegg

Allow you to enable three- and four-finger gestures on a trackpad. These both need to be installed together to work correctly. Touchegg is a service which you need to enable using systemd, and then Touché allows you to configure the behaviour. I use these in tandem with `playerctl` to manage music playback.

## Parting Thoughts

In the past three months, I've barely touched Windows, and in every instance, I have hated every second of it. Some might say I have been converted to the Linux cult, which is quite true. I think it's quite incredible that I can have a much more enjoyable experience using my computer on a day-to-day basis, all for free. No more paying for licenses. No more bloatware. Just a lightweight, usable system which I have full control over.

And things have only gotten better. Previously, I had Discord struggle to get screen sharing working, but just a couple of weeks ago, I was able to host a Jackbox game night without a sweat. The development teams are hard at work making the experience even better for each desktop environment, each distro, and the kernel itself. It's all inspired me to look further into Linux development, and I may even try making my own distribution as a project (be on the lookout for that).

I may swap to a different distribution in the future, such as OpenSUSE or Debian, and I am willing to give Window Managers a try, mainly hyprland. My only issue with these is multi-monitor support though, which I've heard is quite limited. I've tried Arch (btw), but it'll be a long way off before I'd even consider daily driving it, and as cool as Nix OS is, it would serve better on a work machine such as my laptop, rather than my gaming rig.

If you want to try Linux, stop waiting. Pick Fedora or Mint, flash the file onto a USB drive, install, and get going. In the days of cloud storage and device sync, you've got nothing to lose and everything to gain.