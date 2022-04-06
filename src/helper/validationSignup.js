export const validationSignup = ({ signup, setErrorSignup, errorSignup }) => {
  const { email, password, repeatPassword, username } = signup;
  const { errorEmail, errorPassword, errorRepeatPassword, errorUsername } =
    errorSignup;

  if (username) {
    setErrorSignup({
      ...errorSignup,
      [errorSignup.errorUsername]: "لطفا نام کاربری خود را وارد کنید",
    });
    return false;
  } else if (email) {
    setErrorSignup({
      ...errorSignup,
      [errorSignup.errorEmail]: "لطفا ایمیل خود را وارد کنید",
    });
    return false;
  } else if (password) {
    setErrorSignup({
      ...errorSignup,
      [errorSignup.errorPassword]: "لطفا پسورد خود را وارد کنید",
    });
    return false;
  } else if (repeatPassword !== password) {
    setErrorSignup({
      ...errorSignup,
      [errorSignup.errorPassword]: "لطفا تایید پسورد خود را چک کنید",
    });
    return false;
  }
};
