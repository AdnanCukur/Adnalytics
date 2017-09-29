(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Settings = (function () {
        function Settings() {
        }
        return Settings;
    }());
    Settings.classSelector = "adnalytics";
    Settings.prefix = "adnalytics";
    Settings.onEventTag = "adnalytics-on";
    Settings.customTags = ["adnalytics-name", "adnalytics-category"];
    Settings.callback = console.log;
    exports.Settings = Settings;
});
//# sourceMappingURL=Settings.js.map