+++
title="1 - How Images are Made"
+++


In order to make a picture, first you have to invent the power of sight. Human eyes are pretty cool, as they're able to take in light through a lens, and then through a series of light receptors, transfer all of this information through the optic nerve and through to our brain. Cameras, quite obviously, operate on a similar principle. Through the lens, light travels through a **colour filter array (CFA)** and onto an **imaging sensor**, which converts light energy into voltage, giving a pixel-by-pixel set of values. This array of data then goes through some post-processing, before being saved as a digital file.

However, cameras have a resolution, where the world does not (at least, not that we're aware of yet, it is still a possibility that we live in a simulation!), so the camera needs to perform some **sampling**. In fact, imaging sensors are often capable of capturing millions or even billions of pixel data all at once... that would make for some VERY big images! In the case of a 2D array, we usually take samples at a constant interval of $x+i, y+j$ for constants $i$ and $j$.

The world also has (probably) infinite colours, and again, cameras certainly do not. So we also need to perform **quantisation**, which is where we sort continuous data into multiple discrete bins. In the case of a 2D image, this means colours are typically "rounded" to a value closest to the appropriate bin.

## Yo, they got the LGBT lights!

*Sorry, I just had to make that joke*

There are three colours of light: red, green and blue. But judging by some of your PC setups, you likely already knew this. These are filtered by the Colour Filter Array to separate out each colour value, which is usually a grid laid out in a *Bayer Pattern*, which is a chequerboard of green, and red and blue alternating for each other pixel. This means there are double the green subpixels than there are red or blue, and this is to mimic the human eye's numbers of absorption cells.

This results in a very green picture. Therefore, we then perform **CFA Interpolation** to combine the red, green and blue pixel data together, usually through linear or bilinear interpolation. With **bilinear interpolation**, we try to identify the value of a midpoint in a 2D space.

$$
\begin{aligned}
& I(x,y) = a, \text{ } I(x, y+\epsilon) = b \\\\
& I(x+\epsilon, y) = c, \text{ } I(x+\epsilon, y+\epsilon) = d \\\\\\\\
& I\_{x,y+k} = \frac{(y+\epsilon) - (y + k)}{(y+\epsilon) - y} \cdot a + \frac{(y+k) - y}{(y+\epsilon) - y} \cdot b \\\\\\\\
& I\_{x+\epsilon,y+k} = \frac{(y+\epsilon) - (y + k)}{(y+\epsilon) - y} \cdot c + \frac{(y+k) - y}{(y+\epsilon) - y} \cdot d \\\\\\\\
& I\_{x+k,y+k} = \frac{(x+\epsilon) - (x + k)}{(x+\epsilon) - x} \cdot I\_{x,y+k} + \frac{(x+k) - x}{(x+\epsilon) - x} \cdot I\_{x+\epsilon,y+k}
\end{aligned}
$$

Lastly, we then perform *gamma correction*, which changes the way light values are represented - cameras interpret light in a more accurate way than human eyes do, our eyes interpret it in a logarithmic manner relative to actual light levels (so in sane terms, at lower light levels, there is a steep rise, but as this increases to extreme levels of light, we perceive less change). The formula is as follows:

$$
v'\_{\text{out}} = 255 \times (\frac{v'}{255})^{\gamma} \text{, where } \gamma \text{ is usually } \frac1k \text{ for some } k \in \mathbb{N}
$$

## The composition of your "homework"

*If we share the same sense of humour, you definitely know what I mean*

When we store images, the basic format is RGB, where we store the red, green and blue values each as a 1 byte value, thus using three bytes per pixel. We may also store an image as greyscale, representing each pixel with a byte, for an 8-bit image. To convert from colour to greyscale is pretty easy, we just take the average of the three values for each pixel.

It's also worth noting that every camera captures RGB values a little differently, on a manufacturer-by-manufacturer basis: some may be more saturated than others, some may be more sensitive to green, and so on. As such, you cannot really define a "true" colour between devices.

