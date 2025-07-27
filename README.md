```
📁 romulus-web
├── 📁 public
│   ├── 📁 images
│   │   ├── 📄 auth-bg.jpg
│   │   └── 📄 logo.png
│   ├── 📄 android-chrome-192x192.png
│   ├── 📄 android-chrome-512x512.png
│   ├── 📄 apple-touch-icon.png
│   ├── 📄 auth-bg.jpg
│   ├── 📄 favicon-16x16.png
│   ├── 📄 favicon-32x32.png
│   ├── 📄 favicon.ico
│   ├── 📄 logo.png
│   └── 📄 site.webmanifest
├── 📁 src
│   ├── 📁 components
│   │   ├── 📁 auth
│   │   │   ├── 📁 auth-background
│   │   │   │   └── 📄 index.tsx
│   │   │   ├── 📁 auth-form
│   │   │   │   ├── 📁 auth-form-field
│   │   │   │   │   ├── 📁 radio-field
│   │   │   │   │   │   ├── 📄 index.tsx
│   │   │   │   │   │   └── 📄 UserTypeCard.tsx
│   │   │   │   │   ├── 📄 CheckboxField.tsx
│   │   │   │   │   ├── 📄 index.tsx
│   │   │   │   │   ├── 📄 OtpField.tsx
│   │   │   │   │   └── 📄 TextInputField.tsx
│   │   │   │   ├── 📄 AuthFormHeader.tsx
│   │   │   │   ├── 📄 AuthSubmitButton.tsx
│   │   │   │   └── 📄 index.tsx
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 create-profile
│   │   │   ├── 📁 page-body
│   │   │   │   ├── 📁 create-profile-form
│   │   │   │   │   ├── 📁 form-field
│   │   │   │   │   │   ├── 📁 fields
│   │   │   │   │   │   │   ├── 📄 AvatarField.tsx
│   │   │   │   │   │   │   ├── 📄 BranchesField.tsx
│   │   │   │   │   │   │   ├── 📄 BranchModal.tsx
│   │   │   │   │   │   │   ├── 📄 DateField.tsx
│   │   │   │   │   │   │   ├── 📄 FileUploadField.tsx
│   │   │   │   │   │   │   ├── 📄 index.tsx
│   │   │   │   │   │   │   ├── 📄 NumberField.tsx
│   │   │   │   │   │   │   ├── 📄 SelectField.tsx
│   │   │   │   │   │   │   ├── 📄 SkillsField.tsx
│   │   │   │   │   │   │   └── 📄 TextField.tsx
│   │   │   │   │   │   └── 📄 index.tsx
│   │   │   │   │   ├── 📁 review-steps
│   │   │   │   │   │   ├── 📁 branches-section
│   │   │   │   │   │   │   ├── 📄 BranchCard.tsx
│   │   │   │   │   │   │   └── 📄 index.tsx
│   │   │   │   │   │   ├── 📄 FileDisplay.tsx
│   │   │   │   │   │   ├── 📄 IdentitySection.tsx
│   │   │   │   │   │   ├── 📄 index.tsx
│   │   │   │   │   │   ├── 📄 InfoRow.tsx
│   │   │   │   │   │   ├── 📄 ProfessionSection.tsx
│   │   │   │   │   │   ├── 📄 ProfileSection.tsx
│   │   │   │   │   │   ├── 📄 SectionHeader.tsx
│   │   │   │   │   │   └── 📄 SkillChips.tsx
│   │   │   │   │   ├── 📄 form-config.ts
│   │   │   │   │   ├── 📄 FormStep.tsx
│   │   │   │   │   ├── 📄 index.tsx
│   │   │   │   │   └── 📄 NavigationButtons.tsx
│   │   │   │   ├── 📄 HeroHeader.tsx
│   │   │   │   ├── 📄 index.tsx
│   │   │   │   └── 📄 ProgressStepper.tsx
│   │   │   ├── 📄 index.ts
│   │   │   └── 📄 PageHeader.tsx
│   │   ├── 📁 dashboard
│   │   │   ├── 📁 admin
│   │   │   │   └── 📄 index.tsx
│   │   │   ├── 📁 user
│   │   │   │   ├── 📁 kpi-cards
│   │   │   │   │   ├── 📄 index.tsx
│   │   │   │   │   └── 📄 KpiCard.tsx
│   │   │   │   ├── 📁 tab-view
│   │   │   │   │   ├── 📁 tabs
│   │   │   │   │   │   ├── 📁 calendar-tab
│   │   │   │   │   │   │   ├── 📄 index.tsx
│   │   │   │   │   │   │   ├── 📄 MissionsModal.tsx
│   │   │   │   │   │   │   └── 📄 Toolbar.tsx
│   │   │   │   │   │   ├── 📁 mission-tab
│   │   │   │   │   │   │   ├── 📄 index.tsx
│   │   │   │   │   │   │   ├── 📄 MissionCard.tsx
│   │   │   │   │   │   │   └── 📄 Toolbar.tsx
│   │   │   │   │   │   └── 📄 index.ts
│   │   │   │   │   └── 📄 index.tsx
│   │   │   │   └── 📄 index.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 drawer
│   │   │   ├── 📁 drawer
│   │   │   │   └── 📄 index.tsx
│   │   │   ├── 📁 header
│   │   │   │   └── 📄 index.tsx
│   │   │   └── 📄 index.ts
│   │   ├── 📁 find-educator
│   │   │   ├── 📁 create-mission-modal
│   │   │   │   ├── 📄 BranchSelection.tsx
│   │   │   │   ├── 📄 DateTimeSection.tsx
│   │   │   │   ├── 📄 DescriptionField.tsx
│   │   │   │   ├── 📄 FileUploadSection.tsx
│   │   │   │   ├── 📄 index.tsx
│   │   │   │   ├── 📄 MissionTitleField.tsx
│   │   │   │   ├── 📄 PreferredEducatorSelection.tsx
│   │   │   │   └── 📄 SkillsSection.tsx
│   │   │   ├── 📁 map
│   │   │   │   ├── 📄 index.tsx
│   │   │   │   └── 📄 Recenter.tsx
│   │   │   ├── 📄 ContactAdmin.tsx
│   │   │   ├── 📄 index.ts
│   │   │   └── 📄 RadiusSlider.tsx
│   │   ├── 📁 mission-details
│   │   │   ├── 📄 ContactInformationCard.tsx
│   │   │   ├── 📄 DocumentDownloadSection.tsx
│   │   │   ├── 📄 EducatorTable.tsx
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 MissionDescriptionCard.tsx
│   │   │   ├── 📄 MissionDetails.tsx
│   │   │   ├── 📄 MissionHeader.tsx
│   │   │   ├── 📄 MissionInfoSection.tsx
│   │   │   └── 📄 PreferredEducatorCard.tsx
│   │   ├── 📁 page-meta
│   │   │   ├── 📄 index.tsx
│   │   │   ├── 📄 PageDescription.tsx
│   │   │   └── 📄 PageTitle.tsx
│   │   ├── 📁 profile
│   │   │   ├── 📄 index.ts
│   │   │   ├── 📄 ProfessionalDetails.tsx
│   │   │   ├── 📄 ProfileCard.tsx
│   │   │   ├── 📄 ProfileHeader.tsx
│   │   │   └── 📄 UserBio.tsx
│   │   ├── 📁 sider
│   │   │   ├── 📄 Header.tsx
│   │   │   ├── 📄 index.tsx
│   │   │   ├── 📄 LogoutButton.tsx
│   │   │   ├── 📄 navigationData.ts
│   │   │   ├── 📄 NavigationList.tsx
│   │   │   └── 📄 TrainingProgressCard.tsx
│   │   ├── 📁 tab-view
│   │   │   └── 📄 index.tsx
│   │   ├── 📄 Header.tsx
│   │   ├── 📄 index.ts
│   │   ├── 📄 LogoComponent.tsx
│   │   ├── 📄 Modal.tsx
│   │   ├── 📄 Reviews.tsx
│   │   └── 📄 TextLink.tsx
│   ├── 📁 constants
│   │   ├── 📄 index.ts
│   │   └── 📄 validationRules.ts
│   ├── 📁 context
│   │   ├── 📄 index.ts
│   │   └── 📄 UserContext.tsx
│   ├── 📁 pages
│   │   ├── 📁 auth
│   │   │   ├── 📁 ForgotPassword
│   │   │   │   └── 📄 index.tsx
│   │   │   ├── 📁 Login
│   │   │   │   └── 📄 index.tsx
│   │   │   ├── 📁 Register
│   │   │   │   ├── 📄 formConfig.tsx
│   │   │   │   ├── 📄 formFields.tsx
│   │   │   │   ├── 📄 index.tsx
│   │   │   │   └── 📄 modalConfig.tsx
│   │   │   ├── 📁 UpdatePassword
│   │   │   │   └── 📄 index.tsx
│   │   │   ├── 📄 formFields.ts
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 branches
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 chats
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 createProfile
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 dashboard
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 educatorDetails
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 educators
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 findEducator
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 missionDetails
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 missions
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 organizationDetails
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 organizations
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 reportDetails
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 reports
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 settings
│   │   │   └── 📄 index.tsx
│   │   ├── 📁 training
│   │   │   └── 📄 index.tsx
│   │   └── 📄 index.ts
│   ├── 📁 providers
│   │   ├── 📄 authProvider.ts
│   │   ├── 📄 dataProvider.ts
│   │   └── 📄 index.ts
│   ├── 📁 types
│   │   ├── 📄 assets.d.ts
│   │   └── 📄 index.ts
│   ├── 📁 utils
│   │   └── 📄 index.ts
│   ├── 📄 App.tsx
│   ├── 📄 index.css
│   ├── 📄 index.tsx
│   └── 📄 theme.ts
├── 📄 index.html
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README.md
├── 📄 tsconfig.json
├── 📄 tsconfig.node.json
├── 📄 vercel.json
├── 📄 vite-env.d.ts
└── 📄 vite.config.ts
```
