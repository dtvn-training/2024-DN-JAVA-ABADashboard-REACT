type PropsStyles= {
    children: React.ReactNode
}

const Main= (props: PropsStyles)=>{
    return (
        <>
            {props.children}
        </>
    )
}

export default Main;