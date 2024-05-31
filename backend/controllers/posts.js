//this file contains controllers for posts routes

import postmessage from "../models/postMessage.js";
import mongoose from 'mongoose';
import jwt from "jsonwebtoken"

const ObjectId = mongoose.Types.ObjectId

export const getPosts = async (req, res) => {
    // console.log("req auth:", req.headers);
    console.log("req.query=" + JSON.stringify(req.query));
    const {page} = req.query
    const LIMIT = 8
    console.log("page number on find:", Number(page));

    
    try {
        const postCount = await postmessage.countDocuments()

        if(page === undefined || Number(page) === 0){
            const pm = await postmessage.find({}).sort({_id:-1}).limit(LIMIT)
            // return res.status(200).json(pm);
            return res.status(200).json(({data:pm, currentpage:1, totalPages: postCount}));
        }
        
        // Impl. to send only a limited number of posts to the front end, based on the value of page variable

        // page 0 -> index 0[beginIndex below] -> send 0 to 7, page 2 -> index (2-1)*8 = 8 -> send 8 to 15, and so on
        const beginIndex = (Number(page) - 1) * LIMIT
        
        // if(beginIndex + LIMIT < postCount){
        //     //handle differently maybe?
        //     const pm = await postmessage.find({}).sort({_id:-1}).limit(postCount - ())
        // }

        // const endIndex
        const posts = await postmessage.find({})
        .sort({ _id: -1 }) // Sort by _id in descending order
        .limit(LIMIT) // Limit the number of documents
        .skip(beginIndex) // Skip the first 'beginIndex' documents

        // const postMessages = await postmessage.find();
        // console.log("server hit on /posts route");
        // console.log("got this result from db --- \n", postMessages);

        return res.status(200).json(({data:posts, currentpage:page, totalPages:Math.ceil(postCount/LIMIT)}));
    }

    catch (error) {
        return res.status(404).json({ message: error });
    }
}

export async function getPost(req, res) {
    // const id = req.params
    console.log(req.params);

    const {id} = req.params

    postmessage.findById(id).then((post)=>{
        // console.log("post found in fetchpost:", post);
        return res.status(200).json(post)
    }).catch((err)=>{
        return res.status(500).json({msg:"some error while finding the posr", errorMessage:err});
    })
}

//a form is there on the frontend to send a post request on this endpoint
export const createPost = async (req, res) => {
    const post = req.body;
    console.log("server hit by POST request on /posts");
    //create new post (with **postmessage** model imported from the models folder)
    console.log(req.headers.authorization);
    console.log(req.body);
    console.log(req.userid);
    // userModel.findById(req.userid).then((user) => {
    // }).catch((err) => {
    // })

    if (req.userid) {
        const newPost = new postmessage({ ...post, creator: req.userid, createdAt: (new Date()).toISOString() });
        console.log("new post:", newPost);
        try {
            newPost.save().then((saved) => {
                console.log("saved", saved);
                return res.status(201).json(saved)
            }).catch((err) => {
                return res.status(500).json({message:`error in creating post server side: ${err}`})
                console.log("error in saving, ", err);
            })

            //now send posts to the front end
            // postmessage.find({}).then((posts)=>{
            // console.log("posts found by createpost---\n", posts);
            // })

        } catch (error) {
            return res.status(500).json({message:`error in creating post server side: ${error}`})
            console.log("some error,", error);
        }
    }


    // try {

    //     await newPost.save();

    //     //201 is the status code for successful creation
    //     return res.status(201).json(newPost);
    // }

    // catch (error) {
    //     //409 is the status code for a conflict
    //     //detailed : means "request could not be completed" due to a conflict with the current state of the resource
    //     return res.status(409).json({ message: error.message });
    // }
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

    if (!req.userid) {
        return res.status(401).json({ message: "Unauthenticated" })
    }

    // instructor has chosen to use this
    // const {id:_id} = req.params

    // this is done to avoid wrong output in some situations
    const Object_id = new ObjectId(id)
    console.log("id = ", Object_id, "condition: ", ObjectId.isValid(Object_id));
    if (ObjectId.isValid(Object_id) == false)
        return res.status(404).send("No post found with that id")

    else {

        // req.body contains the new form which is a post
        const newPost = req.body
        console.log("req.body: ", newPost);

        //it is advised not to do the update in this way, by passing newPost directly
        // postmessage.findByIdAndUpdate(id, newPost, {new:true}).then((updatedPost)=>{

        //the instructor advises to do this, and pass the id separately
        //but on printing req.body, i found that it is containing the _id for some reason
        //and also, both the alternatives are working fine.

        // postmessage.findOne({ _id: id }).then((post) => {
        //     console.log(post);
        //     console.log("creator =", post.creator);

        //     postmessage.findByIdAndUpdate(id, { ...newPost, id, creator }, { new: true }).then((updatedPost) => {
        //         return res.status(200).json(updatedPost)
        //     }).catch((err) => {
        //         return res.status(500).json("some error occurred on the server while attempting to update the post: " + err)
        //     })

        // })

        postmessage.findByIdAndUpdate(id, { ...newPost, id}, { new: true }).then((updatedPost) => {
            return res.status(200).json(updatedPost)
        }).catch((err) => {
            return res.status(500).json("some error occurred on the server while attempting to update the post: " + err)
        })
    }
}

