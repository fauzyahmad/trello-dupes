import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from "@heroicons/react/16/solid";

interface TicketRadioProps {
  checked: boolean;
  titleStatus: string;
  description: string;
  active?: boolean;
}

export default function TicketRadio ({ checked, titleStatus, description }: TicketRadioProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <div className="text-sm">
          <RadioGroup.Label
            as="p"
            className={`font-medium capitalize  ${
              checked ? 'text-white' : 'text-gray-900'
            }`}
          >
            {titleStatus}
          </RadioGroup.Label>
          <RadioGroup.Description
            as="span"
            className={`inline text-xs ${
              checked ? 'text-sky-100' : 'text-gray-500'
            }`}
          >
            <span>
              {description}
            </span>
          </RadioGroup.Description>
        </div>
      </div>
      {checked && (
        <div className="shrink-0 text-white">
          <CheckCircleIcon className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
