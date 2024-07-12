import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState('')


  const handelAdd = async (e) => {
    e.preventDefault()
    try {
      let data;
      if (editId) {
        data = await axios.put(`http://localhost:8080/api/v1/task/tasks/edit/${editId}`, { name })
      }
      else {
        data = await axios.post(`http://localhost:8080/api/v1/task/tasks`, { name })
      }


      if (data.data?.success) {
        alert(data.data.message)
      }
      else {
        alert(data.data.message)

      }
      setName('')
      getTasks()
    } catch (error) {
      console.log(error)
    }
  }
  const handelDelete = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/v1/task/tasks/${id}`)
      if (data?.success) {
        alert(data.message)
      }
      else {
        alert(data.message)

      }
      getTasks()
      getCompletedTasks()
    } catch (error) {
      console.log(error)
    }
  }


  const handelEdit = async (n, id) => {
    try {
      setEditId(id)
      setName(n)


    } catch (error) {
      console.log(error)
    }

  }



  const handelTick = async (id) => {
    await axios.put(`http://localhost:8080/api/v1/task/tasks/update/${id}`)
    getTasks()
    getCompletedTasks()

  }
  const getTasks = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/v1/task/tasks?status=${false}`)
    console.log(data?.tasks)
    setTasks(data?.tasks)
  }

  const getCompletedTasks = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/v1/task/tasks?status=${true}`)
    console.log(data?.tasks)
    setCompletedTasks(data?.tasks)
  }
  useEffect(() => {
    getTasks()
    getCompletedTasks()
  }, [])

  return (
    <>
      <div className="mainBox">
        <div className="head">
          ToDo -Manage Your daily Tasks
        </div>
        <div className="add">
          <input type="text" name="" placeholder='Add your Task' id="" onChange={(e) => setName(e.target.value)} value={name} />
          <button onClick={handelAdd}>+</button><br />

        </div>
        {tasks.length ? tasks.map((p) => (
          <div className="task">



            <div className='' key={p._id}> <li>{p.name}</li></div>
            <div className='opt'>

              <div className="done" onClick={() => handelTick(p._id)}>
                <input type="checkbox" id="" name="" value="" />
              </div>
              <div className="edit" onClick={() => handelEdit(p.name, p._id)}>
                <img src="pencil.png" alt="" />
              </div>
              <div className="delete" onClick={() => handelDelete(p._id)}>
                <img src="delete.png" alt="" />
              </div>
            </div>
          </div>
        )
        ) :
          <div className="">Create Your First Task</div>
        }
        <h3>Completed Tasks</h3>
        {completedTasks.length ? completedTasks.map((p) => (
          <div className="task">



            <div className='' key={p._id}><li>{p.name}</li></div>
            <div className='opt'>
              {/* <div className="done" >Tick</div> */}
              <div className="delete" onClick={() => handelDelete(p._id)}>
                <img src="delete.png" alt="" />
              </div>
            </div>
          </div>
        )
        ) :
          <div className="">No Completed Task</div>
        }
      </div>



    </>
  )
}

export default App
