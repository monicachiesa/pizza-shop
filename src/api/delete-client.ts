import { api } from "@/lib/axios";
import { toast } from "sonner";

export interface DeleteClientBody {
  id: string;
}

export async function deleteClient({ id }: DeleteClientBody) {
  console.log('id', id)
  await api
    .put("/clients/delete", { id })
    .then((response) => {
      console.log('response', response)
      toast.success('Cliente excluído com sucesso!');
    })
    .catch((error) => {
      toast.error('Ocorreu um erro ao excluir o cliente.');
      console.error(error);
    });
}
