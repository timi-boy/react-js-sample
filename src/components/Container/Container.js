import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import { Home, Select, Game, Authorization, Registration, Result, Continue } from '../';

class Container extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/select' component={Select}/>
          <Route path='/game' component={Game}/>
          <Route path='/result' component={Result}/>
          <Route path='/authorization' component={Authorization}/>
          <Route path='/registration' component={Registration}/>
          <Route path='/continue' component={Continue}/>
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default Container;