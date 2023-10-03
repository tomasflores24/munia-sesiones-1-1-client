import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ServiceModal from "./ServiceModal";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../services/service.services";
import Swal from "sweetalert2";

function Service() {
  const queryClient = useQueryClient();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const { data: services, isLoading } = useQuery("services", getAllServices);

  const createServiceMutation = useMutation(createService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      setCreateModalOpen(false);
    },
  });

  const updateServiceMutation = useMutation(updateService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
      setEditModalOpen(false);
    },
  });

  const deleteServiceMutation = useMutation(deleteService, {
    onSuccess: () => {
      queryClient.invalidateQueries("services");
    },
  });

  const openCreateModal = () => {
    setCreateModalOpen(true);
  };

  const openEditModal = (service) => {
    setSelectedService(service);
    setEditModalOpen(true);
  };

  const openViewModal = (service) => {
    setSelectedService(service);
    setViewModalOpen(true);
  };

  const handleDeleteService = async () => {
    if (selectedService) {
      await deleteServiceMutation.mutateAsync(selectedService.id);
      setViewModalOpen(false);
    }
    };
    
    const alertdeleteService = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00A7AF',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '¡Eliminado!',
                    'El servicio ha sido eliminado.',
                    'success'
                )
            }
        })
    }


  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Listado de Servicios</h1>
      <Button variant="contained" onClick={openCreateModal}>
        Crear Servicio
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.nombre}</TableCell>
                <TableCell>{service.descripcion}</TableCell>
                <TableCell>{service.precio}</TableCell>
                <TableCell>{service.categoria}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => openEditModal(service)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => openViewModal(service)}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedService(service);
                        alertdeleteService();
                    }}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Renderizar el modal de creación de servicio */}
      {isCreateModalOpen && (
        <ServiceModal
          isOpen={isCreateModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={createServiceMutation.mutateAsync}
          title="Crear Servicio"
        />
      )}

      {/* Renderizar el modal de edición de servicio */}
      {isEditModalOpen && (
        <ServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={(data) =>
            updateServiceMutation.mutateAsync({ ...selectedService, ...data })
          }
          title="Editar Servicio"
          initialData={selectedService}
        />
      )}

      {/* Renderizar el modal de visualización de servicio */}
      {isViewModalOpen && (
        <ServiceModal
          isOpen={isViewModalOpen}
          onClose={() => setViewModalOpen(false)}
          title="Ver Servicio"
          isViewMode={true}
          onDelete={handleDeleteService}
          initialData={selectedService}
        />
      )}
    </div>
  );
}

export default Service;
