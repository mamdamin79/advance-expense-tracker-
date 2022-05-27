import React from 'react';
import { BiTrash } from "react-icons/bi";
// styles
import styles from './ListItem.module.css'

const ListItem = ({dispatch,info}) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={info.type.value === "Expense" ? styles.expense : styles.income}>
                    {info.type.value.slice(0,2)}
                </div>
                <div>
                    <h5>
                        {info.category.value}
                    </h5>
                    <p>${info.amount} - {info.date}</p>
                </div>
            </div>
            <button className={styles.delete} onClick={()=> dispatch({type: 'delete' , payload: info.id})}><BiTrash /></button>
        </div>
    );
}
 
export default ListItem;