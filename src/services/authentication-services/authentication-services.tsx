/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { baseUrl } from "../../utils/axios-interceptor";
import { LoginRequest, LoginResponse, RegisterRequest } from "./authentication-type";


export const LoginService= async (data: LoginRequest)=>{
    try{
        const res= await axios.post(baseUrl+'/auth/login',data);
        return res.data as unknown as LoginResponse;
    }catch(error:any){
        if(error){
            throw new Error(error.message);
        }
    }
}

export const RegisterService= async (data: RegisterRequest)=>{
    try{
        const res= await axios.post(baseUrl+'/auth/register',data);
        return res.data as unknown as string;
    }catch(error:any){
        if(error){
            throw new Error(error.message);
        }
    }
}

export const LogoutService= async ()=>{
    try{
        const res= await axios.post(baseUrl+'/auth/logout',null);
        return res.data as string;
    }catch(error:any){
        if(error){
            throw new Error(error.message);
        }
    }
}