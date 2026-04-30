export function calculateBalances(people) {
  const total = people.reduce((sum, p) => sum + p.paid, 0);
  const average = total / people.length;
  return people.map(p => ({
    name: p.name,
    balance: Number((p.paid - average).toFixed(2))
  }));
}

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
