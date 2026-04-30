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
        <h1 className="text-4xl font-bold tracking-tight mb-2 text-white">Expense Optimizer</h1>
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
                    className="flex-1 bg-zinc-800 border border-zinc-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-white"
                    value={p.name}
                    onChange={e => updatePerson(p.id, 'name', e.target.value)}
                  />
                  <div className="relative w-32">
                    <span className="absolute left-3 top-3 text-zinc-500">₹</span>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full bg-zinc-800 border border-zinc-700 p-3 pl-7 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition-all text-white"
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
                <div className="text-xl font-bold text-white">₹{total}</div>
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
            <div className="h-full flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl text-zinc-600 p-12 text-center">
              Enter details and click Optimize to see results
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
