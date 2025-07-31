import { renderHook } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useAuth, useAuthStatus } from '../useAuth';

// Mock next-auth/react
jest.mock('next-auth/react');
const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when session is loading', () => {
    it('should return loading state', () => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'loading',
        update: jest.fn(),
      });

      const { result } = renderHook(() => useAuth());

      expect(result.current.isLoading).toBe(true);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
      expect(result.current.status).toBe('loading');
    });
  });

  describe('when user is authenticated', () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    const mockSession = {
      user: mockUser,
      expires: '2024-12-31',
    };

    it('should return authenticated state', () => {
      mockUseSession.mockReturnValue({
        data: mockSession,
        status: 'authenticated',
        update: jest.fn(),
      });

      const { result } = renderHook(() => useAuth());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.session).toEqual(mockSession);
      expect(result.current.status).toBe('authenticated');
    });
  });

  describe('when user is not authenticated', () => {
    it('should return unauthenticated state', () => {
      mockUseSession.mockReturnValue({
        data: null,
        status: 'unauthenticated',
        update: jest.fn(),
      });

      const { result } = renderHook(() => useAuth());

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.user).toBe(null);
      expect(result.current.session).toBe(null);
      expect(result.current.status).toBe('unauthenticated');
    });
  });
});

describe('useAuthStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return authentication status without loading states', () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
    };

    const mockSession = {
      user: mockUser,
      expires: '2024-12-31',
    };

    mockUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
      update: jest.fn(),
    });

    const { result } = renderHook(() => useAuthStatus());

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('should return false for unauthenticated users', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: jest.fn(),
    });

    const { result } = renderHook(() => useAuthStatus());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });
});
