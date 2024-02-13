import React, { useEffect, useState } from 'react'
import { useTicketStore } from "../store"
import TicketForm from "../components/templates/TicketForm"
import { useParams, useNavigate, Link } from "react-router-dom"
import { DnDActions, DnDState } from "../store/useTicketStore"
import NavBar from "../components/molecules/NavBar"
import { ArrowLeftIcon } from "@heroicons/react/16/solid"
import BgScreen from "../components/templates/BgScreen"

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
    <BgScreen>
      <NavBar />
      {loading ? (
        <div className="animate-pulse">
          <div className="text-left my-0 mx-auto max-w-xl" >
          </div>
        </div>
      ) : (
        <div className="max-w-2xl my-0 mx-auto mt-20 bg-white rounded-lg">
          <form className="text-left p-6" onSubmit={handleSubmit}>
            <Link to="/" className="flex items-center text-gray-400 mb-4">
                <ArrowLeftIcon className="w-5 h-5 mr-4" />
                Back
              </Link>
            <h3 className="text-lg font-medium text-gray-800">
              Detail Ticket of
            </h3>
            <TicketForm formType="update" loading={loadingSubmit} />
          </form>
        </div>
      )}
    </BgScreen>
  )
}

export default DetailTicket
