import React,{ useContext } from 'react';
import Details from "./components/Details/Details";
import Main from "./components/Main/Main";
// context
import { transactionContext } from './Context/context';
// speechly talk button
import { PushToTalkButton,BigTranscript,IntroPopup } from "@speechly/react-ui";
function App() {
  const {state} = useContext(transactionContext)
    let inc = 0;
    let exp = 0;
    
    state.map(tr=> {
        tr.type.value === 'Income'? inc = parseFloat(inc) + parseFloat(tr.amount) : exp = parseFloat(exp) + parseFloat(tr.amount)
    })
  return (
    <>
      <div className="app">
        <Details exp={exp} title="Expense"/>
        <Main balance={inc-exp}/>
        <Details inc={inc} title="Income"/>
      </div>
      <PushToTalkButton
          captureKey=" "
          intro="Push to talk"
          placement='bottom'
          >
        </PushToTalkButton>
    </>
    
  );
}

export default App;
