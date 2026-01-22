import { useEffect, useState, useMemo } from "react";
import SchemaForm from "../../components/SchemaForm";

import { CLIENT_FORM_SCHEMA } from "./schemas/clientForm.schema";
import { PRIVILEGES_SCHEMA } from "./schemas/privileges.schema";
import { UI_ACTIONS_SCHEMA } from "./schemas/uiActions.schema";

import {
  User,
  ShieldCheck,
  LayoutGrid,
  ChevronRight,
} from "lucide-react";

const normalizeUIActions = (schema) => {
  if (!schema || typeof schema !== "object") return [];

  return Object.entries(schema).map(([key, value]) => ({
    id: key,
    displayName: key,
    enabled: !!value.enabled,
    children: Array.isArray(value.actions)
      ? value.actions.map((a) => ({
        key: a.key,
        displayName: a.displayName,
        enabled: !!a.enabled,
      }))
      : [],
  }));
};

export default function ClientDrawer({ open, onClose, editData }) {
  const isEdit = !!editData;
  const [activeTab, setActiveTab] = useState("form");

  const [privileges, setPrivileges] = useState(PRIVILEGES_SCHEMA);
  const [uiActions, setUiActions] = useState(
    normalizeUIActions(UI_ACTIONS_SCHEMA)
  );

  useEffect(() => {
    if (!editData?.privilegeJson) return;
    try {
      setPrivileges(JSON.parse(editData.privilegeJson));
    } catch (e) {
      console.error("Invalid privilegeJson", e);
    }
  }, [editData]);


  useEffect(() => {
    if (editData?.uiActionsJson) {
      try {
        const parsed = JSON.parse(editData.uiActionsJson);
        setUiActions(
          Array.isArray(parsed) ? parsed : normalizeUIActions(parsed)
        );
        return;
      } catch (e) {
        console.error("Invalid uiActionsJson", e);
      }
    }
    setUiActions(normalizeUIActions(UI_ACTIONS_SCHEMA));
  }, [editData]);

  const initialValues = useMemo(() => {
    if (!isEdit) return {};
    return {
      partnerName: editData.partnerName || "",
      email: editData.email || "",
      phone: editData.phone || "",
    };
  }, [isEdit, editData]);

  const togglePrivilegeParent = (pIdx) => {
    const updated = structuredClone(privileges);
    updated[pIdx].enabled = !updated[pIdx].enabled;
    updated[pIdx].children?.forEach(
      (c) => (c.enabled = updated[pIdx].enabled)
    );
    setPrivileges(updated);
  };

  const togglePrivilegeChild = (pIdx, cIdx) => {
    const updated = structuredClone(privileges);
    updated[pIdx].children[cIdx].enabled =
      !updated[pIdx].children[cIdx].enabled;
    setPrivileges(updated);
  };

  const handleSubmit = (form) => {
    if (!privileges.some((p) => p.enabled)) {
      alert("Select at least one privilege");
      return;
    }

    const payload = {
      partnerName: form.partnerName,
      email: form.email,
      phone: form.phone,
      password: isEdit ? undefined : form.password,
      privilegeJson: JSON.stringify(privileges),
      uiActionsJson: JSON.stringify(uiActions),
    };

    console.log("FINAL PAYLOAD:", payload);
    alert("Client saved successfully");
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        onClick={onClose}
      >
        <div
          className="bg-slate-100 w-[1000px] max-h-[90vh] rounded-xl shadow-xl overflow-hidden flex flex-col"

          onClick={(e) => e.stopPropagation()}
        >


          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
            <h2 className="text-base font-semibold text-brand-dark">

              {isEdit ? "Edit Client" : "Create Client"}
            </h2>
            <button onClick={onClose} className="text-xl">✕</button>
          </div>

          {/* TABS */}
          <div className="px-6 bg-white border-b">
            <div className="flex gap-8 py-3 text-sm font-medium">
              {[
                { key: "form", label: "Client Details", icon: <User size={16} /> },
                { key: "privileges", label: "Select Privileges", icon: <ShieldCheck size={16} /> },
                { key: "ui", label: "Select UI Actions", icon: <LayoutGrid size={16} /> },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 pb-2 transition ${activeTab === t.key
                    ? "border-b-2 border-brand-dark text-brand-dark"
                    : "text-slate-500 hover:text-brand-dark"
                    }`}
                >
                  {t.icon}
                  {t.label}
                </button>

              ))}
            </div>

            {/* Progress Indicator */}
            <div className="h-1 bg-slate-200 rounded">
              <div
                className="h-1 bg-brand-dark rounded transition-all"
                style={{
                  width:
                    activeTab === "form"
                      ? "33%"
                      : activeTab === "privileges"
                        ? "66%"
                        : "100%",
                }}
              />
            </div>
          </div>

          <div className="p-6 bg-white overflow-y-auto max-h-[65vh] space-y-8">


            {/* FORM */}
            {activeTab === "form" && (
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <SchemaForm
                  schema={CLIENT_FORM_SCHEMA}
                  initialValues={initialValues}
                  isEdit={isEdit}
                  onSubmit={handleSubmit}
                />
              </div>
            )}

            {/* PRIVILEGES */}
            {activeTab === "privileges" && (
              <div className="grid grid-cols-3 gap-4">
                {privileges.map((parent, pIdx) => (
                  <div
                    key={parent.id}
                    className="bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition"
                  >
                    <label className="flex items-center gap-2 font-semibold text-brand-dark mb-2">
                      <ShieldCheck size={16} className="text-brand-dark/70" />
                      <input
                        type="checkbox"
                        checked={parent.enabled}
                        onChange={() => togglePrivilegeParent(pIdx)}
                      />
                      {parent.displayName}
                    </label>


                    <div className="relative ml-6 mt-2 pl-4 space-y-1.5 text-slate-600">
                      <span className="absolute left-0 top-0 h-full w-px bg-slate-300" />

                      {parent.children?.map((child, cIdx) => (
                        <label
                          key={child.id}
                          className="relative flex items-center gap-2 text-sm"
                        >
                          <span className="absolute -left-4 top-1/2 h-px w-3 bg-slate-300" />
                          <input
                            type="checkbox"
                            checked={child.enabled}
                            onChange={() =>
                              togglePrivilegeChild(pIdx, cIdx)
                            }
                          />
                          {child.displayName}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* UI ACTIONS */}
            {activeTab === "ui" && (
              <div className="grid grid-cols-3 gap-4">
                {uiActions.map((parent, pIdx) => (
                  <div
                    key={parent.id}
                    className="bg-white rounded-xl p-4 border shadow-sm hover:shadow-md transition"
                  >
                    <label className="flex items-center gap-2 font-semibold text-brand-dark mb-2">
                      <input
                        type="checkbox"
                        checked={parent.enabled}
                        onChange={() => {
                          const updated = structuredClone(uiActions);
                          const value = !updated[pIdx].enabled;
                          updated[pIdx].enabled = value;
                          updated[pIdx].children.forEach(
                            (c) => (c.enabled = value)
                          );
                          setUiActions(updated);
                        }}
                      />
                      {parent.displayName}
                    </label>

                    <div className="relative ml-6 mt-2 pl-4 space-y-1.5 text-slate-600">
                      <span className="absolute left-0 top-0 h-full w-px bg-slate-300" />

                      {parent.children.map((child, cIdx) => (
                        <label
                          key={child.key}
                          className="relative flex items-center gap-2 text-sm"
                        >
                          <span className="absolute -left-4 top-1/2 h-px w-3 bg-slate-300" />
                          <input
                            type="checkbox"
                            checked={child.enabled}
                            onChange={() => {
                              const updated = structuredClone(uiActions);
                              updated[pIdx].children[cIdx].enabled =
                                !updated[pIdx].children[cIdx].enabled;
                              setUiActions(updated);
                            }}
                          />
                          {child.displayName}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t bg-white flex justify-end gap-3">
            <button onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button
              onClick={() => document.querySelector("form")?.requestSubmit()}
              className="px-4 py-2 bg-brand-dark text-white rounded hover:bg-brand-dark/90"
            >
              Save Client
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
