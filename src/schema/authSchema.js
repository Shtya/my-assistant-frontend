import * as yup from 'yup';

export const SignInSchema = yup.object({
  login_email: yup
    .string()
    .email('auth.signin.email_valid')         
    .required('auth.signin.email_required'),  

  login_password: yup
    .string()
    .required('auth.signin.password_required')
});

export const SignUpSchema = yup.object({
  name: yup
    .string()
    .required('auth.signup.name_required')        
    .min(2, 'auth.signup.name_min'),              

  phone: yup
    .string()
    .required('auth.signup.phone_required'),      

  email: yup
    .string()
    .email('auth.signup.email_valid')             
    .required('auth.signup.email_required'),      

  password: yup
    .string()
    .min(6, 'auth.signup.password_min')           
    .required('auth.signup.password_required'),   
  
    role: yup
    .string()
    .required('auth.signup.role'),       

  department: yup
    .string()
    .required('auth.signup.department'),

});

export const ForgotPasswordSchema = yup.object({
  forgot_email: yup
    .string()
    .email('auth.forgot.email_valid')              // => "Enter a valid email"
    .required('auth.forgot.email_required')        // => "Email is required"
});
