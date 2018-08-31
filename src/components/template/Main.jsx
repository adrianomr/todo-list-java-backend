import './Main.css'
import React from 'react'
import Header from './Header'
import Nav from './Nav'

export default props =>
    <React.Fragment>
        <Header {...props} />
        <div className="row">
            <Nav />
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div class="">
                    {props.children}
                </div>
            </main>
        </div>
    </React.Fragment>