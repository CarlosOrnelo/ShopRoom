import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Bottom from '../components/bottom';
import { login, register } from '../services/loginService';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    return (
        <React.Fragment>
        <Navbar />
        <Banner />

        <div className='login-container'>
            <div className='login-form'>
                <p>Login</p>
                <input type='text' className='user-user' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <input type='text' className='user-password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <input type='button' disabled={!username || !password} className='button-login' value='Sign Up' onClick={() => login(username, password)}/>
            </div>
            <div className='register-form'>
                <p>Register</p>
                <input type='text' className='user-register' placeholder='Username' onChange={e => setUsername(e.target.value)}/>
                <input type='text' className='email-register' placeholder='Email' onChange={e => setEmail(e.target.value)}/>
                <input type='text' className='password-register' placeholder='Password' onChange={e => setPassword(e.target.value)}/>
                <input type='button' disabled={!username || !password || !email} className='button-register' value='Register' onClick={() => register(username, email, password)}/>
            </div>
        </div>
        <Bottom />
      </React.Fragment>
    )

}