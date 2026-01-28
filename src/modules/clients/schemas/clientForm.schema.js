export const CLIENT_FORM_SCHEMA = [
  {
    fields: [
      { name: "partnerName", label: "Partner Name", type: "text", required: true },
      {
        name: "password",
        label: "Password for Authentication",
        type: "password",
        required: true,
        minLength: 8,
        hideOnEdit: true,
      },

      { name: "email", label: "Email for Authentication", type: "email", required: true },
      { name: "agreement", label: "Agreement Document", type: "file" },

      { name: "phone", label: "Phone / Contact", type: "tel", required: true },
      { name: "partnerLogo", label: "Partner Logo", type: "file" },

      {
        name: "totalUsersAllowed",
        label: "Total Users Allowed",
        type: "number",
        required: true,
      },
      {
        name: "partnerType",
        label: "Client Type",
        type: "select",
        required: true,
        options: [
          { label: "DEFAULT", value: 0 },
          { label: "HRMS", value: 1 },
          { label: "ATS", value: 2 },
          { label: "BOTH", value: 3 },
          { label: "TICKETING", value: 4 },
          { label: "BOOKING", value: 5 },
        ],
      },

      {
        name: "trialClient",
        label: "Trial Client?",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        name: "candidatePool",
        label: "Subscribed to Candidate Pool?",
        type: "radio",
        options: ["Yes", "No"],
      },

      {
        name: "internPool",
        label: "Subscribed to Intern Pool?",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        name: "assessmentGenerator",
        label: "Subscribed to Assessment Generator?",
        type: "radio",
        options: ["Yes", "No"],
      },

      {
        name: "totalPricingAmount",
        label: "Total Pricing Amount",
        type: "readonly",
      },
      { name: "address", label: "Address", type: "textarea" },
    ],
  },
];
