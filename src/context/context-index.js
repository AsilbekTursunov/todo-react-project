import { createContext, useReducer } from "react"



const initialValue = {
    localdata: JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : [],
    edit:''
}

export const Context = createContext()

const reducer = (state = initialValue, action) =>{
    const {type, payload} = action
    switch (type) {
        case 'ADD_TASK':
            const datalength = state.localdata.length; 
            const newarr = [...state.localdata, {id: (datalength + 1),title:payload}] 
            localStorage.setItem('list',JSON.stringify(newarr))
            return {...state, localdata:newarr}
        case 'ON_DELETE':
            const del = state.localdata.filter(item => item.id != payload) 
            localStorage.setItem('list',JSON.stringify(del))
            return {...state, localdata:del}
        case 'CHANGE_TASK':
            const {id, newtext} = payload  
            const newarray = state.localdata.map(item => { 
                if (item.id === id) {
                    return {...item, title:newtext}
                  }
                   return item
            })
            console.log(newarray);
            localStorage.setItem('list', JSON.stringify(newarray))
            return {...state, localdata:JSON.parse(localStorage.getItem('list'))}
        default:
            break;
    }
}

const Provider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialValue)

    return <Context.Provider value={{state, dispatch}} >{children}</Context.Provider>
}

export default Provider;