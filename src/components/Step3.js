import {Link, useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import React, {useState} from "react";
import Select from "react-select";
import { useFormikContext } from 'formik';
import { mixed, number, object } from "yup";
import {
    nextStep,
    openModal,
    previousStep,
    sendUserRequest,
    setAbout,
    setModalMode,
    setStep,
    setTextareaLength, setTextareaMaxLength
} from "../store/Slice";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal";
import {Step3ValidationSchema} from "../store/ValidationSchemes";
import store from '../store/store'
function Step3() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {about} = useSelector((state) => state.about);
    const {textarea_length} = useSelector((state) => state.textarea_length);
    const {textarea_max_length} = useSelector((state) => state.textarea_max_length);



    const goBackHandler=async()=>{
        await dispatch(previousStep())
    }
    const handleSend=async (value)=>{
        console.log(value)
        const state = store.getState();
        console.log(state.about)
        await dispatch(sendUserRequest(state.about))
            // .then(async(res)=>{
            //     // await dispatch(setModalMode(-1))
            //
            //     console.log(res)
            // })
            // .catch(async (err)=>{
            //
            // })
    }

    return(
        <div className={'step1-white-board'}>
            <Formik
              validationSchema={Step3ValidationSchema}
              enableReinitialize={true}
              initialValues={{
                about: about,
              }}
              onSubmit={async (values) => {
                     await dispatch(setAbout(values.about))
                    await handleSend(values.about)
              }}
            >
                {(formik) => {
            const {values, errors, touched, isValid, dirty } = formik;
            return (
                <Form className={'input-form'}
                    onChange={async (e)=>{
                        // console.log(e.target.value)
                        // formik.setFieldValue(about,e.target.value)
                        await setAbout(e.target.value)
                        let input_text=e.target.value
                        let len_w_spaces=input_text.length
                        let len_no_spaces = (input_text.match(/[a-zA-Z0-9а-яА-Я]/g)||"").length
                        await dispatch(setTextareaLength(len_no_spaces))
                        if (len_w_spaces>=200)
                            await dispatch(setTextareaMaxLength(len_w_spaces+(200-len_no_spaces)))
                   }}
                >
                    <label htmlFor="field-about" className={'step1-input-label'}>About</label>
                    <Field id="field-about" name="about" as={'textarea'}
                            maxLength={textarea_max_length}
                           // value={values.about}

                           className={'step3-field'} placeholder="Расскажите о себе" />
                    <div className={'step3-tip-wrapper'}>

                    {errors.about && touched.about ? (
                    <div className={'field-tip'}>{errors.about}</div>
                     ) : null}
                    <div className={'step3-field-tip'}>{textarea_length}/200</div>
                    </div>
                    <div className={'white-space'}/>
                    <button id={'button-back'} className={'button-back'} onClick={goBackHandler}>Назад</button>
                    <button id={'button-send'} type={"submit"} className={'button-send'}>Отправить</button>
              </Form>
                );
            }}
            </Formik>

            <Modal/>
        </div>
    )
}

export default Step3;

