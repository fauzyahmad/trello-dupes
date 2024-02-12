import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useEffect } from "react";
import ColumnStatus from "../../organisms/ColumnStatus";
import { Column } from "../../../types/DragAndDrop";
import { useTicketStore } from "../../../store";
import { DnDActions, DnDState } from "../../../store/useTicketStore";

export default function DragAndDrop() {
  const [board, getBoard, setBoardState, updateTicketPositionStatus, loading] = useTicketStore((state: DnDState & DnDActions) => [
    state.board,
    state.getBoard,
    state.setBoardState,
    state.updateTicketPositionStatus,
    state.loading
  ]);
  useEffect(() => {
    // Your logic here
    getBoard();
  }, [ getBoard ]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    // check if the draggable is dropped outside the droppable
    if (!destination) {
      return;
    }
    // handle column status drag
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const newSortingColumns = new Map(entries);
      setBoardState({
        ...board,
        columns: newSortingColumns
      });
    }

    // handle ticket card drag (handling status change and column change)
    if(type === 'card') {
      const columns = Array.from(board.columns);
      const firstColIndex = columns[Number(source.droppableId)];
      const secondColIndex = columns[Number(destination.droppableId)];

      const firstCol: Column = {
        id: firstColIndex[0],
        tickets: firstColIndex[1].tickets
      }

      const secondCol: Column = {
        id: secondColIndex[0],
        tickets: secondColIndex[1].tickets
      }

      if (!firstCol || !secondCol) return;

      if (source.index === destination.index && firstCol === secondCol) return;

      const newCardTickets = firstCol.tickets; // all the cards in the start/drag column
      const [movingCardTicket] = newCardTickets.splice(source.index, 1); //this is the card that is being moved

      if (firstCol.id === secondCol.id) {
        // same column card drag
        newCardTickets.splice(destination.index, 0, movingCardTicket); // add the card to the new position
        const newColumn = {
          id: firstCol.id,
          tickets: newCardTickets
        }; // create a new column with the new card position

        const newColumns = new Map(board.columns); // create a new map of columns
        newColumns.set(firstCol.id, newColumn); // set the new column to the map

        setBoardState({
          ...board,
          columns: newColumns
        }); // set new order of cards in the column
      } else {
        // drag and drop card to another column
        const secondCardCol = Array.from(secondCol.tickets); // all the cards in the destination column
        secondCardCol.splice(destination.index, 0, movingCardTicket); // add the card to the new position in the destination column (different column)

        const newColumn = {
          id: firstCol.id,
          tickets: newCardTickets
        }; // create a new column with the new card position (starter column)
        const newColumns = new Map(board.columns); // create a new map of columns
        newColumns.set(firstCol.id, newColumn); // set the new column to the map
        newColumns.set(secondCol.id, {
          id: secondCol.id,
          tickets: secondCardCol
        }); // set new order of cards in the destination column

        // update status card in Database Appwrite
        updateTicketPositionStatus(movingCardTicket, secondCol.id);

        setBoardState({
          ...board,
          columns: newColumns
        }); // set new order of cards in each column
      }

    }

  }
  if (loading) {
    return (
      <div className="flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="border-gray-300 md:h-9 md:w-9 h-4 w-4 animate-spin self-center rounded-full border-4 border-t-sky-300" />
        <span className=" text-base md:text-3xl text-center ml-2 font-normal text-gray-400">
          Loading your tickets...
        </span>
      </div>
    )
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column" >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-3 py-8 md:py-16"
          >
            {Array.from(board.columns.values()).map((column, index) => {
              return (
                <ColumnStatus key={column.id} id={column.id} tickets={column.tickets} index={index} />
              )
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
