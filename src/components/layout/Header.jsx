import React, { useEffect, useState } from 'react';
import '../../styles/topnav.css';
import Logo from './Logo';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Header() {
    const [className, setClassName] = useState('');
    const [signed, setSigned] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);
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
          const response = await axios.post('http://localhost:8080/user/logout','https://bkticketing-backend-production.up.railway.app/user/logout');
          if (response) {
            sessionStorage.removeItem('user');
            navigate('/login');
          }
        } catch (error) {
          console.error('Error logging out');
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenu(!mobileMenu);
    };

    return (
        <header className={mobileMenu ? 'show-mobile-menu' : ''}>
            <nav className="navbar">
                <div className="flex">
                    <a href="/" className="logo">
                        <Logo />
                    </a>
                    <ul className="menu-links">
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/theater" className={({ isActive }) => isActive ? 'menu-link active-link' : 'menu-link'}>Theater</NavLink></li>
                        <li><NavLink to="/sports" className={({ isActive }) => isActive ? 'menu-link active-link' : 'menu-link'}>Sports</NavLink></li>
                        <li><NavLink to="/other" className={({ isActive }) => isActive ? 'menu-link active-link' : 'menu-link'}>Other</NavLink></li>
                        <li><NavLink to="/deals" className={({ isActive }) => isActive ? 'menu-link active-link' : 'menu-link'}>Deals</NavLink></li>
                        <li><NavLink to="/myTickets" className={({ isActive }) => isActive ? 'menu-link active-link' : 'menu-link'}>MyTickets</NavLink></li>
                        <span id="close-menu-btn" className="material-symbols-outlined" onClick={toggleMobileMenu}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </ul>
                </div>
                <div className="flex rest">
                    <a className="register" href="/register">Register</a>
                    <a className={signed} href="/login"><i className="fa-regular fa-circle-user"></i><span>Sign In</span></a>
                    <button className={className} onClick={handleLogout}><i className="fa-regular fa-circle-user"></i><span>Logout</span></button>
                </div>
                <a className="hide-reg" href="/login"><i className="fa-regular fa-circle-user"></i></a>
                <i id="hamburger-btn" className="fa fa-solid fa-bars" onClick={toggleMobileMenu}></i>
            </nav>
        </header>
    );
}
