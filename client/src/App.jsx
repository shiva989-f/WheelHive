import { useState } from 'react'
import Signup from './pages/Signup'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import RefreshHandler from './RefreshHandler'


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route
            path='/'
            element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
          />
          <Route
            path='/all-cars'
            element={isAuthenticated ? <Home /> : <Navigate to='/login' />}
          />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin/secure/admin-dashboard/*' element={<AdminDashboard /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App
