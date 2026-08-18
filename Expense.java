import java.time.LocalDate;
public class Expense {
    int amount;
    String category;
    String description;
    LocalDate date;
    Expense(int amount,String category,String description){        
    
        this.amount=amount;
        this.category=category;
        this.description=description;
        this.date=LocalDate.now();  
    }
    Expense(int amount,String category,String description,LocalDate date){       
        
        this.amount=amount;
        this.category=category;
        this.description=description;
        this.date=date;  
    }
}
