+++
title="Meet Faelen: My new Linux Server"
date=2025-08-05
+++

![Close-up picture of the server](/images/blog/meet-faelen-home-server/intro-image.jpg)

Lately, my Google account has not stopped giving me scary warnings that I'm nearing my storage limit for my drive. For context, I've been using the free limit of 15GB for years to store my photos, since Google photos now counts for drive storage. So clearly I had a choice on my hands: delete some photos, which I obviously wasn't going to do, or bite the bullet and pay £1.59 a month for more data. So I decided to spend £500 on my own storage server.

To be fair, I've wanted to get into "homelabbing" for a while now, what with the wide range of open-source apps available which provide great alternatives to services provided by big tech companies. It's also a great way to give yourself a sandbox for making your own network applications and, hence, learning more about networking. Here's how I put mine together, what I installed onto it, and what I learned from the experience.

## Built on hopes and dreams

*Part of me wishes that was a joke...*

You can build a homelab on basically any computer: from a Raspberry Pi, to an old laptop, all the way up to top-of-the-line server hardware. I decided I wanted to build a custom desktop PC for this, starting with a measly used Ryzen 5 3600 for the CPU. You might not think this to be a good option for a server, but consider that realistically, at most three or four people are going to be accessing the server at any given time, and only doing one or two things, so six cores will be fine (especially since hyperthreading means we technically have twelve logical cores!). Also, this CPU has the significant advantage of being bundled with a cooler, giving us fewer things to worry about.

