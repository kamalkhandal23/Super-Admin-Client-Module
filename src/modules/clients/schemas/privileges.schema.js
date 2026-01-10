export const PRIVILEGES_SCHEMA = [
  {
    "id": 1,
    "parentId": 0,
    "displayName": "Dashboard",
    "enabled": true,
    "children": [
        {
            "id": 2,
            "parentId": 1,
            "displayName": "Employee Dashboard",
            "enabled": true,
            "url": "/dashboard/employee"
        },
        {
            "id": 3,
            "parentId": 1,
            "displayName": "AI Dashboard",
            "enabled": true,
            "url": "/dashboard/ai"
        },
        {
            "id": 44,
            "parentId": 1,
            "displayName": "Hiring Info",
            "enabled": true,
            "url": "/dashboard/hiring"
        },
        {
            "id": 48,
            "parentId": 1,
            "displayName": "Asset Dashboard",
            "enabled": true,
            "url": "/dashboard/assets"
        }
    ]
},
{
    "id": 7,
    "parentId": 0,
    "displayName": "Summary",
    "enabled": false,
    "children": [
        {
            "id": 8,
            "parentId": 7,
            "displayName": "Summary Detail",
            "enabled": false,
            "url": "/summary/detail"
        }
    ]
},
{
    "id": 9,
    "parentId": 0,
    "displayName": "Job Profile",
    "enabled": true,
    "children": [
        {
            "id": 10,
            "parentId": 9,
            "displayName": "Overview",
            "enabled": true,
            "url": "/job/overview"
        },
        {
            "id": 11,
            "parentId": 9,
            "displayName": "Add/View Job",
            "enabled": true,
            "url": "/job/view"
        },
        {
            "id": 98,
            "parentId": 9,
            "displayName": "Assign Job",
            "enabled": true,
            "url": "/job/job-assign"
        },
        {
            "id": 12,
            "parentId": 9,
            "displayName": "Create Assessment",
            "enabled": true,
            "url": "/job/assessment"
        },
        {
            "id": 13,
            "parentId": 9,
            "displayName": "Generate Feedback",
            "enabled": true,
            "url": "/job/feedback"
        },
        {
            "id": 91,
            "parentId": 9,
            "displayName": "Job Workflow",
            "enabled": true,
            "url": "/job/workflow"
        }
    ]
},
{
    "id": 37,
    "parentId": 0,
    "displayName": "AI Screening",
    "enabled": true,
    "children": [
        {
            "id": 38,
            "parentId": 37,
            "displayName": "Sourced Profiles",
            "enabled": true,
            "url": "/candidate/profile"
        },
        {
            "id": 39,
            "parentId": 37,
            "displayName": "Others",
            "enabled": true,
            "url": "/candidate/others"
        }
    ]
},
{
    "id": 14,
    "parentId": 0,
    "displayName": "Talent",
    "enabled": true,
    "children": [
        {
            "id": 15,
            "parentId": 14,
            "displayName": "Overview",
            "enabled": true,
            "url": "/talent/overview"
        },
        {
            "id": 16,
            "parentId": 14,
            "displayName": "Events",
            "enabled": false,
            "url": "/talent/events"
        },
        {
            "id": 17,
            "parentId": 14,
            "displayName": "ATS",
            "enabled": true,
            "url": "/talent/ats"
        },
        {
            "id": 18,
            "parentId": 14,
            "displayName": "IMS",
            "enabled": true,
            "url": "/talent/ims"
        }
    ]
},
{
    "id": 42,
    "parentId": 0,
    "displayName": "Interviews",
    "enabled": true,
    "url": "/talent/events",
    "children": [
        {
            "id": 59,
            "parentId": 42,
            "displayName": "Upcoming Events",
            "enabled": true,
            "url": "/talent/upcoming-events"
        },
        {
            "id": 43,
            "parentId": 42,
            "displayName": "History",
            "enabled": true,
            "url": "/talent/last-events"
        }
    ]
},
{
    "id": 49,
    "parentId": 0,
    "displayName": "Career",
    "enabled": true,
    "children": [
        {
            "id": 50,
            "parentId": 49,
            "displayName": "Template Config",
            "enabled": true,
            "url": "/career/career-setting"
        },
        {
            "id": 51,
            "parentId": 49,
            "displayName": "Apply Form",
            "enabled": true,
            "url": "/career/apply-form"
        }
    ]
},
{
    "id": 19,
    "parentId": 0,
    "displayName": "Vendor",
    "enabled": true,
    "children": [
        {
            "id": 20,
            "parentId": 19,
            "displayName": "Overview",
            "enabled": true,
            "url": "/vendor/overview"
        },
        {
            "id": 21,
            "parentId": 19,
            "displayName": "Add/View Vendors",
            "enabled": true,
            "url": "/vendor/view"
        },
        {
            "id": 22,
            "parentId": 19,
            "displayName": "Share & track Profiles",
            "enabled": true,
            "url": "/vendor/share"
        },
        {
            "id": 23,
            "parentId": 19,
            "displayName": "Invoices",
            "enabled": true,
            "url": "/vendor/invoices"
        }
    ]
},
{
    "id": 24,
    "parentId": 0,
    "displayName": "Feedback",
    "enabled": false,
    "url": "/feedback"
},
{
    "id": 25,
    "parentId": 0,
    "displayName": "Notifications",
    "enabled": false,
    "children": [
        {
            "id": 26,
            "parentId": 25,
            "displayName": "Notifications List",
            "enabled": false,
            "url": "/notifications/list"
        }
    ]
},
{
    "id": 27,
    "parentId": 0,
    "displayName": "Settings",
    "enabled": true,
    "children": [
        {
            "id": 28,
            "parentId": 27,
            "displayName": "Email Template",
            "enabled": true,
            "url": "/user/email-templates"
        },
        {
            "id": 92,
            "parentId": 27,
            "displayName": "Sidebar Privileges",
            "enabled": true,
            "url": "/admin/privileges"
        },
        {
            "id": 93,
            "parentId": 27,
            "displayName": "Remote Config",
            "enabled": true,
            "url": "/admin/remote-config"
        },
        {
            "id": 99,
            "parentId": 27,
            "displayName": "Email Status Mapping",
            "enabled": true,
            "url": "/admin/email-status-mapping"
        },
        {
            "id": 106,
            "parentId": 27,
            "displayName": "Onboarding Docs",
            "enabled": true,
            "url": "/settings/mandatory-documents-config"
        }
    ]
},
{
    "id": 76,
    "parentId": 0,
    "displayName": "Pool",
    "enabled": true,
    "children": [
        {
            "id": 77,
            "parentId": 76,
            "displayName": "Candidate Pool",
            "enabled": true,
            "url": "/pool/list"
        },
        {
            "id": 100,
            "parentId": 76,
            "displayName": "Upload Status",
            "enabled": true,
            "url": "/pool/upload-status"
        },
        {
            "id": 101,
            "parentId": 76,
            "displayName": "Upload Logs",
            "enabled": true,
            "url": "/pool/error-logs"
        }
    ]
},
{
    "id": 29,
    "parentId": 0,
    "displayName": "Support",
    "enabled": false,
    "children": [
        {
            "id": 30,
            "parentId": 29,
            "displayName": "Chat Support",
            "enabled": false,
            "url": "/support/chat"
        }
    ]
},
{
    "id": 31,
    "parentId": 0,
    "displayName": "Employee",
    "enabled": true,
    "children": [
        {
            "id": 32,
            "parentId": 31,
            "displayName": "My Employee",
            "enabled": true,
            "url": "/user/list"
        },
        {
            "id": 33,
            "parentId": 31,
            "displayName": "Role",
            "enabled": false,
            "url": "/user/roles/all"
        },
        {
            "id": 34,
            "parentId": 31,
            "displayName": "Leave",
            "enabled": true,
            "url": "/user/leaves"
        },
        {
            "id": 54,
            "parentId": 31,
            "displayName": "Attendance",
            "enabled": true,
            "url": "/user/attendance"
        },
        {
            "id": 55,
            "parentId": 31,
            "displayName": "Holiday",
            "enabled": true,
            "url": "/user/holiday"
        },
        {
            "id": 56,
            "parentId": 31,
            "displayName": "Policy",
            "enabled": true,
            "url": "/user/policy"
        }
    ]
},
{
    "id": 87,
    "parentId": 0,
    "displayName": "Organization",
    "enabled": true,
    "children": [
        {
            "id": 88,
            "parentId": 87,
            "displayName": "Organization Tree",
            "enabled": true,
            "url": "/organization/tree"
        },
        {
            "id": 89,
            "parentId": 87,
            "displayName": "Organization Directory",
            "enabled": true,
            "url": "/organization/directory"
        }
    ]
},
{
    "id": 35,
    "parentId": 0,
    "displayName": "FAQ",
    "enabled": true,
    "children": [
        {
            "id": 36,
            "parentId": 35,
            "displayName": "FAQ",
            "enabled": true,
            "url": "/faq"
        }
    ]
},
{
    "id": 57,
    "parentId": 0,
    "displayName": "Policies",
    "enabled": false,
    "children": [
        {
            "id": 58,
            "parentId": 57,
            "displayName": "Add/Update Policies",
            "enabled": false,
            "url": "/policies/list"
        }
    ]
},
{
    "id": 40,
    "parentId": 0,
    "displayName": "Payroll",
    "enabled": true,
    "children": [
        {
            "id": 41,
            "parentId": 40,
            "displayName": "Payroll Setting",
            "enabled": true,
            "url": "/payroll/setting"
        },
        {
            "id": 52,
            "parentId": 40,
            "displayName": "Salary Structure",
            "enabled": true,
            "url": "/payroll/salary"
        },
        {
            "id": 53,
            "parentId": 40,
            "displayName": "Attendance",
            "enabled": true,
            "url": "/payroll/attendance"
        },
        {
            "id": 62,
            "parentId": 40,
            "displayName": "Payroll Run",
            "enabled": true,
            "url": "/payroll/run"
        },
        {
            "id": 63,
            "parentId": 40,
            "displayName": "Payslip",
            "enabled": true,
            "url": "/payroll/payslip"
        },
        {
            "id": 64,
            "parentId": 40,
            "displayName": "Compliance",
            "enabled": true,
            "url": "/payroll/compliance"
        },
        {
            "id": 65,
            "parentId": 40,
            "displayName": "ITR Management",
            "enabled": true,
            "url": "/payroll/itr-management"
        }
    ]
},
{
    "id": 45,
    "parentId": 0,
    "displayName": "Asset",
    "enabled": true,
    "children": [
        {
            "id": 46,
            "parentId": 45,
            "displayName": "Add/Update Assets",
            "enabled": true,
            "url": "/asset/add"
        },
        {
            "id": 47,
            "parentId": 45,
            "displayName": "Assign",
            "enabled": true,
            "url": "/asset/assign"
        }
    ]
},
{
    "id": 60,
    "parentId": 0,
    "displayName": "Finance",
    "enabled": true,
    "children": [
        {
            "id": 61,
            "parentId": 60,
            "displayName": "My Finance",
            "enabled": true,
            "url": "/user/finance"
        }
    ]
},
{
    "id": 66,
    "parentId": 0,
    "displayName": "Performance",
    "enabled": true,
    "children": [
        {
            "id": 67,
            "parentId": 66,
            "displayName": "Overview",
            "enabled": true,
            "url": "/performance/overview"
        },
        {
            "id": 97,
            "parentId": 66,
            "displayName": "Metrics",
            "enabled": true,
            "url": "/performance/metrics"
        },
        {
            "id": 68,
            "parentId": 66,
            "displayName": "Goals",
            "enabled": true,
            "url": "/performance/goals"
        },
        {
            "id": 69,
            "parentId": 66,
            "displayName": "Reviews",
            "enabled": true,
            "url": "/performance/reviews"
        },
        {
            "id": 70,
            "parentId": 66,
            "displayName": "Feedback",
            "enabled": true,
            "url": "/performance/feedback"
        },
        {
            "id": 71,
            "parentId": 66,
            "displayName": "Configuration",
            "enabled": true,
            "url": "/performance/settings"
        }
    ]
},
{
    "id": 78,
    "parentId": 0,
    "displayName": "Admin Configuration",
    "enabled": true,
    "children": [
        {
            "id": 79,
            "parentId": 78,
            "displayName": "Add/Update Employee",
            "enabled": true,
            "url": "/admin/employee"
        },
        {
            "id": 80,
            "parentId": 78,
            "displayName": "Role",
            "enabled": true,
            "url": "/admin/role"
        },
        {
            "id": 81,
            "parentId": 78,
            "displayName": "Add/Update Holiday",
            "enabled": true,
            "url": "/admin/holiday"
        },
        {
            "id": 82,
            "parentId": 78,
            "displayName": "Pending Leave Requests",
            "enabled": true,
            "url": "/admin/leave"
        },
        {
            "id": 96,
            "parentId": 78,
            "displayName": "Leave Configuration",
            "enabled": true,
            "url": "/admin/leaveConfig"
        },
        {
            "id": 83,
            "parentId": 78,
            "displayName": "Add/Update Policies",
            "enabled": true,
            "url": "/admin/policies"
        },
        {
            "id": 84,
            "parentId": 78,
            "displayName": "Performance Goals",
            "enabled": true,
            "url": "/admin/goals"
        },
        {
            "id": 85,
            "parentId": 78,
            "displayName": "Performance Config",
            "enabled": true,
            "url": "/admin/performace-config"
        },
        {
            "id": 86,
            "parentId": 78,
            "displayName": "Exit Employees",
            "enabled": true,
            "url": "/admin/exit-process"
        },
        {
            "id": 90,
            "parentId": 78,
            "displayName": "OnBoarding",
            "enabled": true,
            "url": "/admin/onboarding"
        },
        {
            "id": 94,
            "parentId": 78,
            "displayName": "Onboarding Form",
            "enabled": true,
            "url": "/user/onboarding"
        },
        {
            "id": 95,
            "parentId": 78,
            "displayName": "Offboarding Form",
            "enabled": true,
            "url": "/user/offboarding"
        }
    ]
},
{
    "id": 72,
    "parentId": 0,
    "displayName": "Ticketing",
    "enabled": true,
    "children": [
        {
            "id": 73,
            "parentId": 72,
            "displayName": "Configuration",
            "enabled": true,
            "url": "/ticket/configuration"
        },
        {
            "id": 74,
            "parentId": 72,
            "displayName": "Add Ticket",
            "enabled": true,
            "url": "/ticket/add"
        },
        {
            "id": 75,
            "parentId": 72,
            "displayName": "My Tickets",
            "enabled": true,
            "url": "/ticket/all"
        }
    ]
},
{
    "id": 102,
    "parentId": 0,
    "displayName": "Booking",
    "enabled": true,
    "children": [
        {
            "id": 103,
            "parentId": 102,
            "displayName": "Configuration",
            "enabled": true,
            "url": "/booking/configuration"
        },
        {
            "id": 104,
            "parentId": 102,
            "displayName": "Add Booking",
            "enabled": true,
            "url": "/booking/add"
        },
        {
            "id": 105,
            "parentId": 102,
            "displayName": "My Bookings",
            "enabled": true,
            "url": "/booking/all"
        },
      ],
    },
  ];
  