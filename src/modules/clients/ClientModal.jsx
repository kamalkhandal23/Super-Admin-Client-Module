import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import SchemaForm from "../../components/SchemaForm";
import PrivilegesModal from "./PrivilegesModal";

import { CLIENT_FORM_SCHEMA } from "./schemas/clientForm.schema";
import { PRIVILEGES_SCHEMA } from "./schemas/privileges.schema";

export default function ClientModal({ open, onClose, editData }) {
  const isEdit = !!editData;

  const [privileges, setPrivileges] = useState(PRIVILEGES_SCHEMA);
  const handleSubmit = (form) => {
    if (!privileges.some(p => p.enabled)) {
      alert("Select at least one privilege");
      return;
    }

    const payload = {
      partnerName: form.partnerName,
      email: form.email,
      phone: form.phone,
      password: isEdit ? undefined : form.password,
      privilegeJson: JSON.stringify(privileges),
      additionalData: JSON.stringify({
        address: form.address,
        clientType: form.partnerType,
        totalUsersAllowed: form.totalUsersAllowed,
        trialClient: form.trialClient === "Yes",
      }),
    };

    console.log("FINAL PAYLOAD:", payload);
    alert("Client saved successfully");
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={onClose} title={isEdit ? "Edit Client" : "Create Client"}>

        <div className="flex gap-4 mb-4">
          <button
            className="text-blue-600 text-sm underline"
            onClick={() => setOpenPrivileges(true)}
          >
            Select Privileges
          </button>
        </div>

        <SchemaForm
          schema={CLIENT_FORM_SCHEMA}
          initialValues={editData}
          isEdit={isEdit}
          onSubmit={handleSubmit}
        />
      </Modal>

      <PrivilegesModal
        open={openPrivileges}
        onClose={() => setOpenPrivileges(false)}
        privileges={privileges}
        setPrivileges={setPrivileges}
      />
    </>
  );
}
