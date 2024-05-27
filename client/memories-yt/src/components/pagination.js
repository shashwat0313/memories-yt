import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Pagination, PaginationItem } from '@material-ui/lab'
import {useDispatch, useSelector} from 'react-redux'
import { getPosts } from '../actions/posts'

import useStyles from './styles'

export default function Paginate({page}) { 
    const classes = useStyles()
    
    const dispatch = useDispatch()

    useEffect(()=>{
        if(page){
            //dispatch
            dispatch(getPosts(page))
        }
        // eslint-disable-next-line
    },[page])

    // NOTE THAT USESELECTOR HAS SOME ISSUE WHILE TRYING TO RETURN VALUES. IT CAN  ONLY RETURN OBJECTS.
    // IT DID NOT WORK IN MY CASE AT LEAST
    const posts = useSelector((state)=>{return state.posts;})

    console.log("state(pagination)", posts);

    return (

        <Pagination
            classes={{ul: classes.ul}}
            count={ posts.totalPages }
            page={Number(page) || 1}
            variant="outlined"
            color="primary" 
            renderItem={(item)=>(<PaginationItem  {...item} component={Link} to={`/posts?page=${item.page}`}/>)}
        
        />

    )
}