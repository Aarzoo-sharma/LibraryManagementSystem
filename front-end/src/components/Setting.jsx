import { Dropdown, DropdownHeader, DropdownItem } from "flowbite-react";
import { Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import Context from "../utils/context/context";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Profile", href: "/admin/profile" },
  { name: "Create Admin", href: "/admin/createAdmin" },
  { name: "Delete Admin", href: "/admin/deleteAdmin" },
  { name: "Users Detail", href: "/admin/usersDetail" },
  { name: "Manage People", href: "/admin/managePeople" },
];

function Setting() {
  const context = useContext(Context);
  return (
    <Dropdown
      //   dismissOnClick={false}
      renderTrigger={() => (
        <Cog6ToothIcon
          className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-600"
          aria-hidden="true"
        />
      )}
    >
      <DropdownHeader className="flex gap-1 text-base font-semibold justify-start items-center px-2">
        <UserCircleIcon className="h-6 w-6" />
        <span>{context.user}</span>
      </DropdownHeader>
      {navigation.map((item, itemIdx) => (
        <DropdownItem key={itemIdx}>
          <Link to={item.href}>{item.name}</Link>
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

export default Setting;
