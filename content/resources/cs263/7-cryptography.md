+++
title = "7 - Cryptography and Hashing"
+++

Cryptography plays a major role in cybersecurity, or rather, security as a whole. It's what lets us keep confidential information hidden to prying eyes, verify the integrity of files we download off the internet, and send messages to one another without the fear of having your darkest, deepest secrets being shared with anyone else. Unless someone happens to look at your phone over your shoulder, but if that happens while you're home alone, you've got bigger things to worry about.

## Word Smoothie

A **Substitution Cipher** maps every symbol in **plaintext** to one **ciphertext** symbol. A common type of substitution cipher is **Caeser cipher**, where we "shift" the alphabet by a certain number of characters to encrypt a message.

```
Shift: 3 characters right.
Plaintext: ABCDEFGHIJKLMNOPQRSTUVWXYZ
Cipher:    DEFGHIJKLMNOPQRSTUVWXYZABC
```

```
Plaintext:  The quick brown fox jumps over the lazy dog.
Ciphertext: Wkh txlfn eurzq ira mxpsv ryhu wkh odcb grj.
```

A **Transposition Cipher** swaps around the order of characters, such that the process can be reversed to give the original plaintext. **Rail Fence Ciphers** are an example of this, where we place the plaintext over a set of "rail", and read the result from top to bottom. To decrypt, we place each "portion" over a set of rails and read the text left-to-right.

```
Plaintext:  The quick brown fox jumps over the lazy dog.

Use 3 rails:
T...u...b...n...j...s...r...l...d..
.h.q.i.k.r.w.f.x.u.p.o.e.t.e.a.y.o.
..e...c...o...o...m...v...h...z...g

Ciphertext: Tubnjsrld hqikrwfxupoeteayo ecoomvhzg.
```

These are both **private/symmetric key encryption algorithms**, which require the same key for both encryption and decryption. This means both parties need to agree on the same key before transmission.

Now, these ciphers aren't particularly secure. Substitution ciphers are vulnerable to *frequency attacks*, and transposition ciphers are weak, since their length can determine a discrete number of permutations, making them relatively quick to bruteforce. However, modern ciphers today use a mix of substitution and transposition to secure information. These relate to the core ideas of **confusion**, where we obfuscate the relationship between ciphertext and its key, and **diffusion**, where we spread changes across the ciphertext, obfuscating the relationship between the plaintext and ciphertext. Now let's look at some *real* cryptography.

## Blocks and Streams

Now enter the **Feistel Cipher Structure**, where plaintext is encrypted through multiple rounds of encryption steps, first splitting the plaintext into two parts:

- Apply a function F to the right half, with the *subkey* (portion of the key).
- Apply a substitution function to the left half, additionally using the output of F.
- Swap around the two halves and pass them to the next round of encryption.

Until we then combine the two halves again. The funny thing about this cipher structure is, *it's reversible*, as in, we can put the ciphertext back into the function again, and get the plaintext out. And, this uses both substitution and diffusion to make this all the harder to crack. As such then, this structure is the basis of **Data Encryption Standard (DES)**, and **Advanced Encryption Standard (AES)**, the latter of which is still used to this day!

But something's missing. AES and DES are **block ciphers**, which means they split the plaintext into equal-sized blocks, add padding as needed, run each block though the cipher, then re-combine the blocks. This is why DES is described as a *64-bit cipher*, and AES uses blocks of 128 bits, as their versions of the Feistel Cipher Structure use 64 and 128 bits respectively.

Then, we have different ways we can re-combine blocks, the simplest being **Electronic Codebook (ECB)**, where all blocks are kept in-place and are en/decrypted independently, but this method isn't secure, as the same block is encrypted the same way, so we could theoretically create a mapping function for sets of characters. Instead, **CBC mode** is far more secure, as for each block $C_i$, the output of block $C_{i-1}$ is combined with this one using XOR before it is en/decrypted, where we define $C_0$ as an *inital vector*, that can't be easily guessed. This time, the ciphertext is dependent on all blocks, and changes are further diffused.

There are many more *modes of operation* for combining blocks, some of which are combined for confidentiality and authentication.

This is all in contrast to **Stream Ciphers**, where the plaintext is encrypted on a per-character level. Examples of these include **synchronous stream ciphers**, and **one-time pad**, the latter of which uses a random key unique to each communication, and XOR's this with the plaintext (XOR is reversible, FYI). This is incredibly secure, but completely impractical.

## Here's the key to my place

**Public key/Asymmetric encryption** use two separate keys: a public key, used for encryption, and a private key, used for decryption. This means we can let anyone send messages to us, in secret, without exposing a key that gives anyone the ability to decrypt messages. We can also use public-key encryption to create digital signatures to verify the integrity of messages, by hashing a message, encrypting with the private key, and having our recipient decrypt and verify this hash. Public key encryption is the basis of the **RSA cryptosystem**. Here's how RSA works, each user creates their own pair of public and private keys as such:

