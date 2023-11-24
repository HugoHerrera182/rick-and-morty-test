import type { TableProps } from './Table.props';
import './Table.styles.scss';

const Table = ({
  children,
  tableHeader,
  totalPages,
  actualPage,
  hasNext,
  hasPrevious,
  onSelectPageChange,
  onClickNext,
  onClickPrevious,
  showPagination,
}: TableProps) => {
  const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    if (onSelectPageChange) {
      onSelectPageChange(event.currentTarget.value);
    }
  };

  const selectMarkup = () => (
    <div className="Table__pagination__page-select">
      <label>Actual page</label>
      <select name='selectPage' value={actualPage} onChange={handleSelectChange}>
        {totalPages &&
          totalPages > 0 &&
          [...Array(totalPages)].map((val: string, i: number) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
      </select>
    </div>
  );

  const tableOptionsMarkup = () => (
    <div className="Table__pagination">
      <button
        className="Table__pagination__previous-button"
        disabled={!hasPrevious}
        onClick={onClickPrevious}
      >
        <i />
        <label>Previous</label>
      </button>
      {selectMarkup()}
      <button
        className="Table__pagination__next-button"
        disabled={!hasNext}
        onClick={onClickNext}
      >
        <label>Next</label>
        <i />
      </button>
    </div>
  );

  const headerMarkup = () => (
    <thead className="Table__header">
      <tr>
        {tableHeader.map((title: string) => (
          <th key={title}>{title}</th>
        ))}
      </tr>
    </thead>
  );

  return (
    <div className="Table">
      {showPagination && tableOptionsMarkup()}
      <table className="Table__container">
        {tableHeader.length > 0 && tableHeader !== undefined && headerMarkup()}
        {children}
      </table>
    </div>
  );
};

export default Table;

