import { useEffect, useState } from "react";
import { calculatePricing } from "../utils/pricing";
import { X } from "lucide-react";
import ConfirmModal from "../components/ui/ConfirmModal";
import { useRef } from "react";

export default function SchemaForm({
  schema,
  initialValues = {},
  onSubmit,
  isEdit = false,
  onCustomAction,
  onDirtyChange,
  formId
}) {
  const [values, setValues] = useState({});
  const [filePreviews, setFilePreviews] = useState({});
  const [previewFile, setPreviewFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [previewFileType, setPreviewFileType] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const initialSnapshot = useRef(null);

  useEffect(() => {
    setValues(initialValues || {});
    initialSnapshot.current = JSON.stringify(initialValues || {});
  }, [initialValues]);
  
  
  useEffect(() => {
    return () => {
      Object.values(filePreviews).forEach((url) => {
        if (url?.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);


  useEffect(() => {
    if (!initialSnapshot.current) return;
  
    const current = JSON.stringify(values);
    const hasChanged = current !== initialSnapshot.current;
  
    setIsDirty(hasChanged);
    onDirtyChange?.(hasChanged);
  }, [values]);
  
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
    values.clientType,
    values.candidatePool,
    values.internPool,
    values.assessmentGenerator,
  ]);

  const validateField = (field, value) => {
    if (
      field.required &&
      (!value || value.toString().trim() === "")
    ) {
      return "Required";
    }

    if (field.name === "phone" && value && !/^\d{10}$/.test(value)) {
      return "Phone / Contact must be 10 digits";
    }

    return undefined;
  };

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    if (submitted) {
      const field = schema
        .flatMap((section) => section.fields)
        .find((item) => item.name === name);

      setErrors((prev) => ({
        ...prev,
        [name]: field ? validateField(field, value) : undefined,

      }));
    }
  };

  const handleFileChange = (name, file) => {
    if (!file) return;

    const oldUrl = filePreviews[name];
    if (oldUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(oldUrl);
    }

    const previewUrl = URL.createObjectURL(file);

    setFilePreviews((prev) => ({
      ...prev,
      [name]: previewUrl,
    }));

    setValues((prev) => ({
      ...prev,
      [name]: file,
    }));
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
        if (isEdit && field.hideOnEdit) return;
        if (isEdit && field.type === "file") return;

        const error = validateField(field, values[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      });
    });
    return newErrors;
  };


  return (
    <>
      <form
        id={formId}
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);

          const newErrors = validateForm();
          setErrors(newErrors);

          if (Object.keys(newErrors).length === 0) {
            onSubmit(values);
          } else {
            const firstErrorField = Object.keys(newErrors)[0];
            const el = document.querySelector(`[name="${firstErrorField}"]`);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            el?.focus();
          }

        }}
      >
        {schema.map((section) => (
          <div key={section.section}>
            <h3 className="text-sm font-semibold text-brand mb-4">
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
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {field.label}
                        {field.required && !(isEdit && field.type === "file") && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
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
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {field.label}
                        {field.required && !(isEdit && field.type === "file") && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>

                      <select
                        value={values[field.name] ?? ""}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        className={`w-full h-10 border rounded-md px-3 text-sm bg-white focus:border-[#1b6983] focus:outline-none focus:ring-1 focus:ring-[#1b6983] ${submitted && errors[field.name]
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
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {field.label}
                        {field.required && !(isEdit && field.type === "file") && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
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
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>

                      <textarea
                        value={values[field.name] || ""}
                        onChange={(e) =>
                          handleChange(field.name, e.target.value)
                        }
                        className={`w-full border rounded-md px-3 py-2 text-sm focus:border-[#1b6983] focus:outline-none focus:ring-1 focus:ring-[#1b6983] ${submitted && errors[field.name]
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
                  const file = values[field.name];
                  const previewUrl = filePreviews[field.name];

                  return (
                    <div key={field.name}>
                      <label className="text-xs font-medium text-gray-600 block mb-1">
                        {field.label}
                        {field.required && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </label>

                      {/* Upload Box */}
                      <div className="relative w-full border rounded px-3 py-2 bg-white cursor-pointer border-slate-300 focus-within:border-[#1b6983] focus-within:ring-1 focus-within:ring-[#1b6983]">
                        <input
                          type="file"
                          onChange={(e) =>
                            handleFileChange(field.name, e.target.files[0])
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <span className="text-sm text-brand">
                          {file ? file.name : "Choose file"}
                        </span>
                      </div>

                      {/* Preview */}
                      {file && previewUrl && (
                        <div className="mt-3 relative inline-block">

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => handleFileRemove(field.name)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600 z-10"
                          >
                            <X size={12} />
                          </button>
                          
                          <div
                            onClick={() => {
                              setPreviewFile(previewUrl);
                              setPreviewFileType(
                                file.type?.startsWith("image/")
                                  ? "image"
                                  : file.type === "application/pdf"
                                    ? "pdf"
                                    : "other"
                              );
                            }}
                            className="h-10 w-20 border rounded-md overflow-hidden cursor-pointer bg-white flex items-center justify-center hover:scale-105 transition"
                          >
                            {file.type?.startsWith("image/") ? (
                              <img
                                src={previewUrl}
                                alt="preview"
                                className="h-full w-full object-cover"
                              />
                            ) : file.type === "application/pdf" ? (
                              <div className="flex flex-col items-center justify-center text-red-600 text-xs font-semibold">
                                <span>PDF</span>
                              </div>
                            ) : (
                              <span className="text-xs font-semibold text-brand">
                                {file.name?.split(".").pop()?.toUpperCase()}
                              </span>
                            )}
                          </div>

                        </div>
                      )}
                    </div>
                  );
                }


                return (
                  <div key={field.name}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      {field.label}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                
                    <input
                      type={
                        field.name === "phone"
                          ? "tel"
                          : field.name === "totalUsersAllowed"
                          ? "number"
                          : field.type
                      }
                      min={field.name === "totalUsersAllowed" ? "0" : undefined}
                      inputMode={field.name === "phone" ? "numeric" : undefined}
                      maxLength={field.name === "phone" ? 10 : undefined}
                      value={values[field.name] || ""}
                      onKeyDown={(e) => {
                        // 🚫 Block minus & exponential
                        if (
                          field.name === "totalUsersAllowed" &&
                          (e.key === "-" || e.key === "e")
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        let value = e.target.value;
                
                        // 📞 PHONE → Only numbers
                        if (field.name === "phone") {
                          value = value.replace(/\D/g, "").slice(0, 10);
                        }
                
                        // 👥 USERS → No negative
                        if (field.name === "totalUsersAllowed") {
                          if (value === "") {
                            handleChange(field.name, "");
                            return;
                          }
                          if (Number(value) < 0) return;
                        }
                
                        handleChange(field.name, value);
                      }}
                      className={`w-full h-10 border rounded-md px-3 text-sm focus:border-[#1b6983] focus:outline-none focus:ring-1 focus:ring-[#1b6983] ${
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
        <div
          className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center"
          onClick={() => {
            setPreviewFile(null);
            setPreviewFileType(null);
          }}
        >
          <div
            className="bg-white w-[85vw] max-w-5xl max-h-[90vh] rounded-xl shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-3 border-b">
              <h3 className="text-sm font-semibold">File Preview</h3>
              <button
                onClick={() => {
                  setPreviewFile(null);
                  setPreviewFileType(null);
                }}
                className="text-lg hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex items-center justify-center p-6 bg-slate-50">

              {previewFileType === "image" && (
                <img
                  src={previewFile}
                  alt="Preview"
                  className="max-h-[75vh] max-w-full object-contain"
                />
              )}

              {previewFileType === "pdf" && (
                <iframe
                  src={previewFile}
                  title="PDF Preview"
                  className="w-full h-[75vh] rounded-md"
                />
              )}

              {previewFileType === "other" && (
                <div className="text-sm text-brand">
                  Preview not supported for this file type.
                </div>
              )}
            </div>
          </div>
        </div>
      )}




    </>
  );
}
