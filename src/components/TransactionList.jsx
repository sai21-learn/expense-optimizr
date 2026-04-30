import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) return null;

  return (
    <div className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em]">Settlement Plan</h3>
        <span className="bg-brand/10 text-brand text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">
          {transactions.length} Payment{transactions.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {transactions.map((t, i) => (
            <motion.div 
              key={`${t.from}-${t.to}-${i}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="group flex items-center justify-between p-4 bg-zinc-800/40 hover:bg-zinc-800/60 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-400 border border-white/5 group-hover:border-brand/30 transition-colors">
                  {t.from[0].toUpperCase()}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors uppercase tracking-tight">{t.from}</span>
                    <span className="text-[10px] text-zinc-500 font-medium">Debtor</span>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-brand transition-colors relative z-10" />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors uppercase tracking-tight">{t.to}</span>
                    <span className="text-[10px] text-zinc-500 font-medium">Creditor</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-lg font-black text-white tracking-tighter group-hover:text-brand transition-colors">
                  ₹{t.amount.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Settle</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-3 text-zinc-500">
        <CheckCircle2 className="w-4 h-4 text-green-500" />
        <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Algorithm: Minimum Transactions (Greedy)</p>
      </div>
    </div>
  );
}
