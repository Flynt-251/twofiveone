+++
title="3 - Forward Propagation"
+++

So far, almost all the neural networks we've looked at use **forward propagation**, which means that all data flows in one direction, from one layer to the next - there's never a case where data moves back through the same neuron twice, we'll get to such cases later on. This is a fairly straightforward procedure, so we'll focus on how we can predict a model's output, using both element-wise and matrix-wise calculation methods. First, we need a neural network to use as an example.

![Sample Neural Network](/images/resources/cs331/sample-nn.png)

Perfect! By the way, if you need to make your own neural network diagrams, [NN SVG](https://alexlenail.me/NN-SVG/index.html) seems to be a pretty good bet. Now we need some values and activation functions.

$$
\begin{aligned}
& \text{Let } \mathbf{x} = [2, 1, 4]. \\\\
& \text{At Layer 1...} \\\\
& w_1 = [1, 1, 2], w_2 = [4, 0, 1], w_3 = [1, -1, 1], w_4 = [2, 3, -1]. \\\\
& b_1 = 2, b_2 = 1, b_3 = -2, b_4 = 0 \\\\
& \text{For Layer 2, } w = [0, 2, 1, -9] \text{ and } b = 1 \\\\
& \text{At Layer 1, the activation function is ReLU.} \\\\
& \text{At Layer 2, the activation function is} \tanh.
\end{aligned}
$$

## Element-wise calculation

First, we start at Layer 1, going neuron-by-neuron. Starting with the first...
$$
\begin{aligned}
\Sigma^3_{i=1} (w_i x_i) + b \\\\
= 1 \cdot 2 + 1 \cdot 1 + 2 \cdot 4 + 2\\\\
= 2 + 1 + 8 + 2 \\\\
= 13 \\\\
\text{ReLU}(13) = 13
\end{aligned}
$$
Then the second...
$$
\begin{aligned}
\Sigma^3_{i=1} (w_i x_i) + b \\\\
= 4 \cdot 2 + 0 \cdot 1 + 1 \cdot 4 + 1\\\\
= 8 + 0 + 4 + 1 \\\\
= 13 \\\\
\text{ReLU}(13) = 13
\end{aligned}
$$
And the third...
$$
\begin{aligned}
\Sigma^3_{i=1} (w_i x_i) + b \\\\
= 1 \cdot 2 + -1 \cdot 1 + 1 \cdot 4 - 2\\\\
= 2 - 1 + 4 - 2 \\\\
= 3 \\\\
\text{ReLU}(3) = 3
\end{aligned}
$$
And then the last one. (I'm so glad I moved to obsidian instead of Visual Studio Code)
$$
\begin{aligned}
\Sigma^3_{i=1} (w_i x_i) + b \\\\
= 2 \cdot 2 + 3 \cdot 1 - 1 \cdot 4 + 0\\\\
= 4 + 3 - 4 \\\\
= 3 \\\\
\text{ReLU}(3) = 3
\end{aligned}
$$
So now we have the input for Layer 2: $[13, 13, 3, 3]$.
$$
\begin{aligned}
\Sigma^4_{i=1} (w_i x_i) + b \\\\
= 0 \cdot 13 + 2 \cdot 13 + 1 \cdot 3 - 9 \cdot 3 + 1\\\\
= 0 + 26 + 3 - 27 + 1 \\\\
= 3 \\\\
\tanh(3) = \frac{e^{3} - e^{3}}{e^{3} + e^{3}} \\\\
= 0.99505 \text{ (5 s.f.)}
\end{aligned}
$$

## Vector-wise calculation

First off, we need to move some values around, starting with Layer 1. We'll combine all of the weights into a single matrix, as well as all of the biases. We'll transpose $\mathbf{x}$ too, and create column vectors $\mathbf{a}$, which will pass our outputs into Layer 2, and $\mathbf{z}$, which stores the pre-activation values. Both vectors are four elements in size.

$$
\text{Let }
\mathbf{W} = 
\begin{bmatrix}
1 & 1 & 2 \\\\
4 & 0 & 1 \\\\
1 & -1 & 1 \\\\
2 & 3 & -1
\end{bmatrix},
\mathbf{b} =
\begin{bmatrix}
2 \\\\ 1 \\\\ -2 \\\\ 0
\end{bmatrix},
\mathbf{x}^T =
\begin{bmatrix}
2 \\\\ 1 \\\\ 4
\end{bmatrix}
$$
Now to put these all into a small handful of neater calculations!
$$
\mathbf{z} = \mathbf{W} \cdot \mathbf{x}^T + \mathbf{b} =
\begin{bmatrix}
11 \\\\ 12 \\\\ 5 \\\\ 3
\end{bmatrix} +
\begin{bmatrix}
2 \\\\ 1 \\\\ -2 \\\\ 0
\end{bmatrix} = 
\begin{bmatrix}
13 \\\\ 13 \\\\ 3 \\\\3
\end{bmatrix},
\mathbf{a} = \text{ReLU}(\mathbf{z}) =
\begin{bmatrix}
13 \\\\ 13 \\\\ 3 \\\\3
\end{bmatrix}.
$$
And then, we plug all of this into Layer 2. Recall $w = [0, 2, 1, -9]$.
$$
z = w \cdot \mathbf{a} + b = 2 + 1 = 3, \tanh(3) = 0.99505 \text{ (5 s.f.)}
$$
Much cleaner! Of course, as we add more and more layers to a neural network, the more variables we have to keep track of, so it's common to see the following notation when demonstrating the calculations for Layer $k$:

$$
\mathbf{a}^{[k]} = f^{[k]}(\mathbf{W}^{[k]} \cdot \mathbf{a}^{[k-1]} + \mathbf{b}^{[k]}), \text{ where } \mathbf{a}^{[0]} = \mathbf{x}.
$$

## Double Down (again)

*I've already made too many irresponsible purchases, there's nothing left to gamble.*

**Vectorisation** is a very useful optimisation technique for calculating the forward propagation of a neural network - it makes use of CPU registers to store and calculate multiple values at the same time, essentially giving us an effect similar to what we demonstrated above - much simpler and faster calculations - two vectors of size 4 can be added together in one go, no iteration! In the case of a matrix, matrix multiplication operations are split such that the second operand is split by column, and each column is multiplied by itself. This is a form of parallel computing, and will use more memory.

You may have heard of vectorisation from [CS257](/resources/cs257/7-parallel). If this is a new concept to you, it's not imperative that you learn it in this module, but feel free to check out the linked notes if you want to learn more! Your computer should have the necessary libraries for you to start messing around with such operations yourself.