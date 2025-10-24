import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import * as React from "react";

describe("Dashboard Page", () => {
  it("renders the dashboard heading", () => {
    render(<Dashboard />);
    expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
  });

  it("renders key UI elements", () => {
    render(<Dashboard />);
    const textElements = screen.getAllByText(/welcome|user|profile|logout/i);
    expect(textElements.length).toBeGreaterThan(0);
  });
});
