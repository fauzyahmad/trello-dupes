import TextAreaField from "../../atoms/TextAreaField"
import { useTicketStore } from "../../../store"
import TicketRadioGroup from "../../molecules/TicketRadioGroup"
import Button from "../../atoms/Button"

type Props = {
  formType: string
  loading?: boolean;
}

const TicketForm = ({formType, loading}: Props) => {
  const [newTicketTitleInput, newTicketDescriptionInput, setNewTicketTitleInput, setNewTicketDescriptionInput] = useTicketStore((state) => [state.newTicketTitleInput, state.newTicketDescriptionInput, state.setNewTicketTitleInput, state.setNewTicketDescriptionInput])

  return (
    <div>
      <div className="mt-3">
        <TextAreaField
          id="title"
          name="title"
          placeholder="Write Ticket..."
          value={newTicketTitleInput}
          isFocused
          className="text-2xl leading-6 py-4 p-2 font-semibold"
          onChange={(e) => setNewTicketTitleInput(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <span className="text-gray-800 text-sm font-medium leading-4">
          Description
        </span>
        <TextAreaField
          id="description"
          name="description"
          className="text-sm leading-6 font-normal px-3 py-2 h-20 bg-slate-100 mt-2"
          value={newTicketDescriptionInput}
          placeholder="Add more details on the ticket..."
          onChange={(e) => setNewTicketDescriptionInput(e.target.value)}
          rows={5}
        />
      </div>
      <div className="mt-3">
        <span className="text-gray-800 text-sm font-medium leading-4">
          Choose Status Ticket
        </span>
        <TicketRadioGroup />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          type="submit"
          disabled={loading === true|| newTicketTitleInput === "" || newTicketDescriptionInput === "" ? true : false}
          className=" text-right text-white bg-sky-500 hover:bg-sky-600 focus:ring-sky-500 focus:ring-offset-sky-200 active:bg-sky-600 active:ring-sky-900 active:ring-offset-sky-700 disabled:bg-gray-300"
        >
          {formType === "new" ? "Add ticket" : (loading === true && formType === "update" ? "Updating ticket..." : "Update ticket")}
        </Button>
      </div>
    </div>
  )
}

export default TicketForm
