import { apiGet } from './api'
import type { Transaction } from '@/types'
import { normalizeTransaction } from '@/utils/normalizers'
export const transactionService={ getMyTransactions: async():Promise<Transaction[]>=> { const r=await apiGet<unknown[]>('/accounts/transactions'); return r.map(normalizeTransaction).sort((a,b)=> new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()) } }
