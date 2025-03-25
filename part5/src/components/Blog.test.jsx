import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

describe( 'Blog', () => {
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 1
  }

  test('render title and author by default',() => {
    const { container } = render(<Blog blog={blog} handleLike={vi.fn()} handleDelete={vi.fn()} />)
    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('render url and likes when show button is clicked', async () => {
    const { container } = render(<Blog blog={blog} updateLikes={vi.fn()} />)
    const button = screen.getByText('view')

    const user = userEvent.setup()
    await user.click(button)

    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(`likes ${blog.likes}`)

  })

  test('clicking like twice calls event handler twice', async () => {
    const mockHandleLikes = vi.fn()

    const { container } = render(<Blog blog={blog} handleLike={mockHandleLikes} handleDelete={vi.fn()} />)
    const viewButton = screen.getByText('view')

    const user = userEvent.setup()
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleLikes.mock.calls).toHaveLength(2)
  })
})