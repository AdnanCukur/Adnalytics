(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Settings"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Settings_1 = require("./Settings");
    var Adnalytics = (function () {
        function Adnalytics(options, callback) {
            Adnalytics.setSettings(options);
        }
        Adnalytics.setSettings = function (options) {
        };
        Adnalytics.scan = function () {
            var allAdnalyticsElements = document.getElementsByClassName(Settings_1.Settings.classSelector);
            for (var i = 0; i < allAdnalyticsElements.length; i++) {
                var node = allAdnalyticsElements.item(i);
                Adnalytics.attachListeners(node);
            }
        };
        Adnalytics.attachListeners = function (node) {
            var attributes = node.attributes;
            var onEvent = attributes.getNamedItem(Settings_1.Settings.onEventTag);
            node.addEventListener(onEvent.value, function (e) {
                var analyticsObject = {};
                for (var i = 0; i < attributes.length; i++) {
                    var attributeName = attributes[i].name;
                    var attributeValue = attributes[i].value;
                    if (attributeName.indexOf(Settings_1.Settings.prefix) === 0 && attributeName !== Settings_1.Settings.onEventTag) {
                        analyticsObject[attributeName] = attributeValue;
                    }
                }
                Settings_1.Settings.callback(analyticsObject);
            });
        };
        return Adnalytics;
    }());
    exports.Adnalytics = Adnalytics;
});
//# sourceMappingURL=Adnalytics.js.map