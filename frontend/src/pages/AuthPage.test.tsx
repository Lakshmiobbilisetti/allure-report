import { render, screen, fireEvent } from "@testing-library/react";
import AuthPage from "./AuthPage";
import * as React from "react";

describe("AuthPage", () => {
  it("renders Sign In form by default", () => {
    render(<AuthPage />);
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("switches to Sign Up form when clicking 'Sign Up'", () => {
    render(<AuthPage />);
    const switchLink = screen.getByText(/sign up/i);
    fireEvent.click(switchLink);
    expect(screen.getByRole("heading", { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });
});
