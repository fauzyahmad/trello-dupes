import { RadioGroup } from '@headlessui/react';
import TicketRadio from "../../atoms/TicketRadio";
import { useTicketStore } from "../../../store";
import { DnDActions, DnDState } from "../../../store/useTicketStore";

function TicketRadioGroup() {
  const [ newTicketStatusInput, setNewTicketStatusInput ] = useTicketStore((state: DnDState & DnDActions) => [
    state.newTicketStatusInput, state.setNewTicketStatusInput])

  const options = [
    { id: 1, value: 'open', description: 'Ticket is currently open and awaiting action.' },
    { id: 2, value: 'in-progress', description: 'Ticket is currently in progress.' },
    { id: 3, value: 'completed', description: 'Ticket has been completed.' }
  ];

  return (
    <RadioGroup value={newTicketStatusInput} onChange={setNewTicketStatusInput}>
      <div className="mt-2">
        {options.map((option) => (
          <RadioGroup.Option key={option.id} value={option.value}
            className={({ active, checked }) =>
            `${
              active
                ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-500'
                : ''
            }
            ${checked ?
              option.value === 'open' ? 'bg-sky-900/75 text-white transition-all duration-300' :
              option.value === 'in-progress' ? 'bg-yellow-600 text-white transition-all duration-300' :
              option.value === 'completed' ? 'bg-green-400 text-white transition-all duration-300' :
              'bg-white transition-all duration-300'
              : 'bg-white'}
            mb-3 relative flex cursor-pointer rounded-lg px-3 py-4 shadow-md focus:outline-none`
            }
          >
            {({ active, checked }) => (
              <TicketRadio
                checked={checked}
                titleStatus={option.value}
                description={option.description}
                active={active}
              />
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}

export default TicketRadioGroup;
