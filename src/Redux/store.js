import {configureStore} from "@reduxjs/toolkit"
import postReducer from "./Features/Postslice"


export default configureStore ({
    reducer:{
        app:postReducer,
    },
});