import React, { useContext } from 'react';
// styles
import styles from './List.module.css'
// context
import { transactionContext } from '../../../Context/context';
import ListItem from './ListItem';
const List = () => {
    const {state, dispatch} = useContext(transactionContext)
    return (
        <div className={styles.container}>
            {state.map(transaction => <ListItem key={transaction.id} info={transaction} dispatch={dispatch}/>)}
        </div>
    );
}
 
export default List;