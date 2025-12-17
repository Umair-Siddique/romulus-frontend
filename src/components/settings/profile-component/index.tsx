import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  InputAdornment,
  Chip,
  Avatar,
} from "@mui/material";
import { useUpdate } from "@refinedev/core";
import { Add as AddIcon } from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import React, { useCallback, useEffect, useReducer, useState } from "react";

import {
  educationData,
  countriesData,
  professionsData,
  availabilityStatus,
  formatDateForInput,
} from "#lib";
import { FileCard } from "./FileCard";
import { countriesCities } from "#lib/constants/data/countriesCities";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const initialState = (data: any) => {
  const isEducator = data?.user?.role === "educator";

  return {
    ...(isEducator && {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.user?.email || "",
      avatar: data?.avatar || "",
      dateOfBirth: data?.dateOfBirth || "",
      phone: data?.user?.phone || "",
      gender: data?.gender || "",
      fullAddress: data?.fullAddress || "",
      city: data?.city || "",
      country: data?.country || "",
      profession: data?.profession || "",
      education: data?.education || "",
      availableForHiring: data?.availableForHiring || false,
      hourlyRate: data?.hourlyRate || "",
      skills: data?.skills || [],
      bio: data?.bio || "",
      certificateOfHonor: data?.certificateOfHonor || "",
      criminalRecord: data?.criminalRecord || "",
      diploma: data?.diploma || "",
      identityProof: data?.identityProof || "",
    }),

    ...(!isEducator && {
      avatar: data?.avatar || "",
      email: data?.user?.email || "",
      city: data?.city || "",
      country: data?.country || "",
      siretNumber: data?.siretNumber || "",
      officeAddress: data?.officeAddress || "",
      phone: data?.phone || "",
      foundedYear: data?.foundedYear || "",
      fullName: data?.organizationName || "",
    }),
  };
};

