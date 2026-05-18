+++
title="3 - Watermarking"
+++

One of the big questions we ask in digital forensics is *"is this data authentic?"* After all, if we can't trust a source of data, what use is it in an investigation? But also, if data is forged or tampered with, this by itself could be used as evidence. **Digital Watermarking** provides a solution which we can use to authenticate an image, where we embed some sort of *signature pattern* into the image, which forensics experts have access to. First, we'll discuss what kinds of watermark we can put into an image.

- **Blind Watermark** - A watermark that is independent to the image it is applied to. One that is not blind uses image data to create a signature.
- **Invisible Watermark** - I think you can figure this one out. Likewise for a visible one.
- **Private Watermark** - Only an authorised entity may detect a private watermark.
- **Robust Watermark** - Can survive intentional and unintentional changes
- **Semi-fragile Watermark** - Gets partially damaged in the case of unauthorised modification, while still being resistant to basic changes, like cropping, scaling or rotation.
- **Fragile Watermark** - Breaks when *any* tampering occurs.

These in turn have a few applications.

- **Proof of ownership** (Not blind, visible, public, robust) - You may have seen this with stock images or artists' works on social media. This not only proves who made the image, but also renders it useless to other people.
- **Copyright Identification** (Invisible, private, robust) - This is a hidden version of the above, using a watermark to prove ownership of an image. When the image is distributed, the original owner can prove their ownership by extracting the watermark.
- **Copy Detection** (Invisible, private) - The same media can be assigned different watermarks based on who or what it is distributed to. This makes each copy uniquely identifiable, so if it is copied illegitimately, the watermark can be extracted and tied back to a particular user or customer.
- **Tampering Detection** (Invisible, private, fragile) - Any modification to the image distorts the watermark, flagging unauthorised modification, hence verifying the image's integrity.

Generally speaking, the watermarking process consists of three components, the *Encoder*, *Decoder* and *Comparator*. The Encoder combines an image and signature to give a watermarked image, and the Decoder does the opposite, using an original and watermarked image to extract the signature. The Comparator can be used to compare signatures to verify correctness.

## Neeeeooooooowwn

*Get it? It's because, bit-PLANEs... okay fine let's move on.*

We've already established that each pixel on an image is represented using discrete values, or rather, a set number of bits. Well, the concept of a **bitplanes** involves the splitting of an image into monochrome sub-images, each representing a certain index of bit. For example, an 8-bit greyscale image would have eight bitplanes. The most significant bit (MSB) bitplane would give the main structure of the image, and as we go down to the lower bitplanes, this begins to descend into an almost random noise. We could use this information to insert a watermark, thus performing **Bitplane Substitution**.

So, how do we make a watermark? Well, you can just make your own monochrome image and use that, that would be a *content-independent watermark*, or you could extract data from the image and make a *content-dependent watermark*. The basic idea behind this is to select $N$ random pixel locations and use the seven most significant bits to create a watermark of size $7N$. We take the seven most significant bits as these won't change (assuming we use the LSB bitplane).

Of course, we then have to ask, *how do we choose what our embedding locations are?* Well we could just use specific bitplanes over the entire image, use bitplanes of specific regions of the image, or just create a random key which defines what random pixels to select.

If we wanted to be a little more sophisticated however, then we could choose pixels which are more tolerant to visual changes (in terms of human vision): this way, even if an image is subtly changed, this would massively affect the watermark. This usually consists of changes in the blue channel and the edges of an image. This does mean, however, that we need to keep track of which pixels and bitplanes we use.

Anyway, where we insert the watermark is important. If we insert it at the highest bitplane, i.e. the MSB bits, then we get a visible watermark (which also kinda distorts the original image in the process). Or, we can insert it at the LSB which makes it an invisible watermark. As you move between bitplanes, you descend a gradient between visible and invisible.

Bitplane Substitution is quick and easy to carry out, and very flexible, enabling us to create visible or invisible watermarks, blind or not blind, fragile or semi-fragile, and private or public.

## I don't think we're on the same frequency

