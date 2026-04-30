# Expense Optimizer

A modern React application that intelligently splits group expenses using an optimized **greedy algorithm** to minimize the number of transactions required for settlement. This project serves as a practical showcase of algorithmic problem-solving in real-world applications.

## 🎯 What This App Does

Expense Optimizer helps groups of people fairly split shared expenses (like trips, dinners, or household costs) by calculating who owes what and providing the most efficient way to settle up.

### Key Features
- **Fair Expense Splitting**: Calculates net balances based on what each person paid vs. the group average
- **Transaction Minimization**: Uses a greedy algorithm to reduce the number of money transfers needed
- **Real-time Calculations**: Instant results as you add or modify expense data
- **Clean, Modern UI**: Built with React and Tailwind CSS for an intuitive experience

## 🧠 The Greedy Algorithm Showcase

This project specifically demonstrates the implementation of a **greedy algorithm** for the expense splitting problem - a classic algorithmic challenge that appears in computer science interviews and real-world applications.

### Core Algorithm File: `src/utils/algorithm.js`

The heart of this application is the greedy algorithm implementation in [`src/utils/algorithm.js`](src/utils/algorithm.js), which contains two key functions:

- **`calculateBalances(people)`** - Computes net balances for each person
- **`minimizeTransactions(balances)`** - Greedy algorithm for transaction optimization

### How the Greedy Strategy Works

The algorithm minimizes the number of transactions needed to settle group expenses through these steps:

### Step 1: Calculate Net Balances
For each person in the group:
```
Balance = Amount Paid - Group Average
```
- Positive balance = Person overpaid (is owed money)
- Negative balance = Person underpaid (owes money)

### Step 2: Greedy Transaction Minimization
The algorithm sorts debtors (negative balance) and creditors (positive balance), then:
1. Matches the largest debtor with the largest creditor
2. Transfers the minimum of what the debtor owes and creditor is owed
3. Updates balances and repeats until all debts are settled

### Example
```
Group: Alice ($100), Bob ($0), Charlie ($20)
Total: $120, Average: $40 each

Balances:
- Alice: +$60 (overpaid)
- Bob: -$40 (owes)
- Charlie: -$20 (owes)

Greedy Solution:
1. Bob pays Alice $40
2. Charlie pays Alice $20

Result: Only 2 transactions instead of 3 possible combinations
```

This approach is computationally efficient and often produces optimal or near-optimal solutions for expense splitting.

### Algorithmic Insights
- **Greedy Choice Property**: Always match the largest remaining debtor with the largest remaining creditor
- **Optimal Substructure**: The problem can be solved by making locally optimal choices
- **Time Complexity**: O(n log n) due to sorting, with O(n²) worst-case transaction generation
- **Space Complexity**: O(n) for storing balances and transactions

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-optimizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run test` - Run test suite
- `npm run lint` - Run ESLint for code quality

## 🏗️ Architecture

```
src/
├── utils/
│   ├── algorithm.js          # Core expense splitting logic
│   └── algorithm.test.js     # Unit tests for algorithms
├── components/               # React components (planned)
├── App.jsx                   # Main application component
└── main.jsx                  # Application entry point
```

### Core Algorithm (`algorithm.js`)
- `calculateBalances()` - Computes net balances for each person
- `minimizeTransactions()` - Greedy algorithm for transaction optimization

## 🧪 Testing

The application includes comprehensive unit tests for the core algorithms:

```bash
npm run test
```

Tests cover:
- Balance calculations
- Transaction minimization
- Edge cases (equal payments, single person, etc.)

## 🛠️ Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts (for future visualizations)
- **Testing**: Vitest
- **Linting**: ESLint with React rules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern React and Vite
- Inspired by real-world expense splitting challenges
- Algorithm based on established debt settlement optimization techniques
