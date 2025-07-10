export const getStatusColor = (status: string) => {
  switch (status) {
    case "ongoing":
      return { color: "#ef6c00", backgroundColor: "#fff3e0" }; // dark orange
    case "pending":
      return { color: "#f9a825", backgroundColor: "#fff8e1" }; // amber/dark yellow
    case "completed":
      return { color: "#2e7d32", backgroundColor: "#e8f5e9" }; // dark green
    case "cancelled":
    case "rejected":
      return { color: "#c62828", backgroundColor: "#ffebee" }; // dark red
    default:
      return { color: "#1565c0", backgroundColor: "#e3f2fd" }; // dark blue
  }
};
