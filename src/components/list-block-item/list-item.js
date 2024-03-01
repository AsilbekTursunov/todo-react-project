import { useContext, useState } from 'react'
import './list-item.css'
import { Context } from '../../context/context-index'


const ListItem = ({text, id, onTask, newTask}) =>{
    const {state, dispatch} = useContext(Context)
     
    const date = new Date()
    const nowHour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() 
    const nowMinute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() 
    const nowSecond = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()  
    
     
    const onDelete = () =>{ 
        dispatch({type:'ON_DELETE', payload:id})
    }
    const onEdit = () =>{ 
        onTask(id)
    }
    return (
        <>
             <li className="list-group-item d-block d-flex justify-content-between py-1 px-2" key={id}>
                <div className="list-text-block d-flex justify-content-between w-100"><span className="task">{text}</span> <span className="real-time mx-2"> {nowHour} : {nowMinute} {` `}</span></div>
                <div className="list-button-block d-flex flex-row align-self-start ">
                    <button type="button" className='edit-button'><i className="fa-solid fa-pen-to-square" onClick={onEdit}></i></button>
                    <button type="button" className='delete-button' onClick={onDelete}><i className="fa-solid fa-trash"></i></button>
                </div>
             </li>
        </>
    )
}

export default ListItem;