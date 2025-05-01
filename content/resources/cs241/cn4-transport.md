+++
title = "CN4 - The Transport Layer"
+++

We've covered the link layer's role of identifying devices in hops during a transmission, and we've briefly touched up on the transport layer's role, but there are some details that, up to this point, we've glossed over. Now we go into the detail of how the transport layer works, and how data is sent over the internet.

## UDP and chucking packages into windows

Recall the analogy we made between TCP and UDP. While TCP tries to ensure a stable connection, UDP does the digital equivalent of throwing packages at someone's door to deliver them. Will they miss sometimes? Yes, but they don't case.

**User Datagram Protocol** provides the bare minimum services of splitting data into packets, and sending them through to the network layer. If a packet gets lost or corrupted during transit, no effort is made to re-send or recover the data. A device using UDP may also send packets at whatever rate it wishes, regardless of any congestion on the network. |

Of course, the natural question is *"Why?"*, and surprisingly, it's not because of low pay rates. Wait no, not the UPS guy, the UDP. I'm getting myself confused. UDP is useful where losses don't matter, namely streaming, VoIP (voice over internet protocol), discord calls, etc. That's why sometimes one of your friends may say "▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊▊" on a call, because either some packets got corrupted, or went missing.

## TCP and doing things properly

The rest of this page talks about TCP, Transmission Control Protocol. TCP, unlike UDP, takes measures to ensure a reliable transfer of data, flow control and congestion control. || This is more useful for data where losses are significant, such as text data or file transfers. Even under these conditions, packets may still get lost, corrupted or brought out of order, so TCP also has measures to re-send such packets.

- **Checksums** - Numerical value derived from the rest of the data, which is re-calculated on receipt. If there is a mismatch, the packet has corrupted.
- **Acknowledgements** - Informing the sender that packets have been received.
- **Timeouts** - Work with ACKs. If no ACK is received after a certain amount of time, take a new course of action.
- **Retransmission** - Re-send any packets not received, using **Automatic Repeat Request** (ARQ).
- **Sequence Number** - Retain the correct order of packets, regardless of order of arrival.

> Quick note, any time the term **"RTT"** is used, this is referring to Round Trip Time, i.e. how long it takes for a packet to send successfully, factoring time to send the data, and to receive acknowledgement.

## Stop and Wait ARQ

We'll show this using our old friend Pseudo-C.

```c
/* send_to_host() will give 0 if an ACK is received,
 * otherwise return -1 if timeout is reached.
|/ */

int send(struct* packets) {
    int i = 0;
    int timeout;
    while (i < packets->count) {
        timeout = send_to_host(packets->data[i]);
        if (timeout) {
            i = 0;
        }
    }
}
```

So in essence, if a packet is lost at any time, the sender will start from the beginning of the message. While this is reliable, it's not very efficient. We can calculate utilisation using the following equation:

$U = \frac{L/R}{RTT + L/R} = \frac{L}{R \cdot RTT + L}$

Recall that $L$ and $R$ refer to packet length and network speed respectively. Assuming we have a gigabit connection (10^9 bps), packet size of 10Kb (10,000 bits), and RTT of 20ms, then we get $U = 0.0005$ for sending one bit. Wow, that's very inefficient.

## What are these bits in the pipes?

It of course makes sense to continue sending more data as we wait for the acknowledgement from the server, to improve utilisation. This is a form of **pipelining**. Specifically, we can send, in addition to $L$, $RTT \times R$ bits, otherwise known as the **delay-bandwidth product**. Of course, we need to bear in mind that the server can only handle so much additional information in a buffer of size $B$, before it starts disregarding it due to lack of space. So, the maximum amount of additional data we can send while waiting for acknowledgement is:

$\min (B, L + R \cdot RTT)$

Where $L + R \cdot RTT$ is the length of the pipeline. For anything above this, information may be lost unnecessarily.

## Go-Back-N get your jacket

Now we've improved efficiency on the sender side of things, let's have a look at what the recipient is doing. When it receives a packet $n$, and packets in ascending sequence order of what is expected, then it will send the ACK($n$) of said packets, or the **cumulative ACK**, which essentially states *"I've got everything up to this point."*. It will also increment the number for the next expected sequence number. And if the receiver gets a packet with the wrong sequence number, it will discard it and (re-)send an acknowledgement for the last packet it received (expected - 1).

In practice, this means that if packet $n$ gets lost, the recipient will start receiving packets it's not expecting, causing them to be discarded, and the transmission goes back to re-sending the lost packet and onwards. Again, this is still reliable, but now it's quite wasteful, as depending on the delay-bandwidth product, if a packet is lost, all of the subsequent packets we send are now useless. Wouldn't it be better if the recipient held onto these instead?

## Can you say that again?

**Selective Repeat** fixes the problem of **Go-Back-N**, in that the recipient will store packets, even if the sequence number is different to what's expected. This is achieved using a **receive window**, which is essentially an array which can store a subset of packets in-sequence. To handle out-of-order receipt, such as in the occurence of loss, the recipient will still give the acknowledgement of any packets in the receive window, and the sender will keep a timer for the acknowledgement of all of the packets it has sent. If this timer expires for a packet, that packet is then re-sent.

## Phasing out of the conversation

