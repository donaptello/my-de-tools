import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";
import { useUsers } from "../../services/hooks/useUsers";
import TableUsers from "../../components/user-managements/TableUsers";
import FilterUsers from "../../components/user-managements/FilterUsers";

export default function UserManagement() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const { data: userData } = useUsers();

  console.info(userData);

  useEffect(() => {
    setTitle("User Managements");
  });
  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch">
      <FilterUsers darkMode={darkMode} />
      <TableUsers userData={userData?.data} darkMode={darkMode} />
    </div>
  );
}
