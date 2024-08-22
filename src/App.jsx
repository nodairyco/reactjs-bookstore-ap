import { useEffect, useState } from 'react'
import RegisterPage from './components/RegisterPage'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'

function App() {
  const [userAuth, setUserAuth] = useState({
    email: "", password: "", usrname: ""
  })

  const [jwtToken, setJwtToken] = useState('')
  const [conflictBoolean, setConflictBoolean] = useState(false)
  const navigate = useNavigate

  function persistData() {
    localStorage.setItem('userAuth', JSON.stringify({
      usrname: userAuth.usrname,
      email: userAuth.email,
      password: userAuth.password
    }))
  }

  function handleUserAuth(newUsrname, newEmail, newPassword) {
    setUserAuth({ usrname: newUsrname, email: newEmail, password: newPassword })
    persistData()
  }

  useEffect(() => {
    if (!userAuth.email || !userAuth.password || !userAuth.password
      || userAuth.email.length === 0 || userAuth.password.length === 0 ||
      userAuth.usrname.length === 0
    ) {
      return
    }

    fetch("http://localhost:8080/bookstore/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        user_name: userAuth.usrname,
        email: userAuth.email,
        password: userAuth.password,
        roles: ["USER"],
        purchasedBooks: [],
        money: 99
      })
    })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Conflict!")
        }
        return r.json()
      })
      .then((d) => {
        const jwtToken = d.token
        setJwtToken(jwtToken)
      })
      .catch((err) => {
        setConflictBoolean(true)
        return
      })
  }, [userAuth])


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterPage handleUserAuth={handleUserAuth}
            jwtToken={jwtToken} conflictBoolean={conflictBoolean}
          />} />
          <Route path='*' element={<div>Yoo</div>} />
          <Route path="/home" element={<Home jwtToken={jwtToken} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>

    </>
  )

}
export default App
