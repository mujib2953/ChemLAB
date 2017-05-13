/*
* @Author: Mujib Ansari
* @Date:   2017-04-16 20:14:06
* @Last Modified by:   Mujib Ansari
* @Last Modified time: 2017-04-16 20:14:26
*/

'use strict';
var overlay = require("overlay"),
    trackerId = "UA-9358203-7";
Ti.UI.backgroundColor = "#000", Ti.App.addEventListener("openHelp", function(e) {
    webWin2.setUrl(e.URL), win2.add(webWin2), win2.open()
}), Ti.App.addEventListener("changePage", function(e) {
    webWin2.setUrl(e.URL)
}), Ti.App.addEventListener("closeURL", function() {
    win2.close()
});
var webWin2 = Titanium.UI.createWebView({
        enableZoomControls: !1,
        scalesPageToFit: !0,
        statusBarHidden: !0,
        showScrollbars: !1,
        backgroundColor: "#000",
        willHandleTouches: !0
    }),
    win2 = Titanium.UI.createWindow({
        navBarHidden: !0,
        statusBarHidden: !0,
        backgroundColor: "#000",
        fullscreen: !0
    }),
    webWin = Titanium.UI.createWebView({
        url: "main.html",
        enableZoomControls: !1,
        scalesPageToFit: !0,
        statusBarHidden: !0,
        showScrollbars: !1,
        backgroundColor: "#000",
        willHandleTouches: !0
    }),
    win1 = overlay.setWindow(Titanium.UI.createWindow({
        navBarHidden: !0,
        backgroundColor: "#000",
        fullscreen: !0,
        statusBarHidden: !0,
        exitOnClose: !0
    }));
if (win1.orientationModes = [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT], win2.orientationModes = [Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT], Ti.App.addEventListener("openLink", function(e) {
        var i = Titanium.Media.createVideoPlayer({
                backgroundColor: "#000",
                scalingMode: Titanium.Media.VIDEO_SCALING_ASPECT_FIT,
                mediaControlStyle: Titanium.Media.VIDEO_CONTROL_HIDDEN,
                autoplay: !0,
                exitOnClose: !0,
                url: e.url
            }),
            n = overlay.show(i, e.text);
        i.addEventListener("playbackState", function() {
            i && 1 != i.playbackState && (n(), e = i = n = null)
        })
    }), Ti.App.addEventListener("showImage", function(e) {
        var i = Ti.UI.createImageView({
                image: e.image
            }),
            n = overlay.show(i, e.text);
        setTimeout(n, 6e3)
    }), Ti.App.addEventListener("openinSafari", function(e) {
        Ti.Platform.openURL(e.URL)
    }), "mobileweb" !== Ti.Platform.osname) var GoogleAnalytics = require("ti.googleanalytics"),
    Fields = GoogleAnalytics.getFields(),
    tracker = GoogleAnalytics.getTracker(trackerId);
Ti.App.addEventListener("trackStart", function() {
    tracker.send(GoogleAnalytics.getMapBuilder().createAppView().set(Fields.SCREEN_NAME, "main").build())
}), Ti.App.addEventListener("trackNoBounce", function() {
    tracker.send(GoogleAnalytics.getMapBuilder().createEvent("NoBounce", "NoBounce", "Over 7 seconds").build())
}), win1.addEventListener("android:back", function() {
    win1.remove(webWin), win1.close()
}), setTimeout(function() {
    win1.open(), win1.add(webWin)
}, 2e3), webWin.addEventListener("load", function() {
    var e = Ti.Platform.displayCaps.platformWidth,
        i = Ti.Platform.displayCaps.platformHeight,
        n = Ti.Platform.displayCaps.dpi;
    Ti.App.fireEvent("androidSize", {
        width: e,
        height: i,
        ratio: n
    })
});