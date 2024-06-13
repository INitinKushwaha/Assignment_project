// src/components/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskForm = ({ taskId, onSave, onCancel }) => {
    const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

    useEffect(() => {
        if (taskId) {
            axios.get(`/api/tasks/${taskId}`)
                .then(response => setTask(response.data))
                .catch(error => console.error(error));
        }
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = taskId ? 'put' : 'post';
        const url = taskId ? `/api/tasks/${taskId}` : '/api/tasks';
        
        axios[method](url, task)
            .then(() => {
                onSave();
            })
            .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />
            <textarea
                name="description"
                value={task.description}
                onChange={handleChange}
                placeholder="Description"
            ></textarea>
            <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default TaskForm;
