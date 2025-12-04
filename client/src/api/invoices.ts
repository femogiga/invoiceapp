import apiService from "@/utils/apiService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"




export const useFetchAllInvoices = () => {
    const { isPending, data, error } = useQuery({
        queryKey: ['invoices'],
        // queryFn: () => fetch("http://localhost:7000/invoices").then(res=>res.json()).catch//(error=>console.error(error))
        queryFn: () => apiService.get('/invoices')
    })
    return { isInvoicePaneding: isPending, invoiceData: data, error }
}


export const useFetchInvoicesById = (id: string) => {
    const { isPending, data, error } = useQuery({
        queryKey: ['invoices', id],

        queryFn: () => apiService.get(`/invoices/${id}`)
    })
    return { isInvoicePending: isPending, invoiceByIdData: data, error }
}


export const useCreateInvoice = () => {
    const queryClient = useQueryClient()
    const { mutate, isSuccess, isError, error, reset } = useMutation({
        mutationKey:['createInvoice'],
        mutationFn: (data) => apiService.post('/invoices/create',data).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
        },
        onError: (error) => console.log(error)

    })
    return { mutate, isSuccess, isError, error, reset }
}
