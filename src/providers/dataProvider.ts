import type { DataProvider } from "@refinedev/core";
import { httpClient } from "../utils";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }: { resource: string; id: any }) => {
    const response = await httpClient.get(`/${resource}/${id}`);
    const { data } = response.data;

    data.user &&
      localStorage.setItem("romulus-user-profile", JSON.stringify(data));

    return {
      data,
    };
  },

  getList: async ({ resource }: { resource: string }) => {
    const response = await httpClient.get(`/${resource}`);
    const { data } = response.data;

    return {
      data,
      total: data.length,
    };
  },

  create: async ({
    resource,
    variables,
  }: {
    resource: string;
    variables: any;
  }) => {
    const response = await httpClient.post(`/${resource}`, variables);
    const { data } = response.data;

    return {
      data,
    };
  },

  update: async ({
    resource,
    id,
    variables,
  }: {
    resource: string;
    id: any;
    variables: any;
  }) => {
    const response = await httpClient.patch(`/${resource}/${id}`, variables);
    const { data } = response.data;

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }: { resource: string; id: any }) => {
    const response = await httpClient.delete(`/${resource}/${id}`);
    const { data } = response.data;

    return {
      data,
    };
  },

  getApiUrl: () => {
    return import.meta.env.VITE_API_BASE_URL;
  },
};
