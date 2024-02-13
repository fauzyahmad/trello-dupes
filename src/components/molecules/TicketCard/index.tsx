'use client';

import { DocumentDuplicateIcon, DocumentMagnifyingGlassIcon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/16/solid";
import { StatusColumn, Ticket } from "../../../types/DragAndDrop";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import { Popover } from "@headlessui/react";
import { useTicketStore } from "../../../store";
import { Link } from "react-router-dom";
import SpinnerAnimation from "../../atoms/SpinnerAnimation";
import PopOverMenu from "../PopOverMenu";
import Button from "../../atoms/Button";
import clsx from "clsx";

type Props = {
  ticket: Ticket;
  innerRef: (instance: HTMLDivElement | null) => void;
  id: StatusColumn;
  index: number;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined | null;
}

function TicketCard({
  ticket,
  innerRef,
  id,
  index,
  draggableProps,
  dragHandleProps,
}: Props) {
  const [createTicket, deleteTicket, setNewTicketTitleInput, setNewTicketDescriptionInput, setNewTicketStatusInput] = useTicketStore((state) => [state.createTicket, state.deleteTicket, state.setNewTicketTitleInput, state.setNewTicketDescriptionInput, state.setNewTicketStatusInput])
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="p-2 bg-white rounded-md shadow-md transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        {ticket.title === "add-ticket" ? (
          <SpinnerAnimation
            classNameSpinner="h-5 w-5 border-t-sky-300"
            classNameString="flex-1 text-base text-left text-gray-400"
            titleLoading="Adding new ticket..."
          />
        ) : ticket.title === "delete-ticket" ? (
          <SpinnerAnimation
            classNameSpinner="h-5 w-5 border-t-pink-600"
            classNameString="flex-1 text-base text-left text-gray-400"
            titleLoading="Deleting ticket..."
          />
        ) : (
          <>
            <span className={clsx( id === "completed" ? "line-through" : "", "flex-1 text-base text-left font-normal text-gray-800")}>
              {ticket.title}
            </span>

            <Popover as="div" className="relative">
              {({ open, close }) => (
                <PopOverMenu
                  buttonComponent={(
                    <>
                      {open ? (
                        <EllipsisHorizontalCircleIcon
                          cursor="pointer"
                          title="More Options"
                          className="ml-3 mt-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <EllipsisHorizontalIcon
                          cursor="pointer"
                          title="More Options"
                          className="ml-3 mt-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                  panelClassName="-left-[100px] top-5 w-40 sm:left-0"
                  panelComponent={(
                    <div className="flex flex-col items-start relative">
                      <Link
                        to={`/ticket/${ticket.$id}`}
                      >
                        <Button
                          onClick={() => {
                              setNewTicketTitleInput(ticket.title)
                              setNewTicketDescriptionInput(ticket.description)
                              setNewTicketStatusInput(ticket.status)
                              close()
                            }
                          }
                          className="px-2 py-2 text-sm text-slate-200 font-medium hover:bg-gray-400 bg-gray-500 text-left block mb-1 rounded "
                        >
                          <DocumentMagnifyingGlassIcon className="h-5 w-5 inline-block mr-2" />
                          Open Ticket
                        </Button>
                      </Link>
                      <Button
                        onClick={async() => {
                          close()
                          await createTicket("duplicate", ticket.title, ticket.description, id)
                        }}
                        className="px-2 py-2 text-sm text-slate-200 font-medium hover:bg-gray-400 bg-gray-500 text-left block mb-1 rounded "
                      >
                        <DocumentDuplicateIcon className="h-5 w-5 inline-block mr-2" />
                        Duplicate
                      </Button>
                      <Button
                        onClick={async() => {
                          close()
                          await deleteTicket(index, ticket, id)
                        }}
                        className="px-2 py-2 text-sm text-slate-200 font-medium hover:bg-gray-400 bg-gray-500 text-left block mb-1 rounded "
                      >
                        <TrashIcon className="h-5 w-5 inline-block mr-2" />
                        Delete
                      </Button>
                    </div>
                  )}
                />
              )}
            </Popover>
          </>
        )}

      </div>
    </div>
  )
}

export default TicketCard;
