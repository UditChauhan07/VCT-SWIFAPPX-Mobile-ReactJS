import * as Yup from "yup";
export const UserProfile = Yup.object({
  name: Yup.string().required("This field is required").min(2, "Please enter a name more than 1 character").max(40, "Name is Too Long!"),
  contact: Yup.number()
  .typeError('Only digits are allowed in contact number!').min(100000000, "Phone number must be 10 characters!").max(9999999999, "Invalid Phone number").required("This field is required"),
  address: Yup.string().min(1, "Address is Too Short!").max(50, "Address is Too Long!").required("This field is required"),
});