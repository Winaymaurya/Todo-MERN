import express  from "express";
import { createTaskController, deleteTaskController, editTaskController, getSingleTaskController, showAllCompletedTaskController, showAllUncompletedTaskController, updateTaskController } from "../controllers/taskController.js";

const router=express.Router();

//routing...
router.delete('/tasks/:id',deleteTaskController);
// router.get('/tasks',showAllUncompletedTaskController);
router.get('/tasks',showAllCompletedTaskController);
// router.get('/tasks/:id',getSingleTaskController);
router.post('/tasks',createTaskController);
router.put('/tasks/update/:id',updateTaskController);
router.put('/tasks/edit/:id',editTaskController);

export default router