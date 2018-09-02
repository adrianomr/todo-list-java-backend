import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

// import Logo from '../components/template/Logo'
import Routes from './Routes'
// import Footer from '../components/template/Footer'

export default props =>
    <BrowserRouter location="/" context={this.staticContext}>
        <div className="app">
            {/* <Logo /> */}
            <Routes />
            {/* <Footer /> */}
        </div>
    </BrowserRouter>