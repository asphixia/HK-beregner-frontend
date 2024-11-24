import React, { act } from 'react'; // Updated import for `act`
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Mock global fetch
global.fetch = jest.fn();

// Test whether the UI renders correctly
test('renders login page', async () => {
    await act(async () => {
        render(<LoginPage />, { wrapper: MemoryRouter });
    });

    // Check for the form elements
    expect(screen.getByText(/Login/i)).toBeInTheDocument(); // Matches the heading
    expect(screen.getByText(/Brugernavn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Adgangskode/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log ind/i })).toBeInTheDocument(); // Corrected name
    expect(screen.getByRole('button', { name: /Fortryd/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Retur til hovedsiden/i })).toBeInTheDocument();
});

// Test form submission
test('submits form data', async () => {
    // Mock the response
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ token: 'fake-jwt-token', role: 'admin' }),
    });

    await act(async () => {
        render(<LoginPage />, { wrapper: MemoryRouter });
    });

    // Fill in the form
    userEvent.type(screen.getByLabelText(/Brugernavn/i), 'admin');
    userEvent.type(screen.getByLabelText(/Adgangskode/i), 'password');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Log ind/i })); // Corrected name

    // Check localStorage and navigation
    await screen.findByText(/Login/i); // Wait for the login page to render
    expect(localStorage.getItem('jwt')).toBe('fake-jwt-token');
    expect(mockNavigate).toHaveBeenCalledWith('/admin');
});

// Test clear form functionality
test('clears form fields when "Fortryd" button is clicked', async () => {
    await act(async () => {
        render(<LoginPage />, { wrapper: MemoryRouter });
    });

    // Fill in the form
    userEvent.type(screen.getByLabelText(/Brugernavn/i), 'admin');
    userEvent.type(screen.getByLabelText(/Adgangskode/i), 'password');

    // Clear the form
    fireEvent.click(screen.getByRole('button', { name: /Fortryd/i }));

    // Check if the form fields are empty
    expect(screen.getByLabelText(/Brugernavn/i)).toHaveValue('');
    expect(screen.getByLabelText(/Adgangskode/i)).toHaveValue('');
    expect(screen.queryByText(/An error occurred. Please try again./)).not.toBeInTheDocument();
});

// Test Network Error
test('handles network errors gracefully', async () => {
    // Mock network error
    fetch.mockRejectedValueOnce(new Error('Network Error'));

    await act(async () => {
        render(<LoginPage />, { wrapper: MemoryRouter });
    });

    // Fill in the form
    userEvent.type(screen.getByLabelText(/Brugernavn/i), 'user');
    userEvent.type(screen.getByLabelText(/Adgangskode/i), 'password');

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Log ind/i })); // Corrected name

    // Check for error message
    expect(await screen.findByText(/An error occurred. Please try again/i)).toBeInTheDocument();
});

// Test Return to Main Page
test('navigates to main page when "Retur til hovedsiden" is clicked', async () => {
    await act(async () => {
        render(<LoginPage />, { wrapper: MemoryRouter });
    });

    fireEvent.click(screen.getByRole('button', { name: /Retur til hovedsiden/i }));

    expect(mockNavigate).toHaveBeenCalledWith('/');
});