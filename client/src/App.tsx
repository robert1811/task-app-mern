import './App.css'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route,  } from 'react-router-dom'

import Navigation from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'

import {useAuthStore} from './store/auth'

function App() {
  const isAuth = useAuthStore(state => state.isAuth)
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute isAuth={isAuth} />}>
            <Route  path='/' element={<HomePage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
