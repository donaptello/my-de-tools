import { AnimatePresence, motion } from "framer-motion";
import { MonitoringConfigurationData } from "../../services/types/MonitoringConfigurations.types";
import { useMemo, useState, useEffect } from "react";

interface Props {
  monitoringData?: MonitoringConfigurationData;
  darkMode: boolean;
  showFormInput: boolean;
  setShowFormInput: (value: boolean) => void;
  onConfirm: (conn: MonitoringConfigurationData | undefined) => void;
}

export default function ModalFormConfigurationTable({
  monitoringData,
  darkMode,
  showFormInput,
  setShowFormInput,
  onConfirm,
}: Props) {
  type FormValues = {
    tableNameSource: string;
    schemas: string;
    dbSource: string;
    dbTarget: string;
    columnDateName: string;
    tableNameTarget: string;
    dataSourceColumnName: string;
    dataSource: string;
    layer: string;
    flag: string;
    withDetail: boolean;
  };

  type FormErrors = Partial<Record<keyof FormValues, string>>;

  const initialForm = useMemo<FormValues>(() => {
    return {
      tableNameSource: "",
      schemas: "",
      dbSource: "",
      dbTarget: "",
      columnDateName: "",
      tableNameTarget: "",
      dataSourceColumnName: "",
      dataSource: "",
      layer: "",
      flag: "",
      withDetail: false,
    };
  }, []);

  const [form, setForm] = useState<FormValues>(initialForm);
  const [errors, setErrors] = useState<FormErrors>();

  useEffect(() => {
    if (monitoringData && showFormInput) {
      setForm({
        tableNameSource: monitoringData.tableNameSource || "",
        schemas: monitoringData.schemas || "",
        dbSource: monitoringData.dbSource || "",
        dbTarget: monitoringData.dbTarget || "",
        columnDateName: monitoringData.columnDateName || "",
        tableNameTarget: monitoringData.tableNameTarget || "",
        dataSourceColumnName: monitoringData.dataSourceColumnName || "",
        dataSource: monitoringData.dataSource || "",
        layer: monitoringData.layer || "",
        flag: monitoringData.flag || "",
        withDetail: monitoringData.withDetail || false,
      });
    } else {
      setForm(initialForm);
    }
  }, [monitoringData, showFormInput, initialForm]);

  const update = (key: keyof FormValues, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors?.[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.tableNameSource.trim())
      newErrors.tableNameSource = "Table Name Source is required";
    if (!form.schemas.trim()) newErrors.schemas = "Schemas is required";
    if (!form.dbSource.trim()) newErrors.dbSource = "DB Source is required";
    if (!form.dbTarget.trim()) newErrors.dbTarget = "DB Target is required";
    if (!form.columnDateName.trim())
      newErrors.columnDateName = "Column Date Name is required";
    if (!form.tableNameTarget.trim())
      newErrors.tableNameTarget = "Table Name Target is required";
    if (!form.dataSourceColumnName.trim())
      newErrors.dataSourceColumnName = "Data Source Column Name is required";
    if (!form.dataSource.trim())
      newErrors.dataSource = "Data Source is required";
    if (!form.layer) newErrors.layer = "Layer is required";
    if (!form.flag) newErrors.flag = "Flag is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const monitoringPayload: MonitoringConfigurationData = {
      id: 0, // Assuming new item
      ...form,
      insertTime: new Date().toISOString(),
    };
    onConfirm(monitoringPayload);
    setForm(initialForm);
    setShowFormInput(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!monitoringData) return;
    const updatedData: MonitoringConfigurationData = {
      ...monitoringData,
      ...form,
    };
    onConfirm(updatedData);
    setForm(initialForm);
    setShowFormInput(false);
  };

  const isUpdate = !!monitoringData;

  return (
    <AnimatePresence>
      {showFormInput && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className={`w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <form
              onSubmit={isUpdate ? handleUpdate : handleCreate}
              className="flex flex-col h-full"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {!isUpdate
                    ? "Add Monitoring Configuration"
                    : `Update Monitoring Configuration`}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {!isUpdate
                    ? "Create a new monitoring configuration"
                    : `Update monitoring configuration`}
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Table Name Source
                    </label>
                    <input
                      aria-invalid={!!errors?.tableNameSource}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.tableNameSource
                          ? "border-red-400"
                          : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      placeholder="Table Name Source"
                      value={form.tableNameSource}
                      onChange={(e) =>
                        update("tableNameSource", e.target.value)
                      }
                    />
                    {errors?.tableNameSource && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tableNameSource}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Schemas
                    </label>
                    <input
                      aria-invalid={!!errors?.schemas}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.schemas ? "border-red-400" : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      placeholder="Schemas"
                      value={form.schemas}
                      onChange={(e) => update("schemas", e.target.value)}
                    />
                    {errors?.schemas && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.schemas}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      DB Source
                    </label>
                    <input
                      aria-invalid={!!errors?.dbSource}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.dbSource ? "border-red-400" : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      placeholder="DB Source"
                      value={form.dbSource}
                      onChange={(e) => update("dbSource", e.target.value)}
                    />
                    {errors?.dbSource && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dbSource}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      DB Target
                    </label>
                    <input
                      aria-invalid={!!errors?.dbTarget}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.dbTarget ? "border-red-400" : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      placeholder="DB Target"
                      value={form.dbTarget}
                      onChange={(e) => update("dbTarget", e.target.value)}
                    />
                    {errors?.dbTarget && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dbTarget}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Column Date Name
                    </label>
                    <input
                      aria-invalid={!!errors?.columnDateName}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.columnDateName
                          ? "border-red-400"
                          : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      placeholder="Column Date Name"
                      value={form.columnDateName}
                      onChange={(e) => update("columnDateName", e.target.value)}
                    />
                    {errors?.columnDateName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.columnDateName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Table Name Target
                    </label>
                    <input
                      aria-invalid={!!errors?.tableNameTarget}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.tableNameTarget
                          ? "border-red-400"
                          : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      placeholder="Table Name Target"
                      value={form.tableNameTarget}
                      onChange={(e) =>
                        update("tableNameTarget", e.target.value)
                      }
                    />
                    {errors?.tableNameTarget && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.tableNameTarget}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Data Source Column Name
                    </label>
                    <input
                      aria-invalid={!!errors?.dataSourceColumnName}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.dataSourceColumnName
                          ? "border-red-400"
                          : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      placeholder="Data Source Column Name"
                      value={form.dataSourceColumnName}
                      onChange={(e) =>
                        update("dataSourceColumnName", e.target.value)
                      }
                    />
                    {errors?.dataSourceColumnName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dataSourceColumnName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Data Source
                    </label>
                    <input
                      aria-invalid={!!errors?.dataSource}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.dataSource
                          ? "border-red-400"
                          : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      placeholder="Data Source"
                      value={form.dataSource}
                      onChange={(e) => update("dataSource", e.target.value)}
                    />
                    {errors?.dataSource && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dataSource}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Layer
                    </label>
                    <select
                      aria-invalid={!!errors?.layer}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.layer ? "border-red-400" : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      value={form.layer}
                      onChange={(e) => update("layer", e.target.value)}
                    >
                      <option value="">Select Layer</option>
                      <option value="bronze">Bronze</option>
                      <option value="silver">Silver</option>
                      <option value="gold">Gold</option>
                    </select>
                    {errors?.layer && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.layer}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      Flag
                    </label>
                    <select
                      aria-invalid={!!errors?.flag}
                      className={`mt-1 block w-full p-3 rounded-md border ${
                        errors?.flag ? "border-red-400" : "border-gray-300"
                      } ${darkMode ? "bg-gray-700 text-gray-100 focus:border-blue-400" : "bg-white text-gray-800 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-200`}
                      value={form.flag}
                      onChange={(e) => update("flag", e.target.value)}
                    >
                      <option value="">Select Flag</option>
                      <option value="source">Source</option>
                      <option value="target">Target</option>
                    </select>
                    {errors?.flag && (
                      <p className="text-red-500 text-sm mt-1">{errors.flag}</p>
                    )}
                  </div>

                  <div className="flex items-center">
                    <input
                      id="withDetail"
                      type="checkbox"
                      className={`h-4 w-4 rounded border-gray-300 ${darkMode ? "text-blue-400 focus:ring-blue-400" : "text-blue-600 focus:ring-blue-500"} focus:ring-2`}
                      checked={form.withDetail}
                      onChange={(e) => update("withDetail", e.target.checked)}
                    />
                    <label
                      htmlFor="withDetail"
                      className={`ml-2 text-sm font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      With Detail
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 justify-end p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm);
                    setShowFormInput(false);
                  }}
                  className={`border transition 
                focus:outline-none focus:ring-2 font-medium px-3 py-2 rounded-md text-sm ${
                  darkMode
                    ? "text-white bg-gray-600 border-gray-600 hover:bg-gray-500 focus:ring-gray-100"
                    : "text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100 focus:ring-gray-100"
                }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${
                    darkMode
                      ? "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-200"
                  }`}
                >
                  {isUpdate ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
