+++
title="4 - Loss Functions"
+++

**Loss Functions** exist to show us how well a given neural network represents the dataset it's trained on, or in other words, *how much information we **lose** from the original data when we put it through that function*. This is used to help guide training, such that we have an accurate model. But not TOO accurate...

A good Loss Function should have the following properties:

- Its value is **Minimised** when the prediction, $\hat{y}$, is the same as the target, $y$. Ideally, it's 0.
- When the gap between $\hat{y}$ and $y$ increases, the function also **Increases**.
- It's **Continuous** and therefore **differentiable**.
- It's **Convex**, meaning if we were to draw a line through its graph, it lies above it and intersects at two points (or not, if it's below). In other words, it forms a "U" shape.

By the way, you may hear **Cost Functions** from time to time as well. This is just the *average loss*, so in a cost function, we will sum the total loss, and average divide this sum by the total number of points in our data set. We will cover two types of loss function, regression, which we use to predict patterns in data, and classification, which we use to... classify things. L1 and L2 Loss are used for regression, and Log Loss and Hinge Loss are used for classification.

## Take the L

**L1 Loss** is very simple, it compares each value to its target, and extracts the magnitude.
$$L = |\hat{y} - y|, \text{ MAE} = \frac1n \Sigma^n_{i=1}|\hat{y}_i - y_i|$$
MAE refers to **Mean Absolute Error**. This is nice and intuitive, and isn't too sensitive to huge margins of error. However, because we use the absolute function, it's not differentiable when the loss is zero. Furthermore, the gradient has no change as inaccuracy increases, meaning there's not much distinction between a value that's slightly off, or an outright outlier.

## Take the L, part 2

**L2 Loss** is also very simple, and you may know it by another name, **Mean Squared Error** (MSE).
$$L = (\hat{y} - y)^2, \text{ MSE} = \frac1n \Sigma^n_{i=1}(\hat{y}_i - y_i)^2$$
This is quite common (in fact you may have spotted this in a module not-so far away...), and it punishes large margins of error more significantly. That being said, now it's quite sensitive to outliers, leading to larger error values.

## Some of you have too much Hubris

*Hackathons don't mean shit when you're insufferable to your future colleagues.*

**Huber Loss** utilises what I like to call, the bisexual argument - why not both? It combines both Mean Squared Error and Mean Absolute Error into one piecewise function.

$$
l_{\delta}(y, \hat{y}) = 
\begin{cases}
\frac12 (y - \hat{y})^2, & \text{if } |y - \hat{y}| \leq \delta \\\\
\delta |y - \hat{y}| - \frac12 \delta^2, & \text{if } |y - \hat{y}| > \delta
\end{cases}
$$
Now we apply Mean Squared Error when we have a relatively small error, and outliers are treated using Mean Absolute Error, which is to say, linearly. This eliminates the issues that L1 or L2 loss had, both having better differentiation between small errors and outliers, while still not being *too* sensitive to outliers.

## A small note about Taking the L

L1 and L2 loss both get their names from L1 and L2 norms in geometry. I think those were in A-Level maths, but I can't quite remember.

$$
\mathbf{x} = \begin{bmatrix}
x\_1 \\\\ x\_2 \\\\ \vdots \\\\ x_n
\end{bmatrix}
\text{, L1 Norm: }
||\mathbf{x}||\_1 = \Sigma^n\_{i=1}x_i
\text{, L2 Norm: }
||\mathbf{x}||\_2 = \sqrt{\Sigma^n\_{i=1}|x\_i|^2}
$$
In fact, there's such thing as an L$p$-norm. P Norm? Ugh.

$$
||\mathbf{x}||\_p = \sqrt[p]{\Sigma^n\_{i=1}|x\_i|^p}
$$
All the way up to Infinity.

$$
||\mathbf{x}||_\infty = \max\_{1 \leq i \leq n}|x\_i|
$$

