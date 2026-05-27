import { useEffect, useState, useMemo, useRef } from "react";
import SchemaForm from "../../components/SchemaForm";
import Toast from "../../components/ui/Toast";

import { CLIENT_FORM_SCHEMA } from "./schemas/clientForm.schema";
import { PRIVILEGES_SCHEMA } from "./schemas/privileges.schema";
import { UI_ACTIONS_SCHEMA } from "./schemas/uiActions.schema";
import ConfirmModal from "../../components/ui/ConfirmModal";
import {
  createClient,
  fetchAllClients,
  fetchPrivilegeServiceConfig,
  updateClient,
} from "../../services/clientService";


import {
  User,
  ShieldCheck,
  LayoutGrid,
  MoreHorizontal,
} from "lucide-react";

const normalizeUIActions = (schema) => {
  if (typeof schema === "string") {
    try {
      return normalizeUIActions(JSON.parse(schema));
    } catch {
      return [];
    }
  }

  if (Array.isArray(schema)) {
    return schema.map((item) => ({
      id: item.id,
      displayName: item.displayName || item.id,
      enabled: !!item.enabled,
      children: Array.isArray(item.children)
        ? item.children
        : Array.isArray(item.actions)
          ? item.actions
          : [],
    }));
  }

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

const normalizePrivileges = (schema, fallback = []) => {
  if (Array.isArray(schema)) return schema;

  if (typeof schema === "string") {
    try {
      const parsed = JSON.parse(schema);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  return fallback;
};

const buildDomain = (partnerName) => {
  const slug = (partnerName || "")
    .toLowerCase()
    .trim()
    .split(/\s+/)[0]
    .replace(/[^a-z0-9-]/g, "");

  return slug ? `${slug}.quiphire.in` : "";
};

const getFileLabel = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.name || "";
};

const buildPricingBreakup = (form, selectedPrivileges) => {
  const enabledServices = selectedPrivileges.flatMap((parent) => {
    const children = parent.children || [];
    const enabledChildren = children.filter((child) => child.enabled);

    if (enabledChildren.length > 0) {
      return enabledChildren.map((child) => child.displayName);
    }

    return parent.enabled ? [parent.displayName] : [];
  });

  const pricingDetails = enabledServices.reduce((acc, service, index) => {
    acc[index + 1] = {
      price: String(form.totalPricingAmount || 0),
      service,
    };
    return acc;
  }, {});

  return {
    pricing_details: pricingDetails,
  };
};

const DEFAULT_OTHERS = {
  backDatePayroll: false,
  enableUiTicket: false,
  specialPrivilege: false,
};

const DrawerSkeleton = () => (
  <div className="animate-pulse px-2">
    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
      {Array.from({ length: 10 }, (_, index) => (
        <div key={index}>
          <div className="mb-2 h-3 w-32 rounded bg-slate-200" />
          <div className="h-9 rounded-md border border-slate-200 bg-slate-100" />
        </div>
      ))}
    </div>
    <div className="mt-6">
      <div className="mb-2 h-3 w-20 rounded bg-slate-200" />
      <div className="h-16 rounded-md border border-slate-200 bg-slate-100" />
    </div>
  </div>
);

export default function ClientDrawer({ open, onClose, editData, onSaved, mode = "create", loading = false }) {
  const isEdit = mode === "edit" || !!editData;
  const [activeTab, setActiveTab] = useState("form");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [initialPrivileges, setInitialPrivileges] = useState([]);
  const [initialUIActions, setInitialUIActions] = useState([]);
  const [others, setOthers] = useState(DEFAULT_OTHERS);
  const [initialOthers, setInitialOthers] = useState(DEFAULT_OTHERS);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const closeTimerRef = useRef(null);
 
  const resetPrivileges = (schema) => {
    return schema.map(parent => ({
      ...parent,
      enabled: false,
      children: parent.children?.map(child => ({
        ...child,
        enabled: false
      }))
    }));
  };

  const resetUIActions = (schema) => {
    const normalized = normalizeUIActions(schema);

    return normalized.map(parent => ({
      ...parent,
      enabled: false,
      children: parent.children.map(child => ({
        ...child,
        enabled: false
      }))
    }));
  };

  const showToast = (message, type = "success", closeAfter = null) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

    setToast({ message, type });

    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 2400);

    if (typeof closeAfter === "number") {
      closeTimerRef.current = setTimeout(() => {
        onClose();
      }, closeAfter);
    }
  };

  
  


  const [privileges, setPrivileges] = useState(
    resetPrivileges(PRIVILEGES_SCHEMA)
  );

  const [uiActions, setUiActions] = useState(
    resetUIActions(UI_ACTIONS_SCHEMA)
  );

  useEffect(() => {
    if (!open) {
      setIsSaving(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (loading) return;

    let extra = {};
    if (isEdit && editData?.additionalData) {
      try {
        extra = JSON.parse(editData.additionalData);
      } catch (error) {
        console.error("Invalid additionalData JSON", error);
      }
    }

    const nextOthers = {
      backDatePayroll: !!extra.backDatePayroll,
      enableUiTicket: !!extra.enableUiTicket,
      specialPrivilege: !!extra.specialPrivilege,
    };

    setOthers(nextOthers);
    setInitialOthers(nextOthers);

    let isMounted = true;

    const loadConfig = async () => {
      let nextPrivileges = resetPrivileges(PRIVILEGES_SCHEMA);
      let nextUIActions = resetUIActions(UI_ACTIONS_SCHEMA);

      try {
        const remotePrivileges = await fetchPrivilegeServiceConfig();
        if (Array.isArray(remotePrivileges) && remotePrivileges.length > 0) {
          nextPrivileges = isEdit
            ? remotePrivileges
            : resetPrivileges(remotePrivileges);
        }
      } catch (error) {
        console.error("Invalid privilege/service config", error);
      }

      if (isEdit && editData?.privileges) {
        nextPrivileges = normalizePrivileges(editData.privileges, nextPrivileges);
      }

      if (isEdit && editData?.privilegeJson) {
        nextPrivileges = normalizePrivileges(editData.privilegeJson, nextPrivileges);
      }

      const extraUIActions = editData?.additionalData
        ? (() => {
            try {
              return JSON.parse(editData.additionalData)?.uiActions;
            } catch {
              return null;
            }
          })()
        : null;

      const savedUIActions =
        editData?.uiActionsJson || editData?.uiActionJson || extraUIActions;

      if (isEdit && savedUIActions) {
        nextUIActions =
          normalizeUIActions(savedUIActions) || nextUIActions;
      }

      if (!isMounted) return;

      setPrivileges(nextPrivileges);
      setInitialPrivileges(structuredClone(nextPrivileges));
      setUiActions(nextUIActions);
      setInitialUIActions(structuredClone(nextUIActions));
    };

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, [isEdit, editData, open, loading]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);
  

  // dirty tracker effect

  useEffect(() => {
    if (!open) return;
    if (loading) return;
  
    const privilegeChanged =
      JSON.stringify(privileges) !== JSON.stringify(initialPrivileges);
  
    const uiChanged =
      JSON.stringify(uiActions) !== JSON.stringify(initialUIActions);

    const othersChanged =
      JSON.stringify(others) !== JSON.stringify(initialOthers);
  
    setIsDirty(privilegeChanged || uiChanged || othersChanged || isFormDirty);
  }, [open, loading, privileges, uiActions, others, initialPrivileges, initialUIActions, initialOthers, isFormDirty]);
  
  
  

  const initialValues = useMemo(() => {
    if (loading) return {};
    if (!isEdit || !editData) return {};

    let extra = {};
    try {
      extra = editData.additionalData
        ? JSON.parse(editData.additionalData)
        : {};
    } catch (e) {
      console.error("Invalid additionalData JSON", e);
    }


    return {
      // Core Info
      partnerName: editData.partnerName || "",
      email: editData.email || editData.contactEmail || "",
      phone: editData.phone || editData.contactPhone || "",
      partnerLogo: extra.partnerLogo || editData.companyLogoUrl || "",
      agreement: extra.agreement || "",

      // Account Config
      totalUsersAllowed: extra.totalUsersAllowed || "",
      trialClient: extra.trialClient ? "Yes" : "No",
      totalPricingAmount: extra.totalPricingAmount || "",

      // Client Type
      clientType: editData.partnerType ?? extra.clientType ?? "",

      // Feature Toggles
      candidatePool: extra.subscribedToCandidatePool ? "Yes" : "No",
      internPool: extra.subscribedToInternPool ? "Yes" : "No",
      assessmentGenerator: extra.subscribedToAssessmentGenerator ? "Yes" : "No",

      // Address
      address: extra.address || "",
    };
  }, [isEdit, editData, loading]);

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
    const anyChildEnabled = updated[pIdx].children.some(c => c.enabled);
    updated[pIdx].enabled = anyChildEnabled;
    setPrivileges(updated);
  };

  const setOtherOption = (name, value) => {
    setOthers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (form) => {
    if (isSaving) return;

    if (!privileges.some((p) => p.enabled)) {
      showToast("Select at least one privilege", "error");
      setActiveTab("privileges");
      return;
    }

    setIsSaving(true);
  
    const serializedUIActions = JSON.stringify(uiActions);

    const payload = {
      partnerName: form.partnerName,
      domain: isEdit ? editData.domain : buildDomain(form.partnerName),
      username: form.partnerName,
      adminFullName: form.partnerName,
      email: form.email,
      phone: form.phone,
      partnerType: Number(form.clientType),
      activeFlag: true,
      coolOffPeriodDays: 7,
      companyLogoUrl: getFileLabel(form.partnerLogo),
      contactPersonName: form.partnerName,
      contactEmail: form.email,
      contactPhone: form.phone,
      password: isEdit ? undefined : form.password,
      privilegeJson: JSON.stringify(privileges),
      uiActionsJson: serializedUIActions,
      uiActionJson: serializedUIActions,
      additionalData: JSON.stringify({
        address: form.address,
        pricingBreakup: buildPricingBreakup(form, privileges),
        clientType: Number(form.clientType),
        subscribedToCandidatePool: form.candidatePool === "Yes",
        subscribedToInternPool: form.internPool === "Yes",
        subscribedToAssessmentGenerator:
          form.assessmentGenerator === "Yes",
        totalUsersAllowed: form.totalUsersAllowed,
        partnerLogo: getFileLabel(form.partnerLogo),
        agreement: getFileLabel(form.agreement),
        trialClient: form.trialClient === "Yes",
        backDatePayroll: others.backDatePayroll,
        enableUiTicket: others.enableUiTicket,
        specialPrivilege: others.specialPrivilege,
        uiActions,
        trialPeriodDays: 0,
        trialStartDate: null,
        trialEndDate: null,
      }),
    };
  
    try {
      let response;

      if (isEdit) {
        response = await updateClient(editData.id, payload);
      } else {
        response = await createClient(payload);
      }

      if (response.success !== false) {
        await onSaved?.();
        showToast(
          isEdit ? "Client modified successfully" : "Client added successfully",
          "success",
          650
        );
        return;
      } else {
        console.warn("Client save returned non-success response:", response);
      }

      setIsSaving(false);
    } catch (error) {
      console.error(error);
      if (!isEdit) {
        try {
          const clients = await fetchAllClients();
          const normalizedDomain = buildDomain(form.partnerName);
          const createdClient = clients.find(
            (client) =>
              client.partnerName?.toLowerCase() ===
                form.partnerName?.toLowerCase() &&
              client.domain?.toLowerCase() === normalizedDomain.toLowerCase()
          );

          if (createdClient) {
            showToast("Client added successfully", "success", 650);
            return;
          }
        } catch (verifyError) {
          console.error("Failed to verify created client", verifyError);
        }
      }

      showToast("Error while saving client", "error");
      setIsSaving(false);
    }
  };
  

  if (!open) return null;

  return (
    <>
      <Toast
        open={!!toast}
        type={toast?.type}
        message={toast?.message}
        onClose={() => setToast(null)}
      />
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={() => {
          if (isFormDirty) {
            setShowConfirm(true);
          } else {
            onClose();
          }
        }}

      >


        <div className="bg-[white] w-[1000px] max-h-[90vh] rounded-xl shadow-xl overflow-hidden flex flex-col"


          onClick={(e) => e.stopPropagation()}
        >


          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b bg-[#e8f0f2]">
            <h2 className="text-lg font-semibold text-brand">


              {isEdit ? "Edit Client" : "Create Client"}
            </h2>
            <button
              onClick={() => {
                if (isFormDirty) {
                  setShowConfirm(true);
                } else {
                  onClose();
                }
              }}
            >
              ✕
            </button>


          </div>

          {/* TABS */}
          <div className="px-6 bg-white border-b">
            <div className="flex gap-8 py-2 text-sm font-medium">
              {[
                { key: "form", label: "Client Details", icon: <User size={16} /> },
                { key: "privileges", label: "Select Privileges", icon: <ShieldCheck size={16} /> },
                { key: "ui", label: "Select UI Actions", icon: <LayoutGrid size={16} /> },
                { key: "others", label: "Others", icon: <MoreHorizontal size={16} /> },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 pb-2 transition ${activeTab === t.key
                    ? "border-b-2 border-brand-dark text-brand-dark"
                    : "text-brand hover:text-brand-dark"
                    }`}
                >
                  {t.icon}
                  {t.label}
                </button>

              ))}
            </div>

          </div>

          <div className="px-6 py-5 overflow-y-auto max-h-[65vh] custom-scroll">



            {loading ? (
              <DrawerSkeleton />
            ) : (
              <>
                {/* FORM */}
                <div className={activeTab === "form" ? "block" : "hidden"}>
                  <div className="px-2">
                    <SchemaForm
                      formId="client-drawer-form"
                      schema={CLIENT_FORM_SCHEMA}
                      initialValues={initialValues}
                      isEdit={isEdit}
                      onSubmit={handleSubmit}
                      onDirtyChange={setIsFormDirty}
                    />

                  </div>
                </div>


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
                        className="h-3.5 w-3.5 accent-[#1b6983]"
                      />
                      {parent.displayName}
                    </label>


                    <div className="relative ml-6 mt-2 pl-4 space-y-1.5 text-brand">
                      <span className="absolute left-0 top-0 h-full w-px bg-[var(--primary-text)]/20" />


                      {parent.children?.map((child, cIdx) => (
                        <label
                          key={child.id}
                          className="relative flex items-center gap-2 text-xs"
                        >
                          <span className="absolute -left-4 top-1/2 h-px w-3 bg-slate-300" />
                          <input
                            type="checkbox"
                            checked={child.enabled}
                            onChange={() =>
                              togglePrivilegeChild(pIdx, cIdx)
                            }
                            className="h-3 w-3 accent-[#1b6983]"
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
                        className="h-3.5 w-3.5 accent-[#1b6983]"
                      />
                      {parent.displayName}
                    </label>

                    <div className="relative ml-6 mt-2 pl-4 space-y-1.5 text-brand">
                      <span className="absolute left-0 top-0 h-full w-px bg-slate-300" />

                      {parent.children.map((child, cIdx) => (
                        <label
                          key={child.key}
                          className="relative flex items-center gap-2 text-xs"
                        >
                          <span className="absolute -left-4 top-1/2 h-px w-3 bg-slate-300" />
                          <input
                            type="checkbox"
                            checked={child.enabled}
                            onChange={() => {
                              const updated = structuredClone(uiActions);
                              updated[pIdx].children[cIdx].enabled =
                                !updated[pIdx].children[cIdx].enabled;
                              const anyChildEnabled = updated[pIdx].children.some(c => c.enabled);
                              updated[pIdx].enabled = anyChildEnabled;
                              setUiActions(updated);
                            }}
                            className="h-3 w-3 accent-[#1b6983]"

                          />
                          {child.displayName}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
                )}

                {/* OTHERS */}
                {activeTab === "others" && (
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 px-2">
                {[
                  { name: "backDatePayroll", label: "Back Date Payroll" },
                  { name: "enableUiTicket", label: "Enable UI Ticket" },
                  { name: "specialPrivilege", label: "Special Privilege" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-medium text-brand mb-2">
                      {field.label}
                    </label>
                    <div className="flex gap-6">
                      {[
                        { label: "Yes", value: true },
                        { label: "No", value: false },
                      ].map((option) => (
                        <label
                          key={option.label}
                          className="flex items-center gap-2 text-sm text-brand"
                        >
                          <input
                            type="radio"
                            name={field.name}
                            checked={others[field.name] === option.value}
                            onChange={() =>
                              setOtherOption(field.name, option.value)
                            }
                            className="accent-brand-dark"
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
                )}
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t bg-white flex justify-end gap-3">
            <button
              onClick={() => {
                if (loading || isSaving) return;
                if (isDirty) {
                  setShowConfirm(true);
                } else {
                  onClose();
                }
              }}
              className="px-5 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading || isSaving}
            >
              Cancel
            </button>

            <button
              onClick={() => {
                if (loading || isSaving) return;
                if (activeTab !== "form") {
                  setActiveTab("form");
                  setTimeout(() => {
                    document.getElementById("client-drawer-form")?.requestSubmit();
                  }, 100);
              
                  return;
                }
              
                document.getElementById("client-drawer-form")?.requestSubmit();
              }}
              
              className="px-5 py-2 bg-[#1b6983] text-white rounded-md hover:bg-[#0c2f3b] disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading || isSaving}

            >
              {isSaving ? "Saving..." : "Save Client"}
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Discard Changes?"
        message="Are you sure you want to discard your changes?"
        confirmText="Discard"
        cancelText="Continue Editing"
        variant="warning"
        onConfirm={onClose}
      />
    </>
  );
}