- Use a *good* pseudorandom number generator to create two very large prime numbers, $p$ and $q$.
- Calculate $n = p \times q$, and *Euler's Totient*, $\phi(n) = (p-1)(q-1)$
- Choose a random public key $e$, such that $1 < e < \phi(n)$ and $\gcd(e, \phi(n)) = 1$
  - I.e., the greatest common factor between the key and $\phi(n)$ is 1.
- Create the private key $d$, such that $e d \equiv 1 (\text{mod } \phi(n))$

The public key is $\{e, n\}$ and the private key is $\{d,n\}$. To then use this key pair...

- To encrypt a message $M$ with $\{e, n\}$, compute $C = M^{e} \text{ mod } n$.
  - Note: $0 \leq M < n$
- To decrypt a cipher $C$ with $\{d, n\}$, compute $M = C^{d} \text{ mod } n$.

### Qubits have entered the chat

Quantum computers are capable of rendering asymmetric encryption completely useless, so in 2016, NIST launched the *post-quantum cryptography (PQC)* standardisation project, and this has resulted in a few quantum-proof algorithms: CRYSTALS-Kyberg, FALCON and SPHINCS+.

### Wait a minute... who are you?

**Diffie-Hellman** protocol allows two parties to create a shared secret key, by doing the following. I'm sick of seeing "Alice" and "Bob" for every example, so how about we shake it up and use "Flynt" and "Clyde" this time?

- Flynt and Clyde agree on two numbers:
  - A prime, $p$,
  - And $g < p$, which is a primitive root (basically meaning, if we take the modulo $g$ of $p$ repeatedly, we get a shuffled sequence of $1,...,g-1$)
- Flynt uses his private key $f$ to create $F = g ^ f \text{ mod } p$.
- Clyde does the same on his private key $c$, to create $C = g ^ c \text{ mod } p$.
- Flynt sends Clyde $F$, and Clyde sends Flynt $C$.
- Flynt creates the shared key by computing $s = C ^ f \text{ mod } p$.
- Clyde creates the same key, by computing $s = F ^ c \text{ mod } p$.

So the only publicly known information is $p$, $g$, $F$ and $C$, and neither Flynt nor Clyde share their private keys, so this is fine, right? Not really. Diffie-Hellmann is vulnerable to a **man-in-the-middle attack**. Let's say we have adversary "Dutch", who's intercepting the communications between Flynt and Clyde. Then Dutch is able to pretend to be either Flynt or Clyde, and instead of sending $F$ or $C$, they send $D$, hence creating secret keys between both parties. Dutch can then snoop in on Flynt and Clyde's interactions! Dutch can also perform **replay attacks**, by copying and re-sending messages between the two parties.

### Time to get the KDC involved

And by KDC, I mean key distribution centre. **Needham-Schroeder** protocol is another key-exchange protocol that relies on the use of a key distribution centre, $A$. Here, we'll represent Flynt and Clyde as $F$ and $C$, and use $K_F$, $K_C$ and $K_{FC}$ to represent Flynt and Clyde's symmetric keys, as well as their shared key generated by $A$. Flynt and Clyde also make their own random values $N_F$ and $N_C$.

- $F \rightarrow A: F,C,N_F$
  - Flynt: *I want to talk to Clyde.*
- $A \rightarrow F: \{N_F, C, K_{FC}\{K_{FC}, F\}\_{K_C}\}\_{K_F}$
  - KDC: *Sure, here's a key you can use. Send him this message first.*
- $F \rightarrow C: \{K_{FC}, F\}_{K_C}$
  - Flynt: *Hey Clyde! Let's talk!*
- $C \rightarrow F: \{N_C\}\_{K\_{FC}}$
  - Clyde: *Hang on a minute. Are you really Flynt? Prove it by giving me this number minus one.*
- $F \rightarrow C: \{N_C - 1\}\_{K\_{FC}}$
  - Flynt: *Of course I am. Here, I've subtracted one.*

However, if Dutch continued to be pesky, he could intercept Flynt's attempt to talk to Clyde, and we have another man-in-the-middle attack. Fortunately, we can fix this by using a timestamp $\mathbb{T}$:

- $F \rightarrow A: F,C,N_F$
  - Flynt: *I want to talk to Clyde.*
- $A \rightarrow F: \{N_F, C, K_{FC}\{K_{FC}, F, \mathbb{T}\}\_{K_C}, \mathbb{T}\}_{K_F}$
  - KDC: *Sure, here's a key you can use. Send him this message first, and make sure he responds in a timely manner!*
- $F \rightarrow C: \{K_{FC}, F, \mathbb{T}\}_{K_C}$
  - Flynt: *Hey Clyde! Let's talk!*
- $C \rightarrow F: \{N_C\}\_{K_{FC}}$
  - Clyde: *Hang on a minute. Are you really Flynt? Prove it by giving me this number minus one.*
