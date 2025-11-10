import { Box, Typography, Avatar, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useUserContext } from "#context";

export const SearchBox = ({
  handleSearch,
  searchResults,
  searchValue,
  setSearchResults,
  setSearchValue,
  setSelectedRecipient,
  setSelectedSender,
}: {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: any[];
  searchValue: string;
  setSearchValue: (value: string) => void;
  setSearchResults: (results: any) => void;
  setSelectedRecipient: (recipient: any) => void;
  setSelectedSender: (sender: any) => void;
}) => {
  const theme = useTheme();
  const { user, userProfile } = useUserContext();
  const { userId, role } = user || {};
  const { firstName, lastName, organizationName, avatar } = userProfile || {};

  const userName =
    role === "admin" ? "Admin" : organizationName || `${firstName} ${lastName}`;

  const handleSelect = (item: any) => {
    setSelectedRecipient({
      id: item._id,
      name: item.organizationName || `${item.firstName} ${item.lastName}`,
      avatar: item.avatar,
    });
    setSelectedSender({
      id: userId,
      name: userName,
      avatar,
    });

    setSearchResults([]);
    setSearchValue("");
  };

  const hasResults = searchResults && searchResults.length > 0;

  return (
    <Box sx={{ position: "relative", mb: 2 }}>
      <Box
        component="input"
        placeholder="Rechercher des utilisateurs..."
        onChange={handleSearch}
        value={searchValue}
        sx={{
          width: "100%",
          height: "42px",
          px: 2,
          mb: 1,
          border: "1px solid",
          borderColor: theme.palette.divider,
          outline: "none",
          borderRadius: "24px",
          fontSize: "0.9rem",
          backgroundColor: theme.palette.background.paper,
          transition:
            "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:focus": {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 2px ${theme.palette.primary.main}33`,
          },
        }}
      />

      {(hasResults || (searchValue && !hasResults)) && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            mt: 1,
            borderRadius: 2,
            maxHeight: 300,
            overflowY: "auto",
            zIndex: 10,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          {hasResults ? (
            searchResults.map((item: any) => (
              <Box
                key={item._id}
                onClick={() => handleSelect(item)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  cursor: "pointer",
                  transition: "all 0.15s ease-in-out",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                    transform: "scale(1.01)",
                  },
                }}
              >
                <Avatar
                  src={item.avatar}
                  alt={item.organizationName || "User"}
                  sx={{ width: 36, height: 36 }}
                />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {item.organizationName ||
                      `${item.firstName} ${item.lastName}`}
                  </Typography>
                  {item.email && (
                    <Typography variant="caption" color="text.secondary">
                      {item.email}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                p: 1.5,
                textAlign: "center",
                color: theme.palette.text.secondary,
              }}
            >
              Aucun résultat trouvé
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};
