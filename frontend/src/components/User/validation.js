import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  fName: Yup.string().required("First Name is Required"),
  lName: Yup.string().required("Second Name is Required"),
  email: Yup.string().email().required("Email is Required"),
  house: Yup.number()
    .required("House Number is Required")
    .positive("House Number Should be Positive"),
  street: Yup.string().required("Street Number is Required"),
  postalCode: Yup.number()
    .required("Postal Code is Required")
    .positive("Postal Code Should be Positive"),
  state: Yup.string().required("State is Required"),
  city: Yup.string().required("City is Required"),
  contractType: Yup.string().required("Contract Type is Required"),
  designation: Yup.string().required("Designation is Required"),
  salary: Yup.number()
    .required("Salary is Required")
    .positive("Enter valid salary"),
  password: Yup.string().required("Password is Required").min(8),
});
export default validationSchema;
