package service;

import java.util.ArrayList;
import java.util.HashMap;
import model.Expense;

public class ExpenseService {

    public void addExpense(Expense expense, ArrayList<Expense> expenses) {
        expenses.add(expense);
        System.out.println("Expense added successfully!");
    }

    public void viewExpenses(ArrayList<Expense> expenses) {

        System.out.println();
        System.out.println("===== ALL EXPENSES =====");

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

    public void calculateTotal(ArrayList<Expense> expenses) {

        int total = 0;

        for (Expense expense : expenses) {
            total += expense.amount;
        }

        System.out.println("Total spending: ₹" + total);
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


	public void updateExpense(
			int number,
			int amount,
			String category,
			String description,
			ArrayList<Expense> expenses) {

		int index = number - 1;

		if (index < 0 || index >= expenses.size()) {
			System.out.println("Invalid expense number.");
			return;
		}

		Expense expense = expenses.get(index);

		expense.amount = amount;
		expense.category = category;
		expense.description = description;

		System.out.println("Expense updated successfully!");
	}


    public void searchByCategory(
            String searchCategory,
            ArrayList<Expense> expenses) {

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
            System.out.println(
                "No expenses found in this category.");
        }
    }

    public void categorySummary(ArrayList<Expense> expenses) {

        HashMap<String, Integer> summary = new HashMap<>();

        for (Expense expense : expenses) {

            String category = expense.category;

            summary.put(
                category,
                summary.getOrDefault(category, 0)
                    + expense.amount
            );
        }

        System.out.println("\n===== EXPENSE SUMMARY =====");

        if (summary.isEmpty()) {
            System.out.println("No expenses found.");
            return;
        }

        for (String category : summary.keySet()) {

            System.out.println(
                category + " : ₹" + summary.get(category));
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