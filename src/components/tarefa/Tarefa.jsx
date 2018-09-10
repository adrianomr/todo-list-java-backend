import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'
import Modal from 'react-modal';


const headerProps = {
    icon: 'tarefas',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}
const tarefaUrl = 'http://localhost:13422/tarefas/webresources/todolist.tarefa'
const usuarioUrl = 'http://localhost:13422/tarefas/webresources/todolist.usuario'
const tarefaTempoUrl = 'http://localhost:13422/tarefas/webresources/todolist.tarefatempo'
const tarefaInicial = { id: null, nome: '', tempoestimado: 0, temporealizado: 0, descricao: '', usuarioId: {} }
const initialState = {
    tarefa: tarefaInicial,
    list: [],
    usuarioList: [],
    usuarioLogado: {},
    modalIsOpen: false,
    errorMessage: "",
    errorMessageConclusao: "",
    modalTempoIsOpen: false
}
Modal.setAppElement('#root')
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
export default class tarefaCrud extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        console.log('ok')

        this.setState(initialState)

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalTempo = this.openModalTempo.bind(this);
        this.closeModalTempo = this.closeModalTempo.bind(this);
        this.updateField = this.updateField.bind(this);
    }
    componentDidMount() {
        this.getUsuarios()
        this.getUsuarioLogado()
        this.search()
    }

    openModal(tarefa) {
        this.setState({ modalIsOpen: true, tarefa });
    }

    openModalTempo(tarefa) {
        debugger
        axios(tarefaTempoUrl).then(resp => {
            const listTarefaTempo = resp.data
            var tarefaTempoId = ""
            var tarefaTempoEditar = {}
            listTarefaTempo.map(tarefaTempo =>{
                if(tarefaTempo.tarefaId.id === tarefa.id){
                    const dataFinal = tarefaTempo.datafinal || ""
                    if(dataFinal === ""){
                        tarefaTempoId = tarefaTempo.id
                        tarefaTempoEditar = tarefaTempo
                    }
                }
            })
            if(tarefaTempoId === ""){
                debugger
                axios['post'](tarefaTempoUrl, {datainicial:new Date(), tarefaId:tarefa})
            }else{
                debugger
                axios['put'](tarefaTempoUrl+`/${tarefaTempoId}`, {...tarefaTempoEditar, datafinal:new Date()})
            }
        })
        this.setState({ modalTempoIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    closeModalTempo() {
        this.setState({ modalTempoIsOpen: false });
    }


    getUsuarioLogado() {
        const usuario = JSON.parse(localStorage.getItem('usuario')) || { id: '', username: '', senha: '' }
        const tarefa = { ...this.state.tarefa, usuarioId: usuario }
        this.setState({ usuarioLogado: usuario, tarefa })
    }

    getUsuarios() {
        axios(usuarioUrl).then(resp => {
            this.setState({ usuarioList: resp.data })
        })
    }

    clear() {
        this.setState({ tarefa: { ...tarefaInicial, usuarioId: this.state.usuarioLogado } })
    }

    updateField(event) {

        const tarefa = { ...this.state.tarefa }
        if (event.target.type === "number") {
            tarefa[event.target.name] = parseFloat(event.target.value)
        } else {
            tarefa[event.target.name] = event.target.value
        }

        this.setState({ tarefa })
    }
    updateUsuario(event) {
        const tarefa = { ...this.state.tarefa }
        tarefa.usuarioId = { id: event.target.value }
        this.setState({ tarefa })
    }
    valida() {
        if (this.state.tarefa.nome === '') {
            this.setState({ errorMessage: "Campo 'Tarefa' deve ser preenchido" })
            return false
        }
        if (this.state.tarefa.tempoestimado === '' | this.state.tarefa.tempoestimado <= 0) {
            this.setState({ errorMessage: "Campo 'Tempo estimado' deve ser preenchido" })
            return false
        }
        this.setState({ errorMessage: "" })
        return true
    }
    editTarefa() {

        if (this.valida()) {
            axios['put'](tarefaUrl + `/${this.state.tarefa.id}`, this.state.tarefa)
                .then(resp => {
                    this.search()
                    this.clear()
                    this.closeModal()
                })
        }
    }

    carregaEdicao(id) {
        axios(tarefaUrl + `/${id}`).then(resp => {

            this.setState({ tarefa: resp.data })
        })
    }

    confirmar() {
        if (this.valida()) {
            const tarefa = { ...this.state.tarefa }
            const method = ((tarefa.id === null) ? 'post' : 'put')
            const url = tarefaUrl+((tarefa.id === null) ? '' : `/${tarefa.id}`)
            axios[method](url, tarefa)
                .then(resp => {
                    this.search()
                })
            this.clear()
        }
    }

    search() {
        axios(tarefaUrl).then(resp => {

            this.setState({ list: resp.data })
        })
    }
    renderUserList() {
        const usuarioList = this.state.usuarioList
        return usuarioList.map(usuario => {

            return (
                <option value={usuario.id}>{usuario.username}</option>
            )


        })
    }
    validaConclusaoTarefa() {
        const tempoRealizado = this.state.tarefa.temporealizado || 0
        if (tempoRealizado > 0) {
            this.editTarefa()
            this.setState({ errorMessageConclusao: "" })
        } else {
            this.setState({ errorMessageConclusao: "Preencha o campo 'Tempo gasto'" })
        }
    }
    errorMessage() {
        if (this.state.errorMessage !== "") {
            return (
                <div className="my-2 col-mx-auto alert alert-danger">
                    <strong>{this.state.errorMessage}</strong>
                </div>)
        }
        return ""
    }

    errorConclusaoMessage() {
        if (this.state.errorMessageConclusao !== "") {
            return (
                <div className="my-2 col-mx-auto alert alert-danger">
                    <strong>{this.state.errorMessageConclusao}</strong>
                </div>)
        }
        return ""
    }

    renderForm() {
        const tarefa = this.state.tarefa
        const id = ((tarefa.id === null) ? '' : ` - ${tarefa.id}`)
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tarefa{id}</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.tarefa.nome}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <label>Usuário</label>
                        <select className="form-control"
                            name="usuario_id"
                            value={this.state.tarefa.usuarioId.id}
                            onChange={e => this.updateUsuario(e)}>
                            {this.renderUserList()}
                        </select>
                    </div>
                    <div className="col-12 col-md-2">
                        <div className="form-group">
                            <label>Tempo estimado (h)</label>
                            <input type="number" className="form-control"
                                name="tempoestimado"
                                value={this.state.tarefa.tempoestimado}
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
                {this.errorMessage()}
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={() => this.confirmar()}
                        >
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                        // onClick={this.updateField}
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
    delete(id) {

        axios['delete'](tarefaUrl + `/${id}`).then(resp => {
            this.search()
        })
    }

    abrirFinalizaTarefa(id) {
        this.setState({ modalFinalizaTarefa: true })
    }

    modalFinalizaTarefa() {
        const tempoRealizado = this.state.tarefa.temporealizado || 0
        const percentualDesvio = ((this.state.tarefa.tempoestimado - tempoRealizado) / this.state.tarefa.tempoestimado) * 100;
        return (<Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <h2>Finalizar tarefa</h2>
            <div className="row">
                <div className="col-12 col-md-12">
                    <div className="form-group">
                        <label>Digite o tempo gasto para realizar a tarefa</label>
                        <input type="number" className="form-control"
                            name="temporealizado"
                            value={this.state.tarefa.temporealizado}
                            onChange={e => this.updateField(e)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-12">
                    <div className="form-group">
                        <label>Percentual de Desvio</label>
                        <br />
                        <strong>{percentualDesvio} %</strong>
                    </div>
                </div>
            </div>
            {this.errorConclusaoMessage()}
            <div className="row">
                <div className="col-12 col-md-12 d-flex justify-content-end">
                    <button className="btn btn-secondary"
                        onClick={this.closeModal}
                    >
                        Cancelar
                        </button>
                    <button className="btn btn-primary ml-2"
                        onClick={e => this.validaConclusaoTarefa()}
                    >
                        Confirmar
                        </button>


                </div>
            </div>
        </Modal>)
    }

    modalTempoTarefa() {
        debugger
        return (<Modal
            isOpen={this.state.modalTempoIsOpen}
            onRequestClose={this.closeModalTempo}
            style={customStyles}
            contentLabel="Example Modal"
        >

            <h2>Tarefa iniciada</h2>
            
            <div className="row">
                <div className="col-12 col-md-12 d-flex justify-content-end">
                    <button className="btn btn-primary ml-2"
                        onClick={() => this.closeModalTempo()}
                    >
                        <i className="fa fa-check"></i>
                        </button>


                </div>
            </div>
            
        </Modal>)
    }

    renderRows() {
        const usuarioLogado = this.state.usuarioLogado
        return this.state.list.map(tarefa => {
            const usuario = tarefa.usuarioId || {}
            if (usuario.id === usuarioLogado.id & (tarefa.temporealizado === 0 | !tarefa.temporealizado)) {
                return (
                    <tr key={tarefa.id}>
                        <td>{tarefa.id}</td>
                        <td>{tarefa.nome}</td>
                        <td>{tarefa.tempoestimado}</td>
                        <td>{tarefa.descricao}</td>
                        <td>

                            <button className="btn btn-success"
                                onClick={() => this.openModal(tarefa)}
                            >
                                <i className="fa fa-check"></i>
                            </button>
                            <button className="btn btn-primary ml-2"
                                onClick={() => this.openModalTempo(tarefa)}
                            >
                                <i className="fa fa-clock-o"></i>
                            </button>

                            <button className="btn btn-warning ml-2"
                                onClick={() => this.carregaEdicao(tarefa.id)}
                            >
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2"
                                onClick={() => this.delete(tarefa.id)}
                            >
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                )
            } else {
                return ''
            }
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
                {this.modalFinalizaTarefa()}
                {this.modalTempoTarefa()}
            </Main>
        )
    }
}