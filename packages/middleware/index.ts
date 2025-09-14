export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly details?: any;
    
    constructor(message: string, statusCode: number, isOperational = true, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.details = details;
        
        // Maintains proper stack trace for where our error was thrown
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error(message).stack;
        }
        
        // Set the prototype explicitly (important for instanceof checks)
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

// 400-level Client Errors
export class BadRequestError extends AppError {
    constructor(message = 'Bad request', details?: any) {
        super(message, 400, true, details);
    }
}

export class ValidationError extends AppError {
    constructor(message = 'Invalid request data', details?: any) {
        super(message, 400, true, details); 
    }
}

export class AuthenticationError extends AppError {
    constructor(message = 'Unauthorized', details?: any) {
        super(message, 401, true, details);
    }
}

export class ForbiddenError extends AppError {
    constructor(message = 'Access denied', details?: any) {
        super(message, 403, true, details);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Not found') {
        super(message, 404, true);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Resource conflict', details?: any) {
        super(message, 409, true, details);
    }
}

// 500-level Server Errors
export class InternalServerError extends AppError {
    constructor(message = 'Internal server error', details?: any) {
        super(message, 500, false, details); 
    }
}

export class ServiceUnavailableError extends AppError {
    constructor(message = 'Service temporarily unavailable', details?: any) {
        super(message, 503, false, details);
    }
}

export class DatabaseError extends AppError {
    constructor(message = 'Database operation failed', details?: any) {
        super(message, 500, false, details);
    }
}
export class RateLimitError extends AppError {
    constructor(message = 'Rate limit exceeded, please try again later', details?: any) {
        super(message, 429, true, details);
    }
}


// Utility function to check if error is operational
export function isOperationalError(error: Error): boolean {
    if (error instanceof AppError) {
        return error.isOperational;
    }
    return false;
}

// export function isOperationalError(error: unknown): error is AppError {
//     return error instanceof AppError && error.isOperational;
// }
