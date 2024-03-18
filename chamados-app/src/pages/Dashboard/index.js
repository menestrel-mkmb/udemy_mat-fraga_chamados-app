import { useContext, useEffect, useState } from "react";
import "./index.css";

import { CustomerContext } from "../../contexts/customer";

import Wrapper from "../../components/Wrapper";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { FiHome, FiEdit2, FiDelete, FiPenTool } from "react-icons/fi";
import { TicketsContext } from "../../contexts/tickets";

export default function Dashboard(){
    const [ticketId, setTicketId] = useState(null);
    const [ticketClient, setTicketClient] = useState(null);
    const [subject, setSubject] = useState(null);
    const [ticketStatus, setTicketStatus] = useState('Pending');
    const [ticketMessage, setTicketMessage] = useState('');
    const [initialLoad, setInitialLoad] = useState(true);

    const [toggleForm, setToggleForm] = useState(false);
    const [toEdit, setToEdit] = useState(false);

    const subjects= ['Suporte', 'Visita técnica', 'Financeiro'];
    const [tasks, setTasks] = useState([]);

    const { customers, getCustomers } = useContext(CustomerContext);
    const { tickets, getTickets, addTicket } = useContext(TicketsContext);

    const handleForm = (e) => {
        e.preventDefault();

        setToggleForm(!toggleForm);
        toEdit && setToEdit(false);
    }

    const addTask = async (e) => {
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

        await addTicket(ticketClient, ticketStatus, Date.now())
        .then(() => {
            setTicketClient('');
            setSubject('');
        })
        setTicketMessage('');

        setToggleForm(false);
    }

    const editTicket = (e) => {
        e.preventDefault();
        const resultTickets = tickets.map((t) => {
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

        setTicketId(tickets[index].id);
        setTicketClient(tickets[index].ticketClient);
        setTicketStatus(tickets[index].ticketStatus);
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
        if(initialLoad) {
            getCustomers();
            getTickets();
            setInitialLoad(false);
        }
    }, [
        initialLoad, setInitialLoad,
        getCustomers,
        getTickets,
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
                    onSubmit={e => toEdit ? editTicket(e) : addTask(e)}
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
                            { customers.length > 0 && customers.map( (customer, index) => (
                                <option
                                    key={index}
                                    value={customer.customerName}
                                >
                                    {customer.customerName}
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
                {tickets.length === 0 ? (
                    <tbody>
                        <tr>
                            <td>Você não possui chamados pendentes.</td>
                        </tr>
                    </tbody>
                ) : (<tbody>
                    {
                        (tickets.map((ticket, index) => (
                        <tr key={index}
                            className="ticket-list__tr"
                        >
                            <td
                                className="ticket-list__td"
                                data-label="ID"
                            >
                                
                                <span>{ticket.id}</span>
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