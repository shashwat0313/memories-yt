import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { jwtDecode, verify } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from './constants/actionTypes'

// TODO: Fix problems with authData in reducers
// TODO: Add/modify implementation to have user fetched using useSelector to get better state management for user

function App() {

  // const [user, setUser] = useState(localStorage.getItem('profile'))

  const dispatch = useDispatch()

  const user = useSelector((state)=>{
    // console.log("appjs state.auth.authData:",state.auth.authData);
    return (state.auth.authData);
  })

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem('profile')))
    // console.log('user in appjs:', user ? user : "not found");
    const token = user ? user.token : null
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem('profile');
        dispatch({type:LOGOUT})
      }
    }
  }, []);

  return (

    <BrowserRouter>

      <Container maxWidth="xl">

        <Navbar />

        <Switch>

          <Route path="/" exact component={()=><Redirect to='/posts' />}></Route>
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route path="/auth" exact component={() => !user ? <Auth/> : <Redirect to="/posts" />}></Route>

        </Switch>

      </Container>
    </BrowserRouter>


  );
}

export default App;
