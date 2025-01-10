import { Background } from './background';
import { Box } from '@mui/material';
import { Header } from './header';
import { Main } from './main';
import styled from "styled-components";

const AuthLayoutWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  height: 100vh;
`;

type PropsStyles = {
  children: React.ReactNode;
};

export const AuthenticationLayout = (props:PropsStyles) => {
    return (
        <AuthLayoutWrapper>
          <Background  />
          <Box
            component="div"
            sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#ffffff"}}
          >
            <Header />
            <Main>{props.children}</Main>
          </Box>
        </AuthLayoutWrapper>
      );
}
