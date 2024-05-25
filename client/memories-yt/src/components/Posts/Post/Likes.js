import React from "react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltIconOutlined from '@material-ui/icons/ThumbUpAltOutlined'

export default function Likes ({post, user}){
    return post.likes.includes(user ? (user?.result ? (user.result?._id ? user.result._id : (user.result?.sub ? user.result.sub : null)) : null) : null)
        ?
        <>
            <ThumbUpAltIcon /> &nbsp;{ post.likes.length === 1 ? "You" : `You and ${post.likes.length - 1} more` }
        </>
        :
        <>
            <ThumbUpAltIconOutlined />&nbsp;{post.likes.length === 0 ? "Like" : post.likes.length}
        </>
}