import axios from "axios";
import { baseUrl } from "../../utils/axios-interceptor";
import { LoginRequest } from "./authentication-type";


export const LoginService= async (data: LoginRequest)=>{
    try{
        const res= await axios.post(baseUrl+'/auth/login',data);
        return res.data;
    }catch(error){
        throw error;
    }
}