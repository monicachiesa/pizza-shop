import { getClientDetails } from "@/api/get-client-details";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { updateClient } from "@/api/update-client";
import { createClient } from "@/api/create-client";
import { useEffect } from "react";

const storeProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().nullable(),
  email: z.string(),
  address: z.string().nullable(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

export interface ClientEditProps {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  open: boolean;
}

export function ClientEdit({ id, open, onClose }: ClientEditProps) {
  const queryClient = useQueryClient();

  const { data: client } = useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClientDetails({ id }),
    enabled: open && id != "" && id != 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    defaultValues: {
      id: client?.id ?? "",
      name: client?.name ?? "",
      email: client?.email ?? "",
      phone: client?.phone ?? "",
      address: client?.address ?? "",
    },
  });

  
  // Atualizar o formulário quando os dados do cliente são carregados
useEffect(() => {
  if (client) {
    reset({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
    });
  }
}, [client, reset]);

  function updateClientCached({
    id,
    name,
    email,
    phone,
    address,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData(["client", id]);

    if (cached) {
      queryClient.setQueryData(["client", id], {
        ...cached,
        name,
        email,
        phone,
        address,
      });
    }

    return { cached };
  }

  function createClientCached({
    name,
    email,
    phone,
    address,
  }: StoreProfileSchema) {
    const cached = queryClient.getQueryData(["client", id]);

    if (cached) {
      queryClient.setQueryData(["client", id], {
        ...cached,
        name,
        email,
        phone,
        address,
      });
    }

    return { cached };
  }

  const { mutateAsync: updateClientFn } = useMutation({
    mutationFn: updateClient,
    //depois de atualizar o perfil, quer buscar as infos novas para atualizar em tela
    //já dispara quando clicar no botão (interface otimista)
    onMutate({ name, email, phone, address }) {
      const { cached } = updateClientCached({ name, email, phone, address });

      return { previusProfile: cached };
    },
    onError(_, __, context) {
      if (context?.previusProfile) {
        updateClientCached(context.previusProfile);
      }
    },
  });

  const { mutateAsync: createClientFn } = useMutation({
    mutationFn: createClient,
    onMutate({ name, email, phone, address }) {
      const { cached } = createClientCached({ name, email, phone, address });

      return { previusProfile: cached };
    },
    onError(_, __, context) {
      if (context?.previusProfile) {
        createClientCached(context.previusProfile);
      }
    },
  });

  async function handleCreateClient(data: StoreProfileSchema) {
    try {
      console.log("Tentando criar cliente com:", data);
      await createClientFn({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
      toast.success("Cliente criado com sucesso");
      reset({
        id: "",
        name: "",
        email: "",
        phone: null,
        address: null,
      });
      onClose();
    } catch (e) {
      console.error("Erro ao criar cliente:", e);
      toast.error("Falha ao criar cliente");
    }
  }

  async function handleUpdateClient(data: StoreProfileSchema) {
    console.log("Updating client with data:", data);
    try {
      await updateClientFn({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });

      toast.success("Cliente atualizado com sucesso");
      onClose();
      // Reset the form fields, keeping the ID
      reset({
        id: data.id, // Keep the current ID
        name: "",
        email: "",
        phone: null,
        address: null,
      });
    } catch (e) {
      toast.error("Falha ao atualizar cliente");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {id != "0" ? "Editar cliente" : "Cadastrar cliente"}
        </DialogTitle>
        <DialogDescription>Perfil do cliente</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <form
          onSubmit={handleSubmit((data) => {
            console.log("Submitting:", data);
            if (id != "0") {
              handleUpdateClient(data);
            } else {
              handleCreateClient(data);
            }
          })}
        >
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Nome
              </Label>
              <Input className="col-span-3" id="name" {...register("name")} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="email">
                E-mail
              </Label>
              <Input className="col-span-3" id="email" {...register("email")} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="phone">
                Telefone
              </Label>
              <Input className="col-span-3" id="phone" {...register("phone")} />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="address">
                Endereço
              </Label>
              <Input
                className="col-span-3"
                id="address"
                {...register("address")}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" variant="success" disabled={isSubmitting}>
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </div>
    </DialogContent>
  );
}
