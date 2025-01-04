
export const ErrorMessages = {
    badRequest: { code: 400, message: 'error.bad_request' },
    unauthorized: { code: 401, message: 'error.unauthorized' },
    forbidden: { code: 403, message: 'error.forbidden' },
    notFound: { code: 404, message: 'error.not_found' },
    internalServerError: { code: 500, message: 'error.internal_server_error' },
    unknown: { code: 0, message: 'error.unknown' },
};

export function getErrorMessage(status: number) {
    switch (status) {
        case 400:
            return ErrorMessages.badRequest;
        case 401:
            return ErrorMessages.unauthorized;
        case 403:
            return ErrorMessages.forbidden;
        case 404:
            return ErrorMessages.notFound;
        case 500:
            return ErrorMessages.internalServerError;
        default:
            return ErrorMessages.unknown;
    }
}
