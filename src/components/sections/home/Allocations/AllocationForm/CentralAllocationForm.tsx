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
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
  const { control, handleSubmit, reset } = useForm<IFormInput>({
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

  if (getFormData.loading || loading) {
    return <h1>loading..</h1>;
  }

  const data = getFormData.data;

  const buildingOptions: { id: String; label: String }[] = [];
  const floorOptions: { id: String; label: String }[] = [];
  const wingOptions: { id: String; label: String }[] = [];
  const divisionOptions: { id: String; label: String }[] = [];

  data.buildings.forEach(({ id, buildingName, floors }: any) => {
    buildingOptions.push({ id, label: buildingName });

    floors.forEach(({ id, floorNo, wings }: any) => {
      floorOptions.push({ id, label: floorNo });

      wings.forEach(({ id, wingName }: any) => {
        wingOptions.push({ id, label: wingName });
      });
    });
  });

  data.divisions.forEach(({ id, divisionName }: any) => {
    if (divisionName !== "central") {
      divisionOptions.push({ id, label: divisionName });
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    createCapacity({
      variables: {
        data: { ...data, capacity: parseInt(data.capacity) },
      },
      onCompleted() {
        reset();
      },
    });
  };

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
                render={({ field }) => (
                  <Select {...field}>
                    {divisionOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
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
                render={({ field }) => (
                  <Select {...field}>
                    {buildingOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
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
                render={({ field }) => (
                  <Select {...field}>
                    {floorOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
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
                render={({ field }) => (
                  <Select {...field}>
                    {wingOptions.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth={true}>
            <Stack spacing={1}>
              <FormLabel id="capacity">Allowed Capacity</FormLabel>
              <Controller
                name="capacity"
                control={control}
                render={({ field }) => <TextField {...field} type="number" />}
              />
            </Stack>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" disabled={loading}>
            Allocate
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
