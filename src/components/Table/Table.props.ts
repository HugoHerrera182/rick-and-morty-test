export interface TableProps {
  tableHeader: string[];
  children: React.ReactNode;
  totalPages?: number;
  actualPage?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  isLoading?: boolean;
  onSelectPageChange?: (value: string) => void;
  onClickNext?: () => void;
  onClickPrevious?: () => void;
}