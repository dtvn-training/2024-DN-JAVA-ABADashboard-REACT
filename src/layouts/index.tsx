import { Header } from "./header";
import { Main } from "./main";
import { SideBar } from "./sidebar";
import { Box, Drawer } from "@mui/material";

type PropsStyles = {
  children: React.ReactNode;
};

export const ABADashboardLayout = (props: PropsStyles) => {
  return (
    <>
      <Box sx={{ marginLeft: "285px"}}>
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              backgroundColor: "#EBF7FD",
              color: "white",
            },
          }}
        >
          <SideBar />
        </Drawer>
        <main>
          <Header />
          <Main>{props.children}</Main>
        </main>
      </Box>
    </>
  );
};
