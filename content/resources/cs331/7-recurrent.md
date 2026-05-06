+++
title="7 - Recurrent Neural Networks"
+++

After looking at Hopfield Networks, we're now starting to get warmed up to the idea of neurons that are on the same layer and feeding data to each other. This should provide us enough warm-up to start talking about **Recurrent Neural Networks (RNNs)**, where each neuron now has an internal state or *memory*, where it stores its last output, and uses this as an input, usually onto itself. Where in a feed-forward network, there was no concept of such. This new ability to remember past information now means the *order* in which we feed inputs into a neuron matters, which would make sense: we're going from a stateless to a stateful model. RNNs are particularly useful for sequential data applications, such as sentiment analysis, speech recognition, Named-Entity Recognition or (sigh) stock market prediction.

Let's suppose we have a neuron with a linear activation function, no bias, and one weighted input, with that weight being 1. We'll model the neuron as a function. In other terms, $f(x) = x$. In a feedforward network, if we pass the set of inputs $[1,2,3]$, we end up with the output $[1,2,3]$... obviously. But note that if we swapped elements around, say, $[1,3,2]$, we get $[1,3,2]$, which suggests that the order of the data doesn't really matter. Now if we have a neuron with memory, like in an RNN, we get this:

$$
\text{mem}_{f_0} \gets 0, f(x, \text{mem}_f) = \begin{cases}
x + \text{mem}_f\\
\text{mem}_f \gets x + \text{mem}_f
\end{cases}
$$

Or, assuming we wanted to use the $\tanh$ activation function...

$$
h_t \gets \tanh\begin{pmatrix}W[\frac{h_{t-1}}{x_t}]\end{pmatrix}
$$

Where $h_t$ refers to the "hidden state".

So, using the first example, with our input of $[1,2,3]$, we get $[1,3,6]$. But, if we swapped 2 and 3 around to get $[1,3,2]$, we now have $[1,4,6]$, which is entirely different! Now the output of a neuron is dependent on *all* the data that has passed through it, not just the current input. Going back to Named-Entity Recognition, this is important as we can store previous context and tie it to our target entity.

## Multiple ways to do the same thing

*Because of course there is*

Note that there are two ways of capturing the state for the next iteration: saving the direct output of our internal state, or saving the output itself. These are each called **Elman Networks** and **Jordan Networks** respectively. This distinction is important as we may weight our output, so an Elman network would NOT apply this weight when saving to memory, whereas a Jordan network would. We might also apply an *output bias*, which similarly, we would apply for a Jordan network, but not an Elman network (just as a reminder, any bias we apply at the input level will always apply).

## We need to go deeper

*I swear there's a CS141 lecture with that title*

We can stack layers of RNNs together, such that our output state is passed not just to the same neuron, but to a subsequent layer too, which is known as a **Deep RNN (DRNN)**. Note that we can make an RNN deep in two senses of the word:
- vertically, where we stack RNN layers one-after-another,
- horizontally, where on one hidden layer, we pass an output through multiple neurons, before returning its output to the neuron we started at. This gives us multiple memory states on the same layer.

## Two-way road

A **Bidirectional RNN (BRNN)** combines two otherwise independent RNNs, and feed them both the same data, one in forward sequence, and the other in backwards sequence. Each output is concatenated together at each time step to give a final output.

## Looks Sloppy to Me! (LSTM)

*I'm getting ahead of myself, we're not talking about generative AI yet.*

Because we introduce a new factor into RNNs, time, backpropagation gets a bit more complicated, but it is possible using *Backpropagation Through Time (BPTT)*. The basic premise of it goes something like this:

$$\frac{\partial L}{\partial W_y} = \frac{\partial L}{\partial L^{(1)}} \cdot \frac{\partial L^{(1)}}{\partial \hat{y}^{(1)}} \cdot \frac{\partial \hat{y}^{(1)}}{\partial W_y} + \frac{\partial L}{\partial L^{21)}} \cdot \frac{\partial L^{(2)}}{\partial \hat{y}^{(2)}} \cdot \frac{\partial \hat{y}^{(2)}}{\partial W_y} + \cdot \cdot \cdot + \frac{\partial L}{\partial L^{(T_y)}} \cdot \frac{\partial L^{(T_y)}}{\partial \hat{y}^{(T_y)}} \cdot \frac{\partial \hat{y}^{(T_y)}}{\partial W_y}$$

