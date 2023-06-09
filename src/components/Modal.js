import {Link, useNavigate} from 'react-router-dom';
import {Field, Form, Formik} from 'formik';
import React, {useState} from "react";
import Select from "react-select";
import { useFormikContext } from 'formik';
import { mixed, number, object } from "yup";
import {closeModal, nextStep, previousStep, setModalMode, setStep} from "../store/Slice";
import {useDispatch, useSelector} from "react-redux";
import Ok from '../mediafiles/images/ok.svg'
import NotOk from '../mediafiles/images/not-ok.svg'
import Cross from '../mediafiles/images/cross.svg'
function Modal({active,setactive}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {modalMode} = useSelector((state) => state.modalMode);

    const closeHandler=async()=>{
        // await dispatch(setStep(3))
        await dispatch(closeModal())
    }
    return(
        <>
            { (modalMode ===1 || modalMode===-1) &&

        <div className={'modal'} >
            <div className={"modal-content"} onClick={e=>e.stopPropagation()}>

                {modalMode===1 &&
                    <>
                        <div className={'modal-header'}>Форма успешно отправлена</div>
                        <div className={'ok-wrapper'}>
                            <img src={Ok} className={'ok'}/>
                        </div>
                        <button id={'button-to-main'} type="submit" className={'button-to-main'}
                            onClick={closeHandler}
                        >На главную</button>
                    </>

                }
                {modalMode===-1 &&
                    <>
                        <div className={'modal-header-wrapper'}>
                            <div className={'modal-header'}>Ошибка</div>
                            <div className={'cross-wrapper'} onClick={closeHandler}>
                                <img src={Cross} className={'cross'}/>
                            </div>
                        </div>
                        <div className={'not-ok-wrapper'} >
                            <img src={NotOk} className={'not-ok'}/>
                        </div>
                        <button id={'button-to-main'} type="submit" className={'button-to-main'}
                            onClick={closeHandler}
                        >Закрыть</button>
                    </>

                }
            </div>
        </div>
            }
        </>
    )
}

export default Modal;

