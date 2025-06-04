import React from 'react'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import HomePage from './Pages/Home'
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './index.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/signin' element={<Signin></Signin>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>

        </Routes>
      </Router>
      
    </div>
  )
}

export default App
