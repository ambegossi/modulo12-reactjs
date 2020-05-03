import React from 'react';
import { render, fireEvent } from '@testing-library/react'

import TechList from '~/components/TechList';

describe('TechList component', () => {
  beforeEach(() => {
    localStorage.clear();
  })

  it('should be able to add new tech', () => {
    const { getByText, getByTestId, getByLabelText } = render(<TechList />);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js'} });
    fireEvent.submit(getByTestId('tech-form'));


    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');

  });

  it('should store techs in storage', () => {
    let { getByTestId, getByLabelText, getByText, unmount } = render(<TechList />);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js'} });
    fireEvent.submit(getByTestId('tech-form'));

    unmount();

    ({ getByTestId, getByLabelText, getByText } = render(<TechList />));

    expect(localStorage.setItem).toHaveBeenCalledWith('techs', JSON.stringify(['Node.js']))
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
  });
});