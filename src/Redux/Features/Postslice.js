import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

export const getpost = createAsyncThunk("post/getpost" , async({id}) =>{
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res)=>
    res.json()
    );
});

export const deletepost = createAsyncThunk("post/deletepost" , async({id}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method:"DELETE"
    }).then((res)=>
    res.json()
    );
});


export const createpost = createAsyncThunk("post/createpost" , async({values}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/`,{
        method:"POST",
        headers:{
            Accept: "application/json",
            "content-type" : "application/json",
        },
        body: JSON.stringify({
            title:values.title,
            body: values.body,
        }),
    }).then((res)=>
    res.json()
    );
});
export const updatepost = createAsyncThunk("post/updatepost" , async({id,body,title}) => {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        method:"PUT",
        headers:{
            Accept: "application/json",
            "content-type" : "application/json",
        },
        body: JSON.stringify({
           title,
           body,
        }),
    }).then((res)=>
    res.json()
    );
});

const postslice = createSlice({
    name:"post",
    initialState:{
        post:[],
        loading:false,
        error:null,
        edit:false,
        body:""
    },
    reducers : {
        setEdit : (state,action) =>{
            state.edit = action.payload.edit;
            state.body = action.payload.body;
        }
    },
    extraReducers:{
        [getpost.pending]:(state,action) =>{
            state.loading = true;
        },
        [getpost.fulfilled] : (state,action) => {
            state.loading = false;
            state.post =  [action.payload];
        },
        [getpost.rejected] :(state,action) =>{
            state.loading =  false;
            state.error = action.payload;
        },
        [deletepost.pending]:(state,action) =>{
            state.loading = true;
        },
        [deletepost.fulfilled] : (state,action) => {
            state.loading = false;
            state.post =  action.payload;
        },
        [deletepost.rejected] :(state,action) =>{
            state.loading =  false;
            state.error = action.payload;
        },
        [createpost.pending]:(state,action) =>{
            state.loading = true;
        },
        [createpost.fulfilled] : (state,action) => {
            state.loading = false;
            state.post =  [action.payload];
        },
        [createpost.rejected] :(state,action) =>{
            state.loading =  false;
            state.error = action.payload;
        },
        [updatepost.pending]:(state,action) =>{
            state.loading = true;
        },
        [updatepost.fulfilled] : (state,action) => {
            state.loading = false;
            state.post =  [action.payload];
        },
        [updatepost.rejected] :(state,action) =>{
            state.loading =  false;
            state.error = action.payload;
        },
    
    }
})

 export const {setEdit} = postslice.actions;
export default postslice.reducer