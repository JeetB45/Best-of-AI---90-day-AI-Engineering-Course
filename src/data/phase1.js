export const phase1 = [
    {
        day: 1, phase: 1, duration: '2h',
        title: 'Python Basics — Variables, Types & Operators',
        objectives: [
            'Understand Python variables and dynamic typing',
            'Work with all primitive data types: int, float, str, bool',
            'Use arithmetic, comparison, and logical operators',
            'Write your first Python programs',
        ],
        content: [
            { type: 'heading', content: 'Why Python for AI?' },
            { type: 'text', content: `<p>Python is the language of AI — not because it's the fastest (it isn't), but because it has the richest ecosystem of libraries: NumPy for math, PyTorch for deep learning, LangChain for agents. Once you learn Python, you have keys to every AI tool that exists.</p><p>The goal of Day 1 is simple: get comfortable with Python's building blocks. Everything else — neural networks, RAG systems, agents — is built on top of these fundamentals.</p>` },
            { type: 'heading', content: 'Variables & Dynamic Typing' },
            { type: 'text', content: `<p>In Python, you don't declare types — Python figures them out. A variable is just a name pointing to a value in memory.</p>` },
            {
                type: 'code', title: 'Variables in Python', filename: 'variables.py', height: '260px', content: `# Python figures out the type automatically
name = "Alice"          # str
age = 25                # int
gpa = 3.95              # float
is_enrolled = True      # bool

print(type(name))       # <class 'str'>
print(type(age))        # <class 'int'>
print(type(gpa))        # <class 'float'>
print(type(is_enrolled))# <class 'bool'>

# Variables can be reassigned to different types
x = 10
print(x, type(x))
x = "now a string"
print(x, type(x))` },
            { type: 'note', content: `<strong>Python is dynamically typed</strong> — the type is associated with the <em>value</em>, not the variable name. This is why <code>x = 10</code> then <code>x = "hello"</code> is perfectly valid.` },
            { type: 'heading', content: 'Numbers & Arithmetic' },
            {
                type: 'code', title: 'Arithmetic Operators', filename: 'arithmetic.py', height: '300px', content: `a = 17
b = 5

print(a + b)   # Addition:       22
print(a - b)   # Subtraction:    12
print(a * b)   # Multiplication: 85
print(a / b)   # Division:       3.4   (always float)
print(a // b)  # Floor division: 3     (integer result)
print(a % b)   # Modulo:         2     (remainder)
print(a ** b)  # Exponent:       1419857

# Useful built-ins
print(abs(-42))        # 42
print(round(3.14159, 2))  # 3.14
print(min(3, 7, 1, 9)) # 1
print(max(3, 7, 1, 9)) # 9` },
            { type: 'heading', content: 'Strings' },
            {
                type: 'code', title: 'String Operations', filename: 'strings.py', height: '320px', content: `name = "artificial intelligence"

# String methods
print(name.upper())           # ARTIFICIAL INTELLIGENCE
print(name.title())           # Artificial Intelligence
print(name.replace("a", "@")) # @rtifici@l intelligence
print(name.split(" "))        # ['artificial', 'intelligence']
print(len(name))              # 24

# f-strings (the modern way to format strings)
model = "GPT-4"
params = 1.8e12
print(f"Model: {model}, Parameters: {params:,.0f}")

# Slicing
s = "Python"
print(s[0])    # P
print(s[-1])   # n
print(s[0:3])  # Pyt
print(s[::-1]) # nohtyP  (reversed!)` },
            { type: 'tip', content: `<strong>f-strings</strong> (f"...") are the preferred way to format strings in modern Python. They're faster and more readable than <code>%</code> formatting or <code>.format()</code>.` },
            { type: 'heading', content: 'Comparison & Logical Operators' },
            {
                type: 'code', title: 'Comparisons & Logic', filename: 'operators.py', height: '260px', content: `# Comparison operators return True or False
print(5 > 3)    # True
print(5 == 5)   # True
print(5 != 3)   # True
print(5 >= 10)  # False

# Logical operators: and, or, not
x = 15
print(x > 10 and x < 20)  # True  (both conditions)
print(x < 5 or x > 10)    # True  (at least one)
print(not x > 10)          # False (flips the result)

# Chained comparisons (Pythonic!)
print(10 < x < 20)  # True — very readable` },
            { type: 'tip', content: `<strong>Beginner debugging habit:</strong> when your code surprises you, print the variable and its type at the same time. For example: <code>print(age, type(age))</code>. This catches a huge number of early mistakes.` },
            { type: 'note', content: `<strong>Three beginner mistakes to watch for:</strong> <code>=</code> assigns a value, <code>==</code> compares values, and Python cares about exact spelling and capitalisation. <code>Name</code>, <code>name</code>, and <code>NAME</code> are three different variables.` },
        ],
        exercises: [
            {
                title: 'Personal AI Profile',
                description: 'Create variables for your name, age, and a fun fact. Then print a formatted introduction using an f-string.',
                starterCode: `# Create your AI learner profile
name = ""        # Your name
age = 0          # Your age
days_to_complete = 90
goal = ""        # What you want to build with AI

# Print a formatted introduction
# Expected: "Hi, I'm [name]! I'm [age] years old and I'm starting my 90-day AI journey."
# Then: "My goal: [goal]"
`,
                expectedOutput: '',
                hint: 'Use an f-string: f"Hi, I\'m {name}!"',
                solution: `name = "Alex"
age = 22
days_to_complete = 90
goal = "Build an autonomous AI research agent"

print(f"Hi, I'm {name}! I'm {age} years old and I'm starting my {days_to_complete}-day AI journey.")
print(f"My goal: {goal}")`,
            },
            {
                title: 'AI Math Calculator',
                description: 'Calculate the number of parameters in a simplified neural network and display it in a readable format.',
                starterCode: `# A simple neural network has layers with neurons
# Parameters between two layers = input_neurons * output_neurons + output_neurons (biases)

input_neurons = 784    # 28x28 image
hidden_neurons = 256
output_neurons = 10    # 10 digit classes

# Calculate parameters for each layer
layer1_params = 0  # TODO: input_neurons * hidden_neurons + hidden_neurons
layer2_params = 0  # TODO: hidden_neurons * output_neurons + output_neurons
total_params = 0   # TODO: sum

print(f"Layer 1 parameters: {layer1_params:,}")
print(f"Layer 2 parameters: {layer2_params:,}")
print(f"Total parameters:   {total_params:,}")
`,
                expectedOutput: 'Layer 1 parameters: 200,960\nLayer 2 parameters: 2,570\nTotal parameters:   203,530',
                hint: 'layer1_params = input_neurons * hidden_neurons + hidden_neurons',
                solution: `input_neurons = 784
hidden_neurons = 256
output_neurons = 10

layer1_params = input_neurons * hidden_neurons + hidden_neurons
layer2_params = hidden_neurons * output_neurons + output_neurons
total_params = layer1_params + layer2_params

print(f"Layer 1 parameters: {layer1_params:,}")
print(f"Layer 2 parameters: {layer2_params:,}")
print(f"Total parameters:   {total_params:,}")`,
            },
        ],
        quiz: [
            { question: 'What is the result of 17 // 5 in Python?', options: ['3.4', '3', '2', '4'], correct: 1, explanation: '// is floor division — it divides and rounds down to the nearest integer. 17 ÷ 5 = 3.4, floored to 3.' },
            { question: 'Which operator is used for exponentiation in Python?', options: ['^', '**', 'pow()', 'exp()'], correct: 1, explanation: 'Python uses ** for exponentiation. 2**10 = 1024. Note: ^ is the XOR bitwise operator, not exponentiation!' },
            { question: "What does type('hello') return?", options: ["string", "<class 'string'>", "<class 'str'>", "str"], correct: 2, explanation: "Python's type() returns the class object. For strings, that's <class 'str'>." },
            { question: 'What is the output of: print(10 < 15 < 20)?', options: ['True', 'False', 'Error', 'None'], correct: 0, explanation: 'Python supports chained comparisons. 10 < 15 < 20 means (10 < 15) and (15 < 20), which is True and True = True.' },
        ],
    },

    {
        day: 2, phase: 1, duration: '2h',
        title: 'Control Flow — if/else, Loops & Comprehensions',
        objectives: [
            'Write conditional logic with if, elif, else',
            'Use for and while loops to repeat code',
            'Master list comprehensions — Python\'s superpower',
            'Understand break, continue, and else on loops',
        ],
        content: [
            { type: 'heading', content: 'Conditional Statements' },
            { type: 'text', content: `<p>Control flow is how your program makes decisions. In AI, you'll use it constantly — "if accuracy > 0.9, stop training", "if the user says goodbye, end the conversation".</p>` },
            {
                type: 'code', title: 'if / elif / else', filename: 'conditionals.py', height: '280px', content: `accuracy = 0.87

if accuracy >= 0.95:
    print("Excellent! Model is production-ready.")
elif accuracy >= 0.80:
    print("Good. Consider more training.")
elif accuracy >= 0.60:
    print("Fair. Model needs improvement.")
else:
    print("Poor. Check your data and architecture.")

# One-liner (ternary)
status = "ready" if accuracy >= 0.95 else "needs work"
print(f"Status: {status}")` },
            { type: 'heading', content: 'for Loops' },
            {
                type: 'code', title: 'for loops with range and lists', filename: 'for_loops.py', height: '300px', content: `# range(start, stop, step)
for epoch in range(1, 6):
    loss = 1.0 / epoch        # simulated decreasing loss
    print(f"Epoch {epoch}: loss = {loss:.4f}")

print("---")

# Iterating over a list
models = ["GPT-4", "Claude", "Gemini", "Llama"]
for i, model in enumerate(models):
    print(f"{i+1}. {model}")

print("---")

# zip — iterate two lists in parallel
train_loss = [0.9, 0.7, 0.5, 0.3]
val_loss   = [0.95, 0.75, 0.55, 0.40]
for epoch, (tr, vl) in enumerate(zip(train_loss, val_loss), 1):
    print(f"Epoch {epoch}: train={tr:.2f}  val={vl:.2f}")` },
            { type: 'heading', content: 'while Loops' },
            {
                type: 'code', title: 'while loop — training simulation', filename: 'while_loop.py', height: '240px', content: `loss = 1.0
epoch = 0
threshold = 0.1

while loss > threshold:
    epoch += 1
    loss *= 0.75          # reduce loss each epoch
    print(f"Epoch {epoch:2d}: loss = {loss:.4f}")

print(f"\\nConverged after {epoch} epochs!")` },
            { type: 'heading', content: 'List Comprehensions — Python\'s Superpower' },
            { type: 'text', content: `<p>List comprehensions let you build lists in one line. You'll see them everywhere in AI code — transforming datasets, filtering samples, mapping values.</p>` },
            {
                type: 'code', title: 'List Comprehensions', filename: 'comprehensions.py', height: '300px', content: `# Traditional way
squares = []
for x in range(1, 6):
    squares.append(x**2)
print(squares)  # [1, 4, 9, 16, 25]

# List comprehension — same thing, one line!
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# With a condition (filter)
even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print(even_squares)  # [4, 16, 36, 64, 100]

# Normalizing data (very common in ML!)
raw_scores = [45, 72, 88, 91, 63, 55]
max_score = max(raw_scores)
normalized = [score / max_score for score in raw_scores]
print([round(n, 3) for n in normalized])` },
        ],
        exercises: [
            {
                title: 'FizzBuzz — The Classic',
                description: 'Print numbers 1–30. For multiples of 3 print "Fizz", multiples of 5 print "Buzz", both print "FizzBuzz".',
                starterCode: `for n in range(1, 31):
    # Your logic here
    pass
`,
                hint: 'Check divisibility by 15 (both) first, then 3, then 5.',
                solution: `for n in range(1, 31):
    if n % 15 == 0:
        print("FizzBuzz")
    elif n % 3 == 0:
        print("Fizz")
    elif n % 5 == 0:
        print("Buzz")
    else:
        print(n)`,
            },
            {
                title: 'Data Normalisation with Comprehension',
                description: 'Given a list of temperatures in Celsius, use a list comprehension to convert them all to Fahrenheit. F = C * 9/5 + 32',
                starterCode: `celsius = [0, 20, 37, 100, -10, 25]

# Convert to Fahrenheit using a list comprehension
fahrenheit = []  # replace [] with your comprehension

print(fahrenheit)
`,
                expectedOutput: '[32.0, 68.0, 98.6, 212.0, 14.0, 77.0]',
                hint: 'fahrenheit = [c * 9/5 + 32 for c in celsius]',
                solution: `celsius = [0, 20, 37, 100, -10, 25]
fahrenheit = [c * 9/5 + 32 for c in celsius]
print(fahrenheit)`,
            },
        ],
        quiz: [
            { question: 'What does range(2, 10, 3) produce?', options: ['[2, 5, 8]', '[2, 3, 4, 5, 6, 7, 8, 9]', '[2, 5, 8, 11]', '[3, 6, 9]'], correct: 0, explanation: 'range(start, stop, step) starts at 2, increments by 3, stops before 10: 2, 5, 8.' },
            { question: 'What is the output of: [x*2 for x in range(3)]?', options: ['[0, 2, 4]', '[1, 2, 3]', '[2, 4, 6]', '[0, 1, 2]'], correct: 0, explanation: 'range(3) gives 0, 1, 2. Multiplied by 2: 0, 2, 4.' },
            { question: 'Which keyword exits a loop immediately?', options: ['exit', 'stop', 'break', 'return'], correct: 2, explanation: 'break immediately terminates the innermost loop. continue skips to the next iteration. return exits the entire function.' },
        ],
    },

    {
        day: 3, phase: 1, duration: '2h',
        title: 'Functions, Scope & Lambda',
        objectives: [
            'Define and call functions with parameters and return values',
            'Understand *args and **kwargs for flexible functions',
            'Use default parameters and keyword arguments',
            'Write lambda functions for short, throwaway operations',
        ],
        content: [
            { type: 'heading', content: 'Defining Functions' },
            { type: 'text', content: `<p>Functions are the building blocks of clean code. In AI projects, you'll write functions for data preprocessing, model training steps, evaluation metrics, and more. Good functions do <em>one thing well</em>.</p>` },
            {
                type: 'code', title: 'Functions basics', filename: 'functions.py', height: '340px', content: `def greet(name, greeting="Hello"):
    """Greet a person. greeting defaults to 'Hello'."""
    return f"{greeting}, {name}!"

print(greet("Alice"))              # Hello, Alice!
print(greet("Bob", "Hey"))         # Hey, Bob!
print(greet(greeting="Hi", name="Carol"))  # keyword args

# Multiple return values (returns a tuple)
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([5, 2, 9, 1, 7])
print(f"Min: {low}, Max: {high}")   # Min: 1, Max: 9

# Type hints (strongly recommended in AI code)
def calculate_accuracy(correct: int, total: int) -> float:
    return correct / total

print(f"Accuracy: {calculate_accuracy(87, 100):.1%}")` },
            { type: 'heading', content: '*args and **kwargs' },
            {
                type: 'code', title: 'Flexible function arguments', filename: 'args_kwargs.py', height: '280px', content: `# *args — accepts any number of positional arguments
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3))           # 6
print(sum_all(10, 20, 30, 40))    # 100

# **kwargs — accepts any number of keyword arguments
def build_model_config(**kwargs):
    config = {"lr": 0.001, "epochs": 10}  # defaults
    config.update(kwargs)                  # override with provided values
    return config

cfg = build_model_config(epochs=50, batch_size=32, lr=0.0001)
print(cfg)` },
            { type: 'heading', content: 'Lambda Functions' },
            {
                type: 'code', title: 'Lambda — anonymous functions', filename: 'lambda.py', height: '240px', content: `# Lambda: short functions without a name
square = lambda x: x ** 2
print(square(5))   # 25

# Lambdas shine with sorted(), map(), filter()
models = [{"name": "GPT-4", "params": 1.8e12},
          {"name": "Gemini", "params": 1.0e12},
          {"name": "Llama", "params": 7e9}]

# Sort by parameter count
by_size = sorted(models, key=lambda m: m["params"])
for m in by_size:
    print(f"{m['name']}: {m['params']:.2e} params")

# map() applies a function to every element
losses = [0.9, 0.7, 0.5, 0.3]
rounded = list(map(lambda x: round(x, 1), losses))
print(rounded)` },
        ],
        exercises: [
            {
                title: 'Activation Functions',
                description: 'Implement three common neural network activation functions as Python functions: ReLU, Sigmoid, and Tanh.',
                starterCode: `import math

def relu(x):
    """ReLU: max(0, x)"""
    pass  # TODO

def sigmoid(x):
    """Sigmoid: 1 / (1 + e^(-x))"""
    pass  # TODO

def tanh(x):
    """Tanh: (e^x - e^(-x)) / (e^x + e^(-x))"""
    pass  # TODO — hint: use math.tanh(x)

# Test your functions
test_values = [-2, -1, 0, 1, 2]
for v in test_values:
    print(f"x={v:+d}  relu={relu(v):.3f}  sigmoid={sigmoid(v):.3f}  tanh={tanh(v):.3f}")
`,
                hint: 'sigmoid: return 1 / (1 + math.exp(-x))',
                solution: `import math

def relu(x):
    return max(0, x)

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def tanh(x):
    return math.tanh(x)

test_values = [-2, -1, 0, 1, 2]
for v in test_values:
    print(f"x={v:+d}  relu={relu(v):.3f}  sigmoid={sigmoid(v):.3f}  tanh={tanh(v):.3f}")`,
            },
        ],
        quiz: [
            { question: 'What does *args do in a function definition?', options: ['Multiplies arguments', 'Accepts any number of positional arguments as a tuple', 'Accepts keyword arguments as a dict', 'Makes all arguments optional'], correct: 1, explanation: '*args collects all extra positional arguments into a tuple inside the function.' },
            { question: 'What is a lambda function?', options: ['A recursive function', 'A function that returns None', 'An anonymous, single-expression function', 'A function defined inside a class'], correct: 2, explanation: 'Lambda creates an anonymous function in one line. lambda x, y: x + y is equivalent to def f(x, y): return x + y.' },
        ],
    },

    {
        day: 4, phase: 1, duration: '2h',
        title: 'Data Structures — Lists, Dicts, Sets & Tuples',
        objectives: [
            'Master Python\'s four core data structures',
            'Know when to use each one (and why it matters for performance)',
            'Use dict comprehensions and nested structures',
            'Understand mutability vs immutability',
        ],
        content: [
            { type: 'heading', content: 'Lists — Ordered & Mutable' },
            {
                type: 'code', title: 'List operations', filename: 'lists.py', height: '320px', content: `# Lists are ordered, mutable, allow duplicates
embeddings = [0.12, -0.34, 0.78, 0.05, -0.91]

# Accessing elements
print(embeddings[0])    # 0.12  (first)
print(embeddings[-1])   # -0.91 (last)
print(embeddings[1:3])  # [-0.34, 0.78] (slice)

# Modifying
embeddings.append(0.33)     # add to end
embeddings.insert(0, 1.0)   # insert at index 0
embeddings.pop()            # remove last
embeddings.remove(0.05)     # remove first occurrence

# Useful operations
print(len(embeddings))
print(sorted(embeddings))
print(embeddings.count(0.12))   # how many times 0.12 appears

# Nested lists (like a matrix / 2D array)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[1][2])  # 6 — row 1, column 2` },
            { type: 'heading', content: 'Dictionaries — Key-Value Pairs' },
            { type: 'text', content: `<p>Dictionaries are the most important Python data structure for AI. You'll use them for model configs, API responses, token counts, metadata, and more.</p>` },
            {
                type: 'code', title: 'Dictionary operations', filename: 'dicts.py', height: '320px', content: `# Model configuration dictionary
config = {
    "model": "gemini-1.5-pro",
    "temperature": 0.7,
    "max_tokens": 2048,
    "top_p": 0.95,
}

# Access
print(config["model"])                    # gemini-1.5-pro
print(config.get("top_k", "not set"))     # "not set" (safe default)

# Modify
config["temperature"] = 0.9
config["stream"] = True

# Iterate
for key, value in config.items():
    print(f"  {key}: {value}")

# Dict comprehension
token_counts = {"hello": 1, "world": 1, "AI": 1, "hello": 2}
doubled = {k: v * 2 for k, v in token_counts.items()}
print(doubled)

# Check membership
print("model" in config)  # True` },
            { type: 'heading', content: 'Sets & Tuples' },
            {
                type: 'code', title: 'Sets and Tuples', filename: 'sets_tuples.py', height: '280px', content: `# Set — unordered, unique elements, great for deduplication
vocab1 = {"the", "cat", "sat", "on", "the", "mat"}
print(vocab1)  # no duplicates: {'the', 'cat', 'sat', 'on', 'mat'}

vocab2 = {"the", "dog", "ran", "on", "grass"}
print(vocab1 & vocab2)  # intersection: shared words
print(vocab1 | vocab2)  # union: all words
print(vocab1 - vocab2)  # difference: in vocab1 but not vocab2

# Tuple — ordered, IMMUTABLE (cannot change after creation)
model_version = ("gemini", 1, 5, "pro")  # like a record
print(model_version[0])    # gemini
# model_version[0] = "gpt" # TypeError! Tuples are immutable

# Tuples are great for returning multiple values from functions
def get_stats(data):
    return min(data), max(data), sum(data)/len(data)

lo, hi, avg = get_stats([3, 7, 2, 9, 1, 5])
print(f"min={lo}, max={hi}, avg={avg:.1f}")` },
        ],
        exercises: [
            {
                title: 'Word Frequency Counter',
                description: 'Count word frequencies in a sentence. This is the basis of how early NLP tokenizers worked.',
                starterCode: `sentence = "to be or not to be that is the question to be answered"

# Count how many times each word appears
# Use a dictionary
word_count = {}

# TODO: split the sentence and count each word
# Hint: sentence.split() gives you a list of words

print("Word frequencies:")
# Print in order of most frequent first
# Hint: sorted(..., key=lambda x: x[1], reverse=True)
`,
                hint: 'Loop through words. word_count[word] = word_count.get(word, 0) + 1',
                solution: `sentence = "to be or not to be that is the question to be answered"
word_count = {}

for word in sentence.split():
    word_count[word] = word_count.get(word, 0) + 1

print("Word frequencies:")
for word, count in sorted(word_count.items(), key=lambda x: x[1], reverse=True):
    print(f"  '{word}': {count}")`,
            },
        ],
        quiz: [
            { question: 'Which data structure would you use to ensure all elements are unique?', options: ['list', 'tuple', 'set', 'dict'], correct: 2, explanation: 'Sets automatically remove duplicates. Adding "cat" to a set that already has "cat" has no effect.' },
            { question: 'What is the difference between a list and a tuple?', options: ['Lists are faster', 'Tuples are ordered, lists are not', 'Tuples are immutable, lists are mutable', 'Lists can hold more types'], correct: 2, explanation: 'The key difference is mutability. Tuples cannot be changed after creation, making them hashable and safe to use as dict keys.' },
        ],
    },

    {
        day: 5, phase: 1, duration: '2h',
        title: 'Object-Oriented Python — Classes & Objects',
        objectives: [
            'Create classes with __init__, attributes, and methods',
            'Understand inheritance and method overriding',
            'Use dunder (magic) methods like __str__ and __repr__',
            'Model real AI concepts as classes',
        ],
        content: [
            { type: 'heading', content: 'Why OOP Matters in AI' },
            { type: 'text', content: `<p>Almost every AI framework uses OOP heavily. PyTorch's <code>nn.Module</code>, LangChain's <code>BaseChatModel</code>, and HuggingFace's <code>PreTrainedModel</code> are all classes you'll subclass and extend. Understanding OOP means you can actually read and modify AI framework code, not just copy-paste it.</p>` },
            {
                type: 'code', title: 'Creating a Class', filename: 'classes.py', height: '360px', content: `class NeuralLayer:
    """Represents a single layer in a neural network."""

    def __init__(self, input_size: int, output_size: int, activation: str = "relu"):
        self.input_size = input_size
        self.output_size = output_size
        self.activation = activation
        self.params = input_size * output_size + output_size

    def __str__(self):
        return f"Layer({self.input_size} → {self.output_size}, {self.activation})"

    def __repr__(self):
        return f"NeuralLayer(input_size={self.input_size}, output_size={self.output_size})"

    def parameter_count(self):
        return self.params

    def summary(self):
        print(f"  {self.__str__()}")
        print(f"  Parameters: {self.params:,}")

# Create instances
layer1 = NeuralLayer(784, 256)
layer2 = NeuralLayer(256, 128, "relu")
layer3 = NeuralLayer(128, 10, "softmax")

print(layer1)
layer1.summary()
print(f"\\nTotal params: {layer1.params + layer2.params + layer3.params:,}")` },
            { type: 'heading', content: 'Inheritance' },
            {
                type: 'code', title: 'Inheritance — extending classes', filename: 'inheritance.py', height: '340px', content: `class AIModel:
    """Base class for all AI models."""

    def __init__(self, name: str, version: str):
        self.name = name
        self.version = version
        self.is_loaded = False

    def load(self):
        self.is_loaded = True
        print(f"Loading {self.name} v{self.version}...")

    def predict(self, input_text: str):
        raise NotImplementedError("Subclasses must implement predict()")

    def __str__(self):
        status = "ready" if self.is_loaded else "not loaded"
        return f"{self.name} v{self.version} [{status}]"


class ChatModel(AIModel):
    """A chat model — extends AIModel."""

    def __init__(self, name, version, context_window: int):
        super().__init__(name, version)    # call parent __init__
        self.context_window = context_window

    def predict(self, input_text: str):
        if not self.is_loaded:
            raise RuntimeError("Call .load() first!")
        return f"[{self.name}]: Response to '{input_text[:20]}...'"


gemini = ChatModel("Gemini 1.5 Pro", "1.5", context_window=1_000_000)
gemini.load()
print(gemini)
print(gemini.predict("Tell me about neural networks"))
print(f"Context window: {gemini.context_window:,} tokens")` },
        ],
        exercises: [
            {
                title: 'Build a ConversationHistory class',
                description: 'Create a class that stores messages in a chat conversation, limits history length, and can export to a string.',
                starterCode: `class ConversationHistory:
    def __init__(self, max_messages=10):
        self.messages = []
        self.max_messages = max_messages

    def add_message(self, role: str, content: str):
        """Add a message. role is 'user' or 'assistant'."""
        # TODO: append {"role": role, "content": content}
        # If len > max_messages, remove the oldest (but keep system messages)
        pass

    def get_last_n(self, n: int):
        """Return the last n messages."""
        pass  # TODO

    def __len__(self):
        return len(self.messages)

    def __str__(self):
        # Return all messages formatted as "role: content"
        pass  # TODO


# Test it
chat = ConversationHistory(max_messages=4)
chat.add_message("user", "Hello!")
chat.add_message("assistant", "Hi there! How can I help?")
chat.add_message("user", "What is a neural network?")
chat.add_message("assistant", "A neural network is...")
chat.add_message("user", "How does backprop work?")  # should drop oldest

print(f"Messages stored: {len(chat)}")
print(chat)
`,
                hint: 'Use self.messages.pop(0) to remove the oldest when over the limit.',
                solution: `class ConversationHistory:
    def __init__(self, max_messages=10):
        self.messages = []
        self.max_messages = max_messages

    def add_message(self, role, content):
        self.messages.append({"role": role, "content": content})
        while len(self.messages) > self.max_messages:
            self.messages.pop(0)

    def get_last_n(self, n):
        return self.messages[-n:]

    def __len__(self):
        return len(self.messages)

    def __str__(self):
        lines = [f"{m['role'].upper()}: {m['content']}" for m in self.messages]
        return "\\n".join(lines)

chat = ConversationHistory(max_messages=4)
chat.add_message("user", "Hello!")
chat.add_message("assistant", "Hi there! How can I help?")
chat.add_message("user", "What is a neural network?")
chat.add_message("assistant", "A neural network is...")
chat.add_message("user", "How does backprop work?")
print(f"Messages stored: {len(chat)}")
print(chat)`,
            },
        ],
        quiz: [
            { question: 'What does super().__init__() do?', options: ['Creates a new object', 'Calls the parent class constructor', 'Deletes the parent class', 'Copies all parent methods'], correct: 1, explanation: 'super().__init__() calls the __init__ method of the parent (super) class, ensuring the parent is properly initialised.' },
            { question: 'What is the purpose of __str__?', options: ['String multiplication', 'Controls what print(obj) shows', 'Converts strings to objects', 'Joins strings together'], correct: 1, explanation: '__str__ is a dunder method Python calls when you use print(obj) or str(obj). It should return a human-readable string.' },
        ],
    },

    {
        day: 6, phase: 1, duration: '2h',
        title: 'File I/O, JSON & Error Handling',
        objectives: [
            'Read and write text and JSON files',
            'Handle errors with try/except/finally',
            'Use context managers (with statements)',
            'Work with CSV files — the most common data format',
        ],
        content: [
            { type: 'heading', content: 'Reading & Writing Files' },
            {
                type: 'code', title: 'File operations', filename: 'file_io.py', height: '280px', content: `# Writing a file
with open("model_log.txt", "w") as f:
    f.write("Epoch 1: loss=0.921\\n")
    f.write("Epoch 2: loss=0.754\\n")
    f.write("Epoch 3: loss=0.612\\n")

# Reading the file back
with open("model_log.txt", "r") as f:
    content = f.read()
    print(content)

# Reading line by line (memory-efficient for big files)
with open("model_log.txt", "r") as f:
    for line in f:
        epoch, loss_str = line.strip().split(": ")
        print(f"{epoch} → {loss_str}")` },
            { type: 'heading', content: 'JSON — The Language of APIs' },
            { type: 'text', content: `<p>JSON (JavaScript Object Notation) is how AI APIs send and receive data. When you call the Gemini API, you send JSON and get JSON back. You need to be fluent in it.</p>` },
            {
                type: 'code', title: 'Working with JSON', filename: 'json_demo.py', height: '300px', content: `import json

# Python dict → JSON string
config = {
    "model": "gemini-1.5-pro",
    "temperature": 0.7,
    "messages": [
        {"role": "user", "content": "Hello!"}
    ]
}

json_str = json.dumps(config, indent=2)
print("JSON string:")
print(json_str)

# JSON string → Python dict
loaded = json.loads(json_str)
print("\\nParsed back:")
print(f"Model: {loaded['model']}")
print(f"First message: {loaded['messages'][0]['content']}")` },
            { type: 'heading', content: 'CSV â€” The Workhorse of Real Data' },
            {
                type: 'code', title: 'Reading and writing CSV files', filename: 'csv_demo.py', height: '300px', content: `import csv

rows = [
    ["model", "score", "latency_ms"],
    ["GPT-4", 0.91, 820],
    ["Claude-3", 0.89, 760],
    ["Gemini-Pro", 0.87, 690],
]

# Write CSV
with open("benchmark.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

# Read CSV back
with open("benchmark.csv", "r") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['model']}: score={row['score']} latency={row['latency_ms']}ms")` },
            { type: 'tip', content: `<strong>Use relative paths while learning.</strong> Keeping files like <code>"model_log.txt"</code>, <code>"config.json"</code>, or <code>"benchmark.csv"</code> in the same folder as your script avoids a lot of beginner path confusion.` },
            { type: 'heading', content: 'Error Handling' },
            {
                type: 'code', title: 'try / except / finally', filename: 'error_handling.py', height: '300px', content: `def safe_api_call(prompt: str, api_key: str = None):
    """Simulates a robust API call with error handling."""
    try:
        if not api_key:
            raise ValueError("API key is required")
        if not prompt.strip():
            raise ValueError("Prompt cannot be empty")

        # Simulate API response
        response = f"AI response to: {prompt}"
        return {"success": True, "response": response}

    except ValueError as e:
        print(f"Input error: {e}")
        return {"success": False, "error": str(e)}

    except Exception as e:
        print(f"Unexpected error: {e}")
        return {"success": False, "error": str(e)}

    finally:
        print("API call attempt completed.")  # always runs

result = safe_api_call("What is AI?", api_key="demo-key")
print(result)
print()
result = safe_api_call("")  # will trigger ValueError
print(result)` },
            { type: 'note', content: `<strong>How to read Python errors:</strong> start from the <em>last line</em> of the traceback first. It tells you the error type and usually the exact problem: <code>FileNotFoundError</code>, <code>KeyError</code>, <code>ValueError</code>, and so on. Then move upward to see where it happened.` },
            { type: 'tip', content: `<strong>Professional habit:</strong> catch the specific errors you expect, not just <code>except Exception</code>. Specific exceptions make bugs easier to understand and your code easier to maintain.` },
        ],
        exercises: [
            {
                title: 'Config File Manager',
                description: 'Write a function that saves a model config to JSON and loads it back. Handle file-not-found errors gracefully.',
                starterCode: `import json

def save_config(config: dict, filename: str):
    """Save config dict to a JSON file."""
    # TODO: write config to filename using json.dump
    pass

def load_config(filename: str, default: dict = None):
    """Load config from JSON. Return default if file not found."""
    # TODO: try to open and parse the file
    # If FileNotFoundError, return default or {}
    pass

# Test
my_config = {"model": "gemini", "temperature": 0.8, "max_tokens": 1024}
save_config(my_config, "my_config.json")

loaded = load_config("my_config.json")
print("Loaded config:", loaded)

missing = load_config("nonexistent.json", default={"model": "default"})
print("Missing file fallback:", missing)
`,
                hint: 'Use json.dump(config, f, indent=2) to write, json.load(f) to read.',
                solution: `import json

def save_config(config, filename):
    with open(filename, "w") as f:
        json.dump(config, f, indent=2)
    print(f"Saved to {filename}")

def load_config(filename, default=None):
    try:
        with open(filename, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"File not found: {filename}. Using default.")
        return default or {}

my_config = {"model": "gemini", "temperature": 0.8, "max_tokens": 1024}
save_config(my_config, "my_config.json")
loaded = load_config("my_config.json")
print("Loaded config:", loaded)
missing = load_config("nonexistent.json", default={"model": "default"})
print("Missing file fallback:", missing)`,
            },
        ],
        quiz: [
            { question: 'What does json.loads() do?', options: ['Loads a JSON file', 'Parses a JSON string into a Python object', 'Converts Python to JSON', 'Loads multiple JSON files'], correct: 1, explanation: 'json.loads() (load string) parses a JSON-formatted string and returns a Python dict/list. json.load() (no s) reads from a file object.' },
            { question: 'Why use "with open(...) as f:" instead of just "open(...)"?', options: ['It\'s faster', 'It automatically closes the file even if an error occurs', 'It works with all file types', 'It\'s required for JSON files'], correct: 1, explanation: 'The "with" context manager guarantees the file is closed when the block exits, even if an exception is raised. This prevents file descriptor leaks.' },
        ],
    },

    {
        day: 7, phase: 1, duration: '2.5h',
        title: 'NumPy Fundamentals — Arrays & Math',
        objectives: [
            'Create and manipulate NumPy arrays',
            'Understand vectorised operations (and why they\'re 100x faster)',
            'Use array indexing, slicing, and broadcasting',
            'Perform linear algebra operations essential for ML',
        ],
        content: [
            { type: 'heading', content: 'Why NumPy?' },
            { type: 'text', content: `<p>NumPy is the foundation of every ML library. PyTorch tensors, Pandas DataFrames, scikit-learn arrays — they all build on NumPy concepts. More importantly, NumPy operations run in compiled C code, making them <strong>100-1000x faster</strong> than Python loops. In ML, you'll process millions of numbers — speed matters.</p>` },
            {
                type: 'code', title: 'Creating arrays', filename: 'numpy_basics.py', height: '300px', content: `import numpy as np

# Creating arrays
a = np.array([1, 2, 3, 4, 5])
b = np.zeros((3, 4))          # 3x4 matrix of zeros
c = np.ones((2, 3))           # 2x3 matrix of ones
d = np.eye(3)                 # 3x3 identity matrix
e = np.arange(0, 10, 2)       # [0, 2, 4, 6, 8]
f = np.linspace(0, 1, 5)      # [0.0, 0.25, 0.5, 0.75, 1.0]

# Random arrays (crucial for initialising neural networks)
np.random.seed(42)
weights = np.random.randn(3, 4)  # 3x4 Gaussian random
print("Weights shape:", weights.shape)
print("Weights dtype:", weights.dtype)
print(weights)` },
            { type: 'heading', content: 'Vectorised Operations' },
            {
                type: 'code', title: 'Vectorised math vs Python loops', filename: 'vectorized.py', height: '300px', content: `import numpy as np
import time

# Python loop — SLOW
data = list(range(1_000_000))
start = time.time()
result_loop = [x**2 for x in data]
print(f"Loop time: {(time.time()-start)*1000:.1f}ms")

# NumPy vectorised — FAST
arr = np.arange(1_000_000)
start = time.time()
result_numpy = arr ** 2
print(f"NumPy time: {(time.time()-start)*1000:.1f}ms")

# Element-wise operations (no loops needed!)
a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])
print(a + b)       # [6, 8, 10, 12]
print(a * b)       # [5, 12, 21, 32]
print(a ** 2)      # [1, 4, 9, 16]
print(np.sqrt(a))  # [1.0, 1.41, 1.73, 2.0]` },
            { type: 'heading', content: 'Indexing, Slicing & Reshaping' },
            {
                type: 'code', title: 'Array indexing and reshaping', filename: 'indexing.py', height: '300px', content: `import numpy as np

# 2D array (matrix)
m = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

print(m[1, 2])      # 6  — row 1, col 2
print(m[0, :])      # [1, 2, 3] — first row
print(m[:, 1])      # [2, 5, 8] — second column
print(m[1:, 1:])    # bottom-right 2x2

# Reshape — same data, different shape
flat = np.arange(12)           # [0..11]
matrix = flat.reshape(3, 4)    # 3 rows, 4 cols
cube = flat.reshape(2, 2, 3)   # 3D!
print(matrix.shape)  # (3, 4)

# Boolean indexing — very common in data cleaning!
scores = np.array([0.9, 0.3, 0.7, 0.1, 0.8, 0.4])
high_confidence = scores[scores > 0.6]
print(high_confidence)  # [0.9, 0.7, 0.8]` },
            { type: 'heading', content: 'Essential Linear Algebra' },
            {
                type: 'code', title: 'Matrix operations for ML', filename: 'linalg.py', height: '280px', content: `import numpy as np

# Dot product (used in every neural network layer!)
x = np.array([1, 2, 3])         # input
W = np.array([[0.1, 0.2],       # weight matrix
              [0.3, 0.4],
              [0.5, 0.6]])
b = np.array([0.1, 0.2])        # bias

# Forward pass of a linear layer: y = Wx + b
y = x @ W + b   # @ is matrix multiplication
print("Layer output:", y)

# Useful stats functions
data = np.random.randn(100)
print(f"Mean:   {np.mean(data):.4f}")
print(f"Std:    {np.std(data):.4f}")
print(f"Min:    {np.min(data):.4f}")
print(f"Max:    {np.max(data):.4f}")
print(f"Norm:   {np.linalg.norm(data):.4f}")` },
        ],
        exercises: [
            {
                title: 'Implement Softmax from Scratch',
                description: 'Softmax converts raw model outputs (logits) into probabilities. Implement it using only NumPy.',
                starterCode: `import numpy as np

def softmax(logits):
    """
    Convert logits to probabilities.
    softmax(x_i) = exp(x_i) / sum(exp(x_j))

    Tip: subtract max(logits) before exp() to prevent overflow!
    """
    # TODO: implement softmax
    pass

# Test with model output logits
logits = np.array([2.0, 1.0, 0.1, 3.5, 1.2])
probs = softmax(logits)

print("Logits:       ", logits)
print("Probabilities:", np.round(probs, 4))
print("Sum of probs: ", probs.sum())   # Should be exactly 1.0
print("Predicted class:", np.argmax(probs))
`,
                hint: 'exp_x = np.exp(logits - np.max(logits)) then return exp_x / exp_x.sum()',
                solution: `import numpy as np

def softmax(logits):
    exp_x = np.exp(logits - np.max(logits))
    return exp_x / exp_x.sum()

logits = np.array([2.0, 1.0, 0.1, 3.5, 1.2])
probs = softmax(logits)
print("Logits:       ", logits)
print("Probabilities:", np.round(probs, 4))
print("Sum of probs: ", probs.sum())
print("Predicted class:", np.argmax(probs))`,
            },
        ],
        quiz: [
            { question: 'What is broadcasting in NumPy?', options: ['Sending data over a network', 'Automatic expansion of smaller arrays to match larger ones in operations', 'A way to print arrays', 'Converting dtypes automatically'], correct: 1, explanation: 'Broadcasting allows NumPy to perform operations on arrays with different shapes by automatically expanding the smaller array. E.g., adding a scalar to a 2D array.' },
            { question: 'What does @ do between two NumPy arrays?', options: ['Element-wise multiplication', 'Matrix multiplication (dot product)', 'Decorator syntax', 'Boolean AND operation'], correct: 1, explanation: 'The @ operator performs matrix multiplication in Python 3.5+. It\'s equivalent to np.matmul() and is used everywhere in neural network computations.' },
        ],
    },

    {
        day: 8, phase: 1, duration: '2.5h',
        title: 'Pandas — Data Loading & Exploration',
        objectives: [
            'Load CSV, JSON, and Excel files into DataFrames',
            'Explore datasets: shape, dtypes, describe, info',
            'Handle missing values and duplicates',
            'Filter, sort, and select data',
        ],
        content: [
            { type: 'heading', content: 'Introduction to Pandas' },
            { type: 'text', content: `<p>Before you train any model, you spend 60-80% of your time on data. Pandas is your primary tool for this. It gives you Excel-like power in Python — but 1000x more flexible and scriptable.</p>` },
            {
                type: 'code', title: 'Creating and Loading DataFrames', filename: 'pandas_intro.py', height: '320px', content: `import pandas as pd
import numpy as np

# Create a DataFrame manually
data = {
    "model": ["GPT-4", "Claude 3", "Gemini Pro", "Llama 3", "Mistral"],
    "params_B": [1800, 200, 540, 70, 7],
    "context_K": [128, 200, 1000, 8, 32],
    "release_year": [2023, 2024, 2023, 2024, 2023],
    "open_source": [False, False, False, True, True],
}

df = pd.DataFrame(data)
print(df)
print("\\nShape:", df.shape)         # (5, 5) — rows, cols
print("\\nColumn dtypes:")
print(df.dtypes)` },
            {
                type: 'code', title: 'Exploring a DataFrame', filename: 'explore.py', height: '300px', content: `import pandas as pd
import numpy as np

# Create sample ML dataset
np.random.seed(42)
n = 100
df = pd.DataFrame({
    "age": np.random.randint(18, 65, n),
    "income": np.random.normal(50000, 15000, n).round(),
    "education_years": np.random.randint(10, 20, n),
    "employed": np.random.choice([True, False], n),
    "credit_score": np.random.randint(300, 850, n),
})

# Add some missing values
df.loc[df.sample(10).index, "income"] = None

print("=== BASIC INFO ===")
print(df.info())
print("\\n=== STATISTICS ===")
print(df.describe().round(1))
print("\\n=== MISSING VALUES ===")
print(df.isnull().sum())` },
            {
                type: 'code', title: 'Filtering and Selecting Data', filename: 'filtering.py', height: '300px', content: `import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Carol", "David", "Eve"],
    "score": [0.92, 0.74, 0.88, 0.61, 0.95],
    "model": ["gpt4", "claude", "gemini", "llama", "gemini"],
    "tokens_used": [1200, 800, 1500, 600, 2000],
})

# Filter rows
high_scorers = df[df["score"] > 0.85]
print("High scorers:")
print(high_scorers)

# Multiple conditions
gemini_high = df[(df["model"] == "gemini") & (df["score"] > 0.8)]
print("\\nGemini + high score:")
print(gemini_high)

# Sort
top3 = df.sort_values("score", ascending=False).head(3)
print("\\nTop 3 by score:")
print(top3[["name", "score", "model"]])` },
        ],
        exercises: [
            {
                title: 'Dataset Audit',
                description: 'Given a dataset, write a function that produces a full audit report: missing values, data types, value ranges, and duplicates.',
                starterCode: `import pandas as pd
import numpy as np

# Generate a messy dataset to audit
np.random.seed(0)
df = pd.DataFrame({
    "user_id": range(50),
    "age": np.random.randint(15, 70, 50).tolist() + [None] * 0,
    "prompt_length": np.random.randint(10, 500, 50),
    "response_quality": np.random.choice(["good", "bad", "ok", None], 50),
    "tokens": np.random.randint(100, 2000, 50),
})
# Add some duplicates
df = pd.concat([df, df.iloc[:5]], ignore_index=True)
# Add missing values
df.loc[[3, 15, 27], "age"] = None
df.loc[[8, 22], "tokens"] = None

def audit_dataset(df):
    """Print a complete audit of the dataset."""
    print(f"=== DATASET AUDIT ===")
    print(f"Shape: {df.shape[0]} rows × {df.shape[1]} columns")
    print(f"Duplicates: {df.duplicated().sum()}")
    print()

    print("--- Missing Values ---")
    # TODO: print missing count and % for each column

    print("\\n--- Numeric Columns ---")
    # TODO: print min, max, mean for numeric columns

    print("\\n--- Categorical Columns ---")
    # TODO: print unique value counts for non-numeric columns

audit_dataset(df)
`,
                hint: 'df.isnull().sum() for missing values; df.describe() for numeric stats',
                solution: `import pandas as pd
import numpy as np

np.random.seed(0)
df = pd.DataFrame({
    "user_id": range(50),
    "age": np.random.randint(15, 70, 50).astype(float),
    "prompt_length": np.random.randint(10, 500, 50),
    "response_quality": np.random.choice(["good", "bad", "ok", None], 50),
    "tokens": np.random.randint(100, 2000, 50).astype(float),
})
df = pd.concat([df, df.iloc[:5]], ignore_index=True)
df.loc[[3, 15, 27], "age"] = None
df.loc[[8, 22], "tokens"] = None

def audit_dataset(df):
    print(f"=== DATASET AUDIT ===")
    print(f"Shape: {df.shape[0]} rows x {df.shape[1]} columns")
    print(f"Duplicates: {df.duplicated().sum()}")
    print("\\n--- Missing Values ---")
    missing = df.isnull().sum()
    for col, cnt in missing.items():
        if cnt > 0:
            print(f"  {col}: {cnt} ({cnt/len(df)*100:.1f}%)")
    print("\\n--- Numeric Columns ---")
    for col in df.select_dtypes(include="number").columns:
        s = df[col].dropna()
        print(f"  {col}: min={s.min():.0f}, max={s.max():.0f}, mean={s.mean():.1f}")
    print("\\n--- Categorical Columns ---")
    for col in df.select_dtypes(exclude="number").columns:
        print(f"  {col}: {df[col].nunique()} unique — {df[col].value_counts().to_dict()}")

audit_dataset(df)`,
            },
        ],
        quiz: [
            { question: 'How do you select rows where column "score" is greater than 0.9?', options: ['df["score" > 0.9]', 'df.filter("score > 0.9")', 'df[df["score"] > 0.9]', 'df.select(score=">0.9")'], correct: 2, explanation: 'Boolean indexing: df["score"] > 0.9 creates a boolean Series, and df[boolean_series] filters to rows where it\'s True.' },
            { question: 'What does df.dropna() do?', options: ['Removes columns with NA', 'Removes rows with any NaN value', 'Fills NaN with 0', 'Counts NaN values'], correct: 1, explanation: 'dropna() by default removes any row that has at least one NaN. Use dropna(subset=[\'col\']) to only check specific columns.' },
        ],
    },

    {
        day: 9, phase: 1, duration: '2.5h',
        title: 'Pandas — Grouping, Merging & Transformation',
        objectives: [
            'Use groupby to aggregate data by categories',
            'Merge and join DataFrames like SQL joins',
            'Apply custom transformations with apply()',
            'Pivot, melt, and reshape data',
        ],
        content: [
            { type: 'heading', content: 'GroupBy — The Most Powerful Pandas Feature' },
            {
                type: 'code', title: 'GroupBy aggregations', filename: 'groupby.py', height: '320px', content: `import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    "model": np.random.choice(["GPT-4", "Claude", "Gemini"], 50),
    "task": np.random.choice(["coding", "writing", "math", "reasoning"], 50),
    "score": np.random.uniform(0.5, 1.0, 50).round(3),
    "latency_ms": np.random.randint(200, 2000, 50),
    "cost_cents": np.random.uniform(0.1, 5.0, 50).round(2),
})

# Group by model and compute stats
model_stats = df.groupby("model").agg(
    avg_score=("score", "mean"),
    avg_latency=("latency_ms", "mean"),
    total_cost=("cost_cents", "sum"),
    count=("score", "count"),
).round(3)

print(model_stats)
print()

# Group by two columns
pivot = df.groupby(["model", "task"])["score"].mean().unstack()
print(pivot.round(3))` },
            { type: 'heading', content: 'Merging DataFrames' },
            {
                type: 'code', title: 'Merge / Join', filename: 'merge.py', height: '300px', content: `import pandas as pd

# Simulating two data sources that need to be joined
users = pd.DataFrame({
    "user_id": [1, 2, 3, 4, 5],
    "name": ["Alice", "Bob", "Carol", "David", "Eve"],
    "plan": ["pro", "free", "pro", "free", "enterprise"],
})

usage = pd.DataFrame({
    "user_id": [1, 1, 2, 3, 3, 4],
    "tokens_used": [1200, 800, 500, 2000, 1500, 100],
    "date": ["2024-01", "2024-02", "2024-01", "2024-01", "2024-02", "2024-01"],
})

# Inner join — only users with usage records
merged = pd.merge(users, usage, on="user_id", how="inner")
print("Inner join:")
print(merged)

# Total tokens per user
total = merged.groupby(["user_id", "name", "plan"])["tokens_used"].sum().reset_index()
print("\\nTotal tokens per user:")
print(total.sort_values("tokens_used", ascending=False))` },
            { type: 'heading', content: 'Apply — Custom Transformations' },
            {
                type: 'code', title: 'apply() and lambda transforms', filename: 'apply.py', height: '280px', content: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    "text": ["Hello world!", "AI is amazing", "Python for ML", "Deep learning rocks"],
    "score": [0.85, 0.92, 0.78, 0.96],
    "tokens": [2, 3, 3, 3],
})

# Apply a function to each row
df["text_length"] = df["text"].apply(len)
df["word_count"] = df["text"].apply(lambda x: len(x.split()))
df["grade"] = df["score"].apply(lambda s: "A" if s >= 0.9 else "B" if s >= 0.8 else "C")
df["tokens_per_word"] = df.apply(lambda row: row["tokens"] / row["word_count"], axis=1)

print(df)` },
        ],
        exercises: [
            {
                title: 'AI Model Leaderboard',
                description: 'Build a comprehensive leaderboard from benchmark data using groupby, sorting, and ranking.',
                starterCode: `import pandas as pd
import numpy as np

np.random.seed(1)
benchmarks = pd.DataFrame({
    "model": np.repeat(["GPT-4", "Claude-3", "Gemini-Pro", "Llama-3", "Mistral-7B"], 5),
    "benchmark": np.tile(["MMLU", "HumanEval", "GSM8K", "TruthfulQA", "BBH"], 5),
    "score": np.random.uniform(0.55, 0.95, 25).round(3),
})

# TODO:
# 1. Compute each model's average score across all benchmarks
# 2. Rank models (1 = best)
# 3. Show which benchmark each model performs best on
# 4. Print the final leaderboard sorted by rank

# Your code here
`,
                hint: 'Use groupby("model")["score"].mean() then .rank(ascending=False)',
                solution: `import pandas as pd
import numpy as np

np.random.seed(1)
benchmarks = pd.DataFrame({
    "model": np.repeat(["GPT-4", "Claude-3", "Gemini-Pro", "Llama-3", "Mistral-7B"], 5),
    "benchmark": np.tile(["MMLU", "HumanEval", "GSM8K", "TruthfulQA", "BBH"], 5),
    "score": np.random.uniform(0.55, 0.95, 25).round(3),
})

avg_scores = benchmarks.groupby("model")["score"].mean().round(3)
leaderboard = avg_scores.reset_index()
leaderboard.columns = ["model", "avg_score"]
leaderboard["rank"] = leaderboard["avg_score"].rank(ascending=False).astype(int)
leaderboard = leaderboard.sort_values("rank")

best_benchmark = benchmarks.loc[benchmarks.groupby("model")["score"].idxmax()][["model","benchmark","score"]]
leaderboard = leaderboard.merge(best_benchmark.rename(columns={"benchmark": "best_at", "score": "best_score"}), on="model")

print("=== AI MODEL LEADERBOARD ===")
print(leaderboard.to_string(index=False))`,
            },
        ],
        quiz: [
            { question: 'What does groupby("col").agg({"score": "mean"}) do?', options: ['Filters rows where col equals mean', 'Groups rows by col and computes mean of score per group', 'Sorts by col then by score', 'Joins two DataFrames on col'], correct: 1, explanation: 'groupby splits data into groups based on col values, then agg applies aggregate functions (mean, sum, count, etc.) to each group.' },
        ],
    },

    {
        day: 10, phase: 1, duration: '2.5h',
        title: 'Data Visualisation with Matplotlib & Seaborn',
        objectives: [
            'Create line plots, bar charts, scatter plots, and histograms',
            'Visualise ML training progress (loss curves)',
            'Use Matplotlib to understand data distributions',
            'Style plots for presentations and reports',
        ],
        content: [
            { type: 'note', content: `<strong>Pyodide note:</strong> Matplotlib plots in the browser need a special backend. Add <code>import matplotlib\nmatplotlib.use('Agg')</code> at the top, then use <code>plt.savefig()</code> or display arrays. The exercises below show how to get text-based output when visualisations aren't available.` },
            { type: 'heading', content: 'Loss Curves — The Most Important ML Plot' },
            {
                type: 'code', title: 'Visualising training progress', filename: 'loss_curves.py', height: '320px', content: `import numpy as np

# Simulate training data
np.random.seed(42)
epochs = 50

train_loss = []
val_loss = []
loss = 2.5
for e in range(epochs):
    loss *= 0.92
    noise = np.random.normal(0, 0.05)
    train_loss.append(loss + noise * 0.5)
    val_loss.append(loss + abs(noise) * 1.2)   # val slightly higher

# Summary stats instead of plot (works in Pyodide)
print("=== TRAINING PROGRESS ===")
print(f"{'Epoch':>6} {'Train Loss':>12} {'Val Loss':>10}")
print("-" * 32)
for e in [0, 9, 19, 29, 39, 49]:
    print(f"{e+1:>6} {train_loss[e]:>12.4f} {val_loss[e]:>10.4f}")

print(f"\\nFinal train loss: {train_loss[-1]:.4f}")
print(f"Final val loss:   {val_loss[-1]:.4f}")
print(f"Best epoch: {np.argmin(val_loss) + 1}")` },
            { type: 'heading', content: 'Distribution Analysis' },
            {
                type: 'code', title: 'Analysing data distributions', filename: 'distributions.py', height: '280px', content: `import numpy as np

np.random.seed(0)
scores = np.random.beta(8, 2, 1000)  # skewed distribution

# Text-based histogram
def text_histogram(data, bins=10, title="Histogram"):
    print(f"\\n=== {title} ===")
    counts, edges = np.histogram(data, bins=bins)
    max_count = max(counts)
    for i, (count, edge) in enumerate(zip(counts, edges)):
        bar = "█" * int(count / max_count * 30)
        print(f"{edge:.2f}-{edges[i+1]:.2f} |{bar} {count}")

text_histogram(scores, title="Model Score Distribution (n=1000)")
print(f"\\nMean:   {np.mean(scores):.3f}")
print(f"Median: {np.median(scores):.3f}")
print(f"Std:    {np.std(scores):.3f}")
print(f"% > 0.8: {(scores > 0.8).mean():.1%}")` },
        ],
        exercises: [
            {
                title: 'Benchmark Comparison Analysis',
                description: 'Analyse benchmark scores across 5 models and produce a formatted summary with percentile rankings.',
                starterCode: `import numpy as np

np.random.seed(42)
models = ["GPT-4", "Claude-3", "Gemini-Pro", "Llama-3", "Mistral-7B"]
benchmarks = ["MMLU", "HumanEval", "GSM8K", "TruthfulQA"]

# Generate scores
scores = {
    model: {b: np.random.uniform(0.55, 0.95) for b in benchmarks}
    for model in models
}

# TODO:
# 1. Print a table showing each model's score on each benchmark
# 2. Compute and print each model's average score
# 3. Print the overall winner (highest average)
# 4. Print which model wins each benchmark

print("Your analysis here:")
`,
                hint: 'Loop over models, compute sum(scores[m].values()) / len(benchmarks)',
                solution: `import numpy as np

np.random.seed(42)
models = ["GPT-4", "Claude-3", "Gemini-Pro", "Llama-3", "Mistral-7B"]
benchmarks = ["MMLU", "HumanEval", "GSM8K", "TruthfulQA"]

scores = {m: {b: round(np.random.uniform(0.55, 0.95), 3) for b in benchmarks} for m in models}

# Table
header = f"{'Model':<15}" + "".join(f"{b:>12}" for b in benchmarks) + f"{'Average':>12}"
print(header)
print("-" * len(header))

averages = {}
for m in models:
    row = f"{m:<15}" + "".join(f"{scores[m][b]:>12.3f}" for b in benchmarks)
    avg = sum(scores[m].values()) / len(benchmarks)
    averages[m] = avg
    print(row + f"{avg:>12.3f}")

print(f"\\nOverall winner: {max(averages, key=averages.get)}")
print("\\nBenchmark winners:")
for b in benchmarks:
    winner = max(models, key=lambda m: scores[m][b])
    print(f"  {b}: {winner} ({scores[winner][b]:.3f})")`,
            },
        ],
        quiz: [
            { question: 'What does a training loss curve that decreases but validation loss increases indicate?', options: ['Good training', 'Underfitting', 'Overfitting', 'A bug in your code'], correct: 2, explanation: 'When training loss keeps falling but validation loss rises, the model is memorising training data (overfitting) instead of learning generalisable patterns. Solution: add regularisation, dropout, or more data.' },
        ],
    },

    {
        day: 11, phase: 1, duration: '2h',
        title: 'Linear Algebra for ML — Vectors, Matrices & Eigenvalues',
        objectives: [
            'Understand vectors and what they represent in ML (embeddings!)',
            'Perform matrix multiplication and understand why it works',
            'Compute cosine similarity — the core of embedding search',
            'Understand eigenvalues conceptually and their role in PCA',
        ],
        content: [
            { type: 'heading', content: 'Vectors = Embeddings' },
            { type: 'text', content: `<p>When a model embeds the word "king" as <code>[0.2, -0.4, 0.8, ...]</code>, that's a vector. Every meaning, every image, every document in modern AI is represented as a vector. Linear algebra is the math that lets us compute "how similar are these two things?" or "what's the direction from A to B?".</p>` },
            {
                type: 'code', title: 'Vectors and similarity', filename: 'vectors.py', height: '320px', content: `import numpy as np

# Word embeddings (simplified 3D for illustration)
king  = np.array([0.9,  0.1,  0.8])   # royalty, masculine, power
queen = np.array([0.9,  0.9,  0.8])   # royalty, feminine, power
man   = np.array([0.1,  0.1,  0.5])   # masculine
woman = np.array([0.1,  0.9,  0.5])   # feminine

# Cosine similarity: how similar are two vectors?
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print("Similarity scores:")
print(f"king ↔ queen:  {cosine_similarity(king, queen):.4f}")  # high!
print(f"king ↔ man:    {cosine_similarity(king, man):.4f}")
print(f"man  ↔ woman:  {cosine_similarity(man, woman):.4f}")
print(f"king ↔ woman:  {cosine_similarity(king, woman):.4f}")

# Famous word analogy: king - man + woman ≈ queen
analogy = king - man + woman
print(f"\\nking - man + woman = {analogy}")
print(f"Similarity to queen: {cosine_similarity(analogy, queen):.4f}")` },
            { type: 'heading', content: 'Matrix Multiplication — Neural Network Forward Pass' },
            {
                type: 'code', title: 'Manual forward pass', filename: 'forward_pass.py', height: '300px', content: `import numpy as np

np.random.seed(42)

# Simple 2-layer neural network forward pass
def relu(x):
    return np.maximum(0, x)

def softmax(x):
    e = np.exp(x - x.max())
    return e / e.sum()

# Random weights and biases
W1 = np.random.randn(4, 8) * 0.1   # hidden layer: 4 input, 8 hidden
b1 = np.zeros(8)
W2 = np.random.randn(8, 3) * 0.1   # output layer: 8 hidden, 3 classes
b2 = np.zeros(3)

# Input: one sample with 4 features
x = np.array([1.2, -0.5, 0.8, 2.1])

# Forward pass
h = relu(x @ W1 + b1)     # hidden layer
y = softmax(h @ W2 + b2)  # output probabilities

print(f"Input shape:   {x.shape}")
print(f"Hidden shape:  {h.shape}")
print(f"Output shape:  {y.shape}")
print(f"Output probs:  {y.round(4)}")
print(f"Predicted:     class {np.argmax(y)}")` },
        ],
        exercises: [
            {
                title: 'Implement Cosine Similarity Search',
                description: 'Given a query embedding and a database of document embeddings, find the top-3 most similar documents. This is exactly how vector search engines work.',
                starterCode: `import numpy as np

np.random.seed(42)

# Simulated document embeddings (each row = one document's embedding)
documents = [
    "Python fundamentals for AI",
    "Deep learning with PyTorch",
    "Building RAG systems",
    "LangChain for agents",
    "Deploying models with FastAPI",
    "NumPy for machine learning",
    "Transformer architecture explained",
]

# Random embeddings (in reality, these come from a model like text-embedding-ada-002)
doc_embeddings = np.random.randn(len(documents), 128)
query_embedding = np.random.randn(128)

def search(query_emb, doc_embs, top_k=3):
    """Return top_k most similar documents by cosine similarity."""
    # TODO:
    # 1. Normalise query and all doc embeddings
    # 2. Compute cosine similarity for each doc
    # 3. Return indices of top_k most similar
    pass

top_indices = search(query_embedding, doc_embeddings, top_k=3)
print("Top 3 most similar documents:")
for rank, idx in enumerate(top_indices, 1):
    print(f"  {rank}. {documents[idx]}")
`,
                hint: 'Normalize: v / np.linalg.norm(v). Then similarity = query @ doc.T. Use np.argsort(similarities)[::-1][:k]',
                solution: `import numpy as np

np.random.seed(42)
documents = [
    "Python fundamentals for AI",
    "Deep learning with PyTorch",
    "Building RAG systems",
    "LangChain for agents",
    "Deploying models with FastAPI",
    "NumPy for machine learning",
    "Transformer architecture explained",
]
doc_embeddings = np.random.randn(len(documents), 128)
query_embedding = np.random.randn(128)

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def search(query_emb, doc_embs, top_k=3):
    sims = [cosine_sim(query_emb, d) for d in doc_embs]
    return np.argsort(sims)[::-1][:top_k]

top_indices = search(query_embedding, doc_embeddings, top_k=3)
print("Top 3 most similar documents:")
for rank, idx in enumerate(top_indices, 1):
    print(f"  {rank}. {documents[idx]}")`,
            },
        ],
        quiz: [
            { question: 'What does cosine similarity of 1.0 mean?', options: ['The vectors are perpendicular', 'The vectors point in identical directions', 'One vector is the negative of the other', 'The vectors have the same magnitude'], correct: 1, explanation: 'Cosine similarity of 1.0 means the angle between vectors is 0° — they point in the exact same direction. In embeddings, this means the two items are semantically identical.' },
        ],
    },

    {
        day: 12, phase: 1, duration: '2h',
        title: 'Probability & Statistics for ML',
        objectives: [
            'Understand probability distributions relevant to ML',
            'Compute mean, variance, standard deviation',
            'Understand the normal distribution and why it\'s everywhere',
            'Grasp Bayes\' theorem — the foundation of probabilistic ML',
        ],
        content: [
            { type: 'heading', content: 'Probability Distributions in ML' },
            { type: 'text', content: `<p>ML is fundamentally about probability. A classifier doesn't say "this is a cat" — it says "there's an 87% probability this is a cat." Understanding distributions helps you interpret your model's outputs and make better architecture decisions.</p>` },
            {
                type: 'code', title: 'Key distributions', filename: 'distributions.py', height: '340px', content: `import numpy as np

np.random.seed(42)

# Normal (Gaussian) distribution — appears everywhere in ML
# Used for weight initialization, noise modeling, and more
normal_data = np.random.normal(loc=0, scale=1, size=10000)
print("Normal distribution:")
print(f"  Mean: {np.mean(normal_data):.3f} (expected: 0)")
print(f"  Std:  {np.std(normal_data):.3f} (expected: 1)")
print(f"  Within 1σ: {(np.abs(normal_data) < 1).mean():.1%} (expected: 68.3%)")
print(f"  Within 2σ: {(np.abs(normal_data) < 2).mean():.1%} (expected: 95.4%)")

# Bernoulli — binary outcomes (spam/not spam, pass/fail)
p = 0.7  # probability of success
samples = np.random.binomial(1, p, size=1000)
print(f"\\nBernoulli(p={p}) — 1000 samples:")
print(f"  Actual success rate: {samples.mean():.3f}")

# Uniform — used for random initialization
uniform = np.random.uniform(-0.1, 0.1, size=1000)
print(f"\\nUniform[-0.1, 0.1]:")
print(f"  Min: {uniform.min():.4f}, Max: {uniform.max():.4f}, Mean: {uniform.mean():.4f}")` },
            { type: 'heading', content: 'Bayes\' Theorem' },
            {
                type: 'code', title: 'Bayes\' theorem in action', filename: 'bayes.py', height: '300px', content: `# Bayesian spam filter example
# P(spam | "free money") = P("free money" | spam) * P(spam) / P("free money")

p_spam = 0.30               # 30% of emails are spam (prior)
p_free_money_given_spam = 0.80    # 80% of spam contains "free money"
p_free_money_given_ham  = 0.05    # 5% of legit emails contain "free money"

# P("free money") = P(FM|spam)*P(spam) + P(FM|ham)*P(ham)
p_ham = 1 - p_spam
p_free_money = (p_free_money_given_spam * p_spam +
                p_free_money_given_ham  * p_ham)

# Bayes' theorem
p_spam_given_free_money = (p_free_money_given_spam * p_spam) / p_free_money

print("=== BAYESIAN SPAM FILTER ===")
print(f"Prior P(spam):                {p_spam:.0%}")
print(f"P('free money' | spam):       {p_free_money_given_spam:.0%}")
print(f"P('free money' | legit):      {p_free_money_given_ham:.0%}")
print(f"P('free money'):              {p_free_money:.3f}")
print(f"P(spam | 'free money'):       {p_spam_given_free_money:.1%}")
print("\\nConclusion: seeing 'free money' jumps spam probability from 30% to", f"{p_spam_given_free_money:.0%}")` },
        ],
        exercises: [
            {
                title: 'Confidence Interval Calculator',
                description: 'Calculate confidence intervals for model accuracy from evaluation samples — essential for reporting ML results.',
                starterCode: `import numpy as np

def bootstrap_confidence_interval(data, n_bootstrap=1000, confidence=0.95):
    """
    Compute confidence interval using bootstrap resampling.
    Returns (mean, lower_bound, upper_bound)
    """
    means = []
    n = len(data)
    for _ in range(n_bootstrap):
        # Sample with replacement
        sample = np.random.choice(data, size=n, replace=True)
        means.append(np.mean(sample))

    alpha = (1 - confidence) / 2
    lower = np.percentile(means, alpha * 100)
    upper = np.percentile(means, (1 - alpha) * 100)
    return np.mean(data), lower, upper

np.random.seed(42)
# Model accuracy on 200 test samples (1=correct, 0=wrong)
results = np.random.binomial(1, 0.85, size=200)

mean, lower, upper = bootstrap_confidence_interval(results)
print(f"Model Accuracy: {mean:.1%}")
print(f"95% CI: [{lower:.1%}, {upper:.1%}]")
print(f"Margin of error: ±{(upper-lower)/2:.1%}")
`,
            },
        ],
        quiz: [
            { question: 'Why is the normal distribution so important in ML?', options: ['It\'s the simplest distribution', 'Weight initialization, gradient distributions, and central limit theorem make it ubiquitous', 'It\'s required by PyTorch', 'It only produces values between 0 and 1'], correct: 1, explanation: 'The Central Limit Theorem shows that sums/averages of random variables approach normal distributions. Neural network activations, gradients, and errors often approximate normal distributions, making it a natural choice for initialisation and noise modeling.' },
        ],
    },

    {
        day: 13, phase: 1, duration: '2h',
        title: 'Calculus for ML — Derivatives & Gradient Descent',
        objectives: [
            'Understand derivatives as "rate of change"',
            'Implement gradient descent from scratch',
            'Visualise how a model learns by following the gradient',
            'Understand the chain rule — the heart of backpropagation',
        ],
        content: [
            { type: 'heading', content: 'Derivatives — The Slope of the Loss' },
            { type: 'text', content: `<p>Gradient descent is how every neural network learns. To understand it, you need one key concept: <strong>the derivative tells you which direction to move to decrease a function</strong>. That's it. The gradient is just "the collection of all derivatives for all parameters".</p>` },
            {
                type: 'code', title: 'Numerical gradient', filename: 'gradient.py', height: '300px', content: `import numpy as np

def loss_function(w):
    """Simple quadratic loss: L(w) = (w - 3)^2
    Minimum is at w = 3 (gradient = 0 there)
    """
    return (w - 3) ** 2

def numerical_gradient(f, w, eps=1e-5):
    """Approximate derivative using finite differences."""
    return (f(w + eps) - f(w - eps)) / (2 * eps)

# Watch gradient descent work
w = 0.0      # start far from minimum
lr = 0.1     # learning rate

print(f"{'Step':>4}  {'w':>8}  {'Loss':>10}  {'Gradient':>10}")
print("-" * 44)
for step in range(20):
    loss = loss_function(w)
    grad = numerical_gradient(loss_function, w)
    if step % 4 == 0:
        print(f"{step:>4}  {w:>8.4f}  {loss:>10.6f}  {grad:>10.4f}")
    w = w - lr * grad   # gradient descent update

print(f"\\nFinal w = {w:.6f} (optimal = 3.0)")` },
            { type: 'heading', content: 'Implementing Gradient Descent from Scratch' },
            {
                type: 'code', title: 'Linear regression with gradient descent', filename: 'gradient_descent.py', height: '340px', content: `import numpy as np

np.random.seed(42)

# Generate synthetic data: y = 2x + 1 + noise
X = np.random.uniform(0, 10, 50)
y_true = 2 * X + 1 + np.random.normal(0, 1.5, 50)

# Initialize parameters randomly
w = 0.0   # weight (true = 2)
b = 0.0   # bias   (true = 1)
lr = 0.005

print("Learning y = w*x + b from data...")
print(f"{'Epoch':>6} {'w':>8} {'b':>8} {'MSE Loss':>12}")
print("-" * 40)

for epoch in range(100):
    # Forward pass: predictions
    y_pred = w * X + b

    # Loss: Mean Squared Error
    loss = np.mean((y_pred - y_true) ** 2)

    # Gradients (calculus!)
    dL_dw = np.mean(2 * (y_pred - y_true) * X)
    dL_db = np.mean(2 * (y_pred - y_true))

    # Gradient descent update
    w -= lr * dL_dw
    b -= lr * dL_db

    if epoch % 20 == 0:
        print(f"{epoch:>6} {w:>8.4f} {b:>8.4f} {loss:>12.4f}")

print(f"\\nLearned: w={w:.3f} (true=2.0), b={b:.3f} (true=1.0)")` },
        ],
        exercises: [
            {
                title: 'Learning Rate Experiment',
                description: 'Run gradient descent with 3 different learning rates (0.001, 0.1, 1.0) and compare convergence. Learning rate is the most important hyperparameter.',
                starterCode: `import numpy as np

def run_gd(lr, epochs=50):
    """Run gradient descent on f(w) = w^2 - 4w + 4, starting at w=10."""
    # True minimum is at w=2
    w = 10.0
    history = [w]
    for _ in range(epochs):
        grad = 2*w - 4   # derivative of f(w)
        w = w - lr * grad
        history.append(w)
    return history

learning_rates = [0.001, 0.1, 1.0]

for lr in learning_rates:
    hist = run_gd(lr)
    final_w = hist[-1]
    status = "converged" if abs(final_w - 2.0) < 0.01 else "diverged" if abs(final_w) > 100 else "slow"
    print(f"LR={lr}: final w={final_w:.4f} — {status}")
    # Show first 5 steps
    print(f"  Steps: {' → '.join(f'{h:.3f}' for h in hist[:6])} ...")
`,
            },
        ],
        quiz: [
            { question: 'If the gradient of the loss with respect to a weight is positive, which direction should we update the weight?', options: ['Increase the weight', 'Decrease the weight', 'Keep the weight the same', 'Double the weight'], correct: 1, explanation: 'A positive gradient means the loss increases as the weight increases. To minimize loss, we move in the OPPOSITE direction: w = w - lr * gradient. So we decrease the weight.' },
            { question: 'What happens if the learning rate is too large?', options: ['Training is very slow', 'The model underfits', 'Loss oscillates or diverges', 'Gradients become zero'], correct: 2, explanation: 'A large learning rate causes the optimizer to overshoot the minimum, jumping back and forth. Eventually it may diverge (loss goes to infinity). This is why learning rate is the most critical hyperparameter.' },
        ],
    },

    {
        day: 14, phase: 1, duration: '2h',
        title: 'Putting It All Together — Data Pipeline',
        objectives: [
            'Build a complete data pipeline from raw data to model-ready features',
            'Handle categorical encoding, normalisation, and train/test split',
            'Understand why preprocessing is critical in ML',
            'Build a reusable Preprocessor class',
        ],
        content: [
            { type: 'heading', content: 'The ML Data Pipeline' },
            { type: 'text', content: `<p>A typical ML project spends 80% of time on data, 20% on modelling. Here's why: raw data is messy, inconsistent, and not in the format models expect. A solid pipeline transforms raw data into clean, normalised, model-ready features <strong>reproducibly</strong>.</p>` },
            {
                type: 'code', title: 'Full preprocessing pipeline', filename: 'pipeline.py', height: '360px', content: `import numpy as np

class DataPreprocessor:
    """A simple ML preprocessing pipeline."""

    def __init__(self):
        self.means = {}
        self.stds = {}
        self.fitted = False

    def fit(self, data: dict):
        """Learn stats from training data. Call ONLY on training set."""
        for col, values in data.items():
            arr = np.array(values, dtype=float)
            self.means[col] = np.mean(arr)
            self.stds[col]  = np.std(arr) + 1e-8  # avoid divide by zero
        self.fitted = True
        return self

    def transform(self, data: dict):
        """Apply learned normalization. Call on any split."""
        if not self.fitted:
            raise RuntimeError("Call fit() first!")
        result = {}
        for col, values in data.items():
            arr = np.array(values, dtype=float)
            result[col] = (arr - self.means[col]) / self.stds[col]
        return result

    def fit_transform(self, data: dict):
        return self.fit(data).transform(data)

# Example usage
np.random.seed(42)
raw_data = {
    "age":       [25, 32, 47, 19, 55, 38, 29, 43],
    "income":    [35000, 62000, 95000, 22000, 120000, 58000, 41000, 87000],
    "education": [12, 16, 18, 10, 20, 16, 14, 18],
}

preprocessor = DataPreprocessor()
normalised = preprocessor.fit_transform(raw_data)

print("Original vs. Normalised:")
for col in raw_data:
    orig = raw_data[col]
    norm = normalised[col]
    print(f"  {col}: [{orig[0]}, {orig[1]}...] → [{norm[0]:.3f}, {norm[1]:.3f}...]")
    print(f"    mean={np.mean(norm):.6f}, std={np.std(norm):.3f}")` },
            { type: 'heading', content: 'Train/Test Split' },
            {
                type: 'code', title: 'Proper data splitting', filename: 'split.py', height: '280px', content: `import numpy as np

def train_test_split(X, y, test_size=0.2, random_state=42):
    """Split data into train and test sets."""
    np.random.seed(random_state)
    n = len(X)
    indices = np.random.permutation(n)       # shuffle indices
    split = int(n * (1 - test_size))
    train_idx = indices[:split]
    test_idx  = indices[split:]
    return X[train_idx], X[test_idx], y[train_idx], y[test_idx]

# Create sample dataset
np.random.seed(0)
X = np.random.randn(100, 5)      # 100 samples, 5 features
y = (X[:, 0] + X[:, 1] > 0).astype(int)  # binary labels

X_train, X_test, y_train, y_test = train_test_split(X, y)
print(f"Train set: {X_train.shape[0]} samples ({y_train.mean():.1%} positive)")
print(f"Test set:  {X_test.shape[0]} samples ({y_test.mean():.1%} positive)")
print(f"No overlap: {len(set(range(80)) & set(range(80, 100))) == 0}")` },
        ],
        exercises: [
            {
                title: 'One-Hot Encoding',
                description: 'Implement one-hot encoding for categorical features — required before feeding text categories into a neural network.',
                starterCode: `import numpy as np

def one_hot_encode(values, categories=None):
    """
    Convert categorical values to one-hot vectors.
    Returns (encoded_matrix, categories_list)
    """
    if categories is None:
        categories = sorted(set(values))

    encoded = np.zeros((len(values), len(categories)))
    for i, val in enumerate(values):
        idx = categories.index(val)
        encoded[i, idx] = 1.0
    return encoded, categories

# Test it
models = ["GPT-4", "Claude", "Gemini", "GPT-4", "Llama", "Claude"]
encoded, cats = one_hot_encode(models)

print("Categories:", cats)
print("\\nOne-hot matrix:")
for model, row in zip(models, encoded):
    print(f"  {model:<10}: {row.astype(int)}")
`,
                hint: 'Use sorted(set(values)) to get unique categories, then find index and set to 1.',
            },
        ],
        quiz: [
            { question: 'Why must you fit the preprocessor ONLY on training data?', options: ['It\'s faster', 'To prevent data leakage — test data must stay unseen', 'The test data might have missing values', 'Sklearn requires it'], correct: 1, explanation: 'If you fit on all data, the normalisation stats will include test data information. The model indirectly "sees" test data during training, giving falsely optimistic accuracy. This is called data leakage.' },
        ],
    },

    {
        day: 15, phase: 1, duration: '4h',
        title: 'Phase 1 Project — Exploratory Data Analysis',
        objectives: [
            'Apply all Phase 1 skills to a real dataset',
            'Produce a complete EDA with statistics, patterns, and insights',
            'Build a reusable analysis pipeline',
            'Present findings clearly — a key professional skill',
        ],
        content: [
            { type: 'heading', content: '🎯 Phase 1 Capstone Project' },
            { type: 'text', content: `<p>Today you apply everything from Phase 1 to do a complete Exploratory Data Analysis (EDA) on a simulated AI model evaluation dataset. In a real job, this is the first thing you do with any new dataset — before a single model is trained.</p><p>Your goal: understand the data, find patterns, spot problems, and generate insights that would guide model development.</p>` },
            { type: 'warning', content: `This is a 4-hour project day. Work through each section carefully. The exercises build on each other. <strong>Do not skip steps</strong> — the discipline of thorough EDA is what separates good ML engineers from great ones.` },
            { type: 'note', content: `<strong>Capstone deliverable checklist:</strong> by the end of today you should be able to answer five questions clearly: What is in the dataset? What is missing or suspicious? Which patterns are strongest? Which metrics vary by model or task? What should the team investigate next?` },
            {
                type: 'code', title: 'Project: AI Evaluation EDA', filename: 'eda_project.py', height: '400px', content: `import numpy as np
import json

# ═══════════════════════════════════════════════════════════════
# PART 1: LOAD & INSPECT
# ═══════════════════════════════════════════════════════════════
np.random.seed(42)
n = 500

models     = np.random.choice(["GPT-4", "Claude-3", "Gemini-Pro", "Llama-3"], n)
tasks      = np.random.choice(["coding", "reasoning", "writing", "math"], n)
scores     = np.clip(np.random.normal(0.76, 0.12, n), 0, 1).round(3)
latency    = np.random.exponential(800, n).round().astype(int)
token_cost = (np.random.uniform(0.001, 0.05, n)).round(4)

# Inject some issues
scores[np.random.choice(n, 20)] = None   # missing values
scores = np.where(scores == None, np.nan, scores)
latency[np.random.choice(n, 10)] = np.random.choice([5000, 8000, 12000], 10)  # outliers

dataset = {
    "model": models.tolist(),
    "task": tasks.tolist(),
    "score": [float(s) if not np.isnan(s) else None for s in scores],
    "latency_ms": latency.tolist(),
    "cost_usd": token_cost.tolist(),
}

print("=== DATASET OVERVIEW ===")
print(f"Total records:  {n}")
print(f"Models:         {set(models)}")
print(f"Tasks:          {set(tasks)}")

numeric_keys = ["score", "latency_ms", "cost_usd"]
for key in numeric_keys:
    vals = [v for v in dataset[key] if v is not None]
    print(f"\\n{key}:")
    print(f"  Count: {len(vals)}, Missing: {n - len(vals)}")
    print(f"  Mean: {np.mean(vals):.4f}")
    print(f"  Std:  {np.std(vals):.4f}")
    print(f"  Min:  {np.min(vals):.4f}")
    print(f"  Max:  {np.max(vals):.4f}")` },
            {
                type: 'code', title: 'Part 2: Per-Model Analysis', filename: 'eda_model_analysis.py', height: '360px', content: `import numpy as np

np.random.seed(42)
n = 500
models  = np.random.choice(["GPT-4", "Claude-3", "Gemini-Pro", "Llama-3"], n)
tasks   = np.random.choice(["coding", "reasoning", "writing", "math"], n)
scores  = np.clip(np.random.normal(0.76, 0.12, n), 0, 1)
latency = np.random.exponential(800, n).round().astype(int)
cost    = np.random.uniform(0.001, 0.05, n)

# ── Per-model statistics ──────────────────────────────────────
print("=== PER-MODEL PERFORMANCE ===")
print(f"{'Model':<15} {'Avg Score':>10} {'Avg Latency':>12} {'Avg Cost':>10} {'Count':>7}")
print("-" * 58)

for model in sorted(set(models)):
    mask = models == model
    print(f"{model:<15} "
          f"{np.mean(scores[mask]):>10.3f} "
          f"{np.mean(latency[mask]):>12.0f}ms "
          f"\${np.mean(cost[mask]):> 9.4f} "
          f"{mask.sum():>7}")

# ── Per - task statistics ───────────────────────────────────────
print("\\n=== PER-TASK PERFORMANCE ===")
print(f"{'Task':<12} {'Avg Score':>10} {'Best Model':<15}")
print("-" * 40)
for task in sorted(set(tasks)):
    mask = tasks == task
    avg = np.mean(scores[mask])
    # Find best model for this task
    best_score = -1
    best_model = ""
    for model in set(models):
        m = (models == model) & mask
        if m.sum() > 0 and np.mean(scores[m]) > best_score:
            best_score = np.mean(scores[m])
            best_model = model
    print(f"{task:<12} {avg:>10.3f} {best_model:<15}")

print("\\n=== KEY INSIGHTS ===")
best_overall = max(set(models), key = lambda m: np.mean(scores[models == m]))
fastest = min(set(models), key = lambda m: np.mean(latency[models == m]))
cheapest = min(set(models), key = lambda m: np.mean(cost[models == m]))
print(f"  Best accuracy: {best_overall}")
print(f"  Fastest:       {fastest}")
print(f"  Cheapest:      {cheapest}")` },
            { type: 'tip', content: `<strong>Think like an analyst, not a script-runner.</strong> Good EDA is not just computing means and plots. It is turning numbers into decisions: what to clean, what to test, and what to model next.` },
    ],
    exercises: [
      {
        title: 'Outlier Detection & Cleaning',
        description: 'Implement IQR-based outlier detection and create a cleaned version of the dataset. This is the most common data cleaning technique.',
        starterCode: `import numpy as np

np.random.seed(42)
latency = np.concatenate([
    np.random.normal(800, 150, 490),   # normal latencies
    np.array([5000, 8000, 12000, 15000, 20000, 25000, 30000, 9000, 11000, 6000])  # outliers
])

def detect_outliers_iqr(data, multiplier = 1.5):
    """
    Detect outliers using the IQR method.
    Returns boolean mask where True = outlier
    """
    Q1 = np.percentile(data, 25)
    Q3 = np.percentile(data, 75)
    IQR = Q3 - Q1
    lower = Q1 - multiplier * IQR
    upper = Q3 + multiplier * IQR
    return (data < lower) | (data > upper)

outlier_mask = detect_outliers_iqr(latency)
clean_data = latency[~outlier_mask]

print(f"Total samples:  {len(latency)}")
print(f"Outliers found: {outlier_mask.sum()}")
print(f"Outlier values: {sorted(latency[outlier_mask].astype(int))}")
print(f"\\nBefore cleaning: mean={latency.mean():.1f}ms, p99={np.percentile(latency,99):.1f}ms")
print(f"After  cleaning: mean={clean_data.mean():.1f}ms, p99={np.percentile(clean_data,99):.1f}ms")
    `,
      },
    ],
    quiz: [
      { question: 'What is the purpose of Exploratory Data Analysis?', options: ['To train the final model', 'To understand data quality, distributions, and patterns before modelling', 'To deploy the model to production', 'To write documentation'], correct: 1, explanation: 'EDA is the detective phase of ML. It reveals missing data, outliers, class imbalances, feature correlations, and data quality issues. Skipping EDA leads to models that perform poorly for reasons you don\'t understand.' },
      { question: 'What does the IQR method use to detect outliers?', options: ['Mean and standard deviation', 'The 25th and 75th percentiles', 'Maximum and minimum values', 'The median and mode'], correct: 1, explanation: 'IQR (Interquartile Range) = Q3 - Q1. Outliers are values below Q1 - 1.5*IQR or above Q3 + 1.5*IQR. This is more robust than mean ± 2std because it\'s not affected by the outliers themselves.' },
    ],
  },
]
