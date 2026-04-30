import { describe, it, expect } from 'vitest';
import { calculateBalances, minimizeTransactions } from './algorithm';

describe('calculateBalances', () => {
  it('should calculate correct balances for each person', () => {
    const people = [
      { name: 'Alice', paid: 100 },
      { name: 'Bob', paid: 0 },
      { name: 'Charlie', paid: 20 }
    ];
    // Total: 120, Average: 40
    // Alice: 100 - 40 = 60
    // Bob: 0 - 40 = -40
    // Charlie: 20 - 40 = -20
    const balances = calculateBalances(people);
    
    expect(balances).toEqual([
      { name: 'Alice', balance: 60 },
      { name: 'Bob', balance: -40 },
      { name: 'Charlie', balance: -20 }
    ]);
  });

  it('should handle zero total expenses', () => {
    const people = [
      { name: 'Alice', paid: 0 },
      { name: 'Bob', paid: 0 }
    ];
    const balances = calculateBalances(people);
    expect(balances).toEqual([
      { name: 'Alice', balance: 0 },
      { name: 'Bob', balance: 0 }
    ]);
  });
});

describe('minimizeTransactions', () => {
  it('should minimize transactions correctly', () => {
    const balances = [
      { name: 'Alice', balance: 60 },
      { name: 'Bob', balance: -40 },
      { name: 'Charlie', balance: -20 }
    ];
    const transactions = minimizeTransactions(balances);
    
    // Greedy algorithm result:
    // Bob (-40) -> Alice (60) amount 40. Alice balance 20. Bob balance 0.
    // Charlie (-20) -> Alice (20) amount 20. Alice balance 0. Charlie balance 0.
    
    expect(transactions).toEqual([
      { from: 'Bob', to: 'Alice', amount: 40 },
      { from: 'Charlie', to: 'Alice', amount: 20 }
    ]);
  });
});
