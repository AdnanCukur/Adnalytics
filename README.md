# Adnalytics
Adnalytics is a modular and easy to use library for your third party analytics calls.

Add analytics to your elements that send events to Google Analytcs / Piwik e.t.c with just a few attributes added to the element.

Example:

```html
<button class="tracker" tracker-on="click" tracker-category="Video" tracker-action="Play" tracker-label="Cool video about cats">Play</button>
```

The classname and attribute prefix are custom and you can have how many or how little attributes as you want.

The attributes are what creates the eventObject that we send to the callback function.

The only requirement is that you have an "yourcustomprefix-on" attribute that will let Adnalytics know on which event to call the callback function.

Uses MutationObserver to make it fully functional with lazy loaded dom elements

# Usage

Full example found here https://github.com/AdnanCukur/Adnalytics/blob/master/Example/Index.html

First we need to decide on a profile name, this will be how Adnalytics hooks into your elements.
The profile name decides the attribute prefix and the class name you'll add to your elements.

Then you need to create a function that will send your events to your analytics service
f.ex    

```javascript
function eventLogger(myEventObject) {
  ga('send', 'event', myEventObject.category, myEventObject.action, myEventObject.label)
}
```
The properties of 'myEventObject' are the attribute names that you add to your element

Then we will initate Adnalytics

```javascript
adnalytics.Init({
  profile: "tracker", // this is your attribute prefix and your elements that you want to track needs to have a class with this name
  callback: eventLogger // this function will be called when adnalytics triggers an event on one of your elements
});
```   
    
Then we need to add our attributes to our element that we want to track, the only required attribute is 'on' which decides when Adnalytics should call the callback function

```html
<div class="tracker" tracker-on="load" tracker-category="Video" tracker-action="View" tracker-label="Cool video about cats">
  <button class="tracker" tracker-on="click" tracker-category="Video" tracker-action="Play" tracker-label="Cool video about cats">Play</button>
</div>
```

In the above example Adnalytics will first call the eventLogger function when the page has loaded with the following object
```javascript    
{category:"Video", action:"View", label:"Cool video about cats"}
```
This is data from the div class
The second element is a button, Adnalytics will call the eventlogger when a user has clicked on that button and will send following object to the eventLogger function
```javascript    
{category:"Video", action:"Play", label:"Cool video about cats"}
```

Full Example

```html
 <!-- will trigger eventlogger on pageload -->
<p tracker-on="load" tracker-category="Video" tracker-action="view" tracker-label="Cool video about cats" class="tracker">this will trigger the eventLogger when the page has been loaded</p>

 <!-- will trigger eventlogger when clicked on -->
<p tracker-on="click" tracker-category="Video" tracker-action="play" tracker-label="Cool video about cats" class="tracker">this will trigger the eventlogger when user clicks the element</p>

<script type="text/javascript" src="../dist/adnalytics.umd.js"></script>
<script>
  console.log("initiating")
  function eventLogger(myEventObject) {
    console.log(myEventObject);
  }
  adnalytics.Init({
    profile: "tracker",
    callback: eventLogger
  });
</script>
```
