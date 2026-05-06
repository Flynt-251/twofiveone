+++
title="5 - Hopfield Networks"
+++

This is where things start getting a little complicated. Up to this point, we've just focussed on neural networks that only *feed forward*, we're yet to see a case where a neuron feeds data *backwards*. Well, guess what we're going to cover next?

**Hopfield Networks** are neural networks that consist of just one layer of perceptrons, which are all linked to each other, except themselves. So, that's great, they're all screaming at each other - what does that achieve? Well, given our activation function and weights, we can train Hopfield networks to achieve *associative learning*, where certain stimuli trigger a particular output, from the model's own memory, namely being able to recognise patterns. Sound familiar? It ties into Pavlov's work from earlier. Say, does anyone else fancy going on a walk right about now? Note that this isn't the same as a recurrent neural network - it's a subset.

To use fancy mathematical terms, we can define a Hopfield network as a *complete, weighted graph* $G = (V,E)$. Each perceptron $i \in V$, has a state $x \in \{0,1\}$ or $\pm1$, weights are symmetric, i.e. $W_{i,j} = W_{j,i}$, and there are no self-loops ($W_{i,i} = 0$).

Hopfield networks work on the basis of *fixed-point iteration*, which allows us to find points that remain unchanged in a transformation of a function (or, a more relevant application, finding where two functions are equivalent). This works on the basis of "guessing" some number $x_1$, and passing this through the function such that we get a sequence $x_{k+1} = f(x_k)$, where we eventually land on $x^*$, which is the solution we're looking for - we converge towards the solution, sometimes called a stable state or an attractor. Similarly, Hopfield Networks manipulate inputs to stabilise them towards a solution.

## Okay, this is brain science

*Wait, it's either rocket science or brain surgery, isn't it? Ah well.*

Back to associative learning, Donald Hebb proposed that *"Neurons that fire together, wire together"*, and *"Neurons that fire out of sync, fail to link"*. These are known as the **Hebbian Learning rules**, and describe how strength increases between synaptic strength increases with simultaneous activation: if two neurons share the same state, then this results in a positive output on the synapse connecting them. In a Hopfield network, this is represented with multiplication: $W_{i,j} = x_i \cdot x_j$ where $(i \neq j)$ and $W_{i,i} = 0$.

So, to learn a bipolar (1 or -1) pattern $\overrightarrow{x} = [x_1, x_2, ..., x_n]^T$, we create a weight matrix $W = \overrightarrow{x} \cdot \overrightarrow{x}^T - I$. This directly captures the Hebbian Learning Rule behaviour by synchronising elements that carry the same value, and disabling those that are different. In the case of pattern recognition of a binary bitmap of $m \times n$ 1-bit pixels, we convert this image into a column vector. If we have $N$ *binary* bitmaps that we want to be recognised by the same model, then we create a single weight matrix as follows (keeping in mind we want to convert the format to bipolar):

$$
W = \frac1N \sum^N_{p=1}(2\overrightarrow{x}^{(p)}-1)(2\overrightarrow{x}^{(p)}-1)^T - I
$$

## Training to be mentally stable

*Something I could use rn*

So now we have our weight matrix, we need to ensure our model is able to keep its neurons in a stable state, or reach a fixed point, or "attractor", or rather simply, that all the neurons' outputs converge - if they don't, we'll get inconclusive results. This means we need to know how neurons get inputs and how they pass outputs. The general formula is $\overrightarrow{s}(t+1) = F(W \cdot \overrightarrow{s}(t))$, where $F$, our activation function for bipolar Hopfield networks, is the sign function (i.e., extracts positive or negative 1 from an input). So, when we're updating a single neuron $i$...

$$
s_i(t+1) = \text{sign}(\sum^n_{j=1} W_{i,j} \cdot s_j(t))
$$

*If a model is only remembering one pattern, this will always result in a stable set of neurons.* This is fairly straightforward to see, since when we use the above equation, we end up multiplying 1s and -1s together, such that we essentially extract the same sign on every iteration (I'm not going to bother giving the whole proof). But what about when we're recognising multiple patterns? Then because we're not just working with 1s and -1s, this is a little more uncertain. Yet again, there's a great big equation going over how to rearrange for this, but to put it simply, we define the term $\epsilon_i$, where $s_i(t+1) = x_i^{(q)} \cdot \text{sign}(\epsilon_i)$. The full definition is as follows:

$$
\epsilon_i = \frac{n-1}N + \frac{x_i^{(q)}}N \sum_{j \neq i} \sum_{p \neq q} x_i^{(p)} \cdot x_j^{(p)} \cdot x_j^{(q)}
$$

For a bitmap $q$, this is only a stable pattern if there is a fixed point $\overrightarrow{x}^{(q)} = \text{sign}(W \cdot \overrightarrow{x}^{(q)})$. We can check this by checking each neuron $i$ such that $\epsilon_i > 0$. The probability that we move away from a stable pattern state is the same as that, given a neuron $i$, we find a value $\epsilon_i > 0$.

## I'm getting tired of this s\*\*\*

**Energy** in a Hopfield network describes the network's ability to keep evolving. It will continue to evolve until it comes to a local minimum. It's the sum of each pair of neurons combined with the weight of the edge that connects them together, and it decreases each time the neuron state changes.

$$
E = - \sum_{j>i} \sum^n_{i=1} s_i \cdot W_{i,j} \cdot s_j = -\frac12 \overrightarrow{s}^T W \overrightarrow{s}
$$

