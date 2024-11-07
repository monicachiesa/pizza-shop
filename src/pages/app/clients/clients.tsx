import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Pagination } from "@/components/pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ClientTableFilter } from "./client-table-filters";
import { ClientTableRow } from "./client-table-row";
import { ClientTableSkeleton } from "./client-table-skeleton";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ClientEdit } from "./client-edit";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getClients } from "@/api/get-clients";

export function Clients() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isClientsOpen, setIsClientsOpen] = useState(false);

  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const phone = searchParams.get("phone");

  useEffect(() => {
    console.log("result.clients", result);
  }, []);

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingClients } = useQuery({
    queryKey: ["clients", pageIndex, name, email, phone],
    queryFn: () =>
      getClients({
        pageIndex,
        name,
        email,
        phone,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());

      return state;
    });
  }

  return (
    <>
      <Helmet title="Clientes" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center">
          <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
          <Dialog open={isClientsOpen} onOpenChange={setIsClientsOpen}>
            <DialogTrigger asChild>
              <Button className="ml-auto w-[9%]" type="submit">
                Novo
              </Button>
            </DialogTrigger>
            <ClientEdit open={isClientsOpen} id={"0"} name={""} email={""} phone={null} />
          </Dialog>
        </div>
        <div className="space-y-2.5">
          <ClientTableFilter />
          <div className="bclient rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[140px]">Identificador</TableHead>
                  <TableHead className="w-[180px]">Nome</TableHead>
                  <TableHead className="w-[140px]">E-mail</TableHead>
                  <TableHead className="w-[140px]">Telefone</TableHead>
                  <TableHead className="w-[164px]"></TableHead>
                  <TableHead className="w-[132px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingClients && <ClientTableSkeleton />}

                {result && result?.clients &&
                  result?.clients?.map((client) => {
                    return <ClientTableRow key={client.id} client={client} />;
                  })}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              onPageChange={handlePaginate}
              pageIndex={result?.meta?.pageIndex}
              totalCount={result?.meta?.totalCount}
              perPage={result?.meta?.perPage}
            />
          )}
        </div>
      </div>
    </>
  );
}
