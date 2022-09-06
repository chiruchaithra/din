import {createSlice} from "@reduxjs/toolkit";

const totalSlice = createSlice({
    name:'total',
    initialState : {
        total:0
    },
    reducers : {
        totalCartValue : (state,action)=>{
            state.total =  state.total + action.payload
        }
    }
})
const {totalCartValue} = totalSlice.actions;
export default  totalSlice.reducer