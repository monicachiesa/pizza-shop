import { api } from "@/lib/axios";

export interface GetClientDetailsParams {
  id: string;
}

export interface GetClientDetailsResponse {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
}

export function getClientDetails({ id }: GetClientDetailsParams) {
  return api
    .get<GetClientDetailsResponse>(`clients/${id}`)
    .then((response) => response.data);
}
