import { useEffect, useState, useMemo } from "react";
import SchemaForm from "../../components/SchemaForm";
import PrivilegesModal from "./PrivilegesModal";
import UIActionsModal from "./UIActionsModal";

import { CLIENT_FORM_SCHEMA } from "./schemas/clientForm.schema";
import { PRIVILEGES_SCHEMA } from "./schemas/privileges.schema";
import { UI_ACTIONS_SCHEMA } from "./schemas/uiActions.schema";

export default function ClientDrawer({ open, onClose, editData }) {
  const isEdit = !!editData;

  const [privileges, setPrivileges] = useState(PRIVILEGES_SCHEMA);
  const [uiActions, setUiActions] = useState(UI_ACTIONS_SCHEMA);

  const [openPrivileges, setOpenPrivileges] = useState(false);
  const [openUIActions, setOpenUIActions] = useState(false);

  useEffect(() => {
    if (!editData?.privilegeJson) return;
    try {
      setPrivileges(JSON.parse(editData.privilegeJson));
    } catch (e) {
      console.error("Invalid privilegeJson", e);
    }
  }, [editData]);

  const parsedAdditionalData = useMemo(() => {
    if (!editData?.additionalData) return {};
    try {
      return JSON.parse(editData.additionalData);
    } catch {
      return {};
    }
  }, [editData]);

  const initialValues = useMemo(() => {
    if (!isEdit) return {};
    return {
      partnerName: editData.partnerName || "",
      email: editData.email || "",
      phone: editData.phone || "",
      address: parsedAdditionalData.address || "",
      clientType: parsedAdditionalData.clientType || "",
      totalUsersAllowed: parsedAdditionalData.totalUsersAllowed || "",
      trialClient: parsedAdditionalData.trialClient ? "Yes" : "No",
      region: parsedAdditionalData.region || "",
    };
  }, [isEdit, editData, parsedAdditionalData]);

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
      additionalData: JSON.stringify({
        address: form.address,
        clientType: form.partnerType,
        subscribedToCandidatePool: form.candidatePool === "Yes",
        subscribedToInternPool: form.internPool === "Yes",
        subscribedToAssessmentGenerator:
          form.assessmentGenerator === "Yes",
        totalUsersAllowed: form.totalUsersAllowed,
        trialClient: form.trialClient === "Yes",
        region: form.region,
      }),
    };

    console.log("FINAL PAYLOAD:", payload);
    alert("Client saved successfully");
    onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-white w-[900px] max-h-[90vh] rounded-lg shadow-lg overflow-hidden">

          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">
              {isEdit ? "Edit Client" : "Create Client"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[75vh]">
            <div className="flex gap-4 mb-4">
              <button
                className="text-blue-600 text-sm underline"
                onClick={() => setOpenPrivileges(true)}
              >
                Select Privileges
              </button>
              <button
                className="text-blue-600 text-sm underline"
                onClick={() => setOpenUIActions(true)}
              >
                Select UI Actions
              </button>
            </div>

            <SchemaForm
              schema={CLIENT_FORM_SCHEMA}
              initialValues={initialValues}
              isEdit={isEdit}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>

      <PrivilegesModal
        open={openPrivileges}
        onClose={() => setOpenPrivileges(false)}
        privileges={privileges}
        setPrivileges={setPrivileges}
      />

      <UIActionsModal
        open={openUIActions}
        onClose={() => setOpenUIActions(false)}
        uiActions={uiActions}
        setUiActions={setUiActions}
      />
    </>
  );
}
