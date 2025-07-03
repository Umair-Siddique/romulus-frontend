import type { DataProvider } from "@refinedev/core";
import { httpClient } from "../utils";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }: { resource: string; id: any }) => {
    const { data } = await httpClient.get(`/${resource}/${id}`);

    data.user &&
      localStorage.setItem("romulus-user-profile", JSON.stringify(data));

    return {
      data,
    };
  },

  getList: async ({ resource }: { resource: string }) => {
    const { data } = await httpClient.get(`/${resource}`);

    return {
      data,
      total: data.length,
    };
  },

  create: async ({
    resource,
    variables,
    meta,
  }: {
    resource: string;
    variables: any;
    meta?: any;
  }) => {
    const headers = meta?.headers ?? {};
    const { data } = await httpClient.post(`/${resource}`, variables, {
      headers,
    });

    data.user &&
      localStorage.setItem("romulus-user-profile", JSON.stringify(data));

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
    const { data } = await httpClient.patch(`/${resource}/${id}`, variables);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }: { resource: string; id: any }) => {
    const { data } = await httpClient.delete(`/${resource}/${id}`);

    return {
      data,
    };
  },

  getApiUrl: () => {
    return import.meta.env.VITE_API_BASE_URL;
  },
};
