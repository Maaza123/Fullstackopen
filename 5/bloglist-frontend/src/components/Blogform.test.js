import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './Blogform.js'


test('Test that form parameters are correctly inserted with submit ', () => {

    const addBlog = jest.fn();
    const component = render(
        <BlogForm addBlog={addBlog} />
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    const form = component.container.querySelector('#form')

    fireEvent.change(title, {
        target: {value: 'JUHANI'}
    })
    fireEvent.change(author, {
        target: {value: 'YKKÖSEL'}
    })
    fireEvent.change(url, {
        target: {value: 'ALAS'}
    })

    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('JUHANI');
    expect(addBlog.mock.calls[0][0].author).toBe('YKKÖSEL');
    expect(addBlog.mock.calls[0][0].url).toBe('ALAS');
})