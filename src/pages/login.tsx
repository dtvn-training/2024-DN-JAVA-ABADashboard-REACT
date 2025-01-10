import { Helmet } from 'react-helmet-async';
import { LoginView } from '../sections/login/view';

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Login page</title>
            </Helmet>
            <LoginView />
        </>
    )
}

export default LoginPage;
