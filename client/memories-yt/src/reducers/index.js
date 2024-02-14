import {combineReducers} from 'redux';
import posts from './posts';

// 1. this works, but the second way also works
// when the key and value are the same, this syntax is tolerated and understood
export default combineReducers({
    posts
})

// 2. this is the second way to do the same thing
// export default combineReducers({
//     posts: () => "posts"
// })