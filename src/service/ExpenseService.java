package service;

import model.Expense;
import java.util.ArrayList;
import java.util.HashMap;

public class ExpenseService {

    public void addExpense(Expense expense, ArrayList<Expense> expenses) {
        expenses.add(expense);
        System.out.println("Expense added successfully!");
    }

    public void viewExpenses(ArrayList<Expense> expenses) {

        if (expenses.isEmpty()) {
            System.out.println("No expenses found.");
            return;
        }

        for (int i = 0; i < expenses.size(); i++) {

            Expense expense = expenses.get(i);

            System.out.println(
                (i + 1) + ". ₹" + expense.amount +
                " | " + expense.category +
                " | " + expense.description +
                " | Date: " + expense.date
            );
        }
    }

    public void deleteExpense(int number, ArrayList<Expense> expenses) {

		if (expenses.isEmpty()) {
			System.out.println("No expenses to delete.");
			return;
		}

		int index = number - 1;

		if (index >= 0 && index < expenses.size()) {

			expenses.remove(index);

			System.out.println("Expense deleted successfully!");

		} else {

			System.out.println("Invalid expense number.");
		}
	}

	public void calculateTotal(ArrayList<Expense> expenses) {

		int total = 0;

		for (Expense expense : expenses) {
			total = total + expense.amount;
		}

		System.out.println("Total spending: ₹" + total);
	}

	public void searchByCategory(String searchCategory, ArrayList<Expense> expenses) {

		boolean found = false;

		System.out.println("\n===== SEARCH RESULTS =====");

		for (Expense expense : expenses) {

			if (expense.category.equalsIgnoreCase(searchCategory)) {

				System.out.println(
					"₹" + expense.amount +
					" | " + expense.category +
					" | " + expense.description +
					" | " + expense.date
				);

				found = true;
			}
		}

		if (!found) {
			System.out.println("No expenses found in this category.");
		}
	}

	public void categorySummary(ArrayList<Expense> expenses) {

		HashMap<String, Double> summary = new HashMap<>();

		for (Expense expense : expenses) {

			String category = expense.category;

			if (summary.containsKey(category)) {

				summary.put(
					category,
					summary.get(category) + expense.amount
				);

			} else {

				summary.put(category, (double) expense.amount);
			}
		}

		System.out.println("\n===== EXPENSE SUMMARY =====");

		for (String category : summary.keySet()) {

			System.out.println(
				category + " : ₹" + summary.get(category)
			);
		}
	}

	public void highestExpense(ArrayList<Expense> expenses) {

		if (expenses.isEmpty()) {
			System.out.println("No expenses available.");
			return;
		}

		Expense highest = expenses.get(0);

		for (Expense expense : expenses) {

			if (expense.amount > highest.amount) {
				highest = expense;
			}
		}

		System.out.println("\n===== HIGHEST EXPENSE =====");

		System.out.println("Amount      : ₹" + highest.amount);
		System.out.println("Category    : " + highest.category);
		System.out.println("Description : " + highest.description);
		System.out.println("Date        : " + highest.date);
	}
}