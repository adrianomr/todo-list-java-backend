import React from 'react'
import './Home.css'

export default props =>

        <div className="text-center home">
            <form className="form-signin">
                <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label for="inputEmail" className="sr-only">Usuário</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Usuário" required autofocus />
                <label for="inputPassword" className="sr-only">Senha</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Senha" required />
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Manter conectado
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                <button className="btn btn-lg btn-secondary btn-block" type="submit">Sign up</button>
            </form>
        </div>
    