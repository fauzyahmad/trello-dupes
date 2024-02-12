import { database } from "../api/appwrite/client";
import { Column, StatusColumn } from "../types/DragAndDrop";

/**
 * Retrieves tickets from the database and groups them by status.
 * @returns {Promise<Board>} The board object containing columns of tickets grouped by status.
 * @throws {Error} If there is an error fetching tickets from the database.
 */
async function getTicketsGroupedByStatus(): Promise<{ columns: Map<StatusColumn, Column> }> {

  try {
    const response = await database.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID);

    const tickets = response.documents;

    console.log(tickets)

    const columns = tickets.reduce((grouped, ticket) => {
      if(!grouped.get(ticket.status)) {
        grouped.set(ticket.status, {
          id: ticket.status,
          tickets: []
        });
      }

      grouped.get(ticket.status)!.tickets.push({
        $id: ticket.$id,
        $createdAt: ticket.$createdAt,
        title: ticket.title,
        description: ticket.description,
        status: ticket.status
      });

      return grouped;

    }, new Map<StatusColumn, Column>);

    console.log('columns:', columns)

    // if column is empty, add it to the map
    const columnStatusTypes: StatusColumn[] = ['open', 'in-progress', 'completed'];
    for (const columnStatusType of columnStatusTypes) {
      if (!columns.get(columnStatusType)) {
        columns.set(columnStatusType, {
          id: columnStatusType,
          tickets: []
        });
      }
    }

    // sort columns by status
    const sortedColumns = new Map([...columns.entries()].sort((a, b) => columnStatusTypes.indexOf(a[0]) - columnStatusTypes.indexOf(b[0])));

    const board = {
      columns: sortedColumns
    }
    return board;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

export default getTicketsGroupedByStatus;
