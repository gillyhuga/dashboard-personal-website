import { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "./utils";
import { AxiosInstance } from "axios";
import { stringify } from "query-string";
import Cookies from "js-cookie";  // Make sure to import Cookies library

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => {
  const getAuthorizationHeader = () => {
    const authToken = Cookies.get("auth_token");  // Get the auth token from cookies
    return authToken ? { Authorization: `Bearer ${authToken}` } : {};
  };

  return {
    getList: async ({ resource, pagination, filters, sorters, meta }) => {
      const url = `${apiUrl}/${resource}`;
      const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};
      const { headers: headersFromMeta, method } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? "get";
      const queryFilters = generateFilter(filters);

      const query: {
        _start?: number;
        _end?: number;
        _sort?: string;
        _order?: string;
      } = {};

      if (mode === "server") {
        query._start = (current - 1) * pageSize;
        query._end = current * pageSize;
      }

      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        query._sort = _sort.join(",");
        query._order = _order.join(",");
      }

      const { data, headers } = await httpClient[requestMethod](
        `${url}?${stringify(query)}&${stringify(queryFilters)}`,
        {
          headers: { ...headersFromMeta, ...getAuthorizationHeader() },
        }
      );

      const total = +headers["x-total-count"];

      return {
        data: data?.data,
        total: total || data.length,
      };
    },

    getMany: async ({ resource, ids, meta }) => {
      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? "get";

      const { data } = await httpClient[requestMethod](
        `${apiUrl}/${resource}?${stringify({ id: ids })}`,
        { headers: { ...headers, ...getAuthorizationHeader() } }
      );

      return {
        data,
      };
    },

    create: async ({ resource, variables, meta }) => {
      const url = `${apiUrl}/${resource}`;
      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "post";

      const { data } = await httpClient[requestMethod](url, variables, {
        headers: { ...headers, ...getAuthorizationHeader() },
      });

      return {
        data,
      };
    },

    update: async ({ resource, id, variables, meta }) => {
      const url = `${apiUrl}/${resource}/${id}`;
      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "put";

      const { data } = await httpClient[requestMethod](url, variables, {
        headers: { ...headers, ...getAuthorizationHeader() },
      });

      return {
        data,
      };
    },

    getOne: async ({ resource, id, meta }) => {
      const url = `${apiUrl}/${resource}/${id}`;
      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypes) ?? "get";

      const { data } = await httpClient[requestMethod](url, {
        headers: { ...headers, ...getAuthorizationHeader() },
      });

      return {
        data: data.data,
      };
    },

    deleteOne: async ({ resource, id, variables, meta }) => {
      const url = `${apiUrl}/${resource}/${id}`;
      const { headers, method } = meta ?? {};
      const requestMethod = (method as MethodTypesWithBody) ?? "delete";

      const { data } = await httpClient[requestMethod](url, {
        data: variables,
        headers: { ...headers, ...getAuthorizationHeader() },
      });

      return {
        data,
      };
    },

    getApiUrl: () => {
      return apiUrl;
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
      let requestUrl = `${url}?`;

      if (sorters) {
        const generatedSort = generateSort(sorters);
        if (generatedSort) {
          const { _sort, _order } = generatedSort;
          const sortQuery = {
            _sort: _sort.join(","),
            _order: _order.join(","),
          };
          requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
        }
      }

      if (filters) {
        const filterQuery = generateFilter(filters);
        requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
      }

      if (query) {
        requestUrl = `${requestUrl}&${stringify(query)}`;
      }

      let axiosResponse;
      switch (method) {
        case "put":
        case "post":
        case "patch":
          axiosResponse = await httpClient[method](url, payload, {
            headers: { ...headers, ...getAuthorizationHeader() },
          });
          break;
        case "delete":
          axiosResponse = await httpClient.delete(url, {
            data: payload,
            headers: { ...headers, ...getAuthorizationHeader() },
          });
          break;
        default:
          axiosResponse = await httpClient.get(requestUrl, {
            headers: { ...headers, ...getAuthorizationHeader() },
          });
          break;
      }

      const { data } = axiosResponse;

      return Promise.resolve({ data });
    },
  };
};
