import "./global-styles.module.scss";

type PropsStyles={
    children: React.ReactNode
}

const GlobalStyles= (props: PropsStyles)=>{
    return <div>{props.children}</div>
}

export default GlobalStyles;