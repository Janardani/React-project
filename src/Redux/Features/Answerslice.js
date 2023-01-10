import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const getanswer = createAsyncThunk("answer/getmethod",async() => {
    const reponse = await axios.get(`http://localhost:8001/useranswergiven`);
    return reponse.data;
})

export const updateanswer = createAsyncThunk("answer/postmethod",async({id,useranswer}) => {
    const reponse = await axios.put(`http://localhost:8001/useranswergiven/${id}`,{useranswer});
    return reponse.data;
})


const Answerslice = createSlice({
    name:"answertaken",
    initialState:{
        loader:false,
        answer:[]
    },
    extraReducers:{
        [updateanswer.pending]:(state) =>{
            state.loader = true;
        },
        [updateanswer.fulfilled]:(state,action) =>{
            state.loader = false;
           console.log("action",action.payload);
            state.answer = action.payload;
        },
        [updateanswer.rejected]:(state) =>{
            state.loader = true;
        }
    }
})


export default Answerslice.reducer