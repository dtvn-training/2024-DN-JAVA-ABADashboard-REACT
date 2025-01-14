import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./register-component.module.scss";
import classNames from "classnames/bind";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router";
import { useFormik } from "formik";
import * as yup from "yup";
import { InputStyles } from "../../../components/input";
import { ButtonStyles } from "../../../components/button";
import useRouter from "../../../hooks/useRouter";
import { useAppDispatch } from "../../../redux/store";
import { RegisterAction } from "../../../redux/authentication-slice/authentication-slice";

const registerValidateSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password must not exceed 20 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/\d/, "Password must contain at least one number.")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character (@$!%*?&#)."
    )
    .required("Password is required."),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Confirm password is required."),
});

const cx = classNames.bind(styles);
const LoginComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);
  const registerFormik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "" },
    validationSchema: registerValidateSchema,
    onSubmit: async (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };
      const res = await dispatch(RegisterAction(data));
      if (res.payload) {
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    },
  });

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };
  const handleToggleConfirmPassword = () => {
    setToggleConfirmPassword(!toggleConfirmPassword);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h1>Create an account</h1>
        <p>Let’s get started with your 30 days free trial.</p>
      </div>
      <hr />
      <div className={cx("content")}>
        <form onSubmit={registerFormik.handleSubmit}>
          <div className={cx("input-group")}>
            <InputStyles
              id="email"
              name="email"
              placeHolder="Enter your email address"
              value={registerFormik.values.email}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              title="Email"
              type="email"
              error={registerFormik.touched.email}
              errorMessage={registerFormik.errors.email}
            >
              {undefined}
            </InputStyles>
            <InputStyles
              id="password"
              name="password"
              placeHolder="Enter your password"
              value={registerFormik.values.password}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              title="Password"
              type={togglePassword ? "text" : "password"}
              error={registerFormik.touched.password}
              errorMessage={registerFormik.errors.password}
            >
              {togglePassword ? (
                <FontAwesomeIcon
                  className={cx("icon")}
                  onClick={handleTogglePassword}
                  icon={faEye}
                />
              ) : (
                <FontAwesomeIcon
                  className={cx("icon")}
                  onClick={handleTogglePassword}
                  icon={faEyeSlash}
                />
              )}
            </InputStyles>
            <InputStyles
              id="confirmPassword"
              name="confirmPassword"
              placeHolder="Enter your confirmation password"
              value={registerFormik.values.confirmPassword}
              onChange={registerFormik.handleChange}
              onBlur={registerFormik.handleBlur}
              title="Confirm password"
              type={toggleConfirmPassword ? "text" : "password"}
              error={registerFormik.touched.confirmPassword}
              errorMessage={registerFormik.errors.confirmPassword}
            >
              {toggleConfirmPassword ? (
                <FontAwesomeIcon
                  className={cx("icon")}
                  onClick={handleToggleConfirmPassword}
                  icon={faEye}
                />
              ) : (
                <FontAwesomeIcon
                  className={cx("icon")}
                  onClick={handleToggleConfirmPassword}
                  icon={faEyeSlash}
                />
              )}
            </InputStyles>
          </div>
          <ButtonStyles
            fullWidth
            disabled={false}
            backgroundColor="#bae5fb"
            size="large"
            text="register"
            type="submit"
          />
        </form>
        <p className={cx("text-helper")}>
          You have an account ? <Link to="/auth/sign-in">Sign in here</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
