import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '../components/Login'
import '@testing-library/jest-dom/extend-expect'

describe('Login module', () => {
    test('renders login screen', () => {
        render(<Login />)
        const linkElement = screen.getByText(/WORDS AWAY/)
        expect(linkElement).toBeInTheDocument()
    })
})