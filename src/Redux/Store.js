import {configureStore} from "@reduxjs/toolkit"
import quizslice from "./Features/postslice"


export default configureStore({
    reducer:{
        app:quizslice,
    },
})