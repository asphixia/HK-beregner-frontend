import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom'; // For supporting useNavigate
import AdminPage from '../pages/AdminPage';


// Mocking useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('AdminPage Component Tests', () => {
    let navigate;

    beforeEach(() => {
        navigate = jest.fn();
        jest.requireMock('react-router-dom').useNavigate.mockReturnValue(navigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    /** Rendering Tests */
    describe('Rendering Tests', () => {
        it('renders the Admin Side header', () => {
            render(
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            );
            expect(screen.getByText('Admin Side')).toBeInTheDocument();
        });

        it('renders all input fields and buttons', () => {
            render(
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            );
            const inputs = screen.getAllByRole('textbox');
            const buttons = screen.getAllByRole('button');
            expect(inputs).toHaveLength(3);
            expect(buttons).toHaveLength(8); // 3x2 form buttons + 2 action buttons
        });

        it('renders section titles correctly', () => {
            render(
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            );
            expect(screen.getByText('Find Bruger')).toBeInTheDocument();
            expect(screen.getByText('Søge efter logbog')).toBeInTheDocument();
            expect(screen.getByText('Slet efter ID')).toBeInTheDocument();
        });
    });

    /** Functionality Tests */
    describe('Functionality Tests', () => {
        it('navigates back to home when "Tilbage til startside" is clicked', () => {
            render(
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            );
            userEvent.click(screen.getByText('Tilbage til startside'));
            expect(navigate).toHaveBeenCalledWith('/');
        });

        it('allows text input in all input fields', () => {
            render(
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            );

            const inputs = screen.getAllByRole('textbox');
            inputs.forEach((input, index) => {
                const testText = `Test Input ${index}`;
                userEvent.type(input, testText);
                expect(input).toHaveValue(testText);
            });
        });

        it('ensures buttons are clickable without errors', () => {
            render(
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            );

            const buttons = screen.getAllByRole('button');
            buttons.forEach((button) => {
                userEvent.click(button);
            });
        });
    });

    /** Edge Case Tests */
    describe('Edge Case Tests', () => {
        it('handles empty input fields gracefully when buttons are clicked', () => {
            render(
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            );

            const saveButtons = screen.getAllByText('Gem');
            const cancelButtons = screen.getAllByText('Fortryd');

            saveButtons.forEach((button) => {
                userEvent.click(button);
                // Add specific behavior assertions if necessary
            });

            cancelButtons.forEach((button) => {
                userEvent.click(button);
                // Add specific behavior assertions if necessary
            });
        });

        it('returns to home page after input interactions and clicking return button', () => {
            render(
                <BrowserRouter>
                    <AdminPage />
                </BrowserRouter>
            );

            const input = screen.getAllByRole('textbox')[0];
            userEvent.type(input, 'Some input text');
            userEvent.click(screen.getByText('Tilbage til startside'));
            expect(navigate).toHaveBeenCalledWith('/');
        });
    });
});
