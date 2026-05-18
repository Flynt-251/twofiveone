+++
title="4 - Compression and How to spot Splicing"
+++

Bitmaps or TIFFs can be HUGE in terms of file size, so it makes sense we wanted to find a way to make them smaller, i.e. compress them in storage (to view an image we then need to decompress it). With lossy compression, namely JPEGs, this has the interesting side effect of allowing us to detect tampering of images, as the way in which the JPEG format works means traces of tampering are left behind. It's all a bit eerie...

## I don't need to see this!

So, what sorts of useless information can we get rid of in an image? A few things, actually, which we describe as different types of **redundancy**. An *encoder* performs the actions of removing this redundancy. A *decoder* will reverse these steps.

- **Spatial Redundancy** - Pixels of very similar colour to their neighbours, or sequences of repeating patterns. These can be grouped and shortened.
	- The encoder will use *Transform Mapping* to remove this redundancy.
- **Pyschovisual Redundancy** - Details that are invisible to the human eye. Humans SUCK at visual perception!
	- The encoder will use a *Quantiser* to remove this redundancy.
- **Coding Redundancy** - Using a higher storage rate per pixel than is necessary, such as storing a purely grayscale image in RGB format.
	- The encoder will use *Entropy Coding* to remove this redundancy.

## Do I look like I know what a JPEG is? I just want a picture of a got-dang hot dog!

*Well, by the end of this section, you will know!*

You've got no idea how long I've been waiting to make that reference. **JPEG** (Joint Photographic Experts Group) is a compressed image format that uses *lossy* compression. It compresses an image using five steps.

1. **Colour Space Conversion** - Convert the image from RGB to YCbCr format, performing chroma subsampling in the process. If any of that is unfamiliar, go back to chapter 1.
2. **Division into sub-images** - Break the image up into non-overlapping blocks, usually 8 by 8 or 16 by 16. Note that if we increase the block size, we perform more compression, and require more computation.
3. **Block-wise DCT mapping** - for each of the blocks we made, get its spectrum using DCT. This is usually done with an orthogonal DCT basis.
4. **Quantisation** - Quantize each coefficient $F(u,v)$ using a *quantisation matrix* $Q(u,v)$, which is equivalent to each block, and contains a value to divide each coefficient by. This loses some detail, hence the lossy compression.
	- $F\_Q(u,v) = \text{round}(\frac{F(u,v)}{Q(u,v)})$
	- What $Q$ looks like is determined by the JPEG quality level, a value between 1 and 100. 100 is the highest quality. This is important for later!
5. **Huffman Encoding** - Replace the encoding of each pixel, such that more common values have the shortest representation.
	- Example: Suppose $P(a) = 0.5$, $P(b) = 0.25$, $P(c) = 0.15$ and $P(d) = 0.1$. Then, we can represent each of these arbitrary values with the following codes:
		- a = 1
		- b = 01
		- c = 001
		- d = 000
	- This is based on the idea of **Entropy Coding**, which is a lossless compression technique, and is fundamental to data compression as a whole. *Shannon's source coding theorem* dictates that in any coding scheme, the average codeword length is at best equivalent to the source entropy, and no less.

Then to decompress, we of course do all of this in reverse! Notable at the quantisation step, we *de-quantise* using $\hat{F}(u,v) = F\_Q(u,v) \cdot Q(u,v)$.

With all of this information in mind, we'll now see how JPEGs can leave traces of two types of forgery: **Copy-Move forgery**, where part of an image is copied and moved over another part (nifty name, huh?), and **Image splicing**, where a different image is placed onto an image.

## Seeing Double

A JPEG is first stored in quality $q\_1$. In the case of a Copy-move forgery, it will be decompressed, then recompressed at quality $q\_2$, which may not be the same quality! Remember that the quantisation step of JPEG compression changes the DCT coefficients of the image, so with double compression, let's consider how the equation for quantisation changes.

$$
\begin{aligned}
& q\_a(u) = \lfloor \frac{u}a \rfloor \\\\
& q\_a(u)a = \lfloor \frac{u}a \rfloor a \text{, (Decompress)} \\\\
& \Rightarrow q\_{ab}(u) = \lfloor \lfloor \frac{u}a \rfloor a \rfloor
\end{aligned}
$$

Quantisation, by its very nature, *reduces the number of available values*. As such, when we perform compression twice, *we essentially reduce the bin count twice*. So, a doubly compressed JPEG will have periodic patterns where certain bins are unfilled. On a histogram, we can visualise this very easily, as there will be a regular pattern of empty values, or **Periodicity**.

## Boo!

*ghost_hands*

In a splicing forgery, two distinct images are involved, each with their own compression levels $q\_1$ and $q\_2$. Once combined, these are then compressed into the same image with the level $q\_3$. When we doubly compress an image using two different quality levels, such that $q\_1 < q\_2$, then the quantisation error increases with $q\_2$ (so, higher error at higher qualities). If these are the same, there's no error.

However, what happens when we compress an image three times over, with qualities $q\_1$, $q\_2$ and $q\_3$? Well, nothing interesting if they're all the same or all different, but if $q\_2 = q\_3$, the error between compressing before and after $q\_3$ is nothing, which makes sense. However, if $q\_1 = q\_3$, something interesting happens, there's a slight bit of error! What this means is, we can take an image we suspect to be forged, compress it multiple times to establish what $q\_1$ or $q\_2$ is, and try to identify if there's a region of the image that's compressed at another value, hence forming a **JPEG Ghost**. Spooky!

Mathematically, here's how we compute error at each pixel, at quality level $q$:

$$
d(x,y,q) = \frac13 \sum\_{i \in \{R,G,B\}} (f(x,y,i) - f\_q(x,y,i))^2
$$

We may wish to perform *local averaging normalisation*, using a region of $b \times b$ size to improve our difference measure.

$$
\delta(x,y,q) = \frac13 \sum\_{i \in \{R,G,B\}} \frac1{b^2} \sum^{b-1}\_{b\_x = 0} \sum^{b-1}\_{b\_y = 0} (f(x+b\_x,y+b\_y,i) - f\_q(x+b\_x,y+b\_y,i))^2
$$

... And then normaliseall thee pixels to have a value between 1 and 0 using min max normalisation.

$$
d(x,y,q) = \frac{\delta(x,y,q) - \text{min}\_q[\delta(x,y,q)]}{\text{max}\_q[\delta(x,y,q)] - \text{min}\_q[\delta(x,y,q)]}
$$

Did you see that 👀