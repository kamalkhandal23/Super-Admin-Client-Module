import { useEffect, useState } from "react";
import { calculatePricing } from "../utils/pricing";
import { X } from "lucide-react";
import ConfirmModal from "../components/ui/ConfirmModal";

export default function SchemaForm({
  schema,
  initialValues = {},
  onSubmit,
  isEdit = false,
  onCustomAction,
}) {
  const [values, setValues] = useState({});
  const [filePreviews, setFilePreviews] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setValues(initialValues || {});
      setInitialized(true);
    }
  }, [initialValues, initialized]);
  

  useEffect(() => {
    return () => {
      Object.values(filePreviews).forEach((url) => {
        if (url?.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [filePreviews]);

  useEffect(() => {
    const price = calculatePricing(values);
    if (price !== "") {
      setValues((prev) => ({
        ...prev,
        totalPricingAmount: price,
      }));
    }
  }, [
    values.totalUsersAllowed,
    values.partnerType,
    values.candidatePool,
    values.internPool,
    values.assessmentGenerator,
  ]);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    if (submitted) {
      setErrors((prev) => ({
        ...prev,
        [name]: value ? undefined : "Required",

      }));
    }
  };

  const handleFileChange = (name, file) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setFilePreviews((prev) => ({
      ...prev,
      [name]: previewUrl,
    }));

    setValues((prev) => ({
      ...prev,
      [name]: file,
    }));

    if (submitted) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleFileRemove = (name) => {
    setValues((prev) => ({
      ...prev,
      [name]: "",
    }));
  
    setFilePreviews((prev) => ({
      ...prev,
      [name]: null,
    }));
  
    if (submitted) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Required",
      }));
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
    schema.forEach((section) => {
      section.fields.forEach((field) => {
        if (
          field.required &&
          (!values[field.name] ||
            values[field.name].toString().trim() === "")
        ) {
          newErrors[field.name] = "Required";
        }
      });
    });
    return newErrors;
  };
  

  return (
    <>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);

          const newErrors = validateForm();
          setErrors(newErrors);

          if (Object.keys(newErrors).length === 0) {
            onSubmit(values);
          }
        }}
      >
        {schema.map((section) => (
          <div key={section.section}>
            <h3 className="text-sm font-semibold text-slate-700 mb-4">
              {section.section}
            </h3>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              {section.fields.map((field) => {
                if (isEdit && field.hideOnEdit) return null;

                if (field.type === "custom") {
                  return (
                    <button
                      key={field.name}
                      type="button"
                      onClick={() => onCustomAction?.(field.action)}
                      className="text-blue-600 underline text-sm col-span-2 text-left"
                    >
                      {field.label}
                    </button>
                  );
                }

                if (field.type === "readonly") {
                  return (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {field.label}
                      </label>
                      <input
                        readOnly
                        value={values[field.name] || ""}
                        className="w-full h-10 bg-slate-50 border border-slate-300 rounded-md px-3 text-sm"
                      />
                    </div>
                  );
                }

                if (field.type === "select") {
                  return (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {field.label}
                      </label>
                      <select
                        value={values[field.name] ?? ""}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        className={`w-full h-10 border rounded-md px-3 text-sm bg-white ${
                          submitted && errors[field.name]
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      {submitted && errors[field.name] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  );
                }

                if (field.type === "radio") {
                  return (
                    <div key={field.name}>
                      <label className="block text-xs font-medium text-slate-600 mb-2">
                        {field.label}
                      </label>
                      <div className="flex gap-6">
                        {field.options.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="radio"
                              name={field.name}
                              value={opt}
                              checked={values[field.name] === opt}
                              onChange={() =>
                                handleChange(field.name, opt)
                              }
                              className="accent-brand-dark"
                            />
                            {opt}
                          </label>
                        ))}
                      </div>

                      {submitted && errors[field.name] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  );
                }

                if (field.type === "textarea") {
                  return (
                    <div key={field.name} className="col-span-2">
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        {field.label}
                      </label>
                      <textarea
                        value={values[field.name] || ""}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        className={`w-full border rounded-md px-3 py-2 text-sm ${
                          submitted && errors[field.name]
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                        rows={3}
                      />

                      {submitted && errors[field.name] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[field.name]}
                        </p>
                      )}
                    </div>
                  );
                }

                if (field.type === "file") {
                  const previewUrl =
                    filePreviews[field.name] || values[field.name];
                
                  return (
                    <div key={field.name}>
                      <label className="text-sm block mb-1">
                        {field.label}
                      </label>
                
                      <div
                        className={`relative w-full border rounded px-3 py-2 bg-white transition ${
                          submitted && errors[field.name]
                            ? "border-red-500"
                            : "border-slate-300"
                        }`}
                      >
                        <span className="text-sm text-gray-600 truncate pr-8 block">
                          {values[field.name]?.name ||
                            values[field.name] ||
                            "Choose file"}
                        </span>

                        <input
                          type="file"
                          onChange={(e) =>
                            handleFileChange(field.name, e.target.files[0])
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />

                        {values[field.name] && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFileRemove(field.name);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>

                      {submitted && errors[field.name] && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors[field.name]}
                        </p>
                      )}

                      {previewUrl && (
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() => setPreviewFile(previewUrl)}
                            className="text-sm text-brand-dark underline"
                          >
                            Preview
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }
                

                return (
                  <div key={field.name}>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={values[field.name] || ""}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                      className={`w-full h-10 border rounded-md px-3 text-sm ${
                        submitted && errors[field.name]
                          ? "border-red-500"
                          : "border-slate-300"
                      }`}
                    />

                    {submitted && errors[field.name] && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </form>

      {previewFile && (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
          <div className="bg-white w-[700px] max-h-[85vh] rounded-xl shadow-xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h3 className="text-sm font-semibold">
                File Preview
              </h3>
              <button
                type="button"
                onClick={() => setPreviewFile(null)}
                className="text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-auto">
              {previewFile?.endsWith(".pdf") ? (
                <iframe
                  src={previewFile}
                  className="w-full h-[500px]"
                  title="PDF Preview"
                />
              ) : (
                <img
                  src={previewFile}
                  alt="Preview"
                  className="max-h-[500px] mx-auto"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
