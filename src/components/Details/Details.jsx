import React from 'react';
// styles
import styles from './Details.module.css';
import { Doughnut } from "react-chartjs-2"
import Chart from 'chart.js/auto';

// custom hook
import useTransactions from '../../useTransactions';
const Details = ({title,inc,exp}) => {
    const {chartData} = useTransactions(title);
    return (
        <div className={title === "Expense" ? styles.expense : styles.income}>
            <header>
                <h2>{title}</h2>
            </header>
            <main>
                <p>total$ {inc} {exp}</p>
            </main>
            <Doughnut data={chartData}/>
        </div>
    );
}
 
export default Details;