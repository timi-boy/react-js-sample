import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import { Home, Select, Contacts, NotFound, Authorization, Registracion } from '../';

class Container extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/select' component={Select}/>
          {/*<Route path='/header' component={Header}/>*/}
          <Route path='/contacts' component={Contacts}/>
          <Route path='/authorization' component={Authorization}/>
          <Route path='/registracion' component={Registracion}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}

export default Container;