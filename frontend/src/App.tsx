import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Dashboard from './Components/Dashboard/Dashboard'
import DocumentDetail from './Components/DocumentDetail/DocumentDetail'

function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/document/:filename" element={<DocumentDetail />} />
      </Routes>
    </div>
  )
}

export default App
