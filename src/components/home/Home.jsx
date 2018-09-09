import React, { Component } from 'react'
import axios from 'axios'
import './Home.css'
const baseUrl = 'http://localhost:13422/tarefas/webresources/todolist.usuario'
export default class Home extends Component {

    componentWillMount() {
        
        const usuario = JSON.parse(localStorage.getItem('usuario')) || { id: '', username: '', senha: '' }
        this.setState({ usuario, usuarioList: [] });
        

    }
    componentDidMount() {
        this.getUsuarios()
        const usuario = { ...this.state.usuario }
        if (usuario.username !== '')
            this.signIn()
    }
    updateField(event) {
        console.log('updating field')
        const usuario = { ...this.state.usuario }
        usuario[event.target.name] = event.target.value
        this.setState({ usuario })
    }

    signIn() {
        const usuarioLogin = this.state.usuario;
        this.state.usuarioList.map(usuario => {
            if(usuario.username === usuarioLogin.username & usuario.senha === usuarioLogin.senha)
                localStorage.setItem('usuario', JSON.stringify({... usuarioLogin, id:usuario.id}))
        })
        
        this.props.history.push('/tarefas')
    }
    getUsuarios() {
        axios(baseUrl).then(resp => {
            this.setState({ usuarioList: resp.data })
        })
    }


    signUp() {
        const usuario = this.state.usuario
        const method = 'post'
        const url = baseUrl
        axios[method](url, usuario)
            .then(resp => {
                this.signIn()
            })
    }

    render() {
        return (
            <div className="text-center home" >
                <div className="form-signin">
                    <img className="mb-4" src="../../assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label for="username" className="sr-only">Usuário</label>
                    <input type="text"
                        name="username"
                        value={this.state.usuario.username}
                        onChange={e => this.updateField(e)}
                        id="username" className="form-control" placeholder="Usuário" required autofocus />
                    <label for="inputPassword" className="sr-only">Senha</label>
                    <input type="password"
                        id="inputPassword"
                        className="form-control"
                        name="senha"
                        onChange={e => this.updateField(e)}
                        value={this.state.usuario.senha}
                        placeholder="Senha" required />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Manter conectado
                    </label>
                    </div>
                    <button
                        className="btn btn-lg btn-primary btn-block"
                        type="submit"
                        onClick={e => this.signIn()}>Sign in</button>
                    <button className="btn btn-lg btn-secondary btn-block"
                        onClick={e => this.signUp()}
                        type="submit">Sign up</button>
                </div>
            </div>
        )
    }

}
