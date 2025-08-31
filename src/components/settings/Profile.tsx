import {
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import {
  Upload as UploadIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useTheme, Theme } from "@mui/material/styles";
import { useReducer } from "react";
import { cities, countries } from "#constants/data";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { ...action.payload };
    default:
      return state;
  }
};

export const Profile = ({ profileData }: { profileData: any }) => {
  const theme = useTheme<Theme>();

  const isEducator = profileData?.user?.role === "educator";

  // ✅ Flattened + consistent initial state
  const initialState = {
    avatar: profileData?.avatar || "",
    email: profileData?.user?.email || "",
    city: profileData?.city || "",
    country: profileData?.country || "",
    name: isEducator
      ? `${profileData?.firstName || ""} ${profileData?.lastName || ""}`.trim()
      : profileData?.organizationName || "",
    phone: isEducator
      ? profileData?.user?.phone || ""
      : profileData?.phone || "",
    gender: isEducator ? profileData?.gender : undefined,
    siretNumber: !isEducator ? profileData?.siretNumber : undefined,
    date: isEducator
      ? profileData?.dateOfBirth || ""
      : profileData?.foundedYear || "",
    address: isEducator
      ? profileData?.fullAddress || ""
      : profileData?.officeAddress || "",
    bio: isEducator ? profileData?.bio : undefined,
  };

  const [userData, dispatch] = useReducer(reducer, initialState);

  const handleChange = (field: string, value: any) => {
    dispatch({ type: "UPDATE_FIELD", field, value });
  };

  const handleImageChange = (file: File | null) => {
    if (!file) {
      handleChange("avatar", "");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleChange("avatar", e.target.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // ✅ YYYY-MM-DD
  };

  const handleSubmit = () => {
    console.log(userData);
  };

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
        Manage Profile
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
              justifyContent: "center",
              position: "relative",
              height: 150,
            }}
          >
            <Box
              component="img"
              src={userData.avatar}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              alt="profile image"
            />
            {/* Upload Icon */}
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 120,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                width: theme.spacing(4),
                height: theme.spacing(4),
                borderRadius: "50%",
                "&:hover": { backgroundColor: theme.palette.primary.dark },
              }}
            >
              <UploadIcon fontSize="small" />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  e.target.files?.[0] && handleImageChange(e.target.files[0])
                }
              />
            </IconButton>
            {/* Delete Icon */}
            {userData.avatar && (
              <IconButton
                onClick={() => handleChange("avatar", "")}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 240,
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.error.contrastText,
                  width: theme.spacing(4),
                  height: theme.spacing(4),
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: theme.palette.error.dark },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </Box>

          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(2),
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                {isEducator ? "Full Name" : "Organization Name"}
              </Typography>
              <TextField
                value={userData.name}
                placeholder={isEducator ? "John Doe" : "My Institute"}
                fullWidth
                onChange={(e) => handleChange("name", e.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    "& fieldset": { border: "none" },
                  },
                }}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                Email
              </Typography>
              <TextField
                value={userData.email}
                type="email"
                placeholder="john.doe@example.com"
                onChange={(e) => handleChange("email", e.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    "& fieldset": { border: "none" },
                  },
                }}
              />
            </Box>
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
              {isEducator ? "Date of Birth" : "Founded Year"}
            </Typography>
            <TextField
              fullWidth
              type="date"
              value={userData.date ? formatDateForInput(userData.date) : ""}
              onChange={(e) => handleChange("date", e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: theme.spacing(0.5),
                  backgroundColor: theme.palette.background.paper,
                  "& fieldset": { border: "none" },
                },
              }}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
              Phone
            </Typography>
            <TextField
              value={userData.phone}
              type="tel"
              placeholder="1234567890"
              onChange={(e) => handleChange("phone", e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                  "& fieldset": { border: "none" },
                },
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
                Gender
              </Typography>
              <Select
                value={userData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSelect-select": {
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                  },
                  "& .MuiSelect-icon": { color: theme.palette.text.secondary },
                }}
              >
                <MenuItem value="" disabled>
                  Select Gender
                </MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </Box>
          ) : (
            <Box sx={{ width: "50%" }}>
              <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
                SIRET Number
              </Typography>
              <TextField
                value={userData.siretNumber}
                type="text"
                placeholder="1234567890123"
                onChange={(e) => handleChange("siretNumber", e.target.value)}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: theme.shape.borderRadius,
                    "& fieldset": { border: "none" },
                  },
                }}
              />
            </Box>
          )}
          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
              Address
            </Typography>
            <TextField
              value={userData.address}
              type="text"
              onChange={(e) => handleChange("address", e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                  "& fieldset": { border: "none" },
                },
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
              City
            </Typography>
            <Select
              value={userData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiSelect-select": {
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                },
                "& .MuiSelect-icon": { color: theme.palette.text.secondary },
              }}
            >
              <MenuItem value="" disabled>
                Select City
              </MenuItem>
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box sx={{ width: "50%" }}>
            <Typography variant="body1" sx={{ mb: theme.spacing(1) }}>
              Country
            </Typography>
            <Select
              value={userData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                "& .MuiSelect-select": {
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                },
                "& .MuiSelect-icon": { color: theme.palette.text.secondary },
              }}
            >
              <MenuItem value="" disabled>
                Select Country
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Bio */}
        {isEducator && (
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
                "& .MuiOutlinedInput-root": {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: theme.shape.borderRadius,
                  "& fieldset": { border: "none" },
                },
              }}
            />
          </Box>
        )}

        {/* Submit Button */}
        <Box sx={{ width: "100%", mt: theme.spacing(2) }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
