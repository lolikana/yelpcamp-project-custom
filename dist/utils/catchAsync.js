"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync = (func) => {
    return function (req, res, next) {
        func(req, res, next).catch((err) => next(err));
    };
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map