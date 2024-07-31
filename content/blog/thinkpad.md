+++
title="The little ThinkPad who could"
date="2024-07-31"
# [taxonomies]
# tags=["PCs","linux"]
+++

![The ThinkPad X131e, in all its glory.](/images/thinkpad/thinkpad-x131e-banner.jpg)

While at University, I've picked up the hobby of scouting out old electronics on eBay. For me, it's a bit of a therapeutic practice, and it's honestly more fun than shopping around for new tech which likely costs much more. Of course, I have bought the occasional thing here and there, and this post talks about my most recent impulse buy: A broken Lenovo ThinkPad X131e.

The ThinkPad X131e, to my knowledge, was an entry level laptop aimed at the education market in 2012. It's tiny, with an 11.6 inch screen, but being an X-series ThinkPad, it's designed to take a fair beating, presumably jostling around in one's backpack. *We don't need no stinkin' carry cases!* My model comes with an AMD dual core processor, although some research suggests there are also models that came with Intel's (probably faster) Core 2 Duo.

So what was the problem with this laptop? Nothing too difficult, actually, as there were no issues with the hardware or cosmetics. Rather, it had a BIOS lock, and a forgotten Windows password. So, I fixed both of these problems, made some upgrades, and put this laptop to the test. Just what can be done on a twelve-year-old entry level laptop?

## Who's my supervisor again?

The BIOS Lock on older ThinkPads is fairly common, and is referred to as a "Supervisor Password". You can think of it as the lock for all of the BIOS options. While it doesn't prevent you from being able to boot into your operating system, it does prevent you from changing some useful settings, like boot priority, which is useful for installing a new operating system (definitely not foreshadowing).

You can bypass the Supervisor Password by locating a security chip on the motherboard and shorting a couple of pins together. If you're looking for a guide on how to do this, I've made a separate post about the process [here](/blog/thinkpad-x131e-supervisor-password).

## PSA: Wipe your hard drives!

Now to address the other issue: the locked Windows account... by not addressing it! Let me explain. This laptop came installed with Windows 10, likely imposed on the last user who was using Windows 7 (which is what this system was originally bundled with). Furthermore, the primary storage on this machine was a 360GB hard disk drive, so this thing was slow. Very. Very. Slow. So, for a mere £30, I pulled that drive out, and replaced it with a 480GB SSD.

![Swapping out the old hard drive for a new SSD](/images/thinkpad/hard-drive-swap.jpg)

I also checked the original drive on another computer using a USB to SATA cable. Since the laptop had a locked account, it was not wiped at all, nor was it encrypted with BitLocker, so I could see *everything*. Let this be another reminder to always format your device before you sell them! You never know who will get their hands on your data! Anyway, I wiped the drive and will likely use it as an external drive, using a cheap enclosure.

## Linux Time

Now I had a blank drive in the computer, so now it's more useless than when I bought it. Let's fix that.

To be honest, I had a bit of a struggle getting Linux running at a suitable speed on this laptop. The first distro I tried was Fedora with the KDE Plasma desktop environment, which was painfully slow to use. I then tried Debian, but couldn't get past the install prompt because WiFi driver issues (which for Linux seems to be a recurring theme), until I settled on Linux Mint with the XFCE desktop environment.

Once I got Linux Mint installed, I tethered the laptop to my phone and installed the WiFi driver through the Driver Manager Application, which picked up and installed it automatically. Nice and easy! Once done, this laptop was ready to use.

![Linux Mint with XFCE running on the ThinkPad](/images/thinkpad/neofetch-screenshot.png)

## Is it usable?

I upgraded the RAM to its maximum capacity, going from 4GB to 8GB for the best experience. I was able to run the latest version of Firefox, and use it to browse most sites, log in to some accounts (with a YubiKey!), stream music over Spotify, and even watch YouTube at 480p! I could also run all of the built-in office applications and do some light web development using the terminal as well.

Amazingly, I managed to get a couple of steam games (mostly) working as well. I tried Portal, which ran at about 30 FPS on the lowest settings, while encountering large amounts of stutter. For me, it was just barely playable. I also tried a much less demanding game, Backpack Hero, which is a 2D strategic dungeon crawler. This ran very stably, with occasional stutter: it was playable enough for me to clear a floor in a quick game!

To my surprise, the main bottleneck was the CPU, usage of which fluctuated a lot under workload between the measly two cores. I assume this also meant graphics were bottlenecked, as this laptop (predictably) runs on integrated graphics. While I was able to multitask on this laptop, I would not recommend doing so, as it seriously slows the laptop down. Overall I'd say it makes a great machine for word processing or code editing, when you want to mitigate distractions on your main devices, like me.

This ThinkPad cost me £30 with shipping, and I paid an additional £40 on upgrades. I can't say for certain if this was a completely cost-effective purchase, but I don't regret it. So, if you have a bit of technical knowledge like me, and have a little bit of cash to spare, try scouting on eBay for a broken ThinkPad yourself! These laptops are unusually easy and satisfying to take apart, so they're a great way to start learning how laptops in general are put together.