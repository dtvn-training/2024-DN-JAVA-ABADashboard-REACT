import { Helmet } from "react-helmet-async";
import { RegisterView } from "../sections/register/view";

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>Register page</title>
      </Helmet>
      <RegisterView />
    </>
  );
};

export default RegisterPage;
