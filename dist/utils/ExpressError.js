"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpressError extends Error {
    status;
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}
exports.default = ExpressError;
//# sourceMappingURL=ExpressError.js.map