import React, { useEffect, useState } from "react";
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts';

export default function Form({ currentId, setCurrentId}) {

    //these classes will be applied later
    const classes = useStyles()

    const [postData, setFormPostData] = useState(
        {
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        }
    )

    //1. Important thing to note about useSelector is that it will cause your component to re-render whenever the value returned by the selector function changes. 
    // In other words, if the part of the state your selector function is looking at changes, your component will re-render.
    //2. the cb function is run on every re-render
    const postToBeUpdated = useSelector((state) => {
        if (currentId) {
            return state.posts.find(
                (post) => post._id === currentId
            )
        } else return null;
    })

    useEffect(() => {
        if(postToBeUpdated){
            setFormPostData(postToBeUpdated)
        }
    }, [postToBeUpdated])

    const dispatch = useDispatch();

    const submitHandler = async (e) => {
        e.preventDefault();

        // if currentId contains an id, then it means that the form, when submitted, should cause an updation
        // the reason why current id may contain an id is that when the triple dot is pressed, then only the currentId is assigned a value
        // currentId is init. to null

        if (currentId == null) {
            // means no press of triple dot
            dispatch(createPost(postData))
        }
        else {
            //update operation
            dispatch(updatePost(currentId, postData))
            setCurrentId(null)
        }
        clearForm()

    }
    const clearForm = () => {
        setCurrentId(null)
        setFormPostData(()=>{
            return {
                creator: '',
                title: '',
                message: '',
                tags: '',
                selectedFile: ''
            }
        })
     }

    return (

        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={submitHandler}>
                <Typography variant="h6">
                    {currentId ? "Editing " : "Creating"} a Memory
                </Typography>

                <TextField name="creator" variant="outlined" label="Creator" fullWidth

                    value={postData.creator}
                    onChange={(e) => {
                        // obviously, not having the spread operator here would cause the loss of the other properties
                        // spread operator is used to copy the existing properties of the object
                        // it is nice shorthand, instead of writing all the properties of the object over or using complicated stuff
                        setFormPostData({ ...postData, creator: e.target.value })
                    }}

                ></TextField>
                <TextField name="title" variant="outlined" label="Title" fullWidth

                    value={postData.title}
                    onChange={(e) => {
                        setFormPostData({ ...postData, title: e.target.value })
                    }}

                ></TextField>
                <TextField name="message" variant="outlined" label="Message" fullWidth

                    value={postData.message}
                    onChange={(e) => {
                        setFormPostData({ ...postData, message: e.target.value })
                    }}

                ></TextField>
                <TextField name="tags" variant="outlined" label="Tags" fullWidth

                    value={postData.tags}
                    onChange={(e) => {
                        setFormPostData({ ...postData, tags: (e.target.value).split(',') })
                    }}

                ></TextField>

                {/* the source code of the component indicates that multiple option is false by default */}
                {/* when multiple files are there, the return is an array of base64's, else it is directly a base64 of the single file */}
                {/* the instructor had recommended destructuring into base64, it looks way better */}

                {/* format is given below */}
                {/* {
                    name: file.name,
                    type: file.type,
                    size: Math.round(file.size / 1000) + ' kB',
                    base64: reader.result,
                    file: file,
                } ............. where file is the input(most probably an indirect input)*/}
                <div className={classes.fileInput}>
                    <FileBase type="file"
                        multiple={false}
                        onDone={    ({ base64, size, name }) => {
                            setFormPostData({ ...postData, selectedFile: base64 })
                            console.log(`Size of the file is ${size}.`);
                            console.log(`Name of the file is ${name}.`)
                        }}/>
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

                <Button variant="contained" color="secondary" size="small" onClick={clearForm} >Clear</Button>

            </form>
        </Paper>
    )
}