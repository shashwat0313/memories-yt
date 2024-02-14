//this file contains controllers for posts routes

import postmessage from "../models/postMessage.js";
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId

export const getPosts = async (req, res) => {

    try {

        const postMessages = await postmessage.find();
        // console.log("server hit on /posts route");
        // console.log("got this result from db --- \n", postMessages);
        res.status(200).json((postMessages));
    }

    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//a form is there on the frontend to send a post request on this endpoint
export const createPost = async (req, res) => {
    const post = req.body;
    console.log("server hit by POST request on /posts");
    //create new post (with **postmessage** model imported from the models folder)
    const newPost = new postmessage(post);
    console.log("new post:", newPost);

    try {

        await newPost.save();

        //201 is the status code for successful creation
        res.status(201).json(newPost);
    }

    catch (error) {
        //409 is the status code for a conflict
        //detailed : means "request could not be completed" due to a conflict with the current state of the resource
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    // this params is got from the route's dynamic items
    // like router.get('/abc/:serial') will cause a param called serial to be a member of the params object
    const params = req.params

    console.log("params = ", params)
    console.log("params.id = ", params.id)
    console.log("server hit by PATCH request on /posts");
    //I would choose to use this
    const id = params.id;

    // instructor has chosen to use this
    // const {id:_id} = req.params

    // this is done to avoid wrong output in some situations
    const Object_id = new ObjectId(id)
    console.log("id = ", Object_id, "condition: ", ObjectId.isValid(Object_id));
    if (ObjectId.isValid(Object_id) == false)
        res.status(404).send("No post found with that id")

    else {

        // req.body contains the new form which is a post
        const newPost = req.body
        console.log("req.body: ", newPost);

        //it is advised not to do the update in this way, by passing newPost directly
        // postmessage.findByIdAndUpdate(id, newPost, {new:true}).then((updatedPost)=>{

        //the instructor advises to do this, and pass the id separately
        //but on printing req.body, i found that it is containing the _id for some reason
        //and also, both the alternatives are working fine.
        postmessage.findByIdAndUpdate(id, { ...newPost, id }, { new: true }).then((updatedPost) => {
            res.status(200).json(updatedPost)
        }).catch((err) => {
            res.status(500).json("some error occurred on the server while attempting to update the post: " + err)
        })
    }
}

export const deletePost = async (req, res) => {

    const id = req.params.id

    if (ObjectId.isValid(id) == false)
        res.status(404).send("No post found with that id")

    postmessage.exists({ _id: id }).then((exists) => {
        if (exists) {
            postmessage.deleteOne({ _id: id }).then(() => {
                res.status(200).json("deletion successful")
            }).catch((error) => {
                res.status(500).json("some error occurred on the server while attempting to delete the post: " + err)
            })
        }
        else {
            res.status(204).json("No doc found for that id")
        }
    })
}

export const likePost = async (req, res) => {
    const id = req.params.id

    if (ObjectId.isValid(id) == false)
        res.status(404).send("No post found with that id")

    postmessage.findById(id).then((post) => {
    //     console.log("post is:", post);
    //     console.log("likes:", (post.likeCount + 1));
    //     const newLikeCount = post.likeCount + 1
    //     console.log("new like count");
        postmessage.findByIdAndUpdate(id, { $inc: { likeCount: 1 } }, { new: true }).then((updatedPost) => {
            console.log("updatedPost:", updatedPost);
            res.status(200).json(updatedPost)
        }).catch((error) => {
            res.status(500).json({ message: "got some error in findbyidandupdate" })
        })
    }).catch((error) => {
        res.status(500).json({ message: "got some error in findbyid" })
    })

    // postmessage.findByIdAndUpdate(id, { ...newPost, likeCount: likeCount+1}, { new: true }).then((updatedPost) => {
    //     res.status(200).json(updatedPost)
    // }).catch((err) => {
    //     res.status(500).json("some error occurred on the server while attempting to update the post: " + err)
    // })

}