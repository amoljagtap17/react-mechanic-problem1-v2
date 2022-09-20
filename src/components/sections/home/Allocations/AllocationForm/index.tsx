import { CentralAllocationForm } from "./CentralAllocationForm";
import { ManagerAllocationForm } from "./ManagerAllocationForm";

interface IAllocationFormProps {
  role: "ADMIN" | "CENTRAL";
}

export const AllocationForm = ({ role }: IAllocationFormProps) => {
  return role === "ADMIN" ? (
    <ManagerAllocationForm />
  ) : (
    <CentralAllocationForm />
  );
};
