import React from 'react'
import Landing from './Components/Landing/Landing'
import Questions from './Components/Questions/Questions'
import Vote from './Components/Vote/Vote'
import Result from './Components/Result/Result'
import Profile from './Components/Profile/Profile'
import {Switch, Route} from 'react-router-dom'


export default(
  <Switch>
    <Route path='/Question' component={Questions}/>
    <Route path='/Vote' component={Vote}/>    
    <Route path='/Profile' component={Profile}/>
    <Route path='/Result' component={Result}/>
    <Route excact path='/' component={Landing}/>
  </Switch>
)