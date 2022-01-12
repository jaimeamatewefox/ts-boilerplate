import * as quotes from './quotesRepo';
import { IQuotes, IQueryQuote } from './types';

async function getQuotes(query: IQueryQuote): Promise<IQuotes[]> {
    if (query.author) {
        const quotesByAuthor = await quotes.getQuoteByAuthor(query.author);
        console.log(quotesByAuthor);

        if (quotesByAuthor.length === 0) {
            throw Error('error');
        }

        return quotesByAuthor;
    }

    return quotes.getQuotes();
}

async function getQuoteById(id: string): Promise<IQuotes> {
    return quotes.getQuoteById(id);
}

// await --> una promise es el tipo de una llamada asíncrona
// Si quieres saber el resultado de esa llamada tienes que cumplir la promise
// --- esperar a que acabe la función
// await espera a la promise y devuelve el resultado convirtiendo el código en secuencial

export { getQuotes, getQuoteById };
