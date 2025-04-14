export interface BarberCardsProps {
    onSelect: (barberId: string) => void;
    selectedEmployee: string | null;
    selectedCategory: string | null;
  }