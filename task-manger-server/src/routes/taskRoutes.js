// routes/taskRoutes.js
import express from 'express';
import Task from '../models/task.js'; // Adjust the path based on your file structure
import {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
} from '../controllers/taskController.js';

const router = express.Router();

// GET all tasks
router.get('/', getTasks);

// POST a new task
router.post('/', createTask);

// GET a task by ID
router.get('/:id', getTaskById);

// PUT (update) a task by ID
router.put('/:id', updateTask);

// DELETE a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;
