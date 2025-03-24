import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

test('render title and author by default',() => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 1
    }

    const { container } = render(<Blog blog={blog} updateLikes={vi.fn()} />)
    expect(container).toHaveTextContent(blog.title)
    expect(container).toHaveTextContent(blog.author)
    expect(container).not.toHaveTextContent(blog.url)
    expect(container).not.toHaveTextContent(`likes ${blog.likes}`)
})

test('render url and likes when show button is clicked', async () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 1
    }

    const { container } = render(<Blog blog={blog} updateLikes={vi.fn()} />)
    const button = screen.getByText('view')

    const user = userEvent.setup()
    await user.click(button)

    expect(container).toHaveTextContent(blog.url)
    expect(container).toHaveTextContent(`likes ${blog.likes}`)
    
})

test('render url and likes when show button is clicked', async () => {
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        likes: 1
    }

    const mockUpdateLikes = vi.fn()

    const { container } = render(<Blog blog={blog} updateLikes={mockUpdateLikes} />)
    const viewButton = screen.getByText('view')

    const user = userEvent.setup()
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateLikes.mock.calls).toHaveLength(2)
})