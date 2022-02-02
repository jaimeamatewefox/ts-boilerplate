
import { Schema, Document, model } from 'mongoose';
import { IAddress } from '../geoLocation/types';

export interface IGeolocationDocument extends IAddress, Document {}

const locationSchema = new Schema<IAddress>({
    street: {
        type: String,
    },
    streetNumber: {
        type: String,
    },
    town: {
        type: String,
    },
    postalCode: {
        type: String,
    },
    country: {
        type: String,
    },
});

const modelSchema = model<IAddress>('Location', locationSchema);

export default modelSchema;
