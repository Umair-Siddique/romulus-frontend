export const educatorStepsConfig = {
  "Profile Setup": [
    {
      name: "profilePicture",
      label: "Profile Picture",
      type: "file",
      required: false,
    },
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      required: true,
      options: ["Male", "Female", "Other"],
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: true,
    },
    {
      name: "city",
      label: "City",
      type: "select",
      required: true,
      options: ["New York", "London", "Paris", "Tokyo"],
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      required: true,
      options: ["USA", "UK", "France", "Japan"],
    },
    {
      name: "fullAddress",
      label: "Full Address",
      type: "text",
      required: true,
    },
    { name: "bio", label: "Bio", type: "text", required: false },
  ],
  Identity: [
    {
      name: "identityProof",
      label: "Identity Proof",
      type: "file",
      required: true,
    },
    {
      name: "criminalRecord",
      label: "Criminal Record",
      type: "file",
      required: true,
    },
  ],
  Profession: [
    {
      name: "profession",
      label: "Profession",
      type: "select",
      required: true,
      options: ["Teacher", "Trainer", "Consultant", "Coach", "Other"],
    },
    {
      name: "hourlyRate",
      label: "Hourly Rate",
      type: "number",
      required: true,
    },
    { name: "skills", label: "Skills", type: "text", required: true },
    {
      name: "education",
      label: "Education",
      type: "select",
      required: true,
      options: [
        "Bachelor's Degree",
        "Master's Degree",
        "PhD",
        "Professional Certification",
        "Other",
      ],
    },
    {
      name: "certificateOfOwner",
      label: "Certificate of Owner",
      type: "file",
      required: false,
    },
    { name: "diploma", label: "Diploma", type: "file", required: false },
  ],
};

export const organizationStepsConfig = {
  "Profile Setup": [
    {
      name: "profilePicture",
      label: "Profile Picture",
      type: "file",
      required: false,
    },
    {
      name: "organizationName",
      label: "Organization Name",
      type: "text",
      required: true,
    },
    {
      name: "foundedYear",
      label: "Founded Year",
      type: "date",
      required: false,
    },
    { name: "phone", label: "Phone", type: "tel", required: true },
    {
      name: "siretNumber",
      label: "SIRET Number",
      type: "text",
      required: false,
    },
    { name: "city", label: "City", type: "text", required: true },
    { name: "country", label: "Country", type: "text", required: true },
    {
      name: "officeAddress",
      label: "Office Address",
      type: "text",
      required: true,
    },
    // Simplified branches for now - can be expanded later
    { name: "branchName", label: "Branch Name", type: "text", required: true },
    {
      name: "branchEmail",
      label: "Branch Email",
      type: "email",
      required: true,
    },
    { name: "branchPhone", label: "Branch Phone", type: "tel", required: true },
    { name: "branchCity", label: "Branch City", type: "text", required: true },
    {
      name: "branchCountry",
      label: "Branch Country",
      type: "text",
      required: true,
    },
    {
      name: "branchAddress",
      label: "Branch Address",
      type: "text",
      required: true,
    },
    {
      name: "residenceGuidelines",
      label: "Residence Guidelines",
      type: "file",
      required: true,
    },
  ],
};
