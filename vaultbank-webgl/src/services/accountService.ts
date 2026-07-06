import { apiGet, apiPost } from './api'
import type { Account, ApplyInterestResponse, DepositRequest, TransferRequest, WithdrawRequest } from '@/types'
import { normalizeAccount } from '@/utils/normalizers'
export const accountService={ getMyAccount: async()=>normalizeAccount(await apiGet('/accounts/me')), getAdminAccounts: async()=> (await apiGet<unknown[]>('/admin/accounts')).map(normalizeAccount), deposit: async(d:DepositRequest)=>normalizeAccount(await apiPost('/accounts/deposit',{amount:d.amount})), withdraw: async(d:WithdrawRequest)=>normalizeAccount(await apiPost('/accounts/withdraw',{amount:d.amount})), transfer: async(d:TransferRequest)=>normalizeAccount(await apiPost('/accounts/transfer',d)), applyInterest: ()=>apiPost<ApplyInterestResponse>('/admin/apply-interest') }
