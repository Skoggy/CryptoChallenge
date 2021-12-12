import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { SelectButton } from '../SelectButton';

it('renders the button', () => {
    render(<SelectButton />);
    const selectButton = screen.getByTestId('select-button-test');
    expect(selectButton).toBeInTheDocument();

})