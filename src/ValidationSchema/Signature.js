import * as Yup from "yup";
export const SignatureValidationSchema = Yup.object({
  signOff: Yup.string().required("This field is required").max(40, "Name is Too Long!"),
  remarks: Yup.string().max(500, "Remarks is Too Long!").required("This field is required"),
});
