import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import useStyles from './styles'
import React, { useEffect, useState } from 'react'
import { getPosts } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'

// be careful with the import since the names of action creator and api and controller on backend are the same
import { getPostsBySearchQuery } from '../../actions/posts'
import Paginate from '../pagination'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function Home() {

    const classes = useStyles()

    const [currentId, setCurrentId] = useState(null)

    const dispatch = useDispatch()
    //NOTE THAT THIS USEEFFECT **MUST NOT** BE WRITTEN BEFORE DISPATCH IS DEFINED
    // THIS IS ERROR IS NOT CAUGHT CLEARY BY THE WEBPACK COMPILER
    // IT IS CAUGHT AT RUNTIME WITHOUT LINE NUMBERS
    // well this should be obvious right?
    
    //THERE IS SOME CONFUSION WITH VARIABLE NAMES CONTAINING SEARCH AND QUERY
    
    const history = useHistory()
    
    // URL query params
    const query = useQuery()
    const page = query.get('page') || 1
    
    const searchQuery = query.get('searchQuery')
    console.log("searchQuery=",searchQuery);
    
    console.log("history=", history);
    console.log("query=", query);
    console.log("page=", page);
    
        useEffect(() => {
            dispatch(getPosts(page))
        // eslint-disable-next-line
        }, [page])
    
    // this state var contains the searched keyword(s)
    const [searchKeyword, setSearchKeyword] = useState("")
    // tags search will also be supported, for that tags also need state
    const [tags, setTags] = useState([])
    
    // if(searchQuery){
    //     dispatch(getPostsBySearchQuery({ searchQuery, tagsQuery: '' }))
    // }

    function searchKeyDownHandler(e) {
        // console.log("event e =", e);
        // keyCode 13 means Enter was pressed

        if (e.keyCode === 13) {
            console.log("You pressed enter");
            searchClickHandler()
        }

    }

    function addTagHandler(newTag) { setTags([...tags, newTag]) }

    function deleteTagHandler(tagToBeDeleted) { setTags(tags.filter((tag) => tag !== tagToBeDeleted)) }


    // This function will handle the searching and fetching posts or delegating such action
    // two major todo's:
    // 1. calling to the server to call to database to get the relevant posts
    // 2. fetch the posts then call for a dispatch to set the posts on the front end
    // addtionally, WORK IS NEEDED ON THE BACKEND TO RESPOND TO SUCH REQUEST
    function searchClickHandler(e) {
        // e.preventDefault()
        console.log("searchclickhandler called");
        const trimmedSearchText = searchKeyword.trim()
        console.log("trimmed search text - " + trimmedSearchText);
        if(!trimmedSearchText && tags.length === 0){
            console.log("bogus search");
            history.push('/')
            return;
        }
        if(trimmedSearchText || tags){
            dispatch(getPostsBySearchQuery({ searchQuery: searchKeyword, tagsQuery: tags.join(',') }))
            history.push(`/posts/search?searchQuery=${searchKeyword}&tagsQuery=${tags}`)
        }
        
    }

    return (

        <Grow in>
            <Container maxWidth="xl">

                <Grid container className={classes.gridContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                    {
              /*  * xs means it will take full width(12/12) on extra small devices 
                  * sm means it will take (7/12) width on small devices
                  * there a total of 12 columns in the grid system, so 7/12 is a fraction of the total width of 12
              */}
                    {/* FOR POSTS */}
                    <Grid item xs={12} sm={7} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>

                    {/* FOR EDITING/CREATING POST */}
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search' variant='outlined'
                                label='Search Memories' fullWidth
                                value={searchKeyword}
                                onKeyDown={searchKeyDownHandler}
                                onChange={(e) => { setSearchKeyword(e.target.value) }} />

                            <ChipInput
                                className={classes.chipInput}
                                value={tags}
                                onAdd={addTagHandler}
                                onDelete={deleteTagHandler}
                                label="Search Tags"
                                variant='outlined'
                            />
                            <Button
                                onClick={searchClickHandler}
                                variant='contained'
                                className={classes.searchButton}
                                color='primary'
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper
                            elevation={6}>
                            <Paginate page={page}/>
                        </Paper>
                    </Grid>

                </Grid>

            </Container>
        </Grow>

    )
}