export const Profile = React.memo(({ profileData }: { profileData: any }) => {
  const theme = useTheme<Theme>();

  const isEducator = profileData?.user?.role === "educator";

  const [correspondingCities, setCorrespondingCities] = useState<string[]>([]);
  const [userData, dispatch] = useReducer(reducer, profileData, initialState);
  const [newSkill, setNewSkill] = React.useState("");

  // Only update when the selected country changes
  useEffect(() => {
    const countryName = userData.country;
    if (countryName && countriesCities[countryName]) {
      setCorrespondingCities(countriesCities[countryName]);
    } else {
      setCorrespondingCities([]);
    }
  }, [userData.country]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !userData.skills.includes(newSkill.trim())) {
      handleChange("skills", [...userData.skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleChange = useCallback((field: string, value: any) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  }, []);

  const handleFileChange = useCallback(
    (field: string, file: File | null) => {
      handleChange(field, file ?? "");
    },
    [handleChange]
  );

  const { mutate } = useUpdate({
    resource: isEducator ? "educators" : "organizations",
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const formData = new FormData();

      Object.entries(userData).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (value instanceof File) {
          // Append raw file, FormData handles it natively
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          // Handle arrays (e.g. skills[])
          value.forEach((item, idx) => {
            formData.append(`${key}[${idx}]`, String(item));
          });
        } else {
          // Numbers, strings, booleans
          formData.append(key, String(value));
        }
      });

      mutate({
        id: profileData._id,
        values: formData,
        meta: { headers: { "Content-Type": "multipart/form-data" } },
      });
    },
    [userData, mutate, profileData._id]
  );

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      "& fieldset": { border: "none" },
    },
  };

  const selectFieldStyle = {
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
    "& .MuiSelect-select": {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    "& .MuiSelect-icon": {
      color: theme.palette.text.secondary,
    },
  };

  const documentFields = [
    { field: "certificateOfHonor", label: "Certificat d'honorabilité" },
    { field: "criminalRecord", label: "Casier judiciaire" },
    { field: "diploma", label: "Diplôme" },
    { field: "identityProof", label: "Justificatif d'identité" },
  ];

  return (
    <Box>
      <Typography
        sx={{
          mb: theme.spacing(2),
          fontWeight: theme.typography.h3.fontWeight,
          fontSize: theme.typography.h3.fontSize,
          fontFamily: theme.typography.h3.fontFamily,
          color: theme.palette.text.primary,
        }}
      >
        Gérer le profil
      </Typography>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: theme.spacing(2),
        }}
      >
        {/* Avatar, Name & Email */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: theme.spacing(2),
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(2),
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: theme.spacing(2),
              }}
            >
              {isEducator ? (
                <>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                      Prénom
                    </Typography>
                    <TextField
                      value={userData.firstName}
                      fullWidth
                      onChange={(e) =>
                        handleChange("firstName", e.target.value)
                      }
                      sx={{
                        width: "100%",
                        ...textFieldStyle,
                      }}
                    />
                  </Box>
                  <Box sx={{ width: "50%" }}>
                    <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                      Nom de famille
                    </Typography>
                    <TextField
                      value={userData.lastName}
                      fullWidth
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      sx={{
                        width: "100%",
                        ...textFieldStyle,
                      }}
                    />
                  </Box>
                </>
              ) : (
                <Box sx={{ width: "100%" }}>
                  <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                    Nom et prénom
                  </Typography>
                  <TextField
                    value={userData.fullName}
                    fullWidth
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    sx={{
                      width: "100%",
                      ...textFieldStyle,
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                E-mail
              </Typography>
              <TextField
                value={userData.email}
                type="email"
                placeholder="john.doe@example.com"
                onChange={(e) => handleChange("email", e.target.value)}
                sx={{
                  width: "100%",
                  ...textFieldStyle,
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: "50%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 150,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: theme.spacing(1),
              }}
            >
              {/* Upload Icon */}
              <Button variant="outlined" component="label">
                Changer d'image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    handleFileChange("avatar", e.target.files[0])
                  }
                />
              </Button>
              {/* Delete Icon */}
              <Button
                variant="outlined"
                onClick={() => handleChange("avatar", "")}
                color="error"
                sx={{ border: "none", textDecoration: "underline" }}
                disabled={!userData.avatar}
              >
                Supprimer l'image
              </Button>
            </Box>

            <Avatar
              src={
                userData.avatar instanceof File
                  ? URL.createObjectURL(userData.avatar)
                  : userData.avatar
                  ? userData.avatar
                  : "https://via.placeholder.com/150"
              }
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt="profile image"
            />
          </Box>
        </Box>

        {/* Date & Phone */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: theme.spacing(2),
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
              {isEducator ? "Date de naissance" : "Année de fondation"}
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={
                isEducator
                  ? userData.dateOfBirth
                    ? formatDateForInput(userData.dateOfBirth)
                    : ""
                  : userData.foundedYear
                  ? formatDateForInput(userData.foundedYear)
                  : ""
              }
              onChange={(e) =>
                handleChange(
                  isEducator ? "dateOfBirth" : "foundedYear",
                  e.target.value
                )
              }
              sx={{
                width: "100%",
                ...textFieldStyle,
              }}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
              Téléphone
            </Typography>
            <TextField
              value={userData.phone.slice(1)}
              type="tel"
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // keep only digits
                if (value.length <= 14) {
                  handleChange("phone", value);
                }
              }}
              sx={{
                width: "100%",
                ...textFieldStyle,
              }}
            />
          </Box>
        </Box>

        {/* Gender or SIRET + Address */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: theme.spacing(2),
            alignItems: "center",
          }}
        >
          {isEducator ? (
            <Box sx={{ width: "50%" }}>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                Genre
              </Typography>
              <Select
                value={userData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                sx={{
                  width: "100%",
                  ...selectFieldStyle,
                }}
              >
                <MenuItem value="" disabled>
                  Sélectionner le genre
                </MenuItem>
                <MenuItem value="mâle">Homme</MenuItem>
                <MenuItem value="femelle">Femme</MenuItem>
              </Select>
            </Box>
          ) : (
            <Box sx={{ width: "50%" }}>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                Numéro SIRET
              </Typography>
              <TextField
                value={userData.siretNumber}
                type="text"
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // keep only digits
                  if (value.length <= 14) {
                    handleChange("siretNumber", value);
                  }
                }}
                sx={{
                  width: "100%",
                  ...textFieldStyle,
                }}
              />
            </Box>
          )}

          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
              Adresse
            </Typography>
            <TextField
              value={isEducator ? userData.fullAddress : userData.officeAddress}
              type="text"
              onChange={(e) =>
                handleChange(
                  isEducator ? "fullAddress" : "officeAddress",
                  e.target.value
                )
              }
              sx={{
                width: "100%",
                ...textFieldStyle,
              }}
            />
          </Box>
        </Box>

        {/* City & Country */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: theme.spacing(2),
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
              Pays
            </Typography>
            <Select
              value={userData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              sx={{
                width: "100%",
                ...selectFieldStyle,
              }}
            >
              <MenuItem value="" disabled>
                Sélectionner le pays
              </MenuItem>
              {countriesData.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
              Ville
            </Typography>
            <Select
              value={userData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              sx={{
                width: "100%",
                ...selectFieldStyle,
              }}
            >
              <MenuItem value="" disabled>
                Sélectionner la ville
              </MenuItem>
              {correspondingCities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {isEducator && (
          <>
            {/* Profession & Education */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: theme.spacing(2),
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                  Profession
                </Typography>
                <Select
                  value={userData.profession}
                  onChange={(e) => handleChange("profession", e.target.value)}
                  sx={{
                    width: "100%",
                    ...selectFieldStyle,
                  }}
                >
                  <MenuItem value="" disabled>
                    Sélectionner la profession
                  </MenuItem>
                  {professionsData.map((profession) => (
                    <MenuItem key={profession} value={profession}>
                      {profession}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box sx={{ width: "50%" }}>
                <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                  Éducation
                </Typography>
                <Select
                  value={userData.education}
                  onChange={(e) => handleChange("education", e.target.value)}
                  sx={{
                    width: "100%",
                    ...selectFieldStyle,
                  }}
                >
                  <MenuItem value="" disabled>
                    Sélectionner l'éducation
                  </MenuItem>
                  {educationData.map((education) => (
                    <MenuItem key={education} value={education}>
                      {education}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>

            {/* Availability */}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: theme.spacing(2),
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "50%" }}>
                <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                  Disponibilité
                </Typography>
                <Select
                  value={
                    userData.availableForHiring ? "Available" : "Not Available"
                  }
                  onChange={(e) =>
                    handleChange(
                      "availableForHiring",
                      e.target.value === "Available"
                    )
                  }
                  sx={{
                    width: "100%",
                    ...selectFieldStyle,
                  }}
                >
                  <MenuItem value="" disabled>
                    Sélectionner la disponibilité
                  </MenuItem>
                  {availabilityStatus.map((availability) => (
                    <MenuItem key={availability} value={availability}>
                      {availability}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Box sx={{ width: "50%" }}>
                <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                  Taux horaire
                </Typography>
                <TextField
                  value={userData.hourlyRate}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">€</InputAdornment>
                    ),
                  }}
                  type="number"
                  onChange={(e) => handleChange("hourlyRate", e.target.value)}
                  sx={{
                    width: "100%",
                    ...textFieldStyle,
                  }}
                />
              </Box>
            </Box>

            {/* Skills */}
            <Box sx={{ width: "100%" }}>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                Compétences
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Ajouter une compétence"
                  sx={{ flex: 1, ...textFieldStyle }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddSkill}
                  sx={{ minWidth: 40 }}
                >
                  <AddIcon />
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: theme.spacing(1),
                  mt: 1,
                }}
              >
                {userData.skills.map((skill: string, index: number) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() =>
                      handleChange(
                        "skills",
                        userData.skills.filter((s: string) => s !== skill)
                      )
                    }
                    size="small"
                    sx={{
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.text.primary,
                      fontSize: "0.875rem",
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Bio */}
            <Box sx={{ width: "100%" }}>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                Bio
              </Typography>
              <TextField
                value={userData.bio}
                type="text"
                multiline
                rows={4}
                onChange={(e) => handleChange("bio", e.target.value)}
                sx={{
                  width: "100%",
                  ...textFieldStyle,
                }}
              />
            </Box>

            {isEducator && (
              <>
                {documentFields.map(({ field, label }) => (
                  <FileCard
                    key={field}
                    label={label}
                    field={field}
                    value={userData[field]}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    theme={theme}
                  />
                ))}
              </>
            )}
          </>
        )}
        {/* Submit Button */}
        <Box sx={{ width: "100%", mt: theme.spacing(2) }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Enregistrer les modifications
          </Button>
        </Box>
      </Box>
    </Box>
  );
});
