```bash
attendance-api/
├── controllers/
│ ├── companyController.js
│ ├── userController.js
│ ├── attendanceScheduleController.js
│ ├── attendanceController.js
│ └── userSessionController.js
├── routes/
│ ├── companyRoutes.js
│ ├── userRoutes.js
│ ├── attendanceScheduleRoutes.js
│ ├── attendanceRoutes.js
│ └── userSessionRoutes.js
├── migrations/
├── seeders/
├── models/
│ ├── attendance.js
│ ├── attendanceschedule.js
│ ├── company.js
│ ├── index.js
│ ├── user.js
│ └── usersession.js
├── app.js
├── package.json
└── config/
└── config.json
```

```bash
+---------------------+
|  Start              |
+---------------------+
         |
         v
+---------------------+
|  User Login         |
+---------------------+
         |
         v
+---------------------+
|  Validate User      |
+---------------------+
         |
         v
+---------------------+     No
|  Valid Credentials? |----------------------->+
+---------------------+                         |
         |                                     v
         | Yes                            +-----------------+
         v                                |  Show Error     |
+---------------------+                   |  Message        |
|  Select Action      |                   +-----------------+
+---------------------+                           |
         |                                       v
         |                                       +
+---------------------+                          |
|  Clock In           |                          |
+---------------------+                          |
         |                                       |
         v                                       |
+---------------------+                          |
|  Record Time        |                          |
+---------------------+                          |
         |                                       |
         v                                       |
+---------------------+                          |
|  Update Record      |                          |
+---------------------+                          |
         |                                       |
         v                                       |
+---------------------+                          |
|  Clock Out          |                          |
+---------------------+                          |
         |                                       |
         v                                       |
+---------------------+                          |
|  Record Time        |                          |
+---------------------+                          |
         |                                       |
         v                                       |
+---------------------+                          |
|  Update Record      |                          |
+---------------------+                          |
         |                                       |
         v                                       |
+---------------------+                          |
|  Logout             |                          |
+---------------------+                          |
         |                                       |
         v                                       |
+---------------------+                          |
|  End Session        |                          |
+---------------------+                          |
         |                                       |
         v                                       |
+---------------------+                          |
|  End                |<-------------------------+
+---------------------+
```
