import axios from 'axios';
import { IQuotes } from './types';

async function getQuotes(): Promise<IQuotes[]> {
    const response = await axios.get<IQuotes[]>('https://programming-quotes-api.herokuapp.com/Quotes');

    return response.data;
}

async function getQuoteById(id: string): Promise<IQuotes> {
    const response = await axios.get<IQuotes>(`https://programming-quotes-api.herokuapp.com/Quotes/${id}`);

    return response.data;
}

async function getQuoteByAuthor(author: string): Promise<IQuotes[]> {
    const response = await axios.get<IQuotes[]>(`https://programming-quotes-api.herokuapp.com/Quotes/author/${author}`);

    return response.data;
}

export { getQuotes, getQuoteById, getQuoteByAuthor };