export const deletePost = async (req, res) => {

    const id = req.params.id
    //req.params contains parameters got from the url as in /post/:postid/delete

    if (ObjectId.isValid(id) == false)
        return res.status(404).send("No post found with that id")

    postmessage.exists({ _id: id }).then((exists) => {
        if (exists) {
            // // check if user is the owner
            const reqauth = req.headers.authorization
            const token = reqauth ? reqauth.split(" ")[1] : null

            if (token) {
                const decoded = jwt.decode(token);

                // get the owner from any of these account types
                const userid = decoded?.sub ? decoded.sub : decoded.id

                postmessage.findOne({ _id: id }).then((post) => {
                    // if the user is the owner then proceed to deletion
                    if (post.creator == userid) {
                        postmessage.deleteOne({ _id: id }).then(() => {
                            return res.status(200).json("deletion successful")
                        }).catch((error) => {
                            return res.status(500).json("some error occurred on the server while attempting to delete the post: " + error)
                        })
                    }
                    // send Unauthorised
                    else {
                        return res.status(401).json("Unauthorised")
                    }
                })
            }
        }
        else {
            return res.status(204).json("No doc found for that id")
        }
    })
}

export const likePost = async (req, res) => {
    const postid = req.params.id

    if (ObjectId.isValid(postid) == false)
        return res.status(404).send("No post found with that id")

    

    // protected route  
    // only allow if user is authenticated
    // only allow one like per user

    // 1. only allow if user is authenticated 
    // !== would return true for undefined != null but != would
    // if (req.userid == null) {
    //     return res.status(401).json({ message: "Unauthenticated" });
    // }

    postmessage.findById(postid).then((post) => {
        //     console.log("post is:", post);
        //     console.log("likes:", (post.likeCount + 1));
        //     const newLikeCount = post.likeCount + 1
        //     console.log("new like count");

        const likes = post.likes
        console.log("likes:\n", likes);

        // post id coming from req.params.id is in string format
        const postIndex = likes.findIndex((id) => id === String(req.userid))

        if (postIndex === -1) {
            // user not found in the array
            post.likes.push(req.userid)
            console.log("likes now, ", post.likes);
        }
        else {
            // user is already included in the array in this case, and WE NEED TO REMOVE THE USER WHO CALLED THIS FUNCTION
            // in the loop, if the user is caught in the array, then dont pass it in the new array
            post.likes = post.likes.filter((id) => id === String(req.userid) ?
                // the user who pressed the button is found now, so dont pass it to the new array 
                false :
                // a user who does not match to the user who clicked the like button is found, so pass it as it is
                true
            )
        }

        //commit the change to db

        post.save().then((saved) => {
            console.log("saved after like button:", saved);
            return res.status(201).json(saved)
        }).catch((err) => {
            console.log("error in saving the post after like\n", err);
            return res.status(500).json({ message: "some error occurred on the server while attempting to update the post: " + err })
        })

        // DO NOT USE THIS CODE
        // likeCount is removed now, instead, we are using likes array in the postmessage model
        // postmessage.findByIdAndUpdate(postid, { $inc: { likeCount: 1 } }, { new: true }).then((updatedPost) => {
        //     console.log("updatedPost:", updatedPost);
        //     return res.status(200).json(updatedPost)
        // }).catch((error) => {
        //     return res.status(500).json({ message: "got some error in findbyidandupdate ---" + error })
        // })
    }).catch((error) => {
        console.log("error in findbyid:", error);
        return res.status(500).json({ message: "got some error in findbyid:", error })
    })

    // postmessage.findByIdAndUpdate(id, { ...newPost, likeCount: likeCount+1}, { new: true }).then((updatedPost) => {
    //     return res.status(200).json(updatedPost)
    // }).catch((err) => {
    //     return res.status(500).json("some error occurred on the server while attempting to update the post: " + err)
    // })
}

