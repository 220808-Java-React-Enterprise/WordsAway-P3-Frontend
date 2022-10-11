import { createRoot } from 'react-dom/client'
import { cleanup, act } from '@testing-library/react'
import Navbar from '../components/Navbar'

afterEach(() => {
    cleanup()
})

it('renders navbar', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<Navbar />)
})