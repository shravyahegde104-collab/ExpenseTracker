package model;
import java.time.LocalDate;
public class Expense {
    public int amount;
    public String category;
    public String description;
    public LocalDate date;
    public Expense(int amount,String category,String description){        
     
        this.amount=amount;
        this.category=category;
        this.description=description;
        this.date=LocalDate.now();  
    }
    public Expense(int amount,String category,String description,LocalDate date){       
        
        this.amount=amount;
        this.category=category;
        this.description=description;
        this.date=date;  
    }
}
