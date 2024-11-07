import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

export interface ClientTableFilterProps {}

const clientFiltersSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional()
});

type ClientFiltersSchema = z.infer<typeof clientFiltersSchema>;

export function ClientTableFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");

  const { register, handleSubmit, control, reset } =
    useForm<ClientFiltersSchema>({
      resolver: zodResolver(clientFiltersSchema),
      defaultValues: {
        id: id ?? 0,
        email: email ?? "",
        name: name ?? "",
        phone: phone?? "",
      },
    });

  function handleFilter({ id, email, name, phone }: ClientFiltersSchema) {
    setSearchParams((state) => {
      if (id) {
        state.set("id", id);
      } else {
        state.delete("id");
      }

      if (email) {
        state.set("email", email);
      } else {
        state.delete("email");
      }

      if (name) {
        state.set("name", name);
      } else {
        state.delete("name");
      }

      if (phone) {
        state.set("phone", phone);
      } else {
        state.delete("phone");
      }

      state.set("page", "1"); //quando filtra, tem que voltar pra página 1
      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      //remove tudo da URL
      state.delete("id");
      state.delete("name");
      state.delete("email");
      state.delete("phone");
      state.set("page", "1"); //volta para a página 1
      return state;
    });

    reset({
      id: 0,
      name: "",
      email: "",
      phone: ""
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Filtros: </span>
      <Input
        placeholder="Id do cliente"
        className="h-8 w-auto"
        {...register("id")}
      />
      <Input
        placeholder="Nome do cliente"
        className="h-8 w-[320px]"
        {...register("name")}
      />      
      <Button type="submit" variant="secondary">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>
      <Button onClick={handleClearFilters} type="button" variant="outline">
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
