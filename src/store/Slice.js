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
    async (state) => {

        return await fetchJSON(
            endpoint,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    nickname:state.nickname,
                    name:state.name,
                    sername:state.sername,
                    phone:state.phone,
                    email:state.email,
                    sex:state.sex.value,
                    advantages:state.advantages,
                    radio:state.radio,
                    checkbox:state.checkbox,
                    about:state.about,
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
        phone: localStorage.getItem('phone')||"",
        email: localStorage.getItem('email')||"",
        sex:[{ value: 'field-sex-option-empty', label: 'Не выбрано' }],
        advantages:[''],
        radio:-1,
        checkbox:[],
        about:"",
        modalMode:0, // 1: ok-opened, 0: closed, -1: not-ok-opened

        textarea_length:0,
        textarea_max_length:200,
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
            localStorage.setItem('phone',action.payload)
        },
        setEmail: (state, action) => {
            state.email=action.payload;
            localStorage.setItem('email',action.payload)
        },
        setSex: (state, action) => {
            state.sex=action.payload;
        },
        setAdvantages: (state, action) => {
            state.advantages=action.payload;
        },
        addAdvantage: (state, action) => {
            state.advantages.push(action.payload);
        },
        updateAdvantage: (state, action) => {
            state.advantages[action.payload.index]=action.payload.value;
        },
        removeAdvantage: (state, action) => {
            const index = state.advantages.indexOf(action.payload)

            if(index===state.radio){
                    state.radio=-2;
            }
            else{
                if(index<state.radio){
                    state.radio-=1;
                }
            }


            for (let i=0; i<state.checkbox.length; i++){
                if(index===state.checkbox[i]){
                    // state.checkbox.length
                    state.checkbox.splice(i, 1);
                    i-=1;
                }else{
                    if(index<state.checkbox[i]){
                        state.checkbox[i]-=1
                    }
                }
            }

            if (index > -1) { // only splice array when item is found
              state.advantages.splice(index, 1); // 2nd parameter means remove one item only
            }
            // state.advantages.push(action.payload);
        },
        setCheckbox: (state, action) => {
            state.checkbox=action.payload;
        },
        doCheckbox: (state, action) => {
            state.checkbox.push(action.payload);
        },
        undoCheckbox: (state, action) => {
            const index = state.checkbox.indexOf(action.payload)
            if (index > -1) { // only splice array when item is found
              state.checkbox.splice(index, 1); // 2nd parameter means remove one item only
            }
        },
        setRadio: (state, action) => {
            state.radio=action.payload;
        },
        setAbout: (state, action) => {
            state.about=action.payload;
        },
        setTextareaLength: (state, action) => {
            state.textarea_length=action.payload;
        },
        setTextareaMaxLength: (state, action) => {
            state.textarea_max_length=action.payload;
        },






    },
    extraReducers: (builder) => {
        builder
            .addCase(sendUserRequest.pending, (state, action) => {

            })
            .addCase(sendUserRequest.fulfilled, (state, action) => {
                state.modalMode=1
            })
            .addCase(sendUserRequest.rejected, (state, action) => {
                state.modalMode=-1

            })
    }

})

export const {setStep,nextStep,previousStep,setNickname,
    setName, setSername, setSex, setPhone, setEmail,
    setAdvantages, addAdvantage, removeAdvantage, updateAdvantage,
    setRadio, doCheckbox, undoCheckbox, setAbout,
    setCheckbox, setTextareaLength, setTextareaMaxLength,
    openModal,closeModal,setModalMode,
}=Slice.actions;
export default Slice.reducer;