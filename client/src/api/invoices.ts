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
        queryKey: ['invoicesById', id],

        queryFn: () => apiService.get(`/invoices/${id}`),
    })
    return { isInvoicePending: isPending, invoiceByIdData: data, error }
}


export const useCreateInvoice = () => {
    const queryClient = useQueryClient()
    const { mutate, isSuccess, isError, error, reset } = useMutation({
        mutationKey: ['createInvoice'],
        mutationFn: (data) => apiService.post('/invoices/create', data).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
        },
        onError: (error) => console.log(error)

    })
    return { mutate, isSuccess, isError, error, reset }
}



export const useUpdateInvoice = (id) => {
    const queryClient = useQueryClient()
    const { mutate, isSuccess, isError, error, reset, isPending } = useMutation({
        mutationKey: ['updateInvoice'],
        mutationFn: (data) => apiService.put(`/invoices/${id}/edit`, data).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })
        },
        onError: (error) => console.log(error)

    })
    return { mutate, isSuccess, isError, error, reset, isPending }
}


export const useDeleteInvoiceProduct = (invoiceId,productId) => {
    const queryClient = useQueryClient()
    const { mutate, isSuccess, isError, error, reset, isPending } = useMutation({
        mutationKey: ['deleteproductfromInvoice'],
        mutationFn: () => apiService.remove(`/invoices/${invoiceId}/products/${productId}/delete`).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoicesById'] })
        },
        onError: (error) => console.log(error)

    })
    return { deleteProductMutate:mutate, isSuccess, isError, error, reset, isPending }
}


export const useDeleteInvoice = () => {
    const queryClient = useQueryClient()

    const { mutate, isSuccess, isError, error, reset, isPending } = useMutation({
        mutationKey: ['deleteInvoice'],
        mutationFn: (invoiceId) => apiService.remove(`/invoices/${invoiceId}`).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoices'] })

        }
    })
    return { mutate, isSuccess, isError, error, reset, isPending }

}


export const useSetInvoiceStatus = (invoiceId:string) => {
    const queryClient = useQueryClient()

    const { mutate, isSuccess, isError, error, reset, isPending } = useMutation({
        mutationKey: ['setInvoiceStatus'],
        mutationFn: (data) => apiService.put(`/invoices/${invoiceId}`,data).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invoicesById'] })

        }
    })
    return { updateStatusMutation:mutate, isSuccess, isError, error, reset, isPending }

}







// {
//     "invoiceData": {
//         "term": "7",
//             "description": "Internet",
//                 "invoiceDate": "2025/11/11"
//     },
//     "customerData": {
//         "firstname": "Tom",
//             "lastname": "Mark",
//                 "email": "tommark@mail.com"
//     },
//     "addressData": {
//         "street": "1414 Jones av",
//             "city": "Tokyo",
//                 "postcode": "TTK100",
//                     "country": "Japan"
//     },
//     "supplierData": {
//         "street": "14 Good wav",
//             "city": "Rio de Janeiro",
//                 "postcode": "BT10 E10",
//                     "country": "Brazil"
//     },
//     "productGroup": [
//         {
//             "name": "Web Design",
//             "price": 1000.00,
//             "quantity": 4
//         },
//         {
//             "name": "Hosting",
//             "price": 200.00,
//             "quantity": 12
//         },
//         {
//             "name": "Domain",
//             "price": 105.00,
//             "quantity": 1
//         }
//     ]
