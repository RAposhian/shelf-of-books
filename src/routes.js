import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import BookDisplay from './Components/BookDisplay/BookDisplay';
import Collection from './Components/Collection/Collection';
import BookView from './Components/BookView/BookView';
import AddBook from './Components/AddBook/AddBook';
import Profile from './Components/Profile/Profile';


export default (
      <Switch>
         <Route exact path='/' component={Landing}/>
         <Route path='/bookdisplay' component={BookDisplay}/>
         <Route path='/collection' component={Collection}/>
         <Route path='/book/:id' component={BookView}/>
         <Route path='/addbook' component={AddBook}/>
         <Route path='/profile' component={Profile}/>
      </Switch>
)