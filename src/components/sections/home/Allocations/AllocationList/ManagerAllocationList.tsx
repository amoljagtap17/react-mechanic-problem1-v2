import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useManagerAllocationData } from "./useManagerAllocationData";

export const ManagerAllocationList = () => {
  const getAllocationData = useManagerAllocationData();

  if (getAllocationData.loading) {
    return <h1>loading...</h1>;
  }

  const { allocations } = getAllocationData.data;

  return (
    <List>
      {allocations.map(
        ({ id, department, building, floor, wing, capacity }: any) => (
          <ListItem
            key={id}
            divider
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={department.departmentName}
              secondary={
                <>
                  <Typography variant="body2" component="span" display="block">
                    Building: {building.buildingName}
                  </Typography>
                  <Typography variant="body2" component="span" display="block">
                    Floor: {floor.floorNo}
                  </Typography>
                  <Typography variant="body2" component="span" display="block">
                    Wing: {wing.wingName}
                  </Typography>
                  <Typography variant="body2" component="span" display="block">
                    Allocated: {capacity}
                  </Typography>
                </>
              }
            />
          </ListItem>
        )
      )}
    </List>
  );
};
