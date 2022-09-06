import {configureStore} from "@reduxjs/toolkit";
import totalReducer from "./totalReducer";

const Store = configureStore({
    reducer:{
        count:totalReducer
    }
})
export default Store