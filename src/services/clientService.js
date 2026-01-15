export const fetchClients = async () => {
  const response = await Promise.resolve({
    success: true,
    data: [
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      {
        id: 1,
        partnerName: "Taya",
        domain: "Taya.quiphire.in",
        activeFlag: false,
        coolOffPeriodDays: 7,

        privilegeJson: JSON.stringify([
          {
            id: 1,
            parentId: 0,
            displayName: "Dashboard",
            enabled: true,
            children: [
              {
                id: 2,
                parentId: 1,
                displayName: "Employee Dashboard",
                enabled: true,
              },
              {
                id: 3,
                parentId: 1,
                displayName: "AI Dashboard",
                enabled: false,
              },
            ],
          },
          {
            id: 9,
            parentId: 0,
            displayName: "Job Profile",
            enabled: true,
            children: [
              {
                id: 10,
                parentId: 9,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 11,
                parentId: 9,
                displayName: "Add/View Job",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "ATS",
            displayName: "ATS",
            enabled: true,
            children: [
              {
                key: "ATS_BULK_RESUME_UPLOAD",
                displayName: "Bulk Resume Upload",
                enabled: true,
              },
              {
                key: "ATS_EXPORT_CANDIDATES",
                displayName: "Export Candidates",
                enabled: false,
              },
            ],
          },
          {
            id: "HRM",
            displayName: "HRM",
            enabled: false,
            children: [
              {
                key: "HRM_BULK_EMPLOYEE_UPLOAD",
                displayName: "Bulk Employee Upload",
                enabled: false,
              },
            ],
          },
        ]),
      },

      {
        id: 2,
        partnerName: "test",
        domain: "test.quiphire.in",
        activeFlag: true,
        coolOffPeriodDays: 10,

        privilegeJson: JSON.stringify([
          {
            id: 14,
            parentId: 0,
            displayName: "Talent",
            enabled: true,
            children: [
              {
                id: 15,
                parentId: 14,
                displayName: "Overview",
                enabled: true,
              },
              {
                id: 17,
                parentId: 14,
                displayName: "ATS",
                enabled: true,
              },
            ],
          },
        ]),

        uiActionsJson: JSON.stringify([
          {
            id: "TICKETING",
            displayName: "Ticketing",
            enabled: true,
            children: [
              {
                key: "TICKET_BULK_CLOSE",
                displayName: "Bulk Close Tickets",
                enabled: true,
              },
              {
                key: "TICKET_REOPEN",
                displayName: "Reopen Ticket",
                enabled: false,
              },
            ],
          },
        ]),
      },
      
    ],
  });

  return response.data;
};
