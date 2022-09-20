import { Card, CardContent, Typography } from "@mui/material";

interface IStatsCardProps {
  label: string;
  count: number;
}

export const StatsCard = ({ label, count }: IStatsCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="h1"
          textAlign="center"
          fontWeight={500}
          fontFamily="'Poppins', sans-serif"
        >
          {count}
        </Typography>
        <Typography variant="h6" textAlign="center">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};
