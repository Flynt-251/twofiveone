+++
title="2 - Image Enhancement"
+++

Often in forensics applications, we need to find ways we can improve the quality of images taken because, not all cameras are perfect, and lighting is certainly never perfect, just ask any vlogger. Fortunately, there's a range of mathematical ways for us to improve illumination or contrast, get rid of noise or motion blur, or sharpen an image. Broadly speaking, there are two ways to achieve this: enhancement using the **Pixel Domain**, where we directly alter the pixel values, or enhancement using the **Frequency Domain**, where we use Fourier, Cosine or Wavelet functions to transform the image, revealing details we can tweak that would otherwise be very difficult. We can use the pixel domain to improve contrast and remove some noise, and the frequency domain to remove repeating patterns, noise and grids.

## And now in contrast...

We can use the pixel domain to improve an image's contrast. We first do this by getting the image's *histogram*, which basically means, identify all the pixel values, and plot their frequency on a bar-chart (which is basically what a histogram is). On dark, bright or otherwise low-contrast images, you'll notice there are some peaks and overall uneven distribution of the colour values - lots of the spectrum may even be missing. *A high contrast image should have a flat histogram,* and we can achieve this through **Histogram Equalisation**.

To perform Histogram Equalisation, we first need to convert our histogram to a **Probability Mass Function (PMF)**, which is essentially the same thing as a histogram, but instead represented each bar as a probability value - given a particular interval, a PMF will return the probability of selecting data within that interval from the original data. Doing this conversion is pretty straightforward.

$$
\text{PMF}(\text{sample} = (x\_{\text{lower}},x\_{\text{upper}}]) = \frac{h((x\_{\text{lower}},x\_{\text{upper}}])}{h(*)}
$$

From this, we then convert the PMF to a **Cumulative Distribution Function (CDF)**, which gives the probability of selecting a particular value, up to a maximum. This one's pretty straightforward too.

$$
F\_x(X) = \text{Prob}(X \leq x) - \sum \_{x\_i \leq x} \text{Prob}(X = x\_i)
$$

Depending on the number of unique pixel values (or "bins") from our original image, we should end up with a sort of increasing curve. *We now want to flatten this to get a linear function*, a process also known as **Histogram/PMF Equalisation** (even though, ironically, this requires the CDF). This will give the image higher contrast, thereby increasing its quality. In mathematical terms, we want to convert $c_x(k_x) = \sum^{k_x}_{j=0} \frac{n_j}n$ to $c_y(k_y) = \frac{k_y}{L-1}$, where $c$ refers to the CDF functions of distributions $x$ and $y$, and $k$ refers to each value in those distributions (or, "bins"). $L$ is the largest pixel value. Equalisation achieves this by swapping bins around.

$$
k\_y = \text{round}((L-1) \sum^{k_x}\_{j=0} \frac{n\_j}n)
$$

Note, this won't always result in a perfect flattening, but often the histogram will be spaced out to use the full range of possible pixel values.

## WILL YOU TWO SHUT UP?!

*PEOPLE ARE TRYING TO SLEEP!*

**Image Noise** refers to unwanted, random defects or structures in an image. It's usually caused by defects in a camera, the environment the image was taken in, or compression. Here we assume that it's additive in relation to the original image (i.e., a random noise variable is added to that of the original image to get an observed final image). We'll cover two types of noise here, *Gaussian Noise* and *Impulse Noise*.

$$f'(x,y) = f(x,y) + \eta(x,y)$$

### Gaussian Noise

Gaussian Noise simply generates a normal distribution of data (which btw is what a Gaussian Distribution is), which, again, is added to the original image.

$$
\eta(x,y) \sim \mathcal{N}(0, \sigma^2)
$$

While theoretically, we could use *global averaging* to get rid of the noise, this would also further destroy the image. So, we instead use **Local Averaging**, where given a region size, or *mask*, we change each pixel to be the average of itself and its neighbours. This has the visual effect of "blurring out" the noise, which increases with the size of the mask.

