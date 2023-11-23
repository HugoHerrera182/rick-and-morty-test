export interface TableProps {
  actualPage?: number;
  children: React.ReactNode;
  hasNext?: boolean;
  hasPrevious?: boolean;
  isLoading?: boolean;
  onSelectPageChange?: (value: string) => void;
  onClickNext?: () => void;
  onClickPrevious?: () => void;
  tableHeader: string[];
  totalPages?: number;
}