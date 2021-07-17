import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'What we are living for',
    author: 'A. Camariana',
    url: 'camariana.gm',
    likes: 0,
  }

  const component = render (
    <Blog blog={blog} />
  )
  //component.debug()
  const title = component.container.querySelector('.blog__title')
  const author = component.container.querySelector('.blog__sub-title')
  console.log(prettyDOM(title))
  console.log(prettyDOM(author))

  expect(component.container).toHaveTextContent(
    'What we are living for'
  )
})