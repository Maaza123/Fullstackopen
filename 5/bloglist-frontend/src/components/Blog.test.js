import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog';

test('renders content', () =>{
    const blog = {
        author: 'Testi author',
        title: 'Testi title',
        likes: '53',
        url: 'www.test.fi'

    }
    
    const component = render(
        <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
        'Testi author'
    )
    expect(component.container).toHaveTextContent(
        'Testi title'
    )
    
})

test('Clicking the button renders more content', () => {
    const blog = {
        author: 'Testi author',
        title: 'Testi title',
        likes: '53',
        url: 'www.test.fi'

    }
    const component = render(
        <Blog blog={blog} />
    )
     const button = component.getByText('More info')
     expect(button).toBeDefined();

     expect(component.container).toHaveTextContent(
         'likes 53'
     )
     expect(component.container).toHaveTextContent(
         'www.test.fi'
     )
})
test('Test clicking like button twice', () =>{
    const blog = {
        author: 'Testi author',
        title: 'Testi title',
        likes: '53',
        url: 'www.test.fi'
    }
    const mockHandler = jest.fn();
    const component = render(
        <Blog blog={blog} addLikes={mockHandler} />
    )
     const button = component.getByText('More info')
     expect(button).toBeDefined();
     fireEvent.click(button);
    
     const likeButton = component.getByText('like')
     expect(likeButton).toBeDefined();

     fireEvent.click(likeButton);
     fireEvent.click(likeButton);
     expect(mockHandler.mock.calls).toHaveLength(2);
})
