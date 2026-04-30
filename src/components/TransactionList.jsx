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
