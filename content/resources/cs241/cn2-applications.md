+++
title = "CN2 - The Application Layer"
+++ 

As a software developer, you'll be interfacing with the application layer most, if not all of the time, with some recognition as to the transport layer's services.

We've covered inter-process communication already, and we can indeed make process on separate computers talk, and we do this all the time. In fact, reading this web page, your computer has talked to another computer somewhere else in the world.

You need to consider both the client and the server side of the application you're making, even if it's a peer-to-peer application (ah, you silly little torrent enthusiast, you!), so you'll need to consider what information should be put into a request, how this information should be used, and then how a response should be constructed. Thankfully, most of that boring work has been done for you by protocols, such as SMTP or HTTP (which we will discuss shortly!).

## Plugging into the mainframe

Any network application you make will make use of **sockets**, which act as an API for internet transmission, and by extension, allow you to access the services provided by the transport layer. Both systems who are to communicate, will make their own socket, and *bind* it to an **IP address** and **port number**. Port numbers allow multiple sockets to be open at once, and a set of numbers corresponds to different protocols (e.g., HTTP uses port 80). The sender will establish who it wants to talk to, and then send data. The receiver will *listen* for a connection on its socket, until it finds one, by which point, transmission will occur.

## Transportation

Using a socket, you can specify how the transport layer should transport your data, and this is typically through one of two protocols: Transmission Control Protocol (TCP), or User Datagram Protocol (UDP). The difference between these can be described by comparing two (theoretical) postal van drivers. Both achieve the same function of delivering packages, but do it a bit differently. The TCP driver walks up to the recipient's door, and hands them their package when they answer the door. The UDP driver simply grabs the package while still in the van, and chucks it at the recipient's door. Hey, UDP sounds similar to UPS...

The key takeaway here is that **TCP ensures that a reliable connection is in place, using a *TCP Handshake***, whereas **UDP will send data without any regard for how stable or suitable the connection is**. You may of course ask, *well why the hell would you bother with UDP*? Well, it's faster than TCP as there's no overhead from doing a handshake. It's often used for voice/video chat software.

## How did we get here?

It's because of HTTP, or **HyperText Transfer Protocol**, which uses port 80, and TCP. HTTP works on the basis of sending and receiving requests and responses, where a web client will send an HTTP request and initiate a TCP socket, and the server will respond with an HTTP response, and then close the TCP socket.

### An Upgrade

There are four major versions of HTTP: 1.0, 1.1, 2 and 3. We'll ignore 2 and 3 for now (and I really don't want to talk about Web3). 1.1 introduced the concept of a **persistent connection**, as in HTTP 1.0, a single file would be sent per connection: after transmission, the connection would be closed. This becomes a problem when a single webpage has more than just a bit of text, i.e. images, styling, scripts, etc., as we have to deal with the TCP handshake overhead multiple times. This is Non-persistent. In contrast, HTTP 1.1 uses a persistent connection, where multiple files can be sent for one webpage, before the connection is closed.

### Acknowledgements go to...

In a TCP handshake, the following happens:

1. Client sends SYN packet
    - *"Hey, I want to talk to you."*
2. Server gets ACK, responds with SYN-ACK packet
    - *"Sure, what do you need right now?"*
3. Client sends an ACK, along with request data
    - *"Can you get me the notes about HTTP for CS241?"*
4. Server sends the response data
    - *"Sure, here they are..."*
    - **Persistent connection:** *"Here's the other files that go with this web page too."*
    - **Non-persistent connection:** *"Let me know if you need the other files for this web page too."*
5. Connection is closed
    - *"Thanks! Have a good one."*

And so, here we are. What have I come to, anthropomorphising HTTP...

### Inside the magic

HTTP requests describe what type the request is, and what data the client wants, alongside some other attributes, including information about the target device (user agent), language, connection settings, etc. Here's what it looks like:

```http
GET / HTTP/3
Host: twofiveone.xyz
User-Agent: Mozilla/5.0 (...) Gecko/20XXXXXX Firefox/137.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br, zstd
...
```

And then, the webserver corresponding to this beautiful website will come back with an HTTP response, which has some feedback about the request, and the requested data (HTML) below it.

```http
HTTP/3 200 
date: Sat, 26 Apr 2025 15:00:00 GMT
content-type: text/html; charset=utf-8
...
```

### Caching In

**Web caches** duplicate website data, so that it can be relayed to other systems much faster, and create less traffic. This is why it's so quick to access common websites such as Google, as this website is cached in so many locations. This is different from a **proxy**, which relays HTTP requests on the behalf of another device, or **DNS Server**, which seeks the IP address of a given URL, and doesn't actually fully fulfill the HTTP request.