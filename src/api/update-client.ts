import { api } from "@/lib/axios";

export interface UpdateClientBody {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export async function updateClient({ id, name, email, phone, address }: UpdateClientBody) {
  await api.put("clients", { id, name, email, phone, address });
}

