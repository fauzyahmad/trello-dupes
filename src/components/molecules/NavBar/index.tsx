import { useAuthStore } from "../../../store";
import CircleAvatar from '../../atoms/CircleAvatar';

const NavBar = () => {
  const [user] = useAuthStore((state) => [state.user]);

  return (
    <nav className="fixed h-14 left-0 right-0 z-5 flex w-full z-20 top-0 start-0 border-b shadow-md">
      <div className="flex bg-white w-full justify-between items-center">
        <div className="ml-4">Trello Vroom</div>
        <div className="mr-4 flex flex-row items-center gap-3 justify-around">
            {user ? (
              <div>Welcome, {user.name}</div>
            ) : (
              <div className="animate-pulse h-2 w-16 bg-gray-300 rounded-sm " />
            )}

          {user ? (
            <CircleAvatar text={user.name} />
          ) : (
            <div className="animate-pulse h-8 w-8 bg-gray-300 rounded-full"></div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
