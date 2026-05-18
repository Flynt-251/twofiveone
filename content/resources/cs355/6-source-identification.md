+++
title="6 - Whodunnit? (Source Identification)"
+++

Cameras get used in crime all the time, sometimes the crime itself revolves around the use of a camera in inappropriate ways. And really, it's not going to get much better in the advent of mobile phones - hell, if someone is stupid enough to record a TikTok with their phone in a running microwave (yes, really), then someone is definitely stupid enough to record themselves committing a crime. Usually, the question of *who* took a picture can be made far easier by figuring how *what* took the picture.

## The Easy Answers

First and foremost, **EXIF** metadata usually has the answer, and it tends to include a lot of other juicy information, like the date and time the image was taken, the exposure, resolution, photoshopping equipment used, and even GPS data - that last one is how the Burger King Foot Lettuce guy lost his job! Provided, this isn't always available if the image changes format or gets recompressed.

We know that some cameras handle **Chrominance Subsampling** differently, so we could try that? But remember that we said that the 4:2:0 format was the most *popular*, so depending on what models of camera we're comparing, this may not actually help us narrow anything down.

Some cameras include **visible or invisible watermarks** for the sake of source identification, but again, this only applies to a few cameras - most don't really do this.

If in doubt, **chuck AI at the problem**! Sarcasm aside, we may be tempted to try a machine learning approach. But then comes the question of, *"what data do we feed the ML model?"* Raw pixel values? LBP codes? HoG? DCT coefficients? What's important here is we want to find some unique signature for each camera, which could be very difficult considering it needs to be independent to the images each camera has taken, which can all be incredibly divergent.

Immediately, we may think of *noise* as a signature, and indeed, this is starting to head in the right direction. Dead pixels, or *salt and pepper noise* can allow us to catch certain cameras red-handed, so to speak. But are there invisible defects that could make *every camera ever made* uniquely identifiable? Well, quite possibly.

## Nothing is truly anonymous

*Ugh, here they go again*

There will always be manufacturing defects and imperfections in the creation of light sensors in cameras, it's simply an inevitability. This results in **Sensor Pattern Noise (SPN)**, which can uniquely identify *any camera*, and can even *survive processing and compression*. Terrifying stuff, I know. I mean, just about everything has a unique footprint to it, even the way you drink a cup of coffee is unique to you (unless you don't drink coffee, though I guess this applies to any hot drink... if you drink those.).

Of course, there are multiple types of noise involved when making images, so we need to differentiate them first! Keep in mind the image acquisition process as you read on...

- **Sensor Noise** - This is the all-encompassing term for the other types of noise we will cover here. Even if we were to somehow take a picture that's 100% uniform in colour and lighting, there would still be very slight differences between pixels, and that's sensor noise.
- **Shot Noise** - Also called Photonic Noise, this is due to varying numbers of photons reaching the sensor, dependent on exposure and pixel location. This is entirely random, and we can model shot noise using a Poisson Distribution.
- **Sensor Pattern Noise (SPN)** - This is the *deterministic* noise that we seek to identify, called so because it remains fairly constant throughout the different pictures we take. It consists of a few subcomponents.
- **Fixed Pattern Noise (FPN)** - Caused by minor variations in pixel sensitivity under low/no light, also called *dark current noise*. It's an additive form of noise, making it fairly easy to subtract out, and in fact, some higher-end cameras do this as part of their post-processing!
- **Photo Response Non-Uniformity (PRNU)** - This is usually the biggest portion of the SPN, and it's due to the very slight imperfections in light sensor manufacturing.
- **Pixel Non-Uniformity (PNU)** - This is the main component of PRNU, and is due to irregularities and imperfections in the manufacturing of the silicon wafers of light sensors. Even sensors from the same wafer have different noise patterns! In here lies the heart of the "fingerprint" we're looking for.
- **Low Frequency Defects** - This is basically all other external factors that cause light refraction, namely dust on the lens or imperfections in the glass.

Now to create a mathematical model to demonstrate the relationship of all of this behaviour in the image acquisition process.

$$
y\_{i,j} = f\_{i,j} \cdot (x\_{i,j} + \eta\_{i,j}) + c\_{i,j} + \epsilon\_{i,j}
$$

- $y\_{i,j}$ - Image Output
- $f\_{i,j}$ - PRNU (this is multiplicative, not a function)
- $x\_{i,j}$ - Light incident on shot, i.e. the actual image
- $\eta\_{i,j}$ - Shot Noise
- $c\_{i,j}$ - Dark Current Noise, or FPN
- $\epsilon\_{i,j}$ - Random Noise

There's also the processing side of things which introduces more variables:

$$
p\_{i,j} = \mathcal{P}(y\_{i,j}, N(y\_{i,j}), i, j)
$$

- $p\_{i,j}$ - Image Output
- $\mathcal{P}$ - Non-linear processing function
- $y\_{i,j}$ - Sensor Output
- $N(y\_{i,j})$ - Neighbourhood of $y\_{i,j}$

We're doing all of this *directly from the sensor*, so before any processing has been done on the image, so we can disregard that last equation. Remember, we're looking for the PRNU here, so we first start by ignoring the shot noise and random noise - these are unique to the particular image, so there's not really anything we can do with these. Doing so, we can then rearrange to get the PRNU from the image.

$$
f\_{i,j} = \frac{y\_{i,j} - c\_{i,j}}{x\_{i,j}}
$$


Well that's not very helpful - how on earth can we know that the "true image" is? Well, we don't. All we can do is guess.

## A shot in the dark

So, we can't directly estimate the PRNU of an image, and that's mainly because of the non-linear nature of image processing, plus it's incredibly hard to access a sensor's output before its processing (unless you have the steadiest hands in the world and spend too much time using a soldering iron). The best we can do then, is *approximate* with multiple images taken from the same camera.

Take each of these pictures to be $\mathbf{p}^k$, where $k = 1, 2, ..., K$. We then "suppress" the scene content from each reference image to denoise $F(\mathbf{p}^k)$, which is basically the process of averaging all the pictures. To get just the noise then, we do $\mathbf{n}^k = \mathbf{p}^k - F(\mathbf{p}^k)$. Lastly, we create our approximated SPN using $\textbf{SPN}\_{ref} = \frac1K \Sigma\_k \mathbf{n}^k$.

The more images we have, the better accuracy the SPN approximation is, keeping mind that denoising is difficult in images with textured or high-frequency components, as these can mix in with the SPN. Likewise, SPN is generally more supressed in darker areas, which makes sense considering it's multiplicative.

So, once we've made an approximated SPN for a camera, it becomes quite straightforward to test if an image was taken by that camera - compute the SPN for the test image (using the steps we just discussed), and then compare that SPN $Y$ with our reference $X$, using correlation coefficient. Usually we square the result, too.

$$
r(X,Y) = \frac{\text{cov}(X,Y)}{\sqrt{\text{var}(X)\text{var}(Y)}}
$$

Now as digital detectives, only one thing stands in our way... robots.