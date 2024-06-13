// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/db/index.js';
import taskRoutes from './src/routes/taskRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors(
    {
        origin: ['https://assignment-project-frontend.vercel.app'],
        methods : ['POST', 'GET'],
        Credentials: true

    }
));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
