import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"


export const gethtml = createAsyncThunk("html/getmethod",async() => {
    const reponse = await axios.get(`http://localhost:8001/html`);
    return reponse.data;
})
export const updateanswer = createAsyncThunk("answer/updatemethod",async({id,useranswer}) => {
    const reponse = await axios.put(`http://localhost:8001/useranswergiven/${id}`,{useranswer});
    return reponse.data;
})
export const getanswer = createAsyncThunk("answer/getmethod",async() => {
    const response = await axios.get(`http://localhost:8001/useranswergiven`);
    return response.data;
})
export const postuser = createAsyncThunk("user/postuser",async({name,email})=>{
    const response = await axios.post(`http://localhost:8001/user`,{name,email});
    return response.data;
})
const quizslice = createSlice({
    name:"quiz",
    initialState:{
        username:[],
        loader:false,
        html:[],
        answer:[],
        result:0
    },
    reducers:{
        setusername:(state,action) =>{
            state.username = action.payload
        },
    },
    extraReducers:{
        [gethtml.pending]:(state) =>{
            state.loader = true;
        },
        [gethtml.fulfilled]:(state,action) =>{
            state.loader = false;
           
            state.html = action.payload;
        },
        [gethtml.rejected]:(state) =>{
            state.loader = true;
        },
        [updateanswer.pending]:(state) =>{
            state.loader = true;
        },
        [updateanswer.fulfilled]:(state,action) =>{
            state.loader = false;
            state.answer = action.payload;
        },
        [updateanswer.rejected]:(state) =>{
            state.loader = true;
        },
        [getanswer.pending]:(state) =>{
            state.loader = true;
        },
        [getanswer.fulfilled]:(state,action) =>{
            state.loader = false;
            state.answer = action.payload;
        },
        [getanswer.rejected]:(state) =>{
            state.loader = true;
        },
        [postuser.pending]:(state) =>{
            state.loader = true;
        },
        [postuser.fulfilled]:(state,action) =>{
            state.loader = false;
            state.username = action.payload;
        },
        [postuser.rejected]:(state) =>{
            state.loader = true;
        }
    }
})


export const {setusername} = quizslice.actions
export const {result} =  quizslice.actions
export default quizslice.reducer