import { CiCirclePlus } from "react-icons/ci";
import { GoHome } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";

function BottomNavigationBar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      id: 1,
      path: "/home",
      icon: GoHome,
      label: "Home",
      isSpecial: false,
    },
    {
      id: 2,
      path: "/new-post",
      icon: CiCirclePlus,
      label: "Create",
      isSpecial: true,
    },
    {
      id: 3,
      path: "/chats",
      icon: IoChatbubblesOutline,
      label: "Chats",
      isSpecial: false,
    },
  ];

  const handelClick = () => {
    toast.success("Chats Coming Soon😊!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="fixed w-full bottom-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="safe-area-bottom">
        <div className="flex justify-around items-center px-6 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            if (item.isSpecial) {
              // Special styling for Create button
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center justify-center p-2 -mt-6"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95">
                    <Icon className="text-3xl text-white" />
                  </div>
                  <span className="text-xs font-medium text-blue-600 mt-1">
                    {item.label}
                  </span>
                </Link>
              );
            }

            // Regular nav items
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 hover:bg-gray-50 ${
                  active ? "bg-blue-50" : ""
                }`}
              >
                <div
                  className={`p-1 rounded-lg transition-colors duration-200 ${
                    active ? "bg-blue-100" : ""
                  }`}
                >
                  <Icon
                    className={`text-2xl transition-colors duration-200 ${
                      active ? "text-blue-600" : "text-gray-500"
                    }`}
                  />
                </div>
                <span
                  className={`text-xs font-medium mt-1 transition-colors duration-200 ${
                    active ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {active && (
                  <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>
                )}
              </Link>
            );
          })}
          {/* <div
            // key={item.path}
            // to={item.path}
            onClick={handelClick}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 hover:bg-gray-50`}
          >
            <div className={`p-1 rounded-lg transition-colors duration-200`}>
              <IoChatbubblesOutline
                className={`text-2xl transition-colors duration-200 text-gray-500 `}
              />
            </div>
            <span
              className={`text-xs font-medium mt-1 transition-colors duration-200 text-gray-500`}
            >
              Chats
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default BottomNavigationBar;
