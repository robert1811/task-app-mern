import { useState, useEffect } from 'react'
import axios from '../libs/axios'
import { useAuthStore } from '../store/auth'

const HomePage = () => {
    const [tasks, setTasks] = useState([])
    const [isEdit, setIsEdit] = useState({
        id: '',
        status: false
    })
    const token = useAuthStore(state => state.token)

    const getTasks = () => {
        axios.get('http://localhost:3000/tasks/' + token)
            .then((res:any) => {
                res != null ? setTasks(res.data) : ''
            })
            .catch(err => console.error(err))
    }
    
    useEffect(() => {
      getTasks()
    }, [])
    

    const addTask = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const titleInput = (e.currentTarget.elements[0] as HTMLInputElement)
        const descriptionInput = (e.currentTarget.elements[1] as HTMLInputElement)

        const title = titleInput.value
        const description = descriptionInput.value

        if(title.trim() === '' && description.trim() === '') return
        
        axios.post('http://localhost:3000/task', {
            title, 
            description,
            token
        })
        titleInput.value = ''
        descriptionInput.value = ''

        getTasks()
    }

    const deleteTask = (id:string) => {
        axios.delete(`http://localhost:3000/task/${id}`)
            .then(res => {
                getTasks()
            })
            .catch(err => console.error(err))
    }

    const editTask = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const titleInput = document.getElementById('title')
        const descriptionInput = document.getElementById('description')

        axios.put('http://localhost:3000/task/' + isEdit.id, {
            title: titleInput?.value,
            description: descriptionInput.value
        })
            .then(res => {
                getTasks()
                titleInput.value = '',
                descriptionInput.value = ''
                setIsEdit({
                    status: false,
                    id: ''
                })
            })
            .catch(err => console.error(err))
    }

    const displayEdit = (id:string) => {
        const findTask = (id:string) => {
            for(let task of tasks){
                if(task._id == id) return task
            }
        }
        const task:any = findTask(id)

        const titleInput = document.getElementById('title')
        const descriptionInput = document.getElementById('description')

        titleInput.value = task.title
        descriptionInput.value = task.description
        
        setIsEdit({
            status: true,
            id
        })
    }

    return(
        <div className="container">
            <div className="row mt-4">
                <div className="col-4">
                    <div className="card">
                        <div className="card-header"><h3 className="text-center">Tasks</h3></div>
                        <div className="card-body">
                            <form onSubmit={!isEdit.status ? addTask : editTask} id='form'>
                                <div className="input-group">
                                    <input type="text" name="title" id='title' placeholder="Title" autoFocus className="form-control" autoComplete='OFF' />
                                </div>
                                <div className="input-group mt-3">
                                    <textarea name="description" id='description'  placeholder='Description' className="form-control"></textarea>
                                </div>
                                <button type='submit' className='btn btn-success w-100 mt-3'>{!isEdit.status ? 'Add' : 'Edit'}</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-8">
                    <table className='table table-success'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task:any) => {
                                return (
                                    <tr>
                                        <td>{task.title}</td>
                                        <td>{task.description}</td>
                                        <td><i className="fa-solid fa-pen-to-square" onClick={() => displayEdit(task._id)}></i></td>
                                        <td><i className="fa-solid fa-trash-can" onClick={() => deleteTask(task._id)}></i></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HomePage