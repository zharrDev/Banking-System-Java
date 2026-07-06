import axios, { AxiosError } from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
export class ApiError extends Error { status:number; data:unknown; constructor(m:string,s:number,d?:unknown){super(m);this.status=s;this.data=d} }
const api=axios.create({baseURL:API_BASE_URL,timeout:30000,headers:{'Content-Type':'application/json'}})
api.interceptors.request.use(c=>{const t=localStorage.getItem('auth_token'); if(t) c.headers.Authorization=`Bearer ${t}`; return c})
api.interceptors.response.use(r=>r,(e:AxiosError)=>{ if(e.response?.status===401){localStorage.removeItem('auth_token');localStorage.removeItem('auth_user'); if(location.pathname!=='/login') location.href='/login'} throw new ApiError((e.response?.data as any)?.message || e.message || 'Error', e.response?.status ?? 0, e.response?.data)})
export const apiGet = async <T>(u:string)=> (await api.get<T>(u)).data
export const apiPost = async <T>(u:string,d?:unknown)=> (await api.post<T>(u,d)).data
export default api
