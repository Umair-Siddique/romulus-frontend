```
Project Tree

📁 romulus-web
├── 📄 index.html
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
├── 📄 vercel.json
├── 📄 vite-env.d.ts
├── 📄 vite.config.ts
├── 📁 public
│   ├── 📄 android-chrome-192x192.png
│   ├── 📄 android-chrome-512x512.png
│   ├── 📄 apple-touch-icon.png
│   ├── 📄 auth-bg.jpg
│   ├── 📄 favicon-16x16.png
│   ├── 📄 favicon-32x32.png
│   ├── 📄 favicon.ico
│   ├── 📄 logo.png
│   ├── 📄 site.webmanifest
│   └── 📁 images
│       ├── 📄 auth-bg.jpg
│       └── 📄 logo.png
└── 📁 src
    ├── 📄 App.tsx
    ├── 📄 index.css
    ├── 📄 index.tsx
    ├── 📄 theme.ts
    ├── 📁 components
    │   ├── 📄 Header.tsx
    │   ├── 📄 index.ts
    │   ├── 📄 LogoComponent.tsx
    │   ├── 📄 Modal.tsx
    │   ├── 📄 Reviews.tsx
    │   ├── 📄 TextLink.tsx
    │   ├── 📁 auth
    │   │   ├── 📄 index.tsx
    │   │   ├── 📁 auth-background
    │   │   │   └── 📄 index.tsx
    │   │   └── 📁 auth-form
    │   │       ├── 📄 AuthFormHeader.tsx
    │   │       ├── 📄 AuthSubmitButton.tsx
    │   │       ├── 📄 index.tsx
    │   │       └── 📁 auth-form-field
    │   │           ├── 📄 CheckboxField.tsx
    │   │           ├── 📄 index.tsx
    │   │           ├── 📄 OtpField.tsx
    │   │           ├── 📄 TextInputField.tsx
    │   │           └── 📁 radio-field
    │   │               ├── 📄 index.tsx
    │   │               └── 📄 UserTypeCard.tsx
    │   ├── 📁 create-profile
    │   │   ├── 📄 index.ts
    │   │   ├── 📄 PageHeader.tsx
    │   │   └── 📁 page-body
    │   │       ├── 📄 HeroHeader.tsx
    │   │       ├── 📄 index.tsx
    │   │       ├── 📄 ProgressStepper.tsx
    │   │       └── 📁 create-profile-form
    │   │           ├── 📄 form-config.ts
    │   │           ├── 📄 FormStep.tsx
    │   │           ├── 📄 index.tsx
    │   │           ├── 📄 NavigationButtons.tsx
    │   │           ├── 📁 form-field
    │   │           │   ├── 📄 index.tsx
    │   │           │   └── 📁 fields
    │   │           │       ├── 📄 AvatarField.tsx
    │   │           │       ├── 📄 BranchesField.tsx
    │   │           │       ├── 📄 BranchModal.tsx
    │   │           │       ├── 📄 DateField.tsx
    │   │           │       ├── 📄 FileUploadField.tsx
    │   │           │       ├── 📄 index.tsx
    │   │           │       ├── 📄 NumberField.tsx
    │   │           │       ├── 📄 SelectField.tsx
    │   │           │       ├── 📄 SkillsField.tsx
    │   │           │       └── 📄 TextField.tsx
    │   │           └── 📁 review-steps
    │   │               ├── 📄 FileDisplay.tsx
    │   │               ├── 📄 IdentitySection.tsx
    │   │               ├── 📄 index.tsx
    │   │               ├── 📄 InfoRow.tsx
    │   │               ├── 📄 ProfessionSection.tsx
    │   │               ├── 📄 ProfileSection.tsx
    │   │               ├── 📄 SectionHeader.tsx
    │   │               ├── 📄 SkillChips.tsx
    │   │               └── 📁 branches-section
    │   │                   ├── 📄 BranchCard.tsx
    │   │                   └── 📄 index.tsx
    │   ├── 📁 dashboard
    │   │   ├── 📄 index.ts
    │   │   ├── 📁 admin
    │   │   │   └── 📄 index.tsx
    │   │   └── 📁 user
    │   │       ├── 📄 index.tsx
    │   │       ├── 📁 kpi-cards
    │   │       │   ├── 📄 index.tsx
    │   │       │   └── 📄 KpiCard.tsx
    │   │       └── 📁 tab-view
    │   │           ├── 📄 index.tsx
    │   │           └── 📁 tabs
    │   │               ├── 📄 index.ts
    │   │               ├── 📁 calendar-tab
    │   │               │   ├── 📄 index.tsx
    │   │               │   ├── 📄 MissionsModal.tsx
    │   │               │   └── 📄 Toolbar.tsx
    │   │               └── 📁 mission-tab
    │   │                   ├── 📄 index.tsx
    │   │                   ├── 📄 MissionCard.tsx
    │   │                   └── 📄 Toolbar.tsx
    │   ├── 📁 drawer
    │   │   ├── 📄 index.ts
    │   │   ├── 📁 drawer
    │   │   │   └── 📄 index.tsx
    │   │   └── 📁 header
    │   │       └── 📄 index.tsx
    │   ├── 📁 find-educator
    │   │   ├── 📄 ContactAdmin.tsx
    │   │   ├── 📄 index.ts
    │   │   ├── 📄 RadiusSlider.tsx
    │   │   ├── 📁 create-mission-modal
    │   │   │   ├── 📄 BranchSelection.tsx
    │   │   │   ├── 📄 DateTimeSection.tsx
    │   │   │   ├── 📄 DescriptionField.tsx
    │   │   │   ├── 📄 FileUploadSection.tsx
    │   │   │   ├── 📄 index.tsx
    │   │   │   ├── 📄 MissionTitleField.tsx
    │   │   │   ├── 📄 PreferredEducatorSelection.tsx
    │   │   │   └── 📄 SkillsSection.tsx
    │   │   └── 📁 map
    │   │       ├── 📄 index.tsx
    │   │       └── 📄 Recenter.tsx
    │   ├── 📁 mission-details
    │   │   ├── 📄 ContactInformationCard.tsx
    │   │   ├── 📄 DocumentDownloadSection.tsx
    │   │   ├── 📄 EducatorTable.tsx
    │   │   ├── 📄 index.ts
    │   │   ├── 📄 MissionDescriptionCard.tsx
    │   │   ├── 📄 MissionDetails.tsx
    │   │   ├── 📄 MissionHeader.tsx
    │   │   ├── 📄 MissionInfoSection.tsx
    │   │   └── 📄 PreferredEducatorCard.tsx
    │   ├── 📁 page-meta
    │   │   ├── 📄 index.tsx
    │   │   ├── 📄 PageDescription.tsx
    │   │   └── 📄 PageTitle.tsx
    │   ├── 📁 profile
    │   │   ├── 📄 index.ts
    │   │   ├── 📄 ProfessionalDetails.tsx
    │   │   ├── 📄 ProfileCard.tsx
    │   │   ├── 📄 ProfileHeader.tsx
    │   │   └── 📄 UserBio.tsx
    │   ├── 📁 sider
    │   │   ├── 📄 Header.tsx
    │   │   ├── 📄 index.tsx
    │   │   ├── 📄 LogoutButton.tsx
    │   │   ├── 📄 navigationData.ts
    │   │   ├── 📄 NavigationList.tsx
    │   │   └── 📄 TrainingProgressCard.tsx
    │   └── 📁 tab-view
    │       └── 📄 index.tsx
    ├── 📁 constants
    │   ├── 📄 index.ts
    │   └── 📄 validationRules.ts
    ├── 📁 context
    │   ├── 📄 index.ts
    │   └── 📄 UserContext.tsx
    ├── 📁 pages
    │   ├── 📄 index.ts
    │   ├── 📁 auth
    │   │   ├── 📄 formFields.ts
    │   │   ├── 📄 index.tsx
    │   │   ├── 📁 ForgotPassword
    │   │   │   └── 📄 index.tsx
    │   │   ├── 📁 Login
    │   │   │   └── 📄 index.tsx
    │   │   ├── 📁 Register
    │   │   │   ├── 📄 formConfig.tsx
    │   │   │   ├── 📄 formFields.tsx
    │   │   │   ├── 📄 index.tsx
    │   │   │   └── 📄 modalConfig.tsx
    │   │   └── 📁 UpdatePassword
    │   │       └── 📄 index.tsx
    │   ├── 📁 branches
    │   │   └── 📄 index.tsx
    │   ├── 📁 chats
    │   │   └── 📄 index.tsx
    │   ├── 📁 createProfile
    │   │   └── 📄 index.tsx
    │   ├── 📁 dashboard
    │   │   └── 📄 index.tsx
    │   ├── 📁 educatorDetails
    │   │   └── 📄 index.tsx
    │   ├── 📁 educators
    │   │   └── 📄 index.tsx
    │   ├── 📁 findEducator
    │   │   └── 📄 index.tsx
    │   ├── 📁 missionDetails
    │   │   └── 📄 index.tsx
    │   ├── 📁 missions
    │   │   └── 📄 index.tsx
    │   ├── 📁 organizationDetails
    │   │   └── 📄 index.tsx
    │   ├── 📁 organizations
    │   │   └── 📄 index.tsx
    │   ├── 📁 reportDetails
    │   │   └── 📄 index.tsx
    │   ├── 📁 reports
    │   │   └── 📄 index.tsx
    │   ├── 📁 settings
    │   │   └── 📄 index.tsx
    │   └── 📁 training
    │       └── 📄 index.tsx
    ├── 📁 providers
    │   ├── 📄 authProvider.ts
    │   ├── 📄 dataProvider.ts
    │   └── 📄 index.ts
    ├── 📁 types
    │   ├── 📄 assets.d.ts
    │   └── 📄 index.ts
    └── 📁 utils
        └── 📄 index.ts

```
