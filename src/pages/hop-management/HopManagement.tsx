import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect } from "react";
import CardStatusHop from "../../components/hop-management/CardStatusHop";
import { useHopManagementStatus } from "../../services/hooks/useHopManagement";

export default function HopManagement() {
  const { darkMode, setTitle, setDesc } = useOutletContext<LayoutContextType>();
  const { data: status } = useHopManagementStatus();

  useEffect(() => {
    setTitle("Hop Management");
    setDesc("Apache Hop monitoring overview");
  });
  return (
    <div className="grid grid-cols-1 px-10 md:px-40 flex-1 items-stretch">
      <CardStatusHop darkMode={darkMode} hopStatus={status?.data} />
    </div>
  );
}
