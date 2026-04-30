import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { calculateBalances, minimizeTransactions } from "./utils/algorithm";
import BalanceChart from "./components/BalanceChart";
import TransactionList from "./components/TransactionList";
import { 
  Plus, 
  Trash2, 
  Zap, 
  Dices, 
  Calculator, 
  TrendingUp, 
  Users,
  Coins
} from "lucide-react";

export default function App() {
  const [people, setPeople] = useState([
    { id: '1', name: "Alice", paid: 1200 },
    { id: '2', name: "Bob", paid: 350 },
    { id: '3', name: "Charlie", paid: 150 }
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
    const validPeople = people.filter(p => p.name.trim() !== "");
    if (validPeople.length < 2) return;
    
    const balances = calculateBalances(validPeople);
    const transactions = minimizeTransactions(JSON.parse(JSON.stringify(balances)));
    setResults({ balances, transactions });
  };

  const randomData = () => {
    const names = ["David", "Eve", "Frank", "Grace", "Heidi", "Ivan", "Judy"];
    const shuffled = [...names].sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 3) + 3; // 3 to 5 people
    const data = shuffled.slice(0, count).map(n => ({
      id: crypto.randomUUID(),
      name: n,
      paid: Math.floor(Math.random() * 5000)
    }));
    setPeople(data);
    setResults(null);
  };

  const total = useMemo(() => people.reduce((s, p) => s + (Number(p.paid) || 0), 0), [people]);
  const avg = useMemo(() => total / (people.length || 1), [total, people.length]);

  return (
    <div className="min-h-screen bg-[#09090b] selection:bg-brand/30 selection:text-white pb-24">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl sticky top-0 mb-12">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <Zap className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black tracking-tight text-white leading-none uppercase">Expense Optimizer</h1>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Split Smarter, Live Better</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Total Pooled</span>
              <span className="text-xl font-black text-white tracking-tighter mt-1">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* INPUT COLUMN */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-zinc-900/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
              <Users size={80} />
            </div>
            
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Participants</h2>
              <button 
                onClick={randomData}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-brand transition-colors"
              >
                <Dices size={14} /> Randomize
              </button>
            </div>

            <LayoutGroup>
              <div className="space-y-4 mb-10 relative z-10">
                <AnimatePresence mode="popLayout" initial={false}>
                  {people.map((p, index) => (
                    <motion.div 
                      layout
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="group/item flex gap-4 items-center p-2 rounded-2xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center text-xs font-black text-zinc-500 group-hover/item:border-brand/30 group-hover/item:text-brand transition-all">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <input
                          placeholder="Name"
                          autoFocus={p.name === ""}
                          className="w-full bg-transparent text-sm font-bold text-white placeholder:text-zinc-700 outline-none"
                          value={p.name}
                          onChange={e => updatePerson(p.id, 'name', e.target.value)}
                        />
                        <div className="h-[1px] w-full bg-zinc-800 group-focus-within/item:bg-brand/50 transition-colors" />
                      </div>

                      <div className="relative w-32 group/input">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-black text-zinc-600 group-focus-within/input:text-brand transition-colors">₹</span>
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full bg-transparent pl-4 py-2 text-sm font-black text-white placeholder:text-zinc-700 outline-none"
                          value={p.paid || ''}
                          onChange={e => updatePerson(p.id, 'paid', +e.target.value)}
                        />
                        <div className="h-[1px] w-full bg-zinc-800 group-focus-within/input:bg-brand/50 transition-colors" />
                      </div>

                      <button 
                        onClick={() => removePerson(p.id)}
                        className="p-3 text-zinc-700 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all opacity-0 group-hover/item:opacity-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </LayoutGroup>

            <button 
              onClick={addPerson}
              className="w-full py-4 mb-8 border-2 border-dashed border-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 hover:border-brand/50 hover:text-brand hover:bg-brand/5 transition-all flex items-center justify-center gap-2 group"
            >
              <Plus size={14} className="group-hover:rotate-90 transition-transform" /> Add Participant
            </button>

            <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/30 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Pooled</span>
                  <span className="text-xl font-black text-white tracking-tighter">₹{total.toLocaleString()}</span>
                </div>
                <div className="bg-zinc-800/30 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Average</span>
                  <span className="text-xl font-black text-white tracking-tighter">₹{Math.round(avg).toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={optimize}
                className="w-full bg-white text-black font-black uppercase tracking-[0.2em] text-xs py-5 rounded-2xl hover:bg-brand hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.3)] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <Calculator size={18} /> Optimize Settlement
              </button>
            </div>
          </section>
        </div>

        {/* RESULTS COLUMN */}
        <div className="lg:col-span-7 space-y-8">
          <AnimatePresence mode="wait">
            {results ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-8"
              >
                <BalanceChart data={results.balances} />
                <TransactionList transactions={results.transactions} />
              </motion.div>
            ) : (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-900 rounded-[3rem] text-zinc-700 p-12 text-center group"
              >
                <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <TrendingUp size={32} className="text-zinc-800 group-hover:text-brand transition-colors" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-[0.3em] mb-2 text-zinc-500">Awaiting Data</h3>
                <p className="max-w-xs text-xs font-medium leading-relaxed">Enter participants and their contributions, then click optimize to generate a settlement plan.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 mt-24 flex justify-between items-center text-zinc-600">
        <div className="flex items-center gap-2">
          <Coins size={14} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Crafted for Groups</span>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest">© 2026 Premium Expense Utility</p>
      </footer>
    </div>
  );
}
