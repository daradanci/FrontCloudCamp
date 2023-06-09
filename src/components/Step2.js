import {Link, useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import React, {useState} from "react";
import Select from "react-select";
import { useFormikContext } from 'formik';
import { mixed, number, object } from "yup";
import {nextStep, previousStep, setStep} from "../store/Slice";
import {useDispatch} from "react-redux";
import TrashCan from "../mediafiles/images/remove.png"

function Step2() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);

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
                  await dispatch(nextStep())
              }}
            >

                <Form className={'input-form'}>
                    <label className={'step1-input-label'}>Advantages</label>
                    <div className={'step2-field-wrapper'}>
                    <div>
                    <Field id="field-nickname" name="field-nickname" className={'step2-field'} placeholder="Placeholder" />
                    </div>
                        <img src={TrashCan}  className={'button-remove'}/>
                    </div>
                    <div className={'step2-field-wrapper'}>
                    <div>
                    <Field id="field-nickname" name="field-nickname" className={'step2-field'} placeholder="Placeholder" />
                    </div>
                        <img src={TrashCan}  className={'button-remove'}/>
                    </div>




                    <button id={'button-back'} className={'button-back'} onClick={goBackHandler}>Назад</button>
                    <button id={'button-next'} type="submit" className={'button-next'}>Далее</button>
              </Form>
            </Formik>

        </div>
    )
}

export default Step2;

