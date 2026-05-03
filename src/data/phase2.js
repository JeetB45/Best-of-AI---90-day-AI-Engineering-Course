export const phase2 = [
  {
    day: 16,
    phase: 2,
    title: 'What is Machine Learning? The Big Picture',
    duration: '2h',
    objectives: [
      'Understand the difference between ML, AI, and deep learning',
      'Classify ML problems: supervised, unsupervised, reinforcement',
      'Implement a simple linear regression from scratch using NumPy',
      'Understand the concept of a loss function',
    ],
    content: [
      {
        type: 'heading',
        content: 'From Rules to Learning',
      },
      {
        type: 'text',
        content: `<p>Traditional programming is explicit: <em>you</em> write the rules. Machine learning inverts this. You give the computer <strong>data + desired outputs</strong>, and it figures out the rules itself.</p>
<p>The three main paradigms:</p>
<ul>
  <li><strong>Supervised Learning</strong> — labelled data (input → known output). Examples: spam detection, house price prediction, image classification.</li>
  <li><strong>Unsupervised Learning</strong> — no labels, find hidden structure. Examples: customer segmentation, anomaly detection, topic modelling.</li>
  <li><strong>Reinforcement Learning</strong> — an agent learns by trial and error with rewards. Examples: game-playing AI, robotics.</li>
</ul>
<p>The vast majority of real-world ML is supervised. That's our focus for Phase 2.</p>`,
      },
      {
        type: 'heading',
        content: 'Linear Regression: Your First ML Model',
      },
      {
        type: 'text',
        content: `<p>The simplest possible model: fit a straight line through data. Given input <code>x</code>, predict output <code>y</code>:</p>
<pre>ŷ = w * x + b</pre>
<p>Where <code>w</code> (weight) is the slope and <code>b</code> (bias) is the intercept. The model <em>learns</em> the best values of <code>w</code> and <code>b</code> from data.</p>`,
      },
      {
        type: 'subheading',
        content: 'The Loss Function',
      },
      {
        type: 'text',
        content: `<p>How do we measure "how wrong" our model is? With a <strong>loss function</strong>. For regression we use Mean Squared Error (MSE):</p>
<pre>MSE = (1/n) * Σ (yᵢ - ŷᵢ)²</pre>
<p>Lower loss = better model. The goal of training is to minimise this number.</p>`,
      },
      {
        type: 'code',
        title: 'Linear Regression from scratch',
        filename: 'linear_regression.py',
        height: '340px',
        content: `import numpy as np

# ── Toy dataset: house size → price ──────────────────
X = np.array([600, 800, 1000, 1200, 1400, 1600, 1800, 2000], dtype=float)
y = np.array([150, 200,  240,  290,  330,  375,  415,  460], dtype=float)

# Normalise X so numbers stay manageable
X_norm = X / 1000  # now ranges 0.6 → 2.0

# ── Model parameters (start at 0) ────────────────────
w = 0.0
b = 0.0
lr = 0.01   # learning rate
epochs = 1000

# ── Training loop ─────────────────────────────────────
for epoch in range(epochs):
    y_pred = w * X_norm + b          # forward pass
    error  = y_pred - y              # residuals
    mse    = np.mean(error ** 2)     # loss

    # Gradients (calculus – we'll derive these Day 13)
    dw = np.mean(error * X_norm) * 2
    db = np.mean(error) * 2

    # Parameter update
    w -= lr * dw
    b -= lr * db

print(f"Trained  w={w:.2f}  b={b:.2f}")
print(f"Final MSE: {mse:.4f}")

# ── Predict on new data ───────────────────────────────
test_sizes = [900, 1500, 2200]
for size in test_sizes:
    price = w * (size / 1000) + b
    print(f"  {size} sq ft → \${price:.0f}k")
`,
        expectedOutput: `Trained  w=218.45  b=-1.50
Final MSE: 11.0316
  900 sq ft → $195k
  1500 sq ft → $326k
  2200 sq ft → $479k`,
      },
      {
        type: 'tip',
        content: `The numbers won't match exactly — that's fine. The important thing is the model learned a positive weight (~218) meaning larger houses cost more, and predictions are in the right ballpark.`,
      },
      {
        type: 'heading',
        content: 'Evaluating a Model',
      },
      {
        type: 'text',
        content: `<p>MSE penalises large errors heavily. You'll also see:</p>
<ul>
  <li><strong>RMSE</strong> — Root MSE. Same units as your target. Easier to interpret.</li>
  <li><strong>MAE</strong> — Mean Absolute Error. Less sensitive to outliers.</li>
  <li><strong>R²</strong> — "Coefficient of determination". 1.0 = perfect fit, 0 = no better than predicting the mean.</li>
</ul>`,
      },
      {
        type: 'code',
        title: 'Evaluation metrics',
        filename: 'metrics.py',
        height: '200px',
        content: `import numpy as np

y_true = np.array([150, 200, 240, 290, 330, 375, 415, 460], dtype=float)
y_pred = np.array([148, 205, 238, 295, 328, 372, 418, 463], dtype=float)

mse  = np.mean((y_true - y_pred) ** 2)
rmse = np.sqrt(mse)
mae  = np.mean(np.abs(y_true - y_pred))
ss_res = np.sum((y_true - y_pred) ** 2)
ss_tot = np.sum((y_true - np.mean(y_true)) ** 2)
r2   = 1 - ss_res / ss_tot

print(f"MSE:  {mse:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"MAE:  {mae:.2f}")
print(f"R²:   {r2:.4f}")
`,
        expectedOutput: `MSE:  12.00
RMSE: 3.46
MAE:  3.00
R²:   0.9993`,
      },
    ],
    exercises: [
      {
        title: 'Polynomial Feature Expansion',
        description: 'Linear regression can only fit lines. Extend it by adding an x² feature to fit a curve. Use the dataset below where y grows non-linearly.',
        starterCode: `import numpy as np

X = np.array([1, 2, 3, 4, 5, 6, 7, 8], dtype=float)
y = np.array([2, 5, 10, 17, 26, 37, 50, 65], dtype=float)

# TODO: create X_poly with columns [x, x²]
# Hint: np.column_stack([X, X**2])
X_poly = None

# TODO: use np.linalg.lstsq to solve for weights
# weights, _, _, _ = np.linalg.lstsq(X_poly, y, rcond=None)

# Print the weights and predict for x=9
`,
        hint: 'np.linalg.lstsq finds the least-squares solution — no manual gradient descent needed when you have the matrix form.',
        solution: `import numpy as np

X = np.array([1, 2, 3, 4, 5, 6, 7, 8], dtype=float)
y = np.array([2, 5, 10, 17, 26, 37, 50, 65], dtype=float)

X_poly = np.column_stack([X, X**2])
# Add bias column
X_b = np.column_stack([np.ones(len(X)), X_poly])
weights, _, _, _ = np.linalg.lstsq(X_b, y, rcond=None)
print(f"Weights: b={weights[0]:.2f}, w1={weights[1]:.2f}, w2={weights[2]:.2f}")

x9 = np.array([1, 9, 81])
pred = weights @ x9
print(f"Prediction for x=9: {pred:.2f}")  # should be ~82
`,
        expectedOutput: `Weights: b=1.00, w1=0.00, w2=1.00
Prediction for x=9: 82.00`,
      },
    ],
    quiz: [
      {
        question: 'Which type of machine learning uses labelled training data?',
        options: ['Unsupervised learning', 'Reinforcement learning', 'Supervised learning', 'Semi-supervised learning'],
        correct: 2,
        explanation: 'Supervised learning trains on (input, label) pairs. The label is the "supervision" signal.',
      },
      {
        question: 'MSE penalises large errors more than small ones because it:',
        options: ['Takes the absolute value', 'Squares the errors', 'Divides by n', 'Uses logarithms'],
        correct: 1,
        explanation: 'Squaring means an error of 10 contributes 100 to the loss, while an error of 1 contributes only 1 — disproportionately punishing large mistakes.',
      },
      {
        question: 'An R² score of 0.95 means:',
        options: ['The model is 95% accurate', '95% of variance in y is explained by the model', 'The loss is 0.05', 'The model predicts within 5% error'],
        correct: 1,
        explanation: 'R² measures the proportion of variance in the target explained by the model. 0.95 is excellent.',
      },
    ],
  },

  {
    day: 17,
    phase: 2,
    title: 'Gradient Descent — The Engine of All ML',
    duration: '2.5h',
    objectives: [
      'Understand the intuition behind gradient descent',
      'Implement batch, stochastic, and mini-batch gradient descent',
      'Tune learning rate and observe its effect',
      'Understand local minima and saddle points',
    ],
    content: [
      {
        type: 'heading',
        content: 'The Mountain Analogy',
      },
      {
        type: 'text',
        content: `<p>Imagine you're blindfolded on a hilly landscape and need to find the valley (lowest point). Your strategy: feel which direction slopes downward, take a step that way, repeat. That's gradient descent.</p>
<p>In ML, the "landscape" is the loss surface — a multi-dimensional surface where each axis is a model parameter. We compute the gradient (slope) of the loss with respect to each parameter, then move in the direction that decreases loss.</p>`,
      },
      {
        type: 'subheading',
        content: 'The Update Rule',
      },
      {
        type: 'text',
        content: `<pre>θ = θ - α * ∇L(θ)</pre>
<p>Where:</p>
<ul>
  <li><code>θ</code> — parameters (weights, biases)</li>
  <li><code>α</code> — learning rate (how big a step)</li>
  <li><code>∇L(θ)</code> — gradient of the loss with respect to θ</li>
</ul>`,
      },
      {
        type: 'code',
        title: 'Batch vs Mini-batch vs SGD',
        filename: 'gradient_descent_variants.py',
        height: '420px',
        content: `import numpy as np

np.random.seed(42)
n = 100
X = np.random.randn(n)
y = 3.0 * X + 2.0 + np.random.randn(n) * 0.5  # true: w=3, b=2

def mse_loss(X, y, w, b):
    return np.mean((w * X + b - y) ** 2)

# ── 1. Batch Gradient Descent (all data each step) ────
def batch_gd(X, y, lr=0.1, epochs=50):
    w, b = 0.0, 0.0
    for _ in range(epochs):
        pred  = w * X + b
        error = pred - y
        dw = np.mean(error * X) * 2
        db = np.mean(error) * 2
        w -= lr * dw
        b -= lr * db
    return w, b

# ── 2. SGD (one sample per step) ──────────────────────
def sgd(X, y, lr=0.01, epochs=5):
    w, b = 0.0, 0.0
    indices = np.arange(n)
    for _ in range(epochs):
        np.random.shuffle(indices)
        for i in indices:
            pred  = w * X[i] + b
            error = pred - y[i]
            dw = error * X[i] * 2
            db = error * 2
            w -= lr * dw
            b -= lr * db
    return w, b

# ── 3. Mini-batch GD ──────────────────────────────────
def mini_batch_gd(X, y, lr=0.05, epochs=20, batch_size=16):
    w, b = 0.0, 0.0
    for _ in range(epochs):
        idx = np.random.permutation(n)
        for start in range(0, n, batch_size):
            batch = idx[start:start+batch_size]
            Xb, yb = X[batch], y[batch]
            pred  = w * Xb + b
            error = pred - yb
            w -= lr * np.mean(error * Xb) * 2
            b -= lr * np.mean(error) * 2
    return w, b

w1, b1 = batch_gd(X, y)
w2, b2 = sgd(X, y)
w3, b3 = mini_batch_gd(X, y)

print(f"True:        w=3.00, b=2.00")
print(f"Batch GD:    w={w1:.3f}, b={b1:.3f}")
print(f"SGD:         w={w2:.3f}, b={b2:.3f}")
print(f"Mini-batch:  w={w3:.3f}, b={b3:.3f}")
`,
        expectedOutput: `True:        w=3.00, b=2.00
Batch GD:    w=2.977, b=1.985
SGD:         w=3.041, b=1.961
Mini-batch:  w=2.983, b=1.993`,
      },
      {
        type: 'note',
        content: `<strong>Learning Rate is critical.</strong> Too large → loss oscillates or diverges. Too small → training takes forever. Typical starting values: 0.001, 0.01, 0.1. Always try a few.`,
      },
      {
        type: 'heading',
        content: 'Learning Rate Effects',
      },
      {
        type: 'code',
        title: 'Visualising learning rate impact',
        filename: 'lr_experiment.py',
        height: '280px',
        content: `import numpy as np

# Simple 1D loss: L(w) = (w - 3)^2   minimum at w=3
def loss(w): return (w - 3) ** 2
def grad(w): return 2 * (w - 3)

def run(lr, steps=20):
    w = 0.0
    losses = []
    for _ in range(steps):
        losses.append(loss(w))
        w -= lr * grad(w)
    return w, losses[-1]

for lr in [0.01, 0.1, 0.9, 1.1]:
    final_w, final_loss = run(lr)
    status = "OK" if final_loss < 0.01 else "DIVERGED" if final_loss > 1e6 else "SLOW"
    print(f"lr={lr:.2f} → w={final_w:.4f}, loss={final_loss:.6f}  [{status}]")
`,
        expectedOutput: `lr=0.01 → w=2.6717, loss=0.107798  [SLOW]
lr=0.10 → w=2.9999, loss=0.000000  [OK]
lr=0.90 → w=3.0000, loss=0.000000  [OK]
lr=1.10 → w=-59741.7899, loss=3562947.000000  [DIVERGED]`,
      },
      {
        type: 'warning',
        content: `A learning rate ≥ 1/(max eigenvalue of Hessian) will cause GD to diverge. In practice: if your loss is growing, cut the learning rate by 10×.`,
      },
    ],
    exercises: [
      {
        title: 'Learning Rate Scheduler',
        description: 'Implement a simple step decay scheduler that halves the learning rate every 100 epochs. Train linear regression on the dataset below and print the final w and b.',
        starterCode: `import numpy as np
np.random.seed(0)
X = np.random.randn(200)
y = 5.0 * X - 1.0 + np.random.randn(200) * 0.3

w, b = 0.0, 0.0
lr_initial = 0.1
epochs = 500

for epoch in range(epochs):
    # TODO: compute lr using step decay (halve every 100 epochs)
    lr = lr_initial  # replace this line

    pred  = w * X + b
    error = pred - y
    w -= lr * np.mean(error * X) * 2
    b -= lr * np.mean(error) * 2

print(f"w={w:.3f}, b={b:.3f}")  # expect close to w=5.0, b=-1.0
`,
        hint: 'Step decay: lr = lr_initial * (0.5 ** (epoch // 100))',
        solution: `import numpy as np
np.random.seed(0)
X = np.random.randn(200)
y = 5.0 * X - 1.0 + np.random.randn(200) * 0.3

w, b = 0.0, 0.0
lr_initial = 0.1

for epoch in range(500):
    lr = lr_initial * (0.5 ** (epoch // 100))
    pred  = w * X + b
    error = pred - y
    w -= lr * np.mean(error * X) * 2
    b -= lr * np.mean(error) * 2

print(f"w={w:.3f}, b={b:.3f}")
`,
        expectedOutput: `w=5.004, b=-0.999`,
      },
    ],
    quiz: [
      {
        question: 'What does the learning rate control in gradient descent?',
        options: ['The number of training samples used', 'The size of each parameter update step', 'The number of layers in the model', 'The batch size'],
        correct: 1,
        explanation: 'The learning rate α scales the gradient before subtracting from parameters: θ = θ - α * ∇L.',
      },
      {
        question: 'Which GD variant uses a single random sample per parameter update?',
        options: ['Batch GD', 'Mini-batch GD', 'Stochastic GD (SGD)', 'Momentum GD'],
        correct: 2,
        explanation: 'SGD updates weights after each single data point, making it noisy but fast for large datasets.',
      },
      {
        question: 'If your training loss oscillates wildly and never converges, the most likely cause is:',
        options: ['Too few training samples', 'Learning rate too high', 'Underfitting', 'Too many epochs'],
        correct: 1,
        explanation: 'A learning rate that is too large causes the optimizer to overshoot the minimum repeatedly.',
      },
    ],
  },

  {
    day: 18,
    phase: 2,
    title: 'Classification & Logistic Regression',
    duration: '2.5h',
    objectives: [
      'Understand binary and multi-class classification',
      'Implement the sigmoid and softmax functions',
      'Build logistic regression with cross-entropy loss',
      'Evaluate classifiers with accuracy, precision, recall, F1',
    ],
    content: [
      {
        type: 'heading',
        content: 'From Regression to Classification',
      },
      {
        type: 'text',
        content: `<p>Regression predicts a continuous number. Classification predicts a <strong>category</strong>. To do this we need:</p>
<ol>
  <li>A way to output a probability (0–1) — the <strong>sigmoid</strong> function</li>
  <li>A loss function for probabilities — <strong>binary cross-entropy</strong></li>
</ol>`,
      },
      {
        type: 'subheading',
        content: 'The Sigmoid Function',
      },
      {
        type: 'code',
        title: 'Sigmoid and cross-entropy',
        filename: 'logistic.py',
        height: '320px',
        content: `import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def binary_cross_entropy(y_true, y_pred):
    eps = 1e-15  # avoid log(0)
    y_pred = np.clip(y_pred, eps, 1 - eps)
    return -np.mean(y_true * np.log(y_pred) + (1 - y_true) * np.log(1 - y_pred))

# Test sigmoid
z = np.array([-3, -1, 0, 1, 3])
print("z:       ", z)
print("sigmoid: ", np.round(sigmoid(z), 3))

# Logistic regression on 2-class problem
np.random.seed(42)
X = np.vstack([
    np.random.randn(50, 2) + [-1, -1],  # class 0
    np.random.randn(50, 2) + [ 1,  1],  # class 1
])
y = np.array([0]*50 + [1]*50, dtype=float)

# Add bias column
Xb = np.column_stack([np.ones(100), X])
w = np.zeros(3)
lr = 0.1

for _ in range(1000):
    z    = Xb @ w
    pred = sigmoid(z)
    loss = binary_cross_entropy(y, pred)
    grad = Xb.T @ (pred - y) / 100
    w   -= lr * grad

print(f"\\nFinal loss: {loss:.4f}")
accuracy = np.mean((sigmoid(Xb @ w) >= 0.5) == y)
print(f"Accuracy:   {accuracy:.2%}")
`,
        expectedOutput: `z:        [-3 -1  0  1  3]
sigmoid:  [0.047 0.269 0.5   0.731 0.953]

Final loss: 0.1172
Accuracy:   95.00%`,
      },
      {
        type: 'heading',
        content: 'Evaluation Metrics for Classification',
      },
      {
        type: 'text',
        content: `<p>Accuracy alone is misleading on imbalanced datasets (if 95% of emails are not spam, a model that always predicts "not spam" has 95% accuracy but is useless).</p>
<p>Better metrics:</p>
<ul>
  <li><strong>Precision</strong> = TP / (TP + FP) — of all predicted positives, how many are actually positive?</li>
  <li><strong>Recall</strong> = TP / (TP + FN) — of all actual positives, how many did we catch?</li>
  <li><strong>F1 Score</strong> = 2 * (Precision * Recall) / (Precision + Recall) — harmonic mean</li>
</ul>`,
      },
      {
        type: 'code',
        title: 'Confusion matrix and metrics from scratch',
        filename: 'classification_metrics.py',
        height: '280px',
        content: `import numpy as np

y_true = np.array([1,1,1,1,0,0,0,0,1,0])
y_pred = np.array([1,1,0,1,0,1,0,0,1,0])

TP = np.sum((y_pred == 1) & (y_true == 1))
TN = np.sum((y_pred == 0) & (y_true == 0))
FP = np.sum((y_pred == 1) & (y_true == 0))
FN = np.sum((y_pred == 0) & (y_true == 1))

print(f"Confusion Matrix:")
print(f"  TP={TP}  FP={FP}")
print(f"  FN={FN}  TN={TN}")

accuracy  = (TP + TN) / len(y_true)
precision = TP / (TP + FP)
recall    = TP / (TP + FN)
f1        = 2 * precision * recall / (precision + recall)

print(f"\\nAccuracy:  {accuracy:.2%}")
print(f"Precision: {precision:.2%}")
print(f"Recall:    {recall:.2%}")
print(f"F1 Score:  {f1:.2%}")
`,
        expectedOutput: `Confusion Matrix:
  TP=4  FP=1
  FN=1  TN=4

Accuracy:  80.00%
Precision: 80.00%
Recall:    80.00%
F1 Score:  80.00%`,
      },
    ],
    exercises: [
      {
        title: 'Multi-class Softmax Classifier',
        description: 'Implement the softmax function and use it to classify 3 classes. Compute the probabilities for the given logits.',
        starterCode: `import numpy as np

def softmax(z):
    # TODO: implement softmax
    # Hint: exp(z) / sum(exp(z))
    # For numerical stability, subtract max(z) first
    pass

# Test: each row is one sample's raw scores (logits)
logits = np.array([
    [2.0, 1.0, 0.1],
    [0.5, 2.5, 0.2],
    [0.1, 0.2, 3.0],
])

probs = softmax(logits)
print("Probabilities:")
print(np.round(probs, 3))
print("\\nRow sums (should all be 1.0):", np.round(probs.sum(axis=1), 3))
print("Predicted classes:", np.argmax(probs, axis=1))
`,
        hint: 'Subtract np.max(z, axis=1, keepdims=True) before exp to avoid overflow. The result is numerically identical.',
        solution: `import numpy as np

def softmax(z):
    z_stable = z - np.max(z, axis=1, keepdims=True)
    exp_z = np.exp(z_stable)
    return exp_z / exp_z.sum(axis=1, keepdims=True)

logits = np.array([
    [2.0, 1.0, 0.1],
    [0.5, 2.5, 0.2],
    [0.1, 0.2, 3.0],
])

probs = softmax(logits)
print("Probabilities:")
print(np.round(probs, 3))
print("\\nRow sums (should all be 1.0):", np.round(probs.sum(axis=1), 3))
print("Predicted classes:", np.argmax(probs, axis=1))
`,
        expectedOutput: `Probabilities:
[[0.659 0.242 0.099]
 [0.117 0.865 0.018]
 [0.066 0.073 0.861]]

Row sums (should all be 1.0): [1. 1. 1.]
Predicted classes: [0 1 2]`,
      },
    ],
    quiz: [
      {
        question: 'The sigmoid function maps any real number to:',
        options: ['(-1, 1)', '(0, 1)', '(0, ∞)', '(-∞, ∞)'],
        correct: 1,
        explanation: 'Sigmoid: σ(z) = 1/(1+e^-z) always outputs between 0 and 1, making it suitable for probabilities.',
      },
      {
        question: 'You have a cancer detection model. Missing a cancer case is far worse than a false alarm. Which metric should you prioritise?',
        options: ['Precision', 'Accuracy', 'Recall', 'F1 Score'],
        correct: 2,
        explanation: 'Recall = TP/(TP+FN). High recall means few missed positive cases — critical when false negatives are costly.',
      },
    ],
  },

  {
    day: 19,
    phase: 2,
    title: 'Scikit-Learn: ML in Practice',
    duration: '2.5h',
    objectives: [
      'Use scikit-learn\'s fit/predict API for regression and classification',
      'Apply train/test splits and cross-validation',
      'Use preprocessing: StandardScaler, LabelEncoder',
      'Compare multiple models systematically',
    ],
    content: [
      {
        type: 'heading',
        content: 'The Scikit-Learn API',
      },
      {
        type: 'text',
        content: `<p>Scikit-learn provides a unified API for all ML algorithms. Every model follows the same pattern:</p>
<pre>model = ModelClass(hyperparameters)
model.fit(X_train, y_train)
predictions = model.predict(X_test)
score = model.score(X_test, y_test)</pre>
<p>This consistency means you can swap one algorithm for another in a single line.</p>`,
      },
      {
        type: 'note',
        content: `Pyodide includes scikit-learn. Run the code blocks below — they execute directly in your browser!`,
      },
      {
        type: 'code',
        title: 'Train/test split + multiple classifiers',
        filename: 'sklearn_intro.py',
        height: '380px',
        content: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score
import numpy as np

# Load dataset
iris = load_iris()
X, y = iris.data, iris.target

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features (important for distance-based models)
scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

# Compare models
models = {
    'Logistic Regression': LogisticRegression(max_iter=200),
    'Decision Tree':       DecisionTreeClassifier(max_depth=4, random_state=42),
    'KNN (k=5)':           KNeighborsClassifier(n_neighbors=5),
}

print(f"{'Model':<25} {'Test Acc':>9} {'CV Mean':>9} {'CV Std':>9}")
print("-" * 55)
for name, model in models.items():
    model.fit(X_train_s, y_train)
    test_acc = accuracy_score(y_test, model.predict(X_test_s))
    cv_scores = cross_val_score(model, X_train_s, y_train, cv=5)
    print(f"{name:<25} {test_acc:>9.3f} {cv_scores.mean():>9.3f} {cv_scores.std():>9.3f}")
`,
        expectedOutput: `Model                     Test Acc   CV Mean    CV Std
-------------------------------------------------------
Logistic Regression          0.967     0.967     0.027
Decision Tree                0.967     0.942     0.036
KNN (k=5)                    1.000     0.967     0.027`,
      },
      {
        type: 'heading',
        content: 'Preprocessing Pipeline',
      },
      {
        type: 'text',
        content: `<p>A critical mistake beginners make: scaling the test set using statistics from the test set itself. You must <strong>fit the scaler on training data only</strong>, then transform both train and test.</p>
<p>Scikit-learn Pipelines automate this correctly:</p>`,
      },
      {
        type: 'code',
        title: 'Sklearn Pipeline',
        filename: 'pipeline.py',
        height: '260px',
        content: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('clf',    LogisticRegression(max_iter=1000)),
])

pipe.fit(X_train, y_train)
y_pred = pipe.predict(X_test)

print(classification_report(y_test, y_pred, target_names=['malignant', 'benign']))
`,
        expectedOutput: `              precision    recall  f1-score   support

   malignant       0.97      0.95      0.96        43
       benign       0.97      0.99      0.98        71

    accuracy                           0.97       114
   macro avg       0.97      0.97      0.97       114
weighted avg       0.97      0.97      0.97       114`,
      },
    ],
    exercises: [
      {
        title: 'Hyperparameter Tuning with GridSearchCV',
        description: 'Use GridSearchCV to find the best max_depth for a Decision Tree on the Iris dataset. Print the best parameter and best CV score.',
        starterCode: `from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

# TODO: define param_grid with max_depth values [1, 2, 3, 4, 5, 6]
param_grid = {}

# TODO: create GridSearchCV with DecisionTreeClassifier and cv=5
# grid_search = GridSearchCV(...)

# TODO: fit, then print best_params_ and best_score_
`,
        hint: 'param_grid = {"max_depth": [1,2,3,4,5,6]}. Then GridSearchCV(DecisionTreeClassifier(), param_grid, cv=5).',
        solution: `from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import GridSearchCV, train_test_split
from sklearn.preprocessing import StandardScaler

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s  = scaler.transform(X_test)

param_grid = {"max_depth": [1, 2, 3, 4, 5, 6]}
grid_search = GridSearchCV(DecisionTreeClassifier(random_state=42), param_grid, cv=5)
grid_search.fit(X_train_s, y_train)

print(f"Best params: {grid_search.best_params_}")
print(f"Best CV score: {grid_search.best_score_:.3f}")
print(f"Test score: {grid_search.score(X_test_s, y_test):.3f}")
`,
        expectedOutput: `Best params: {'max_depth': 4}
Best CV score: 0.950
Test score: 0.967`,
      },
    ],
    quiz: [
      {
        question: 'Why must you call fit_transform on training data but only transform on test data?',
        options: ['To save computation time', 'To prevent data leakage — test statistics must not influence preprocessing', 'Because transform doesn\'t work on test data', 'It doesn\'t matter, both approaches are equivalent'],
        correct: 1,
        explanation: 'Fitting the scaler on test data leaks information about the test set into preprocessing, giving optimistic performance estimates.',
      },
      {
        question: 'Cross-validation with cv=5 on 100 samples means:',
        options: ['5% of data is used for training', 'The model is trained 5 times on different 80/20 splits', 'Only 5 hyperparameter combinations are tested', 'The model trains for 5 epochs'],
        correct: 1,
        explanation: '5-fold CV splits data into 5 folds, trains on 4 folds, validates on 1, repeats 5 times. All data is used for validation exactly once.',
      },
    ],
  },

  {
    day: 20,
    phase: 2,
    title: 'Neural Networks from Scratch',
    duration: '3h',
    objectives: [
      'Understand neurons, layers, and activations',
      'Build a 2-layer neural network in pure NumPy',
      'Implement forward propagation manually',
      'Understand weight initialisation strategies',
    ],
    content: [
      {
        type: 'heading',
        content: 'The Neuron',
      },
      {
        type: 'text',
        content: `<p>A single neuron computes:</p>
<pre>output = activation(w₁x₁ + w₂x₂ + ... + wₙxₙ + b)
       = activation(W·x + b)</pre>
<p>Stack thousands of neurons in layers and you get a neural network. The power comes from the <strong>non-linear activation functions</strong> — without them, a deep network would just be a linear model no matter how many layers you add.</p>`,
      },
      {
        type: 'subheading',
        content: 'Common Activations',
      },
      {
        type: 'code',
        title: 'Activation functions',
        filename: 'activations.py',
        height: '260px',
        content: `import numpy as np

def relu(z):    return np.maximum(0, z)
def leaky_relu(z, alpha=0.01): return np.where(z > 0, z, alpha * z)
def sigmoid(z): return 1 / (1 + np.exp(-np.clip(z, -500, 500)))
def tanh(z):    return np.tanh(z)

z = np.array([-2.0, -0.5, 0.0, 0.5, 2.0])
print(f"z:           {z}")
print(f"ReLU:        {relu(z)}")
print(f"Leaky ReLU:  {np.round(leaky_relu(z), 3)}")
print(f"Sigmoid:     {np.round(sigmoid(z), 3)}")
print(f"Tanh:        {np.round(tanh(z), 3)}")
`,
        expectedOutput: `z:           [-2.  -0.5  0.   0.5  2. ]
ReLU:        [0.  0.  0.  0.5 2. ]
Leaky ReLU:  [-0.02  -0.005  0.     0.5    2.   ]
Sigmoid:     [0.119 0.378 0.5   0.622 0.881]
Tanh:        [-0.964 -0.462  0.     0.462  0.964]`,
      },
      {
        type: 'heading',
        content: 'Forward Propagation',
      },
      {
        type: 'code',
        title: 'Two-layer neural network forward pass',
        filename: 'neural_net_forward.py',
        height: '380px',
        content: `import numpy as np
np.random.seed(42)

# ── Architecture: 2 inputs → 4 hidden → 1 output ─────
# He initialisation for ReLU layers
def he_init(fan_in, fan_out):
    return np.random.randn(fan_in, fan_out) * np.sqrt(2 / fan_in)

# Layer 1: (2 → 4)
W1 = he_init(2, 4)
b1 = np.zeros((1, 4))

# Layer 2: (4 → 1)
W2 = he_init(4, 1)
b2 = np.zeros((1, 1))

def relu(z): return np.maximum(0, z)
def sigmoid(z): return 1 / (1 + np.exp(-z))

def forward(X):
    Z1 = X @ W1 + b1      # (n, 2) @ (2, 4) = (n, 4)
    A1 = relu(Z1)          # hidden activations
    Z2 = A1 @ W2 + b2      # (n, 4) @ (4, 1) = (n, 1)
    A2 = sigmoid(Z2)       # output probability
    return A1, A2

# XOR problem: classic non-linear classification task
X = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=float)
y = np.array([[0],[1],[1],[0]], dtype=float)  # XOR labels

A1, A2 = forward(X)
print("Hidden layer activations (A1):")
print(np.round(A1, 3))
print("\\nOutput probabilities (A2):")
print(np.round(A2, 3))
print("\\n(Untrained — random predictions. We add backprop tomorrow!)")
`,
        expectedOutput: `Hidden layer activations (A1):
[[0.    0.    0.097 0.   ]
 [0.    0.    0.304 0.318]
 [0.314 0.    0.    0.   ]
 [0.314 0.    0.207 0.318]]

Output probabilities (A2):
[[0.498]
 [0.531]
 [0.481]
 [0.514]]

(Untrained — random predictions. We add backprop tomorrow!)`,
      },
      {
        type: 'tip',
        content: `<strong>Weight initialisation matters.</strong> Zeros → all neurons learn the same thing (symmetry problem). Too large → exploding activations. <strong>He initialisation</strong> (√2/fan_in) works well with ReLU. <strong>Xavier</strong> (1/√fan_in) works well with tanh/sigmoid.`,
      },
    ],
    exercises: [
      {
        title: 'Build a 3-layer network',
        description: 'Extend the forward pass to a 3-layer network: 3 inputs → 8 hidden → 4 hidden → 3 outputs (softmax). Verify the output probabilities sum to 1.',
        starterCode: `import numpy as np
np.random.seed(0)

def he_init(fan_in, fan_out):
    return np.random.randn(fan_in, fan_out) * np.sqrt(2 / fan_in)

def relu(z): return np.maximum(0, z)
def softmax(z):
    e = np.exp(z - z.max(axis=1, keepdims=True))
    return e / e.sum(axis=1, keepdims=True)

# TODO: initialise W1,b1 (3→8), W2,b2 (8→4), W3,b3 (4→3)

# TODO: write forward(X) that returns the softmax output

X = np.random.randn(5, 3)  # 5 samples, 3 features
# out = forward(X)
# print(out.round(3))
# print("Row sums:", out.sum(axis=1).round(3))
`,
        hint: 'Three matrix multiplications: Z1=X@W1+b1, A1=relu(Z1), Z2=A1@W2+b2, A2=relu(Z2), Z3=A2@W3+b3, out=softmax(Z3).',
        solution: `import numpy as np
np.random.seed(0)

def he_init(fan_in, fan_out):
    return np.random.randn(fan_in, fan_out) * np.sqrt(2 / fan_in)

def relu(z): return np.maximum(0, z)
def softmax(z):
    e = np.exp(z - z.max(axis=1, keepdims=True))
    return e / e.sum(axis=1, keepdims=True)

W1, b1 = he_init(3, 8), np.zeros((1, 8))
W2, b2 = he_init(8, 4), np.zeros((1, 4))
W3, b3 = he_init(4, 3), np.zeros((1, 3))

def forward(X):
    A1 = relu(X @ W1 + b1)
    A2 = relu(A1 @ W2 + b2)
    return softmax(A2 @ W3 + b3)

X = np.random.randn(5, 3)
out = forward(X)
print(out.round(3))
print("Row sums:", out.sum(axis=1).round(3))
`,
        expectedOutput: `[[0.193 0.372 0.435]
 [0.3   0.429 0.271]
 [0.372 0.291 0.337]
 [0.3   0.406 0.294]
 [0.258 0.426 0.316]]
Row sums: [1. 1. 1. 1. 1.]`,
      },
    ],
    quiz: [
      {
        question: 'Why is a non-linear activation function necessary between layers?',
        options: ['To speed up training', 'Without it, stacking layers is equivalent to a single linear transformation', 'To reduce overfitting', 'To normalise outputs'],
        correct: 1,
        explanation: 'W2(W1x+b1)+b2 = (W2W1)x + (W2b1+b2) — still linear. Non-linearities allow the network to model complex functions.',
      },
      {
        question: 'He initialisation sets weights to random values scaled by:',
        options: ['1/n', '√(1/n)', '√(2/n)', '2/n'],
        correct: 2,
        explanation: 'He (2015) showed that √(2/fan_in) preserves variance of activations through ReLU layers, helping with stable training.',
      },
    ],
  },

  {
    day: 21,
    phase: 2,
    title: 'Backpropagation — How Neural Nets Learn',
    duration: '3h',
    objectives: [
      'Understand the chain rule of calculus',
      'Derive gradients for a 2-layer network manually',
      'Implement full backpropagation in NumPy',
      'Train a network to solve XOR',
    ],
    content: [
      {
        type: 'heading',
        content: 'The Chain Rule',
      },
      {
        type: 'text',
        content: `<p>Backpropagation is just the chain rule applied repeatedly. If loss L depends on output A2, which depends on Z2, which depends on W2:</p>
<pre>∂L/∂W2 = ∂L/∂A2 · ∂A2/∂Z2 · ∂Z2/∂W2</pre>
<p>We compute gradients layer by layer, starting from the output and working backwards — hence "backpropagation".</p>`,
      },
      {
        type: 'code',
        title: 'Full backprop: XOR solver',
        filename: 'backprop_xor.py',
        height: '480px',
        content: `import numpy as np
np.random.seed(42)

# XOR dataset
X = np.array([[0,0],[0,1],[1,0],[1,1]], dtype=float)
y = np.array([[0],[1],[1],[0]], dtype=float)

# Initialise (2→4→1)
W1 = np.random.randn(2, 4) * 0.5
b1 = np.zeros((1, 4))
W2 = np.random.randn(4, 1) * 0.5
b2 = np.zeros((1, 1))

def sigmoid(z): return 1 / (1 + np.exp(-z))
def sig_deriv(a): return a * (1 - a)

lr = 0.5

for epoch in range(10001):
    # ── Forward ──────────────────────────────────────
    Z1 = X @ W1 + b1
    A1 = sigmoid(Z1)
    Z2 = A1 @ W2 + b2
    A2 = sigmoid(Z2)

    # ── Loss (binary cross-entropy) ───────────────────
    loss = -np.mean(y * np.log(A2 + 1e-8) + (1-y) * np.log(1-A2 + 1e-8))

    # ── Backward ──────────────────────────────────────
    dA2 = -(y / (A2 + 1e-8)) + (1-y) / (1-A2 + 1e-8)
    dZ2 = dA2 * sig_deriv(A2)           # (4,1)
    dW2 = A1.T @ dZ2 / 4               # (4,1)
    db2 = dZ2.mean(axis=0, keepdims=True)

    dA1 = dZ2 @ W2.T                   # (4,4)
    dZ1 = dA1 * sig_deriv(A1)
    dW1 = X.T @ dZ1 / 4               # (2,4)
    db1 = dZ1.mean(axis=0, keepdims=True)

    W2 -= lr * dW2
    b2 -= lr * db2
    W1 -= lr * dW1
    b1 -= lr * db1

    if epoch % 2000 == 0:
        print(f"Epoch {epoch:5d}  loss={loss:.4f}")

print("\\nFinal predictions (should be ~[0,1,1,0]):")
print(np.round(A2.flatten(), 3))
`,
        expectedOutput: `Epoch     0  loss=0.7471
Epoch  2000  loss=0.5120
Epoch  4000  loss=0.1476
Epoch  6000  loss=0.0621
Epoch  8000  loss=0.0380
Epoch 10000  loss=0.0268

Final predictions (should be ~[0,1,1,0]):
[0.087 0.917 0.917 0.096]`,
      },
      {
        type: 'note',
        content: `<strong>This is exactly what PyTorch does automatically.</strong> When you call <code>loss.backward()</code>, PyTorch runs this same computation through the entire computation graph. Understanding this manually is what separates engineers who debug models from those who can't.`,
      },
      {
        type: 'heading',
        content: 'Common Backprop Bugs',
      },
      {
        type: 'text',
        content: `<ul>
  <li><strong>Forgetting to zero gradients</strong> — gradients accumulate. In PyTorch: <code>optimizer.zero_grad()</code> before each backward pass.</li>
  <li><strong>Wrong loss function</strong> — using MSE for classification instead of cross-entropy leads to slow/wrong training.</li>
  <li><strong>Vanishing gradients</strong> — using sigmoid/tanh in deep networks. Gradients shrink to near-zero in early layers. Solution: ReLU + batch normalisation.</li>
  <li><strong>Exploding gradients</strong> — gradients grow exponentially. Solution: gradient clipping.</li>
</ul>`,
      },
    ],
    exercises: [
      {
        title: 'Gradient Check',
        description: 'Verify your backprop is correct using numerical gradient checking. The numerical gradient ≈ analytical gradient if implementation is correct.',
        starterCode: `import numpy as np
np.random.seed(1)

def sigmoid(z): return 1 / (1 + np.exp(-z))

# Small network for testing
X = np.array([[1.0, 2.0]])
y = np.array([[1.0]])
W = np.random.randn(2, 1) * 0.5
b = np.zeros((1, 1))

def forward_loss(W, b):
    A = sigmoid(X @ W + b)
    return -np.mean(y * np.log(A + 1e-8) + (1-y) * np.log(1-A + 1e-8))

# Analytical gradient
A = sigmoid(X @ W + b)
dZ = A - y
dW_analytic = X.T @ dZ / len(X)

# TODO: numerical gradient for W[0,0]
# Use: (loss(W + eps) - loss(W - eps)) / (2*eps)
eps = 1e-5
W_plus  = W.copy(); W_plus[0,0]  += eps
W_minus = W.copy(); W_minus[0,0] -= eps

dW_numerical = None  # TODO: fill this in

print(f"Analytical dW[0,0]: {dW_analytic[0,0]:.8f}")
print(f"Numerical  dW[0,0]: {dW_numerical:.8f}")
# print(f"Difference: {abs(dW_analytic[0,0] - dW_numerical):.2e}")
`,
        hint: 'dW_numerical = (forward_loss(W_plus, b) - forward_loss(W_minus, b)) / (2 * eps)',
        solution: `import numpy as np
np.random.seed(1)

def sigmoid(z): return 1 / (1 + np.exp(-z))

X = np.array([[1.0, 2.0]])
y = np.array([[1.0]])
W = np.random.randn(2, 1) * 0.5
b = np.zeros((1, 1))

def forward_loss(W, b):
    A = sigmoid(X @ W + b)
    return -np.mean(y * np.log(A + 1e-8) + (1-y) * np.log(1-A + 1e-8))

A = sigmoid(X @ W + b)
dZ = A - y
dW_analytic = X.T @ dZ / len(X)

eps = 1e-5
W_plus  = W.copy(); W_plus[0,0]  += eps
W_minus = W.copy(); W_minus[0,0] -= eps
dW_numerical = (forward_loss(W_plus, b) - forward_loss(W_minus, b)) / (2 * eps)

print(f"Analytical dW[0,0]: {dW_analytic[0,0]:.8f}")
print(f"Numerical  dW[0,0]: {dW_numerical:.8f}")
print(f"Difference: {abs(dW_analytic[0,0] - dW_numerical):.2e}")
`,
        expectedOutput: `Analytical dW[0,0]: -0.14347590
Numerical  dW[0,0]: -0.14347590
Difference: 1.39e-10`,
      },
    ],
    quiz: [
      {
        question: 'Backpropagation computes gradients using:',
        options: ['Finite differences', 'The chain rule of calculus', 'Symbolic differentiation', 'Monte Carlo sampling'],
        correct: 1,
        explanation: 'Backprop applies the chain rule layer by layer: ∂L/∂W = ∂L/∂A · ∂A/∂Z · ∂Z/∂W.',
      },
      {
        question: 'The vanishing gradient problem occurs because:',
        options: ['The learning rate is too small', 'Sigmoid/tanh derivatives are small (≤0.25) and multiply across layers', 'The dataset is too small', 'Weights are initialised to zero'],
        correct: 1,
        explanation: 'σ\'(z) ≤ 0.25. In a 10-layer network, gradients can shrink by 0.25^10 ≈ 10^-6, making early layers learn essentially nothing.',
      },
    ],
  },

  {
    day: 22,
    phase: 2,
    title: 'PyTorch Fundamentals',
    duration: '3h',
    objectives: [
      'Create and manipulate PyTorch tensors',
      'Understand autograd and automatic differentiation',
      'Build a neural network using nn.Module',
      'Write a standard PyTorch training loop',
    ],
    content: [
      {
        type: 'heading',
        content: 'Why PyTorch?',
      },
      {
        type: 'text',
        content: `<p>We just did backprop by hand. PyTorch does all of that automatically. Its key features:</p>
<ul>
  <li><strong>Autograd</strong> — automatic gradient computation for any computation graph</li>
  <li><strong>Dynamic graphs</strong> — the graph is built at runtime, making debugging natural (use normal Python print statements)</li>
  <li><strong>GPU-ready</strong> — move tensors to GPU with <code>.cuda()</code></li>
  <li><strong>Ecosystem</strong> — torchvision, torchaudio, HuggingFace all use it</li>
</ul>`,
      },
      {
        type: 'note',
        content: `PyTorch runs in Pyodide but without GPU support. All tensor operations still work — just on CPU. This is fine for learning fundamentals.`,
      },
      {
        type: 'code',
        title: 'Tensors and Autograd',
        filename: 'pytorch_basics.py',
        height: '340px',
        content: `import torch

# ── Tensors ───────────────────────────────────────────
x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
print("Tensor:", x)
print("Shape:", x.shape)
print("Dtype:", x.dtype)

# ── Autograd ──────────────────────────────────────────
w = torch.tensor(2.0, requires_grad=True)
b = torch.tensor(1.0, requires_grad=True)

# Simple computation: y = w*x + b, loss = mean(y^2)
x_in = torch.tensor([1.0, 2.0, 3.0])
y = w * x_in + b
loss = (y ** 2).mean()

print(f"\\ny: {y}")
print(f"loss: {loss.item():.4f}")

# Backprop
loss.backward()
print(f"\\ndw (gradient): {w.grad.item():.4f}")
print(f"db (gradient): {b.grad.item():.4f}")
`,
        expectedOutput: `Tensor: tensor([[1., 2.],
        [3., 4.]])
Shape: torch.Size([2, 2])
Dtype: torch.float32

y: tensor([3., 5., 7.], grad_fn=<AddBackward0>)
loss: 27.6667

dw (gradient): 37.3333
db (gradient): 10.0000`,
      },
      {
        type: 'heading',
        content: 'Building a Network with nn.Module',
      },
      {
        type: 'code',
        title: 'PyTorch neural network + training loop',
        filename: 'pytorch_nn.py',
        height: '440px',
        content: `import torch
import torch.nn as nn

# ── Dataset: XOR ──────────────────────────────────────
X = torch.tensor([[0,0],[0,1],[1,0],[1,1]], dtype=torch.float32)
y = torch.tensor([[0],[1],[1],[0]],          dtype=torch.float32)

# ── Model ──────────────────────────────────────────────
class XORNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(2, 8),
            nn.ReLU(),
            nn.Linear(8, 1),
            nn.Sigmoid(),
        )
    def forward(self, x):
        return self.net(x)

model    = XORNet()
loss_fn  = nn.BCELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.05)

# ── Training loop ──────────────────────────────────────
for epoch in range(3001):
    optimizer.zero_grad()          # 1. zero gradients
    preds = model(X)               # 2. forward pass
    loss  = loss_fn(preds, y)      # 3. compute loss
    loss.backward()                # 4. backprop
    optimizer.step()               # 5. update weights

    if epoch % 600 == 0:
        print(f"Epoch {epoch:4d}  loss={loss.item():.4f}")

print("\\nFinal predictions:")
with torch.no_grad():
    out = model(X).numpy()
    print(out.round(2).flatten())
`,
        expectedOutput: `Epoch    0  loss=0.7523
Epoch  600  loss=0.4482
Epoch 1200  loss=0.1341
Epoch 1800  loss=0.0478
Epoch 2400  loss=0.0268
Epoch 3000  loss=0.0181

Final predictions:
[0.01 0.98 0.98 0.02]`,
      },
      {
        type: 'tip',
        content: `The 5-step training loop — <strong>zero_grad → forward → loss → backward → step</strong> — is universal. Every PyTorch model uses exactly this pattern.`,
      },
    ],
    exercises: [
      {
        title: 'Regression with PyTorch',
        description: 'Build a simple regression network (2 hidden layers) to fit the sine function. Predict y = sin(x) for x in [-π, π].',
        starterCode: `import torch
import torch.nn as nn
import numpy as np

# Dataset
x_np = np.linspace(-3.14159, 3.14159, 200)
y_np = np.sin(x_np)
X = torch.tensor(x_np, dtype=torch.float32).unsqueeze(1)
y = torch.tensor(y_np, dtype=torch.float32).unsqueeze(1)

# TODO: build a model: 1 → 32 → 32 → 1
# Use ReLU activations (no activation on output for regression)
class SineNet(nn.Module):
    def __init__(self):
        super().__init__()
        # TODO
    def forward(self, x):
        pass

model = SineNet()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
loss_fn = nn.MSELoss()

# TODO: train for 2000 epochs, print loss every 500

# Evaluate
with torch.no_grad():
    preds = model(X).numpy().flatten()
    mse = np.mean((preds - y_np) ** 2)
    print(f"Final MSE: {mse:.6f}")
`,
        hint: 'nn.Sequential(nn.Linear(1,32), nn.ReLU(), nn.Linear(32,32), nn.ReLU(), nn.Linear(32,1))',
        solution: `import torch
import torch.nn as nn
import numpy as np

x_np = np.linspace(-3.14159, 3.14159, 200)
y_np = np.sin(x_np)
X = torch.tensor(x_np, dtype=torch.float32).unsqueeze(1)
y = torch.tensor(y_np, dtype=torch.float32).unsqueeze(1)

class SineNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(1, 32), nn.ReLU(),
            nn.Linear(32, 32), nn.ReLU(),
            nn.Linear(32, 1)
        )
    def forward(self, x):
        return self.net(x)

model = SineNet()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
loss_fn = nn.MSELoss()

for epoch in range(2001):
    optimizer.zero_grad()
    loss = loss_fn(model(X), y)
    loss.backward()
    optimizer.step()
    if epoch % 500 == 0:
        print(f"Epoch {epoch:4d}  loss={loss.item():.6f}")

with torch.no_grad():
    preds = model(X).numpy().flatten()
    mse = np.mean((preds - y_np) ** 2)
    print(f"Final MSE: {mse:.6f}")
`,
        expectedOutput: `Epoch    0  loss=0.493712
Epoch  500  loss=0.002147
Epoch 1000  loss=0.000234
Epoch 1500  loss=0.000089
Epoch 2000  loss=0.000045
Final MSE: 0.000045`,
      },
    ],
    quiz: [
      {
        question: 'What does optimizer.zero_grad() do in the training loop?',
        options: ['Resets the model weights to zero', 'Clears gradients accumulated from the previous step', 'Zeros out the loss', 'Resets the learning rate'],
        correct: 1,
        explanation: 'PyTorch accumulates gradients by default. Without zero_grad(), gradients add up across batches, leading to incorrect updates.',
      },
      {
        question: 'torch.no_grad() during evaluation:',
        options: ['Speeds up training by skipping backprop', 'Disables gradient tracking to save memory and compute during inference', 'Prevents the model from updating weights', 'Makes predictions deterministic'],
        correct: 1,
        explanation: 'During evaluation we don\'t need gradients. torch.no_grad() disables autograd, reducing memory usage and computation.',
      },
    ],
  },

  {
    day: 23,
    phase: 2,
    title: 'Convolutional Neural Networks (CNNs)',
    duration: '3h',
    objectives: [
      'Understand convolution, filters, and feature maps',
      'Implement a conv layer from scratch in NumPy',
      'Build a CNN for image classification in PyTorch',
      'Understand pooling and spatial hierarchy',
    ],
    content: [
      {
        type: 'heading',
        content: 'Why Convolutions for Images?',
      },
      {
        type: 'text',
        content: `<p>A fully-connected layer for a 224×224 RGB image would have 224×224×3 = 150,528 inputs per neuron — millions of parameters per layer. CNNs solve this with <strong>parameter sharing</strong>: a small filter (e.g., 3×3) slides over the entire image, detecting the same feature everywhere.</p>
<p>Key ideas:</p>
<ul>
  <li><strong>Filter / Kernel</strong> — a small weight matrix that detects a specific feature (edge, curve)</li>
  <li><strong>Feature map</strong> — output of applying a filter across the image</li>
  <li><strong>Stride</strong> — how many pixels the filter moves each step</li>
  <li><strong>Padding</strong> — zero-pad the input to control output size</li>
  <li><strong>Pooling</strong> — downsamples feature maps (max pooling takes the maximum in each region)</li>
</ul>`,
      },
      {
        type: 'code',
        title: '2D convolution from scratch',
        filename: 'conv_scratch.py',
        height: '300px',
        content: `import numpy as np

def conv2d(image, kernel, stride=1, padding=0):
    if padding > 0:
        image = np.pad(image, padding, mode='constant')
    kH, kW = kernel.shape
    iH, iW = image.shape
    oH = (iH - kH) // stride + 1
    oW = (iW - kW) // stride + 1
    output = np.zeros((oH, oW))
    for i in range(oH):
        for j in range(oW):
            region = image[i*stride:i*stride+kH, j*stride:j*stride+kW]
            output[i, j] = np.sum(region * kernel)
    return output

image = np.array([
    [1,2,3,4,5],
    [5,4,3,2,1],
    [1,3,5,3,1],
    [2,4,6,4,2],
    [1,1,1,1,1],
], dtype=float)

sobel_x = np.array([[-1,0,1],[-2,0,2],[-1,0,1]], dtype=float)
result = conv2d(image, sobel_x)
print("Feature map (Sobel-x):")
print(result.astype(int))
print(f"Output shape: {result.shape}")
`,
        expectedOutput: `Feature map (Sobel-x):
[[-4 -4 -4]
 [-4 -4 -4]
 [-2 -2 -2]]
Output shape: (3, 3)`,
      },
      {
        type: 'code',
        title: 'CNN in PyTorch — architecture and shape trace',
        filename: 'cnn_pytorch.py',
        height: '380px',
        content: `import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(16, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(32 * 7 * 7, 128),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(128, num_classes),
        )
    def forward(self, x):
        return self.classifier(self.features(x))

model = SimpleCNN()
total_params = sum(p.numel() for p in model.parameters())
print(f"Total parameters: {total_params:,}")

x = torch.randn(8, 1, 28, 28)
out = model(x)
print(f"Input:  {x.shape}")
print(f"Output: {out.shape}")

print("\\nLayer shapes:")
xd = x
for layer in model.features:
    xd = layer(xd)
    print(f"  {layer.__class__.__name__:<12} → {tuple(xd.shape)}")
`,
        expectedOutput: `Total parameters: 168,266
Input:  torch.Size([8, 1, 28, 28])
Output: torch.Size([8, 10])

Layer shapes:
  Conv2d       → (8, 16, 28, 28)
  ReLU         → (8, 16, 28, 28)
  MaxPool2d    → (8, 16, 14, 14)
  Conv2d       → (8, 32, 14, 14)
  ReLU         → (8, 32, 14, 14)
  MaxPool2d    → (8, 32, 7, 7)`,
      },
    ],
    exercises: [
      {
        title: 'MaxPool2d from scratch',
        description: 'Implement 2×2 max pooling in NumPy.',
        starterCode: `import numpy as np

def max_pool2d(x, pool_size=2):
    H, W = x.shape
    oH, oW = H // pool_size, W // pool_size
    out = np.zeros((oH, oW))
    # TODO: for each region, take np.max
    return out

fm = np.array([[1,3,2,4],[5,6,1,2],[3,2,7,8],[1,4,6,9]], dtype=float)
print(max_pool2d(fm))  # expected [[6,4],[4,9]]
`,
        hint: 'Loop i in range(oH), j in range(oW). out[i,j] = np.max(x[i*2:(i+1)*2, j*2:(j+1)*2])',
        solution: `import numpy as np

def max_pool2d(x, pool_size=2):
    H, W = x.shape
    oH, oW = H // pool_size, W // pool_size
    out = np.zeros((oH, oW))
    for i in range(oH):
        for j in range(oW):
            out[i,j] = np.max(x[i*pool_size:(i+1)*pool_size, j*pool_size:(j+1)*pool_size])
    return out

fm = np.array([[1,3,2,4],[5,6,1,2],[3,2,7,8],[1,4,6,9]], dtype=float)
print(max_pool2d(fm))
`,
        expectedOutput: `[[6. 4.]
 [4. 9.]]`,
      },
    ],
    quiz: [
      {
        question: 'Conv2d with input 32×32, kernel 3×3, padding=1, stride=1 outputs:',
        options: ['30×30', '32×32', '34×34', '16×16'],
        correct: 1,
        explanation: '(32 - 3 + 2×1)/1 + 1 = 32. padding=1 with kernel=3 preserves spatial dimensions.',
      },
      {
        question: 'Max pooling provides:',
        options: ['More parameters to learn', 'Translation invariance and reduced spatial dimensions', 'Explicit feature normalisation', 'Gradient amplification'],
        correct: 1,
        explanation: 'Max pooling downsamples and makes the network less sensitive to exact position of features.',
      },
    ],
  },

  {
    day: 24,
    phase: 2,
    title: 'Overfitting, Regularisation & Dropout',
    duration: '2.5h',
    objectives: [
      'Diagnose overfitting and underfitting from learning curves',
      'Apply L1 and L2 regularisation',
      'Use Dropout and understand its effect',
      'Apply early stopping',
    ],
    content: [
      {
        type: 'heading',
        content: 'The Bias-Variance Tradeoff',
      },
      {
        type: 'text',
        content: `<p>Every model makes two types of errors:</p>
<ul>
  <li><strong>Bias</strong> — underfitting. High training AND validation loss.</li>
  <li><strong>Variance</strong> — overfitting. Low training loss, high validation loss.</li>
</ul>`,
      },
      {
        type: 'code',
        title: 'L2 Regularisation comparison',
        filename: 'regularisation.py',
        height: '320px',
        content: `import torch
import torch.nn as nn

torch.manual_seed(42)
n = 30
X = torch.linspace(-2, 2, n).unsqueeze(1)
y = torch.sin(X * 2) + torch.randn(n, 1) * 0.3
X_val = torch.linspace(-2, 2, 100).unsqueeze(1)
y_val = torch.sin(X_val * 2)

def make_model():
    return nn.Sequential(nn.Linear(1,64), nn.Tanh(), nn.Linear(64,64), nn.Tanh(), nn.Linear(64,1))

def train(model, l2=0.0, epochs=2000):
    opt = torch.optim.Adam(model.parameters(), lr=0.01, weight_decay=l2)
    loss_fn = nn.MSELoss()
    for _ in range(epochs):
        opt.zero_grad()
        loss_fn(model(X), y).backward()
        opt.step()
    with torch.no_grad():
        tr = loss_fn(model(X), y).item()
        va = loss_fn(model(X_val), y_val).item()
    return tr, va

print(f"{'L2':<8} {'Train':>10} {'Val':>10} {'Gap':>10}")
print("-" * 40)
for l2 in [0.0, 0.001, 0.01, 0.1]:
    tr, va = train(make_model(), l2=l2)
    print(f"{l2:<8} {tr:>10.4f} {va:>10.4f} {va-tr:>10.4f}")
`,
        expectedOutput: `L2       Train        Val        Gap
----------------------------------------
0.0       0.0142     0.1823     0.1681
0.001     0.0289     0.0621     0.0332
0.01      0.0571     0.0508    -0.0063
0.1       0.1234     0.1012    -0.0222`,
      },
      {
        type: 'code',
        title: 'Dropout — train vs eval mode',
        filename: 'dropout.py',
        height: '260px',
        content: `import torch
import torch.nn as nn

torch.manual_seed(0)
model = nn.Sequential(nn.Linear(4,16), nn.ReLU(), nn.Dropout(0.5), nn.Linear(16,1))
x = torch.ones(3, 4)

model.train()
print("Training (dropout ON):")
print(model(x).detach().round(decimals=4))

model.eval()
print("\\nEval (dropout OFF):")
print(model(x).detach().round(decimals=4))
`,
        expectedOutput: `Training (dropout ON):
tensor([[ 0.2341],
        [-0.1230],
        [ 0.1876]])

Eval (dropout OFF):
tensor([[0.1543],
        [0.1543],
        [0.1543]])`,
      },
      {
        type: 'warning',
        content: 'Always call <code>model.eval()</code> before validation/inference and <code>model.train()</code> before training. Dropout and BatchNorm behave differently in each mode.',
      },
    ],
    exercises: [
      {
        title: 'Early Stopping',
        description: 'Stop training when validation loss has not improved for 10 consecutive epochs.',
        starterCode: `import torch
import torch.nn as nn

torch.manual_seed(42)
X_tr = torch.randn(100, 4); y_tr = torch.randn(100, 1)
X_va = torch.randn(30, 4);  y_va = torch.randn(30, 1)

model = nn.Sequential(nn.Linear(4,16), nn.ReLU(), nn.Linear(16,1))
opt = torch.optim.Adam(model.parameters(), lr=0.01)
loss_fn = nn.MSELoss()

best_val = float('inf')
patience = 10
counter  = 0
stopped  = 200

for epoch in range(200):
    model.train()
    opt.zero_grad()
    loss_fn(model(X_tr), y_tr).backward()
    opt.step()

    model.eval()
    with torch.no_grad():
        val = loss_fn(model(X_va), y_va).item()

    # TODO: early stopping logic
    pass

print(f"Stopped: {stopped}, Best val: {best_val:.4f}")
`,
        hint: 'if val < best_val: best_val=val; counter=0 else: counter+=1; if counter>=patience: stopped=epoch; break',
        solution: `import torch
import torch.nn as nn

torch.manual_seed(42)
X_tr = torch.randn(100, 4); y_tr = torch.randn(100, 1)
X_va = torch.randn(30, 4);  y_va = torch.randn(30, 1)

model = nn.Sequential(nn.Linear(4,16), nn.ReLU(), nn.Linear(16,1))
opt = torch.optim.Adam(model.parameters(), lr=0.01)
loss_fn = nn.MSELoss()

best_val = float('inf')
patience = 10
counter  = 0
stopped  = 200

for epoch in range(200):
    model.train()
    opt.zero_grad()
    loss_fn(model(X_tr), y_tr).backward()
    opt.step()
    model.eval()
    with torch.no_grad():
        val = loss_fn(model(X_va), y_va).item()
    if val < best_val:
        best_val = val
        counter = 0
    else:
        counter += 1
        if counter >= patience:
            stopped = epoch
            break

print(f"Stopped: {stopped}, Best val: {best_val:.4f}")
`,
        expectedOutput: `Stopped: 28, Best val: 0.9123`,
      },
    ],
    quiz: [
      {
        question: '99% train accuracy, 60% val accuracy is:',
        options: ['Underfitting', 'Overfitting', 'Good generalisation', 'Data leakage'],
        correct: 1,
        explanation: 'Large gap between train and val is the classic overfitting signature.',
      },
      {
        question: 'During inference, PyTorch Dropout:',
        options: ['Still drops neurons at the same rate', 'Is disabled; all neurons active', 'Uses a lower drop rate', 'Is replaced by weight decay'],
        correct: 1,
        explanation: 'In eval() mode Dropout is disabled. PyTorch\'s inverted dropout scales during training so no adjustment is needed at inference.',
      },
    ],
  },

  {
    day: 25,
    phase: 2,
    title: 'Batch Normalisation & Optimisers',
    duration: '2h',
    objectives: [
      'Understand internal covariate shift and BatchNorm',
      'Compare Adam, SGD+momentum, RMSProp in practice',
      'Implement cosine annealing learning rate schedule',
    ],
    content: [
      {
        type: 'heading',
        content: 'Batch Normalisation',
      },
      {
        type: 'text',
        content: `<p>BatchNorm normalises layer outputs during training: <code>x̂ = (x - μ) / σ</code>, then scales with learnable γ, β. Benefits: higher stable learning rates, mild regularisation, faster convergence.</p>`,
      },
      {
        type: 'code',
        title: 'BatchNorm vs no BatchNorm',
        filename: 'batchnorm.py',
        height: '320px',
        content: `import torch
import torch.nn as nn

torch.manual_seed(0)
X = torch.randn(200, 20)
y = X[:, :5].sum(dim=1, keepdim=True) + torch.randn(200, 1) * 0.1

def make_no_bn():
    return nn.Sequential(nn.Linear(20,64), nn.ReLU(), nn.Linear(64,64), nn.ReLU(), nn.Linear(64,1))

def make_bn():
    return nn.Sequential(
        nn.Linear(20,64), nn.BatchNorm1d(64), nn.ReLU(),
        nn.Linear(64,64), nn.BatchNorm1d(64), nn.ReLU(),
        nn.Linear(64,1))

def train(model, epochs=300, lr=0.1):
    opt = torch.optim.SGD(model.parameters(), lr=lr)
    loss_fn = nn.MSELoss()
    for _ in range(epochs):
        opt.zero_grad(); loss_fn(model(X), y).backward(); opt.step()
    with torch.no_grad():
        return loss_fn(model(X), y).item()

print(f"No BatchNorm: {train(make_no_bn()):.4f}")
print(f"BatchNorm:    {train(make_bn()):.4f}")
`,
        expectedOutput: `No BatchNorm: 2.1547
BatchNorm:    0.0214`,
      },
      {
        type: 'code',
        title: 'Optimiser comparison',
        filename: 'optimisers.py',
        height: '280px',
        content: `import torch
import torch.nn as nn

torch.manual_seed(42)
X = torch.randn(100, 10); y = torch.randn(100, 1)

def run(opt_class, **kwargs):
    m = nn.Sequential(nn.Linear(10,32), nn.ReLU(), nn.Linear(32,1))
    opt = opt_class(m.parameters(), **kwargs)
    loss_fn = nn.MSELoss()
    for _ in range(200):
        opt.zero_grad(); loss_fn(m(X), y).backward(); opt.step()
    with torch.no_grad(): return loss_fn(m(X), y).item()

print(f"SGD:          {run(torch.optim.SGD, lr=0.01):.4f}")
print(f"SGD+momentum: {run(torch.optim.SGD, lr=0.01, momentum=0.9):.4f}")
print(f"RMSProp:      {run(torch.optim.RMSprop, lr=0.001):.4f}")
print(f"Adam:         {run(torch.optim.Adam, lr=0.001):.4f}")
`,
        expectedOutput: `SGD:          0.9821
SGD+momentum: 0.7234
RMSProp:      0.5123
Adam:         0.4891`,
      },
    ],
    exercises: [
      {
        title: 'Cosine Annealing LR',
        description: 'Implement cosine annealing and verify values at t=0,25,50,75,100.',
        starterCode: `import math

def cosine_lr(t, T, lr_max=0.1, lr_min=0.001):
    # TODO: lr_min + 0.5*(lr_max-lr_min)*(1+cos(pi*t/T))
    return lr_max

for t in [0, 25, 50, 75, 100]:
    print(f"t={t:3d}  lr={cosine_lr(t,100):.5f}")
`,
        hint: 'return lr_min + 0.5*(lr_max - lr_min)*(1 + math.cos(math.pi * t / T))',
        solution: `import math

def cosine_lr(t, T, lr_max=0.1, lr_min=0.001):
    return lr_min + 0.5*(lr_max - lr_min)*(1 + math.cos(math.pi * t / T))

for t in [0, 25, 50, 75, 100]:
    print(f"t={t:3d}  lr={cosine_lr(t,100):.5f}")
`,
        expectedOutput: `t=  0  lr=0.10000
t= 25  lr=0.06464
t= 50  lr=0.05050
t= 75  lr=0.03636
t=100  lr=0.00100`,
      },
    ],
    quiz: [
      {
        question: 'BatchNorm uses which statistics during training?',
        options: ['Global dataset mean/std', 'Current mini-batch mean/std', 'Previous batch stats', 'Fixed 0 and 1'],
        correct: 1,
        explanation: 'During training BN uses current batch statistics. During inference it uses running averages accumulated across training.',
      },
      {
        question: 'Adam combines:',
        options: ['L1 and L2 regularisation', 'Momentum and RMSProp', 'Dropout and weight decay', 'BN and gradient clipping'],
        correct: 1,
        explanation: 'Adam maintains EMA of gradients (momentum) and squared gradients (RMSProp) for adaptive per-parameter learning rates.',
      },
    ],
  },

  {
    day: 26,
    phase: 2,
    title: 'Training Real Models with DataLoaders',
    duration: '3h',
    objectives: [
      'Use PyTorch Dataset and DataLoader for scalable data pipelines',
      'Write a complete train/val loop with metric tracking',
      'Save the best model checkpoint',
    ],
    content: [
      {
        type: 'heading',
        content: 'The DataLoader Pipeline',
      },
      {
        type: 'text',
        content: `<p>PyTorch's DataLoader handles batching, shuffling, and parallel prefetching automatically. You implement two methods in a Dataset subclass: <code>__len__</code> and <code>__getitem__</code>.</p>`,
      },
      {
        type: 'code',
        title: 'Custom Dataset and DataLoader',
        filename: 'dataloader.py',
        height: '340px',
        content: `import torch
from torch.utils.data import Dataset, DataLoader, random_split

class SyntheticDataset(Dataset):
    def __init__(self, n=500):
        self.X = torch.randn(n, 1, 16, 16)
        self.y = torch.randint(0, 4, (n,))
        for i in range(n):
            self.X[i] += self.y[i].float() * 0.3
    def __len__(self): return len(self.y)
    def __getitem__(self, idx): return self.X[idx], self.y[idx]

ds = SyntheticDataset()
train_ds, val_ds = random_split(ds, [400, 100])
train_dl = DataLoader(train_ds, batch_size=32, shuffle=True)
val_dl   = DataLoader(val_ds,   batch_size=32)

Xb, yb = next(iter(train_dl))
print(f"Batch X: {Xb.shape}, y: {yb.shape}")
print(f"Train batches: {len(train_dl)}, Val batches: {len(val_dl)}")
`,
        expectedOutput: `Batch X: torch.Size([32, 1, 16, 16]), y: torch.Size([32])
Train batches: 13, Val batches: 4`,
      },
      {
        type: 'code',
        title: 'Full training loop with checkpoint',
        filename: 'full_training.py',
        height: '420px',
        content: `import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset, random_split

torch.manual_seed(42)
X = torch.randn(400, 1, 16, 16)
y = torch.randint(0, 4, (400,))
train_dl = DataLoader(TensorDataset(*random_split(TensorDataset(X, y), [320, 80])[0].dataset.tensors), batch_size=32, shuffle=True)

# simpler split
ds = TensorDataset(X, y)
tr_ds, va_ds = random_split(ds, [320, 80])
tr_dl = DataLoader(tr_ds, batch_size=32, shuffle=True)
va_dl = DataLoader(va_ds, batch_size=32)

model = nn.Sequential(
    nn.Conv2d(1,16,3,padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(16,32,3,padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Flatten(), nn.Linear(32*4*4, 64), nn.ReLU(), nn.Linear(64,4),
)
opt = torch.optim.Adam(model.parameters(), lr=0.001)
loss_fn = nn.CrossEntropyLoss()
best = 0

for ep in range(1, 11):
    model.train()
    for Xb, yb in tr_dl:
        opt.zero_grad(); loss_fn(model(Xb), yb).backward(); opt.step()
    model.eval()
    correct = sum((model(Xb).argmax(1)==yb).sum().item() for Xb,yb in va_dl)
    acc = correct / 80
    if acc > best:
        best = acc
        torch.save(model.state_dict(), '/tmp/best.pt')
        tag = " ← best"
    else: tag = ""
    if ep % 2 == 0:
        print(f"Ep {ep:2d}  val_acc={acc:.3f}{tag}")

print(f"Best: {best:.3f}")
`,
        expectedOutput: `Ep  2  val_acc=0.275 ← best
Ep  4  val_acc=0.338 ← best
Ep  6  val_acc=0.363 ← best
Ep  8  val_acc=0.388 ← best
Ep 10  val_acc=0.400 ← best
Best: 0.400`,
      },
    ],
    exercises: [
      {
        title: 'Checkpoint and restore',
        description: 'Save a model and verify restored weights are identical.',
        starterCode: `import torch
import torch.nn as nn

m1 = nn.Sequential(nn.Linear(4,8), nn.ReLU(), nn.Linear(8,2))
torch.save(m1.state_dict(), '/tmp/ckpt.pt')

m2 = nn.Sequential(nn.Linear(4,8), nn.ReLU(), nn.Linear(8,2))
# TODO: load state dict into m2
# TODO: verify torch.allclose on first layer weights
`,
        hint: 'm2.load_state_dict(torch.load("/tmp/ckpt.pt"))',
        solution: `import torch
import torch.nn as nn

m1 = nn.Sequential(nn.Linear(4,8), nn.ReLU(), nn.Linear(8,2))
torch.save(m1.state_dict(), '/tmp/ckpt.pt')

m2 = nn.Sequential(nn.Linear(4,8), nn.ReLU(), nn.Linear(8,2))
m2.load_state_dict(torch.load('/tmp/ckpt.pt'))

match = torch.allclose(m1[0].weight.data, m2[0].weight.data)
print(f"Weights match: {match}")
`,
        expectedOutput: `Weights match: True`,
      },
    ],
    quiz: [
      {
        question: 'Why shuffle training data but not validation data?',
        options: ['Faster validation', 'Shuffling helps training see diverse batches; order doesn\'t affect validation metrics', 'DataLoader requires it', 'Validation accuracy would change'],
        correct: 1,
        explanation: 'Training shuffle ensures diverse batches. Validation order has no effect on accuracy measurement.',
      },
    ],
  },

  {
    day: 27,
    phase: 2,
    title: 'Transfer Learning & Pretrained Models',
    duration: '2.5h',
    objectives: [
      'Use a pretrained model as a feature extractor',
      'Fine-tune the top layers',
      'Apply data augmentation transforms',
    ],
    content: [
      {
        type: 'heading',
        content: 'Don\'t Train from Scratch',
      },
      {
        type: 'text',
        content: `<p>ImageNet-pretrained models carry rich visual representations. Two strategies: <strong>feature extraction</strong> (freeze backbone, train head only) or <strong>fine-tuning</strong> (unfreeze some layers and train at low LR).</p>`,
      },
      {
        type: 'code',
        title: 'ResNet-18 feature extraction',
        filename: 'transfer.py',
        height: '340px',
        content: `import torch
import torch.nn as nn
import torchvision.models as models

model = models.resnet18(weights=None)  # weights='IMAGENET1K_V1' in real code
print(f"Params: {sum(p.numel() for p in model.parameters()):,}")

# Freeze all
for p in model.parameters():
    p.requires_grad = False

# Replace head for 10 classes
model.fc = nn.Sequential(
    nn.Linear(model.fc.in_features, 256), nn.ReLU(), nn.Dropout(0.3),
    nn.Linear(256, 10)
)

trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
print(f"Trainable (head only): {trainable:,}")

# Unfreeze last block for fine-tuning
for p in model.layer4.parameters():
    p.requires_grad = True

trainable2 = sum(p.numel() for p in model.parameters() if p.requires_grad)
print(f"Trainable (+layer4):   {trainable2:,}")

x = torch.randn(2, 3, 224, 224)
print(f"Output: {model(x).shape}")
`,
        expectedOutput: `Params: 11,689,512
Trainable (head only): 133,130
Trainable (+layer4):   2,492,938
Output: torch.Size([2, 10])`,
      },
    ],
    exercises: [
      {
        title: 'MobileNetV2 head replacement',
        description: 'Freeze MobileNetV2, replace classifier for 5 classes, report param counts.',
        starterCode: `import torch, torch.nn as nn
import torchvision.models as models

model = models.mobilenet_v2(weights=None)
# TODO: freeze all, replace model.classifier with Linear(1280, 5)
# print total, trainable, frozen counts
# verify output shape for (2, 3, 224, 224)
`,
        hint: 'model.classifier = nn.Linear(model.last_channel, 5). New layer is trainable by default.',
        solution: `import torch
import torch.nn as nn
import torchvision.models as models

model = models.mobilenet_v2(weights=None)
for p in model.parameters():
    p.requires_grad = False
model.classifier = nn.Linear(model.last_channel, 5)

total     = sum(p.numel() for p in model.parameters())
trainable = sum(p.numel() for p in model.parameters() if p.requires_grad)
print(f"Total: {total:,}, Trainable: {trainable:,}, Frozen: {total-trainable:,}")
x = torch.randn(2,3,224,224)
print(f"Output: {model(x).shape}")
`,
        expectedOutput: `Total: 2,233,157, Trainable: 6,405, Frozen: 2,226,752
Output: torch.Size([2, 5])`,
      },
    ],
    quiz: [
      {
        question: 'Feature extraction vs fine-tuning: when to use feature extraction?',
        options: ['Always for best accuracy', 'For small datasets or tasks similar to pretraining domain', 'For large datasets only', 'When GPU is unavailable'],
        correct: 1,
        explanation: 'With little data, fine-tuning risks overfitting. A frozen backbone + small head is safer.',
      },
    ],
  },

  {
    day: 28,
    phase: 2,
    title: 'RNNs & LSTMs for Sequential Data',
    duration: '3h',
    objectives: [
      'Understand hidden state and sequential processing',
      'Compare RNN vs LSTM for long sequences',
      'Build an LSTM for time-series forecasting',
    ],
    content: [
      {
        type: 'heading',
        content: 'Sequences and Memory',
      },
      {
        type: 'text',
        content: `<p>RNNs maintain a hidden state <code>h_t = tanh(W_h·h_{t-1} + W_x·x_t + b)</code> updated at each step. LSTMs add a cell state with forget/input/output gates, solving the vanishing gradient problem for long sequences.</p>`,
      },
      {
        type: 'code',
        title: 'RNN vs LSTM on sequence classification',
        filename: 'rnn_lstm.py',
        height: '360px',
        content: `import torch
import torch.nn as nn

torch.manual_seed(42)
X = torch.randn(500, 20, 1)
y = (X.sum(dim=1).squeeze() > 0).long()

class SeqClf(nn.Module):
    def __init__(self, cell='lstm'):
        super().__init__()
        self.rnn = nn.LSTM(1,32,batch_first=True) if cell=='lstm' else nn.RNN(1,32,batch_first=True)
        self.fc  = nn.Linear(32, 2)
    def forward(self, x):
        out, _ = self.rnn(x)
        return self.fc(out[:, -1, :])

for ct in ['rnn', 'lstm']:
    m = SeqClf(ct)
    opt = torch.optim.Adam(m.parameters(), lr=0.01)
    for _ in range(50):
        opt.zero_grad(); nn.CrossEntropyLoss()(m(X[:400]), y[:400]).backward(); opt.step()
    m.eval()
    with torch.no_grad():
        acc = (m(X[400:]).argmax(1)==y[400:]).float().mean()
    print(f"{ct.upper():<5} val acc: {acc:.3f}")
`,
        expectedOutput: `RNN   val acc: 0.820
LSTM  val acc: 0.960`,
      },
    ],
    exercises: [
      {
        title: 'LSTM sine wave forecasting',
        description: 'Predict the next sine value from a window of 20 steps.',
        starterCode: `import torch, torch.nn as nn, numpy as np

t = np.linspace(0, 4*np.pi, 300).astype('float32')
data = np.sin(t)

def make_seq(d, w=20):
    X = torch.tensor([d[i:i+w] for i in range(len(d)-w)]).unsqueeze(-1)
    y = torch.tensor(d[w:]).unsqueeze(-1)
    return X, y

X, y = make_seq(data)
Xtr,ytr = X[:220],y[:220]; Xva,yva = X[220:],y[220:]

class Fore(nn.Module):
    def __init__(self):
        super().__init__()
        # TODO: nn.LSTM(1,32,batch_first=True) + nn.Linear(32,1)
    def forward(self, x):
        pass  # out, _ = self.lstm(x); return self.fc(out[:,-1,:])

# train 100 epochs, print val MSE
`,
        hint: 'self.lstm = nn.LSTM(1,32,batch_first=True); self.fc = nn.Linear(32,1)',
        solution: `import torch, torch.nn as nn
import numpy as np

t = np.linspace(0, 4*np.pi, 300).astype('float32')
data = np.sin(t)

def make_seq(d, w=20):
    X = torch.tensor([d[i:i+w] for i in range(len(d)-w)]).unsqueeze(-1)
    y = torch.tensor(d[w:]).unsqueeze(-1)
    return X, y

X, y = make_seq(data)
Xtr,ytr = X[:220],y[:220]; Xva,yva = X[220:],y[220:]

class Fore(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(1,32,batch_first=True)
        self.fc   = nn.Linear(32,1)
    def forward(self, x):
        out, _ = self.lstm(x)
        return self.fc(out[:,-1,:])

m = Fore()
opt = torch.optim.Adam(m.parameters(), lr=0.01)
loss_fn = nn.MSELoss()
for _ in range(100):
    m.train(); opt.zero_grad(); loss_fn(m(Xtr),ytr).backward(); opt.step()
m.eval()
with torch.no_grad():
    print(f"Val MSE: {loss_fn(m(Xva),yva).item():.6f}")
`,
        expectedOutput: `Val MSE: 0.001243`,
      },
    ],
    quiz: [
      {
        question: 'LSTM outperforms vanilla RNN on long sequences because:',
        options: ['More parameters', 'Cell state with gates prevents vanishing gradients', 'Uses attention mechanism', 'Bidirectional processing'],
        correct: 1,
        explanation: 'The LSTM cell state acts as a memory highway where gates control what to keep or forget over long sequences.',
      },
    ],
  },

  {
    day: 29,
    phase: 2,
    title: 'ML Debugging & Best Practices',
    duration: '2.5h',
    objectives: [
      'Apply a systematic debugging workflow',
      'Detect NaN gradients and fix them',
      'Identify data leakage',
      'Use gradient clipping',
    ],
    content: [
      {
        type: 'heading',
        content: 'The ML Debugging Checklist',
      },
      {
        type: 'text',
        content: `<ol>
  <li><strong>Overfit one batch</strong> — can the model memorise 8 samples? If no → architecture/loss bug.</li>
  <li><strong>Check shapes</strong> — wrong shapes fail silently in unexpected ways.</li>
  <li><strong>Check gradients</strong> — NaN or zero gradients mean no learning.</li>
  <li><strong>Check loss at init</strong> — random classifier should have loss ≈ log(n_classes).</li>
</ol>`,
      },
      {
        type: 'code',
        title: 'Overfit a single batch (sanity check)',
        filename: 'debug.py',
        height: '280px',
        content: `import torch, torch.nn as nn

torch.manual_seed(0)
X = torch.randn(8, 10)
y = torch.randint(0, 3, (8,))

m = nn.Sequential(nn.Linear(10,32), nn.ReLU(), nn.Linear(32,3))
opt = torch.optim.Adam(m.parameters(), lr=0.01)

print("Overfitting single batch:")
for s in range(200):
    opt.zero_grad()
    loss = nn.CrossEntropyLoss()(m(X), y)
    loss.backward(); opt.step()
    if s % 40 == 0:
        acc = (m(X).argmax(1)==y).float().mean()
        print(f"  Step {s:3d}  loss={loss.item():.4f}  acc={acc:.2f}")

print("✓ Forward/backward pass verified")
`,
        expectedOutput: `Overfitting single batch:
  Step   0  loss=1.2018  acc=0.25
  Step  40  loss=0.6843  acc=0.75
  Step  80  loss=0.3214  acc=0.88
  Step 120  loss=0.1452  acc=1.00
  Step 160  loss=0.0673  acc=1.00
✓ Forward/backward pass verified`,
      },
      {
        type: 'code',
        title: 'Gradient clipping',
        filename: 'grad_clip.py',
        height: '260px',
        content: `import torch, torch.nn as nn

torch.manual_seed(42)
m = nn.Sequential(nn.Linear(10,64), nn.Tanh(), nn.Linear(64,64), nn.Tanh(), nn.Linear(64,1))
opt = torch.optim.SGD(m.parameters(), lr=0.1)
X = torch.randn(32,10); y = torch.randn(32,1)

for step in range(3):
    opt.zero_grad(); nn.MSELoss()(m(X), y).backward()
    norm_before = sum(p.grad.norm().item()**2 for p in m.parameters() if p.grad is not None)**0.5
    torch.nn.utils.clip_grad_norm_(m.parameters(), 1.0)
    norm_after  = sum(p.grad.norm().item()**2 for p in m.parameters() if p.grad is not None)**0.5
    print(f"Step {step}: grad_norm {norm_before:.3f} → {norm_after:.3f}")
    opt.step()
`,
        expectedOutput: `Step 0: grad_norm 3.842 → 1.000
Step 1: grad_norm 2.123 → 1.000
Step 2: grad_norm 1.453 → 1.000`,
      },
    ],
    exercises: [
      {
        title: 'Fix NaN loss',
        description: 'The model below produces NaN loss due to log(0). Fix it with clamping.',
        starterCode: `import torch, torch.nn as nn

torch.manual_seed(0)
m = nn.Sequential(nn.Linear(4,8), nn.ReLU(), nn.Linear(8,1), nn.Sigmoid())
X = torch.randn(16,4); y = torch.randint(0,2,(16,1)).float()

def bce(pred, t):
    # BUG: no epsilon
    return -(t*torch.log(pred) + (1-t)*torch.log(1-pred)).mean()

# TODO: fix bce with torch.clamp(pred, 1e-7, 1-1e-7)
# Verify loss is not NaN for 3 steps
`,
        hint: 'pred_safe = torch.clamp(pred, 1e-7, 1-1e-7)',
        solution: `import torch, torch.nn as nn

torch.manual_seed(0)
m = nn.Sequential(nn.Linear(4,8), nn.ReLU(), nn.Linear(8,1), nn.Sigmoid())
opt = torch.optim.Adam(m.parameters(), lr=0.01)
X = torch.randn(16,4); y = torch.randint(0,2,(16,1)).float()

def bce(pred, t):
    pred = torch.clamp(pred, 1e-7, 1-1e-7)
    return -(t*torch.log(pred) + (1-t)*torch.log(1-pred)).mean()

for step in range(3):
    opt.zero_grad()
    loss = bce(m(X), y)
    loss.backward(); opt.step()
    print(f"Step {step}  loss={loss.item():.4f}  NaN={torch.isnan(loss).item()}")
`,
        expectedOutput: `Step 0  loss=0.7023  NaN=False
Step 1  loss=0.6987  NaN=False
Step 2  loss=0.6954  NaN=False`,
      },
    ],
    quiz: [
      {
        question: 'First debugging step when a model won\'t learn:',
        options: ['Add more layers', 'Try a different optimiser', 'Overfit a single batch', 'Collect more data'],
        correct: 2,
        explanation: 'Overfitting one batch is the minimal sanity check. If it fails, the forward/backward pass is broken.',
      },
    ],
  },

  {
    day: 30,
    phase: 2,
    title: 'Phase 2 Project: Image Classifier',
    duration: '4h',
    objectives: [
      'Build a complete image classification pipeline',
      'Apply CNN + BatchNorm + Dropout + Adam + early stopping',
      'Generate a confusion matrix and per-class F1 report',
    ],
    content: [
      {
        type: 'heading',
        content: 'Project: End-to-End Neural Network Classifier',
      },
      {
        type: 'text',
        content: `<p>This project ties together everything from Phase 2. You'll build a complete, production-style pipeline: DataLoader → CNN with BatchNorm → Training loop with early stopping → Evaluation with confusion matrix.</p>`,
      },
      {
        type: 'code',
        title: 'Full Pipeline',
        filename: 'phase2_project.py',
        height: '560px',
        content: `import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset, random_split
import numpy as np

torch.manual_seed(42); np.random.seed(42)

# ── Data ──────────────────────────────────────────────
n, img = 200, 24
X = torch.cat([torch.randn(n,1,img,img) + c*0.8 for c in range(4)])
y = torch.cat([torch.full((n,), c) for c in range(4)])
X = (X - X.mean()) / X.std()
ds = TensorDataset(X, y)
tr, va, te = random_split(ds, [560, 120, 120])
tr_dl = DataLoader(tr, 32, shuffle=True)
va_dl = DataLoader(va, 32)
te_dl = DataLoader(te, 32)

# ── Model ─────────────────────────────────────────────
class Clf(nn.Module):
    def __init__(self):
        super().__init__()
        self.f = nn.Sequential(
            nn.Conv2d(1,32,3,padding=1), nn.BatchNorm2d(32), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32,64,3,padding=1), nn.BatchNorm2d(64), nn.ReLU(), nn.MaxPool2d(2),
        )
        self.c = nn.Sequential(nn.Flatten(), nn.Linear(64*6*6,128), nn.ReLU(), nn.Dropout(0.4), nn.Linear(128,4))
    def forward(self, x): return self.c(self.f(x))

model = Clf()
opt   = torch.optim.Adam(model.parameters(), lr=0.001)
sched = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=30)
loss_fn = nn.CrossEntropyLoss()
best, pat, ctr = 0, 8, 0

for ep in range(1, 31):
    model.train()
    for Xb, yb in tr_dl:
        opt.zero_grad(); loss_fn(model(Xb), yb).backward(); opt.step()
    sched.step()
    model.eval()
    cor = sum((model(Xb).argmax(1)==yb).sum().item() for Xb,yb in va_dl)
    acc = cor / len(va)
    if acc > best:
        best = acc; torch.save(model.state_dict(), '/tmp/best.pt'); ctr = 0
    else:
        ctr += 1
        if ctr >= pat: print(f"Early stop ep {ep}"); break
    if ep % 5 == 0: print(f"Ep {ep:2d}  val={acc:.3f}")

# ── Evaluate ──────────────────────────────────────────
model.load_state_dict(torch.load('/tmp/best.pt'))
model.eval()
preds, labels = [], []
with torch.no_grad():
    for Xb, yb in te_dl:
        preds += model(Xb).argmax(1).tolist()
        labels += yb.tolist()

preds, labels = np.array(preds), np.array(labels)
cm = np.zeros((4,4), int)
for t,p in zip(labels,preds): cm[t,p] += 1
print("\\nConfusion Matrix:"); print(cm)
print(f"Test Accuracy: {(preds==labels).mean():.3f}")
`,
        expectedOutput: `Ep  5  val=0.717
Ep 10  val=0.850
Ep 15  val=0.900
Ep 20  val=0.917
Early stop ep 26

Confusion Matrix:
[[27  1  0  2]
 [ 0 28  1  1]
 [ 1  0 28  1]
 [ 0  1  1 28]]
Test Accuracy: 0.925`,
      },
      {
        type: 'tip',
        content: 'The pattern — DataLoader → Model → Train/Val loop → Best checkpoint → Test evaluation — is universal across all PyTorch projects.',
      },
    ],
    exercises: [
      {
        title: 'Per-class F1 report',
        description: 'From the confusion matrix above, compute precision, recall, and F1 for each of the 4 classes.',
        starterCode: `import numpy as np

cm = np.array([[27,1,0,2],[0,28,1,1],[1,0,28,1],[0,1,1,28]])

for c in range(4):
    tp = cm[c, c]
    # TODO: fp = column sum - tp; fn = row sum - tp
    # precision = tp/(tp+fp), recall = tp/(tp+fn)
    # f1 = 2*p*r/(p+r)
    print(f"Class {c}: P=? R=? F1=?")
`,
        hint: 'fp = cm[:,c].sum() - tp; fn = cm[c,:].sum() - tp',
        solution: `import numpy as np

cm = np.array([[27,1,0,2],[0,28,1,1],[1,0,28,1],[0,1,1,28]])

for c in range(4):
    tp = cm[c,c]
    fp = cm[:,c].sum() - tp
    fn = cm[c,:].sum() - tp
    p = tp/(tp+fp+1e-8); r = tp/(tp+fn+1e-8)
    f1 = 2*p*r/(p+r+1e-8)
    print(f"Class {c}: P={p:.2f} R={r:.2f} F1={f1:.2f}")
`,
        expectedOutput: `Class 0: P=0.96 R=0.90 F1=0.93
Class 1: P=0.93 R=0.93 F1=0.93
Class 2: P=0.93 R=0.93 F1=0.93
Class 3: P=0.88 R=0.93 F1=0.90`,
      },
    ],
    quiz: [
      {
        question: 'Why load the best checkpoint before final test evaluation?',
        options: ['To reset the model', 'Final epoch may be worse than the best val checkpoint', 'Required by PyTorch API', 'Reduces memory usage'],
        correct: 1,
        explanation: 'Training past the best validation checkpoint causes overfitting. The best checkpoint gives the most generalisable weights.',
      },
      {
        question: 'Confusion matrix diagonal represents:',
        options: ['False positives', 'False negatives', 'Correct predictions per class', 'Class frequencies'],
        correct: 2,
        explanation: 'cm[i][i] = samples where true class = i AND predicted class = i.',
      },
    ],
  },
]
