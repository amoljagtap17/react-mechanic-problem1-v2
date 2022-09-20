// @ts-nocheck
import {
  Grid,
  Select,
  FormControl,
  MenuItem,
  FormLabel,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { CircularProgress } from "components/lib";
import { useCentralCapacityData } from "../AllocationList/useCentralAllocationData";
import { useGetFormData } from "./useGetFormData";
import { useCreateCapacity } from "./useCreateCapacity";

interface IFormInput {
  divisionId: string;
  buildingId: string;
  floorId: string;
  wingId: string;
  capacity: number;
}

export const CentralAllocationForm = () => {
  const { control, handleSubmit, reset, watch } = useForm<IFormInput>({
    defaultValues: {
      divisionId: "",
      buildingId: "",
      floorId: "",
      wingId: "",
      capacity: 0,
    },
  });
  const getFormData = useGetFormData();
  const [createCapacity, { loading }] = useCreateCapacity();
  const getCapacityData = useCentralCapacityData();

  if (getFormData.loading) {
    return <CircularProgress />;
  }

  const selectedDivisionId = watch("divisionId");
  const selectedBuildingId = watch("buildingId");
  const selectedFloorId = watch("floorId");
  const selectedWingId = watch("wingId");
  const allocatedCapacity = watch("capacity");

  const data = getFormData.data;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createCapacity({
      variables: {
        data: { ...data, capacity: parseInt(data.capacity) },
      },
      onCompleted() {
        reset();
        getCapacityData.refetch();
        getFormData.refetch();
      },
    });
  };

  const totalSeats = selectedWingId
    ? data.buildings
        .filter((building) => building.id === selectedBuildingId)[0]
        .floors.filter((floor) => floor.id === selectedFloorId)[0]
        .wings.filter((wing) => wing.id === selectedWingId)[0].seatsCount
    : 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <Stack spacing={1}>
              <FormLabel id="divisionId">Select Division</FormLabel>
              <Controller
                name="divisionId"
                control={control}
                render={({ field }) => {
                  const divisionOptions = data.divisions
                    .filter(
                      (division: any) => division.divisionName !== "central"
                    )
                    .map((division: any) => ({
                      id: division.id,
                      label: division.divisionName,
                    }));

                  return (
                    <Select {...field}>
                      {divisionOptions.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <Stack spacing={1}>
              <FormLabel id="buildingId">Select Building</FormLabel>
              <Controller
                name="buildingId"
                control={control}
                render={({ field }) => {
                  const buildingOptions = data.buildings.map(
                    (building: any) => ({
                      id: building.id,
                      label: building.buildingName,
                    })
                  );

                  return (
                    <Select {...field} disabled={selectedDivisionId === ""}>
                      {buildingOptions.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <Stack spacing={1}>
              <FormLabel id="floorId">Select Floor</FormLabel>
              <Controller
                name="floorId"
                control={control}
                render={({ field }) => {
                  const floorOptions = selectedBuildingId
                    ? data.buildings
                        .filter(
                          (building) => building.id === selectedBuildingId
                        )[0]
                        .floors.map((floor: any) => ({
                          id: floor.id,
                          label: floor.floorNo,
                        }))
                    : [];

                  return (
                    <Select {...field} disabled={selectedBuildingId === ""}>
                      {floorOptions.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <Stack spacing={1}>
              <FormLabel id="wingId">Select Wing</FormLabel>
              <Controller
                name="wingId"
                control={control}
                render={({ field }) => {
                  const wingOptions = selectedFloorId
                    ? data.buildings
                        .filter(
                          (building) => building.id === selectedBuildingId
                        )[0]
                        .floors.filter(
                          (floor) => floor.id === selectedFloorId
                        )[0]
                        .wings.map((wing: any) => ({
                          id: wing.id,
                          label: wing.wingName,
                        }))
                    : [];

                  return (
                    <Select {...field} disabled={selectedFloorId === ""}>
                      {wingOptions.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  );
                }}
              />
            </Stack>
          </FormControl>
        </Grid>
        {selectedWingId && (
          <Grid item xs={12}>
            <Typography variant="body1">
              Total Seats Available: {totalSeats}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <Stack spacing={1}>
              <FormLabel id="capacity">Allocate Capacity</FormLabel>
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    disabled={selectedWingId === ""}
                  />
                )}
              />
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            disabled={
              loading ||
              selectedWingId === "" ||
              parseInt(allocatedCapacity || 0) === 0 ||
              parseInt(allocatedCapacity) > totalSeats
            }
          >
            Allocate
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
