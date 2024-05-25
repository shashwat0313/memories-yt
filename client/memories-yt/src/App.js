import React, { useEffect, useState } from 'react'

//mui version 5 only
// import { Container, Typography, Grow, Grid } from '@mui/material'
// import { AppBar } fr om './styles'

import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core'
import memories from './images/memories.png'

import Posts from './components/Posts/Posts'
import Form from './components/Form/Form'

import useStyles from './styles'

import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from './actions/posts'
function App() {

  // const [text, setText] = useState("yess")
  // //for testing
  // useEffect(() => {
  //   fetch('/test').then((res) => {
  //     console.log(res);
  //     res.json().then((newres) => {
  //       console.log(newres);
  //       setTimeout(() => {
  //         setText(newres)
  //       }, 1000);
  //     })
  //   })
  // }, [])


  /* ******************************************************* */
  // DO NOT PERFORM THIS ACTION OUTSIDE OF "App" component
  const classes = useStyles()

  /* ******************************************************* */

  const [currentId, setCurrentId] = useState(null)

  const dispatch = useDispatch()

  const posts = useSelector((state) => {
    return state.posts
  })

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch, currentId])

  return (

    <div className="App">

      <Container maxWidth="lg">

        <Grow in>
          <Container>

            <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
              {
              /*  * xs means it will take full width(12/12) on extra small devices 
                  * sm means it will take (7/12) width on small devices
                  * there a total of 12 columns in the grid system, so 7/12 is a fraction of the total width of 12
              */}
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Grid>

            </Grid>


          </Container>
        </Grow>

      </Container>

    </div>
  );
}

export default App;
