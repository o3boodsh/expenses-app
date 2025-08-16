import { useEffect, useState } from "react";
import "../css/custom.css";
import ExpenseImage from "../img/m1.png";
import FormLayout from "./FormLayout";
import Header from "./Header";
import TableLayout from "./TableLayout";
import Swal from "sweetalert2";
import ExpenseModel from "../models/ExpenseModel";

function MainLayout() {
    // const expenses = [];
    let [expenses, setExpenses] = useState([]);
    let onNewExpenseHandler = (newExpense) => {
        // newExpense.id = Math.random();
        // setExpenses((prevExpenses) => {
        //     return [newExpense, ...prevExpenses];
        // });
        saveExpenseOnFirebase(newExpense);
    }

    let onDeleteExpenseHandler = (id) => {
        // confirmDelete(id);
        deleteExpensesFromFirebase(id);
    }

    let confirmDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                let filteredExpenses = expenses.filter((element) => element.id != id);
                setExpenses(filteredExpenses);
                Swal.fire({
                    title: "Deleted!",
                    text: "Expense has been deleted.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1000,
                });
            }
        });
    }

    let saveExpenseOnFirebase = (newExpense) => {
        fetch('https://react-expenses-ca03a-default-rtdb.firebaseio.com/expenses.json',
            {
                method: "POST",
                body: JSON.stringify(newExpense),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then((response) => {
            return response.json();
        }).then((result) => {
            console.log(result);
            // newExpense.id = result["name"];
            newExpense.id = result.name;
            setExpenses((prevExpenses) => {
                return [...prevExpenses, newExpense];
            });
        }).catch((error) => {

        });
    }

    let fetchExpensesFromFirebase = () => {
        fetch('https://react-expenses-ca03a-default-rtdb.firebaseio.com/expenses.json',
            {
                method: "GET",
            }
        ).then((response) => {
            return response.json();
        }).then((result) => {
            // console.log(result);
            let fbExpenses = [];
            for (let key in result) {
                // console.log(key);
                // console.log(result[key]);
                let expense = new ExpenseModel(
                    result[key].title,
                    result[key].date,
                    result[key].price,
                    result[key].descrption
                );
                expense.id = key;
                fbExpenses.push(expense);
            }
            console.log(fbExpenses);
            setExpenses(fbExpenses);

        }).catch((error) => { }
        );
    }

    let deleteExpensesFromFirebase = (id) => {
        fetch(`https://react-expenses-ca03a-default-rtdb.firebaseio.com/expenses/${id}.json`,
            {
                method: "DELETE",
            }
        ).then((response) => {
            return response.json();
        }).then(() => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    let filteredExpenses = expenses.filter((element) => element.id != id);
                    setExpenses(filteredExpenses);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Expense has been deleted.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1000,
                    });
                }
            });
        }).catch((error) => { });
    }

    // let status = false
    // useEffect(fetchExpensesFromFirebase, [status]);
    useEffect(fetchExpensesFromFirebase, []);
    // fetchExpensesFromFirebase();

    return <div className="container mt-5">
        <div className="row">
            <div className="col-sm-6">
                <img src={ExpenseImage} className="img-fluid" alt="" />
            </div>
            <div className="col-sm-6 mt-5">
                <Header />
                <FormLayout onNewExpense={onNewExpenseHandler} />
            </div>
        </div>
        <TableLayout expenses={expenses} deleteExpenseHandler={onDeleteExpenseHandler} />
    </div>
}

export default MainLayout;