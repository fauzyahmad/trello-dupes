import React, { useEffect, useState } from 'react'
import { useTicketStore } from "../store"
import TicketForm from "../components/templates/TicketForm"
import { useParams, useNavigate } from "react-router-dom"
import { DnDActions, DnDState } from "../store/useTicketStore"
import NavBar from "../components/molecules/NavBar"

interface Params {
  id: string
  [key: string]: string;
}

function DetailTicket() {
  const { id } = useParams<Params>()
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [loading, newTicketTitleInput, newTicketDescriptionInput, newTicketStatusInput, updateTicketStatus, getTicket] = useTicketStore((state: DnDState & DnDActions) => [state.loading, state.newTicketTitleInput, state.newTicketDescriptionInput, state.newTicketStatusInput, state.updateTicketStatus, state.getTicket])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!newTicketTitleInput || !newTicketDescriptionInput) return
    // create a new ticket
    setLoadingSubmit(true)
    await updateTicketStatus(id!, newTicketTitleInput, newTicketDescriptionInput, newTicketStatusInput);
    setLoadingSubmit(false)
    // navigate back to home
    navigate('/')
  }

  // check if newTicketTitleInput and newTicketDescriptionInput is empty
  useEffect(() => {
    const fetchTicket = async () => {
      if (!newTicketTitleInput || !newTicketDescriptionInput) {
        // get ticket details
        await getTicket(id!)
      }
    }

    fetchTicket();
  }, [newTicketTitleInput, newTicketDescriptionInput, getTicket, id])


  return (
    <div>
      <NavBar />
      {loading ? (
        <div className="animate-pulse">
          <div className="text-left my-0 mx-auto max-w-xl" >
          </div>
        </div>
      ) : (
        <form className="text-left my-0 mx-auto max-w-xl" onSubmit={handleSubmit}>
          <h3 className="text-xl font-medium text-gray-800">
            Ticket of
          </h3>
          <TicketForm formType="update" loading={loadingSubmit} />
        </form>
      )}
    </div>
  )
}

export default DetailTicket
