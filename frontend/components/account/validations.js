
/**
 * signup validates all the input of the sign up form
 * @param {Object} props 
 */
export const signup = props => {
  const error_signup = {};
  const { email , repeatPassword, password, isAccepted, phone, name} = props.user;

  const isPhone = new RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/);

  if(!name) error_signup.name ="Please enter your name.";
  if(!isPhone.test(phone.trim())) error_signup.phone ="Please enter your phone number."
  if(!email) error_signup.email = "Please enter an email.";
  if(!password || password.length < 6 ) error_signup.password = "Please enter a valid password.";
  if(!repeatPassword && password) error_signup.repeatPassword = "Please confirm the password.";
  if(password && repeatPassword && password !== repeatPassword) error_signup.repeatPassword = "Passwords do not match.";
  
  props.updateError({
    error_signup
  });
  console.log("error", error_signup);
  return error_signup;
}

/**
 * signi validates the input from the sign in form
 * @param {Object} props 
 */
export const signin = props => {
  const error_signin = {};
  const { email, password} = props.user;


  if(!email) error_signin.email = "Please enter an email.";
  if(!password || password.length < 6 ) error_signin.password = "Please enter a valid password.";
 
  props.updateError({
    error_signin
  });

  return error_signin;
}
