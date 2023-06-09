import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const endpoint="https://api.sbercloud.ru/content/v1/bootcamp/frontend"

async function fetchJSON(url, options) {
    let response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`status code ${response.status}`);
    }
    return response.json();
}

export const sendUserRequest = createAsyncThunk(
    'users/sendUserRequest',
    async (user) => {
        return await fetchJSON(
            endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                })
            }
        )
            // .then(
            //     (data) => data.json()
            // )
    }
)


export const Slice = createSlice({
    name: "Slice",
    initialState: {
        currentStep:1,
        nickname:"",
        name:"",
        sername:"",
        phone:"",
        email:"",
        sex:"",
        advantages:[],
        radio:0,
        checkbox:[],
        about:"",
        modalMode:0, // 1: ok-opened, 0: closed, -1: not-ok-opened
        errorList:[],
        touchedList:[],
    },
    reducers: {
        setStep: (state, action) => {
            state.currentStep=action.payload;
        },
        nextStep: (state, action) => {
            state.currentStep++;
        },
        previousStep: (state, action) => {
            state.currentStep--;
        },
        openModal: (state, action) => {
            state.modalMode=1;
        },
        closeModal: (state, action) => {
            state.modalMode=0;
        },
        setModalMode: (state, action) => {
            state.modalMode=action.payload;
        },
        setNickname: (state, action) => {
            state.nickname=action.payload;
        },
        setName: (state, action) => {
            state.name=action.payload;
        },
        setSername: (state, action) => {
            state.sername=action.payload;
        },
        setPhone: (state, action) => {
            state.phone=action.payload;
        },
        setEmail: (state, action) => {
            state.email=action.payload;
        },
        setSex: (state, action) => {
            state.sex=action.payload;
        },


        setErrorList: (state, action) => {
            state.errorList=action.payload;
        },
        setTouchedList: (state, action) => {
            state.touchedList=action.payload;
        },
        appendErrorList: (state, action) => {
            state.errorList+=action.payload;
        },
        appendTouchedList: (state, action) => {
            state.touchedList+=action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(sendUserRequest.pending, (state, action) => {
            })
            .addCase(sendUserRequest.fulfilled, (state, action) => {
            })
            .addCase(sendUserRequest.rejected, (state, action) => {
                // state.userError = action.error.message
            })
    }

})

export const {setStep,nextStep,previousStep,setNickname,
    setName, setSername, setSex, setPhone, setEmail,
    openModal,closeModal,setModalMode,
    setErrorList, setTouchedList, appendErrorList, appendTouchedList,
}=Slice.actions;
export default Slice.reducer;