import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from './components/home/Home'
import Tarefa from './components/tarefa/Tarefa'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/tarefas' component={Tarefa} />
    </Switch>