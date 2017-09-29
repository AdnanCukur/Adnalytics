(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./app/Adnalytics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Adnalytics_1 = require("./app/Adnalytics");
    exports.Adnalytics = Adnalytics_1.Adnalytics;
});
//# sourceMappingURL=index.js.map