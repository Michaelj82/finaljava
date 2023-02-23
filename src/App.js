import React from "react";
import { Container } from "react-bootstrap";
import Signup from "./Signup";
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from "./contexts/AuthContext";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from "./Dashboard";
import Login from "./Login";
import Privateroute from "./Privateroute";
import Forgotpassword from './Forgotpassword'
import Updateprofile from "./Updateprofile";
function App() {


  return(



    <Container className="d-flex align-items-center justify-content-center"
    style={{minHeight: '100vh'}}>
      <div className="w-100" style={{maxWidth:'400px'}}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/signup' element={<Signup></Signup>}></Route>
            <Route exact path="/" element={<Privateroute element={<Dashboard></Dashboard>}></Privateroute>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path="/forgot-password" element={<Forgotpassword></Forgotpassword>}></Route>
            <Route exact path="/update-profile" element={<Privateroute element={<Updateprofile></Updateprofile>}></Privateroute>}></Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>

      </div>


    </Container>
  )
}

export default App;
