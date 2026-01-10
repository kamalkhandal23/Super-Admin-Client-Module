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

//auto calculate the price
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
      className="space-y-6 bg-gray-50 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(values);
      }}
    >
      {schema.map((section) => (
        <div
          key={section.section}
          className="bg-white rounded-lg shadow-sm border p-4"
        >
          <h3 className="font-semibold mb-4">
            {section.section}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {section.fields.map((field) => {
              if (isEdit && field.hideOnEdit) return null;

              if (field.type === "custom") {
                return (
                  <button
                    key={field.name}
                    type="button"
                    onClick={() =>
                      onCustomAction?.(field.action)
                    }
                    className="text-blue-600 underline text-sm col-span-2 text-left"
                  >
                    {field.label}
                  </button>
                );
              }

              if (field.type === "readonly") {
                return (
                  <div key={field.name}>
                    <label className="text-sm">
                      {field.label}
                    </label>
                    <input
                      readOnly
                      value={values[field.name] || ""}
                      className="w-full bg-gray-100 border px-2 py-1 rounded"
                    />
                  </div>
                );
              }

              if (field.type === "select") {
                return (
                  <div key={field.name}>
                    <label className="text-sm">
                      {field.label}
                    </label>
                    <select
                      value={values[field.name] ?? ""}
                      required={field.required}
                      onChange={(e) =>
                        handleChange(
                          field.name,
                          e.target.value
                        )
                      }
                      className="w-full border px-2 py-1 rounded"
                    >
                      <option value="">
                        Select {field.label}
                      </option>
                      {field.options.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                        >
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
                    <label className="text-sm block mb-1">
                      {field.label}
                    </label>
                    <div className="flex gap-4 flex-wrap">
                      {field.options.map((opt) => (
                        <label
                          key={opt}
                          className="flex items-center gap-1 text-sm"
                        >
                          <input
                            type="radio"
                            name={field.name}
                            value={opt}
                            checked={
                              values[field.name] === opt
                            }
                            onChange={() =>
                              handleChange(
                                field.name,
                                opt
                              )
                            }
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
                  <div
                    key={field.name}
                    className="col-span-2"
                  >
                    <label className="text-sm">
                      {field.label}
                    </label>
                    <textarea
                      value={values[field.name] || ""}
                      onChange={(e) =>
                        handleChange(
                          field.name,
                          e.target.value
                        )
                      }
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <label className="text-sm">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={values[field.name] || ""}
                    required={field.required}
                    onChange={(e) =>
                      handleChange(
                        field.name,
                        e.target.value
                      )
                    }
                    className="w-full border px-2 py-1 rounded"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="sticky bottom-0 bg-white border-t pt-3 mt-6 flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Client
        </button>
      </div>
    </form>
  );
}
