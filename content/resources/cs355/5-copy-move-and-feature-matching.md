+++
title="5 - Copy-move forgery and Feature matching"
+++

I shouldn't need to tell you that not every image stored in the world is a JPEG, often we have to work on other image formats, or heck, we may be unlucky enough to be dealing with JPEGs that have been compressed all in the same quality. So, how might we be able to brute-force checking an image? We'll start by looking at copy-move forgery again before then focusing on feature matching.

## Around the world

*Lyrics to live by*

First, we could exhaustively search blocks of an image in order to identify parts that are overly similar or dissimilar, using **Circular Shift**. The basic idea is, we compare the image to another version shifted by $(k,l)$ pixels, and if the same area has equivalent pixels (up to a certain threshold), we can easily identify where something has been spliced. The issue is, this could result in false positives since some portions of the image, while very similar, could be completely natural.

To remove false positives, we use *morphological processing*, or more specifically, erosion and dilation. **Erosion** sets pixels to the minimum value of its neighbourhood, which can cause lighter areas to shrink in size, and reduce the size of borders or outlines. **Dilation** sets pixels to the maximum value of its neighbourhood, which causes lighter areas to grow, increasing the size of borders and outlines.

The algorithm looks like this:

- *Input* - Image $\mathbf{I}$ of size $m,n$
- *Output* - Binary Image $\mathbf{A}$
- *Initialise* $\mathbf{A} = 0\_{m,n}$
- For $k,l$ to $k\_{\max}, l\_{\max}$...
	- Compute $\mathbf{S}$ by performing a circular shift on $\mathbf{I}$ by $(k,l)$
	- Compute $\mathbf{D} = |\mathbf{I} - \mathbf{S}| < t$
	- Erode and Dilate $\mathbf{D}$ using neighbourhood size $b \times b$ and store the result in $\mathbf{D\_{ed}}$
	- $\mathbf{A = A \vee D\_{ed}}$
	- Increment $k,l$

## It goes in the Square Hole

*This new block meta changes EVERYTHING?*

**Block Matching** is the process of splitting an image into blocks, and sorting them by similarity in order to identify segments that are identical, or I guess, suspiciously similar according to a certain threshold. This can work in either the pixel domain, or the frequency domain.

We start by producing each block, shifting over one pixel at a time, which we then convert to a vector (i.e., turn it from a block into a very long line), and place into a table. Once we have a full table of vectors, we then sort this *lexicographically*, which is basically the same as alphabetic sorting - this lets us place blocks that are visually similar together next to each other, so that we can easily compare adjacent pairs to get the mean absolute error.

$$
d = \frac1n \sum^n\_{i=1} |r\_i^a - r\_i^b|
$$

If $d$ is below a certain threshold, then we can conclude that the two regions are the same.

For frequency domain checking, we do the same, but we additionally get each block's DCT coefficients any turn these into vectors to be stored. However, these can result in a lot of false positives, so using post-processing, we should ignore cases where two similar blocks are overlapping or otherwise very close to each other.

## It's a feature

*AND it could be a bug!*

The third way we could identify forged images is by splitting it into blocks (yes, again) and identifying features by some other metric we haven't discussed yet. *Feature Vectors* capture important characteristics about a block, and acts as its signature. Ideally, such vectors should be a compact and robust representation of their image, which is to say, using space efficiently, and not breakable with simple modifications like changing the brightness of an image.

Features can be *local* or *global*, and describe things like raw pixel values, frequency domain information, statistical features (such as histogram related stuff!) or other visual features like shapes, colours or textures. This can further be used for *pattern recognition* tasks if desired, such as reading handwriting to convert it into digital text.

### A word of caution

It should be known at this point that *no algorithm can do anything perfectly*. Sometimes something gets flagged incorrectly, or sometimes a clear problem gets ignored - just because we have 100% accuracy now, doesn't mean our system is perfect! The question becomes then, *what is an acceptable level of accuracy*, or *do we want more false positives or false negatives*?

False positives may be more desirable as we can be sure more actual positives are identified, while false positives can be swiftly dealt with. In that same vein though, we still have to deal with those false positives, which could become problematic in cases, such as police forensics, which could lead to arrests of innocent people, so avoiding such complications may be worth it for the tradeoff of some false negatives. It's a game of balance!

Here are some useful equations to consider when talking about false positives and negatives:

$$
\begin{aligned}
& \text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN} \\\\\\\\
& \text{Error Rate} = 1 - \text{Accuracy} \\\\\\\\
& \text{Precision} = \frac{TP}{TP + FP} \\\\\\\\
& \text{Recall} = \frac{TP}{TP + FN}
\end{aligned}
$$


### Local Binary Pattern (LBP)

Local Binary Pattern is useful for encoding *texture information* in an image - this can identify things like the fur of an animal, greenery, or the dull, gray paths Coventry is infamous for. This works by taking each pixel and its neighbours (such as those in a 3-by-3 grid), defining a threshold using the Heaviside function (basically, "Is this over a certain value? If so 1, else 0"), thus encoding that pixel as an $n^2 - 1$ bit binary number, otherwise called an LBP code.

The use of a threshold like this means that LBP is robust, and won't change much when the image is lightly modified. This uneven weighting of pixels can however cause varying results, even if the set region has the same texture. The *rotation invariant LBP* gets the original LBP plus all of its circularly shifted forms (seven of which for an 8-bit value).

