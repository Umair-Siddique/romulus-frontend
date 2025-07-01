export const userProvider = (apiUrl: string, httpClient: any) => ({
  getOne: async ({ resource, id }: { resource: string; id: any }) => {
    const response = await httpClient.get(`${apiUrl}/${resource}/${id}`);
    return {
      data: response.data,
    };
  },
  getApiUrl: () => apiUrl,
});
