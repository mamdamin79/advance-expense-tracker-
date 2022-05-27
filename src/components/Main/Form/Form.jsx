import React,{ useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { v4 } from 'uuid';
// styles
// context
import { transactionContext } from '../../../Context/context';
import styles from './Form.module.css'
// categoreis
import { incomeCategories , expenseCategories } from '../../../constants/constants';
// speechly Context
import { useSpeechContext } from "@speechly/react-client";
// toastify
import { ToastContainer, toast } from 'react-toastify';
const type = [
    { value: 'Expense', label: 'Expense' },
    { value: 'Income', label: 'Income' },
  ];
  const initialState = {
    type:{value: '', label: ''},
    amount:"",
    category:{value: '', label: ''},
    date:"",
    id:""
}
const Form = () => {
    const { dispatch } = useContext(transactionContext);
    const [transactionInfo, setTransactionInfo] = useState(initialState);
    const { segment } = useSpeechContext();

    useEffect(()=>{
        if(segment){
            if(segment.intent.intent === "add_expense"){
                setTransactionInfo({...transactionInfo, type:{value:"Expense",label: "Expense" }})
            }else if(segment.intent.intent === "add_income"){
                setTransactionInfo({...transactionInfo, type:{value:"Income",label: "Income" }})
            }else if(segment.isFinal && segment.intent.intent === "create_transaction"){
                return createHandler();
            }
            segment.entities.map((entity=>{
                const category = `${entity.value.charAt(0)}${entity.value.slice(1).toLocaleLowerCase()}`;
                switch (entity.type) {
                    case "date":
                        setTransactionInfo({...transactionInfo, date: entity.value })  
                        break;
                    case "amount":
                        setTransactionInfo({...transactionInfo, amount: entity.value})
                        break;
                    case "category":
                        setTransactionInfo({...transactionInfo, category:{value:category,label:category}})
                        break;
                    default:
                        break;
                }
            }))
            if(segment.isFinal && transactionInfo.date && transactionInfo.category.value && transactionInfo.amount && transactionInfo.type.value){
                createHandler();
            }
        }
    },[segment])

    const createHandler = () =>{
        if(transactionInfo.date && transactionInfo.category.value && transactionInfo.amount && transactionInfo.type.value){
            dispatch({type: 'create' , payload: {...transactionInfo,id:v4()}});
            
        }
        
    }
    return (

        <>
            <form onSubmit={(e)=>e.preventDefault()} className={styles.form}>
                <div>
                    <Select value={{value: transactionInfo.type.value, label: transactionInfo.type.label}} onChange={(e)=> setTransactionInfo({...transactionInfo,type:{value:e.value,label: e.label }})} options={type}/>
                    <Select value={{value: transactionInfo.category.value, label: transactionInfo.category.label}} onChange={(e)=> setTransactionInfo({...transactionInfo,category:{value:e.value,label: e.label }})} options={transactionInfo.type.value === "Income"? incomeCategories.map(c=>{
                        return {value:c.type , label:c.type }
                    }):expenseCategories.map(c=>{
                        return {value:c.type , label:c.type }
                    })}/>
                </div>
                <input value={transactionInfo.amount} onChange={(e)=> setTransactionInfo({...transactionInfo,amount:e.target.value})} type="number" placeholder="amount"/>
                <input value={transactionInfo.date} onChange={(e)=> setTransactionInfo({...transactionInfo,date:e.target.value})} type="date"/>
                <button type="submit" className={styles.create} onClick={createHandler} >create</button>
            </form>
        </>
        
    );
}
 
export default Form;