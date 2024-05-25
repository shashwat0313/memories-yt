import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress } from '@material-ui/core'

export default function Posts({ setCurrentId }) {

    // these classes will be applied later
    const classes = useStyles()

    // const [isLoading, setLoading] = useState(false);

    // useselector gives access to the global store of states
    // the state object which appears as the param is the object
    const posts = useSelector((state) => {
        console.log("state: ", state);
        return state.posts.length === 0 ? null : state.posts.posts
    })

    console.log(posts, "xyz");

    // useEffect(()=>{
    //     if(posts){

    //         setLoading(false)
    //     }
    //     else{
    //         setLoading(true)
    //     }
    // }, [posts])

    // we'll use ternary operator here
    // if the posts array  is empty, i.e. not yet fetched then the loading anim will be shown
    // the moment the state is updated and we have >0 posts, the posts will be displayed

    // if (!isLoading)
        return (!posts?.length ? <CircularProgress /> :
            <>
                <Grid className={classes.mainContainer} container alignItems="stretch" spacing="3">
                    {
                        //this snippet is a bit elongated, it can be shortened but shortening will be done later
                        posts.map((post) => {
                            return (
                                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3} >
                                    <Post post={post} setCurrentId={setCurrentId}></Post>
                                </Grid>
                            )
                        }

                        )
                    }
                </Grid>
            </>)

    // else return (<>Loading</>)

}
