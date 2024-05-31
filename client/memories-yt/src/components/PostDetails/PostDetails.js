import { useEffect } from "react";
import React from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
import useStyles from './styles'
import { getPost, getPostsBySearchQuery } from "../../actions/posts";

const PostDetails = () => {

  // console.log("Post Details");

  const { posts, post } = useSelector((state) => {
    console.log("state( postdetails ):", state.posts);
    return state.posts
  })

  const { id } = useParams()
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getPost(id))
    console.log("post in postdetails:", post);
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {

    // when we have a valid post (selected post for details)
    // we will call the dispatch on getpostsbysearchquery action creator
    // to populate the posts in the redux store
    // we will render the posts in the recommended posts area below the post details
    // no, there is nothing wrong with modifying the posts array in the redux store
    // well we did the same in search feature also. when the user navigates to a different page
    // or refreshes the page, or clicks on some other feature, the state is refreshed again as
    // per the new feature's needs. it will call its own dispatch to the action creator it needs

    if (post) {
      dispatch(getPostsBySearchQuery({ searchQuery: '', tagsQuery: post.tags.join(',') }))
    }
    // eslint-disable-next-line
  }, [post])

  const recommendedPosts = post ? (posts ? posts.filter(({ _id }) => _id !== post._id) : []) : [];
  console.log("recommendedPosts:", recommendedPosts);
  // recommended posts array is okay now.
  // now we can render the recommended posts below the post details

  function openPostDetails(id) {
    console.log("openpostdetails received:", id);
    history.push(`/posts/${id}`)
}

  return (
    <Paper>

      {post ? (
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">{post.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
            <Typography variant="h6">Created by: {post.creatorName}</Typography>
            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div>
        </div>

      ) : <CircularProgress size='7em' />}

      {recommendedPosts.length?
        <div className={classes.section}>
          <Typography variant="h5" gutterBottom> You might also like: </Typography>
          <Divider />

          <div className={classes.recommendedPosts}>
              {recommendedPosts.map( ({title, message, _id, creatorName, likes, selectedFile}) => (
                <div style={{cursor:'pointer', margin:'20px'}} key={_id} onClick={() => openPostDetails(_id)}>
                  <Typography gutterBottom variant="h6">{title}</Typography>
                  <Typography gutterBottom variant="subtitle2">{creatorName}</Typography>
                  <Typography gutterBottom variant="subtitle2">{message}</Typography>
                  <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>

                  {selectedFile ? 
                    <img src={selectedFile} alt={title} style={{width:'200px'}} />
                    : null
                  }

                </div>
              ) ) }
          </div>

        </div> : <Typography variant="h5" gutterBottom> No recommended posts. </Typography>
      }

    </Paper>
  )
}

export default PostDetails
