"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    status;
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=AppError.js.map