import {Link, useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import React, {useState} from "react";
import Select from "react-select";
import { useFormikContext } from 'formik';
import { mixed, number, object } from "yup";
import {nextStep, openModal, previousStep, setModalMode, setStep} from "../store/Slice";
import {useDispatch, useSelector} from "react-redux";
import Modal from "./Modal";

function Step3() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {modalMode} = useSelector((state) => state.modalMode);
    const goBackHandler=async()=>{
        await dispatch(previousStep())
    }
    return(
        <div className={'step1-white-board'}>
            <Formik
              initialValues={{
                phone: '',
                email: '',
              }}
              onSubmit={async (values) => {
                  await dispatch(setModalMode(-1))
                  console.log('OPENED')
              }}
            >

                <Form className={'input-form'}>
                    <label htmlFor="field-about" className={'step1-input-label'}>About</label>
                    <Field id="field-about" name="field-about" as={'textarea'} className={'step3-field'} placeholder="Расскажите о себе" />
                    <div className={'field-tip'}>подсказка</div>
                    <div className={'white-space'}/>
                    <button id={'button-back'} className={'button-back'} onClick={goBackHandler}>Назад</button>
                    <button id={'button-send'} type="submit" className={'button-send'}>Отправить</button>
              </Form>
            </Formik>

            <Modal/>
        </div>
    )
}

export default Step3;

