+++
title="6 - Backpropagation"
+++

Remember the work we did on loss functions? Up to this point, they haven't served much purpose other than to demonstrate how accurate a model is, but now we change that as we utilise backpropagation. **Backpropagation** is the process of using the chain rule of derivation to determine the gradient of loss with respect to the network's weights. We can then use this to fine-tune our model as we need by adjusting the weights, by applying the function $w \gets w - \alpha L_w$, where $\alpha$ is our much-beloved learning rate. This idea takes inspiration from *gradient descent*, which is a trial-and-error approach to finding the minimal value of a function.

## Uhh, how do I do this again?

If like me, you forgot what the derivatives are for certain equations, fret not! Here's a recap of the basics, and some useful expressions to remember.

$$
\begin{aligned}
& \frac{d}{dx} x^a = ax^{a-1} \text{ where } a \in \mathbb{R} \\\\\\\\
& \frac{d}{dx} e^x = e^x \\\\\\\\
& \frac{d}{dx} e^{ax} = ae^{ax} \\\\\\\\
& \frac{d}{dx} a^x = a^x \ln(x) \\\\\\\\
& \frac{d}{dx} \ln(x) = \frac1x
\end{aligned}
$$

(There are more, such as those for the trigonometric functions, but we don't need them here. Thanks [Wikipedia](https://en.wikipedia.org/wiki/Derivative#Rules_for_basic_functions)!)

A *partial* derivative is very simple. We use them in cases where we're dealing with multiple variables, and they allow us to only focus on one variable, while treating the rest as if they're constants.

$$
\frac{\partial}{\partial x} x^2y^4 = 2xy^4  \Leftrightarrow \text{ Where } Z = x^2y^4, Z_x = 2xy^4
$$

There are some functions which aren't trivial to do without specifically memorising them, so here they are! (And also all the others that are fairly easy to remember, because even the smartest among us are a little stupid sometimes, y'know, just as a treat)

### Activation Functions

$$
\begin{aligned}
& H(x) = \begin{cases} 1 & \text{if } x \geq 0 \\\\ 0 & \text{otherwise} \end{cases} \Rightarrow H\_x = 0 \text{ if non-zero, else undefined.} \\\\\\\\
& L(x) = c \cdot x \Rightarrow L\_x = c \text{ (Actually, you SHOULD know this one.)} \\\\\\\\
& \sigma(x) = \frac1{1+e^{-x}} \Rightarrow \sigma\_x = \frac1{1 + e^{-x}} \cdot (1 - \frac1{1+e^{x}}) = \sigma(x) \cdot (1 - \sigma(x)) \\\\\\\\
& \tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}} \Rightarrow \text{sech}^2(x) = (\frac{2e^x}{e^{2x}+1})^2 \\\\\\\\
& \text{ReLU}(x) = \begin{cases} x & \text{if } x \geq 0 \\\\ 0 & \text{otherwise} \end{cases} \Rightarrow \text{ReLU}'(x) = \begin{cases} 1 & \text{if } x > 0 \\\\ 0 & \text{if } x < 0\end{cases} \\\\\\\\
& \text{LReLU}(x) = \begin{cases} x & \text{if } x \geq 0 \\\\ \alpha x & \text{otherwise} \end{cases} \Rightarrow \text{LReLU}'(x) = \begin{cases} 1 & \text{if } x > 0 \\\\ \alpha & \text{if } x < 0\end{cases} \\\\\\\\
& \text{ELU}(x) = \begin{cases} x & \text{if } x \geq 0 \\\\ \alpha(e^x-1) & \text{otherwise} \end{cases} \Rightarrow \text{ELU}'(x) = \begin{cases} 1 & \text{if } x > 0 \\\\ \alpha e^x & \text{if } x < 0\end{cases}
\end{aligned}
$$

### Loss Functions

$$
\begin{aligned}
& L = |\hat{y} - y| \Rightarrow L_{\hat{y}} = \begin{cases} 1 & \text{if } \hat{y} - y > 0 \\\\ -1 & \text{if } \hat{y} - y < 0 \end{cases} \\\\\\\\
& L = (\hat{y} - y)^2 \Rightarrow L_{\hat{y}} = 2\hat{y} - y \\\\\\\\
& L = -y\log\hat{y} - (1-y)\log(1-\hat{y}) \Rightarrow L_{\hat{y}} = -\frac{y}{\hat{y}} - \frac{1-y}{1-\hat{y}}
\end{aligned}
$$

To demonstrate this, let's get our example from earlier.

![Image of an example neural network](/images/resources/cs331/sample-nn.png)

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

We will also need a loss function. Let's use L2 Loss: $L(\hat{y}, y) = (\hat{y} - y)^2$. Recall that we ended up with an output of $0.99505$, which is our $\hat{y}$, and we will suppose that our expected value, $y$ is 3. We will back propagate one layer and identify the learning rule for $w_{2,3}$. First, we need to know how exactly $w_{1,1}$ results in the final loss value, so we need to trace its route in forward propagation.

$$
\begin{aligned}
& z_2 = w_{2,1} x_1 + w_{2,2} x_2 + w_{2,3} x_3 + b_2 \\\\
& f_2 = \text{ReLU}(z_2) \\\\
& z_y = w_{y,1} f_1 + w_{y,2} f_2 + w_{y,3} f_3 + w_{y,4} f_4 \\\\
& \hat{y} = \tanh{z_y} \\\\
& L = (\hat{y} - y)^2 \\\\
& w_{2,1} \rightarrow z_2 \rightarrow f_2 \rightarrow z_y \rightarrow \hat{y} \rightarrow L
\end{aligned}
$$

Then, to perform backpropagation, all we need to do is calculate the partial derivatives for each equation, with respect to the variable that came before it in our chain. We then multiply all the resulting expressions together to get our loss gradient with respect to the target weight. This works because...

$$
\frac{\partial a}{\partial b} \times \frac{\partial b}{\partial c} \times \frac{\partial c}{\partial d} \times \cdot\cdot\cdot \times \frac{\partial y}{\partial z} = \frac{\partial a}{\partial z}
$$

So now let's write those partial derivatives!

$$
\begin{aligned}
& L_{\hat{y}} = 2\hat{y} - y \\\\
& \hat{y}\_{z_y} = \text{sech}^2z_y \\\\
& z\_{y\_{f_2}} = w_{y,2} \\\\
& f\_{2\_{z_2}} = z_2 \\\\
& z\_{2\_{w_{2,3}}} = x_3 \\\\
& \Rightarrow L_{w_{2,3}} = (2\hat{y} - y) \cdot \text{sech}^2(z_y) \cdot w_{y,2} \cdot z_2 \cdot x_3
\end{aligned}
$$

...which results in a value of -1.03623 (to five decimal places). We would then apply this to our target weight or bias using the following:

$$
w \gets w - \alpha L_w
$$

Where $0 < \alpha \leq 1$ is our learning factor. If we had $\alpha = 0.05$, we would update $w_{2,3} = 1.05181$.