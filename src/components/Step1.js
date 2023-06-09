import {Link, useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import React, {useState} from "react";
import Select from "react-select";
import { useFormikContext } from 'formik';
import { mixed, number, object } from "yup";
import {appendTouchedList, nextStep, previousStep, setName, setNickname, setSername, setStep} from "../store/Slice";
import {useDispatch, useSelector} from "react-redux";
import ValidationSchema, {Step1ValidationSchema} from "../store/ValidationSchemes";
import MainValidationSchema from "../store/ValidationSchemes";
function Step1() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = [
      { value: 'field-sex-option-man', label: 'man' },
      { value: 'field-sex-option-woman', label: 'woman' },
    ]
    const goBackHandler=async()=>{
        // await dispatch(previousStep())
        navigate('/');
    }
    const {nickname} = useSelector((state) => state.nickname);
    const {name} = useSelector((state) => state.name);
    const {sername} = useSelector((state) => state.sername);

    return(
        // <div className={'white-board'}>
        <div className={'step1-white-board'}>
            <Formik
              initialValues={{
                  nickname:nickname,
                  name:name,
                  sername:sername,
              }}
              validationSchema={Step1ValidationSchema}

              onSubmit={async (values) => {
                  await dispatch(nextStep())
                  await dispatch(setNickname(values.nickname))
                  await dispatch(setName(values.name))
                  await dispatch(setSername(values.sername))


              }}
            >
            {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
                <Form className={'input-form'}>
                    <label htmlFor="field-nickname" className={'step1-input-label'}>Nickname</label>
                    <Field id="field-nickname" name="nickname"  placeholder="Ник"
                           maxLength={30}
                            className={'step1-field'}
                            value={nickname}
                            onChange={async (e)=>{
                                await dispatch(setNickname(e.target.value))
                            }}
                    />
                    {errors.nickname && touched.nickname ? (

                    <div className={'field-tip'}>{errors.nickname}</div>

                     ) : null}
                    <label htmlFor="field-name" className={'step1-input-label'}>Name</label>
                    <Field id="field-name" name="field-name" className={'step1-field'} placeholder="Имя"
                    maxLength={50}
                    />
                    <div className={'field-tip'}>подсказка</div>

                    <label htmlFor="field-sername" className={'step1-input-label'}>Surname</label>
                    <Field id="field-sername" name="field-sername" className={'step1-field'} placeholder="Фамилия"
                    maxLength={50}
                    />
                    <div className={'field-tip'}>подсказка</div>

                    <label htmlFor="field-sex" className={'step1-input-label'}>Sex</label>
                    <Select id="field-sex" name="field-sex" options={options}
                           className={'step1-select'} placeholder="Не выбрано">
                    </Select>
                    <button id={'button-back'} className={'button-back'} onClick={goBackHandler}>Назад</button>
                    <button id={'button-next'} type="submit" className={'button-next'}>Далее</button>
                </Form>
                );
            }}
            </Formik>

        </div>
        // </div>

    )


}

export default Step1;

