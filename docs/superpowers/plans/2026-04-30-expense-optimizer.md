# Expense Optimizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a modern React application to calculate net balances among a group and minimize settlement transactions.

**Architecture:** A card-based dashboard with a dynamic input list on the left and visual/text results on the right. Core logic is isolated in a utility module for testability.

**Tech Stack:** React, Tailwind CSS (v4), Recharts, Vite.

---

### Task 1: Setup & Tailwind Configuration

**Files:**
- Create: `tailwind.config.js`
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Create Tailwind config**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

- [ ] **Step 2: Update index.css with Tailwind directives**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #09090b; /* zinc-950 */
  --text: #fafafa; /* zinc-50 */
}

body {
  @apply bg-zinc-950 text-zinc-50 antialiased;
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
}
```

- [ ] **Step 3: Clean index.html**
Ensure the viewport and title are correct.

- [ ] **Step 4: Commit**
```bash
git add tailwind.config.js src/index.css index.html
git commit -m "chore: setup tailwind and global styles"
```

---

### Task 2: Core Algorithm Implementation (TDD)

**Files:**
- Create: `src/utils/algorithm.js`
- Create: `src/utils/algorithm.test.js`

- [ ] **Step 1: Write failing tests for balances**
```javascript
import { calculateBalances, minimizeTransactions } from './algorithm';

// Test calculateBalances
const people = [
  { name: 'Alice', paid: 100 },
  { name: 'Bob', paid: 0 },
  { name: 'Charlie', paid: 20 }
];
const balances = calculateBalances(people);
// Expected average: 40. Alice: +60, Bob: -40, Charlie: -20
```

- [ ] **Step 2: Implement calculateBalances**
```javascript
export function calculateBalances(people) {
  const total = people.reduce((sum, p) => sum + p.paid, 0);
  const average = total / people.length;
  return people.map(p => ({
    name: p.name,
    balance: Number((p.paid - average).toFixed(2))
  }));
}
```

- [ ] **Step 3: Write tests for transaction minimization**
```javascript
const b = [{ name: 'Alice', balance: 60 }, { name: 'Bob', balance: -40 }, { name: 'Charlie', balance: -20 }];
const tx = minimizeTransactions(b);
// Expected: Bob -> Alice 40, Charlie -> Alice 20
```

- [ ] **Step 4: Implement minimizeTransactions (Greedy)**
```javascript
export function minimizeTransactions(balances) {
  let debtors = balances.filter(p => p.balance < 0).map(p => ({ ...p }));
  let creditors = balances.filter(p => p.balance > 0).map(p => ({ ...p }));
  const result = [];

  while (debtors.length && creditors.length) {
    debtors.sort((a, b) => a.balance - b.balance);
    creditors.sort((a, b) => b.balance - a.balance);

    let d = debtors[0];
    let c = creditors[0];
    let amount = Math.min(-d.balance, c.balance);

    result.push({
      from: d.name,
      to: c.name,
      amount: Number(amount.toFixed(2))
    });

    d.balance += amount;
    c.balance -= amount;

    if (Math.abs(d.balance) < 0.01) debtors.shift();
    if (Math.abs(c.balance) < 0.01) creditors.shift();
  }
  return result;
}
```

- [ ] **Step 5: Commit**
```bash
git add src/utils/algorithm.js
git commit -m "feat: implement expense optimization algorithm"
```

---

### Task 3: Chart Component

**Files:**
- Create: `src/components/BalanceChart.jsx`

- [ ] **Step 1: Create Bar Chart component**
```jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function BalanceChart({ data }) {
  return (
    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 h-80">
      <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Net Balances</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
            itemStyle={{ color: '#fafafa' }}
          />
          <Bar dataKey="balance" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.balance >= 0 ? '#22c55e' : '#ef4444'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

- [ ] **Step 2: Commit**
```bash
git add src/components/BalanceChart.jsx
git commit -m "feat: add BalanceChart component"
```

---

### Task 4: Main Application & Input UI

**Files:**
- Modify: `src/App.jsx`
- Create: `src/components/TransactionList.jsx`

- [ ] **Step 1: Implement TransactionList**
```jsx
export default function TransactionList({ transactions }) {
  if (transactions.length === 0) return null;
  return (
    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Optimized Transactions</h3>
      <div className="space-y-3">
        {transactions.map((t, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
            <div className="flex items-center gap-3">
              <span className="font-medium">{t.from}</span>
              <span className="text-zinc-500">→</span>
              <span className="font-medium">{t.to}</span>
            </div>
            <span className="font-mono text-green-400 font-semibold">₹{t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite App.jsx with core logic and layout**
```jsx
import { useState } from "react";
import { calculateBalances, minimizeTransactions } from "./utils/algorithm";
import BalanceChart from "./components/BalanceChart";
import TransactionList from "./components/TransactionList";

export default function App() {
  const [people, setPeople] = useState([
    { id: '1', name: "Alice", paid: 1000 },
    { id: '2', name: "Bob", paid: 200 }
  ]);
  const [results, setResults] = useState(null);

  const addPerson = () => {
    setPeople([...people, { id: crypto.randomUUID(), name: "", paid: 0 }]);
  };

  const removePerson = (id) => {
    if (people.length > 2) {
      setPeople(people.filter(p => p.id !== id));
    }
  };

  const updatePerson = (id, field, value) => {
    setPeople(people.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const optimize = () => {
    const balances = calculateBalances(people.filter(p => p.name.trim() !== ""));
    const transactions = minimizeTransactions(JSON.parse(JSON.stringify(balances)));
    setResults({ balances, transactions });
  };

  const total = people.reduce((s, p) => s + (Number(p.paid) || 0), 0);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Expense Optimizer</h1>
        <p className="text-zinc-400">Settle debts with minimum transactions.</p>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT COLUMN */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
            <div className="space-y-4 mb-6">
              {people.map((p) => (
                <div key={p.id} className="flex gap-3 items-center">
                  <input
                    placeholder="Name"
                    className="flex-1 bg-zinc-800 border border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                    value={p.name}
                    onChange={e => updatePerson(p.id, 'name', e.target.value)}
                  />
                  <div className="relative w-32">
                    <span className="absolute left-3 top-3 text-zinc-500">₹</span>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full bg-zinc-800 border border-zinc-700 p-3 pl-7 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      value={p.paid || ''}
                      onChange={e => updatePerson(p.id, 'paid', +e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => removePerson(p.id)}
                    className="p-3 text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={addPerson}
              className="w-full py-3 mb-6 border-2 border-dashed border-zinc-700 rounded-xl text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 transition-all"
            >
              + Add Person
            </button>

            <div className="flex gap-3 items-center pt-6 border-t border-zinc-800">
              <button 
                onClick={optimize}
                className="flex-1 bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Optimize
              </button>
              <div className="text-right">
                <div className="text-xs text-zinc-500 uppercase font-bold">Total</div>
                <div className="text-xl font-bold">₹{total}</div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS COLUMN */}
        <div className="lg:col-span-7 space-y-8">
          {results ? (
            <>
              <BalanceChart data={results.balances} />
              <TransactionList transactions={results.transactions} />
            </>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl text-zinc-600">
              Enter details and click Optimize to see results
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add src/App.jsx src/components/TransactionList.jsx
git commit -m "feat: complete application UI and integration"
```