*It takes a particular mind to really click with these notes (but I still hope they're useful!)*

So bitplane substitution is something performed in the *pixel domain*. What about applying watermarks in the *frequency domain*? Indeed, we can up our game by upgrading our encoder to transforming an image to its spectrum, apply a watermark to that, and then inverse-transforming the result.

DCT is our weapon of choice when we want to compress an image, as we can use it to get rid of imperceptible details while greatly reducing file size. This process of compression requires us to analyse the coefficients produced by DCT to see which frequencies are the most significant (i.e., what carries most of the image itself), in order to zero out anything insignificant. This will be important for a few frequency domain-based watermarking techniques.

### LSB substitution

This relies on DCT. Given a bitstream watermark, we apply this watermark to the LSB of the integer part of particular coefficients of the DCT spectrum, whichever may be desired (but maybe not the top-left one, which usually has the most information). This results in very slight visual variations.

### Spread Spectrum

Spread Spectrum (SS) watermarking creates slight variations in the $m$ most visually significant DCT coefficients stored in vector $\mathbf{h}$, using a watermark sequence $\mathbf{w}$ created using a Normal Distribution $\mathcal{N}(0,1)$ (Average 0, standard deviation 1). We generate $m$ random values, and multiply these with the coefficients such that...

$$
\mathbf{h}\_i^* = \mathbf{h}\_i(1 + \alpha \mathbf{w}\_i) \text{ where } 0 \leq \alpha \leq 1
$$

We then perform inverse DCT on the image with $\mathbf{h}^*$ most visually significant coefficients. The higher $\alpha$ is, the stronger the effect on the image. To then decode the image, we need to compare the watermarked image with the original, first getting their spectra, then inverting the application of the watermark.

$$
\hat{\mathbf{w}}\_i = \frac{\mathbf{(h\_i^* - \mathbf{h}\_i)}}{\alpha \mathbf{h}\_i}
$$

### DWT Watermarking

Recall that DWT transforms an image by taking record of its high-frequency components, then performing DWT on the low-frequency sub-image it creates. This captures the majority of the image's detail, so if we were to replace the lowest-frequency component with a watermark, this would cause minimal changes to the output image. As such, to apply a watermark given as matrix $\mathbf{W}$, we perform level 3 DWT, and add $\alpha \mathbf{W}$ to the L3 LL sub-image, where $\alpha$ is a relatively small image to create an invisible watermark. To decode, we subtract the original image's L3 LL sub-image from that of the watermarked image, making sure to divide by $\alpha$ to get the watermark.

### Hybrid Watermarking

As ever, we ask *why not both?* This method of watermarking combines spatial and frequency domain watermarking techniques.

The simplest approach is to divide an image into blocks, select blocks to watermark (and take note of them), take the DCT of those blocks, and embed the watermark in their spectra, either via LSB substitution or SS.

Another hybrid method also divides the image into blocks, take the DCT of each, and within each block, swap around coefficients of approximately equal value. To track this information, we create a watermark bitstream, which for each value, sets the following rule:

$$
|A(a,b)| \geq |A(c,d)| \rightarrow 0, \text{else } 1
$$

Wherever this rule does not hold for a pair of coefficients, swap them. In other terms, this bit sequence helps identify these differences between the original and watermarked images, and we construct it in decoding by finding supposedly swapped values between the watermarked and original images, then checking the above rule.

### Conclusion

Frequency Domain-based watermarks are generally more robust than spatial domain-based watermarks, being able to survive compression, detect attempted removal, and survive usage of low-pass filters. To compare watermarks using these methods, we use similarity checks, such as MSE, correlation coefficient, or SSIM. However, for spread spectrum, we use the following:

$$
\text{sim}(\hat{\mathbf{w}}, \mathbf{w}) = \frac{\hat{\mathbf{w}}\mathbf{w}^T}{\sqrt{\mathbf{\hat{w}\hat{w}}^T}}
$$

These watermarks can be damaged through a few kinds of attack: compression attacks, filtering attacks (low-pass filters) and jitter attacks. **Jitter Attacks** move the location of the embedded watermark, so that it cannot be recovered, by swapping, copying or deleting points at random. This is usually impossible to perceive.