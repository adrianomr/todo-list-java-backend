import './Header.css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {

    signOut = () => {
        localStorage.setItem('usuario', JSON.stringify({ id: '', username: '', senha: '' }))
    }
    render() {
        return (<nav class="navbar fixed-top flex-md-nowrap p-0 shadow">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0">Company name</a>
            <input class="form-control w-100" type="text" placeholder="Search" aria-label="Search" />
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <Link class="nav-link" onClick={this.signOut()} to="/">
                        <i>Sign out</i>
                    </Link>
                </li>
            </ul>
        </nav>)
    }
}