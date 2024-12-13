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
      <Box sx={{ marginLeft: "230px"}}>
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              backgroundColor: "#1976d2",
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
