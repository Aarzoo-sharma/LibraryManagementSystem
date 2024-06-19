import * as yup from "yup";

const loginSchema = yup.object({
  username: yup.string().required("Required!!!"),
  password: yup.string().required("Required!!!"),
});

const forgetSchema = yup.object({
  email: yup.string().email("invalid email").required("Required!!!"),
});

const addBookSchema = yup.object({
  accession_no: yup.number().min(1).typeError("not a number"),
  author: yup.string().required("Required!!!"),
  title: yup.string().required("Required!!!"),
  place_publisher: yup.string().required("Required!!!"),
  edition: yup.string().required("Required!!!"),
  year: yup
    .number()
    .min(1, "Required!!!")
    .typeError("Not a Number")
    .required("Required!!!"),
  pages: yup.number().min(1).typeError("Not a Number").required("Required!!!"),
  source: yup.string().required("Required!!!"),
  billNo: yup.number().typeError("Not a Number").required("Required!!!"),
  billDate: yup.date().required("Required!!!"),
  cost: yup
    .number()
    .min(1, "Can't be zero or negative")
    .typeError("Not a Number")
    .required("Required!!!"),
});

const createStudent = yup.object({
  name: yup.string().required("Required!!!"),
  uniqueUserId: yup
    .string()
    .matches(/[0-9]{4}(MCA|MBA|ENG)[0-9]{2}/i, "not a valid roll no")
    .required("Required!!!"),
  email: yup.string().email("invalid email").required("Required!!!"),
  phone_no: yup
    .number()
    .min(1000000000, "invalid number")
    .max(9999999999, "invalid number")
    .typeError("not a number")
    .required("Required!!!"),
  designation: yup
    .string()
    .oneOf(["student", "faculity"], "invalid type")
    .required("Required!!!"),
  department: yup
    .string()
    .oneOf(["MCA", "MBA", "ENGLISH"], "invalid type")
    .required("Required!!!"),
});

const createAdminSchema = yup.object({
  empName: yup.string().required("Required!!!"),
  username: yup.string().required("Required!!!"),
  email: yup.string().email("invalid email").required("Required!!!"),
  password: yup
    .string()
    .matches(/[a-z]/, "Password must contain one lower character")
    .matches(/[A-Z]/, "Password must contain one Upper character")
    .matches(/[0-9]/, "Password must contain one number")
    .matches(
      /[!@#$%^&*(,)_\-\.]/,
      "Password must contain one special character"
    )
    .min(8, "Password must be of atleast 8 characters")
    .required("Required!!!"),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required!!!"),
});

const profileSchema = yup.object({
  empName: yup.string().required("Required!!!"),
  username: yup.string().required("Required!!!"),
  email: yup.string().email("invalid email").required("Required!!!"),
  currPassword: yup.string().required("Required!!!"),
  password: yup
    .string()
    .matches(/[a-z]/, "Password must contain one lower character")
    .matches(/[A-Z]/, "Password must contain one Upper character")
    .matches(/[0-9]/, "Password must contain one number")
    .matches(
      /[!@#$%^&*(,)_\-\.]/,
      "Password must contain one special character"
    )
    .min(8, "Password must be of atleast 8 characters")
    .required("Required!!!"),
  confPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required!!!"),
});

const IssueSchema = yup.object({
  issuedBookId: yup.string().required("Required!!!"),
  libraryPenalty: yup.number().min(0, "not less then 0"),
  dateOfReturn: yup.date().required("Required!!!"),
});

const returnSchema = yup.object({
  issuedBookId: yup.string().required("Required!!!"),
  libraryPenalty: yup.number().min(0, "not less then 0"),
  dateOfReturn: yup.date().required("Required!!!"),
});

export {
  loginSchema,
  forgetSchema,
  addBookSchema,
  createStudent,
  createAdminSchema,
  returnSchema,
  profileSchema,
  IssueSchema,
};
