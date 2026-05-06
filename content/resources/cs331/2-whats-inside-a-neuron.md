+++
title="2 - What's inside a Neuron"
+++


To understand Neural Networks, we of course need to understand how neurons by themselves work. We outlined this briefly: a neuron has any number of inputs, which are summed together and compared to some threshold -  if that's reached, massively amplify that signal, otherwise output (close to) nothing. There are, of course, a few ways to achieve this.

## I would joke about MPs here, but I don't even want to think about them right now.

**MP Neurons** are by far the simplest type of artificial neuron - they accept any number of inputs, which are digital (1 or 0), there is one digital output, and a threshold can be any natural number. Time for some notation.

- An MP Neuron has $n$ inputs in the form $x_1, x_2, ..., x_n$. For each $i$, $x_i \in \{0,1\}$. The output of the neuron is $y$.
- Each of these inputs may be *excitatory*, meaning they cause the neuron to fire, or *inhibitory*, which when active, completely disable activation.
	- If *any* inhibitory input is 1, then $y=0$. Otherwise, move on.
- Let $z = \Sigma^n_{i=1} x_i$, this sums the inputs and is fed into our *activation function*.
- For an MP Neuron, we use the **Heaviside Function** for our activation function, denoted by $H_\theta(z)$, where $\theta$ is some natural number. We set $y = H_\theta(z)$.
	- $H_\theta(z) = \{ 1, (z \geq \theta), \text{ or } 0, (z < \theta)$

In a diagram, we can represent MP Neurons using a *Rojas Diagram*, which shows all the inputs, whether they are excitatory or inhibitory (denoted using a circle, like in a NOT gate), and the threshold.

![[Rojas Diagram.png]]

There's not much we can do with MP Neurons... but we can use them to represent logic gates!

- For a NOT gate, have one inhibitory input, and set the threshold to 0. This means the neuron will always be activating, *unless* its single input is active... which is exactly how a NOT gate should behave!
- For an AND gate, have two excitatory inputs, and set the threshold to 2, meaning both inputs must activate for the neuron to activate. We can generalise this to an N-input AND gate using N excitatory inputs and a threshold of N.
- Similarly, for an OR gate, two excitatory inputs, and a threshold of 1. To generalise, simply allow N excitatory inputs, but keep the threshold at 1.
- ...You get the idea, you can chain these together to get all the various logic operators.

And then for some code, I'll do this in Pseudo-Python (by which I mean, I haven't touched Python in over a year so I have no idea if this works, so just assume it's pseudocode).

```python
"""
inputs - A list of 0s and 1s
isInhibitory - A list of booleans, the same size as the inputs list.
If |isInhbitory| < |inputs| all further ivalues are treated as false.
"""
def mp_neuron(inputs: [int], isInhibitory: [bool], theta: int) -> int:
	for i in range(len(isInhibitory)):
		if isInhibitory[i] and inputs[i] == 1:
			return 0
	z = sum(inputs)
	if z >= theta:
		return 1
	else:
		return 0
```

So, the MP neuron gives us a nice introduction into artificial neurons. Now let's expand this out to something a bit more useful.

## Doofenshmirtz-ass name

*A platypus?*

**Perceptrons** are a more general, and flexible type of neuron. These now take in any number of inputs where $x_i \in [0,1]$ (meaning any number between 0 and 1 inclusive), and instead of distinguishing inputs as excitatory and inhibitory, we now assign each input its own *weight*, $w_i \in \mathbb{R}$ - then, when we sum together the values to get the input for the activation function, we have $z = \Sigma^n_{i=1} w_i \cdot x_i$. We can adjust these weights as we train our model, so that we can alter its behaviour. We still use the Heaviside function for the activation function for now. The last thing we add is the inclusion of a *bias value* for each neuron, which is the same as the $\theta$ value in our $H_\theta$ function - for perceptrons, we use the more usual form of the Heaviside function, $H(z)$, which sets the "jump", or $\theta$ at 0. In short...

- Let the vector $\mathbf{x} = [x_1, x_2, ..., x_n]$ refer to the inputs for the perceptron. Each is a value between 1 and 0 inclusive.
- Let the vector $\mathbf{w} = [w_1, w_2, ..., w_n]$ refer to the weights for each input. These are real values.
- Let $b$ be the bias value. This is analogous to $\theta$ in an MP neuron.
- The activation function is the *Heaviside function*, $H(z) = \{ 1, (z \geq 0) \text{ or } 0, (z < 0)$.
- Let $z = \mathbf{x} \cdot \mathbf{w} + b$, i.e., the dot product of the inputs and weights, plus the bias.
- Finally, let $y = H(z)$.

Perceptrons also introduce the **Perceptron Learning Rule**, which allows us to fine-tune a model to our needs. Note that what we're talking about is the behaviour of a *single* neuron, which on its own, is only good for binary classification. Remember that we use dozens, if not hundreds or even billions of neurons to perform bigger tasks. The Learning Rule works like this:

- Assign the inputs' weights and bias randomly, such that $\mathbf{w} \cdot \mathbf{x} + b = 0$
	- Note, we will change this to just $\mathbf{w} \cdot \mathbf{x} = 0$ where $\mathbf{w} = [w_1, w_2, ..., w_n, b]$ and $\mathbf{x} = [x_1, x_2, ..., x_n, 1]$. We adjust the values of $\mathbf{w}$.
	- This is to say, we want weights that are orthogonal to our inputs.
- With this model, determine if any inputs are misclassified.
	- Let this set of inputs be $\mathbf{v} = [v_1, v_2, ..., v_n, 1]$.
	- Determine whether $\mathbf{w} \cdot \mathbf{v} \geq 0$, this determines $\mathbf{v}$'s class for this model. Is it the same as what we were expecting?
- If there are misclassified inputs, we need to adjust the weight and bias until these are all gone.
	- For any $\mathbf{v}$ that lies *outside* the classification, when it *should be within*, adjust the weights vector accordingly: $\mathbf{w}\_{new} = \mathbf{w}\_{old} + \mathbf{v}$. (Add to include)
	- For any $\mathbf{v}$ that lies *inside* the classification, when it *should be outside*, adjust the weights vector accordingly: $\mathbf{w}\_{new} = \mathbf{w}\_{old} - \mathbf{v}$. (Subtract to exclude)
	- Assuming the classification is binary (0 or 1), we can unify this expression to $\mathbf{w}\_{new} = \mathbf{w}\_{old} + \alpha \times (\text{target} - \text{predicted}) \times \mathbf{v}$, where $0 < \alpha < 1$ is the *learning rate*.
- Once there are no more misclassified nodes, we can output the final weights and bias.

## Class B Drugs? In MY Neural Network?

*Wait, it's Adaline, not Adderall*

Adaptive Linear Neuron, or **ADALINE** is a single-layer network that operates similarly to perceptrons, but where perceptrons use *step activation* (referring to the use of the Heaviside function), ADALINE uses *linear activation*. This, and the new rules that come with it, assure we get a line of best fit, instead of one that goes back-and-fourth to cram the test data in, as perceptrons do.

- Let our input vector be $\mathbf{x} = [x_1, x_2, ..., x_n]$, and weights vector be $\mathbf{w} = [w_1, w_2, ..., w_n]$, alongside our bias value $b$.
- Let $z = \mathbf{w} \cdot \mathbf{x} + b$
- Let $y = z$. For binary classification, let $y' = 1$ if $y \geq 0$, otherwise let $y' = 0$.

The distinction between $y$ and $y'$ allows us to retain information, which tells us the extent to which the neuron activated (i.e., just barely or very passably?). We can use this to collect the predicted outputs for all neurons in our network to get $y_1, y_2, ..., y_N$ and identify the *Mean Squared Error* (MSE), $E = \frac12 \Sigma^N_{i=1}(\hat{y}_i - y_i)^2$, where $\hat{y}_i$ is the expected/target output for a particular neuron. The learning rule therefore is as follows...

- For the weights vector, $\mathbf{w}\_{new} = \mathbf{w}\_{old} + \alpha \cdot \Sigma^N\_{i=1}(\hat{y}_i - y_i) \mathbf{x}_i$
- For the bias value, $b_{new} = b_{old} + \alpha \cdot \Sigma^N_{i=1}(\hat{y}_i - y_i)$
- (Remember that $\alpha$ is our learning rate!)

## Okay, I lied, we're looking at neural networks now

When we looked at perceptrons earlier, we were just focussed on having a few on the same layer. In fact, just like we did for MP Neurons, we can emulate logic gates with Perceptrons - we even get more control as to where we can place our lines. Given that a Perceptron on its own is essentially a binary classifier which determines if a point lies within a hyperplane (i.e., beyond a certain border). With an AND or OR gate, these are straightforward...

- For AND gates, use the inequality $x_1 + x_2 \geq 1.5$. Hence, we apply weights $[1,1]$, and a bias of $-1.5$.
- For OR gates, use the inequality $x_1 + x_2 \geq 0.5$. Hence, we apply weights $[1,1]$, and a bias of $-0.5$.

But what about something like XOR, we can't just use one perceptron! The solution then, is to use multiple - perhaps even, a **Multi-layer Perceptron** (MLP, not to be confused with the TV show with a uncomfortably big fan base). First, let's break down XOR into something we can work with more easily - we know this operator gives 1 if *either* $x_1$ or $x_2$ are 1, but not both. Immediately, we can simplify this to $(x_1 \vee x_2) \wedge ¬(x_1 \wedge x_2)$. In other words, we combine two perceptrons, one which acts as an OR gate, the other as a NAND.

- We keep our OR gate the same as earlier - weights $[1,1]$ and a bias of $-0.5$.
- For the NAND gate, we need to invert our AND gate.
	- We want to achieve $x_1 + x_2 \leq 1.5$, but we need this to be compatible with the Heaviside function, which uses $\geq$.
	- That inequality is the same as saying $-x_1 - x_2 \geq -1.5$.
	- As a result, we have new weights and bias: $[-1, -1]$ and $1.5$.
- Then, we combine these results, assuming each previous result gives 1. This is simple then, we don't need any weights (so set these to $[1,1]$), and use a bias of $-2$.

This is the basis of an MLP - we form layers of perceptrons, which future layers "combine", to form an output. If you were to view these on a graph, you're essentially using a bunch of lines and logic gates to create regions of classification. It's almost like... vector graphics.

## FUNCTION! ACTIVATE!

You should already know by now what an activation function is, as we've already gone over the Heaviside function in depth, but based off of the models we've already made, we can swap this out with functions that perform a similar role. Doing so prevents our neural networks from acting entirely linearly, and allows us to normalise outputs.

### Heaviside Function - $H(x)$

*So imagine a great big cliff...*

$$
H(x) =
\begin{cases}
	1 & \text{if } x \geq 0 \\\\
	0 & \text{otherwise}
\end{cases}
$$

We've of course used this for MP Neurons and Perceptrons, and this is typically used for *binary classification problems*. However, this might not always be an ideal choice, since it has no gradient, so we can't distinguish between a neuron firing just barely, or due to a massive input, for example.

### Linear Function - $L(x)$

*Y'know, like, lines.*

$$L(x) = c \cdot x, \text{ where } c \in \mathbb{R}.$$

Now this function lets us capture the proportion between the output and its inputs, it's no longer purely digital. This is useful for *linear regression* applications. However, if we were to *just* use linear activation functions in a neural network... then you simply have an overcomplicated linear equation, and the concept of layers, completely vanishes! Also keep in mind that the derivative of this function is merely $c$, which has no relation to $x$.

### Sigmoid Function - $\sigma(x)$

*Second ring, third activation function*

$$\sigma(x) = \frac1{1 + e^{-x}}$$
This activation function forms a nice, continuous S-shaped curve, which tends towards 1 as it approaches infinity, and 0 at negative infinity - it's *normalised* between these. This allows us to clearly split data, while still maintaining relativity and preventing loss of information. It's notably useful in *logistic regression*. But, there's virtually no distinction between, say $\sigma(10)$ and $\sigma(100)$ (0.00005, to 1 s.f.) - a *vanishing gradient*. This function also isn't zero-centred at $\sigma(0) = \frac12$, and the use of both exponential functions and division makes it computationally expensive.

### Tanh Function - $\tanh(x)$

*I swear I'm not the tanner this time, I'm definitely a werewolf, trust*

$$\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}$$
Like the sigmoid function, tanh produces a nice, smooth S-curve, but it's now zero-centred! This also means that where $x$ tends towards negative infinity, this function tends towards -1, meaning it's normalised between 1 and -1. It's used in Recurrent Neural Networks, which we'll talk about later. Much like the sigmoid function, it suffers from the *vanishing gradient problem*, and uses even more exponential functions!

### Rectified Linear Unit - $\text{ReLU}(x)$

*Isn't that a Pokémon? The one that turns into a bipedal blue dog?*

$$
\text{ReLU}(x) = \max(x,0) = \frac{x + |x|}2 =
\begin{cases}
	x, & \text{if } x \geq 0 \\\\
	0, & \text{otherwise}
\end{cases}
$$
ReLU combines the simplicity provided by the Heaviside function, along with the continuity provided by the Linear function. Coincidentally, its derivative is very similar to the Heaviside function (but $\text{ReLU}$ is not a continuous function and is therefore not differentiable!). This is more simple to calculate, and for any positive values, doesn't have a vanishing gradient. ReLU is used in a range of applications that use MLP. It should be noted though, that ReLU has a unique problem, *Dying ReLU*, where the affected neuron's output remains pinned at 0, making it inactive - this could happen due to a poor choice of weights. It's also not zero-centred.

### Leaky Rectified Linear Unit - $\text{LReLU}(x)$

*Oh dear.*

$$
\text{LReLU}(x) = \frac{1 + \alpha}2x + \frac{1 + \alpha}2|x| =
\begin{cases}
	x, & \text{if } x \geq 0 \\\\
	\alpha x, & \text{otherwise}
\end{cases}
$$
Leaky ReLU solves the biggest issue with ReLU: the constant 0 value for all negative inputs, by defining a gradient $\alpha$, which introduces a slowed decrease in the output. Now, not only does this address the vanishing gradient problem, but also the dying ReLU problem. It's also used in MLPs, is still not differentiable at 0, and is not zero-centred. Also, finding what value $\alpha$ should be, may not be a trivial task! This may be preset in the model, or it can be *learned* in a variant called **PReLU**, which while convenient, very costly in terms of compute.

## Exponential Linear Unit - $\text{ELU}(x)$

*It eludes me greatly*

$$
\text{ELU}(x) =
\begin{cases}
	x, & \text{if } x \geq 0 \\\\
	\alpha (e^x - 1), & \text{otherwise}
\end{cases}
$$
ELU fixes another one of ReLU's issues, which LReLU also has: not having a nice, smooth, continuous tail up to $x=0$. Whoops, got a little carried away. Despite still not being zero-centred, if $\alpha = 1$, ELU is differentiable! It also doesn't suffer from the *dying ReLU problem*, and has no vanishing gradient in its linear portion. That is to say, of course, that there *is* a vanishing gradient in the exponential portion, which itself is quite computationally expensive, especially on top of needing to learn the $\alpha$ value. Again, ELU sees a lot of use in MLPs.

### Softmax - $\text{SoftMax}(\mathbf{z})$

*Wish I was at home with my plushies, wrapped in my duvets and softmaxxing*

Softmax is a bit different, using an input of a vector, $\mathbf{z}$, of size $N$, a number of classes we are testing for, and normalising them into an output vector, $\mathbf{y} = \text{SoftMax}(\mathbf{z})$. This output vector is a *probability distribution*, meaning all its values are positive, and sum to give 1.

$$
y_i = \text{SoftMax}(\mathbf{z})\_i = \frac{e^{\mathbf{z}\_i}}{\Sigma^N\_{i=1}e^{\mathbf{z}_j}}
$$
At first, it seems very excessive to use exponents like this, but if we were to just normalise the inputs by themselves, we might end up with negative probabilities - those don't exist! As such, we need to use a function which maps from $(-\infty,+\infty)$ to $(0,+\infty)$, and is always increasing relative to its value (the absolute function doesn't do this, for example) - and whaddya know, $e^x$ fits the bill perfectly. We may use Softmax for multiclass classification (where one thing could be in multiple classes). Also, if we have $N=2$, which means we are testing for two classes, *binary classification*, if you will, then this basically becomes the Sigmoid Function.

### Maxout - $M_k(x)$

*OutMaxxing each other sounds like a good way to end up in the hospital. Or screw up your face.*

$$
y = M_k(x) = max\{w_1x + b_1, w_2x + b_2, ..., w_kx + b_k\}
$$
Okay this looks scary, but it's not that bad. Maxout is another weird activation function, essentially combining the pre-activation and activation phases. The value $k$ defines how many neurons are in this Maxout layer, and we define $k$ weight vectors $w_i$ which will weight each input at each neuron independently, along with $k$ bias values, one for each neuron. We then take the dot product of the input vector $x$ and $w_i$, then add the bias, $b_i$, then select whichever neuron produced the largest value.

Maxout generalises ReLU, LReLU and Abolute ReLU, and is able to do better than all three of them - being able to learn a convex function using just one Maxout unit, and with two in an MLP, *any continuous function*. Hope you have plenty of compute to boot though, as Maxout requires you to introduce a ton more neurons to your model, and naturally, even more parameters to train. It truly does everything to the max.