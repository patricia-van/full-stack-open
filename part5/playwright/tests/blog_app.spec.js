const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'testUser',
        username: 'testUser',
        password: 'testUser'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('heading', { name: 'log in to application' })
    await page.getByTestId('username')
    await page.getByTestId('password')
    await page.getByRole('button', { name: 'login' }).click()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'testUser')
      await expect(page.getByText('testUser logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testUser', 'wrong')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testUser', 'testUser')
    })

    test('a new blog can be created', async ({ page }) => {
      const blog = {
        title: 'blog title',
        author: 'blog author',
        url: 'blog url',
      }
      
      await createBlog(page, blog.title, blog.author, blog.url)
      await expect(page.getByText(`${blog.title} ${blog.author}`)).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({page}) => {
        await createBlog(page, 'testBlog', 'testAuthor', 'testUrl')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('likes 1')).toBeVisible()
      })
    })
  })
})