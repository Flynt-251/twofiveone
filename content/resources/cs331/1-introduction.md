+++
title="1 - Introduction to Neural Networks"
+++


First, let's clarify what a neural network actually is, in relation to the whole universe of AI. Neural computing is a subset of machine learning, which itself is a subset of artificial intelligence. It achieves "learning" by mimicking how a series of biological neurons work, by connecting to one another, and bouncing signals off of one another, to produce a final output. Note that this means that we can make a machine "learn" without the use of a neural network. [Even I've managed to do this before.](https://github.com/Flynt-251/hexapawn.py) And, "AI" has been around and in use for decades - just consider NPC opponents in games such as the Mario Kart series, for example.

## Relax, it's not brain surgery

*Just the science of it. No medical degree required.*

The central nervous system consists of the brain and spinal cord, with the latter consisting of over a hundred billion neurons. Each of these neurons receive an electrical signal, which may or may not cause it to "fire", or massively amplify this signal in its own output - think of it as a biological logic gate. A single **neuron**, or nerve cell, has four components:

- *Dendrites* are inputs from other neurons, these inputs are summed together to decide whether or not the neuron fires.
- The *Soma* is where the cell's nucleus sits, and where the decision to fire takes place.
- The *Axon* transports the signal to its outputs. The larger in diameter this is, the faster the signal moves.
	- It may also be coated in a myelin sheath to protect said signal, and if this weakens, it could reduce transmission rate, leading to problems like blindness or cognitive impairments. One way to prevent this is, don't eat only crisps and chips for years on end.
- *Synapses* then finally take that signal, and pass it onto other neurons. These typically work using chemicals called *neurotransmitters*.
	- If you've ever heard of Botulism before, the symptoms are caused by cells becoming unable to register the receival of neurotransmitters. Word of advice, don't take it, if it's nacho cheese.

Sense organs relay information into signals into *sensory neurons*. This creates an **action potential**, which if high enough, will cause the neuron to fire. Signals pass through *relay neurons*, until they reach the *motor neurons* which cause muscle tension or relaxation.

Electrical charges are achieved using ions, similar to how a battery works - using ions of Sodium (+) and Potassium (-) (formerly known as Kalium, as per its symbol on the periodic table ☝️). Normally, there is more sodium outside the nerve cell, and more potassium inside it, and if we were to measure this *potential difference*, we would get a reading of about -70mV (-0.07 Volts). This is called the **Resting Potential**. Now, to cause a neuron to fire, these need to move around. So, a combination of *channels* allow these ions to do so.

- *Leaky Channels* are always open - naturally potassium will move out, and sodium in, as nature likes to be balanced.
- *Voltage-Gated Channels* will allow flow, only at certain voltage levels - this excludes resting potential.
- *Sodium-Potassium Pumps* exchange the two types of ions - trading three sodium ions outwards for two potassium ions inwards. This is to equilibrate the cell back to resting potential after firing.

Various stimuli will then cause this balance to change, such that we move away from the resting potential to a higher **Threshold Potential** of -55mV - note that sometimes a nerve cell moves towards this, but then equilibrates without any further action. However, if we do reach this threshold, then the Sodium Voltage-Gated channels will push Sodium into the cell, causing the voltage to *depolarise* massively into a +30mV spike, or **Action Potential**. The Potassium Voltage-Gated channels then open up to bring Potassium back into cell, and *repolarise* it back to resting potential. Usually, this causes an overshoot or, *hyperpolarisation*, before the charge re-equilibrates back to -70mV.

## Wait... am I in the wrong class?

Alright, back to computers. It makes sense that if we want to make a computer as intelligent as a human, we may want to mimic how that intelligence is achieved - hence, neural computing. So, to mimic a neuron, we need some excerpt of code that, for example, does the following:

- Take in a set of $n \in \mathbb{N}$ inputs, such that $x_i \in \mathbb{R}$ where $1 \leq i \leq n$.
- Perform the calculation $x_{\Sigma} = \Sigma^n_{i=1} x_i$
- Check if $x_{\Sigma} > \theta$, some threshold value.
	- If not, do nothing, or output a relatively small value.
	- Otherwise, output a relatively huge value.

... And then we stick a bunch of these together. When we stick these together, we represent it as a network, an **Artificial Neural Network** (ANN), like this:

![https://en.wikipedia.org/wiki/Neural_network_(machine_learning)#/media/File:Colored_neural_network.svg]

These networks are split into layers, where for each layer, its neurons will receive input from the previous layer, and pass outputs to the next one. There are three types of layer: one input layer, where we first feed in our data, or parameters, one output layer, and any number of hidden layers, which is usually where the bulk of our processing takes place. From this architecture stems a few different types of network.

- **Single Layer Network** - No hidden layers
- **Shallow Network** - One or two hidden layers.
- **N-Layer Network** - A network which has N hidden layers.
- **Deep Neural Network (DNN)** - Multiple hidden layers, used in *Deep Learning*.

Also, you may note that in this example from Wikipedia, we always advance to the next layer, there is no *feeding back*, as it were. This is called a **Feedforward** Network. It is indeed possible to have neurons feed back into themselves or onto previous neurons, and this is usually classed as either a **Recursive Neural Network** (RNN) or **Long-Short Term Memory** (LSTM). We will go over all of these later.

## This is what you came here for.

*Ugh, learning? Gross.*

To wrap this page up, we'll quickly go over all the types of learning associated with ML, and by extension, Neural Networks.

**Supervised Learning** is used when we want to utilise ML to classify things, like identifying animals in pictures, for example. Given our input dataset $X = \{x_1, x_2, ...\}$, we associate each piece of data $x_i$ a label $y_i \in \{a, b, c, ...\}$, such that each piece of data fits one class. We then *train* the ML model on this data, and then, using a new set of unlabelled data, ask the model to classify this data to make sure it has the right idea. It may still not understand the difference between cows that are small, and those that are far away.

**Unsupervised Learning** takes an ML model, passes it some data, and sees what it produces. This is usually used for clustering problems, similar to classification but... looser. It's essentially like teaching someone to draw, and then saying *"Okay, now that you know how to use a pencil, draw whatever you like"*. Except I don't think AI should ever draw, but that's another topic for another module. The training phase here gets the model to reproduce a certain dataset, given inputs and its associated outputs, before then working on a different dataset whose outputs can be analysed.

**Semi-supervised Learning** is an intermediary between the two above learning types, where a dataset is provided, partially labelled. This keeps the model grounded, as it performs a certain task, and the use of partial labelling means that we have less cost associated to training - we don't need to provide a fully labelled "training" dataset, which depending on our task, may be a monumental task.

**Reinforcement Learning** starts with no data, and gives no explicit answer. Instead, it gets an *agent*, an AI model which reads and acts on an environment, to analyse its environment to identify its state and any "reward", perform actions, re-analyse, and repeat. It can be boiled down to: *if you see this happen, do this action*. This is what powers self-driving cars and AlphaGo, or more entertainingly, those "I taught AI to play this video game..." YouTube videos. Let's use that last example on, say, Space Invaders - a reward would be destroying an alien, and a punishment would be the AI having its own ship get destroyed - the agent would be constantly watching the screen to see where it should shoot so that it can destroy aliens, while avoiding getting killed.

Now, I'm not sure why this is in this module, but **Pavlovian Conditioning** (or, Classical Conditioning) is mentioned here. I suppose it's analagous to Reinforcement Learning, in that an agent is taught to respond to a particular stimulus in a certain way, by accompanying said stimulus by a reward. Of course, this traces back to Ivan Pavlov. In the case of Pavlov, while doing experiments about the process of digestion works in dogs, he would extract digestive fluids so he could analyse them, including saliva. He noticed that the dogs he collected samples from would salivate in the presence of the technicians who fed them, rather than just salivating at food - he then looked into this, feeding the dogs after ringing a bell, noticing that, indeed, after a while of this, at just the sound of the bell, the dogs would salivate. I drew this one out as I imagine most people wouldn't know the full context - I had no idea that Pavlov's intentions were completely different to begin with!

Who's a good boy? Sorry, I had to do it...

