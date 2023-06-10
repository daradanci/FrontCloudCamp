import {Link, useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import React, {useState} from "react";
import Select from "react-select";
import { useFormikContext } from 'formik';
import {mixed, number, object, string} from "yup";
import {
    appendTouchedList,
    nextStep,
    previousStep,
    setName,
    setNickname,
    setSername,
    setSex,
    setStep
} from "../store/Slice";
import {useDispatch, useSelector} from "react-redux";
import ValidationSchema, {Step1ValidationSchema} from "../store/ValidationSchemes";
import MainValidationSchema from "../store/ValidationSchemes";
function Step1() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = [
      { id: 'field-sex-option-man', label: 'man' },
      { id: 'field-sex-option-woman', label: 'woman' },
    ]
    const goBackHandler=async()=>{
        // await dispatch(previousStep())
        navigate('/');
    }
    const {nickname} = useSelector((state) => state.nickname);
    const {name} = useSelector((state) => state.name);
    const {sername} = useSelector((state) => state.sername);
    const {sex} = useSelector((state) => state.sex);

    return(
        <div className={'step1-white-board'}>
            <Formik
              initialValues={{
                  nickname:nickname,
                  name:name,
                  sername:sername,
                  sex:sex,
              }}
              validationSchema={Step1ValidationSchema}

              onSubmit={async (values) => {
                  await dispatch(nextStep())
                  await dispatch(setNickname(values.nickname))
                  await dispatch(setName(values.name))
                  await dispatch(setSername(values.sername))
                  await dispatch(setSex(values.sex))

              }}
            >
            {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
                <Form className={'input-form'}>
                    <label htmlFor="field-nickname" className={'step1-input-label'}>Nickname</label>
                    <Field id="field-nickname" name="nickname"  placeholder="Ник"
                           maxLength={30} className={'step1-field'}/>
                    {errors.nickname && touched.nickname ? (
                    <div className={'field-tip'}>{errors.nickname}</div>
                     ) : null}

                    <label htmlFor="field-name" className={'step1-input-label'}>Name</label>
                    <Field id="field-name" name="name" className={'step1-field'} placeholder="Имя"
                    maxLength={50}
                    />
                    {errors.name && touched.name ? (
                    <div className={'field-tip'}>{errors.name}</div>
                     ) : null}

                    <label htmlFor="field-sername" className={'step1-input-label'}>Surname</label>
                    <Field id="field-sername" name="sername" className={'step1-field'} placeholder="Фамилия"
                    maxLength={50}
                    />
                    {errors.sername && touched.sername ? (
                    <div className={'field-tip'}>{errors.sername}</div>
                     ) : null}

                    <label htmlFor="sex" className={'step1-input-label'}>Sex</label>
                    <Field id="field-sex" name="sex" >

                        {({field}) => <Select  options={options} isSearchable={false}
                                                     // placeholder="Не выбрано"
                              value={field.value}
                              onValidate={(values)=>{
                                  console.log(values)
                              }}
                              // defaultValue={{id:'', label:'no'}}
                              onChange={(option) => {
                                  // console.log(option)
                                  formik.setFieldValue("sex", {id: option.id, label: option.label});

                                  // form.setFieldValue(field.name, option)
                                  // if ("id" in option)
                                  // else
                                  //     formik.setFieldValue("sex", "None");
                              }}
                              className={'step1-select'} >
                        </Select>
                        }
                    </Field>

                    {errors.sex && touched.sex ? (
                    <div className={'field-tip'}>{errors.sex}</div>
                     ) : null}
                    <div className={'field-tip'}>{sex.id}</div>


                    <button id={'button-back'} className={'button-back'} onClick={goBackHandler}>Назад</button>
                    <button id={'button-next'} type="submit" className={'button-next'}>Далее</button>
                </Form>
                );
            }}
            </Formik>

        </div>

    )


}

export default Step1;

