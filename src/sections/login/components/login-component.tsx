import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./login-component.module.scss";
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
import { LoginAction } from "../../../redux/authentication-slice/authentication-slice";

const loginValidateSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(20, "Password must not exceed 20 characters.")
    .required("Password is required."),
});

const cx = classNames.bind(styles);
const LoginComponent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [togglePassword, setTogglePassword] = useState(false);
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidateSchema,
    onSubmit: async (values) => {
      const res = await dispatch(LoginAction(values));
      if (res.payload) {
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    },
  });

  const handleTogglePassword = () => {
    setTogglePassword(!togglePassword);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <h1>Sign In</h1>
        <p>
          If you are already a Admin you can login with your email address and
          password.
        </p>
      </div>
      <hr />
      <div className={cx("content")}>
        <form onSubmit={loginFormik.handleSubmit}>
          <div className={cx("input-group")}>
            <InputStyles
              id="email"
              name="email"
              placeHolder="Enter your email address"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              title="Email"
              type="email"
              error={loginFormik.touched.email}
              errorMessage={loginFormik.errors.email}
            >
              {undefined}
            </InputStyles>
            <InputStyles
              id="password"
              name="password"
              placeHolder="Enter your password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              onBlur={loginFormik.handleBlur}
              title="Password"
              type={togglePassword ? "text" : "password"}
              error={loginFormik.touched.password}
              errorMessage={loginFormik.errors.password}
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
          </div>
          <div className={cx("button-remember-me")}>
            <div className={cx("checkbox-wrapper-28")}>
              <input
                id="tmp-28"
                type="checkbox"
                className={cx("promoted-input-checkbox")}
              />
              <svg>
                <use xlinkHref="#checkmark-28" />
              </svg>
              <label htmlFor="tmp-28">Remember me</label>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "none" }}
              >
                <symbol id="checkmark-28" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    fill="none"
                    d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                  ></path>
                </symbol>
              </svg>
            </div>
          </div>
          <ButtonStyles
            fullWidth
            disabled={false}
            backgroundColor="#bae5fb"
            size="large"
            text="sign in"
            type="submit"
          />
        </form>
        <p className={cx("text-helper")}>
          Dont have an account ? <Link to="/auth/register">Sign up here</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
