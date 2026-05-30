import React,{useEffect} from "react";
import SignIn from "./componets/SignIn.jsx";
import Login from "./componets/Login.jsx";
import AuthLayout from "./componets/AuthLayout.jsx";
import TicketDetails from "./pages/TicketDetails.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import {getCurrentUser} from "./store/Slice/authSlice.js"
import { useDispatch } from "react-redux";
import Navbar from "./componets/Header/Navbar.jsx"
import Layout from "./Layout.jsx"
import AIHeroSection from "./componets/AIHeroSection.jsx"
import AdminPage from "./pages/AdminPage.jsx";
import ListSolvedTickets from "./componets/ListSolvedTickets.jsx";

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCurrentUser());
  },[dispatch])
  return (
    <Routes>
      <Route
      path="/"
      element={<Layout/>}
      >
        <Route
        path=""
        element={
          <AuthLayout authentication={false}>
            <AIHeroSection />
          </AuthLayout>
        }
      />
        <Route
        path="/login"
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
       <Route
        path="/signin"
        element={
          <AuthLayout authentication={false}>
            <SignIn />
          </AuthLayout>
        }
      />
      <Route
        path="/home"
        element={
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        }
      />
      <Route
        path="/tickets/:id"
        element={
          <AuthLayout authentication={true}>
            <TicketDetails />
          </AuthLayout>
        }
      />
      <Route
        path="/tickets/ticketSolved/:id"
        element={
          <AuthLayout authentication={true}>
            <Home />
          </AuthLayout>
        }
      />
      <Route
        path="/tickets/listSolvedTickets"
        element={
          <AuthLayout authentication={true}>
            <ListSolvedTickets />
          </AuthLayout>
        }
      />
      <Route
      path="/admin"
      element = {
        <AuthLayout authentication={true}>
          <AdminPage/>
        </AuthLayout>
      }
      >
      </Route>
      </Route>
     
    </Routes>
  );
}

export default App;