For all the other parts, I bought 32GB of refurbished RAM, a used B550 motherboard, along with a new power supply, 1TB NVMe SSD for the boot drive, and three 2TB hard drives for storage. I wanted to prioritise the use of used components, mainly to bring cost down, but also to ensure that I was giving some older tech a new lease on life, something we should all be doing a lot more. However, I still don't entirely trust used storage devices or power supplies, hence why I got these new (plus, I did all of this while Prime Day was happening). If you're looking to buy some used drives, make sure you ask the seller for their [SMART data](https://en.wikipedia.org/wiki/Self-Monitoring%2C_Analysis_and_Reporting_Technology): this reveals a lot of information about the drives' health, such as the total uptime. You can also analyse such data yourself with apps like CrystalDiskInfo.

For the physical assembly, I also bought a Fractal Node 804 case on discount on Amazon, since it has a drive assembly that fits up to 8 hard drives, with room for extra, plus a spot for a slim slot-loading DVD drive, making upgrades very straightforward. I decided a GPU wasn't necessary for this build yet, since the server can and will run headlessly, so adding one at this stage would just be unnecessary spending. I'd just need a GPU for getting through the installation, so I just borrowed my 6700XT from Nahkato (my PC rig, yes I name all of my PCs, but not my plushies) Putting the whole thing together was pretty straightforward, as at this point I'm very much used to PC building. Just ignore the fact I had to improvise a solution to a missing M.2 screw... Look, if it works, it's not stupid.

![An improvised M.2 screw](/images/blog/meet-faelen-home-server/m2-screw.jpg)

## Feelin' a bit 'moxy

Now for software. First and foremost, I installed Proxmox to the system, which is essentially a hypervisor. What is a hypervisor? It's basically a bare-bones operating system designed for managing virtual machines. This lets me split the server into separate, purpose-built machines for each of the tasks I want to perform. This also means I can spin up a new VM or Linux Container at any time and have room to mess around however I like, with minimal repercussions if something goes wrong. That being said... it helps when you configure your network correctly.

### Networks: the what, why and, huh?

I made the mistake of assuming that my router supported a /16 subnet. What that means is, it supports a network where all devices have an IP address of the same prefix of 16 bits. This would mean that up to 65,536 devices could be connected. Obviously, a crummy little router designed for normal people cannot do that, so it instead supports a /24 subnet, meaning each device's IP address has a prefix of 24 bits, allowing 256 unique devices. If a device tries to connect to a gateway with a smaller subnet mask than it supports, it will simply deny the device network access.

### Back on track...

Eventually, after diving into the rabbit hole of trying to fix networking drivers, I then simply tried reinstalling proxmox. And by magic, the whole thing started working. So I packed up the mess I'd made while building, rewarded myself with some leftover chicken stroganoff and rice, then got to the fun part of this whole project.

## Let's get NASty

*I'm making way too many horrible puns, sorry.*

My first priority was setting up a NAS on the homelab. To do this, I first created a TrueNAS Scale VM, directly mapping each of the three hard drives as additional storage. I could then go into the web interface and set up a new "dataset", configuring the drives in a RAID Z1 layout. What this means is, the three drives are combined into one, *but* extra parity bits are inserted, which means data can be restored if one of the three drives fail. This does mean you lose one drive's worth of storage, however. This meant I had 4 TB of reliable storage as my canvas.

First, I set up an SMB share. SMB is the primary protocol used by Windows devices, which I felt would be appropriate as I felt my housemates may also want to connect to the NAS and store their own files. Even though all of my own devices run Linux, Samba enables SMB support and is usually packaged in a lot of distros by default. Once I connected to this share, I moved over all of my data on Nahkato's secondary drive (except the steam folder), along with data on my Google Drive, personal OneDrive and university cloud storage. I then promptly deleted this data from their old locations. Finally. All my data in one central location.

Then, I set up Immich, which is a great open-source alternative to Google Photos, with its interface looking awfully similar. I made a separate location on my dataset from my SMB share for this, then proceeded to pull all of those photos on Google Photos onto it, along with some additional photos kicking around on my other devices. This was all quite easy to set up, since TrueNAS has an app which installs Immich as a container. Now I could uninstall Google Photos from my phone.

![A screenshot of Immich](/images/blog/meet-faelen-home-server/immich-screenshot.png)

Lastly, I needed some sort of backup. Building another offsite backup was a no-go, since that would be expensive, and archive media would take too much time and fuss to sort out, so: cloud storage. I went with Storj, since they offer the lowest rate per gigabyte I could find, although they charge a fair amount for Egress (downloading files from the service), but this is fine as I'd only do this in the event of needing to restore. At a minimum monthly charge of 5 USD (\~£3.75), it's a little more expensive than Google Drive's 200GB offer, but I'm already using 2.5 times that amount, plus the minimum charge covers me for 1.25TB. At full capacity of 4TB, it'll be 16 USD (\~£12) per month, which isn't too bad. Now I can sleep at night knowing all of my data is safe, even if my server dies.

## Docker? I barely know 'er!

Next, I wanted to make a server for hosting some Docker containers. I originally wanted to try Fedora Server with Podman, which actually had a really nice web interface that made the first bits of setup quite easy, but translating docker compose syntax into podman proved to be a bit annoying, and led to some issues on my part. Also, the web interface did have its moments...

![Fedora Server Canvas Error](/images/blog/meet-faelen-home-server/fedora-server-canvas-error.png)

> (Don't worry, this was just because I had HTML Canvas turned off for fingerprint protection)

Instead, I decided to go with Ubuntu server with OpenSSH and its docker extension installed. This way, I could very easily copy-and-paste docker compose layouts, and have containers up and running within seconds. Pair this with a quick update to the `fstab` file to mount the SMB share, and now I was ready for some shenanigans™. Here are the containers I currently have running:

### Pi-hole

I already use uBlock Origin on basically all of my devices, but having Pi-hole means requests for ad content aren't even processed, allowing for web pages to load a bit faster, plus this lets other people on my network set up ad blocking on their devices. Note that this doesn't disable ads on YouTube or Instagram, as they use sneaky tricks to insert ads and bypass DNS filters like this. If you use these, ad blocking extensions can block these.

### Navidrome

I collect a lot of CDs, and have already ripped most of them in WAV quality, which is about 3 times better quality than Spotify. AND I can do whatever I want with these files, like put them on my SMB share and point Navidrome to the folder, so I can access all of my music on a spotify-like web interface! I can even use substreamer for android to listen to music on my phone. In fact, I'm currently listening to Discovery by Daft Punk while writing this post. Using techniques I explain later, this then allows me to stream music in the best quality possible (but you'll need a beefy mobile data plan!). 

### Memos

This is just a basic notes app which lets you sign in and write stuff on a twitter-style interface, with some nice additional features like tags, shortcuts, and a GitHub-style tile calendar. I imported all of my notes from Google Keep, and am now using this app to write the very blog page you're reading right now!

## Be a sysadmin, anytime, anywhere

This is great and all, but I can only access all of this cool stuff in my house. As soon as I step too far outside of my home, bam! All of my files, music, notes and servers are inaccessible. I initially tried using Wireguard to create a VPN tunnel in my docker server, however I couldn't get this working properly: on my phone I would either end up with an invalid configuration, or I would connect, but have no connection to my devices.

Eventually, I said *Screw this*, and resorted to using Tailscale's free tier, which requires basically no setup, aside from signing into a central account for all devices you want to link together. Now, when I connect a device to this VPN tunnel, I can access each device on its own new IP address, mapping this as an external server on my Immich app and substreamer, as well as using these addresses on my laptop, and just like that, I can access everything, anywhere in the world where there's WiFi.

## Goodnight, Faelen

There's still bits I want to figure out, like other services provided by big tech that I can substitute with self-hosted solutions, creating my own network apps, and scrubbing data where I don't need it anymore, but either way, I feel a lot happier and free, knowing that all of my data is now accessible at any time, all under my own control.

And of course, this is all another nod towards Linux, since Proxmox and TrueNAS are both based on Linux. With the knowledge I gained previously, doing stuff like editing configs, filtering out data and mounting drives was very painless. It's also allowed me to start getting comfortable with docker, since docker compose is quite plug-and-play: just copy a YAML, run `docker compose up -d`, and off you go! These are all skills that will be invaluable going into my next year of university, as my project will be working in both Linux and Networking. It's also a nice departure from all of that software engineering work I've been doing, which gets quite tiring and repetitive.

I'm not going to tell you to go out and buy parts to make your own homelab. It's not for everyone, and it takes some time and patience (it certainly tested mine!), but as someone who's fascinated by IT, server tech, and wants control over their data, it's a rewarding hobby to pick up, although my wallet has certainly suffered a little for it, but that's not the worst of it, I've spent more at conventions this year. Anyway, I'll see you all later, now I need to figure out how to host my own email server\*.

\*that's a joke, I don't even self-host my own website on this thing.