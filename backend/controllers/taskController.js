import taskModel from "../models/taskModel.js";

export const createTaskController = async (req, res) => {
    try {
        const { name } = req.body
        console.log(req.body, "10848408")
        if (!name) {
            return res.send({ message: "Task is required" })
        }

        const existingTask = await taskModel.findOne({ name })
        if (existingTask) {
            return res.status(200).send({
                success: false,
                message: "Task Already exist"
            })
        }

        //Save task

        const task = await new taskModel({ name }).save();
        res.status(201).send({
            success: true,
            message: "New task is Created",
            task
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}


export const showAllUncompletedTaskController = async (req, res) => {
    try {
        const tasks =await taskModel.find({isCompleted:false})
        if (tasks) {
            return res.status(200).send({
                success: true,
                message: "Tasks Shown",
                tasks
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went wrong in fetching ",
            error
        })
    }
}

export const showAllCompletedTaskController = async (req, res) => {
    try {
        const {status}=req.query
        const tasks =await taskModel.find({isCompleted:status})
        if (tasks) {
            return res.status(200).send({
                success: true,
                message: "Tasks Shown",
                tasks
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "SomeThing went wrong in fetching ",
            error
        })
    }
}

export const deleteTaskController=async(req,res)=>{

    try {
     const {id}=req.params
     console.log(req.params,"vinayyyyyy")
     
    await taskModel.findByIdAndDelete(id)
    res.status(200).send({
        success:true,
        message:"Task Deleted"
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Something went wrong",
            success:false,
            error
        })
    }
   
}


export const getSingleTaskController=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id)
        const data =await taskModel.findById(id)
        console.log(data,128)
        if(!data){
            res.status(200).send({
                success:false,
                message:"Can't Find data",
            })
        }
        else{
            res.status(200).send({
                success:true,
                message:"One task is shown",
                data
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"something went wrong",
            error
        })
    }
}


export const updateTaskController=async(req,res)=>{
    try {
        const { id } = req.params
    
        

        const existingTask = await taskModel.findByIdAndUpdate(id,{isCompleted:true},{new:true})
        if (existingTask) {
            return res.status(200).send({
                success: false,
                message: "Task Updated",
            })
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}