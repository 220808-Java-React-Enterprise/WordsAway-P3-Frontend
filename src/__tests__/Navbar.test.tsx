/* eslint-disable testing-library/no-render-in-setup */
import { createRoot } from 'react-dom/client'
import { cleanup, act } from '@testing-library/react'
import Navbar from '../components/Navbar'

const { location } = window

beforeEach(() => {
  delete (window as Partial<Window>).location;
  window.location = { ...window.location, reload: jest.fn() };
});


afterEach(() => {
    cleanup()
    window.location = location
})

it('renders navbar', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<Navbar />)
})