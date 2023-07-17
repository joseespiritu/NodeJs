import express from 'npm:express';
import tasksRoutes from "./routes/tasks.routes.ts";

const app = express();

app.use(tasksRoutes);

app.listen(3000, () => {
    console.log('Server is runing on port 3000');
});