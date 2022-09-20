import { ReactNode } from "react";
import { Box } from "@mui/material";

interface ITabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export const TabPanel = (props: ITabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`react-mechanic-tabpanel-${index}`}
      aria-labelledby={`react-mechanic-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};
