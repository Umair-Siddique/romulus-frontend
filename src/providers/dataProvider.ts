import type { DataProvider } from "@refinedev/core";

import { requestAPI } from "#utils";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }: { resource: string; id: any }) => {
    const { data } = await requestAPI("GET", `/${resource}/${id}`);

    data.data &&
      localStorage.setItem("romulus-user-profile", JSON.stringify(data.data));

    return {
      data: data.data,
    };
  },

  getList: async ({ resource, filters }) => {
    // Serialize filters into query parameters
    const params: any = [];
    if (filters) {
      filters.forEach((filter) => {
        if ("field" in filter) {
          params.push(`${filter.field}=${filter.value}`);
        }
      });
    }
    const query = params.length ? `?${params.join("&")}` : "";
    const { data } = await requestAPI("GET", `/${resource}${query}`);

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
    const { data } = await requestAPI("POST", `/${resource}`, variables, {
      headers,
    });

    data.data &&
      localStorage.setItem("romulus-user-profile", JSON.stringify(data.data));

    return {
      data: data.data,
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
    const { data } = await requestAPI("PATCH", `/${resource}/${id}`, variables);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }: { resource: string; id: any }) => {
    const { data } = await requestAPI("DELETE", `/${resource}/${id}`);

    return {
      data,
    };
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    const { data } = await requestAPI(method, url, payload, {
      params: {
        filters,
        sorters,
        query,
      },
      headers,
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return import.meta.env.VITE_API_BASE_URL;
  },
};
