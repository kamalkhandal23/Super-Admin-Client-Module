import { useEffect, useState, useRef } from "react";
import Modal from "../../components/Modal";
import SchemaForm from "../../components/SchemaForm";
import PrivilegesModal from "./PrivilegesModal";
import Toast from "../../components/ui/Toast";

import { CLIENT_FORM_SCHEMA } from "./schemas/clientForm.schema";
import { PRIVILEGES_SCHEMA } from "./schemas/privileges.schema";
import {
  createClient,
  fetchAllClients,
  fetchPrivilegeServiceConfig,
  updateClient,
} from "../../services/clientService";

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

const resetPrivileges = (schema) => {
  return schema.map((parent) => ({
    ...parent,
    enabled: false,
    children: parent.children?.map((child) => ({
      ...child,
      enabled: false,
    })),
  }));
};

export default function ClientModal({ open, onClose, editData }) {
  const isEdit = !!editData;

  const [privileges, setPrivileges] = useState(
    resetPrivileges(PRIVILEGES_SCHEMA)
  );
  const [openPrivileges, setOpenPrivileges] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

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

  useEffect(() => {
    if (!open) return;

    let isMounted = true;

    const loadPrivileges = async () => {
      let nextPrivileges = resetPrivileges(PRIVILEGES_SCHEMA);

      try {
        const remotePrivileges = await fetchPrivilegeServiceConfig();
        if (Array.isArray(remotePrivileges) && remotePrivileges.length > 0) {
          nextPrivileges = isEdit
            ? remotePrivileges
            : resetPrivileges(remotePrivileges);
        }
      } catch (error) {
        console.error("Failed to load privilege config", error);
      }

      if (isEdit && editData?.privileges) {
        nextPrivileges = normalizePrivileges(editData.privileges, nextPrivileges);
      }

      if (isEdit && editData?.privilegeJson) {
        nextPrivileges = normalizePrivileges(
          editData.privilegeJson,
          nextPrivileges
        );
      }

      if (!isMounted) return;

      setPrivileges(nextPrivileges);
    };

    loadPrivileges();

    return () => {
      isMounted = false;
    };
  }, [open, isEdit, editData]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleSubmit = async (form) => {
    if (!privileges.some((p) => p.enabled)) {
      showToast("Select at least one privilege", "error");
      return;
    }

    const serializedUIActions = JSON.stringify([]);

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
        trialPeriodDays: 0,
        trialStartDate: null,
        trialEndDate: null,
      }),
    };

    try {
      const response = isEdit
        ? await updateClient(editData.id, payload)
        : await createClient(payload);

      if (response.success) {
        showToast(
          isEdit ? "Client modified successfully" : "Client added successfully",
          "success",
          650
        );
        return;
      }
    } catch (error) {
      console.error(error);
    }

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
        showToast(
          isEdit ? "Client modified successfully" : "Client added successfully",
          "success",
          650
        );
        return;
      }
    } catch (verifyError) {
      console.error("Failed to verify created client", verifyError);
    }

    showToast("Error while saving client", "error");
  };

  return (
    <>
      <Toast
        open={!!toast}
        type={toast?.type}
        message={toast?.message}
        onClose={() => setToast(null)}
      />
      <Modal
        open={open}
        onClose={onClose}
        title={isEdit ? "Edit Client" : "Create Client"}
      >

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
