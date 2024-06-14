// src/components/TaskList.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = ({ onSelectTask, onNewTask }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setTasks(response.data);
                } else {
                    setTasks([]);
                }
            })
            .catch(error => {
                console.error(error);
                setTasks([]);
            });
    }, []);

    return (
        <div>
            <button onClick={onNewTask}>New Task</button>
            <div>
                {tasks.map(task => (
                    <div className ="item"key={task._id} onClick={() => onSelectTask(task._id)}>
                        {task.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
