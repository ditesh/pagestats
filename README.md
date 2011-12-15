# What's pagestats.js?

`pagestats.js` gives you key stats on your HTML page from the perspective of your user's browser, including:

* Broken image links, images with src=""
* Performance information (memory, navigation and page timing information)
* CSS style sheets and rules
* Number of DOM elements, iframes and asset counts (JS, CSS, images), cookie counts and sizes
* Injected CSS (eg from native Chrome extensions - this doesn't work on Mozilla/Opera)
* Pagesize (in bytes)

# OK, but what's this good for?

This was written because of real world development environment constraints: with developers pushing out code 10x-50x a day, problems can slip through the cracks.

Hence, an automated system which alerts the developers of broken image links, excessive number of DOM elements, long load times etc proves itself to be absolutely useful.

````pagestats.js```` does this.

It has been tested on latest versions of Chrome and Firefox. It has not been tested on MSIE (send me feedback, if you do test it on MSIE).

# How do I use it?

Note: `pagestats.js` uses jQuery. It attempts to autoload jQuery from Google's servers if the variable ````jQuery```` is not found at the global scope.

You need to include the Javascript file at the bottom of your HTML page (just before </body>):

````javascript
<script src="http://localhost/pagestats/pagestats.js"></script>
</body>
````

Then, listen to the `pagestats` event triggered from the library:

````javascript
<script>
    jQuery("body").bind("pagestats", function(evt, stats) {
        console.log(stats);
        // Better yet, save the stats to some backend system which can notify you if something goes wrong
    });
</script>
````

# License

Copyright (c) 2011 Ditesh Kumar, http://ditesh.gathani.org

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
