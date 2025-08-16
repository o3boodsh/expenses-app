class ExpenseModel {
    id;
    title;
    date;
    price;
    descrption;

    constructor(title, date, price, descrption) {
        this.title = title;
        this.date = date;
        this.price = price;
        this.descrption = descrption;
    }
}

export default ExpenseModel;