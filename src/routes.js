import React from 'react'
import Landing from './Components/Landing/Landing'
import Questions from './Components/Questions/Questions'
import Vote from './Components/Vote/Vote'
import Result from './Components/Result/Result'
import Profile from './Components/Profile/Profile'
import Profiles from './Components/Profiles/Profiles'
import Search from './Components/Search/Search'
import {Switch, Route} from 'react-router-dom'


export default(
  <Switch>
    <Route path='/Question/:id' component={Vote} />
    <Route path='/Questions' component={Questions}/>
    <Route path='/Search' component={Search}/>
    <Route path='/Vote/:id' component={Vote}/> 
    <Route path='/profiles' component={Profiles}/>
    <Route path='/profile/:uid' component={Profile}/>
    <Route path='/viewprofile/:owner_id' component={Profile}/> 
    <Route path='/Result' component={Result}/>
    <Route excact path='/' component={Landing}/>
  </Switch>
)