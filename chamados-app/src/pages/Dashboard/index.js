import { useEffect, useState } from "react";
import "./index.css";

import Wrapper from "../../components/Wrapper";
import Main from "../../components/Main";
import Title from "../../components/Title";
import { FiHome } from "react-icons/fi";

export default function Dashboard(){
    const [ticketId, setTicketId] = useState(null);
    const [ticketClient, setTicketClient] = useState(null);
    const [ticketStatus, setTicketStatus] = useState('Pending');
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

    const handleTicket = (e) => {
        e.preventDefault();
        setToEdit(!toEdit);
    }

    const handleTickets = (e) => {
        e.preventDefault();

        setTickets([]);
    }

    useEffect(() => {
        setTicketId(1);
        setTicketClient('Empresa1');
        setClients(['Empresa1', 'Empresa2']);

        console.log(ticketId, ticketClient);
    }, [toEdit, ticketClient, ticketId])

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
                    className=" cta__sect dashboard__sect"
                >
                    <button
                        className="new-ticket__btn cta__btn btn"
                    >
                        Criar novo chamado
                    </button>
                    <button
                        className="get-tickets__btn cta__btn btn"
                        onClick={e => handleTickets(e)}
                    >
                        Atualizar chamados pendentes
                    </button>
                </section>
                <form
                    className="form form__sect ticket__form"
                    onSubmit={e => handleTicket(e)}
                >
                    <section
                        className="client__sect"
                    >
                        <select>
                            <option
                                value=""
                            >
                                Selecione um cliente
                            </option>
                            { clients.length > 0 && clients.map(client => (
                                <option
                                    key={client}
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
                            `${ toEdit ? 'edit__btn' : 'create__btn' } cta__btn btn`
                        }
                        onClick={e => handleTicket(e)}
                    >
                        {toEdit ? 'Editar chamado' : 'Criar chamado'}
                    </button>
                </form>
                <ul
                    className="dashboard__list"
                >
                    {tickets.length === 0 ? (
                        <li>Você não possui chamados pendentes.</li>
                    ) : (
                        tickets.map((ticket, index) => (
                            <li
                                key={index}
                            >
                                <p>
                                    <strong>ID:</strong>
                                    <span>{ticket.ticketId}</span>
                                </p>
                                <p>
                                    <strong>Cliente:</strong>
                                    <span>{ticket.ticketClient}</span>
                                </p>
                                <p>
                                    <strong>Status:</strong>
                                    <span>{ticket.ticketStatus}</span>
                                </p>
                            </li>
                        ))
                    )}
                </ul>
            </article>
        </Main>
    </Wrapper>
    );
}