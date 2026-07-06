export const formatCurrency=(amount:number,currency='IDR')=>new Intl.NumberFormat('id-ID',{style:'currency',currency,minimumFractionDigits:0,maximumFractionDigits:2}).format(amount)
export const formatDate=(d:string)=>new Date(d).toLocaleDateString('id-ID',{year:'numeric',month:'short',day:'numeric'})
export const formatDateTime=(d:string)=>new Date(d).toLocaleString('id-ID',{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})
export const formatCompactNumber=(n:number)=>new Intl.NumberFormat('id-ID',{notation:'compact',maximumFractionDigits:1}).format(n)
export const maskAccountNumber=(a:string)=>{if(!a)return '-';const p=a.split('-');return p.length>=2?`***-***-${p[p.length-1]}`:`****${a.slice(-4)}`}
export const getStatusColor=(status:string)=>{const s=status.toUpperCase();if(['ACTIVE','COMPLETED'].includes(s))return{bg:'bg-pale-green-50',text:'text-pale-green-700',dot:'bg-pale-green-500'};if(s==='PENDING')return{bg:'bg-gold-50',text:'text-gold-700',dot:'bg-gold-500'};if(['INACTIVE','CANCELLED'].includes(s))return{bg:'bg-navy-50',text:'text-navy-600',dot:'bg-navy-400'};if(['FAILED','FROZEN','SUSPENDED'].includes(s))return{bg:'bg-red-50',text:'text-red-700',dot:'bg-red-500'};return{bg:'bg-gray-50',text:'text-gray-600',dot:'bg-gray-400'}}
export const generateId=()=>Math.random().toString(36).substring(2,15)+Date.now().toString(36)
