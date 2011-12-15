if (typeof jQuery == 'undefined') {

    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
    document.getElementsByTagName('head')[0].appendChild(script);

}

jQuery(document).ready(function() {

    var brokenImages = [];

    // Thanks to http://groups.google.com/group/jquery-dev/browse_frm/thread/eee6ab7b2da50e1f?pli=1
    jQuery("img").each(function(idx, elem) {

        var self=this;
        jQuery(this).bind('error', function(evt) { brokenImages.push(self.src); }) ;
        this.src = this.src;

    });

    jQuery(window).load(function() {

        var $ = jQuery;
        var stats = {};
        stats["img"] = $("img");
        stats["img-count"] = $("img").length;
        stats["broken-img-src"] = brokenImages;
        stats["empty-img-src"] = [];

        stats["js"] = $("script[src]");
        stats["js-count"] = $("script[src]").length;

        stats["css"] = document.styleSheets;
        stats["css-include-count"] = document.styleSheets.length;
        stats["css-rule-count"] = 0;
        stats["injected-css"] = [];
        stats["adblocking-css-rules"] = [];

        stats["pagesize"] = $('html').html().length;
        stats["dom-count"] = document.getElementsByTagName('*').length;
        stats["iframe-count"] = document.getElementsByTagName('iframe').length;

        $("img").each(function(idx, elem) {

            // Chrome loads current page if src="", and annoyingly munges src attribute to current page
            if (elem.src === "" || elem.src === document.location.href) stats["empty-img-src"].push(elem);            

        });

        for (stylesheet in document.styleSheets) {

            if (document.styleSheets[stylesheet].href === null) {

                   stats["injected-css"].push(document.styleSheets[stylesheet]);

                   for (rules in document.styleSheets[stylesheet].cssRules)
                        if (document.styleSheets[stylesheet].cssRules.hasOwnProperty(rules) && document.styleSheets[stylesheet].cssRules[rules].cssText && document.styleSheets[stylesheet].cssRules[rules].cssText.indexOf("display") >= 0)
                            stats["adblocking-css-rules"].push(document.styleSheets[stylesheet].cssRules[rules].cssText);

            }

            try {

                if (document.styleSheets[stylesheet].cssRules !== undefined) stats["css-rule-count"] += document.styleSheets[stylesheet].cssRules.length;

            } catch (e) { /* This happens in Mozilla/Opera for cross-domain access. Let's ignore the security violation*/ }

        }

        // Get timing related information
        var performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
        var timing = performance.timing || {};

        if (timing.loadEventEnd <= timing.connectStart) setTimeout(pollStateChange, 100);

        function pollStateChange() {

            if (document.readyState !== 'complete') setTimeout(pollStateChange, 100);
            else {

                stats["performance"] = performance;
                $("body").trigger("pagestats", stats);

            }

        }


    });
});

