import { fireEvent, render, screen, cleanup } from '@testing-library/react'
import SettingsPage from '../components/Settings'
import WORDS_API from '../utils/ApiConfig'
import CryptoJS from 'crypto-js'

jest.mock('../utils/ApiConfig')
jest.mock('react-router-dom')
jest.mock('crypto-js')

const mockedNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}))

describe('render Setting', () => {
  ;(WORDS_API.get as jest.Mock).mockResolvedValue({
    data: {}
  })

  ;(WORDS_API.post as jest.Mock).mockResolvedValue({})
  ;(WORDS_API.put as jest.Mock).mockResolvedValue({})

  beforeEach(() => {
    render(<SettingsPage />)
  })
  afterEach(() => {
    cleanup()
  })
  it('Intial Render check', () => {})
  it('Fill in email inputs', () => {
    ;(CryptoJS.HmacSHA512 as jest.Mock).mockResolvedValue({})
    fireEvent.change(screen.getByPlaceholderText('enter new email'), 'newUsername')
    fireEvent.change(screen.getByPlaceholderText('enter new password'), 'Passw0rd')
    fireEvent.change(screen.getByPlaceholderText('enter old password'), 'Passw0rd')
    fireEvent.click(screen.getByDisplayValue('Enter'))
  })
  it('Change user profile pic', () => {
    fireEvent.click(screen.getByTestId('select-icon'))
    fireEvent.click(screen.getAllByAltText('Its broken!')[0])
  })
  it('Change user profile pic', () => {
    fireEvent.click(screen.getByTestId('select-icon'))
    fireEvent.click(screen.getAllByAltText('Its broken!')[0])
  })
  it('test light/dark mode change', () => {
    fireEvent.click(screen.getByTestId('switch-theme'))
  })
})
