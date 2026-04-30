#include <iostream>
#include <vector>
#include <string>
#include <numeric>
#include <algorithm>
#include <cmath>
#include <iomanip>
#include <limits>

struct Person {
    std::string name;
    double paid;
};

struct Balance {
    std::string name;
    double balance;
};

class ExpenseOptimizer {
private:
    std::vector<Person> people;

public:
    void addPerson(const std::string& name, double paid) {
        people.push_back({name, paid});
    }

    void removePerson(int index) {
        if (index >= 0 && (size_t)index < people.size()) {
            people.erase(people.begin() + index);
        } else {
            std::cout << "[!] Invalid ID." << std::endl;
        }
    }

    double calculateTotal() const {
        double total = 0;
        for (const auto& p : people) total += p.paid;
        return total;
    }

    void displayPeople() const {
        if (people.empty()) {
            std::cout << "\n[!] No participants added yet." << std::endl;
            return;
        }

        double total = calculateTotal();
        double avg = total / people.size();

        std::cout << "\n--- Current Participants ---" << std::endl;
        std::cout << std::left << std::setw(5) << "ID" << std::setw(15) << "Name" << "Paid" << std::endl;
        std::cout << std::string(30, '-') << std::endl;
        for (size_t i = 0; i < people.size(); ++i) {
            std::cout << std::left << std::setw(5) << i << std::setw(15) << people[i].name << "₹" << std::fixed << std::setprecision(2) << people[i].paid << std::endl;
        }
        std::cout << std::string(30, '-') << std::endl;
        std::cout << "Total Pooled: ₹" << total << std::endl;
        std::cout << "Average per person: ₹" << avg << "\n" << std::endl;
    }

    void optimize() {
        if (people.size() < 2) {
            std::cout << "\n[!] Need at least 2 people to optimize." << std::endl;
            return;
        }

        double total = calculateTotal();
        double average = total / people.size();
        
        std::vector<Balance> debtors, creditors;

        for (const auto& p : people) {
            double bal = std::round((p.paid - average) * 100.0) / 100.0;
            if (bal < -0.01) debtors.push_back({p.name, bal});
            else if (bal > 0.01) creditors.push_back({p.name, bal});
        }

        std::cout << "\n=== Optimized Settlement Plan ===" << std::endl;
        bool transactionsFound = false;

        while (!debtors.empty() && !creditors.empty()) {
            std::sort(debtors.begin(), debtors.end(), [](const Balance& a, const Balance& b) {
                return a.balance < b.balance;
            });
            std::sort(creditors.begin(), creditors.end(), [](const Balance& a, const Balance& b) {
                return a.balance > b.balance;
            });

            Balance& d = debtors[0];
            Balance& c = creditors[0];

            double amount = std::min(-d.balance, c.balance);
            amount = std::round(amount * 100.0) / 100.0;

            if (amount > 0) {
                std::cout << " -> " << std::left << std::setw(10) << d.name 
                          << " pays " << std::setw(10) << c.name 
                          << ": ₹" << std::fixed << std::setprecision(2) << amount << std::endl;
                transactionsFound = true;
            }

            d.balance += amount;
            c.balance -= amount;

            if (std::abs(d.balance) < 0.01) debtors.erase(debtors.begin());
            if (std::abs(c.balance) < 0.01) creditors.erase(creditors.begin());
        }

        if (!transactionsFound) {
            std::cout << "All settled! No transactions needed." << std::endl;
        }
        std::cout << std::string(34, '=') << "\n" << std::endl;
    }

    void clear() {
        people.clear();
    }
};

void showMenu() {
    std::cout << "=== EXPENSE OPTIMIZER (C++) ===" << std::endl;
    std::cout << "1. Add Person" << std::endl;
    std::cout << "2. Remove Person (by ID)" << std::endl;
    std::cout << "3. Display All Expenses" << std::endl;
    std::cout << "4. Run Optimization" << std::endl;
    std::cout << "5. Clear All Data" << std::endl;
    std::cout << "6. Exit" << std::endl;
    std::cout << "Choice: ";
}

int main() {
    ExpenseOptimizer app;
    int choice;
    std::string name;
    double paid;

    while (true) {
        showMenu();
        if (!(std::cin >> choice)) {
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            std::cout << "[!] Invalid input. Please enter a number." << std::endl;
            continue;
        }

        switch (choice) {
            case 1:
                std::cout << "Enter name: ";
                std::cin >> name;
                std::cout << "Enter amount paid: ₹";
                if (!(std::cin >> paid)) {
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                    std::cout << "[!] Invalid amount." << std::endl;
                } else {
                    app.addPerson(name, paid);
                }
                break;
            case 2:
                int id;
                std::cout << "Enter ID to remove: ";
                if (!(std::cin >> id)) {
                    std::cin.clear();
                    std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
                } else {
                    app.removePerson(id);
                }
                break;
            case 3:
                app.displayPeople();
                break;
            case 4:
                app.optimize();
                break;
            case 5:
                app.clear();
                std::cout << "[+] Data cleared." << std::endl;
                break;
            case 6:
                std::cout << "Goodbye!" << std::endl;
                return 0;
            default:
                std::cout << "[!] Invalid choice." << std::endl;
        }
    }
    return 0;
}
