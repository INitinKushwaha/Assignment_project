// src/components/TaskDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../axiosConfig';

const TaskDetail = ({ taskId, onEditTask, onDeleteTask }) => {
    const [task, setTask] = useState(null);
    
    useEffect(() => {
        axios.get(`/api/tasks/${taskId}`)
            .then(response => setTask(response.data))
            .catch(error => console.error(error));
    }, [taskId]);

    const handleDeleteTask = async () => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            onDeleteTask(taskId); // Notify parent component
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };
    if (!task) {
        return <div>Loading...</div>;
    }
    

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.dueDate}</p>
            <button onClick={() => onEditTask(task._id)}>Edit</button>
            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
        </div>
    );
};

export default TaskDetail;
