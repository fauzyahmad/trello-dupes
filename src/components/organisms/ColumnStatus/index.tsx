import { Draggable, Droppable } from "@hello-pangea/dnd"
import { StatusColumn, Ticket } from "../../../types/DragAndDrop"
import clsx from "clsx";
import TicketCard from "../../molecules/TicketCard";
import { useModalStore, useTicketStore } from "../../../store";
import { PlusIcon } from "@heroicons/react/16/solid";

type Props = {
  id: StatusColumn;
  tickets: Ticket[];
  index: number;
}

const idToText: {
  [key in StatusColumn]: string;
} = {
  "open": "Open",
  "in-progress": "In Progress",
  "completed": "Completed",
}

export default function ColumnStatus({ id, tickets, index }: Props) {
  const [setNewTicketStatusInput] = useTicketStore((state) => [state.setNewTicketStatusInput])
  const [toggleModal] = useModalStore((state) => [state.toggleModal])
  const handleAddTicket = () => {
    setNewTicketStatusInput(id)
    toggleModal()
  }
  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex-1 flex flex-col py-3 px-4 "
        >
          <div className="bg-gray-100 p-4 rounded-xl shadow-sm">
            <h2 className="text-base mb-2 font-semibold text-gray-800 flex justify-between items-center">
              {idToText[id]}
              <span className="text-sm font-normal text-gray-500">
                {tickets.length}
              </span>
            </h2>
            <Droppable
              droppableId={index.toString()}
              type="card"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={clsx("rounded-xl shadow-sm",
                    snapshot.isDraggingOver && id === "open" ? "bg-sky-900/75" :
                    snapshot.isDraggingOver && id === "in-progress" ? "bg-yellow-600" :
                    snapshot.isDraggingOver && id === "completed" ? "bg-green-400" : "bg-gray-100")}
                >

                  <div className="space-y-2">
                    {tickets.map((ticket, idx) => {
                      const isDuplicateId = tickets.findIndex(t => t.$id === ticket.$id) !== idx;
                      if (isDuplicateId) {
                        return null; // Skip rendering the duplicate ticket
                      }
                      return (
                        <Draggable
                          key={ticket.$id}
                          draggableId={ticket.$id}
                          index={idx}
                        >
                          {(provided) => (
                            <TicketCard
                              innerRef={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              ticket={ticket}
                              id={id}
                              index={idx}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddTicket}
                className="px-2 py-2 text-sm self-center text-slate-200 font-medium hover:bg-gray-400 bg-gray-500 text-left block mb-1 rounded "
              >
                <PlusIcon className="h-5 w-5 self-center inline-block mr-2" />
                Add a ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
