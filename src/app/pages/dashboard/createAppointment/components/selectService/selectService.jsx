import { useEffect } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

import { ServiceServices } from "../../../../../services/dashboard/service/service.service";

const SelectService = ({
  categoryId,
  selectedServiceId,
  setSelectedServiceId,
}) => {
  const {
    data: services,
    errors,
    refetch: refetchServices,
    isLoading,
  } = useQuery(["getServices"], () =>
    ServiceServices.getServicesByCategoryId(categoryId)
  );

  const handleChangeService = async (event) => {
    const { value } = event.target;
    await setSelectedServiceId(value);
  };

  useEffect(() => {
    refetchServices();
  }, [refetchServices, categoryId]);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedServiceId}
          label=""
          onChange={handleChangeService}
        >
          {services?.data.map((el) => {
            return (
              <MenuItem key={el.id} value={el.id}>
                <em>{el.name}</em>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

SelectService.propTypes = {
  categoryId: PropTypes.number.isRequired,
  selectedServiceId: PropTypes.string.isRequired,
  setSelectedServiceId: PropTypes.func.isRequired,
};

export default SelectService;
