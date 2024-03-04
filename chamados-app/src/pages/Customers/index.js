import { useState } from "react";
import "./index.css";

import { useContext } from "react";
import { CustomerContext } from "../../contexts/customer";

import Wrapper from "../../components/Wrapper";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { FiUser } from "react-icons/fi";

export default function Customers(){
    const [customerName, setCustomerName] = useState('');
    const [customerCnpj, setCustomerCnpj] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    const { addCustomer } = useContext(CustomerContext);

    const clearStates = () => {
        setCustomerName('');
        setCustomerCnpj('');
        setCustomerAddress('');
    }

    const handleNewClient = async (e) => {
        e.preventDefault();

        if(customerName !== ''
            && customerCnpj !== ''
            && customerAddress !== ''
        ){
            await addCustomer(
                customerName,
                customerCnpj,
                customerAddress
            )
            .then(() => {
                clearStates();
            })
        }
    }

    return(
        <Wrapper
        className="wrapper"
    >
        <Main
            classes="main main__sect"
        >
            <Title>
                <FiUser size={24} />
                Informações do Cliente
            </Title>
            <form
                className="customers__form"
                onSubmit={e=>handleNewClient(e)}
            >
                <section
                    className="inp__sect customer-name customer-name__sect"
                >
                    <label
                        className="customer-name__lbl lbl"
                        htmlFor="customer-name"
                    >
                        Nome da empresa
                    </label>
                    <input
                        className="customer-name__inp inp"
                        type="text"
                        name="customer-name"
                        placeholder="Nome do cliente"
                        required
                        value={customerName}
                        onChange={e=>setCustomerName(e.target.value)}
                    />
                </section>
                <section
                    className="inp__sect cnpj cnpj__sect"
                >
                    <label
                        className="cnpj__lbl lbl"
                        htmlFor="cnpj"
                    >
                        CNPJ
                    </label>
                    <input
                        className="cnpj__inp inp"
                        type="text"
                        name="cnpj"
                        placeholder="CNPJ do cliente"
                        //pattern="\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}"
                        required
                        value={customerCnpj}
                        onChange={e=>setCustomerCnpj(e.target.value)}
                    />
                </section>
                <section
                    className="inp__sect address address__sect"
                >
                    <label
                        className="address__lbl lbl"
                        htmlFor="address"
                    >
                        Endereço Físico
                    </label>
                    <input
                        className="address__inp inp"
                        type="text"
                        name="address"
                        placeholder="Endereço do cliente"
                        required
                        value={customerAddress}
                        onChange={e=>setCustomerAddress(e.target.value)}
                    />
                </section>
                <button
                    className="form__btn feature-btn"
                    type="submit"
                >
                    Salvar
                </button>
            </form>
        </Main>
    </Wrapper>);
}