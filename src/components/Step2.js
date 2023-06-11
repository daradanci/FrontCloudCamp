import {Link, useNavigate} from 'react-router-dom';
import {Field, FieldArray, Form, Formik} from 'formik';
import React, {useState} from "react";
import Select from "react-select";
import { useFormikContext } from 'formik';
import { mixed, number, object } from "yup";
import {
    addAdvantage, doCheckbox,
    nextStep,
    previousStep,
    removeAdvantage,
    setAdvantages, setRadio,
    setStep, undoCheckbox,
    updateAdvantage
} from "../store/Slice";
import {useDispatch, useSelector} from "react-redux";
import TrashCan from "../mediafiles/images/remove.png"
import Plus from '../mediafiles/images/plus.svg'
import {Step2ValidationSchema} from "../store/ValidationSchemes";

function Step2() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {advantages} = useSelector((state) => state.advantages);
    const {radio} = useSelector((state) => state.radio);
    const {checkbox} = useSelector((state) => state.checkbox);

    const goBackHandler=async()=>{
        await dispatch(previousStep())
    }
    const removeHandler=async(value)=>{
        if(advantages.length>1)
        await dispatch(removeAdvantage(value))
    }
    const addHandler=async()=>{
        await dispatch(addAdvantage(''))
    }
    return(
        <div className={'step1-white-board'}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                advantages: advantages,
                radio: radio
              }}
              validationSchema={Step2ValidationSchema}
              onSubmit={async (values) => {
                  console.log(values.advantages)
                  await dispatch(setAdvantages(values.advantages))
                  await dispatch(nextStep())
              }}
            >
            {(formik) => {
            const {values, errors, touched, isValid, dirty } = formik;
            return (
                <Form className={'input-form'}>
                    <label className={'step1-input-label'}>Advantages</label>

                    <FieldArray
                        id={'field-advantages'} name={'advantages'}

                    >
                        <div>

                    {advantages.map((item,index) => (

                        <div className={'step2-field-wrapper'}>
                        <div>
                            <Field id={`field-advantages-${index+1}`} name={`field-advantages-${index+1}`}
                                   className={'step2-field'}
                                   placeholder="Placeholder"
                                   value={advantages[index]}
                                   onChange={async (e)=>{
                                       formik.setFieldValue(`field-advantages-${index+1}`,e.target.value)
                                       await dispatch(updateAdvantage({index:index, value:e.target.value}))
                                   }}
                                   maxLength={40}
                            />
                            {errors &&
                                errors.advantages &&
                                errors.advantages[index] &&
                                touched &&
                                touched.advantages &&
                                touched.advantages[index] && (
                                  <div className={'field-tip'}>{errors.advantages[index]}</div>
                                )}
                        </div>
                        <img src={TrashCan} id={`button-remove-${index+1}`}
                             className={'button-remove'} onClick={async ()=>{await removeHandler(item)}}/>
                    </div>
                    ))}
                            </div>
                    </FieldArray>

                    <button id={'button-add'} className={'button-add'}
                            type={'button'}
                            onClick={async()=>{await addHandler()}}>
                        <img src={Plus} className={'add-svg'}/>
                    </button>


                    <div className={'radio-group'}>
                    <label className={'step1-input-label'}>Radio group</label>
                        {advantages.map((item,index) =>(
                            <div className={'radio-wrapper'}>
                                <Field id={`field-radio-group-option-${index+1}`} name="radio" className={'radio-button'}
                                       type={'radio'} index={index+1}
                                       onClick={async()=>{
                                           await dispatch(setRadio(index))
                                       }}
                                       checked={values.radio === index}
                                />
                                <div className={'radio-number'}>{index+1}</div>
                            </div>
                        ))}
                        {errors && errors.radio &&
                            <div className={'field-tip'}>{errors.radio}</div>
                        }

                    </div>


                    <div className={'radio-group'}>
                    <label className={'step1-input-label'}>Checkbox group</label>
                        {advantages.map((item,index) =>(
                            <div className={'radio-wrapper'}>
                                <Field id={`field-radio-group-option-${index+1}`} name={"checkbox"} className={'radio-button'}
                                       type={'checkbox'} index={index+1}
                                       onClick={async()=>{
                                           const curIndex = checkbox.indexOf(index)
                                           if(curIndex>-1){
                                               await dispatch(undoCheckbox(index))
                                           }else{
                                               await dispatch(doCheckbox(index))

                                           }
                                       }}
                                       checked={checkbox.indexOf(index)>-1}
                                />
                                <div className={'radio-number'}>{index+1}</div>
                            </div>
                        ))}
                        {errors && errors.checkbox &&
                            <div className={'field-tip'}>{errors.checkbox}</div>
                        }

                    </div>


                    <button id={'button-back'} className={'button-back'} type={'button'} onClick={goBackHandler}>Назад</button>
                    <button id={'button-next'} type={"submit"} className={'button-next'}
                    >Далее</button>
              </Form>
                );
            }}

            </Formik>

        </div>
    )
}

export default Step2;

