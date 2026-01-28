import { useEffect, useState } from "react";
import { calculatePricing } from "../utils/pricing";

export default function SchemaForm({
  schema,
  initialValues = {},
  onSubmit,
  isEdit = false,
  onCustomAction,
}) {
  const [values, setValues] = useState({});

  useEffect(() => {
    setValues(initialValues || {});
  }, [initialValues]);

  // Auto calculate price
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
  };

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
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
                      required={field.required}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                      className="w-full h-10 border border-slate-300 rounded-md px-3 text-sm bg-white"
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
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
                        <label key={opt} className="flex items-center gap-2 text-sm">
                          <input
                            type="radio"
                            name={field.name}
                            value={opt}
                            checked={values[field.name] === opt}
                            onChange={() => handleChange(field.name, opt)}
                            className="accent-brand-dark"
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
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
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm"
                      rows={3}
                    />
                  </div>
                );
              }

              if (field.type === "file") {
                return (
                  <div key={field.name}>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      {field.label}
                    </label>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleChange(field.name, e.target.files[0])
                      }
                      className="w-full text-sm"
                    />
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
                    required={field.required}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="w-full h-10 border border-slate-300 rounded-md px-3 text-sm"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </form>
  );
}
