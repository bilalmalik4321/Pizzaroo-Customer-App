
export const signup = props => {
  const error_signup = {};
  const { email , repeatPassword, password } = props.user;

  if(!email) error_signup.email = "Please enter an email.";
  if(!password || password.length < 6 ) error_signup.password = "Please enter a valid password.";
  if(!repeatPassword) error_signup.repeatPassword = "Please confirm the password.";
  if(password && repeastPassword && password !== repeatPassword) error_signup.repeatPassword = "Passwords do not match.";


  props.updateError({
    error_signup
  });

  return error_signup;
}
