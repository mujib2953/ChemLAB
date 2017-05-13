function fadeOutAndRemove(e) {
    e && e.animate({
        opacity: 0,
        duration: 700
    }), setTimeout(function() {
        e && e.parent && e.parent.remove(e), e = null
    }, 1e3)
}
var win, showing, unit = "android" === Ti.Platform.name ? "dp" : 0;
module.exports = {
    setWindow: function(e) {
        return win = e
    },
    show: function(e, t) {
        function n() {
            e && (e.stop && (e.stop(), Ti.App.fireEvent("mediaPlaybackDidComplete")), fadeOutAndRemove(showing), e = t = showing = null)
        }
        showing && fadeOutAndRemove(showing), e.top = 10 + unit, e.bottom = 50 + unit, showing = Ti.UI.createView({
            backgroundColor: "#000",
            opacity: 0
        });
        var i = Ti.UI.createLabel({
            text: t,
            textAlign: "center",
            font: {
                fontSize: 18 + unit
            },
            color: "#fff",
            height: Ti.UI.SIZE,
            left: 20 + unit,
            right: 20 + unit,
            bottom: 10 + unit
        });
        return showing.add(e), showing.add(i), win.add(showing), showing.animate({
            opacity: 1,
            duration: 700
        }), showing.addEventListener("click", n), n
    }
};