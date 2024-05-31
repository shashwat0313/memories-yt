import React from "react";
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Link } from '@material-ui/core'
import moment from 'moment'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost } from "../../../actions/posts"
import Likes from "./Likes";

import { useHistory } from 'react-router-dom'

export default function Post({ post, setCurrentId }) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector((state) => state.auth?.authData);

    function isOwner(post) {
        return !(user?.result ? (user.result?.sub ? user.result.sub === post.creator : (user.result?._id ? user.result._id === post.creator : null)) : null);
    }

    function openPostDetails() {
        history.push(`/posts/${post._id}`)
    }

    return (
        <>
        <div className={classes.postDetailOverlay} onClick={openPostDetails}>
        {/* <a onClick={openPostDetails}> */}

                <Card className={classes.card} raised elevation={6}>

                    {/* <ButtonBase className={classes.cardActions} onClick={openPostDetails}> */}



                    <CardMedia className={classes.media} image={post.selectedFile} title={post.title}></CardMedia>

                    <div className={classes.overlay}>
                        <Typography variant="h6">{post.creatorName}</Typography>
                        {/* below, post.createdAt gives the, well, what it says. then the fromNow returns x minutes ago and so on. moment(...) returns a moment object */}
                        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>

                    </div>
                    <div className={classes.overlay2}>
                        {/* refer to point 1 for explanation as to why style has to done with the double-pair of curly braces */}

                        {/* FOR EDITING */}
                        {/* {isOwner(post) && */}
                        <Button
                            disabled={isOwner(post)}
                            style={{ color: "white" }} size="small" onClick={(event) => { event.stopPropagation();  setCurrentId(post._id) }}>
                            {/* this is the icon used for the triple dot thing (  ...  )
                            this button should supposedly trigger a change in the form component and allow the form to accept updates to the post
                        */}
                            <MoreHorizIcon fontSize="default" />
                        </Button>
                        {/* } */}

                    </div>
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                    <Typography className={classes.title} variant="h4" gutterBottom>{post.title}</Typography>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
                    </CardContent>
                    {/* </ButtonBase> */}

                    <CardActions className={classes.cardActions}>

                        {/* FOR LIKES */}
                        <Button size="small" disabled={!user} color="primary" onClick={(event) => { event.stopPropagation(); dispatch(likePost(post._id, history)) }}>
                            <Likes post={post} user={user} />
                        </Button>

                        {/* FOR DELETION */}
                        {/* {isOwner(post) && */}
                        <Button disabled={isOwner(post)} size="small" color="primary" onClick={(event) => { event.stopPropagation();  dispatch(deletePost(post._id, history)) }}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                        {/* } */}

                    </CardActions>
                </Card>
        {/* </a> */}
        </div>
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