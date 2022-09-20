import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useCentralCapacityData } from "./useCentralAllocationData";

export const CentralAllocationList = () => {
  const getCapacityData = useCentralCapacityData();

  if (getCapacityData.loading) {
    return <h1>loading...</h1>;
  }

  const { capacity } = getCapacityData.data;

  return (
    <List>
      {capacity.map(
        ({ id, division, building, floor, wing, capacity }: any) => (
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
              primary={division.divisionName}
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
