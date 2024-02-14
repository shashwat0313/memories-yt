import React from "react";
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import moment from 'moment'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch} from 'react-redux'
import { deletePost, likePost } from "../../../actions/posts"

//do notice the prop, post
export default function Post({ post, setCurrentId }) {

    //these classes will be applied later
    const classes = useStyles()

    const dispatch = useDispatch()

    return (
        <>
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>

                <div className={classes.overlay}>
                    <Typography variant="h6">{post.creator}</Typography>
                    {/* below, post.createdAt gives the, well, what it says. then the fromNow returns x minutes ago and so on. moment(...) returns a moment object */}
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>

                </div>
                <div className={classes.overlay2}>
                    {/* refer to point 1 for explanation as to why style has to done with the double-pair of curly braces */}
                    <Button style={{ color: "white" }} size="small" onClick={() => { setCurrentId(post._id) }}>
                        {/* this is the icon used for the triple dot thing (  ...  ) 
                            this button should supposedly trigger a change in the form component and allow the form to accept updates to the post
                        */}
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                    <Typography className={classes.title} variant="h4" gutterBottom>{post.title}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={() => { dispatch(likePost(post._id)) }}>
                        <ThumbUpAltIcon fontSize="small" /> &nbsp; Like &nbsp; {post.likeCount}
                    </Button>
                    <Button size="small" color="primary" onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </>
    )

}

// 1. why the double pair of curly braces
// In JSX, which is the syntax used by React, curly braces {} are used to embed JavaScript expressions.
//So, when you want to pass an object as a prop, you need to use double curly braces.
// The outer curly braces {} are a delimiter, indicating that what's inside is a JavaScript expression.
// The inner curly braces {} create an object. In this case, the object is {color: 'white'}.
// So, style={{color: 'white'}} is passing an object {color: 'white'} to the style prop.
//This is equivalent to the following in plain JavaScript:
// This is a common pattern in React for passing objects to props, especially for inline styling.