export interface EmployeeProps {
  selectedEmployee: string | null;
  setSelectedEmployee: (selectedEmployee: string | null) => void;
}