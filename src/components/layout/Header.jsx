import React, { useEffect, useState } from 'react'
import '../../styles/topnav.css';
import Logo from './Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
    const [className, setClassName] = useState('');
    const [signed, setSigned] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const user = sessionStorage.getItem('user');
        if (user) {
            setClassName('block signin');
            setSigned('none signin');
        } else {
            setSigned('blcok signin');
            setClassName('none signin');
        }
    }, [navigate]);

    const handleLogout = async () => {
        try {
          const response = await axios.post('http://localhost:8080/user/logout');
          if (response) {
            sessionStorage.removeItem('user');
            navigate('/login')
          }
        } catch (error) {
          console.error('Error logging out');
        }
    };

  return (
    <div>
    <header>
        <nav className="navbar">
            <div className="flex">
                <a href="/" className="logo">
                    <Logo/>
                </a>
                <ul className="menu-links">
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><a href="/">Theater</a></li>
                    <li><a href="/">Sports</a></li>
                    <li><a href="/">Other</a></li>
                    <li><NavLink to="/Deals" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>Deals</NavLink></li>
                    <li><a href="/myTickets">MyTickets</a></li>
                    <span id="close-menu-btn" className="material-symbols-outlined"><i className="fa fa-times" aria-hidden="true"></i></span>
                </ul>
            </div>
            <div className="flex rest">
                <a className="register" href='/register'>Register</a>
                <a className={signed} href='/login'><i className="fa-regular fa-circle-user"></i><span>Sign In</span></a>
                <button className={className} onClick={handleLogout}><i className="fa-regular fa-circle-user"></i><span>Logout</span></button>
            </div>
            <i className="fa-regular fa-circle-user hidden"></i>
            <span id="hamburger-btn" className="material-symbols-outlined"><i className="fa fa-solid fa-bars"></i></span>
        </nav>
    </header>
    </div>
  )
}
