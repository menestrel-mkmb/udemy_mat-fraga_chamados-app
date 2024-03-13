import { createContext, useState } from "react";

import { firebaseDb } from "../services/firebaseConfig";
import {
    collection,
    addDoc,
    getDocs
} from "firebase/firestore";

import { toast } from "react-toastify";

export const TicketsContext = createContext({});

export default function TicketsProvider({ children }){
    const [ticketId, setTicketId] = useState(null);
    const [ticketClient, setTicketClient] = useState(null);
    const [ticketStatus, setTicketStatus] = useState('Pending');
    const [ticketDate, setTicketDate] = useState('');
    
    const [tickets, setTickets] = useState([]);

    const ticketCollection = collection(firebaseDb, 'tickets');

    const getTickets = async () => {
        await getDocs(ticketCollection)
        .then( (ticket) => {
            let tic = [];
            ticket.forEach( (ticket) => {
                tic.push({
                    id: ticket.id,
                    ticketClient: ticket.data().ticketClient,
                    ticketStatus: ticket.data().ticketStatus,
                    ticketDate: ticket.data().ticketDate
                })
            });
            setTickets(tic);
        })
        .catch( (error) => {
            console.log(error);
            toast.error("Erro ao buscar chamados");
        })
    }

    const addTicket = async (client, status, date) => {
        await addDoc(ticketCollection, {
            ticketClient: client,
            ticketStatus: status,
            ticketDate: date
        })
        .then(() => {
            clearCurrentTicket();
            toast.success("Chamado adicionado com sucesso");
        })
        .catch( () => {
            toast.error("Erro ao adicionar chamado");
        })
    }

    const clearCurrentTicket = () => {
        setTicketId(null);
        setTicketClient(null);
        setTicketStatus('Pending');
        setTicketDate('');
    }

    const clearLocalList = () => {
        setTickets([]);
    }

    return(
        <TicketsContext.Provider
            value={{
                ticketId,
                ticketClient,
                ticketStatus,
                ticketDate,

                tickets,

                clearCurrentTicket,
                clearLocalList,

                addTicket, getTickets
            }}
        >
            { children }
        </TicketsContext.Provider>
    )
}