import * as Yup from "yup";
export const SignatureValidationSchema = Yup.object({
  signOff: Yup.string().required("This field is required").min(2, "Please enter a name more than 1 character").max(40, "Name is Too Long!"),
  remarks: Yup.string().min(1, "Please enter remarks more than 1 character").max(50, "Remarks is Too Long!").required("This field is required"),
});
