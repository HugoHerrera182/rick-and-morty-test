
import { cleanup, render, screen } from '@testing-library/react';
import Table from './Table';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("should render Table with pagination", () => {
	const header = ['Name', 'Age'];
  render(
    <Table
      tableHeader={header}
      showPagination={true}
      actualPage={1}
      hasNext={true}
      hasPrevious={false}
      isLoading={false}
      totalPages={1}
    >
      <tbody>
        <tr>
          <td>Terry</td>
          <td>25</td>
        </tr>
      </tbody>
    </Table>
  );

	expect(screen.getByText("Name")).toBeTruthy();
	expect(screen.getByRole('button', { name: 'Next' })).toBeTruthy();
	expect(screen.getByRole('button', { name: 'Previous' })).toBeTruthy();
	expect(screen.getByRole("combobox", { name: '' })).toBeTruthy();

});
