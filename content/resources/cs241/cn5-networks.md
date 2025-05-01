+++
title = "CN5 - The Network Layer"
+++

The internet, really, is just a bunch of computers either gracefully handing each other packets, or chucking them into their faces. Thank god UPS ddn't make the internet else we'd be in trouble.

We know that the network layer is responsible for holding the sender and recipient IP addresses, as well as some packet metadata. The source adds the IP data, routers then use this information to decide who to pass packets around, and then the destination will unpack the data to either pass through a local network (via the transport layer), or pass it to an application. We are now focussing on the routers.

## A router world, a router world

And repeat that about another 140 times...

Routers have two main functions: forwarding packets towards their destination, and routing, which refers to the creation of a routing table.

### Put the numbers on the table

We'll assume you've seen an IP address before. If it was your own, on twitter, I'm sorry. But maybe you should consider a JRPG next time you want to engage in turn-based combat.

There are about 4 billion ($2^{32}$) IP addresses out there, so it doesn't make a lot of sense to store every single record to map each connection link. As such, routers use routing tables which map addresses by *range*, like this:

|Destination Address Range|Link Interface|
|-------------------------|--------------|
|**1100110011 00001100 00010000** 00000000 to 01111111|0|
|**1100110011 00001100 00010**000 00000000 to 100 11111111|1|
|Otherwise|2|

Some ranges may overlap. If this is the case, **the one with the longest prefix is preferred**. This means, the entry with the lower range is likely to be more accurate, and so should be preferred for faster transmission.

## Subnetted and readable

The internet is also made up of lots of smaller networks, called **subnets**. If two computers are in the same subnet, then they share a common prefix, which is called a **subnet mask**, which is often a setting you may have seen when tinkering around with a WiFi connection on your computer or Nintendo DS (I always wondered what that meant...). Each IP address is provided with its subnet mask, using the CIDR notation (Classless Inter-Domain Routing), which looks like: A.B.C.D/x, where the X is the length of the subnet mask in bits. This can then be used by a sender to check if the recipient of a packet lies on the same network as them. If so, use ARP to find the MAC address of the recipient, create a link layer on the packet and transmit it to them. But what if the destination is on a different subnet? Then the sender passes the packet to its **default gateway**, which, well, acts as a gate between subnets.

Now comes the question of how to give a device an IP address. First, the default gateway and subnet mask need to be specified. Then, it can be *statically* set by an administrator, or **Dynamic Host Configuration Protocol** (DHCP) can be used, in which case, the router (or gateway), assigns one to the device. Then, for a network within the internet, the subnet mask is determined by the ISP and its address space. The global authority ICANN then decides what address space ISPs can have. This is why, generally, IPs are split based on geographic location.

## We're gonna need a bigger boat

Fun fact, we have billions of internet-connected devices, more and more thanks to IoT, so we're running out of IP addresses to assign. The solution then, is to use both **public and private IPs**. Public IPs are assigned to gateway routers, while all other devices are given a private IP address, alongside the public IP address which corresponds to the gateway. Private IPs are of the following form:

- 10.\_\_\_.\_\_\_.\_\_\_
- 172.16.\_\_\_.\_\_\_ to 172.31.\_\_\_.\_\_\_
- 192.168.\_\_\_.\_\_\_

If someone claims to have doxxed you with an IP address like this, you can very safely laugh at them. An internet packet with one of these IP addresses cannot be transported over the public internet, so packets with these addresses will be dropped if found on there.

There's a small problem here, however: a network packet can only store one set of public and private IP addresses. So how does a router keep track of each device on a private network? They use **network address translation** (NAT), which uses a NAT table that stores mappings of public destinations and private sources. When a private device sends data that needs to exit the private network, the router records the sender details and assigns a port number (which may differ from that of the request), as well as the destination address and port. Once a response is received by the router, it will use this field of the NAT table to return the response to the private device, over the port decided by the router.

This is a controversial method! Some network engineers believe that ports should refer to a type of process (e.g. HTTP or FTP), not hosts. They instead advocate for the use of IPv6, which uses 128 bit addresses instead of 32 bit addresses. IPv6 addresses are very ugly though, so Imma stick with NAT.

## Back to the routing

Routers follow one of a few different routing protocols, and each of these uses a different routing algorithm which generates a routing table. There are two types of routing algorithms: Global, which covers the entire topology at each router, including transmission time between nodes, and Local, where the router is only aware of information pertaining to their local neighbourhood of devices.

- Global algorithms can use all of the information about a network to determine distance or transmission time, so these will use optimisation algorithms such as **Dijkstra's Algorithm**.
- Local algorithms will use optimisation algorithms that work on the basis of local information, so **Bellman-Ford** and similar algorithms are more suitable.

Okay, *now* I'm grabbing some coffee.