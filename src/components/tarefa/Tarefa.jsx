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
    tarefa: { nome: '', tempoEstimado: '', descricao:'' },
    list: [{id:1, nome: 'Tarefa Inicial', tempoEstimado: '10', descricao:'Tarefa inicial' }]
}

export default class tarefaCrud extends Component {

    state = { ...initialState }

    componentWillMount(){
        console.log('ok')
        this.setState(initialState)
    }

    updateField(event) {
        console.log('updating field')
        const tarefa = { ...this.state.tarefa }
        tarefa[event.target.name] = event.target.value
        this.setState({ tarefa })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-10">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.tarefa.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Tempo estimado</label>
                            <input type="number" className="form-control"
                                name="tempoEstimado"
                                value={this.state.tarefa.tempoEstimado}
                                onChange={this.updateField}
                                placeholder="Digite o tempo..." />
                        </div>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={this.updateField}
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