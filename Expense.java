import java.time.LocalDate;
public class Expense {
    int amount;
    String category;
    String description;
    LocalDate date;
    Expense(int amount,String category,String description){        //constructor (whenever someone creates an expense ,
    //  they need to provide an amount ,category, and description)
        this.amount=amount;
        this.category=category;
        this.description=description;
        this.date=LocalDate.now();  // whenever an expense is created , the date is automatically set to the current date
    }
    Expense(int amount,String category,String description,LocalDate date){        //constructor (whenever someone creates an expense ,
        //  they need to provide an amount ,category, and description)
        this.amount=amount;
        this.category=category;
        this.description=description;
        this.date=date;  // whenever an expense is created , the date is automatically set to the current date
    }
}
