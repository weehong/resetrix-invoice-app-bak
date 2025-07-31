import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { useAuth } from "@/hooks/useAuth";

import { AuthButton, MobileAuthButton } from "../AuthButton";

// Mock dependencies
jest.mock("next-auth/react");
jest.mock("next/navigation");
jest.mock("@/hooks/useAuth");

const mockSignOut = signOut as jest.MockedFunction<typeof signOut>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const mockPush = jest.fn();

describe("AuthButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  describe("when loading", () => {
    it("should show loading state", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        session: null,
        status: "loading",
      });

      render(<AuthButton />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByRole("generic")).toHaveClass(
        "opacity-50",
        "cursor-not-allowed",
      );
    });
  });

  describe("when user is not authenticated", () => {
    it("should show login button", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        session: null,
        status: "unauthenticated",
      });

      render(<AuthButton />);

      const loginLink = screen.getByRole("link", { name: "Login" });
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute("href", "/signin");
    });
  });

  describe("when user is authenticated", () => {
    const mockUser = {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
    };

    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: mockUser,
        session: { user: mockUser, expires: "2024-12-31" },
        status: "authenticated",
      });
    });

    it("should show user welcome message and logout button", () => {
      render(<AuthButton />);

      expect(screen.getByText("Welcome, John Doe")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Logout" }),
      ).toBeInTheDocument();
    });

    it("should handle logout when button is clicked", async () => {
      mockSignOut.mockResolvedValue({ url: "/" });

      render(<AuthButton />);

      const logoutButton = screen.getByRole("button", { name: "Logout" });
      fireEvent.click(logoutButton);

      expect(mockSignOut).toHaveBeenCalledWith({ redirect: false });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/");
      });
    });

    it("should show loading state during logout", async () => {
      mockSignOut.mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 100)),
      );

      render(<AuthButton />);

      const logoutButton = screen.getByRole("button", { name: "Logout" });
      fireEvent.click(logoutButton);

      expect(screen.getByText("Signing out...")).toBeInTheDocument();
      expect(logoutButton).toBeDisabled();
    });
  });
});

describe("MobileAuthButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  describe("when user is not authenticated", () => {
    it("should show login link", () => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        session: null,
        status: "unauthenticated",
      });

      render(<MobileAuthButton />);

      const loginLink = screen.getByRole("link", { name: "Login" });
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute("href", "/signin");
    });
  });

  describe("when user is authenticated", () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        isAuthenticated: true,
        isLoading: false,
        user: { id: "1", name: "John Doe", email: "john@example.com" },
        session: null,
        status: "authenticated",
      });
    });

    it("should show logout button", () => {
      render(<MobileAuthButton />);

      expect(
        screen.getByRole("button", { name: "Logout" }),
      ).toBeInTheDocument();
    });

    it("should handle logout when button is clicked", async () => {
      mockSignOut.mockResolvedValue({ url: "/" });

      render(<MobileAuthButton />);

      const logoutButton = screen.getByRole("button", { name: "Logout" });
      fireEvent.click(logoutButton);

      expect(mockSignOut).toHaveBeenCalledWith({ redirect: false });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith("/");
      });
    });
  });
});
