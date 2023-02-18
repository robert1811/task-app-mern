import axios from '../libs/axios'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/auth'

interface Props {
    action: string,
    title: string
}


const Form = ({ action, title }: Props) => {

    const navigate = useNavigate()
    const setToken = useAuthStore(state => state.setToken)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value

        await axios.post('http://localhost:3000' + action, {
            email, password
        })
            .then(res => {
                if(!res.data.success) return alert(res.data.msg)
                
                if(action === '/login'){
                    const token = res.data.token
                    setToken(token)
                }

                navigate(action === '/register' ? '/login' : '/')
            })
            .catch(err => console.error(err))
    }

    return (
        <div className="container">
            <div className="card mx-auto mt-4 w-25">
                <div className="card-header"><h2>{title}</h2></div>
                <div className="card-body">
                    <form action={action} method="POST" onSubmit={submitHandler}>
                        <div className="input-group">
                            <input type='email' name="email" placeholder="username@email.com" className="form-control" />
                        </div>
                        <div className="input-group mt-3">
                            <input type="password" placeholder="password" name="password" className="form-control" />
                        </div>
                        <button className="btn btn-primary w-100 mt-3">Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form