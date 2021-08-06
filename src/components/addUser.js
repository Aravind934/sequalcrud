import { useFormik } from "formik";
import { useHistory } from "react-router";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphQL/mutations";
import { GET_USERS } from "../graphQL/queries";

let AddUser = () => {
  let history = useHistory();

  let [addUser, { err }] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  let AddUser = async (user) => {
    let res = await addUser({
      variables: { ...user, age: Number(user.age) },
    });

    if (err) {
      alert(err.message);
    }
    if (res.data.addUser.success) {
      alert("user added");
      history.push("/");
    } else {
      alert(res.data.addUser.message);
    }
  };

  let validationSchema = yup.object({
    name: yup.string().required("required"),
    password: yup.string().required("required"),
    age: yup.number("should be a number").required("required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      age: "",
    },
    validationSchema,
    onSubmit: (values) => {
      AddUser(values);
    },
  });

  return (
    <div className="container">
      <form className="row g-3" onSubmit={formik.handleSubmit}>
        <h3 className="text-center">Add user</h3>
        <div className="col-auto">
          <label htmlFor="name" className="visually-hidden">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter user name"
            {...formik.getFieldProps("name")}
          />
          <small className="text-danger">
            {formik.touched.name && formik.errors.name
              ? formik.errors.name
              : ""}
          </small>
        </div>
        <div className="col-auto">
          <label htmlFor="password" className="visually-hidden">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter user password"
            {...formik.getFieldProps("password")}
          ></input>
          <small className="text-danger">
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </small>
        </div>
        <div className="col-auto">
          <label htmlFor="age" className="visually-hidden">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            name="age"
            placeholder="Enter user age"
            {...formik.getFieldProps("age")}
          ></input>
          <small className="text-danger">
            {formik.touched.age && formik.errors.age ? formik.errors.age : ""}
          </small>
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary mb-3"
            disabled={
              !formik.isValid ||
              !formik.values.name ||
              !formik.values.password ||
              !formik.values.age
            }
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
