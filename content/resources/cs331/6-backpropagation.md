+++
title="6 - Backpropagation"
+++

Remember the work we did on loss functions? Up to this point, they haven't served much purpose other than to demonstrate how accurate a model is, but now we change that as we utilise backpropagation. **Backpropagation** is the process of using the chain rule of derivation to determine the gradient of loss with respect to the network's weights. We can then use this to fine-tune our model as we need by adjusting the weights, by applying the function $w \gets w - \alpha L_w$, where $\alpha$ is our much-beloved learning rate. This idea takes inspiration from *gradient descent*, which is a trial-and-error approach to finding the minimal value of a function.

To demonstrate this, let's get our example from earlier.

![Sample Neural Network](/images/resources/cs331/sample-nn.png)

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

We will also need a loss function. Let's use L2 Loss: $L(\hat{y}, y) = (\hat{y} - y)^2$. Recall that we ended up with an output of $0.99505$, which is our $\hat{y}$, and we will suppose that our expected value, $y$ is 3. We will back propagate one layer and identify the learning rule for $w_{1,1}$. First, we need to know how exactly $w_{1,1}$ results in the final loss value, so we need to trace its route in forward propagation.

$$
\begin{aligned}
& z_1 = w_{1,1} x_1 + w_{1,2} x_2 + w_{1,3} x_3 + b_1 \\\\
& f_1 = \text{ReLU}(z_1) \\\\
& z_y = w_{y,1} f_1 + w_{y,2} f_2 + w_{y,3} f_3 + w_{y,4} f_4 \\\\
& \hat{y} = \tanh{z_y} \\\\
& L = (\hat{y} - y)^2 \\\\
& w_{1,1} \rightarrow z_1 \rightarrow f_1 \rightarrow z_y \rightarrow \hat{y} \rightarrow L
\end{aligned}
$$

Then, to perform backpropagation, all we need to do is calculate the partial derivatives for each equation, with respect to the variable that came before it in our chain. We then multiply all the resulting expressions together to get our loss gradient with respect to the target weight. This works because...

$$
\frac{\partial a}{\partial b} \times \frac{\partial b}{\partial c} \times \frac{\partial c}{\partial d} \times \cdot\cdot\cdot \times \frac{\partial y}{\partial z} = \frac{\partial a}{\partial z}
$$

So now let's write those partial derivatives!

$$
\begin{aligned}
& L\_{\hat{y}} = 2\hat{y} - y \\\\
& \hat{y}\_{z_y} = \text{sech}^2z_5 \\\\
& z\_{5\_{f\_1}} = w_{y,1} \\\\
& f\_{1\_{z\_1}} = z_1 \\\\
& z\_{1\_{w\_{1,1}}} = x_1 \\\\
& \Rightarrow L_{w_{1,1}} = (2\hat{y} - y) \cdot \text{sech}^2(z_5) \cdot w_{y,1} \cdot z_1 \cdot x_1
\end{aligned}
$$

And if you're curious, the value we end up with for the gradient with respect to $L\_{w\_{1,1}}$ is... zero. I guess I forgot that $w\_{y,1} = 0$. How anticlimactic!