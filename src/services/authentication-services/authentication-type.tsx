export interface LoginRequest{
    email: string;
    password: string;
}

type User= {
    id: number;
    email: string;
    role: string;
    fullName: string;
}

export interface LoginResponse{
    accessToken: string;
    user: User;
}