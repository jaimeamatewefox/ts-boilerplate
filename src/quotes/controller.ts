import { AxiosError } from 'axios';
import { Router } from 'express';
import * as quotesService from './service';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const queryObject = {
            author: req.query.author as string,
        };

        const response = await quotesService.getQuotes(queryObject);

        res.send(response);
    } catch (err) {
        console.log('Authors not found');
        res.status(404).send({ message: 'Quotes not found' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const quotesId = req.params.id; //-->
        console.log('el parametro recibido es', req.params.id);

        const response = await quotesService.getQuoteById(quotesId);

        res.send(response);
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status) {
            res.status(axiosError.response?.status).send({ message: axiosError.response?.statusText });
        }
    }
});

export { router as quoteRouter };
