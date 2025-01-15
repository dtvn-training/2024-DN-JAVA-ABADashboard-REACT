import { Helmet } from "react-helmet-async";
import { PreviewView } from "../sections/preview/view";

const PreviewPage = () => {
  return (
    <>
      <Helmet>
        <title>Preview page</title>
      </Helmet>
      <PreviewView />
    </>
  );
};

export default PreviewPage;