An alternative way to represent images is via **Luma-Chroma** colour space, which actually has roots back in the old days of analogue television, as a way of supporting both black-and-white and colour TV signals (yes, it's THAT old). This also splits an image into three "sub-images", but this time these are luma (Y), which describes how bright each pixel is, and the other two are chrominance (Cb and Cr), which define colour difference. On a pixel level, assuming RGB levels are represented as a column vector, we can convert this to YCbCr with the following equation:

$$\begin{bmatrix}Y' \\\\ C_B \\\\ C_R \end{bmatrix} = \begin{bmatrix}
 0.2990 &  0.5870 &  0.1140 \\\\
-0.1687 & -0.3313 &  0.5000 \\\\
 0.5000 & -0.4187 & -0.0813
\end{bmatrix}
\begin{bmatrix}
R \\\\ G \\\\ B
\end{bmatrix}
+
\begin{bmatrix}
0 \\\\ 128 \\\\ 128
\end{bmatrix}$$

And the other way around...

$$ \begin{bmatrix} R \\\\ G \\\\ B \end{bmatrix} = \begin{bmatrix}
1.00000 &  0.00000 &  1.40200 \\\\
1.00000 & -0.34414 & -0.71414 \\\\
1.00000 &  1.77200 &  0.00000 \end{bmatrix}
\begin{pmatrix}\begin{bmatrix} Y' \\\\ C_B \\\\ C_R \end{bmatrix} -
\begin{bmatrix}
0 \\\\ 128 \\\\ 128
\end{bmatrix}
\end{pmatrix}$$

We can actually use Luma-Chroma colour space to reduce the amount of space an image takes up, as the two colour-difference channels now store some redundant data. With this in mind then, we can perform **Chroma Subsampling**. This can be done a few different ways, so this is represented as a three-way ratio of $A:b:c$, where $A$ is the width of the region to subsample, $b$ is the number of chroma subsamples per row of $A$ pixels, and $c$ is the number of changes between the chroma subsamples between two rows. The most popular ratio is 4:2:0. Do with that information what you will. But, to put that into context, that means...

- $A = 4$ means the image is subsampled into rows of 4 pixels at a time...
- Which we split into $b=2$ samples each, so there are 2 colour blocks...
- And there is $c=0$ change between the first and second row, so they're the same.

We still need to decide where to get our actual subsample from, and this can be done in one of four ways:

- Take the **average** of the region,
- Take the average of the two **leftmost** pixels,
- Take the average of the two **rightmost** pixels, or,
- Use the **Direct** method, where we just use the top-left pixel.

Which ratio you use, there's typically incredibly negligible difference, according to the human eye, at least. Speaking of which...

## Identifying the sloppiest of doctorin'

We'll also cover some very basic means of identifying the similarity between two images. This can pick up basically any changes in the image. Throughout this module, we typically model images *discrete random variables*.

### Mean Squared Error

$$
\text{MSE}(X,Y) = \frac1N \sum^N\_{i=1} (y\_i - x\_i)^2
$$

This can detect *any* variation between two images, and provides a decent relative score.

### Correlation

We can use **Correlation Coefficient** (i.e., Pearson's $r$) as a measure between two variables (or, images). If there is a strong linear relationship between two images, it's fairly likely they're the same. If not, there will be no such correlation.

### Covariance

*Not the other thing that starts with "cov", don't worry*

Recall how we calculate variance of a random variable:

$$\text{var}(X) = \sigma^2 = S\_{XX} = \frac1N \sum^N\_{i=1}(x\_i - \bar{x})^2$$
This tells us how much a variable, well, variates from its average. If this is low, then we can assume the data is very flat and lacking in change or outliers. If it's high, there are a lot of changes and deviations. We can calculate the **covariance** between two variables to determine the relationship between them.

$$\text{Cov}(X,Y) = S_{XY} = \frac1N \sum^N_{i=1} (x_i-\bar{x})(y_i-\bar{y}), r(X,Y) = \frac{S_{XY}}{\sqrt{S_{XX}S_{YY}}}$$

### Structural Similarity (SSIM)

This is the most complicated of all the methods we'll cover thus far, as it covers three bases: luminance, contrast and structure. We take samples of the image, and calculate the average intensity, along with standard deviation. $C\_1, C\_2, C\_3$ are constants.

#### Luminance

$\mu$ - Average intensity of the sample

$$l(\mathbf{x},\mathbf{y}) = \frac{2\mu\_x\mu\_y + C_1}{\mu\_x^2 + \mu\_y^2 + C\_1}$$

#### Contrast

$\sigma$ - Standard deviation of the intensity of the sample

$$c(\mathbf{x},\mathbf{y}) = \frac{2\sigma\_x\sigma\_y + C_2}{\sigma\_x^2 + \sigma\_y^2 + C\_2}$$

Hey, that kinda looks like a cat face. A smug one at that.

#### Structure

$$s(\mathbf{x}, \mathbf{y}) = \frac{\sigma\_{xy} + C\_3}{\sigma\_x\sigma\_y + C\_3}$$

#### And now to put it all together...

$\alpha, \beta, \gamma > 0$ - These are all constants that we can use to weight each property. Usually these can just be 1.

$$\text{SSIM}(\mathbf{x},\mathbf{y}) = (l(\mathbf{x},\mathbf{y}))^\alpha \cdot (c(\mathbf{x},\mathbf{y}))^\beta \cdot (s(\mathbf{x},\mathbf{y}))^\gamma$$

#### Oh, and we should put all our samples together too!

$$\text{MSSIM}(X,Y) = \frac1M \sum^M\_{j=1}\text{SSIM}(\mathbf{x}\_j,\mathbf{y}\_j)$$

SSIM is symmetric, so it doesn't matter what order the images go in. It's also bounded to be between 0 and 1, and it can ONLY be 1 if both of the images are exactly the same.