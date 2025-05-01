+++
title = "CN1 - Intro to networks"
+++

Computer networks, are really just a bunch of computers that are screaming to each other. Sometimes they do this at light speed, they may use copper wires, and even a few will scream over the telephone (no, seriously). We describe these means of transmitting data as **communication links**. Each computer assigns itself a certain role as either a **network edge**, or endpoint, which creates packets and runs network apps, or a **network core** which performs packet switching, routing and forwarding, such as routers, wireless access points and switches.

## This... is a packet.

*Dear God...*

There's more. Packets are the lifeblood of networks. They're simply a bunch of bits which are bundled and treated as a single unit on a network. They act *atomically* in transmission, so either a whole packet is sent, or no packet at all. So, for a packet of size $L$ bits, to be transferred at the transmission rate of $R$ bits per second, will take $\frac{L}{R}$ seconds. If there's a network core or other intermediary device between the two edges, this will of course double. These are factors that we ought to consider when determining an appropriate packet size, since the use of packets does have some overhead.

### Late to the snack run

**Packet Delay** is a common problem that needs to be dealt with in networks. It's more than likely that a network device has to *wait* for a recipient to be ready to receive data, so network cores will usually have a buffer in which to hold onto packets. If this fills up, then the core has to drop further incoming packets, meaning edges will have to re-send data. We of course want to prevent such scenarios as much as possible.

Packet delay is split into four different types of delay, which are summed together:

- Transmission - the time it takes for a packet to come into a device over a communication link, i.e. *bandwidth*
  - Recall formula $\frac{L}{R}$.
- Processing - time that the device takes to take in the packet and process it
  - Could be sped up with more powerful computer hardware
- Queuing - average waiting time for packets to be sent to other devices
  - Could be sped up with more powerful networking hardware in other devices
- Propagation - physical limitations of the communication link to the recipient
  - Calculated using the length of the link, $d$, and its speed $s$ in the formula $\frac{d}{s}$
  - For example, transferring a signal over 10km, over fibre optic, would take 0.03 milliseconds.

These result in the formula $d_{nodal} = d_{proc} + d_{queue} + d_{trans} + d_{prop}$.

### Put 'er through

**Throughput** is a common term to describe the overall transmission rate or flow of a network. It's term also used in high-performance computing, when describing how much data can pass through some link (e.g. the throughput of data in a GPU). We usually distinguish between *instantaneous throughput*, describing the throughput at a certain point in time, and *average throughput*, which describes the overall speed of the link.

If data passes through multiple communication links, all of differing bandwidths (aka, speeds), then assuming the communication is between just two devices, the average throughput is the *slowest* of the links, as all other links will have to either slow down to its speed, or buffers will be used.

## Breaking Protocol

Networks thrive on **protocols**. You've likely heard of quite a few, including IP, IMAP, FTP or IPoAC. A protocol, is essentially a set of rules to describe how to communicate, given a certain context. Many a computing teacher will draw parallels between protocols and two people talking to each other: we people like to greet each other, then request and exchange information. Computers do the same thing. Neurotypical people are way too obsessed with these "social cues" they keep coming up with, if you ask me.

## Switching things up

**Packet Switching** describes the flow of packets over the internet. When a packet reaches a router, that router needs to decide which one of its fellow routers or recipients it should pass this packet to. It makes this decision based on what devices are busy, what links are not being used, and how fast they are. More detail on this is given later on.

This is in contrast to **Circuit Switching**, where each endpoint essentially has its own communication link. A circuit consists of all such links and endpoints. This is how *dial-up* works: your computer dials a phone number that connects you to the ISP, and then agrees with the ISP how they will communicate as you enter the internet, when it was actually fun. Unlike packet switching, if a link somewhere fails, the session is forced to terminate.

> **Side tangent:** Imho, dial-up is an interesting technology, it uses practically ancient systems to perform a new, cutting-edge function that the world has never seen before. If you're interested to see how the technology works, and what those infamous screeching sounds mean, have a look at [this video here](https://www.youtube.com/watch?v=VaWpi9o_hHI). You might recognise some of this module's content in it.

### Switch 1 or Switch 2?

Packet switching uses an interconnected network of resources in the most efficient way it can, ensuring optimal utilisation, at the expense of transmitting data at a variable rate. Circuit switching is able to maintain a constant transmission rate, but relies on a single set of links, else the transmission has to terminate. Plus it would lead to a huge phone bill. 

## Lay it on thick

Packets are **layered**, meaning different types of information are stored on top of the original data, and each protocol is considered separately during transmission. Each layer uses the services of the layer below, and server the layer above it. Internet Protocol is split into five layers:

- **Application** - Information generated by the web app, e.g. a browser.
- **Transport** - Splitting of data into packets. Handled by TCP or UDP.
- **Network** - Add sender and receiver IP addresses. Handled by IP.
- **Link** - Add sender and receiver MAC addresses, e.g. WiFi or Ethernet.
- **Physical** - How to send all of the information over a given medium, such as fibre optic or coaxial.

This creates a separation of concerns, massively simplifying the process of developing network applications, or improving on existing protocols.