export async function getPostsBySearchQuery (req, res) {
    try {
        // req.query is automatically populated by Express, it is a feature of express
        // it is not related to the front end
        // express autmatically parses the url search params and populated the query object for us
        // on the front end also, the parsing is done but it is done separately using other functions to get the same output
        // so this query object is not directly related to the front end
        // the search params are able to get parsed because of the fact that we 
        // properly constructed the URL on the front end
        // refer to the get api definition for this request on actions of front end
        // console.log(req.query);
        // req.originalUrl can be used to verify that the URL is indeed one with search params
        // console.log(req.originalUrl);
        // successfully received query through req.query

        const {searchQuery, tagsQuery} = req.query

        console.log("searchQuery=" + searchQuery + " and tagsQuery=" + tagsQuery);

        // db query

        let dbQuery = []

        if (searchQuery !== "null") {
            dbQuery.push({title: {$regex: searchQuery, $options: 'i'}});
        }

        if (tagsQuery) {
            dbQuery.push({tags:{$in:tagsQuery.split(',')}});
        }

        console.log("dbQuery = " + JSON.stringify(dbQuery));

        if(dbQuery.length === 0){
            postmessage.find({}).then((posts)=>{
                return res.status(200).json(posts)
            }).catch((error)=>{
                return res.status(500).json({message:"error in empty find - " + error})
            })
        }
        
        else postmessage.find(
            {$or: dbQuery }
        ).then((matchingPosts)=>{
            // console.log("matched posts are - " + matchingPosts);
            return res.status(200).json(matchingPosts)
        }).catch((error)=>{
            return res.status(500).json({message:`error in searching: ${error}`})
        })

    } catch (error) {
        console.log("error in search posts controller:", error);
        return res.status(500).json({message:`error on server while trying to search: ${error}`})
    }
}

// async function getPostsBySearchQuery (req, res) {
//     try {
//         const {searchQuery, tagsQuery} = req.query

//         let dbQuery = [];

//         if (searchQuery) {
//             dbQuery.push({title: {$regex: searchQuery, $options: 'i'}});
//         }

//         if (tagsQuery) {
//             dbQuery.push({tags:{$in:tagsQuery}});
//         }

//         postmessage.find(
//             {$or: dbQuery}
//         ).then((matchingPosts)=>{
//             res.status(200).json(matchingPosts)
//         }).catch((error)=>{
//             res.status(500).json({message:`error in searching: ${error}`})
//         })

//     } catch (error) {
//         return res.status(500).json({message:`error on server while trying to search: ${error}`})
//     }
// }