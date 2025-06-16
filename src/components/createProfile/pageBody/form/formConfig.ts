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
      name: "certificateOfHonor",
      label: "Certificate Of Honor",
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
    { name: "phone", label: "Contact Number", type: "tel", required: true },
    {
      name: "siretNumber",
      label: "SIRET Number",
      type: "text",
      required: false,
    },
    {
      name: "city",
      label: "City",
      type: "select",
      required: true,
      options: ["New York", "London", "Paris", "Tokyo", "Madrid", "Berlin"],
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      required: true,
      options: ["USA", "UK", "France", "Japan", "Spain", "Germany"],
    },
    {
      name: "officeAddress",
      label: "Office Address",
      type: "text",
      required: true,
    },
    {
      name: "branches",
      label: "Add Branches",
      type: "branches",
      required: false,
    },
  ],
};
