import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import {render, screen, waitFor} from '@testing-library/react';

const testArticle = {
    author: 'Dave',
    body: '',
    createdOn: '',
    headline: 'The journey',
    id: 1,
    image: 'https://picsum.photos/seed/picsum/300/300',
    summary: '',
};

const testArticle2 = {
    author: '',
    body: '',
    createdOn: '',
    headline: 'The journey',
    id: 1,
    image: 'https://picsum.photos/seed/picsum/300/300',
    summary: '',
};

const testDelete = false;
const testEdit = false;

test('renders component without errors', ()=> {
   render(<Article article={testArticle} />) ;
});

test('renders headline, author from the article when passed in through props', ()=> {
    render(<Article article={testArticle} />) ;

    const headline = screen.queryByText(/The journey/i);
    const author = screen.queryByText(/Dave/i);

    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
    render(<Article article={testArticle2} />);

    const press = screen.queryByText(/Associated Press/i);

    expect(press).toBeInTheDocument();
    expect(press).toBeTruthy();
});

test('executes handleDelete when the delete button is pressed', async ()=> {
    render(<Article article={testArticle} />) ;
    //search for test article by headline etc
    const headline = screen.queryByText(/The journey/i);
    expect(headline).toBeInTheDocument();
    //find button with delete id
    const deleteButton = screen.getByTestId('deleteButton');
    userEvent.click(deleteButton);
    //user event press button
    await waitFor(()=>{
        expect(headline).not.toBeInTheDocument();
    })
    //wait and then search for article again
    //should not be in document
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.