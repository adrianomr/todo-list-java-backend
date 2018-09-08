import './Main.css'
import React from 'react'
import Header from './Header'
import Nav from './Nav'

export default props =>
    <React.Fragment>
        <Header {...props} />
        <div className="row">
            
            <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-4">
                <div class="">
                    {props.children}
                </div>
            </main>
        </div>
    </React.Fragment>