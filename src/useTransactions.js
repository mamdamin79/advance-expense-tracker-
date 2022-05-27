import { useContext } from "react";
import { transactionContext } from "../src/Context/context"
import { incomeCategories,expenseCategories,resetCategories } from "./constants/constants";
const useTransactions = (title) => {
    resetCategories();
    const {state} = useContext(transactionContext);
    console.log(state)
    // if we are in the income cart it returns income transaction and if we are in expense transaction it returns expense transaction that user entered
    const transactionPerType = state.filter(tr=> tr.type.value === title)
    const categories = title === "Expense" ? expenseCategories : incomeCategories
    transactionPerType.forEach((t)=>{
        const category = categories.find(c => c.type === t.category.value)
        if (category) category.amount += t.amount
    })
    const filteredCategories = categories.filter(c => c.amount > 0)
    const chartData = {
        datasets:[{
            data:filteredCategories.map(c => c.amount),
            backgroundColor:filteredCategories.map(c => c.color)
        }],
        labels:filteredCategories.map(c => c.type)
    }
    return {chartData}
}
export default useTransactions;