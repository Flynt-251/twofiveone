+++
title = "CN3 - Network Packets, ARP and SYN"
+++

As said before, packets are the lifeblood of networks: they split up the data into pieces that are treated atomically in transit, i.e. no packet is half-transferred. Packets, like ogres, have layers, as we've described as well. We've already discussed what's at the application level, but let's now look at what's in those three other layers: link, network and transport.

## Link Header

The link header stores useful information pertaining to the physical medium over which data is traveling, i.e. Ethernet or WiFi, for example. For simplicity, we'll only focus on Ethernet. A packet traveling over ethernet has a link header of only 14 bytes, and this is fixed, in the following structure:

```
 0         1
 0 3 7 B F 0 3 7 B F
+-------------------+
|     Dest. MAC     |
+---------+---------+
| D. MAC  | S. MAC  |
+---------+---------+
|     Src. MAC      |
+---------+---------+
|Protocol |
+---------+
```

Dest. MAC and Src. MAC are 48 bits (6 bytes) each, and refer to the recipient and senders' **Media Access Control (MAC) addresses** respectively. These are the two endpoints between which the packet is expected to travel, which may be two computers on the same local network. The protocol is 2 bytes, and essentially states the purpose of the packet. The most common value is `0x0800` for IPv4, but the value `0x0806` is used frequently for ARP? What is ARP? We're about to answer that now.

### Big MACs with extra ARP

A **MAC Address** is an ID assigned to a network interface, such as a WiFi card or NIC. Its purpose is to uniquely identify each device on a local network, along with its local IP Address. When a packet is sent over a network, the source and destination IP addresses remain the same throughout transportation, but the MAC address pairs remain unique between "hops" on a network.

Let's say we have a network with multiple routers, and one of these routers needs to send a packet to a device only connected on the other router, as specified in its destination MAC and IP addresses. We can safely assume that this router knows that the destination is on the other router, but how does this router know the MAC address of the other?

This is where **Address Resolution Protocol**, or ARP, comes into play. If a network device wants to interact with a certain device given its IP, it will send out a **request packet** to all devices connected to it, consisting of just the link layer, and an ARP message, which essentially says *"I'm looking for 12.34.56.78, to anyone who knows them, let me know at 11.22.33.44."*. No Destination MAC is defined in the link layer, as the device doesn't know what destination to look for. Usually it sets the destination as `FF.FF.FF.FF.FF.FF`.

Then, the device with IP address 12.34.56.78 responds, with an **ARP reply** of similar structure to a request, saying *"Yes, that's me! My MAC Address is `CC.00.FF.FF.EE.EE`"*. Here, the source and destination MAC addresses are set correctly. Once the original device hears back, it will store the mapping in its cache, so that it knows to direct traffic with the relevant IP address, to that MAC address.

Unfortunately though, this can go wrong. A device does not have to have first sent an ARP request to accept an ARP reply, since IP addresses can change via DHCP, which means that an attacker could fabricate ARP packets to ensure that devices map all IP addresses to one particular MAC address. This is called **ARP cache poisoning**. Usually a large number of unsolicited ARP replies is a good indication that such an attack is happening.

## Network Header

The network header contains the IP addresses of the source and destination devices, metadata about the packet, and data about the protocol of this packet. The full contents is listed below:

```
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|Version|  IHL  |Type of Service|          Total Length         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|         Identification        |Flags|      Fragment Offset    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Time to Live |    Protocol   |         Header Checksum       |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                       Source Address                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Destination Address                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

> Source: <https://datatracker.ietf.org/doc/html/rfc791>

The field `IHL` is a 4-bit value which states the length of the rest of the header, as this is dynamically sized, in multiples of 32 bits (4 bytes).

## Transport Header

The transport layer contains the source and destination ports (16 bits each) and TCP connection information, such as the SYN flag.

```
0                   1                   2                   3
0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          Source Port          |       Destination Port        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Sequence Number                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Acknowledgment Number                      |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  Data |           |U|A|P|R|S|F|                               |
| Offset| Reserved  |R|C|S|S|Y|I|            Window             |
|       |           |G|K|H|T|N|N|                               |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|           Checksum            |         Urgent Pointer        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                    Options                    |    Padding    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                             data                              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

> Source: <https://datatracker.ietf.org/doc/html/rfc793>

Again, this header is dynamically sized, so the offset value dictates the length, in multiples of 32 bits again. There are also six 1-bit flags which define the packet's purpose: URG, ACK, PSH, RST, SYN and FIN. I think I remember two of those...

### Seeing SYNs

We already discussed that, on a TCP connection, a client will send a SYN packet to attract a server's attention (so to speak). The server then responds with a SYN-ACK packet, then the client comes back with an ACK packet and so on. When a SYN packet is received, the server will open a connection, waiting for an acknowledgement from the client. This is exploitable, since if an attacker were to flood a server with SYN packets, the server would open hundreds of connections, leading to denial-of-service. This is a **SYN Attack**.