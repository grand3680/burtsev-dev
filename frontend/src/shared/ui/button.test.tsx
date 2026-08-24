import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './button'

describe('Button', () => {
  it('renders its children', () => {
    render(<Button>Запустить</Button>)
    expect(screen.getByRole('button', { name: 'Запустить' })).toBeInTheDocument()
  })

  it('calls onClick when pressed', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Run</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Run' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Run
      </Button>
    )
    await userEvent.click(screen.getByRole('button', { name: 'Run' }))
    expect(onClick).not.toHaveBeenCalled()
  })
})
