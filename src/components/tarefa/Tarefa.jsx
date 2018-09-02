import React, { Component } from 'react'
// import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'tarefas',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:3001/tarefas'
const initialState = {
    tarefa: { nome: '', tempoEstimado: '', descricao: '', usuario: '' },
    list: [{ id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' },
    { id: 1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao: 'Tarefa inicial' }],
    usuarioList: [{ id: 1, nome: "Adriano" }, { id: 2, nome: "João" }]
}

export default class tarefaCrud extends Component {


    componentWillMount() {
        console.log('ok')
        this.setState(initialState)
    }

    updateField(event) {
        console.log('updating field')
        const tarefa = { ...this.state.tarefa }
        tarefa[event.target.name] = event.target.value
        this.setState({ tarefa })
    }

    addTarefa() {
        console.log('updating field')
        const tarefa = { ...this.state.tarefa }
        const list = this.state.list;


        list.push(tarefa)
        this.setState({ list: list })
        this.setState({ tarefa: { nome: '', tempoEstimado: '', descricao: '' } })

    }
    renderUserList() {
        const usuarioList = this.state.usuarioList
        debugger;
        return usuarioList.map(usuario => {
            return (
                <option value={usuario.id}>{usuario.nome}</option>
            )
        })
    }
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tarefa</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.tarefa.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <label for="exampleSelect1">Usuário</label>
                        <select class="form-control"
                                name="usuario"
                                value={this.state.tarefa.usuario}
                                onChange={e => this.updateField(e)}>
                            {this.renderUserList()}
                        </select>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Tempo estimado (h)</label>
                            <input type="number" className="form-control"
                                name="tempoEstimado"
                                value={this.state.tarefa.tempoEstimado}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o tempo..." />
                        </div>
                    </div>
                </div>
                <div className="row">
                    
                </div>
                <div className="row">
                    <div className="col-12 col-md-10">
                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea type="text" className="form-control"
                                name="descricao"
                                value={this.state.tarefa.descricao}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o descrição..." />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.addTarefa()}
                        >
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={this.updateField}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Tempo Estimado</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(tarefa => {
            return (
                <tr key={tarefa.id}>
                    <td>{tarefa.id}</td>
                    <td>{tarefa.nome}</td>
                    <td>{tarefa.tempoEstimado}</td>
                    <td>{tarefa.descricao}</td>
                    <td>
                        <button className="btn btn-warning"
                        // onClick={}
                        >
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                        // onClick={}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}