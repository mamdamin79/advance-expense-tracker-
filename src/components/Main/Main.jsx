import React, { useContext } from 'react';
import Form from './Form/Form';
// styles
import styles from './Main.module.css'
// context
import List from './List/List';
// speechly
import { useSpeechContext } from "@speechly/react-client";
const Main = ({balance}) => {
    // speechly context here hepls us to understand what user saying
    const { segment } = useSpeechContext()
    return (
        <main className={styles.main}>
            <header>
                <h3>Expense Tracker</h3>
                <p>powered by speechly</p>
                <h4 className={styles.balance}>total balance - $ {balance}</h4>
                <p className={styles.format}>try saying :</p>
                <p className={styles.example}>
                    {segment && segment.words.map(word => word.value).join(' ')}
                </p>
            </header>
            <section>
                <Form/>
            </section>
            <footer>
                <List/>
            </footer>
        </main>
    );
}
 
export default Main;