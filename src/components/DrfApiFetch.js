import React, {useState, useEffect} from 'react'
import axios from 'axios'

const DrfApiFetch = () => {

    const [tasks, setTasks] = useState([])
    const [selectedTask, setSelectedTask] = useState([])
    const [id, setId] = useState(1)
    const [editedTask, setEditedTask] = useState({id:'', title:''})

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tasks', {
            headers: {
                'Authorization': 'Token 1a79345b2de5ee35ad2a2f82e87f42d7f42b9b84'
            }
        })
        .then(res => {setTasks(res.data)})
    })

    const getTask = () => {
        axios.get(`http://127.0.0.1:8000/api/tasks/${id}`, {
            headers: {
                'Authorization': 'Token 1a79345b2de5ee35ad2a2f82e87f42d7f42b9b84'
            }
        })
        .then(
            res => {setSelectedTask(res.data)}
            )
    }

    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`, {
            headers: {
                'Authorization': 'Token 1a79345b2de5ee35ad2a2f82e87f42d7f42b9b84'
            }
        })
        .then(
            res => {setTasks(tasks.filter(task => task.id !== id)); setSelectedTask([])}
            )
    }

    const createTask = (task) => {
        const data = {
            title: task.title
        }
        axios.post(`http://127.0.0.1:8000/api/tasks/`, data, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token 1a79345b2de5ee35ad2a2f82e87f42d7f42b9b84'
            }
        })
        .then(
            res => (setTasks([...tasks, res.data]))
            )
    }

    const updateTask = (task) => {
        axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}`, task, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token 1a79345b2de5ee35ad2a2f82e87f42d7f42b9b84'
            }
        })
        .then(
            res => {setTasks(tasks.map(task => (task.id === editedTask.id ? res.data : task)));
                    setEditedTask({id:'', title:''})
                    }
            )
    }

    const handleInputChange = () => evt => {
        const value = evt.target.value;
        const name = evt.target.name;
        setEditedTask({...editedTask, [name]:value})
    }

    return (
        <div>
            <ul>
                {
                tasks.map(task => <li key={task.id}> {task.title}  {task.id}
                <button type='button' onClick={()=>deleteTask(task.id)}>
                    <i className="fas fa-trash-alt"></i>
                </button>
                <button type='button' onClick={()=>setEditedTask(task)}>
                    <i className="fas fa-pen"></i>
                </button>
                </li>)
                
                }
            </ul>

            Set id <br />
            <input type='text' value={id} onChange={evt=>{setId(evt.target.value)}}/>
            <br/>
            <button type='button' onClick={()=>getTask()}>Get Task</button>
            

            <h3>{selectedTask.title} {selectedTask.id}</h3>

            <input type="text" name="title"
            value = {editedTask.title}
            onChange={handleInputChange()}
            placeholder="New Task ?" required/>
            { editedTask.id ?  
            <button onClick={()=>updateTask(editedTask)}>Update</button>:
            <button onClick={()=>createTask(editedTask)}>Create</button>
            }
        </div>
    )
}

export default DrfApiFetch
