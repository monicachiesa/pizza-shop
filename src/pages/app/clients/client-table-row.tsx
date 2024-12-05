import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Search, Trash, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { deleteClient } from "@/api/delete-client";
import { aplicarMascaraTelefone } from "@/utils/masks";
import { ClientEdit } from "./client-edit";

interface ClientTableRowProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    address: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
}

export function ClientTableRow({ client }: ClientTableRowProps) {
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteClient({ id });
      setConfirmationModalOpen(false); // Fecha o modal após a exclusão
    } catch (error) {
      console.error("Erro ao excluir o cliente:", error);
    }
  };

  const handleEditClient = async (id: string) => {
    setConfirmationModalOpen(true);
  };

  return (
    <TableRow>
      <TableCell></TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {client.id}
      </TableCell>
      <TableCell className="text-muted-foreground">{client.name}</TableCell>
      <TableCell>{client.email?.toLocaleLowerCase()}</TableCell>
      <TableCell className="font-medium">
        {client.phone ? aplicarMascaraTelefone(client.phone) : "-"}
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Edit className="h-3 w-3" />
            </Button>
          </DialogTrigger>
          <ClientEdit
            open={editModalOpen}
            id={client.id}
            name={client.name}
            email={client.email}
            phone={client.phone}
            address={client.address}
          />
        </Dialog>
        <AlertDialog
          open={confirmationModalOpen}
          onOpenChange={setConfirmationModalOpen}
        >
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Trash className="h-3 w-3" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmação</AlertDialogTitle>
              <AlertDialogDescription>
                Deseja realmente excluir este cliente?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => setConfirmationModalOpen(false)}
              >
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteClient(client.id)}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
