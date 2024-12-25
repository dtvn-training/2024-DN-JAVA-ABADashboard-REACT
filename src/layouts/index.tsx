import { Header } from "./header";
import { Main } from "./main";
import { SideBar } from "./sidebar";
import { Box, Drawer } from "@mui/material";

type PropsStyles = {
  children: React.ReactNode;
};

export const ABADashboardLayout = (props: PropsStyles) => {
  return (
    <Box sx={{ marginLeft: "295px" }}>
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            backgroundColor: "#EBF7FD",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            padding: "0 10px",
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
  );
};