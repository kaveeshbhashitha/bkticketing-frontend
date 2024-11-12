import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/web/Home";
import Dashboard from "./pages/admin/Dashboard";
import AdminHome from "./pages/admin/AdminHome";
import Login from "./pages/oauth/Login";
import Register from "./pages/oauth/Register";
import AdminPayment from "./pages/admin/AdminPayment";
import Payment from "./pages/payment/Payment";
import AddEvent from "./pages/admin/AddEvent";
import SeeEvents from "./pages/admin/SeeEvents";
import SelectTicket from "./pages/web/SelectTicket";
import MyTickets from "./pages/web/MyTickets";
import AdminLogin from "./pages/admin/AdminLogin";
import Deals from "./pages/web/Deals";
import Other from "./pages/web/Other";
import OtherEventAdd from "./components/other/OtherEventAdd";
import TheaterAndMovieEventAdd from "./components/other/TheaterAndMovie";

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/adminHome" element={<AdminHome/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
            <Route exact path="/adminPayment" element={<AdminPayment/>}/>
            <Route exact path="/payment/:reservationId" element={<Payment/>}/>
            <Route exact path="/addEvent" element={<AddEvent/>}/>
            <Route exact path="/seeEvent" element={<SeeEvents/>}/>
            <Route exact path="/selectTicket/:eventId" element={<SelectTicket/>}/>
            <Route exact path="/myTickets" element={<MyTickets/>}/>
            <Route exact path="/adminLogin" element={<AdminLogin/>}/>
            <Route exact path="/Deals" element={<Deals/>}/>
            <Route exact path="/Other" element={<Other/>}/>
            <Route exact path="/OtherEvent" element={<OtherEventAdd/>}/>
            <Route exact path="/Theater" element={<TheaterAndMovieEventAdd/>}/>
          </Routes> 
      </Router>
    </div>
  );
}

export default App;
