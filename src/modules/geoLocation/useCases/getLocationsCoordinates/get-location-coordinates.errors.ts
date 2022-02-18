export namespace GetLocationCoordinatesErrors {
    export class LocationCoordinatesNotFound extends Error {
        constructor() {
            super('Location not found');
        }
    }

    export class LocationInvalidFormat extends Error {
        constructor() {
            super('Invalid format');
        }
    }
}
