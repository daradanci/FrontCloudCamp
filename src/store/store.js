import { configureStore } from "@reduxjs/toolkit";
import Reducer from './Slice'


export default configureStore({
    reducer:{
        currentStep:Reducer,
        nickname:Reducer,
        name:Reducer,
        sername:Reducer,
        phone:Reducer,
        email:Reducer,
        sex:Reducer,
        advantages:Reducer,
        radio:Reducer,
        checkbox:Reducer,
        about:Reducer,
        modalMode: Reducer,
        textarea_length:Reducer,
        textarea_max_length:Reducer,

    }
})
