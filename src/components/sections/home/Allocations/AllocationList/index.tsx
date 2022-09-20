import { CentralAllocationList } from "./CentralAllocationList";
import { ManagerAllocationList } from "./ManagerAllocationList";

interface IAllocationListProps {
  role: "ADMIN" | "CENTRAL";
}

export const AllocationList = ({ role }: IAllocationListProps) => {
  return role === "ADMIN" ? (
    <ManagerAllocationList />
  ) : (
    <CentralAllocationList />
  );
};
