import {Link, useNavigate} from 'react-router-dom'
import {useAuthStore} from '../store/auth'

const Navigation = () => {
    const isAuth = useAuthStore.getState().isAuth
    const logout = useAuthStore(state => state.logout)

    const logOut = (e:any) => {
        e.preventDefault()
        logout()
        useNavigate('/login')
    }

    return(
        <div>
            <nav className='navbar'>
                {!isAuth ? 
                <ul className='nav'>
                    <li className='nav-item'><Link to="/login" className='nav-link text-white'>Login</Link></li>
                    <li className='nav-item'><Link to="/register" className='nav-link text-white'>Register</Link></li>
                </ul> :
                <ul className='nav'>
                    <li className='nav-item'><Link to="/" className='nav-link text-white'>Home</Link></li> 
                    <li className="nav-item"><a href='' className='nav-link text-white' onClick={logOut}>Log out</a></li>
                </ul>
                }
            </nav>
        </div>
    )
}

export default Navigation