So we have to apply our weight several times, and $T_y$ can of course get pretty big based on how much sequential data we're passing. This becomes a problem because after a while, multiplying the same item by itself causes it to start growing or shrinking massively. This is known as the **Vanishing Gradient Problem**, or **Exploding Gradient Problem**, depending on whether the gradient shrinks or grows. This means we now need to find a way to limit a gradient so we don't lose control of it. So, this is where **Long Short-Term Memory (LSTM)** comes in.

### Cut it out!

So, each neuron has an additional "memory" state to it. Referring to previous work we've done on memory cells (CS132 anyone?), there are three things we can do - write to it, read from it, or clear it. Up to this point, we do all of these without any control - so we cannot, for instance, delete something that's in memory part of the way through execution of a model. *This is the control that LSTM provides* - now we can prevent an output from being written to the memory, force the memory value to be forgotten, or prevent it from being read from.

This is all done via the use of three gates: input ($i$), output ($o$), and forget ($f$). When $i$ or $o$ are 1, these enable the flow of data, and the memory cell will retain data where $f = 1$, else it will forget it.

$$
\begin{aligned}
& c_t \gets f_t \cdot c_{t-1} + i_t \cdot a_t \\\\
& a_t \gets \tanh\begin{pmatrix}W[\frac{h_{t-1}}{x_t}]\end{pmatrix} \\\\
& h_t \gets o_t \cdot \tanh(c_t) \\\\
& \begin{bmatrix}f_t \\\\ i_t \\\\ o_t\end{bmatrix} \gets \sigma(\begin{bmatrix}W_f \\\\ W_i \\\\ W_o\end{bmatrix} [\frac{h_{t-1}}{x_t}])
\end{aligned}
$$

$c_t$ is our memory cell, where we decide whether we want to keep our originally stored value ($f_t$), and whether to store the output of this current time step ($i_t$), which is defined as $a_t$. The output, or "hidden cell" will be passed based on whether we have enabled the output gate $o_t$. We use the $\tanh$ activation function, as this normalises our values to the range (-1,1), and each of our gates is bounded to \[0,1\].

I have a feeling you're wondering $W_{t_f}$ each of the $W$ matrices are at the bottom, so I'd better explain. These are our *weight matrices* for each of the gates, which start as random values and are adjusted in training, just like with any other weight. These are multiplied with our current input and hidden cell to decide the values for each of the gates on the next iteration. These then use the sigmoid activation function to normalise everything between 1 and 0 - this does mean we can end up with somewhere in-between the two values, but given the way we've defined everything, that's by design. The above notation looks a little confusing, so here's how each one is calculated.

$$
\begin{aligned}
& f_t \gets \sigma(W_f[\frac{h_{t-1}}{x_t}]) \\\\
& i_t \gets \sigma(W_i[\frac{h_{t-1}}{x_t}]) \\\\
& o_t \gets \sigma(W_o[\frac{h_{t-1}}{x_t}]) \\\\
\end{aligned}
$$

(Also I just clocked, those aren't meant to be fractions, they're meant to be vectors showing the hidden cell and input.)

LSTMs are often used for word prediction (which is basically what an LLM is by the way!), since we now have this control over how the model functions - we can *forget* and *deny input* for any unnecessary words, while accepting input for useful words, and only allowing *output* where we need to fill a word.

## Defining what goes where

*It goes in the square hole!*

As one final note with RNNs, there are a few more ways to stitch everything together in terms of inputs and outputs.

- **One-to-one** - We input one sequence of data, and get one sequence out.
- **One-to-many** - Input one sequence, get more than one out. We might achieve this by passing the input to multiple neurons, or using a DRNN.
	- This has been used in Music Composition by [Huawei](https://web.archive.org/web/20190507161442/http://consumer.huawei.com/uk/campaign/unfinishedsymphony/), for example.
- **Many-to-one** - Multiple sequences of input aggregate into one output sequence. Again, this may be done with a DRNN
	- This is used in semantic analysis, to create one rating from multiple reviews.
- **Many-to-Many** - Multiple sequences in, multiple out, you get the idea...
	- $|X| = |Y|$ - Named-Entity Recognition
	- $|X| = |Y|$ - Language Translation, since the same sentence may be of a different number of words in another language, e.g. "Thank you" becomes "Merci".
		- **Attention** is a concept which lets us encode sentences into fixed-length vectors, allowing us to select a subset of these to translate adaptively.