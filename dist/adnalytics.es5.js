var Settings = /** @class */ (function () {
    function Settings() {
    }
    return Settings;
}());

/**
 * Observes DOM changes to be able to catch if a new element gets added to the dom that should attach event listeners.
 * SPA's and lazy loaded content won't work without this.
 * Doesnt work for IE <= 10
 */
var AdnalyticsObserver = /** @class */ (function () {
    function AdnalyticsObserver() {
    }
    AdnalyticsObserver.register = function () {
        // check if browser supports mutation observer, if not return.
        if (!("MutationObserver" in window)) {
            return;
        }
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                AdnalyticsObserver.handleDomMutation(mutation);
            });
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false
        });
    };
    AdnalyticsObserver.handleDomMutation = function (mutation) {
        if (!mutation.addedNodes) {
            return;
        }
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            var node = mutation.addedNodes[i];
            if (node == null || node.id == null || node.className == null) {
                return;
            }
            AdnalyticsObserver.handleAddedDomElement(node);
        }
    };
    AdnalyticsObserver.handleAddedDomElement = function (element) {
        // check if added dom element is an adnalytics element and if it is attach listeners to it
        if (AdnalyticsObserver.elementIsAdnalyticsElement(element)) {
            Init.attachListeners(element);
        }
        // check if added dom element contains adnalytics elements and if it does
        // attach listeners to every one of those elements
        var adnalyticsElementsInside = AdnalyticsObserver.elementContainsAdnalyticsElements(element);
        if (adnalyticsElementsInside.length > 0) {
            for (var i = 0; i < adnalyticsElementsInside.length; i++) {
                var node = adnalyticsElementsInside.item(i);
                Init.attachListeners(node);
            }
        }
    };
    AdnalyticsObserver.elementIsAdnalyticsElement = function (element) {
        if (!element.className || !element.className.split)
            return false;
        var classnames = element.className.split(" ");
        for (var i = 0; i < classnames.length; i++) {
            if (classnames[i].indexOf(Settings.profile) === 0) {
                return true;
            }
        }
        return false;
    };
    AdnalyticsObserver.elementContainsAdnalyticsElements = function (element) {
        return element.getElementsByClassName(Settings.profile);
    };
    return AdnalyticsObserver;
}());

/**
 * Makes sure we don't get duplicate event listeners on the same dom element
 */
var AdnalyticsStore = /** @class */ (function () {
    function AdnalyticsStore() {
    }
    AdnalyticsStore.add = function (element) {
        element.__data = AdnalyticsStore.count++;
        AdnalyticsStore.store[element.__data] = 1;
    };
    AdnalyticsStore.exists = function (element) {
        if (AdnalyticsStore.store[element.__data] != null) {
            return true;
        }
        return false;
    };
    AdnalyticsStore.store = {};
    AdnalyticsStore.count = 0;
    return AdnalyticsStore;
}());

/** registers the observer which observers changes made to the dom
 *  initiates the initial scan of elements
 */
var Init = /** @class */ (function () {
    function Init(options) {
        Init.setSettings(options);
        AdnalyticsObserver.register();
        Init.scan();
    }
    Init.setSettings = function (options) {
        Settings.profile = options.profile;
        Settings.onEventAttrName = options.profile + "-on";
        Settings.callback = options.callback;
    };
    /**
     * Scans the dom for the profile class and attaches a listener to the elements
     */
    Init.scan = function () {
        var allAdnalyticsElements = document.getElementsByClassName(Settings.profile);
        for (var i = 0; i < allAdnalyticsElements.length; i++) {
            var node = allAdnalyticsElements.item(i);
            Init.attachListeners(node);
        }
    };
    /**
     * Attaches a listener to the element which then calls the callback method
     * when triggered with the belonging profile attributes as an object
     * ex: <p class='myprofile' myprofile-on='click' myprofile-name='peter' myprofile-id='4'>text..</p>
     *     will trigger the callback function when the element is clicked on with an object {name:"peter", id:"4"}
     * @param node element with the profile class
     */
    Init.attachListeners = function (node) {
        if (AdnalyticsStore.exists(node)) {
            return;
        }
        AdnalyticsStore.add(node);
        var attributes = node.attributes;
        var onEvent = attributes.getNamedItem(Settings.onEventAttrName);
        if (!onEvent)
            return;
        var analyticsObject = {};
        for (var i = 0; i < attributes.length; i++) {
            var attributeName = attributes[i].name;
            var attributeValue = attributes[i].value;
            if (attributeName.indexOf(Settings.profile) === 0 &&
                attributeName !== Settings.onEventAttrName) {
                analyticsObject[attributeName.replace(Settings.profile + "-", "")] = attributeValue;
            }
        }
        if (onEvent.value === "load") {
            Settings.callback(analyticsObject);
        }
        else {
            node.addEventListener(onEvent.value, function (e) {
                Settings.callback(analyticsObject);
            });
        }
    };
    return Init;
}());
var AdnalyticsOptions = /** @class */ (function () {
    function AdnalyticsOptions() {
    }
    return AdnalyticsOptions;
}());

export { Init, AdnalyticsOptions };
//# sourceMappingURL=adnalytics.es5.js.map
