import { Switch } from '@headlessui/react';
import { useState } from 'react';

interface ToggleButtonProps {
  defaultEnabled?: boolean;
  onChange?: (enabled: boolean) => void;
  label: string;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  defaultEnabled = false,
  onChange,
  label,
}) => {
  const [enabled, setEnabled] = useState(defaultEnabled);

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    if (onChange) {
      onChange(newEnabled);
    }
  };

  return (
    <Switch.Group>
      <div className="flex items-center cursor-pointer">
        <Switch
          checked={enabled}
          onChange={handleToggle}
          className={`${
            enabled ? 'bg-sky-500' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
        <Switch.Label className="ml-2 text-sm">{label}</Switch.Label>
      </div>
    </Switch.Group>

  );
};
