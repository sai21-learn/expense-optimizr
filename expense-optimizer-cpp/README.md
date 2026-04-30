# Expense Optimizer (C++)

A robust CLI version of the Expense Optimizer tool, built using modern C++.

## Features
- **Smart Settlement**: Minimizes the number of transactions needed to settle debts.
- **Dynamic Group Management**: Add or remove participants on the fly.
- **Real-time Metrics**: View total pooled expenses and average per person.
- **High Performance**: Optimized using standard library containers and algorithms.

## How to Run

### 1. Compile
Ensure you have a C++ compiler installed (like `g++` or `clang++`).
```bash
g++ -O3 main.cpp -o optimizer
```

### 2. Execute
```bash
./optimizer
```

## Algorithm
This implementation uses a **Greedy Algorithm** to find the optimal settlement plan:
1. Calculate the net balance for each person (`paid - average`).
2. Separate into **Debtors** (negative balance) and **Creditors** (positive balance).
3. Match the largest debtor with the largest creditor iteratively until all debts are settled.
4. This approach ensures the **minimum number of transactions** required.
