import {Link, useNavigate} from 'react-router-dom';
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Done from '../mediafiles/images/done.png'
import {setStep} from "../store/Slice";


function StepLine() {
    const dispatch = useDispatch();
    const { currentStep} = useSelector((state) => state.currentStep);
    const clickHandler1 = async ()=>{
        await dispatch(setStep(1))
    }
    const clickHandler2 = async ()=>{
        await dispatch(setStep(2))
    }
    const clickHandler3 = async ()=>{
        await dispatch(setStep(3))
    }
    return(
        <div className={'step-line'}>
            {currentStep===1 &&
                <>
                <div className={'active-point'} role={'button'}
                onClick={clickHandler1}
                ><div className={'active-dot'}></div>
                    <div className={'dot-number'}>1</div>
                </div>
                <div className={'passive-between-line'}></div>
                <div className={'passive-point'}
                onClick={clickHandler2}
                >
                    <div className={'dot-number'}>2</div>
                </div>
                <div className={'passive-between-line'}></div>
                <div className={'passive-point'}
                onClick={clickHandler3}
                >
                    <div className={'dot-number'}>3</div>
                </div>
                </>
            }
            {currentStep===2 &&
                <>
                    <div className={'active-point'} role={'button'}
                    onClick={clickHandler1}
                    ><img src={Done}  className={'active-svg'}/>
                        <div className={'dot-number'}>1</div>
                    </div>
                    <div className={'active-between-line'}></div>
                    <div className={'active-point'} role={'button'}
                    onClick={clickHandler2}
                    ><div className={'active-dot'}></div>
                        <div className={'dot-number'}>2</div>
                    </div>
                    <div className={'passive-between-line'}></div>
                    <div className={'passive-point'}
                    onClick={clickHandler3}
                    >
                        <div className={'dot-number'}>3</div>
                    </div>

                </>
            }
            {currentStep===3 &&
                <>
                    <div className={'active-point'} role={'button'}
                    onClick={clickHandler1}
                    ><img src={Done}  className={'active-svg'}/>
                        <div className={'dot-number'}>1</div>
                    </div>
                    <div className={'active-between-line'}></div>
                    <div className={'active-point'} role={'button'}
                    onClick={clickHandler2}
                    ><img src={Done}  className={'active-svg'}/>
                        <div className={'dot-number'}>2</div>
                    </div>
                    <div className={'active-between-line'}></div>
                    <div className={'active-point'} role={'button'}
                    onClick={clickHandler3}
                    ><div className={'active-dot'}></div>
                        <div className={'dot-number'}>3</div>
                    </div>

                </>
            }

            {/*<div className={'passive-between-line'}></div>*/}
            {/*<div className={'passive-point'}>*/}
            {/*    <img src={Done}  className={'active-svg'}/>*/}
            {/*</div>*/}

        </div>

    )


}

export default StepLine;

