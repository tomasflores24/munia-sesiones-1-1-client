import "./ClientsStyle.scss";
import { useMutation, useQuery } from "react-query";
import { ClientsServices } from "../../../services/dashboard/clients/clients.services";
import LoadingSpinner from "../../../shared/loadingSpinner/LoadingSpinner";
import CreateUserModal from "../../../shared/createUserModal/CreateUserModal";
import { useState } from "react";
import { Alert } from "@mui/material";
import TableShared from "../../../shared/table/TableShared";

const clientHeaders = [
  "",
  "Nombre",
  "Fecha de vinculación",
  "Paquete contratado",
  "País",
  "Colaboradores",
  "Contacto",
  "N° de sesiones",
];

const Clientes = () => {
  const [openClientModal, setOpenClientModal] = useState(false);

  const { isLoading, data, isSuccess, refetch } = useQuery(
    ["getAllClients"],
    ClientsServices.getAllClients
  );

  const { isLoading: isLoadingModal, mutate } = useMutation(
    ["enviar info"],
    () => console.log("se envio data")
  );

  const handleCloseModal = () => setOpenClientModal(false);

  return (
    <div className="clients__root">
      <header className="clients__header">
        <h1>Clientes</h1>
        {/**TODO: search input */}
        <button
          type="button"
          className="btn__newClient"
          onClick={() => setOpenClientModal(true)}
        >
          Nuevo Cliente
        </button>
      </header>
      {isLoading ? (
        <LoadingSpinner />
      ) : isSuccess && !isLoading ? (
        <div className="clients_table">
          {data?.data?.length === 0 ? (
            <Alert variant="outlined" severity="info">
              Todavía no hay clientes, crea uno primero
            </Alert>
          ) : (
            <TableShared
              data={data?.data || []}
              currentPage="Clients"
              headers={clientHeaders}
            />
          )}
        </div>
      ) : (
        <Alert severity="error">No se pudieron cargar los clientes</Alert>
      )}
      <CreateUserModal
        closeModal={handleCloseModal}
        open={openClientModal}
        isLoading={isLoadingModal}
        onSubmit={mutate}
        refetch={refetch}
      />
    </div>
  );
};

export default Clientes;
