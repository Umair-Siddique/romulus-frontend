export const organizationProvider = (apiUrl: string, httpClient: any) => ({
  getOne: async ({ resource, id }: { resource: string; id: any }) => {
    const response = await httpClient.get(`${apiUrl}/${resource}/${id}`);
    const { data } = response.data;

    localStorage.setItem("romulus-user-profile", JSON.stringify(data));

    return {
      data,
    };
  },
  getApiUrl: () => apiUrl,
});
