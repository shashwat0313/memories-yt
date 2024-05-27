import { FETCH_ALL, UPDATE, LIKE, DELETE, CREATE, SEARCH, START_LOADING, END_LOADING } from '../constants/actionTypes'

// state always has to be initialized with something, so we set it to an empty array
const reducer = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {

        case START_LOADING:

            return { ...state, isLoading: true }

        case END_LOADING:

            return { ...state, isLoading: false }

        case SEARCH:
            // console.log("search reducer called with action - " + (JSON.stringify(action.payload)));
            console.log("action in search:", action.payload);

            const newState = { ...state, posts: action.payload }

            console.log("dispatched state is:", newState);

            return newState;
        case FETCH_ALL:
            //TODO

            console.log("fetchall reducer: ", action.payload);
            console.log('fetchall reducer old state:', state);
            console.log("fetchall reducer new state:", {
                ...state, posts: {
                    posts: action.payload.data,
                    currentPage: action.payload.currentpage,
                    totalPages: action.payload.totalPages
                }
            });

            // return {
            //     ...state, posts : {posts:action.payload.data,
            //     currentPage:action.payload.currentpage,
            //     totalPages:action.payload.totalPages}
            // }

            return {
                ...state, posts: action.payload.data,
                currentPage: action.payload.currentpage,
                totalPages: action.payload.totalPages
            };


        case CREATE:
            //TODO
            console.log("create post reducer action:", action);
            console.log("create post reducer state:", state);
            return {...state, posts:[action.payload, ...state.posts.slice(0, -1)]};

        //this syntax does not work(    does work actually idk how      )
        case UPDATE:
        case LIKE:
            // roughly speaking, map will create a new array
            // it will iterate through each post
            // if the id of some post matched with the one updated by the user, then that post will get a new value in its place
            // this is just a cleaner way to write a whole for loop for that
            // a new array is prepared, since it is required to trigger a re-render
            console.log("action:", action);
            console.log("state:", state);
            // for some reason action.payload._id and action.payload.id were both working. well okay that might be because ...idk😭
            // return state.posts.map((post) => {console.log("post:", post);return post._id === action.payload._id ? action.payload : post})

            // const modifiedPost = state.posts.map

            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)
            };

        //also handling likes

        case DELETE:
            //TODO

            //payload has the value of the id of the post just deleted
            console.log("action:", action);
            console.log("state:", state);
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload.id) }

        // return posts.map((post) => {
        //     if(post._id !== action.payload.id) return post
        // })
        default:
            return state;
    }
}

export default reducer;