Two norms $L_p$ and $L_q$ are *equivalent*, if we can create two positive constants $c$ and $C$ such that $c \cdot ||\mathbf{x}||\_q \leq ||\mathbf{x}||\_p \leq C \cdot ||\mathbf{x}||\_q$, which essentially means, the value of $L_p$ has a range equivalent, or smaller than that of $L_q$, or vice versa. $L_1$, $L_2$ and $L_\infty$ are all equivalent to each other, but I cannot be arsed to write the proof for these, nor do I understand the relevance to assessments here.

### Take no Ls

There's also L0 norm, which is also useful in neural computing, but this isn't used in loss functions. It's more useful for cases of sparsity, which makes sense when you consider the fact it's the count of non-zero elements in a vector.

## Too Good to be true

*You know that feeling when it just fits a bit too well? Oh, just me? Okay then...*

When we train ML models, we use a training dataset. Okay, I know we covered that already, but it's important to remember that through our training data, the model picks up certain patterns and behaviours - that's what we want it to do. But it is possible to *overlearn* that data, leading to **overfitting** - this is where the model captures noise in our training dataset which throw off its outputs. For instance, in the case of a classification model, *a few misclassifications are permissible*, too many, and the separator becomes way too messy.

Hence, **regularisation** prevents overfitting and learning of complex patterns. It does this by identifying the weights in a neural network which cause the smallest losses, and limiting them towards zero, using L1 and L2 Norms, each known as **Lasso Regularisation** and **Ridge Regularisation** respectively. Each of these add values to minimal loss values with a factor $\lambda$, with L1 doing this by adding $\lambda||w||_1$, and L2 by adding $\lambda||w||_2^2$. Lasso regularisation will tend to produce sparse neural networks, where some weights disable inputs on the network, whereas ridge regularisation will produce networks with weights that are more evenly distributed.

## I'm going to log this as a loss

**Log Loss** is used for classification models. For now, we'll just focus on binary classification, i.e. class 1, or class 0. Intuitively, we want to retain cases where the correct class results in minimal loss, and the wrong class results in large loss. As such, we end up with the following function:

$$
L(y, \hat{y}) = -y\log{\hat{y}} - (1-y)\log{(1-\hat{y})}
$$
First, take a moment to remember that $\log(x)$ is the function which, given $x$, find the value of $y$ in the equation $10^y = x$. It's important to remember that $\log(0) = -\infty$ and $\log(1) = 0$. And, $y \in \{0,1\}$ refers to a data point's true class, and $\hat{y} \in [0,1]$, what the model predicts it to be. As such, the true class acts as a "switch" in the function, ensuring we use the correct part of it. Then, between 0 and 1, for $-\log(x)$ or $-\log(1-x)$, we get a very steep curve, such that when an element is further away from its expected class, it is exponentially treated more harshly. I hope I've explained that well enough, because I think my brain partially fried.

Where we have more than two classes, things look a little different - we still want to find the distance between data points and their correct class, but we can't just rely on two elements. It's quite simple in all fairness.

$$
L = -\Sigma^N_{i=1}y_i\log{\hat{y_i}}
$$
Where for a data point, if it fits a particular class, $y_i$ is 1. If not, it's 0.

> Okay, so this is where the slides end, and we move on. But, in the pursuit of knowledge and willingness to be complete, I will also briefly cover Hinge Loss. See, this ain't just about passing the exam, I just want to help you lot learn in general. So, you're welcome. ^w^

## I think I've got a hinge or two loose

**Hinge Loss** is also used for classification problems, but instead of $y \in \{0,1\}$, we have $y = \pm 1$. It measures the distance of a value's predicted class from its real class, and determines if this is greater than 0, if not, it's probably well within the bounds of the class it's expected to be in.

$$
L(y, \hat{y}) = \max(0, 1-y\cdot\hat{y})
$$
And we're done! Here's a totally normal Calvin and Hobbes strip I found online as a palette cleanser.

![A(n edited) Calvin and Hobbes comic strip](/images/resources/cs331/calvin-and-hobbes.png)