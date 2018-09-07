import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <Link class="nav-link active" to="/">
                            <i className="fa fa-home"></i> Início
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/users">
                            <i className="fa fa-users"></i> Usuários
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    