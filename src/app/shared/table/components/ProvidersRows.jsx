import { Chip } from "@mui/material";
import PropTypes from "prop-types";

const ProvidersRows = ({ data, openModal }) => {

  return (
    <>
      <div className="shared_table-body">
        {data?.map((provider) => (
          <div className="row-table-container" key={provider.id}>
            <div className="data-row-tag">
              <div className="imageName__wrapper">
                <img src={provider.user.profilePic} alt="picture" />
                <p>
                  {provider.user.name} {provider.last_name}
                </p>
              </div>
            </div>
            <div className="data-row-tag">
              {provider.provider_assign_service.length === 0 ? (
                <p>Sin asignar</p>
              ) : (
                provider.provider_assign_service.map((service, i) => (
                  <div key={service.service.name + i} className="service-type-wrapper">
                    <Chip
                      label={service.service.name}
                      size="small"
                      className="service-type"
                    />
                  </div>
                ))
              )}
            </div>
            <div className="data-row-tag">Sesiones agregadas</div>
            <div className="data-row-tag">Calificaciones</div>
            <div className="data-row-tag">{provider.user.email}</div>
            <div className="data-row-tag data-row-actions">
              <button
                type="button"
                onClick={() => openModal(provider.id)}
                className="action-button"
              >
                Dar de baja
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ProvidersRows.propTypes = {
  data: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ProvidersRows;
