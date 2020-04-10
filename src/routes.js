import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import BookDisplay from './Components/BookDisplay/BookDisplay';
import Collection from './Components/Collection/Collection';

export default (
   <Switch>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/bookdisplay' component={BookDisplay}/>
      <Route exact path='/collection' component={Collection}/>
   </Switch>
)