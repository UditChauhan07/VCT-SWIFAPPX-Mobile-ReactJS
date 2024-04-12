import * as Yup from "yup";

export const LoginFormSchema = Yup.object().shape({
  userName: Yup.string().required("Please enter your user id.").min(1, "Use 1 characters or more for your password.").max(20, "Use 20 characters or fewer for your user name"),
  password: Yup.string().required("Please enter your password.").min(5, "Use 5 characters or more for your password.").max(20, "Use 20 characters or fewer for your password"),
});
