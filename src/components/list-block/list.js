import { useContext, useState } from "react";
import { Context } from "../../context/context-index";
import ListItem from "../list-block-item/list-item";
import './list.css'




const ListBlock = () =>{

    const {state, dispatch} = useContext(Context) 
    const [id, setId] = useState(0)
    const [text, setText] = useState('')
    const [newtext, setNewtext] = useState('')
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)
    const data = state.localdata 
    const onTask = (e) => {
        setId(e)
        setText(data[e-1].title)
        setNewtext(data[e-1].title)
        setModal(true)
        
    } 
    const newTask = (e) => setNewtext(e.target.value) 
    function errorMessage(){
        setTimeout(()=>{
            setError(true)
            setTimeout(()=>{
                setError(false)
            },2000)
        }) 
        return
    } 
    const onClose = () =>{
        if(newtext.length === 0) errorMessage()
        dispatch({type:'CHANGE_TASK', payload:{id, newtext:text}})
        setModal(false)
    }
    const addTask = (e) => {
        e.preventDefault()  
        if(newtext.length === 0) errorMessage()  
        dispatch({type:'CHANGE_TASK', payload:{id, newtext}})
        setModal(false)
        setNewtext('') 
    }
    return (
        <>
            <div className="list-block">
                <ul className="list-group my-3 position-relative d-block">
                    {data.map((item, index) => {
                        return <ListItem key={index} id = {item.id} text = {item.title} onTask = {onTask} newTask = {newtext}/>
                    })}
                </ul> 
            </div>
            <div className={` edit-form rounded-2 ${ modal  ? 'd-block' : 'd-none' }`}>
                <div className="edit-header d-flex justify-content-between p-2">
                    <h3 className="headline"><span className="headline-text d-inline-block">Change the todo</span></h3>
                    <button type="button" className="close-btn btn" onClick={onClose}><i className="fa-solid fa-close"></i></button>
                </div>
                <form className="edit-body p-3">
                    <label className="w-100 mb-2 ">
                        <input type="text" name="value" className="form-control rounded-3" onChange={newTask} placeholder="Write your tasks" value={newtext}/>
                        <span className="mention justify-self-start p-1">   {error ? 'Please write something'  : ''}  </span>
                    </label>
                    <label className="w-100 d-flex justify-content-end ">
                        <button type="submit" className="btn btn-primary justify-content-end" onClick={addTask} >Add</button>
                    </label>
                </form>
            </div>
            <div className={`overlay ${ modal  ? 'd-block' : 'd-none' }`}></div>
        </>
        
    )
}
export default ListBlock;