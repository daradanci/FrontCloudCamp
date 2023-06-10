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


export const Step1ValidationSchema = Yup.object().shape({
    nickname: Yup.string()
        .min(4, "Too Short!")
        .max(30, "Too Long!")
        .required("Nickname is required.")
        .matches(
          /^[a-zA-Z0-9]*$/,
          "Nickname must contain only latin symbols and numbers."
        ),

    name: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Name is required."),

    sername: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Surname is required."),

    sex: Yup.object()
        .shape({
        id: Yup.mixed()
            // .notOneOf(['field-sex-option-empty'])
            .oneOf(["field-sex-option-man", "field-sex-option-woman"])
            .required("Required")
        ,
        label: Yup.string()
            .required("Required")
            // .notOneOf(['Не выбрано'])

            // .oneOf(["man", "woman"], "There are only 2 genders."),

    })
    //     .required('Define your gender.')


});


export const Step2ValidationSchema = Yup.object().shape({
    advantages: Yup.array()
        .of(
            Yup.string()
            .required('Required')
        )
        .required('Required')



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

export default MainValidationSchema;