$$
I' := m \times n \text{ mask, } \frac1{m \times n} \sum_{(x,y \in I')} f(x,y) = \frac1{m \times n} \sum_{(x,y \in I')} f'(x,y) - \frac1{m \times n} \sum_{(x,y \in I')} \eta(x,y)
$$

Local Averaging is a convolution operation, and we may also apply weights to each pixel to ensure it is changed by only a certain amount in each mask. Indeed, we could train a convolutional neural network to use weight these masks, or other filters, for image analysis in deep learning, but we're getting off-topic.

### Impulse Noise

Also known as *Salt and Pepper noise* for this case, Impulse Noise refers to irregularities in singular pixels, with extreme pure white or black pixels that are "stuck" or "dead". Identifying these and fixing them is pretty straightforward then, as we can apply a **Median Filter**, where we select a grid of pixels, with the abnormal one in the middle, and insert the median value to "blend" it in. We *don't* use a mean filter, as remember, our abnormal pixel is an outlier value which will skew the result.

## Not so Discrete

Up to this point, we've been working on individual pixel values, however in the **frequency domain**, we apply a transformation to the image, which changes its representation, apply filters, before reversing the transformation. The first question this raises is, *what is a transformation in this context*? Well, this usually refers to either Discrete Fourier Transform, Discrete Cosine Transform, or Discrete Wavelet Transform.

### Discrete Fourier Transform (DFT)

DFT is the representation of a function, by a combination of *harmonic functions*, which each have a coefficient applied.

$$
f(x) = \sum^{M-1}\_{u=0} F(u)e^{\frac{-i2\pi ux}M}
$$Where $i$ refers to the imaginary number (which I totally didn't forget was a thing, good thing they moved CS131 to 2nd year), $M$ refers to the number of frequencies measured, and $F(u)$ is the collection of DFT coefficients. Expanding this out to 2D images, we represent them as the sum of a set of images of alternating black and white bands, increasing in frequency.

Putting an image through DFT will typically result in a new image that looks like what you'd get if you stared directly at the sun, with a central "glow", with possibly some additional "light sources". When we want to denoise an image, we want to get rid of these extra sources and ensure only the central one remains, and we do this by applying *filters*, usually either ideal, gaussian or butterworth *low-pass filters*, also often called "notch filters".

Using DFT and notch filters is far more effective in cases where we want to remote repeating patterns, namely grids. We can also high-pass filters along with histogram equalisation to enhance certain images, such as x-rays.

#### Ideal low-pass filter

$$
H(u,v) = \begin{cases} 0 & \text{if } D(u,v) \leq D_0 \\\\ 1 & \text{if } D(u,v) > D\_0 \end{cases}
$$

Where $D_0$ defines the radius of the filter, and $D$ determines the distance from the centre of the filter. This is basically like the Heaviside function, so has a very abrupt cut-off.

#### Gaussian low-pass filter

$$
H(u,v) = e^{\frac{-D^2(u,v)}{2D\_0^2}}
$$
More generally, we can represent $D_0^2$ as $\sigma^2$. This has a gradient to it, but with a prominent centre.

#### Butterworth low-pass filter

$$
H(u,v) = \frac1{1 + (\frac{D(u,v)}{D\_0})^{2n}}
$$

Where $n$ is a positive parameter. This filter has a longer taper than Gaussian, forming more of an S-curve.

#### High-pass filters

For any low-pass filter $H$, we can make its high-pass counterpart $H'$ like this...

$$
H'(u,v) = 1 - H(u,v)
$$

### Discrete Cosine Transform (DCT)

Similar to DFT, DCT represents functions as weighted sums of *cosine functions* of increasing frequency, as opposed to harmonic function.

$$
F(u) = \sum^{N-1}_{x=0}f(x) \alpha(u) \cos(\frac{\pi(2x+1)u}{2N}), \alpha(u) = \begin{cases} \sqrt{\frac1N} & \text{for } u=0 \\\\ \sqrt{\frac2N} & \text{for } u>0 \end{cases}
$$


This results in image frequency representations that have more gradual banding than DFT. DCT is more useful for compression, as there are only a few large coefficients, which suggest those functions make up a big portion of the image. As a result then, we can zero out all the smaller coefficients to lose a negligible amount of detail, and store the image in a smaller file size. We'll get back to compression later on.

### Discrete Wavelet Transform (DWT)

DWT is very distinct from DFT or DCT, in that it analyses a signal or function at multiple frequencies, all at different resolutions, otherwise called *multiresolution analysis*. The main thinking behind this is, low frequency signals last a long period of time, so by comparison, high frequency signals should be analysed in a higher time resolution, otherwise we risk losing information. What "wavelets" we use can vary based on the low-pass filters and high-pass filters we use. The two popular low-pass filters are **Haar Filter** and **Daubechies-4 Filter**

Haar Filter:

$$
h = \begin{bmatrix} \frac1{\sqrt2}, \frac1{\sqrt2} \end{bmatrix}
$$

Daubechies-4 Filter

$$
h = \begin{bmatrix} \frac{(1+\sqrt3)}{4\sqrt2}, \frac{(3+\sqrt3)}{4\sqrt2}, \frac{(3-\sqrt3)}{4\sqrt2}, \frac{(1-\sqrt3)}{4\sqrt2},  \end{bmatrix}
$$

Then, to get the corresponding high-pass filters of either, we perform the following:

$$
g\_k = (-1)^k h\_{n-k-1}, \text{ } k \in \{0,1, ..., n-1\}
$$

The low-pass filter is then applied to the signal, usually passing through at a fixed interval, and wrapping around once it reaches the end, making up the first portion of the output. We then do the same with the high-pass filter, which makes up the last portion of the output. At this stage, we have a *one-level DWT*. We apply the filter repeatedly to the low-pass portion of the output of the last iteration, usually two more times, to get a three-level DWT transform.

In the context of images, we perform low- and high-passes on the image, and then low- and high-passes on each output, which after a one-level DWT, results in four outputs, LL, LH, HL and HH. We continue performing DWT on the LL image (so the one that passed through the low pass-filter twice) to continue getting information. We use DWT for denoising, specifying which components to denoise, then applying a threshold and reconstructing.