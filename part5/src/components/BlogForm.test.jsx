import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('blog with right details created', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
    const blog = {
        title: 'test title',
        author: 'test author',
        url: 'test url',
    }

    const { container } = render(<BlogForm createBlog={createBlog}/>)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')

    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)

    const createButton = screen.getByText('create')
    await user.click(createButton)

    console.log(createBlog.mock.calls)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual(blog)
})