import { HttpRequest } from "../../HttpRequest";

export const CollaboratorsService = {
  getAllCollaborators: async () => HttpRequest.get("/collaborator"),
  getCollaboratorById: async (collaboratorId) => HttpRequest.get(collaboratorId ? `/collaborator/${collaboratorId}` : null),
  updateCollaborator: async (collaboratorId, body) =>
    HttpRequest.patch(`/collaborator/${collaboratorId}`, body),
  deleteCollaborator: async (collaboratorId) =>
    HttpRequest.delete(`/collaborator/${collaboratorId}`),
};
