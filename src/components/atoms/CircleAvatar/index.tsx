import React, { useState } from 'react';
import { Popover } from '@headlessui/react';
import PopOverMenu from "../../molecules/PopOverMenu";
import Button from "../Button";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { useAuthStore } from "../../../store";

interface CircleAvatarProps {
  text?: string;
}

const CircleAvatar: React.FC<CircleAvatarProps> = ({ text }) => {
  const [logoutUser] = useAuthStore((state) => [state.logoutUser]);
  const [firstName, lastName] = (text ?? '?? ??').split(' ');
  const initials = `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  const [loading, setLoading] = useState(false);

  return (
    <Popover as="div" className="relative">
    {({ _, close}) => (
      <PopOverMenu
        buttonComponent={(
          <div className="w-10 h-10 rounded-full bg-sky-400 flex items-center justify-center">
            <span className="text-white text-lg font-bold">{initials}</span>
          </div>
        )}
        panelComponent={(
          <div className="relative right-[35%] top-1 flex flex-col items-start">
            <Button
              onClick={async() => {
                setLoading(true);
                await logoutUser();
                setLoading(false);
                close()
              }}
              className="text-sm text-slate-200 font-medium hover:bg-gray-400 bg-gray-500 text-left block mb-1 rounded "
            >
              <ArrowLeftStartOnRectangleIcon className="h-5 w-5 inline-block mr-2" />
              {loading ? 'Logout...' : 'Logout'}
            </Button>
          </div>
        )}
      />
    )}
    </Popover>
  );
};

export default CircleAvatar;
