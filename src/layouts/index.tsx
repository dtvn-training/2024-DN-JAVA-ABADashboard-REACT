import { Header } from "./header"
import { Main } from "./main"
import { SideBar } from "./sidebar"

type PropsStyles={
    children: React.ReactNode
}

export const ABADashboardLayout= (props: PropsStyles)=>{
    return (
        <>
            <Header />
            <SideBar/>
            <Main>{props.children}</Main>
        </>
    )
}