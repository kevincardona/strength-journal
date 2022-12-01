import React, { useEffect, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const [health, setHealth] = useState<string>("no health update")
  const [response, setResponse] = useState<any>("hey")

  useEffect(()=>{
    const loginBody = { email: "kevincardona@gmail.com", password: "password" }    
    
    fetch(`/auth-test`, {credentials: 'include'})
      .then(response => response.json())
      .then(data => setHealth(JSON.stringify(data)));

    fetch(`/auth/login`, {
      credentials: 'include',
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginBody)
    }).then(response => response.json())
      .then(data => setResponse(data));


  }, [])

  return (
    <div>
      Login Page
      <br/>
      Email
      <input type="email" />
      Password
      <input type="password" />
      <br/>
      <input type="submit" />
      {health}
      <br/>
      {JSON.stringify(response)}
      <br/>
      {process.env.REACT_APP_API_URL}
    </div>
  )
}