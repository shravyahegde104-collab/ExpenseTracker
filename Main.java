import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        ArrayList<Expense> expenses = new ArrayList<>();
        loadExpenses(expenses);

        boolean running = true;

        while (running) {

            showMenu();

            System.out.print("Enter your choice: ");
            int choice = input.nextInt();

            if (choice == 1) {

                addExpense(input, expenses);

            } else if (choice == 2) {

                viewExpenses(expenses);

            } else if (choice == 3) {

                calculateTotal(expenses);

            } else if (choice == 4) {

                deleteExpense(input, expenses);

            } else if (choice == 5) {

                saveExpenses(expenses);
                running = false;
                System.out.println("Thank you for using Expense Tracker!");

            } else {

                System.out.println("Invalid choice. Please try again.");

            }
        }

        input.close();
    }


    static void showMenu() {

        System.out.println();
        System.out.println("================================");
        System.out.println("        EXPENSE TRACKER");
        System.out.println("================================");
        System.out.println("1. Add Expense");
        System.out.println("2. View Expenses");
        System.out.println("3. Calculate Total");
        System.out.println("4. Delete Expense");
        System.out.println("5. Exit");
        System.out.println("================================");
    }


    static void addExpense(Scanner input, ArrayList<Expense> expenses) {

        int amount;
        while(true){
            System.out.print("enter amount:");
            amount=input.nextInt();
            if(amount>0){
                break;
            }
            System.out.println("Amount must be greater than 0.");
        }
        String category;
        while(true){
            System.out.print("Enter category: ");
            category = input.next();
            if(!category.isEmpty()){
                break;
            }
            System.out.println("Category cannot be empty.");
        }

        input.nextLine();

        String description;
        while(true){
            System.out.print("Enter description: ");
            description = input.nextLine();
            if(!description.isEmpty()){
                break;
            }
            System.out.println("Description cannot be empty.");
        }

        Expense expense = new Expense(amount, category, description);

        expenses.add(expense);

        System.out.println("Expense added successfully!");
    }


    static void viewExpenses(ArrayList<Expense> expenses) {

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
                " | Date:\n " + expense.date
            );
        }
    }


    static void calculateTotal(ArrayList<Expense> expenses) {

        int total = 0;

        for (Expense expense : expenses) {
            total = total + expense.amount;
        }

        System.out.println("Total spending: ₹" + total);
    }


    static void deleteExpense(Scanner input, ArrayList<Expense> expenses) {

        if (expenses.isEmpty()) {
            System.out.println("No expenses to delete.");
            return;
        }

        viewExpenses(expenses);

        System.out.print("Enter the expense number to delete: ");
        int number = input.nextInt();

        int index = number - 1;

        if (index >= 0 && index < expenses.size()) {

            expenses.remove(index);

            System.out.println("Expense deleted successfully!");

        } else {

            System.out.println("Invalid expense number.");

        }
    }


    static void saveExpenses(ArrayList<Expense> expenses) {

        try {

            FileWriter writer = new FileWriter("data/expenses.csv");

            for (Expense expense : expenses) {

                writer.write(
                    expense.amount + "," +
                    expense.category + "," +
                    expense.description + "," +
                    expense.date + "\n"
                );
            }

            writer.close();

            System.out.println("Expenses saved successfully!");

        } catch (IOException e) {

            System.out.println("Error saving expenses.");
        }
    }


    static void loadExpenses(ArrayList<Expense> expenses) {

        try {

            BufferedReader reader = new BufferedReader(new FileReader("data/expenses.csv"));

            String line;

            while ((line = reader.readLine()) != null) {

                String[] parts = line.split(",");

                int amount = Integer.parseInt(parts[0]);
                String category = parts[1];
                String description = parts[2];

                LocalDate date = LocalDate.parse(parts[3]);
                Expense expense = new Expense(amount, category, description);

                expenses.add(expense);
            }

            reader.close();

        } catch (IOException e) {

            System.out.println("Could not load expenses.");
        }
    }
}