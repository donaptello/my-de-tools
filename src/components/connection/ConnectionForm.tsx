import { useEffect, useMemo, useState } from "react";
import {
  ConnectionData,
  GeneralConnection,
  S3Connection,
} from "../../services/types/Connections.types";

interface Props {
  isAdding?: boolean;
  darkMode: boolean;
  onCancel?: () => void;
  onCreate?: (conn: ConnectionData) => void;
}

export default function ConnectionForm({
  isAdding,
  darkMode,
  onCancel,
  onCreate,
}: Props) {
  type ConnType = "S3" | "PostgreSQL" | "Oracle";

  type FormValues = {
    name: string;
    description: string;
    type: ConnType;
    host: string;
    port?: number | string;
    username: string;
    password: string;
    accessKey: string;
    secretKey: string;
    domain: string;
  };

  type FormErrors = Partial<Record<keyof FormValues, string>>;

  const initialForm = useMemo<FormValues>(
    () => ({
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
    }),
    []
  );

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

  const disabled =
    !form.name.trim() ||
    !form.host.trim() ||
    (form.type === "S3"
      ? !form.accessKey || !form.secretKey
      : !form.username || !form.password);

  return (
    <form
      onSubmit={handleCreate}
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
            Add Connection
          </h2>
          <p className="text-sm text-gray-500">Create a new connection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              aria-invalid={!!errors.name}
              className={`mt-1 block w-full p-2 rounded border ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <input
              className="mt-1 block w-full p-2 rounded border border-gray-300"
              placeholder="Description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Type</label>
            <select
              className="mt-1 block w-full p-2 rounded border border-gray-300"
              value={form.type}
              onChange={(e) => update("type", e.target.value as ConnType)}
            >
              <option value="PostgreSQL">PostgreSQL</option>
              <option value="Oracle">Oracle</option>
              <option value="S3">S3</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Host</label>
            <input
              aria-invalid={!!errors.host}
              className={`mt-1 block w-full p-2 rounded border ${
                errors.host ? "border-red-400" : "border-gray-300"
              }`}
              placeholder="Host"
              value={form.host}
              onChange={(e) => update("host", e.target.value)}
            />
            {errors.host && (
              <p className="text-red-500 text-sm mt-1">{errors.host}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Port</label>
            <input
              className="mt-1 block w-full p-2 rounded border border-gray-300"
              placeholder="Port"
              value={form.port ?? ""}
              onChange={(e) => update("port", e.target.value)}
            />
          </div>

          {form.type === "S3" ? (
            <>
              <div>
                <label className="text-sm font-medium">Access Key</label>
                <input
                  aria-invalid={!!errors.accessKey}
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.accessKey ? "border-red-400" : "border-gray-300"
                  }`}
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
                <label className="text-sm font-medium">Secret Key</label>
                <input
                  aria-invalid={!!errors.secretKey}
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.secretKey ? "border-red-400" : "border-gray-300"
                  }`}
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

              <div className="md:col-span-2">
                <label className="text-sm font-medium">Domain</label>
                <input
                  className="mt-1 block w-full p-2 rounded border border-gray-300"
                  placeholder="Domain"
                  value={form.domain}
                  onChange={(e) => update("domain", e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium">Username</label>
                <input
                  aria-invalid={!!errors.username}
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.username ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  aria-invalid={!!errors.password}
                  type="password"
                  className={`mt-1 block w-full p-2 rounded border ${
                    errors.password ? "border-red-400" : "border-gray-300"
                  }`}
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
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
              className="px-3 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={disabled}
              className={`px-3 py-2 rounded ${
                disabled
                  ? "bg-gray-300 text-gray-600"
                  : "bg-blue-600 text-white"
              }`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
