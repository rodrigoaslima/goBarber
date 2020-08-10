import React from 'react'
import { Switch } from 'react-router-dom'

import Route from './Routes'

import SingIn from '../pages/SingIn/index'
import SignUp from '../pages/SingUp/index'
import DeshboardContainer from '../pages/Dashboard/index'

const Routes: React.FC = () => (
    <Switch>
        <Route path="/"  exact component = {SingIn} />
        <Route path="/SignUp" component = {SignUp} />

        <Route path="/Dashboard" component = {DeshboardContainer} isPrivate/>
    </Switch>
)

export default Routes