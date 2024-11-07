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

interface ClientTableRowProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
}

export function ClientTableRow({ client }: ClientTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleDeleteClient = async (id: string) => {
    try {
      await deleteClient({ id });
      setConfirmationModalOpen(false); // Fecha o modal após a exclusão
    } catch (error) {
      console.error("Erro ao excluir o cliente:", error);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do cliente</span>
            </Button>
          </DialogTrigger>

          {/*  <ClientDetails open={isDetailsOpen} clientId={client.clientId} />  /*/}
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {client.id}
      </TableCell>
      <TableCell className="text-muted-foreground">{client.name}</TableCell>
      <TableCell>{client.email}</TableCell>
      <TableCell className="font-medium">{client.phone}</TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Button variant="outline" size="xs">
          <Edit className="h-3 w-3" />
        </Button>
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
