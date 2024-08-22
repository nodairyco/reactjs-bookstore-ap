import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage(props) {

  const { handleUserAuth, conflictBoolean, handleLoginpageNavigation, navigateToLogin
  } = props
  const [tempUsername, setTempUsername] = useState('')
  const [tempEmail, setTempEmail] = useState('')
  const [tempPass, setTempPass] = useState('')
  const [errbool, setErrbool] = useState(false)


  return (
    <div className='loginContainer'>
      <input
        placeholder='Username'
        onChange={(e) => { setTempUsername(e.target.value) }}
      />
      <input
        onChange={(e) => { setTempEmail(e.target.value) }}
        placeholder='Email' />

      <input className="input 2"
        onChange={(e) => { setTempPass(e.target.value) }}
        placeholder="Password" />

      {errbool && (
        <div>
          Cannot be empty
        </div>
      )}

      <button className="loginButton"
        onClick={() => {
          if (tempUsername.length === 0 || tempEmail.length === 0 || tempPass.length === 0) {
            setErrbool(true)
            return
          }
          handleUserAuth(tempUsername, tempEmail, tempPass)
          handleLoginpageNavigation()
        }}>
        Register
      </button>
      {conflictBoolean && (
        <div>
          User with this credentials already exists
        </div>
      )}
      <button className='redirectButton' onClick={() => {
        navigateToLogin(true)
      }}>
        Log In
      </button>
    </div>
  )
}
