import React, { useState } from 'react';
import AdminHead from '../../components/layout/AdminHead'
import Logo from '../../components/layout/Logo'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import FooterRest from '../../components/layout/FooterRest'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/login.css';
import Chatbot from '../../components/chatbot/Chatbot';

export default function Login() {
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:8080/user/login', { userEmail, password });
          setMessage(response.data);
          if (response.data === 'Login successful') {
              sessionStorage.setItem('user', userEmail);
              navigate('/');
          }else{
              setMessage('Invalid Email or Password, Try again');
          }
      } catch (error) {
          setMessage('Error Login, Try again');
      }
  };

  return (
    <div>
    <AdminHead />

    <Header/>

    <div class="container-xxl">
      <div class="authentication-wrapper authentication-basic container-p-y">
        <div class="authentication-inner">
          <div class="card">
            <div class="card-body">
              <div class="app-brand justify-content-center">
                <a href="/" class="app-brand-link gap-2">
                  <span class="app-brand-text demo text-body fw-bolder">
                    <Logo/>
                  </span>
                </a>
              </div>
              <h4 class="mb-2 topgap">Welcome to BkTicketing 👋</h4>
              <small className='messege'>{ message && <div>{message}</div>}</small>
              <p class="mb-4">Please sign-in to your account and start the adventure</p>

              <form id="formAuthentication" class="mb-3" action="index.html" method="POST">
                <div class="mb-3">
                  <label for="email" class="form-label">Email or Username</label>
                  <input class="form-control" type="text" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                </div>
                <div class="mb-3 form-password-toggle">
                  <div class="d-flex justify-content-between">
                    <label class="form-label" for="password">Password</label>
                    <a href="auth-forgot-password-basic.html">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div class="input-group input-group-merge">
                    <input type="password" class="form-control" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="remember-me" />
                    <label class="form-check-label" for="remember-me"> Remember Me </label>
                  </div>
                </div>
                <div class="mb-3">
                  <button class="btn btn-primary d-grid w-100" type="submit" onClick={handleLogin}>Sign in</button>
                </div>
              </form>

              <p class="text-center">
                <span>New on our platform?</span>
                <a href="/register" className='mx-2'>
                  <span>Create an account</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Chatbot/>
    <Footer/>
    <FooterRest/>
    </div>
  )
}
