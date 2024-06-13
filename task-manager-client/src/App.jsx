// src/App.jsx
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';
import './styles/styles.css';

const App = () => {
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleSelectTask = (id) => {
        setSelectedTaskId(id);
        setEditingTaskId(null);
        setIsCreating(false);
    };

    const handleEditTask = (id) => {
        setEditingTaskId(id);
        setSelectedTaskId(null);
        setIsCreating(false);
    };

    const handleNewTask = () => {
        setIsCreating(true);
        setEditingTaskId(null);
        setSelectedTaskId(null);
    };

    const handleSave = () => {
        setEditingTaskId(null);
        setIsCreating(false);
        setSelectedTaskId(null);
    };

    const handleCancel = () => {
        setEditingTaskId(null);
        setIsCreating(false);
        setSelectedTaskId(null);
    };

    const handleDeleteTask = (id) => {
        axios.delete(`/api/tasks/${id}`)
            .then(() => setSelectedTaskId(null))
            .catch(error => console.error(error));
    };

    return (
        <div className="App">
            <TaskList onSelectTask={handleSelectTask} onNewTask={handleNewTask} />
            {selectedTaskId && (
                <TaskDetail
                    taskId={selectedTaskId}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                />
            )}
            {(editingTaskId || isCreating) && (
                <TaskForm
                    taskId={editingTaskId}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default App;
