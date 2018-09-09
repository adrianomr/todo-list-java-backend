import './Header.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {

    signOut = () => {
        localStorage.setItem('usuario', JSON.stringify({ id: '', username: '', senha: '' }))
    }
    render() {
        return (<nav className="navbar fixed-top flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0">Lista de Tarefas</a>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <Link className="nav-link" onClick={this.signOut} to="/">
                        <i>Sign out</i>
                    </Link>
                </li>
            </ul>
        </nav>)
    }
}