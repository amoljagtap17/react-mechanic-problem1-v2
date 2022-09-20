import { useState, SyntheticEvent } from "react";
import { useSession } from "next-auth/react";
import { Box, Tabs, Tab } from "@mui/material";
import { TabPanel } from "components/lib";
import { Dashboard, Allocations, Bookings } from "components/sections";

const a11yProps = (index: number) => {
  return {
    id: `react-mechanic-${index}`,
    "aria-controls": `react-mechanic-${index}`,
  };
};

export const Navigation = () => {
  const [value, setValue] = useState(0);
  const { data: session } = useSession();

  const role = session?.user.role;

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="navigation tabs"
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          {(role === "ADMIN" || role === "CENTRAL") && (
            <Tab label="Allocations" {...a11yProps(1)} />
          )}
          {role === "USER" && <Tab label="Bookings" {...a11yProps(2)} />}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      {(role === "ADMIN" || role === "CENTRAL") && (
        <TabPanel value={value} index={1}>
          <Allocations role={role} />
        </TabPanel>
      )}
      {role === "USER" && (
        <TabPanel value={value} index={2}>
          <Bookings />
        </TabPanel>
      )}
    </Box>
  );
};
