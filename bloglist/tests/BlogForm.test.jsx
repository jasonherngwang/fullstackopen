import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BlogForm } from '../src/components/Forms'

test('form calls handler with correct details', async () => {
  const mockHandler = vi.fn()

  const { container } = render(<BlogForm handleAddBlog={mockHandler} />)

  const user = userEvent.setup()

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')

  const submitButton = screen.getByText('Create')
  await user.click(submitButton)

  expect(mockHandler.mock.calls[0][0]).toEqual({
    title: 'test title',
    author: 'test author',
    url: 'test url',
  })
})
