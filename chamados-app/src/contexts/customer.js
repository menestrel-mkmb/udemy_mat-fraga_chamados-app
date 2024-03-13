import { firebaseDb } from "../services/firebaseConfig";
import {
    collection,
    addDoc,
    getDocs
} from "firebase/firestore";

import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CustomerContext = createContext({});

export default function CustomerProvider({ children }){
    const [customerName, setCustomerName] = useState('');
    const [customerCnpj, setCustomerCnpj] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customer, setCustomer] = useState(null);

    const [customers, setCustomers] = useState([]);

    const customerCollection = collection(firebaseDb, 'customers');

    const clearCustomer = () => {
        setCustomer(null);
        setCustomerName('');
        setCustomerCnpj('');
        setCustomerAddress('');
    }

    const getCustomers = async () => {
        await getDocs(customerCollection)
        .then( (customer) => {
            setCustomers([]);
            let cus = [];
            customer.forEach( (customer) => {
                cus.push({
                    id: customer.id,
                    customerName: customer.data().customerName,
                    customerCnpj: customer.data().customerCnpj,
                    customerAddress: customer.data().customerAddress
                })
            });
            setCustomers(cus);

            return cus;
        })
        .catch( () => {
            return [];
        })
    }

    const addCustomer = async (name, cnpj, address) => {

        await addDoc(customerCollection, {
            customerName: name,
            customerCnpj: cnpj,
            customerAddress: address
        })
        .then(() => {
            toast.success("Cliente adicionado com sucesso");
        })
        .catch( () => {
            clearCustomer();
            toast.error("Erro ao adicionar cliente");
        })
    }

    return(
        <CustomerContext.Provider
            value={{
                ticketId: !!customer,

                customerName, setCustomerName,
                customerCnpj, setCustomerCnpj,
                customerAddress, setCustomerAddress,

                customer, addCustomer,

                customers, getCustomers,
            }}
        >
            { children }
        </CustomerContext.Provider>
    )
}