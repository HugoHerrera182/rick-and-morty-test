import { cleanup, render, screen } from "@testing-library/react";
import Divider from "./Divider";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("should render Divider", () => {
  render(
    <Divider
      title="Test divider"
    >
      <h3>Content</h3>
    </Divider>
  );

  expect(screen.getByText("Test divider")).toBeTruthy();
  expect(screen.getByRole("heading", { name: "Content" })).toBeTruthy();
});