- $F \rightarrow C: \{N_C - 1\}\_{K_{FC}}$
  - Flynt: *Of course I am. Here, I've subtracted one.*

And what if Dutch tries to be sneaky this time?

- $F \rightarrow A: F,C,N_F$
  - Flynt: *I want to talk to Clyde.*
- $A \rightarrow F: \{N_F, C, K_{FC}\{K_{FC}, F, \mathbb{T}\}\_{K_C}, \mathbb{T}\}_{K_F}$
  - KDC: *Sure, here's a key you can use. Send him this message first, and make sure he responds in a timely manner!*
- $F \rightarrow D: \{K_{FC}, F, \mathbb{T}\}_{K_C}$
  - Flynt: *Hey Clyde! Let's talk!*
- $D \rightarrow C: \{K_{FC}, F, \mathbb{T}\}_{K_C}$
  - Dutch: *Whoops! I wasn't meant to get this message, but I'll just pass it along... Definitely not keeping tabs on this.*
- $C \rightarrow D: \times$
  - Clyde: *Hey, you're not Flynt!*

## I could go for some hash browns right now...

**Hashing** is the act of taking plaintext data, and irreversibly converting it into a **message digest**. It's intended to create a representation of the plaintext, so that we can send this hash alongside the plaintext, and have the recipient verify the *integrity* of the data and compare this hash with their own attempt to hash the plaintext.

Hashes typically use **Merkle-Damgård iteration** to create a hash, by splitting the plaintext into fixed blocks, and feeding each block into a *compression function* alongside the digest of the previous block, defining an inital vector, like seen in CBC block arrangements for symmetric encryption.

A hash function should...

- Be applicable to a message of any size
- Produce a fixed-length output
- Be easily computable
- Not be reversible, i.e. no way to get $X$ given $H = h(X)$.
- Feature minimal, if not zero collisions, meaning it's infeasible to find $X, Y$ such that $h(X) = h(Y)$.

### Wait, this isn't a Media Access Control address!

A **Message Authentication Code (MAC)** is sometimes referred to as a *keyed hash*, as it creates a digest of data, additionally using a shared key between parties. In addition to ensuring integrity, MAC also confirms that a message has in fact been sent by the correct sender, providing authentication as well. This isn't the same thing as a digital signature, which instead uses asymmetric encryption. Currently, three types of MAC are used: HMAC, KMAC and CMAC.

### THIS. SENTENCE. IS FALSE.

*Also the birthday cake is a lie.*

Now let's talk about birthdays. I swear this is relevant. Let's say you're in a room with lots of other people (scary, I know, bear with me here), what's the smallest number of people you can have in the room, such that there's at least a 50% chance that you share a birthday with at least one other person? 365? 183? No, it's 253. Let me explain.

First let's say we select one person, the chance they *don't* share a birthday with you is $\frac{364}{365}$, get another person and the chance that *neither* of these people is $(\frac{364}{365})^2$, which is smaller. So, there must be some $n$ where $(\frac{364}{365})^n > 0.5$, and $(\frac{364}{365})^{n+1} \leq 0.5$, and indeed there is! Try plotting $(\frac{364}{365})^n$ on a graph, and see what you get. We notice that our magic $n+1$ is in fact 253. This is the **birthday paradox**, since the answer is not what we would intuitively think it is.

So how does this link back to hashing? Well, suppose we have a hash of some data consisting of $n$ bits, then there are $2^n$ possible values, and a potentially smaller set of hashes. The possibility that there's another piece of data that has the same hash is $\frac{2^n - 1}{2^n}$. So, a similar case applies here as to the birthday paradox, so draw out another graph, and you'll find that once we hit a proportion of 69% (nice) of all of the values, at least two of them will share a hash, which is known as a **hash conflict**. As a result then, we can say that a hash function is **collision resistant**, if we need to make at least $2^{\frac{n}{2}}$ attempts before a collision between two values is found.

### And finish with salt and pepper to taste.

We use hashes a lot to store passwords: that way, we're not storing the password itself, and if we design our interfaces well, it's generally impossible to log in if we just have the hash. However, what if an attacker got ahold of a database of users? Then, they could compare each row's password hash against a list of the hashes of the most common passwords, and potentially compromise thousands of accounts. This is where we "season" our hash with salt and pepper.

**Salt** is an additional value added to the end of a password before it's hashed. This way, the same password can generate two completely different hashes for different users. This alone makes it practically infeasible for an attacker to crack a long database of passwords. However, it's still possible to crack some of the passwords. How can we make an attacker's life even harder?

Simple, we also add **pepper**, where we add an additional layer of protection that's needed *alongside* the database in order to verify a password, such as using an encryption key to either encrypt or create a HMAC of the hashed password. Now the attacker can't do anything if they don't also obtain this key, *which we should keep in a location that's not the database*!