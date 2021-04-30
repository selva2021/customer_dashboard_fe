
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let customerModalStore = (set) => ({
  show: false,
  customer:{},
  toggleShowModel: (status,customer) => set((state) => ({ show: status,customer:customer})),
  setCustomer:(status,customer) => set((state) => ({ customer})),
})

let customerStore = (set) => ({
  customers: [],
  addCustomer: (customer) =>
    set((state) => ({ customers: [...customer] })),
})



customerModalStore = devtools(customerModalStore)
customerModalStore = persist(customerModalStore, { name: 'user_settings' })

customerStore = devtools(customerStore)

export const useCustomerModalStore = create(customerModalStore)
export const useCustomerStore = create(customerStore)