import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

import Logo from '../../components/layout/Logo'
import AdminHead from '../../components/layout/AdminHead'
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FooterRest from '../../components/layout/FooterRest';

export default function Register() {
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [message, setMessage] = useState('');
    let navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:8080/user/register', { firstName, lastName, userEmail, password });
          if (response.data === "User already registered as a user") {
              setMessage({text: response.data, class: 'alert alert-danger'});
          }else{
              navigate('/login');
          }
      } catch (error) {
          setMessage({ text: 'Error occuerd, registration faild', class: 'alert alert-danger' });
      }
  };
  return (
    <div>
        <AdminHead/>
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
              <h4 class="mb-2 text-center">Adventure starts here 🚀</h4>
              <p class="mb-4 text-center">Make your app management easy and fun!</p>
              <small>{ message && <h6 class={ message.class }>{message.text}</h6>}</small>
              <form id="formAuthentication" class="mb-3" action="index.html" method="POST">
                <div class="mb-3">
                  <label for="username" class="form-label">First Name</label>
                  <input type="text" class="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name"/>
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">Last Name</label>
                  <input type="text"  class="form-control"  value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Enter your email" />
                </div>
                <div class="mb-3 form-password-toggle">
                  <label class="form-label" for="password">Password</label>
                  <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password'/>
                </div>

                <div class="mb-2">
                </div>
                <button class="btn btn-primary d-grid w-100" onClick={handleRegister}>Sign up</button>
              </form>

              <p class="text-center">
                <span>Already have an account?</span>
                <a href="/login" className='mx-2'>
                  <span>Sign in instead</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    <FooterRest/>
    </div>
  )
}