The difference between GBN and SR is like the difference between saying *"Can you start from the beginning?"*, and *"What was that bit you said about $n$ again?"*, after you've dropped out of the conversation for the 20th time because your attention span is getting outpaced by your local goldfish. TCP will use a combination of techniques described in both methods, in that it uses cumulative ACKs, and it ensures that in the event of retransmission, only a relevant *segment* of data is resent, not all data after a loss. Remember the Sequence and Acknowledgement properties in the transport layer? |_

The sequence number of a TCP packet (in the transport layer) refers to the number of the first byte of a segment. After receiving a sequence of bytes then, the recipient then sends an acknowledgement of the next expected sequence number. Again, this is cumulative.

## The other quirks of TCP

TCP packets can serve as both a data and acknowledgement packet, by appending acknowledgements onto data packets. This is useful, as data may be flowing in both directions on a TCP connection. For instance, the sender may be sending data to the recipient, as the recipient streams back a response: both parties can acknowledge each other's data while also sending their own.

If a retransmission occurs, this is straightforward. Once the sender times out, it will send the first segment that did not get acknowledged, and the recipient will (re-)send its acknowledgement. This may also occur if the recipient's acknowledgement arrives *after* the timeout expires. Let's say the recipient sends two ACKs, but the first it sends gets lost. This is fine, as ACKs are cumulative, so if the recipient successfully sends the second ACK, it must have also tried to send the first ACK, so there's no need to re-transmit.

Now if a data packet is lost, and the sender continues to send additional data, then the recipient will give duplicate ACKs for the missing data, which of course the sender will re-send. However, duplicate ACKs are useful as they are an indicator of packet loss, and timeouts tend to be quite long (think about how long it takes for a typical "Timeout" message to appear on your browser). When a sender gets three duplicate ACKs, it will perform a **TCP fast retransmit**, where it sends the missing segment, and does not wait for a timeout.

## Flow (of) Networks

Wait no, wrong module [insert 1000-yard stare here]

We mentioned previously that network devices have buffers in which they can store packets they're yet to process. These are of course *finite*, so there comes a point where they will disregard any more incoming packets. So, *flow control* tries to minimise the amount of potential loss, by ensuring that data is sent at a rate that the recipient can best handle.

In the network layer of our packet model, there is a data field titled "receive window". The recipient uses this to state how much space is available in its buffer, which the sender can then use to limit [how much data](#what-are-these-bits-in-the-pipes) it sends without waiting for an acknowledgement.

## Preventing Traffic Accidents

Oh boy, better put in another thousand-yard stare right here.

If there is a lot off internet traffic across a network, this can overload devices and cause data loss $\frac{| | ||}{|| |-}$. This is called **congestion**, and TCP has features which try to prevent it.

### Identifying the cause

The leading cause of congestion is smoking. Wait no, well actually yes, but in a different context.

Mainly congestion occurs when the rate of data coming into a node, is greater than its output rate. This could happen, for example, if a router has two incoming connections, and only one outward link. Senders of data are responsible for reducing their rate to reduce congestion. Such congestion then causes more packet loss, and longer delays: as transmission rates of other links increase, the average delay can increase exponentially (eek!). As such, we should create a solution to not only prevent this from happening, but also ensures that all devices get a fair share of resources.

### Identify, Determine, Evalaute, Record, Update

Congestion can be detected either by timeouts or duplicate ACKs, with the former being treated more seriously.

We've already established that, using the receive window, transmission rate is determined by window size ($W$), as well as $RTT$. We show this with the expression $\frac{W}{RTT}$. Furthermore, we can control the maximum allowed size of a TCP segment using the Maximum Segment Size (MSS), which is determined in the link layer, so the number of such segments we can transfer in a window is determined by $\lceil \frac{W}{MSS} \rceil$

So, we can define a window size based on a recipient's capabilities, so why not define a window size based on how overloaded the network is? Well, surprise surprise, TCP does exactly this too, using a **congestion window size** (CWND), which limits transmission rate to $\frac{W}{CWND}$. CWND can, understandably, vary based on congestion levels, but how is its value determined?

The value is determined by using **additive increase, multiplicative decrease** (AIMD, nothing to do with AI or Flynn's Taxonomy). All this means is, on every Round Time Trip, increase the CWND by the maximum segment size (so transmit one more segment), and if a loss occurs, reduce CWND to half. AIMD is used over other strategies, as it is generally the most fair, as it allows even distribution of transmission rate across multiple devices, and by design, it will allow the transmission rate to converge to the ideal speed without risking data loss. This is fine, but it can start quite slow. This is by design, TCP will have a **slow start**, and the permitted window size will be increased exponentially up until a certain threshold (ssthresh), where AIMD will take over. This creates a balance between speed and reliability.

Nevertheless, we can't guarantee that losses will never occur, so here's what happens when they do:
- If a timeout occurs while waiting for acknowledgement, take drastic measures.
  - Set ssthresh to half the congestion window size.
  - Set the congestion window size to the max. segment size.
  - Go back to the slow start phase.
- If three duplicate acknowledgements were sent, take lenient measures.
  - Set ssthresh to half the congestion window size.
  - Set the congestion window size to half its current size.
  - Let the window size grow linearly (i.e. keep going with AIMD).
  
That was a lot of writing. I'd better transport myself to the coffee shop real quick.