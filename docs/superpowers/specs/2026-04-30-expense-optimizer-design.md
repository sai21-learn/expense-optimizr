# Design Spec: Expense Optimizer

A modern, responsive web application to calculate net balances among a group of people and minimize the total number of transactions needed to settle debts.

## 1. Overview
The Expense Optimizer helps groups (friends, roommates, travelers) settle shared expenses. Users input how much each person paid, and the app calculates the most efficient way to settle up using a greedy algorithm.

## 2. Success Criteria
- [ ] Users can dynamically add and remove people.
- [ ] Users can enter names and amounts paid.
- [ ] The app calculates net balances (Credit/Debit) for each person.
- [ ] The app provides a minimized list of transactions to settle all debts.
- [ ] A bar chart visualizes the net balances for quick understanding.
- [ ] Responsive design works on mobile and desktop.

## 3. Architecture & Components

### 3.1. Data Structure
- `Person`: `{ id: string, name: string, paid: number }`
- `Balance`: `{ name: string, balance: number }`
- `Transaction`: `{ from: string, to: string, amount: number }`

### 3.2. Core Logic (`src/utils/algorithm.js`)
- `calculateBalances(people)`:
    - Sums total paid.
    - Calculates average per person.
    - Returns array of `{ name, balance }` where balance = `paid - average`.
- `minimizeTransactions(balances)`:
    - Splits people into `debtors` (negative balance) and `creditors` (positive balance).
    - Uses a greedy approach: Match the largest debtor with the largest creditor.
    - Iterates until all balances are near zero.

### 3.3. UI Components
- **App.jsx**: Main state management (people list, balances, transactions).
- **InputCard**: 
    - List of input rows with "Remove" buttons.
    - "+ Add Person" button.
    - "Optimize" and "Random" action buttons.
- **BalanceChart**: Bar chart showing net balances (Green for credit, Red for debit).
- **TransactionList**: A clean, formatted list of who pays whom.

## 4. UI/UX Design (Card-Based Dashboard)

### Layout
- **Desktop**: Two-column layout. 
    - Left: Input Card.
    - Right: Result stack (Chart + Transactions).
- **Mobile**: Single-column stack.

### Visuals
- **Theme**: Dark mode (Zinc/Gray palette).
- **Typography**: Sans-serif (Inter or system).
- **Interactions**:
    - Hover states for buttons and list items.
    - Responsive transitions for adding/removing items.

## 5. Testing Strategy
- **Unit Tests**: Test the `minimizeTransactions` algorithm with various scenarios (even splits, uneven splits, large groups).
- **UI Tests**: Verify that adding/removing rows works and that the "Optimize" button triggers calculations correctly.

## 6. Future Considerations (Out of Scope)
- Multiple currencies.
- Saving/Loading groups.
- Different splitting ratios (e.g., person A pays 60%, person B pays 40%).