When we've calculated the entire region's LBP values, we can plot them all on a histogram. For copy-move forgery, we'll notice the histogram has a particularly high frequency of the same values, indicating copied-over regions. Of course, this is a lot of information, and so we may want to compact it - after all, even though 11111111 and 00000000 are different values, they communicate the same thing about the pixel's texture - there is none. In these cases we may wish to use *uniform LBP*, where we track the number of *transitions* in LBP codes (changes in the sequence between 1 and 0), where we only count cases where there are at most two transitions, resulting in a histogram of 58 bins, rather than 256, and stick the non-uniform LBPs in their own bin.

#### Example

Suppose we have the following pixel neighbourhood:

$$
\begin{bmatrix}
251 & 28 & 68 \\\\
12 & \star & 92 \\\\
41 & 28 & 47
\end{bmatrix}
$$

The element in the middle doesn't matter, so I decided to stick a star in it. Now let's apply a threshold of 45.

$$
\begin{bmatrix}
1 & 0 & 1 \\\\
0 & \star & 1 \\\\
0 & 0 & 1
\end{bmatrix}
$$

We then make the LBP by going clockwise around the neighbourhood, starting at the top-left, so our LBP here is 10111000, or 184 in decimal. It's also got three transitions, so it's not a uniform LBP. All of its rotations look like this:

$$
\begin{aligned}
& 10111000 & \text{(Original)} \\\\
& 01011100 & \text{(1 right)} \\\\
& 00101110 & \text{(2 right)} \\\\
& 00010111 & \text{(3 right)} \\\\
& 10001011 & \text{(4 right)} \\\\
& 11000101 & \text{(5 right)} \\\\
& 11100010 & \text{(6 right)} \\\\
& 01110001 & \text{(whatever)} \\\\
\end{aligned}
$$

### Histogram of oriented gradients

HoG is also very popular for image analysis and computer vision, and it performs feature matching by doing calculus on an image. Calculus on an image? Yep, we're doing it. We're not going to go over how differentiation is done in much detail, but instead we'll focus on how we can kinda approximate it...

$$
f'(x) \approx f(x+1) - f(x) \text{ or } f'(x) \approx f(x) - f(x-1)
$$

Which makes sense when you consider that differentiation is just getting the gradient of a function. We can imagine this as being similar to the *Taylor Series*...

$$
f(x+h) = f(x) + h f'(x) + \frac{h^2}2 f''(x) + \cdot \cdot \cdot
$$

And then when we want to look backwards...

$$f(x-h) = f(x) - h f'(x) + \frac{h^2}2 f''(x) + \cdot \cdot \cdot$$

We can add these two equations together to then get the *second order derivative*.

$$
f''(x) = \frac{f(x+h) - 2f(x) + f(x-h)}{h^2}
$$

But what the hell does this have to do with images? Well, remember that we can calculate gradients in discrete data by just getting the differences between values. There's even a very elegant vector-based solution for this!

$$
f'(x) = f(x + 1) - f(x) = [-1, 1] [f(x), f(x+1)]^T = \nabla
$$

Then, when we want the second order derivative...

$$
f''(x) = f(x+1) - 2f(x) + f(x-1) = [1, -2, 1][f(x+1), f(x), f(x-1)]^T = \nabla^2
$$

In the case of an image, we do this by row to get $G\_x$, and by column to get $G\_y$, making sure to pad with zeros so that we get a one-to-one mapping of each pixel to its gradient. From this, for each pixel we can then calculate the magnitude using, $|G\_x| + |G\_y|$, as well as the direction, using $\tan^{-1}\frac{G\_y}{G\_x}$.

#### Example

Suppose we have the following image $I$:

$$
\begin{bmatrix}
2 & 5 & 1 \\\\
1 & 1 & 4 \\\\
3 & 1 & 5
\end{bmatrix}
$$

We will start by calculating $G\_x$, with zero-padding on the left.

$$
\begin{bmatrix}
0 | & 2 & 5 & 1 \\\\
0 | & 1 & 1 & 4 \\\\
0 | & 3 & 1 & 5
\end{bmatrix}
$$
We then take the difference of each horizontally adjacent pair of elements, to get $G\_x$.

$$
G\_x = 
\begin{bmatrix}
2 & 3 & -4 \\\\
1 & 0 & 3 \\\\
3 & -2 & 4
\end{bmatrix}
$$

Now to make $G\_y$. Again, add some padding, this time on the top.

$$
\begin{bmatrix}
0 & 0 & 0 \\\\
2 & 5 & 1 \\\\
1 & 1 & 4 \\\\
3 & 1 & 5
\end{bmatrix}
$$

Then take the difference of each vertically adjacent pairs.

$$
G\_y =
\begin{bmatrix}
2 & 5 & 1 \\\\
-1 & -4 & 3 \\\\
2 & 0 & 1
\end{bmatrix}
$$

And then we can get the magnitude and angles of the gradient of each pixel!

$$
G\_{mag} = \begin{bmatrix}
4 & 8 & 5 \\\\
2 & 4 & 6 \\\\
1 & 2 & 3
\end{bmatrix},
G\_{ang} = \begin{bmatrix}
0.785 & 1.030 & -0.245 \\\\
-0.785 & !? & 0.785 \\\\
0.588 & 0 & 0.245
\end{bmatrix}
$$

Then, you guessed it, we put all the elements of $G\_{mag}$ into a histogram!

### Compare 'em!

We can then take the vectors we made of each block and compare them using similarity measurements that we've used before, namely Mean Absolute Error, Mean Square Error, Correlation, Structural Similarity (SSIM), or possibly *euclidian distance*.

$$
L2(\mathbf{x}, \mathbf{y}) = \sqrt{\Sigma^D\_{i=1}(x\_i - y\_i)^2}
$$

And that's it for now! Next up, some cameras have gotten tangled up in some horrible crimes... head over to the next page for a classic *Whodunnit*?