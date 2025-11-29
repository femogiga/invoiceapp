import apiService from "@/utils/apiService"
import { useQuery } from "@tanstack/react-query"




export const useFetchAllInvoices = () => {
    const { isPending,data,error } = useQuery({
        queryKey: ['invoices'],
        // queryFn: () => fetch("http://localhost:7000/invoices").then(res=>res.json()).catch//(error=>console.error(error))
        queryFn:()=>apiService.get('/invoices')
    })
    return {isInvoicePaneding:isPending ,invoiceData:data , error}
}


export const useFetchInvoicesById = (id:string) => {
    const { isPending, data, error } = useQuery({
        queryKey: ['invoices',id],

        queryFn: () => apiService.get(`/invoices/${id}`)
    })
    return { isInvoicePending: isPending, invoiceByIdData: data, error }
}
