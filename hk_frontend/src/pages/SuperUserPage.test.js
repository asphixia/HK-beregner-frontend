import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SuperUserPage from './SuperUserPage';

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('SuperUserPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders all elements correctly', () => {
        render(<SuperUserPage />, { wrapper: MemoryRouter });

        // Check header and logout button
        expect(screen.getByText(/Superbruger Side/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Log af/i })).toBeInTheDocument();

        // Check form labels and buttons
        expect(screen.getByLabelText(/Lave ny regel/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Opdatere regel/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Slet en regel/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Oprette sag til Admin/i)).toBeInTheDocument();

        // Check buttons for each form group
        expect(screen.getAllByRole('button', { name: /Gem/i }).length).toBe(4); // Four "Gem" buttons
        expect(screen.getAllByRole('button', { name: /Fortryd/i }).length).toBe(5); // Five "Fortryd" buttons
        expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Gem Ændringer/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Fortryd Ændringer/i })).toBeInTheDocument();
    });

    test('navigates to the main page when "Log af" is clicked', () => {
        render(<SuperUserPage />, { wrapper: MemoryRouter });

        fireEvent.click(screen.getByRole('button', { name: /Log af/i }));

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    test('ensures input fields and textareas are interactive', () => {
        render(<SuperUserPage />, { wrapper: MemoryRouter });

        const createInput = screen.getByLabelText(/Lave ny regel/i);
        fireEvent.change(createInput, { target: { value: 'New Rule' } });
        expect(createInput.value).toBe('New Rule');

        const adminTextarea = screen.getByLabelText(/Oprette sag til Admin/i);
        fireEvent.change(adminTextarea, { target: { value: 'Case description' } });
        expect(adminTextarea.value).toBe('Case description');
    });
});
