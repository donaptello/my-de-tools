import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect, useState } from "react";
import { ConnectionData } from "../../services/types/Connections.types";
import ConnectionList from "../../components/connection/ConnectionList";
import ConnectionDetail from "../../components/connection/ConnectionDetail";
import {
  useConnectionData,
  useCreateConnection,
  useDeleteConnection,
  useUpdateConnection,
} from "../../services/hooks/useConnection";
import ModalValidationDelete from "../../components/modal/ModalValidationDelete";

export default function Connection() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const [selected, setSelected] = useState<ConnectionData | undefined>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const { deleteConnection } = useDeleteConnection();
  const {
    data: connections,
    loading: connectionLoading,
    setQuery,
    appendConnection,
    popConnection,
  } = useConnectionData();
  const { submit } = useCreateConnection();
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { update } = useUpdateConnection();

  useEffect(() => {
    setTitle("Connections");
  }, [setTitle]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0 flex-1 items-stretch">
      <div className="md:col-span-1 items-stretch">
        <ConnectionList
          connections={connections?.data}
          selectedId={selected?.id}
          onSelect={(c) => {
            setSelected(c);
            setIsUpdate(false);
            setIsAdding(false);
          }}
          onAdd={() => {
            setIsAdding(true);
            setIsUpdate(false);
            setSelected(undefined);
          }}
          loading={connectionLoading}
          setQuery={(value: string) => setQuery({ name: value })}
          darkMode={darkMode}
        />
      </div>

      <div className="md:col-span-2 items-stretch">
        <ConnectionDetail
          connection={selected}
          darkMode={darkMode}
          isAdding={isAdding}
          onCancel={() => {
            setIsAdding(false);
            setIsUpdate(false);
          }}
          onCreate={async (conn) => {
            const res = await submit(conn);
            if (res.statusCode === 201) {
              appendConnection(res.data);
              setSelected(res.data);
              setIsAdding(false);
            }
          }}
          setShowDeleteConfirm={(validate) => setShowDeleteConfirm(validate)}
          setShowUpdate={() => setIsUpdate(true)}
          isUpdate={isUpdate}
          onUpdate={async (id, conn) => {
            console.log(id, conn);
            const res = await update(id, conn);
            if (res.statusCode === 201) {
              await popConnection(conn);
              appendConnection(res.data);
              setIsUpdate(false);
              setIsAdding(false);
              setSelected(res.data);
            }
          }}
        />
      </div>
      <div className="absolute">
        <ModalValidationDelete
          connection={selected}
          darkMode={darkMode}
          setShowDeleteConfirm={(validate) => setShowDeleteConfirm(validate)}
          showDeleteConfirm={showDeleteConfirm}
          onConfirm={async (conn) => {
            if (conn !== undefined) {
              await deleteConnection(conn.id);
              await popConnection(conn);
              setSelected(undefined);
            }
          }}
        />
      </div>
    </div>
  );
}
