import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore, useTicketStore } from "../../../store"
import TicketForm from "../../templates/TicketForm"


function Modal() {
  // const [isOpen, setIsOpen] = useState(true)
  const [newTicketTitleInput, newTicketDescriptionInput, newTicketStatusInput, createTicket] = useTicketStore((state) => [state.newTicketTitleInput, state.newTicketDescriptionInput, state.newTicketStatusInput, state.createTicket])

  const [isOpen, toggleModal] = useModalStore((state) => [state.isOpen, state.toggleModal])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newTicketTitleInput || !newTicketDescriptionInput) return
    toggleModal()
    // create a new ticket
    await createTicket("new", newTicketTitleInput, newTicketDescriptionInput, newTicketStatusInput)

  }
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-10 flex items-center justify-center min-h-screen"
        onSubmit={handleSubmit}
        onClose={toggleModal}
        static={true}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* <div className="fixed inset-0 bg-black bg-opacity-25" /> */}
              <Dialog.Panel
                className="w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                // onClose={toggleModal}
              >
                <Dialog.Title as="h5" className="text-sm font-medium leading-4 text-gray-900">
                  New Ticket
                </Dialog.Title>
                <TicketForm formType="new" />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
