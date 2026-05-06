+++
title="A - GANs and GNNs"
+++

Bleugh, we're now talking about generative AI and I'm not particularly pleased about it. Just have a look at CS357 and you'll see what I mean. Anyway, let's get on with it.

## Cops and Robbers

*No sir, this £50 note is not AI generated!*

**Generative Adversarial Networks (GANs)** are deep learning models used to generate "new" data based on what it has been trained on. These rely on two neural networks, one called a **Generator**, and the other, a **Discriminator**. A Generator is trying to learn how data is generated, and tries to mimic this behaviour, while a Discriminator is trying to label data and predict what label a new piece of data would have. This is like the difference between looking at a deck of cards, and trying to create a convincing random sequence, and predicting what the next card in the sequence is.

In a GAN, the generator and discriminator are trained together. This doesn't mean they're working together, more... against each other. The generator starts with noise data, which it uses to create fake samples that try to mimic the data it's trained on. This data is passed to the discriminator, who tries to determine if that data is real or not. This verdict then directs the training for both models in the next step. The idea is, the generator will then become so good at generating convincing data that the discriminator fails to discern real and fake data. If you're fascinated by the idea of two models competing against each other like this, you might enjoy learning more about *game theory*.

Now to introduce the mathematical notation. Each of the models is presented as a function, $G(z)$ and $D(x)$ (or $D(G(z))$). $z \sim p_z$ denotes the random noise that $G$ bases its fake data on, and $x \sim p_{\text{data}}$ is the real data that $D$ is trying to determine is real, as opposed to $G(z)$. Altogether, this is formulated as a **minimax game**, which means that the generator is trying to gain the highest "score" it can against the discriminator.

$$\min_G \max_D V(D,G)$$

And our function $V$ looks like this:

$$
V(D,G) = \mathbf{E}\_{x \sim p\_{\text{data}}}[\log D(x)] + \mathbf{E}\_{z \sim p\_{z}}[\log(1 - D(G(z)))]
$$

We take the $\log$ of $D$, as this amplifies the decision. Relatively speaking, the output of 1 is very small, and has no gradient - this can suffer from the vanishing gradient problem without the use of $\log$.

To end our discussion on GANs, we will also show what the optimal discriminator is, for some *fixed* generator $G$. There is a proof for this, but I'll only put that in once I get my coursework feedback in, and only if there's demand for it.

$$
D^*(x) = \frac{p_{\text{data}}(x)}{p_{\text{data}}(x) + p_g(x)}
$$

Note that $g$ refers to the generator's distribution, i.e. the fake data.

## Good Nighty Night!

*I'm feeling sleepy...*

A **Graph Neural Network (GNN)** is a neural network that is specialised to take in graphs as its input. This could be, for example, to perform node classification/encoding. Out in the real world, GNNs are used in protein folding, recommender systems, computer vision, NLP and a lot more.

GNNs first start with a graph encoder, or a set of *Message Passing Layers (MPL)*, which takes in node vectors from the input graph, and returns embeddings. The MPL function performs a series of non-linear transformations to the graph, or *convolutions*, passes these through an activation function, regularises the output, and then performs further convolutions to produce embeddings.

The term "convolution" might be familiar, from, say, *Convolution Neural Networks*, which perform convolutions on input data, before passing through activation, regularising and outputting. We can generalise this concept and get **Graph Convolutional Networks**, which is able to pick up features of a graph through, you guessed it, convolutions. These are based on a starting vector, whose local neighbourhood is identified, and while defines a computation graph. Given starting node vector $\mathbf{x}_v$, the hidden layer function's base case is defined as follows: $\mathbf{h}_v^{(0)} = \mathbf{x}_v$. We then iterate through each layer $k$ as follows:

$$
\mathbf{h}\_v^{(k+1)} = \text{ReLU}(\sum\_{u \in N(v)} \frac{\mathbf{h}\_v^{(k)}}{|N(v)|} \mathbf{W}_k + \mathbf{h}_v^{(k)}\mathbf{B}_k)
$$

Where $\mathbf{W}_k$ and $\mathbf{B}_k$ are matrices of trainable weights, the former for neighbourhood aggregation, and the latter for transforming the hidden vector $\mathbf{h}_v^{(k)}$. We repeat this, starting with each node of the graph.

As ever, we can make everything much nicer for ourselves with the power of MOAR MATRICES! We define $\mathbf{D}$ as a diagonal degree matrix where $\mathbf{D}_{v,v} = |N(v)|$, $\mathbf{A}$ as the adjacency matrix of the graph and $\mathbf{H}^k$ as the collection of hidden matrix embeddings. We then get...

$$
\mathbf{H}^{(k+1)} = \text{ReLU}(\mathbf{D}^{-1}\mathbf{AH}^{(k)}\mathbf{W}_k + \mathbf{H}^{(k)}\mathbf{B}_k)
$$

And, what neural network would be complete without a loss function?

$$
\mathcal{L} = - \sum y_v \log(\sigma(\mathbf{z}^T_v \theta)) + (1-y_v)\log(1-\sigma(\mathbf{z}^T_v \theta))
$$

$y_v$ refers to the node class label, $\mathbf{z}_v^T$ is the encoder output, and $\theta$ is a classification weight. We may even hit a point where we can generate embeddings for nodes of a graph we didn't train on!

It is now 21:21 on Wednesday 6th May. I think I'm good to call it there. Good Nighty Night, fellow student (or curious critter)!