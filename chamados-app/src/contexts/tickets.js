import { createContext, useState } from "react";

import { firebaseDb } from "../services/firebaseConfig";
import {
    doc,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

import { toast } from "react-toastify";

export const TicketsContext = createContext({});

export default function TicketsProvider({ children }){
    const [ticketId, setTicketId] = useState(null);
    const [ticketClient, setTicketClient] = useState(null);
    const [ticketStatus, setTicketStatus] = useState('Pendente');
    const [ticketSubject, setTicketSubject] = useState(null);
    const [ticketMessage, setTicketMessage] = useState(null);
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
                    ticketSubject: ticket.data().ticketSubject,
                    ticketMessage: ticket.data().ticketMessage,
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

    const getPendingTickets = async () => {
        await getDocs(ticketCollection)
        .then( (ticket) => {
            let tic = [];
            ticket.forEach( (ticket) => {
                if(ticket.data().ticketStatus === 'Pendente'){
                    tic.push({
                        id: ticket.id,
                        ticketClient: ticket.data().ticketClient,
                        ticketStatus: ticket.data().ticketStatus,
                        ticketDate: ticket.data().ticketDate
                    })
                }
            });
            setTickets(tic);
            return tic;
        })
        .catch( (error) => {
            console.log(error);
            toast.error("Erro ao buscar chamados");
            return [];
        })
    }

    const addTicket = async (client, status, subject, message, date) => {
        await addDoc(ticketCollection, {
            ticketClient: client,
            ticketStatus: status,
            ticketSubject: subject,
            ticketMessage: message,
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

    const deleteTicket = async (id) => {
        const docRef = doc(ticketCollection, id);

        await deleteDoc(docRef)
        .then(() => {
            toast.success("Chamado deletado com sucesso");
        })
        .catch( () => {
            toast.error("Erro ao deletar chamado");
        })
    }

    const updateTicket = async(id, client, status, subject, message, date) => {
        const docRef = doc(ticketCollection, id);

        await updateDoc(docRef, {
            ticketClient: client,
            ticketStatus: status,
            ticketSubject: subject,
            ticketMessage: message,
            ticketDate: date
        })
        .then(() => {
            toast.success("Chamado atualizado com sucesso");
        })
        .catch( () => {
            toast.error("Erro ao atualizar chamado");
        })
    }

    const clearCurrentTicket = () => {
        setTicketId(null);
        setTicketClient(null);
        setTicketStatus('Pendente');
        setTicketSubject(null);
        setTicketMessage(null);
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
                ticketSubject,
                ticketMessage,
                ticketDate,

                tickets,

                clearCurrentTicket,
                clearLocalList,

                addTicket, getTickets,
                deleteTicket, updateTicket,

                getPendingTickets
            }}
        >
            { children }
        </TicketsContext.Provider>
    )
}