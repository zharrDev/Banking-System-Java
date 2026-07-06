import { apiPost } from './api'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/types'
export const authService={ login:(d:LoginRequest)=>apiPost<LoginResponse>('/auth/login',d), register:(d:RegisterRequest)=>apiPost('/auth/register',{email:d.email,password:d.password,fullName:d.fullName,name:d.fullName,username:d.email.split('@')[0],role:'USER'}) }
