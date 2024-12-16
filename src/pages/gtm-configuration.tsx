import { Helmet } from "react-helmet-async";
import { GtmConfigurationView } from "../sections/gtm-configuration/view";

const GtmConfigurationPage = () => {
  return (
    <>
      <Helmet>
        <title>GTM configuration page</title>
      </Helmet>
      <GtmConfigurationView />
    </>
  );
};

export default GtmConfigurationPage;
