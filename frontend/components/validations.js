
export const signup = props => {
  const error_signup = {};
  const { email , repeatPassword, password, isAccepted} = props.user;

  if(!email) error_signup.email = "Please enter an email.";
  if(!password || password.length < 6 ) error_signup.password = "Please enter a valid password.";
  if(!repeatPassword && password) error_signup.repeatPassword = "Please confirm the password.";
  if(password && repeatPassword && password !== repeatPassword) error_signup.repeatPassword = "Passwords do not match.";
  if(!isAccepted) error_signup.isAccepted = "Please read the term and conditions.";


  props.updateError({
    error_signup
  });
  console.log("error", error_signup);
  return error_signup;
}
