import { useEffect, useState } from "react";
import "./index.css";

import Wrapper from "../../components/Wrapper";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { FiHome, FiEdit2, FiDelete } from "react-icons/fi";

export default function Dashboard(){
    const [ticketId, setTicketId] = useState(null);
    const [ticketClient, setTicketClient] = useState(null);
    const [ticketStatus, setTicketStatus] = useState('Pending');
    const [toggleForm, setToggleForm] = useState(false);
    const [toEdit, setToEdit] = useState(false);

    const [clients, setClients] = useState([]);
    const [tickets, setTickets] = useState([
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

    const handleForm = (e) => {
        e.preventDefault();

        setToggleForm(!toggleForm);
        setToEdit(false);
    }

    const addTicket = (e) => {
        e.preventDefault();

        setTickets([
            ...tickets,
            {
                ticketId: tickets.length + 1,
                ticketClient: ticketClient,
                ticketStatus: ticketStatus
            }
        ])
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

        setTickets(resultTickets);
        setToEdit(false);
    }

    const toEditTicket = (e, index) => {
        e.preventDefault();

        setTicketId(tickets[index].ticketId);
        setTicketClient(tickets[index].ticketClient);
        setTicketStatus(tickets[index].ticketStatus);
        
        setToggleForm(true);
        setToEdit(true);
    }

    const deleteTicket = (e, index) => {
        e.preventDefault();

        tickets.splice(index, 1);
        setTickets([...tickets]);
    }

    const handleTickets = (e) => {
        e.preventDefault();

        setTickets([]);
    }

    useEffect(() => {
        setClients(['Empresa1', 'Empresa2']);
    }, [setClients]);

    return(
    <Wrapper
        className="wrapper"
    >
        <Main
            classes="main main__sect"
        >
            <Title>
                <FiHome size={24} />
                Painel de Chamados
            </Title>
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
                        className="get-tickets__btn cta__btn btn"
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
                        <select
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
                    <button
                        className={
                            `${ toEdit ? 'edit__btn' : 'create__btn' } form__btn btn`
                        }
                        onClick={e => toEdit ? editTicket(e) : addTicket(e)}
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