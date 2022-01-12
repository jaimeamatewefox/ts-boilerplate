interface IQuotes {
    id: string;
    author: string;
    en: string;
}

interface IQueryQuote {
    author?: string;
}

export { IQuotes, IQueryQuote };
