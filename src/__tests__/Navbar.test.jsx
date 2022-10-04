import { createRoot } from 'react-dom/client'
import Navbar from '../components/Navbar'

it('renders navbar', () => {
    const div = document.createElement('div')
    const root = createRoot(div)
    root.render(<Navbar />)
})