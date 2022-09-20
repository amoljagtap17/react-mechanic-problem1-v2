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
import { useSession } from "next-auth/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useGetManagerFormData } from "./useGetManagerFormData";
import { useCreateAllocation } from "./useCreateAllocation";

interface IFormInput {
  departmentId: string;
  buildingId: string;
  floorId: string;
  wingId: string;
  capacity: number;
}

export const ManagerAllocationForm = () => {
  const { data: session } = useSession();
  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      departmentId: "",
      buildingId: "",
      floorId: "",
      wingId: "",
      capacity: 0,
    },
  });

  const departmentName = session?.user.department.departmentName || "";
  const getManagerFormData = useGetManagerFormData(departmentName);

  const [createAllocation, { loading }] = useCreateAllocation();

  if (getManagerFormData.loading) {
    return <h1>Loading...</h1>;
  }

  const { departmentsForCurrentUser, buildings } = getManagerFormData.data;

  const buildingOptions: { id: String; label: String }[] = [];
  const floorOptions: { id: String; label: String }[] = [];
  const wingOptions: { id: String; label: String }[] = [];
  const departmentOptions: { id: String; label: String }[] = [];

  buildings.forEach(({ id, buildingName, floors }: any) => {
    buildingOptions.push({ id, label: buildingName });

    floors.forEach(({ id, floorNo, wings }: any) => {
      floorOptions.push({ id, label: floorNo });

      wings.forEach(({ id, wingName }: any) => {
        wingOptions.push({ id, label: wingName });
      });
    });
  });

  departmentsForCurrentUser.forEach(({ id, departmentName }: any) => {
    departmentOptions.push({ id, label: departmentName });
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    createAllocation({
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
              <FormLabel id="departmentId">Select Department</FormLabel>
              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <Select {...field}>
                    {departmentOptions.map((item) => (
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
              <FormLabel id="building">Select Building</FormLabel>
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
              <FormLabel id="floor">Select Floor</FormLabel>
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
              <FormLabel id="wing">Select Wing</FormLabel>
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
