import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { CheckLoginAction } from "../redux/authentication-slice/authentication-slice";

type ProtectedRouterProps = {
  children: React.ReactNode;
};

const ProtectedRouter = (props: ProtectedRouterProps) => {
  const dispatch = useAppDispatch();
  const { isLogined } = useAppSelector((state) => state.authentication);

  useEffect(() => {
    if (!isLogined) {
      dispatch(CheckLoginAction());
    }
  }, [dispatch, isLogined]);

  return <>{props.children}</>;
};

export default ProtectedRouter;
