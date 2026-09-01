package expense_tracker.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import expense_tracker.model.Expense;
import expense_tracker.repository.ExpenseRepository;

@Service
public class ExpenseService {

    private final ExpenseRepository repository;

    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
    }

    public Expense addExpense(Expense expense) {
        return repository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    public void deleteExpense(Long id) {
        repository.deleteById(id);
    }

    public Expense updateExpense(Long id, Expense updatedExpense) {
        Expense existingExpense = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setDescription(updatedExpense.getDescription());
        existingExpense.setDate(updatedExpense.getDate());

        return repository.save(existingExpense);
    }

    public List<Expense> getExpensesByCategory(String category) {
        return repository.findByCategoryIgnoreCase(category);
    }

    public int getTotalExpenses() {
        return repository.findAll()
                .stream()
                .mapToInt(Expense::getAmount)
                .sum();
    }

    public Expense getHighestExpense() {
        List<Expense> expenses = repository.findAll();

        if (expenses.isEmpty()) {
            return null;
        }

        Expense highest = expenses.get(0);

        for (Expense expense : expenses) {
            if (expense.getAmount() > highest.getAmount()) {
                highest = expense;
            }
        }

        return highest;
    }

    public Map<String, Integer> getCategorySummary() {
        List<Expense> expenses = repository.findAll();

        Map<String, Integer> summary = new HashMap<>();

        for (Expense expense : expenses) {
            summary.put(
                    expense.getCategory(),
                    summary.getOrDefault(expense.getCategory(), 0) + expense.getAmount()
            );
        }

        return summary;
    }
}
