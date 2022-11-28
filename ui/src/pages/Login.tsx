import React, { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [health, setHealth] = useState<string>("no health update")
  const [response, setResponse] = useState<any>("Unauthorized")

  const submitLogin = () => {
    const loginBody = { 
      email: email,
      password: password
    }

    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      credentials: 'same-origin',
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginBody)
    })
    .then(response => response.json())
    .then(data => setResponse(data));
  }

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/auth-test`, {credentials: 'same-origin'})
      .then(response => response.json())
      .then(data => setHealth(JSON.stringify(data)));
  }, [])

  return (
    <div>
      Login
      <br/>
      Email
      <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
      <br/>
      Password
      <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
      <br/>
      <input type="submit" onClick={submitLogin} />
      {health}
      <br/>
      <br/>
      <br/>
      {JSON.stringify(response)}
      <br/>
      {process.env.REACT_APP_API_URL}
    </div>
  )
}