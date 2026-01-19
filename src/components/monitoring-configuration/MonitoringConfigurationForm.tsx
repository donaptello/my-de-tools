import { useEffect, useMemo, useState } from "react";
import {
  ConnectionData,
  GeneralConnection,
  S3Connection,
} from "../../services/types/Connections.types";

interface Props {
  connection?: ConnectionData;
  isAdding?: boolean;
  isUpdate?: boolean;
  darkMode: boolean;
  onCancel?: () => void;
  onCreate?: (conn: ConnectionData) => void;
  onUpdate?: (id: string, conn: ConnectionData) => void;
}

export default function MonitoringForm({
  connection,
  isAdding,
  isUpdate,
  darkMode,
  onCancel,
  onCreate,
  onUpdate,
}: Props) {
  type ConnType = "S3" | "PostgreSQL" | "Oracle";

  type FormValues = {
    name: string;
    description: string;
    type: ConnType | string;
    host: string;
    port?: number | string | undefined;
    username: string;
    password: string;
    accessKey: string;
    secretKey: string;
    domain: string;
    database: string;
  };

  type FormErrors = Partial<Record<keyof FormValues, string>>;

  const initialForm = useMemo<FormValues>(() => {
    if (isUpdate && connection) {
      return {
        name: connection.name ?? "",
        description: connection.description ?? "",
        type: connection.type ?? "PostgreSQL",

        host:
          "host" in connection.configuration
            ? connection.configuration.host ?? ""
            : "",
        port:
          "port" in connection.configuration
            ? connection.configuration.port
            : undefined,
        username:
          "username" in connection.configuration
            ? connection.configuration.username ?? ""
            : "",
        database:
          "database" in connection.configuration
            ? connection.configuration.database ?? ""
            : "",

        accessKey:
          "accessKey" in connection.configuration
            ? connection.configuration.accessKey ?? ""
            : "",
        secretKey:
          "secretKey" in connection.configuration
            ? connection.configuration.secretKey ?? ""
            : "",
        domain:
          "domain" in connection.configuration
            ? connection.configuration.domain ?? ""
            : "",
        password:
          "password" in connection.configuration
            ? connection.configuration.password ?? ""
            : "",
      };
    }

    return {
      name: "",
      description: "",
      type: "PostgreSQL",
      host: "",
      port: undefined,
      username: "",
      password: "",
      accessKey: "",
      secretKey: "",
      domain: "",
      database: "",
    };
  }, [isUpdate, connection]);

  const [form, setForm] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isAdding) {
      setForm(initialForm);
      setErrors({});
    }
  }, [initialForm, isAdding]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: FormErrors = {};

    if (!form.name || !form.name.trim()) e.name = "Name is required";
    if (!form.host || !form.host.trim()) e.host = "Host is required";

    if (form.type === "S3") {
      if (!form.accessKey) e.accessKey = "Access key is required";
      if (!form.secretKey) e.secretKey = "Secret key is required";
    } else {
      if (!form.username) e.username = "Username is required";
      if (!form.password) e.password = "Password is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleCreate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;

    const id = Date.now().toString();
    const conn: ConnectionData = {
      id,
      name: form.name,
      type: form.type,
      description: form.description,
      configuration:
        form.type === "S3"
          ? ({
              accessKey: form.accessKey,
              secretKey: form.secretKey,
              domain: form.domain,
              host: form.host,
              port: Number(form.port) || undefined,
            } as S3Connection)
          : ({
              host: form.host,
              port: Number(form.port) || undefined,
              username: form.username,
              password: form.password,
              database: form.database,
            } as GeneralConnection),
    };

    try {
      onCreate?.(conn);
    } catch (err) {
      console.error("[ConnectionDetail] onCreate threw:", err);
      // keep form intact so user can retry
      return;
    }

    setForm(initialForm);
    setErrors({});
  }

  function handleUpdate(e?: React.FormEvent) {
    e?.preventDefault();
    if (!validate()) return;
    if (!connection?.id) return;

    const conn: ConnectionData = {
      id: connection?.id,
      name: form.name,
      type: form.type,
      description: form.description,
      configuration:
        form.type === "S3"
          ? ({
              accessKey: form.accessKey,
              secretKey: form.secretKey,
              domain: form.domain,
              host: form.host,
              port: Number(form.port) || undefined,
            } as S3Connection)
          : ({
              host: form.host,
              port: Number(form.port) || undefined,
              username: form.username,
              password: form.password,
              database: form.database,
            } as GeneralConnection),
    };

    try {
      onUpdate?.(conn.id, conn);
    } catch (err) {
      console.error("[ConnectionDetail] onCreate threw:", err);
      // keep form intact so user can retry
      return;
    }

    setForm(initialForm);
    setErrors({});
  }

  const disabled =
    !form.name.trim() ||
    !form.host.trim() ||
    (form.type === "S3"
      ? !form.accessKey || !form.secretKey
      : !form.username || !form.password);

  return (
    <form
      onSubmit={isUpdate ? handleUpdate : handleCreate}
      className={`rounded-xl p-6 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } shadow-sm border border-transparent h-full transition hover:shadow-2xl hover:-translate-y-1`}
    >
      <div className="flex flex-col h-full gap-4">
        <div>
          <h2
            className={`text-xl font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {!isUpdate? "Add Connection" : `Update Connection`}
          </h2>
          <p className="text-sm text-gray-500">
            {!isUpdate? "Create a new connection" : `Update a connection: ${connection?.name}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Name
            </label>
            <input
              aria-invalid={!!errors.name}
              className={`mt-1 block w-full p-2 rounded border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
              placeholder="Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Description
            </label>
            <input
              className={`mt-1 block w-full p-2 rounded border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
              placeholder="Description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Type
            </label>
            <select
              className={`mt-1 block w-full p-2 rounded border border-gray-300 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
              value={form.type}
              onChange={(e) => update("type", e.target.value as ConnType)}
            >
              <option value="PostgreSQL">PostgreSQL</option>
              <option value="Oracle">Oracle</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Host
            </label>
            <input
              aria-invalid={!!errors.host}
              className={`mt-1 block w-full p-2 rounded border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
              placeholder="Host"
              value={form.host}
              onChange={(e) => update("host", e.target.value)}
            />
            {errors.host && (
              <p className="text-red-500 text-sm mt-1">{errors.host}</p>
            )}
          </div>

          <div>
            <label
              className={`text-sm font-medium ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Port
            </label>
            <input
              className={`mt-1 block w-full p-2 rounded border ${
                errors.name ? "border-red-400" : "border-gray-300"
              } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
              placeholder="Port"
              value={form.port ?? ""}
              onChange={(e) => update("port", e.target.value)}
            />
          </div>

          {form.type === "S3" ? (
            <>
              <div>
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Access Key
                </label>
                <input
                  aria-invalid={!!errors.accessKey}
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                  placeholder="Access Key"
                  value={form.accessKey}
                  onChange={(e) => update("accessKey", e.target.value)}
                />
                {errors.accessKey && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accessKey}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Secret Key
                </label>
                <input
                  aria-invalid={!!errors.secretKey}
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                  placeholder="Secret Key"
                  value={form.secretKey}
                  onChange={(e) => update("secretKey", e.target.value)}
                />
                {errors.secretKey && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.secretKey}
                  </p>
                )}
              </div>

              <div>
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Domain
                </label>
                <input
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                  placeholder="Domain"
                  value={form.domain}
                  onChange={(e) => update("domain", e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Username
                </label>
                <input
                  aria-invalid={!!errors.username}
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Password
                </label>
                <input
                  aria-invalid={!!errors.password}
                  type="text"
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  Database
                </label>
                <input
                  aria-invalid={!!errors.database}
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.name ? "border-red-400" : "border-gray-300"
                  } ${darkMode ? "text-gray-100" : "text-gray-800"}`}
                  placeholder="Database"
                  value={form.database}
                  onChange={(e) => update("database", e.target.value)}
                />
                {errors.database && (
                  <p className="text-red-500 text-sm mt-1">{errors.database}</p>
                )}
              </div>
            </>
          )}

          <div className="md:col-span-2 flex gap-2 justify-end mt-3">
            <button
              type="button"
              onClick={() => {
                onCancel?.();
                setForm(initialForm);
              }}
              className={`border transition 
                focus:outline-none focus:ring-2 font-medium px-3 py-2 rounded-md text-sm ${
                  darkMode
                    ? "text-white bg-gray-600 border-gray-600 hover:bg-gray-500 focus:ring-gray-100 focus:border-gary-500"
                    : "text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100 focus:ring-gray-100 focus:border-gary-500"
                }`}
            >
              Cancel
            </button>
            {isUpdate ? (
              <button
                type="submit"
                disabled={disabled}
                className={`items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${
                  !darkMode && disabled
                    ? "bg-gray-300 text-gray-600"
                    : !darkMode && !disabled
                    ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 focus:ring-yellow-200"
                    : darkMode && disabled
                    ? "bg-gray-600 text-white"
                    : darkMode && !disabled
                    ? "bg-yellow-600 text-white hover:bg-yellow-500 focus:ring-yellow-400"
                    : "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 focus:ring-yellow-200"
                }`}
              >
                Update
              </button>
            ) : (
              <button
                type="submit"
                disabled={disabled}
                className={`items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${
                  !darkMode && disabled
                    ? "bg-gray-300 text-gray-600"
                    : !darkMode && !disabled
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-200"
                    : darkMode && disabled
                    ? "bg-gray-600 text-white"
                    : darkMode && !disabled
                    ? "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-200"
                }`}
              >
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
