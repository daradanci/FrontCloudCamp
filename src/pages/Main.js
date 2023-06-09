import {Link, useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import React, {useState} from "react";
import Mopsik from '../mediafiles/images/Mops.jpg'
import Folder from '../mediafiles/images/Folder.svg'
import {useDispatch, useSelector} from "react-redux";
import {setEmail, setPhone, setStep} from "../store/Slice";
import MaskedInput from "react-text-mask";
import MainValidationSchema,{phoneNumberMask} from "../store/ValidationSchemes";

function Main() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const { currentStep} = useSelector((state) => state.currentStep);
    const { phone} = useSelector((state) => state.phone);
    const { email} = useSelector((state) => state.email);


    return(
        <div className={'white-board'}>
            <div className={'info-board'}>
                <div><img src={Mopsik} alt="profile-image" className={'profile-image'}/></div>
                <div>
                <div className={'info-name'}>Даниил Зелинский</div>
                <div className={'info-links'}>
                    <Link className={'info-link'} to={"https://t.me/daradanci"}>
                        <img src={Folder} alt="link-image" className={'link-image'}/>
                        Telegram
                    </Link>
                    <Link className={'info-link'} to={"https://github.com/daradanci"}>
                        <img src={Folder} alt="link-image" className={'link-image'}/>
                        GitHub
                    </Link>
                </div>
                </div>
            </div>
            <Formik
               validationSchema={MainValidationSchema}

              initialValues={{
                  phone:phone,
                  email:email
              }}
              onSubmit={async (values) => {
                  await dispatch(setStep(1))
                  navigate('/FrontCloudCamp/create');
                  await dispatch(setPhone(values.phone))
                  await dispatch(setEmail(values.email))
                // await new Promise((r) => setTimeout(r, 500));
                // alert(JSON.stringify(values, null, 2));
              }}
            >
                {(formik) => {
            const { errors, touched, isValid, dirty } = formik;
            return (
                <Form className={'input-form'}>
                    <label htmlFor="phone" className={'input-label'}>Номер телефона</label>
                    <Field id="phone" name="phone">
                        {({ field }) => <MaskedInput
                            {...field}
                            className={'input-field'}
                            mask={phoneNumberMask}
                            placeholder="+7 (999) 999-99-99"
                          />
                        }
                    </Field>

                    {errors.phone  ? (

                    <div className={'field-tip'}>{errors.phone}</div>

                     ) : null}

                    <label htmlFor="email" className={'input-label'}>Email</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="example.email@list.ru"
                      type="email"
                      className={'input-field'}
                        maxLength={30}
                    />
                    {errors.email && touched.email ? (
                    <div className={'field-tip'}>{errors.email}</div>
                     ) : null}

                    <button id={'button-start'} type={"submit"} className={'button-start'}
                    >Начать</button>

              </Form>
                    );
                }}
            </Formik>

        </div>
    )


}

export default Main;

