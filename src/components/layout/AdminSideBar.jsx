import React from 'react'
import AdminHead from './AdminHead'
import Logo from './Logo'
import { NavLink } from 'react-router-dom'

export default function AdminSideBar() {
  return (
    <div>
        <AdminHead/>
        <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme" style={{height: "100%"}}>
          <div class="app-brand demo">
            <NavLink to="/" class="app-brand-link">
              <span class="app-brand-logo demo">
              </span>
              <Logo />
            </NavLink>

            <a href="/" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
              <i class="bx bx-chevron-left bx-sm align-middle"></i>
            </a>
          </div>

          <div class="menu-inner-shadow"></div>

          <ul class="menu-inner py-1">
            <li class="menu-item">
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                <i class="menu-icon tf-icons bx bx-detail"></i>
                <div data-i18n="Analytics">Dashboard</div>
              </NavLink>
            </li>

            <li class="menu-item">
              <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                <i class="menu-icon tf-icons bx bx-home"></i>
                <div data-i18n="Analytics">Home Page</div>
              </NavLink>
            </li>

            <li class="menu-item">
              <NavLink to="/adminHome" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                <i class="menu-icon tf-icons bx bx-user"></i>
                <div data-i18n="Analytics">Administration</div>
              </NavLink>
            </li>

            <li class="menu-header small text-uppercase">
              <span class="menu-header-text">Pages</span>
            </li>
            <li class="menu-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-male gap-space"></i><i class="menu-icon tf-icons bx bx-female"></i>
                    <div data-i18n="Analytics">Customers</div>
                </NavLink>
            </li>
            <li class="menu-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-bell"></i>
                    <div data-i18n="Analytics">Notifications</div>
                </NavLink>
            </li>
            <li class="menu-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-calendar"></i>
                    <div data-i18n="Analytics">Schedules</div>
                </NavLink>
            </li>
            <li class="menu-header small text-uppercase"><span class="menu-header-text">Services</span></li>
            <li class="menu-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-collection"></i>
                    <div data-i18n="Analytics">Activities</div>
                </NavLink>
            </li>
            <li class="menu-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-box"></i>
                    <div data-i18n="Analytics">Sport and Match</div>
                </NavLink>
            </li>
            <li class="menu-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-copy"></i>
                    <div data-i18n="Analytics">Theater</div>
                </NavLink>
            </li>

            <li class="menu-item">
                <NavLink to="/addEvent" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-crown"></i>
                    <div data-i18n="Analytics">Events and Occations</div>
                </NavLink>
            </li>

            <li class="menu-item">
                <NavLink to="/seeEvent" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-crown"></i>
                    <div data-i18n="Analytics">All Events</div>
                </NavLink>
            </li>

            <li class="menu-header small text-uppercase"><span class="menu-header-text">Actions</span></li>
            <li class="menu-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-detail"></i>
                    <div data-i18n="Analytics">Reservations</div>
                </NavLink>
            </li>
            <li class="menu-item">
                <NavLink to="/" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-file"></i>
                    <div data-i18n="Analytics">Cancellation</div>
                </NavLink>
            </li>
            <li class="menu-item">
                <NavLink to="/adminPayment" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
                    <i class="menu-icon tf-icons bx bx-table"></i>
                    <div data-i18n="Analytics">Payments</div>
                </NavLink>
            </li>
            <li class="menu-header small text-uppercase"><span class="menu-header-text">Misc</span></li>
            <li class="menu-item">
              <a
                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                class="menu-link"
              >
                <i class="menu-icon tf-icons bx bx-support"></i>
                <div data-i18n="Support">Support</div>
              </a>
            </li>
            <li class="menu-item">
              <a
                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                class="menu-link"
              >
                <i class="menu-icon tf-icons bx bx-file"></i>
                <div data-i18n="Documentation">Documentation</div>
              </a>
            </li>
          </ul>
        </aside>
    </div>
  )
}
