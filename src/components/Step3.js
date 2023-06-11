import {Link, useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import React, {useState} from "react";
import Select from "react-select";
import { useFormikContext } from 'formik';
import { mixed, number, object } from "yup";
import {nextStep, openModal, previousStep, sendUserRequest, setAbout, setModalMode, setStep} from "../store/Slice";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal";
import {Step3ValidationSchema} from "../store/ValidationSchemes";
import store from '../store/store'
function Step3() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {about} = useSelector((state) => state.about);
    // const {nickname} = useSelector((state) => state.nickname);
    // const {name} = useSelector((state) => state.name);
    // const {sername} = useSelector((state) => state.sername);
    // const {phone} = useSelector((state) => state.phone);
    // const {email} = useSelector((state) => state.email);



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
            const { errors, touched, isValid, dirty } = formik;
            return (
                <Form className={'input-form'}>
                    <label htmlFor="field-about" className={'step1-input-label'}>About</label>
                    <Field id="field-about" name="about" as={'textarea'}
                            maxLength={200}
                           // value={about}
                           // onChange={async (e)=>{
                           //     await setAbout(e.target.value)
                           // }}
                           className={'step3-field'} placeholder="Расскажите о себе" />
                    {errors.about && touched.about ? (
                    <div className={'field-tip'}>{errors.about}</div>
                     ) : null}
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

