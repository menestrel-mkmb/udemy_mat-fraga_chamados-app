import { firebaseDb } from "../services/firebaseConfig";
import { collection,
    addDoc,
    //doc, getDoc, updateDoc
} from "firebase/firestore";

import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CustomerContext = createContext({});

export default function CustomerProvider({ children }){
    const [customerName, setCustomerName] = useState('');
    const [customerCnpj, setCustomerCnpj] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customer, setCustomer] = useState(null);

    const customerCollection = collection(firebaseDb, 'customers');

    const clearCustomer = () => {
        setCustomer({});
        setCustomerName('');
        setCustomerCnpj('');
        setCustomerAddress('');
    }

    const getCustomer = async () => {
        
        // const docRef = getDoc(doc(customerCollection, ));

        // const customer = await getDoc(docRef);
        alert('GetCostumer');
    }

    const addCustomer = async (name, cnpj, address) => {
        await addDoc(customerCollection, {
            customerName: name,
            customerCnpj: cnpj,
            customerAddress: address
        })
        .then(() => {
            setCustomer({
                customerName: name,
                customerCnpj: cnpj,
                customerAddress: address
            });

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

                customer, setCustomer,

                getCustomer, addCustomer
            }}
        >
            { children }
        </CustomerContext.Provider>
    )
}