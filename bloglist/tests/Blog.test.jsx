import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

describe('Rendering <Blog />', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 1,
    }
  })

  it('initially displays title and author', () => {
    const { container } = render(<Blog blog={blog} />)
    const element = container.querySelector('.blog-title')

    expect(element).toHaveTextContent('title')
    expect(element).toHaveTextContent('author')
  })

  it('initially does not display url and likes', () => {
    const { container } = render(<Blog blog={blog} />)
    const element = container.querySelector('.blog-title')

    expect(element).not.toHaveTextContent('url')
    expect(element).not.toHaveTextContent('1')
  })
})

describe('Rendering <Blog />', () => {
  let blog

  beforeEach(() => {
    blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 1,
      user: { name: 'name' },
    }
  })

  it('clicking the button shows url and likes', async () => {
    const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const urlElement = container.querySelector('.blog-url')
    const likesElement = container.querySelector('.blog-likes')

    expect(urlElement).toHaveTextContent('url')
    expect(likesElement).toHaveTextContent('Likes: 1')
  })

  it('clicking the like button calls the handler twice', async () => {
    const mockHandler = vi.fn()

    const { container } = render(
      <Blog blog={blog} handleUpdateBlog={mockHandler} />
    )

    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    const likesElement = container.querySelector('.blog-likes')

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
