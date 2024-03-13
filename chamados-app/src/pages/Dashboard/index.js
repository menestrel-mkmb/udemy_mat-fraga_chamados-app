import { useContext, useEffect, useState } from "react";
import "./index.css";

import { CustomerContext } from "../../contexts/customer";

import Wrapper from "../../components/Wrapper";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { FiHome, FiEdit2, FiDelete, FiPenTool } from "react-icons/fi";

export default function Dashboard(){
    const [ticketId, setTicketId] = useState(null);
    const [ticketClient, setTicketClient] = useState(null);
    const [subject, setSubject] = useState(null);
    const [ticketStatus, setTicketStatus] = useState('Pending');
    const [ticketMessage, setTicketMessage] = useState('');
    const [initialLoad, setInitialLoad] = useState(true);

    const [toggleForm, setToggleForm] = useState(false);
    const [toEdit, setToEdit] = useState(false);

    const [clients, setClients] = useState([]);
    const subjects= ['Suporte', 'Visita técnica', 'Financeiro'];
    const [tasks, setTasks] = useState([]);

    const { customers, getCustomers } = useContext(CustomerContext);

    const handleForm = (e) => {
        e.preventDefault();

        setToggleForm(!toggleForm);
        toEdit && setToEdit(false);
    }

    const addTicket = (e) => {
        e.preventDefault();

        if(
            !ticketClient ||
            ticketClient === '' ||
            !subject ||
            subject === '' ||
            !ticketMessage ||
            ticketMessage === ''
        ){
            console.log("Por favor, preencha todos os campos");
            return;
        }

        setTasks([
            ...tasks,
            {
                ticketId: tasks.length + 1,
                ticketClient: ticketClient,
                ticketStatus: ticketStatus
            }
        ]);
        setTicketMessage('');

        setToggleForm(false);
    }

    const editTicket = (e) => {
        e.preventDefault();
        const resultTickets = tasks.map((t) => {
            if(t.ticketId === ticketId){
                t.ticketId = ticketId;
                t.ticketClient = ticketClient;
                t.ticketStatus = ticketStatus;
            }
            return t;
        });

        setTasks(resultTickets);
        setToEdit(false);
        setToggleForm(false);
    }

    const toEditTicket = (e, index) => {
        e.preventDefault();

        setToggleForm(true);
        setToEdit(true);

        setTicketId(tasks[index].ticketId);
        setTicketClient(tasks[index].ticketClient);
        setTicketStatus(tasks[index].ticketStatus);
    }

    const deleteTicket = (e, index) => {
        e.preventDefault();

        tasks.splice(index, 1);
        setTasks([...tasks]);
    }

    const handleTickets = (e) => {
        e.preventDefault();

        setTasks([]);
    }

    useEffect(() => {
        getCustomers();
        customers.forEach(customer => {
            if(customer.customerName && !clients.includes(customer.customerName)){
                setClients([
                    ...clients,
                    customer.customerName
                ]);
            }
        });
    }, [clients, customers, getCustomers]);

    useEffect(() => {
        if(initialLoad) {
            setTasks([
                {
                    ticketId: 1,
                    ticketClient: 'Empresa1',
                    ticketStatus: 'Pending',
                }, {
                    ticketId: 2,
                    ticketClient: 'Empresa2',
                    ticketStatus: 'Pending',
                }
            ]);
            setInitialLoad(false);
        }
    }, [
        initialLoad, setInitialLoad,
        setTasks,
    ]);

    return(
    <Wrapper
        className="wrapper"
    >
        <Main
            classes="main main__sect"
        >
            {toggleForm ? 
            (<Title>
                <FiPenTool size={24} />
                {toEdit ? "Editar " : "Criar novo "} Chamado
            </Title>               
            ) :
            (<Title>
                <FiHome size={24} />
                Painel de Chamados
            </Title>
            )}
            <article
                className="dashboard dashboard__artc"
            >
                <section
                    className="cta__sect"
                >
                    <button
                        className="new-ticket__btn feature-btn cta__btn btn"
                        onClick={e => handleForm(e)}
                    >
                        { toggleForm ? 'Esconder formulário' : 'Criar novo chamado' }
                    </button>
                    <button
                        className="get-tasks__btn cta__btn btn"
                        onClick={e => handleTickets(e)}
                    >
                        Atualizar chamados pendentes
                    </button>
                </section>
                {toggleForm && (
                <form
                    className="form form__sect ticket__form"
                    onSubmit={e => toEdit ? editTicket(e) : addTicket(e)}
                >
                    <section
                        className="client__sect"
                    >
                        <label
                            className="client__label"
                            htmlFor="client"
                        >
                            Cliente: 
                        </label>
                        <select
                            className="client__select"
                            onChange={e => setTicketClient(e.target.value)}
                        >
                            <option
                                value=""
                            >
                                Selecione um cliente
                            </option>
                            { clients.length > 0 && clients.map( (client, index) => (
                                <option
                                    key={index}
                                    value={client}
                                >
                                    {client}
                                </option>
                            ))}
                        </select>
                    </section>
                    <section
                        className="subject subject__sect"
                    >
                        <label
                            className="subject__label"
                            htmlFor="subject"
                        >
                            Assunto: 
                        </label>
                        <select
                            className="subject__select"
                            onChange={e => setSubject(e.target.value)}
                        >
                            <option
                                value=""
                            >
                                Selecione um assunto
                            </option>
                            { subjects.length > 0 && subjects.map( (subject, index) => (
                                <option
                                    key={index}
                                    value={subject}
                                >
                                    {subject}
                                </option>
                            ))}
                        </select>
                    </section>
                    { toEdit && (
                        <section
                            className="status__sect"
                        >
                            <select
                                value={ticketStatus}
                                onChange={e => setTicketStatus(e.target.value)}
                            >
                                <option
                                    value="Pending"
                                >
                                    Pendente
                                </option>
                                <option
                                    value="Finished"
                                >
                                    Finalizado
                                </option>
                                <option
                                    value="Canceled"
                                >
                                    Cancelado
                                </option>
                            </select>
                        </section>
                    )}
                    <section
                        className="message__sect"
                    >
                        <label
                            className="message__label"
                            htmlFor="message"
                        >
                            Mensagem: 
                        </label>
                        <textarea
                            className="message__textarea"
                            onChange={e => setTicketMessage(e.target.value)}
                            value={ticketMessage}
                            type="text"
                            placeholder="Descreva seu problema"
                        ></textarea>
                    </section>
                    <button
                        className={
                            `${ toEdit ? 'edit__btn' : 'create__btn' } form__btn btn`
                        }
                        onClick={e => toEdit ? editTicket(e) : addTicket(e)}
                        type="submit"
                    >
                        {toEdit ? 'Editar chamado' : 'Criar chamado'}
                    </button>
                </form>
                )}
                
            </article>
            <section
                className="ticket-list ticket-list__sect"
            >
                <table
                    className="ticket-list__table ticket-list__table"
                >
                <thead
                    className="ticket-list__header ticket-list__thead"
                >
                    <tr>
                        <th
                            className="ticket-list__th"
                            scope="col"
                        >
                            ID
                        </th>
                        <th
                            className="ticket-list__th"
                            scope="col"
                        >
                            Cliente
                        </th>
                        <th
                            className="ticket-list__th"
                            scope="col"
                        >
                            Status
                        </th>
                        <th
                            className="ticket-list__th"
                            scope="col"
                        >
                            Ações
                        </th>
                    </tr>
                </thead>
                {tasks.length === 0 ? (
                    <tbody>
                        <tr>
                            <td>Você não possui chamados pendentes.</td>
                        </tr>
                    </tbody>
                ) : (<tbody>
                    {
                        (tasks.map((ticket, index) => (
                        <tr key={index}
                            className="ticket-list__tr"
                        >
                            <td
                                className="ticket-list__td"
                                data-label="ID"
                            >
                                
                                <span>{ticket.ticketId}</span>
                            </td>
                            <td
                                className="ticket-list__td"
                                data-label="Cliente"
                            >
                                <span>{ticket.ticketClient}</span>
                            </td>
                            <td
                                className="ticket-list__td"
                                data-label="Status"
                            >
                                <span>{ticket.ticketStatus}</span>
                            </td>
                            <td
                                className="ticket-list__td"
                                data-label="Ações"
                            >
                                <button
                                    className="edit__btn ticket-list__btn table__btn"
                                    onClick={e => toEditTicket(e, index)}
                                >
                                    <FiEdit2 size={16} />
                                </button>
                                <button
                                    className="delete__btn ticket-list__btn table__btn"
                                    onClick={e => deleteTicket(e, index)}
                                >
                                    <FiDelete size={16} />
                                </button>
                            </td>
                        </tr>)))
                    }
                    </tbody>)}
                </table>
            </section>
        </Main>
    </Wrapper>
    );
}