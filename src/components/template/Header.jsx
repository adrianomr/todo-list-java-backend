import './Header.css'
import React from 'react'

export default props =>
<nav class="navbar fixed-top flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
    <input class="form-control w-100" type="text" placeholder="Search" aria-label="Search"/>
    <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
        <a class="nav-link" href="#">Sign out</a>
    </li>
    </ul>
</nav>