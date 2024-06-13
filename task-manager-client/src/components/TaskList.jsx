// src/components/TaskList.jsx
import React, { useEffect, useState } from 'react';
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
            <ul>
                {tasks.map(task => (
                    <li key={task._id} onClick={() => onSelectTask(task._id)}>
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
