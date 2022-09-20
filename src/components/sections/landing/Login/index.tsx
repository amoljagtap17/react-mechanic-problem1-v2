import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useGetSuperUsers } from "./useGetSuperUsers";

export const Login = () => {
  const superUsersQuery = useGetSuperUsers();
  const [selectedUser, setSelectedUser] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser((event.target as HTMLInputElement).value);
  };

  if (superUsersQuery.loading) {
    return <h1>loading</h1>;
  }

  return (
    <Card sx={{ padding: 3 }}>
      <CardHeader title="Begin Here" />
      <CardContent>
        <FormControl>
          <FormLabel id="users-radio-buttons-group">
            Select User For following level
          </FormLabel>

          <RadioGroup
            aria-labelledby="users-radio-buttons-group"
            name="users-radio-buttons-group"
            value={selectedUser}
            onChange={handleChange}
          >
            {superUsersQuery.data.super_users.map((user: any) => (
              <FormControlLabel
                key={user.email}
                value={user.email}
                control={<Radio />}
                label={user.department.departmentName}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          onClick={() =>
            signIn("credentials", {
              email: selectedUser,
              callbackUrl: "/home",
            })
          }
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
};
