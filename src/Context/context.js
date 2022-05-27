import React,{useReducer} from 'react';

export const transactionContext = React.createContext();
const initialState = []; 
const reducer = (state,action)=>{
    switch(action.type){
        case 'create':
            return [...state,action.payload]
        case 'delete':
            return state.filter(tr=>tr.id !== action.payload) ;
        default:
            return state
    }

}

const TransactionContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState);
    return (
        <transactionContext.Provider value={{state:state,dispatch:dispatch}}>
            {children}
        </transactionContext.Provider>
    );
}
 
export default TransactionContextProvider;
