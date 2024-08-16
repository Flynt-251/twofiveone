+++
title = "A-Level Project: FileShare"
description = "A file sharing and cloud storage application suite written in Python"
+++

**Note:** This project does not have a repository, as it was submitted for assessed coursework.

FileShare is the name of my A-Level NEA project, which is a suite of five application, consisting of client and server setup programs, server runtime, client application, and a server management tool. It is complete with user authentication, encryption, digital signing and hashing to ensure security.

## How the suite works

First, the server setup is ran, which will outline some basic parameters, including the server's name, IP address, port, and maximum user count. After this, additional settings can be configured using the server management application, such as setting a user agreement, listing blacklisted file extensions, etc. The server runtime will open a socket at the chosen port, and listen for client requests, outputting a log of connections to both a command line, and a text file.

End users then run the client setup on their own devices, while the server is online. This allows the server to register the user, and for the client application to run. Once setup is complete, users can log in using the client application, and send/receive files to/from their cloud storage or other users registered on the server. A mailbox system is used for file transfers between two users, where users will receive a notification when they receive a file, and can either accept or reject the file. This outcome is sent to the sender's mailbox.

The server management tool allows administrators to not only view all user activity, but also filter it, and identify unusual behaviour, such as users attempting to send files that are blacklisted. Administrators can also select users and restrict, pause or delete their accounts. Restricting a user bars access from transferring files to other people, and pausing prevents access from services completely. 

## Network Communication

The server will respond to clients, under the assumption that clients will send requests in JSON format. If a client opens a connection and sends a request in a format that is not recognised, the server closes the connection automatically. Similarly, if the client sends a request type outside of an expected discrete set, the server will also close the connection. The server then responds with JSON to each request, typically to confirm the success or failure of an operation. All data is encrypted in transit using an XOR cipher.

## Tools Used

This project made use of Python 3.9, and the Socket, Tkinter, JSON and MySQL connector libraries. MySQL Community is used to store user account data, system logs, and users' mailboxes. The only development tool that was used was Visual Studio Code.