+++
title="8 - Natural Language Processing"
+++

*Not to be confused with MLP*

**Natural Language Processing (NLP)** is the process of using AI to understand, interpret, or produce human language. This is applicable to multiple tools, including speech recognition, sentiment analysis, chatbots, translation and speech synthesis. It is exactly what enables you to talk to an LLM, create a prompt to generate an image, or tell Google Assistant to f\*\*\* off for the hundredth time.

An immediate problem is, neural networks think in numbers and functions, not words, so we need a way to convert from one to the other. Broadly speaking, we want to convert *documents* into vectors, either representing them at the document level, or word level (also called Word2Vec). There are a few methods we can leverage.

- Bag of Words (BOW)
- TF-IDF
- N-Grams
- LSA
- CBOW (Word2Vec)
- Skip-gram (Word2Vec)

At the document level, each document is converted into its own great big vector, which is usually sparse (meaning mostly contains zeros) and high-dimensional (meaning it's very difficult to visualise). On the other hand, word-level vectors represent one word each, and are dense and low-dimensional. These have the major advantage of being able to capture word semantics, where document vectors aren't able to do this. We can also group word vectors together to then form a document vector.

## Cut to the chase!

Let's be honest. The English Language, or really just about any language, contains a lot of unnecessary fluff and noise which machines want to filter out. Why say many word when few word do trick? Sense! Me have stroke. Oh dear. Anyway, enough of... whatever that is, the point is, we want to perform some **text preprocessing**. This consists of a few steps, which we will cover in order.

1. **Sentence Segmentation** is the process of splitting a document into sentences. It's worth keeping mind that this isn't always the case of doing a `Document.split('. ')`, as a full stop can also be used in abbreviations, or cases.
2. **Word Tokenisation** then splits sentences into words, or more broadly, tokens. The distinction is, a token may map certain words to a common identifier, particularly if they're not useful or carry the same meaning. Speaking of...
3. **Lowercasing** - I think you can figure this out.
4. **Stop-Words Removal** gets rid of things like articles and pronouns, which don't add to the meaning of the sentence. Think things like "the", "is", "to" and so on.
	1. Considering what stop-words should and shouldn't be removed is important. For example, it may be necessary to include "not" for the purposes of sentiment analysis. "This latte is not bad" and "This latte is bad" literally mean opposite things!
5. **Stemming** (not stimming) reduces words to their root form using heuristics. In other words, it turns words like "stopping", "stopped" or "stops" into stop, since they all convey the same meaning.
	1. Some words remote the ending letter when changing their tense, such as "evade" which becomes "evading". This could lead to us getting the stem "evad", which isn't a real word.
6. **Lemmatisation** achieves the same end-goal that stemming does, but instead maps words directly to its original dictionary form, such as "is", "are" and "am" to "be". This is slower than stemming, but always produces a valid word.
7. **Part-of-Speech (PoS) Tagging** labels each word into a grammatical category, which basically describes what the word is. So, "This latte is not bad" becomes `<Def. Article>, <Noun>, <Verb>, <Negation>, <Adjective>`.

Now that we've cleaned up our documents, we can look into how we can store them.

## Why can't I hold all of these documents?

*Insert that one image of the guy failing to hold an absurd number of limes. Tbf limes are very nice.*

So, on with storing documents. A couple notes, a **corpus** is a set of documents, and a **vocabulary** is the collection of all unique words in said corpus.

### But first, we're putting you through the compactor

*Get terminated idiot*

We mentioned earlier that document vectors are generally sparse, so we end up with lots of empty space. This is, well, inefficient. Fortunately, there are two methods we can use to compress these.

**Yale format** (or CSR format) is used for representing sparse matrices, using three arrays: one for row offset, column index, and non-zero values. This is good for quick row access and matrix-vector multiplications. Going in reverse order, this is the basics of it.

- All non-zero values are crunched together into an array.
- The column index array corresponds to the row number that each element was on in the array.
- The row pointer has a length equivalent to the number of rows in the array, and maps each index to the offset of the array.

$$
\begin{bmatrix}
2 & 0 & 5 \\\\ 0 & 5 & 0 \\\\ 5 & 0 & 1
\end{bmatrix} \Rightarrow
([1,3,4], [1,3,2,1,3], [2,5,5,5,1])
$$

**Coordinate List (COO)** stores each non-zero element by a 3-tuple, with each element corresponding to the row index, column index, and value. This is good for incremental matrix construction.

$$
\begin{bmatrix}
2 & 0 & 5 \\\\ 0 & 5 & 0 \\\\ 5 & 0 & 1
\end{bmatrix} \Rightarrow
[(1,1,5), (1,3,5), (2,2,5), (3,1,5), (3,3,1)]
$$
(I swear I didn't mean to reference the module code, but hey, I'm going to call that a happy little accident.)
### Wag of Bords (BOW)

*Pied Wagtails my beloved. Just watch 'em run*

**Bag of Words** is a vector representation of documents, where *each element corresponds to how many times each word appears*. The "bag" of the name derives from the fact we're just putting everything in buckets or "bags", without caring about their order or semantics.

$$\[\text{\`\`this coffee is nice"}, \text{\`\`do we have nice biscuits"}\] \Rightarrow \[1, 1, 1, 2, 1, 1, 1, 1\]$$

### The F\*\*\*, Intel Developer Forum?

**TF x IDF** is an improvement on BOW, as it now weights words by their frequency. **Term Frequency (TF)** refers to the number of times that a word appears in a single document, and **Inverse Document Frequency (IDF)** refers to how many documents it appears in. These are multiplied together to give a score which denotes how informative a word is: if a word appears lots of times in very few documents, it is likely an important word to keep track of. Whereas, words that appear a lot, everywhere, don't need to be kept track of.

$$\text{TF}(w,d) = \frac{\sum \text{instances of } w \text{ in } d}{\sum \text{words in } d}$$
$$\text{IDF}(w,D) = \log(\frac{\text{documents in corpus } D}{\sum \text{documents in } D \text{ containing } w})$$

Trivially, we can assume $\text{TF}$ to be bounded between 1 and 0, but for $\text{IDF}$, using $\log$ ensures that weights aren't too big. Some versions of this function also add 1 to each element of the IDF equation to prevent a result of 0 or infinity.

### Bag-aNa-Grams

*Peel!*

**Bag of N-Grams** is another spin on BOW, this time also storing continuous sequences of words. This lets us identify recurring sequences, which may better allow us to notice common phrases or some proper nouns.

$$
\begin{aligned}
& \text{Example: \`\`I need a coffee"} \\\\
& N = 1: \text{[\`\`I", \`\`need", \`\`a", \`\`coffee"]} \\\\
& N = 2: \text{[\`\`I need", \`\`need a", \`\`a coffee"]} \\\\
& N = 3: \text{[\`\`I need a", \`\`need a coffee"]} \\\\
& N = 4: \text{[\`\`I need a coffee"]}
\end{aligned}
$$

### Late Service Announcement

**Latent Semantic Analysis (LSA)** uses *Singular Value Decomposition (SVD)* of a document-by-word matrix (i.e. count of words in each document, for the whole corpus) to demonstrate the relationships between documents and words. It has the effect of reducing a high-dimensional word count into a lower dimension count, which is useful for smaller models. The model assumes words used in a similar context are similar to each other, and as such, the hidden semantic structure may not be clear since there may be some ambiguity.

We start with our document-by-word matrix $\mathbf{A}$, which has $|D|$ rows and $|V|$ rows. SVD states that $\mathbf{A} \approx \mathbf{U \cdot \Sigma \cdot V^T}$, where $\mathbf{U^T U} = I$, $\mathbf{\Sigma}$ is a square, diagonal matrix with decreasing positive elements of rank $r$, and $\mathbf{V^T V} = I$. By making $r$ small, we can greatly reduce the dimensionality of the data. This rank usually lets us analyse words in different "topics", tho semantically similar words and documents may have approximately equivalent values across topics. $\mathbf{U}$ shows how documents are similar by topics, and $\mathbf{V}$ shows how words a similar by topic.

## Word Problems

*For lack of a better name*

**Word embedding** is the representation of words as dense, low-dimensional vectors for capturing semantic meaning, and **Word2Vec** is a shallow neural network-based method of learning such word embeddings. More broadly speaking, similar to LSA, it identifies what words are similar to each other.

This is in contrast to **One-Hot Encoding**, which uses high dimensional vectors where each word fulfils a single 1 value, and all the other entries are zero. It's like a BOW for one word, which is to say, disregarding of any semantic meaning.

Word2Vec uses the concept of a *sliding window*, where a continuous sequence of words is selected to establish context for a target word. So for example, if we have the sentence, *"I went to an animal sanctuary and got to pet some wolves"*, we can define a window size $k$, select a target word, and we will use all words that are at most $k$ words away. So, if we have $k=2$, and target word "pet", we have the context set "got", "to", "some", and "wolves". Smaller windows of two or three words are good for identifying grammar patterns, whereas larger ones are better for topic-level analysis. Note that if we hit the end of a sentence, we just use what's available. For instance, if our target word was "wolves", we'd just get "pet" and "some".

Now to pass these words though some neural networks!

### Ol' Betsy

*For a crossbow to cause so much ricocheting, it must be a gun. Dang, Robin Hood really was ahead of its time, huh?*

**Continuous Bag of Words (CBOW)** uses the sliding window trick to build a "context vector" for each word - for each context word, we create a one-hot vector which is the same size of the sentence we're working with, then sum all of these to get a vector that represents the target. This serves as our input into the neural network. There is a hidden layer represented by the matrix $W$, also known as the **Word Embedding Matrix**, which is multiplied with the context vector to get an intermediary vector $v$, or a *sum of context embeddings*. $W$ stores context embeddings in each column. We then multiply the transpose of $W$ with $v$, before passing this output through the *softmax activation function*, which results in a set of probabilities for the vocabulary. The end-goal of CBOW is for $W$ to be trained such that the context of a word will result in the output of the one-hot vector of its target.

**Skip-Gram** works similarly to CBOW, except we go in reverse where, given a target word, we get all the one-hot vectors of its context words. As a result, this is slower to train than CBOW, uses a smaller dataset, and results in better performance on rarer words.

### Now make it faster!

*Ugh, fine. I guess this is a case where it would matter.*

For CBOW, we're only looking for the target word in our output, and given that our activation function is SoftMax, if that value is one, then we know all other outputs are zero (or realistically, so small that they're basically zero). This means there's a good bit of unnecessary calculation when we perform cross-entropy loss on our output. Fortunately, there's a solution: remember the sum of context embeddings, $v$? Well, if we also construct a target embeddings vector, $v_I'$ (Where $I$ refers to the target word), we can multiply this with $v$, and pass the scalar result through the sigmoid activation function, to get our predicted probability. In mathematical terms, $\hat{y}_I = \sigma(v'_I \cdot v)$.

Currently, CBOW training takes $O(|V|)$ time per step. So how can we better optimise Word2Vec training?

**Hierarchical Softmax** uses a Huffman Tree in order to place words into a hierarchy, so that frequent words have shorter paths than infrequent ones. This way, the probability of getting the target word is equivalent to the product of the probabilities of all the nodes on the path. A **Huffman Tree** is a type of binary tree used to create optimal prefixes for lossless data encoding. This works by applying shorter prefixes to frequent symbols, and longer ones to those that are rare. To build a Huffman Tree for hierarchical softmax, we do the following:

1. Place all the words in the corpus into a key-value pair, where each pair contains each word along with the number of times it appears in the corpus, sort of like BOW.
2. Put these onto a min-heap priority queue based on this count.
3. Repeat the following...
	1. Take the two smallest nodes
	2. Merge them into one parent node. Their frequency is the sum of the frequencies of the two child nodes.
	3. Put the parent back into the queue.
4. ...until just one node remains (our tree!)

So what does this have to do with CBOW? Well, our formula to calculate the predicted output from before has an issue: while it increases the score of the target word, it doesn't push down the score of the words we don't want. In other terms, there is no "competition". By contrast, hierarchical softmax considers other words via the use of the parent nodes. Now for the new calculation of the probability:

$$
\hat{y}\_I = \prod_{n \in \text{path}} \sigma(s_n \cdot \mathbf{u}_n \cdot v) 
$$

$s_n$ is the product of a sequence of 1s and -1s., where a -1 is used for every left branch taken, and 1 for every right branch. Then, $\mathbf{u}_n$ corresponds to learnable weights assigned to all the involved internal nodes. You should remember what $v$ is from earlier. We'll end our discussion on Hierarchical Softmax by giving its loss function:

$$
L = - \sum\_{n \in path} \log(\sigma(s_n \cdot \mathbf{u}_n \cdot v))
$$

Oh, and the time complexity is now $O(\log|V|)$

Finally, another optimisation route for training CBOW is **Negative Sampling**, which turns the problem of maximising $\hat{y}$ into a binary classification problem. We assign the target word and context (i.e. $v'_I$ and $v$) to a label of 1. We then randomly sample $K$ other words, and assign these a label of 0, and we refer to such words with $w$. This gives us the following loss function:

$$
L = - \log(\sigma(v'_I \cdot v)) - \sum^K\_{i=1} \log(\sigma(-w'_i \cdot v))
$$

...Really? All of THAT to give me the same incorrect code for the fifteenth time in a row?