import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Scanner;
import model.Expense;
import service.ExpenseService;

public class Main {

    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        ExpenseService service = new ExpenseService();

        ArrayList<Expense> expenses = new ArrayList<>();
        loadExpenses(expenses);

        boolean running = true;

        while (running) {

            showMenu();

            System.out.print("Enter your choice: ");

            while (!input.hasNextInt()) {
                System.out.println("Please enter a valid number.");
                input.next();
                System.out.print("Enter your choice: ");
            }

            int choice = input.nextInt();

            if (choice == 1) {

                addExpense(input, expenses, service);

            } else if (choice == 2) {

                service.viewExpenses(expenses);

            } else if (choice == 3) {

                service.calculateTotal(expenses);

            } else if (choice == 4) {

                System.out.print("Enter the expense number to delete: ");

                while (!input.hasNextInt()) {
                    System.out.println("Please enter a valid expense number.");
                    input.next();
                    System.out.print("Enter the expense number to delete: ");
                }

                int number = input.nextInt();

                service.deleteExpense(number, expenses);

            
            } else if (choice == 5) {

                System.out.print("Enter category to search: ");
                String searchCategory = input.next();

                service.searchByCategory(searchCategory, expenses);

            } else if (choice ==6) {

                service.categorySummary(expenses);

            } else if (choice == 7) {

                service.highestExpense(expenses);

            } else if (choice == 8) {

                service.viewExpenses(expenses);

                System.out.print("Enter the expense number to update: ");

                while (!input.hasNextInt()) {
                    System.out.println("Please enter a valid expense number.");
                    input.next();
                    System.out.print("Enter the expense number to update: ");
                }

                int number = input.nextInt();

                int amount;

                while (true) {

                    System.out.print("Enter new amount: ");

                    if (input.hasNextInt()) {

                        amount = input.nextInt();

                        if (amount > 0) {
                            break;
                        }

                        System.out.println("Amount must be greater than 0.");

                    } else {

                        System.out.println("Please enter a valid number.");
                        input.next();
                    }
                }


                String category;

                while (true) {

                    System.out.print("Enter new category: ");
                    category = input.next();

                    if (category.matches("[a-zA-Z]+")) {
                        break;
                    }

                    System.out.println("Category should contain letters only.");
                }

                input.nextLine();

                System.out.print("Enter new description: ");
                String description = input.nextLine();

                service.updateExpense(
                    number,
                    amount,
                    category,
                    description,
                    expenses
                );
                       
            } else if (choice == 9) {

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
        System.out.println("5. Search by category");
        System.out.println("6. Category Summary");
        System.out.println("7. Highest Expense");
        System.out.println("8. Update Expense");
        System.out.println("9. Exit");
        System.out.println("================================");
    }


    static void addExpense(
        Scanner input,
        ArrayList<Expense> expenses,
        ExpenseService service) {

        int amount;

        while (true) {

            System.out.print("Enter amount: ");

            if (input.hasNextInt()) {

                amount = input.nextInt();

                if (amount > 0) {
                    break;
                }

                System.out.println("Amount must be greater than 0.");

            } else {

                System.out.println("Please enter a valid number.");
                input.next();
            }
        }


        String category;

        while (true) {

            System.out.print("Enter category: ");
            category = input.next();

            if (category.matches("[a-zA-Z]+")) {
                break;
            }

            System.out.println("Category should contain letters only.");
        }


        input.nextLine();


        String description;

        while (true) {

            System.out.print("Enter description: ");
            description = input.nextLine();

            if (!description.isEmpty()) {
                break;
            }

            System.out.println("Description cannot be empty.");
        }


        Expense expense =
                new Expense(amount, category, description);

        service.addExpense(expense, expenses);
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
                Expense expense = new Expense(amount, category, description, date);

                expenses.add(expense);
            }

            reader.close();

        } catch (IOException e) {

            System.out.println("Could not load expenses.");
        }
    }

}