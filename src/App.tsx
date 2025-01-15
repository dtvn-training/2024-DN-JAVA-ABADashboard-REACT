import GlobalStyles from "./components/global-styles/global-styles";
import Router from "./routers/section";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <GlobalStyles>
      <Router />
      <ToastContainer autoClose={3000} position="top-right" />
    </GlobalStyles>
  );
}

export default App;
