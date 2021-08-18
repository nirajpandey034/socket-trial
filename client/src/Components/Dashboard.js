import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'


const socket = io.connect('http://localhost:5000')
function Dashboard() {
    const [message, setMessage] = useState('')
    const [data, setData] = useState([])
    const sendData = (e)=>{
        e.preventDefault();
        socket.emit('data', {message})
        setMessage('')
    }

    useEffect(()=>{
        socket.on("data",(payload)=>{
            setData([...data, payload]);
        });
    })
    return (
        <div>
            <h1>My App</h1>
            {data.map((payload,index)=>{
                return <p key={index}>{payload.message}</p>
            })}
            <form onSubmit={sendData}>
                <input type="text" name="data" placeholder="enter something" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Dashboard
