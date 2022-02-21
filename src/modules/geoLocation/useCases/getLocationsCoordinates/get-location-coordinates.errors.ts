export namespace GetLocationCoordinatesErrors {
    export class LocationCoordinatesNotFound extends Error {
        constructor() {
            super('Location not found');
        }
    }
}
