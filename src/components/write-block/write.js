import { useContext, useState } from 'react';
import './write.css'
import { Context } from '../../context/context-index';

const WriteBlock = () =>{
    const {state, dispatch} = useContext(Context)
    const [message, setMessage] = useState('')
    const [error, setError] = useState(false)

    const getValue = (e) =>{
        setMessage(e.target.value)
    } 
    const onDrop = (e) =>{
        e.preventDefault()
        if(message.length === 0) {
            setTimeout(()=>{
                setError(true)
                setTimeout(()=>{
                    setError(false)
                },2000)
            })
            return
        }
        dispatch({type:'ADD_TASK', payload:message}) 
        setMessage('')
    }
    return (
        <div>
            <form className="form-group" onSubmit={onDrop}>
                <label className="w-100 mb-2 ">
                    <input type="text" name="value" className="form-control rounded-3" placeholder="Write your tasks" onChange={getValue} value={message} />
                     <span className="mention justify-self-start p-1"> {error ? 'Please write something'  : ' '} </span>
                </label>
                <label className="w-100 d-flex justify-content-end ">
                    <button type="submit" className="btn btn-primary justify-content-end">Add</button>
                </label>
            </form>
        </div>
    )
}
 export default WriteBlock;