import {Link, useNavigate} from 'react-router-dom';
import {Field, Form, Formik, FormikConfig, FormikValues} from 'formik';
import React, {useState} from "react";

import Step1 from "../components/Step1";
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { mixed, number, object } from "yup";
import {useDispatch, useSelector} from "react-redux";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import StepLine from "../components/StepLine";

function StepperForm() {
    // const childrenArray=React.Children.toArray(children);
    // const [step,setStep]=useState(0)
    // const currentChild=childrenArray[step];
    const dispatch = useDispatch();
    const { currentStep} = useSelector((state) => state.currentStep);
    const { nickname} = useSelector((state) => state.nickname);


    return(
        <div className={'white-board'}>
            <StepLine/>
            {/*<FormikStepper initialValues={{}} onSubmit={{}} >*/}
            {currentStep===1 &&
                <Step1/>
            }
            {currentStep===2 &&
                <Step2/>

            }
            {currentStep===3 &&
                <Step3/>
            }
            {/*</FormikStepper>*/}
        </div>

    )


}

export default StepperForm;

