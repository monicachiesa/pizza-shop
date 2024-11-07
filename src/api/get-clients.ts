import { api } from "@/lib/axios";

export interface GetClientsQuery {
  pageIndex?: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface GetClientsResponse {
  clients: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: "manager" | "customer";
    createdAt: Date | null;
    updatedAt: Date | null;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export function getClients({ pageIndex, name, email, phone }: GetClientsQuery) {
  return api
    .get<GetClientsResponse>("clients", {
      params: {
        pageIndex,
        name,
        email,
        phone,
      },
    })
    .then((response) => response.data);
}
