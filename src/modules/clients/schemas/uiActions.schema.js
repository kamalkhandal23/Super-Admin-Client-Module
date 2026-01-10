export const UI_ACTIONS_SCHEMA = {
  ATS: {
    enabled: false,
    actions: [
      {
        key: "ATS_BULK_RESUME_UPLOAD",
        displayName: "Bulk Resume Upload",
        enabled: false,
      },
      {
        key: "ATS_AI_JD_PARSE",
        displayName: "AI JD Parse",
        enabled: false,
      },
      {
        key: "ATS_EXPORT_CANDIDATES",
        displayName: "Export Candidates",
        enabled: false,
      },
    ],
  },

  HRM: {
    enabled: false,
    actions: [
      {
        key: "HRM_BULK_EMPLOYEE_UPLOAD",
        displayName: "Bulk Employee Upload",
        enabled: false,
      },
    ],
  },
  
  TICKETING: {
    "enabled": true,
	"actions": [
  	{
    	"key": "TICKET_BULK_CLOSE",
    	"displayName": "Bulk Close Tickets",
    	"enabled": true
  	},
  	{
    	"key": "TICKET_REOPEN",
    	"displayName": "Reopen Ticket",
    	"enabled": false,
    },
  ]
  }
};
