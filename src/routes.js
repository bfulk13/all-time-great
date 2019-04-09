import React from 'react'
import Landing from './Components/Landing/Landing'
import Questions from './Components/Questions/Questions'
import Vote from './Components/Vote/Vote'
import Results from './Components/Result/Results'
import Profile from './Components/Profile/Profile'
import {Switch, Route} from 'react-router-dom'


export default(
  <Switch>
    <Route path='/Questions' component={Questions}/>
    <Route path='/Vote' component={Vote}/>    
    <Route path='/Profile' component={Profile}/>
    <Route path='/Results' component={Results}/>
    <Route excact path='/' component={Landing}/>
  </Switch>
)