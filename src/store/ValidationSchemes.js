import * as Yup from 'yup';

const MainValidationSchema = Yup.object().shape({
    phone: Yup.string()
        .required('Phone number is required')
        .matches(
            /\+7\ \(\d{3}\)\ \d{3}-\d{2}-\d{2}/,
          // /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/,
          "Incorrect phone number."
        ),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required')
        .matches(
            /^[a-zA-Z0-9_.-]+\@+[a-z]+\.[a-z]+$/,
            "Invalid email."
        ),
});

export default MainValidationSchema;



export const Step1ValidationSchema = Yup.object().shape({
    nickname: Yup.string()
        .max(30, "Too Long!")
        .required("Nickname is required")
        .matches(
          /^[a-zA-Z0-9]*$/,
          "Nickname must contain only latin symbols and numbers."
        ),

    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Name is required"),

    sername: Yup.string()
        .max(50, "Too Long!")
        .required("Surname is required"),


});


export const phoneNumberMask = [
    "+",
    "7",
    " ",
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/
];
