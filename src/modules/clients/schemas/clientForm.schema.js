export const CLIENT_FORM_SCHEMA = [
// CORE CLIENT INFO
  {
    section: "Core Client Information",
    fields: [
      { name: "partnerName", label: "Partner Name", type: "text", required: true },
      { name: "email", label: "Email for Authentication", type: "email", required: true },
      {
        name: "password",
        label: "Password for Authentication",
        type: "password",
        required: true,
        minLength: 8,
        hideOnEdit: true,
      },
      { name: "phone", label: "Phone / Contact", type: "tel", required: true },
      { name: "partnerLogo", label: "Partner Logo", type: "file" },
      { name: "agreement", label: "Agreement Document", type: "file" },
    ],
  },

//ACCOUNT CONFIG
  {
    section: "Account & Usage Configuration",
    fields: [
      {
        name: "totalUsersAllowed",
        label: "Total Users Allowed",
        type: "number",
        required: true,
      },
      {
        name: "trialClient",
        label: "Trial Client",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        name: "totalPricingAmount",
        label: "Total Pricing Amount",
        type: "readonly",
      },
    ],
  },


  // PARTNER TYPE

  {
    section: "Partner Type",
    fields: [
      {
        name: "partnerType",
        label: "Partner Type",
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
    ],
  },


  //FEATURE TOGGLES
  
  {
    section: "Subscription & Feature Toggles",
    fields: [
      {
        name: "candidatePool",
        label: "Candidate Pool Access",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        name: "internPool",
        label: "Intern Pool Access",
        type: "radio",
        options: ["Yes", "No"],
      },
      {
        name: "assessmentGenerator",
        label: "Assessment Generator",
        type: "radio",
        options: ["Yes", "No"],
      },
    ],
  },


  // SERVICES
  // {
  //   section: "Subscribed Services",
  //   fields: [
  //     {
  //       name: "subscribedServices",
  //       label: "Select Subscribed Services",
  //       type: "custom",
  //       action: "OPEN_PRIVILEGES_MODAL",
  //     },
  //   ],
  // },


  //SECTION 6: ADDRESS

  {
    section: "Address Information",
    fields: [
      { name: "address", label: "Address", type: "textarea" },
    ],
  },


  // UI ACTIONS

  // {
  //   section: "UI Restrictions & UI Actions",
  //   fields: [
  //     {
  //       name: "uiActions",
  //       label: "Configure UI Actions",
  //       type: "custom",
  //       action: "OPEN_UI_ACTIONS_MODAL",
  //     },
  //   ],
  // },
];
