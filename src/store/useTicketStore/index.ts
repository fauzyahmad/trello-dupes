import { database, ID } from "../../api/appwrite/client";
import getTicketsGroupedByStatus from "../../helpers/getTicketsGroupedByStatus";
import { Board, Column, StatusColumn, Ticket } from "../../types/DragAndDrop";
import { create } from "zustand";

export interface DnDState {
  board: Board;
  loading: boolean;
  newTicketTitleInput: string;
  newTicketDescriptionInput: string;
  newTicketStatusInput: StatusColumn;
}

export type NewTypeTicket = "new" | "duplicate"

export interface DnDActions {
  getBoard: () => Promise<void>;
  setLoading: () => void;
  setBoardState: (board: Board) => void;
  getTicket: (id: string) => Promise<void>;
  updateTicketPositionStatus: (ticket: Ticket, status: StatusColumn) => void;
  createTicket: (createType: NewTypeTicket, title: string, description: string, status: StatusColumn) => Promise<void>;
  deleteTicket: (ticketIndex: number, ticket: Ticket, id: StatusColumn) => Promise<void>;
  updateTicketStatus: (id: string, title: string, description: string, status: StatusColumn) => Promise<void>;
  setNewTicketTitleInput: (input: string) => void;
  setNewTicketDescriptionInput: (input: string) => void;
  setNewTicketStatusInput: (input: StatusColumn) => void;
}
const useTicketStore = create<DnDState & DnDActions>((set, get) => ({
  board: {
    columns: new Map<StatusColumn, Column>(),
  },
  loading: false,
  setLoading: () => set((state) => ({ loading: !state.loading })),

  newTicketTitleInput: '',

  newTicketDescriptionInput: '',

  newTicketStatusInput: 'open',

  getBoard: async() => {
    // Your logic here
    set({ loading: true });
    const board = await getTicketsGroupedByStatus();
    set({ loading: false});
    set({ board });
  },

  getTicket: async(id) => {
    set({ loading: true });
    const response = await database.getDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, id);
    set({ newTicketTitleInput: response.title });
    set({ newTicketDescriptionInput: response.description });
    set({ newTicketStatusInput: response.status });
    set({ loading: false });
  },

  setBoardState: (board) => {
    set({ board });
  },

  setNewTicketTitleInput: (input) => {
    set({ newTicketTitleInput: input });
  },

  setNewTicketDescriptionInput: (input) => {
    set({ newTicketDescriptionInput: input });
  },

  setNewTicketStatusInput: (input) => {
    set({ newTicketStatusInput: input });
  },

  updateTicketPositionStatus: async(ticket, statusId) => {
    await database.updateDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, ticket.$id, {
      title: ticket.title,
      description: ticket.description,
      status: statusId
    });
  },

  createTicket: async(createType, title, description, status) => {
    // create placeholder loading ticket
    const columns = new Map(get().board.columns);
    const newPlaceholderTicketId = "new-ticket";

    const newPlaceholderTicket: Ticket = {
      $id: newPlaceholderTicketId,
      title: "add-ticket",
      description,
      status,
      $createdAt: new Date().toISOString(),
    }

    columns.set(status, {
      id: status,
      tickets: [...columns.get(status)!.tickets, newPlaceholderTicket]
    })

    set({
      board: {
        columns
      }
    });

    const response = await database.createDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, ID.unique(), {
      title: createType === "new" ? title : `Copy of ${title}`,
      description,
      status
    })

    // add new ticket to the column based on status

    const newTicket: Ticket = {
      $id: response.$id,
      title: createType === "new" ? title : `Copy of ${title}`,
      description,
      status,
      $createdAt: new Date().toISOString(),
    }

    columns.set(status, {
      id: status,
      tickets: [
        ...columns.get(status)!.tickets.filter((t) => t.$id !== newPlaceholderTicketId),
        newTicket
      ]
    });

    // reset the input fields
    set({
      newTicketDescriptionInput: '',
      newTicketTitleInput: '',
    })

    // update the board state
    set({
      board: {
        columns
      }
    });

  },

  updateTicketStatus: async(id, title, description, status) => {
    const columns = new Map(get().board.columns);
    // delete ticket from column
    const removedTicket = columns.get(status)?.tickets.filter((t) => t.$id !== id);
    // add ticket to the new column
    if (removedTicket) {
      columns.get(status)?.tickets.push({
        $id: id,
        title,
        description,
        status,
      });
    }
    set({
      board: {
        columns
      }
    });
    await database.updateDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, id, {
      title,
      description,
      status
    });

    set({
      newTicketDescriptionInput: '',
      newTicketTitleInput: '',
    })


  },

  deleteTicket: async(
    ticketIndex: number,
    ticket: Ticket,
    id: StatusColumn
  ) => {
    const columns = new Map(get().board.columns);

    await database.deleteDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, ticket.$id);

    // // delete ticket from column
    columns.get(id)?.tickets.splice(ticketIndex, 1);

    // update the board state
    set({
      board: {
        columns
      }
    });
  }

}));

export default useTicketStore;
