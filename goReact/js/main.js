function mobileInit(e, t, n) {
    hammer = new Hammer(document.getElementById("canvas")), WIDTH = e / n, HEIGHT = t / n, eSize = 48.8, pTable = new PeriodicTable, pTable.scale = 1, pTable.changeScale(1), pTable.tableWidth = 960, pTable.tableHeight = 640, largeFont = "" + Math.round(WIDTH / 33.5) + "px Arial", dialogFontHeight = HEIGHT / 43.5, largeFontHeight = HEIGHT / 33.5, mediumFont = "" + Math.round(WIDTH / 50.5) + "px Arial", dialogFont = "" + Math.round(WIDTH / 43.5) + "px Arial", smallFont = "" + Math.round(WIDTH / 56) + "px Arial", bubbleScale = 6, reactionImg0 = new Image, reactionImg0.src = "media/ui/mreaction_empty.png", reactionImg1 = new Image, reactionImg1.src = "media/ui/mreaction.png", rAreaX = .2 * WIDTH, rAreaY = 0, WIDTH / 1.5 > 480 ? (rAreaW = 320, rAreaH = 80) : (rAreaW = WIDTH / 1.5, rAreaH = WIDTH / 6), tAreaX = rAreaX + rAreaW - rAreaH / 2, tAreaY = rAreaH / 3, tAreaW = rAreaH / 3, tAreaH = rAreaH / 3, elementInfo = new ElementInfoBox(0, HEIGHT - HEIGHT / 3, HEIGHT / 3.5, .75 * WIDTH), hammer.ondragstart = function(e) {
        dragStart(e)
    }, hammer.ondrag = function(e) {
        dragging(e)
    }, hammer.ondragend = function(e) {
        dragEnd(e)
    }, hammer.ontap = function(e) {
        singleTap(e)
    }, hammer.ondoubletap = function(e) {
        doubleTap(e)
    }, hammer.ontransformstart = function() {}, hammer.ontransform = function() {}, hammer.ontransformend = function() {}, pt.canvas.width = WIDTH, pt.canvas.height = HEIGHT, nav = new Navigator(WIDTH - WIDTH / 2.6, HEIGHT - WIDTH / 5.5, WIDTH, HEIGHT), readReactions(), menuList = readMenus();
    var i, r = WIDTH - WIDTH / 12,
        o = WIDTH / 6;
    for (i = 0; menuList.length > i; i++) menuList[i].setPosition(r, o), o -= WIDTH / 6;
    helpWindow = new InfoBox, textWidth = WIDTH / 13, draw();
    var a = "Double-tap elements to create chemical reactions! Try the 'Featured Reactions' menu for some suggestions.";
    displayHint(wrapText(a, bubbleScale * textWidth, dialogFont), 0), setInterval(draw, 1e3 / FPS), setInterval(timer, 1e3), timer()
}

function init() {
    BrowserDetect.init(), browser = BrowserDetect.browser, os = BrowserDetect.OS, canvas = document.getElementById("canvas"), pt = canvas.getContext("2d");
    var e, t, n;
    if ("iPhone/iPod" == os || "Android" == os) window.Ti && Ti.App.addEventListener("androidSize", function(i) {
        e = i.ratio, t = i.width, n = i.height, "iPhone/iPod" == os ? (e /= 160, 1 != e && (t = e * t, n = e * n), mobile = !0, mobileInit(t, n, e)) : "Android" == os && (t / e > 5 ? (androidWidth = t, androidHeight = n, isAndroidTablet = !0, stdInit()) : (mobile = !0, e /= 160, mobileInit(t, n, e)))
    });
    else {
        if ("iPhone/iPod" != os && "Android" != os && "iPad" != os) {
            var t = window.innerWidth,
                n = window.innerHeight;
            isWebBrowser = !0, androidWidth = t, androidHeight = n
        }
        stdInit()
    }
}

function stdInit() {
    if (!mobile) {
        WIDTH = 1024, HEIGHT = 768, (isAndroidTablet || isWebBrowser) && (WIDTH = androidWidth, HEIGHT = androidHeight, androidTabletScale = Math.min(WIDTH / 1024, HEIGHT / 768), WIDTH / 1024 > HEIGHT / 768 ? (androidTabletYOffset = -150 * androidTabletScale, androidTabletXOffset = -150 * androidTabletScale + (WIDTH - 1024 * androidTabletScale) / 2) : (androidTabletXOffset = -150 * androidTabletScale, androidTabletYOffset = -150 * androidTabletScale + (HEIGHT - 768 * androidTabletScale) / 2)), eSize = 52, largeFont = "" + Math.round(androidTabletScale * eSize / 2.5) + "px Arial", dialogFontHeight = eSize / 2.5, largeFontHeight = eSize / 2.5, mediumFont = "" + Math.round(androidTabletScale * eSize / 3.5) + "px Arial", smallFont = "" + Math.round(androidTabletScale * eSize / 6) + "px Arial", dialogFont = largeFont, reactionImg0 = new Image, reactionImg0.src = "media/ui/reaction_empty.png", reactionImg1 = new Image, reactionImg1.src = "media/ui/reaction.png", rAreaX = 4 * eSize - 7, rAreaY = 11.85 * eSize, rAreaW = 10.6 * eSize, rAreaH = 2.5 * eSize, (isAndroidTablet || isWebBrowser) && (rAreaY = androidTabletYOffset + 765 * androidTabletScale, rAreaW = 10.6 * eSize * androidTabletScale, rAreaH = 2.5 * eSize * androidTabletScale, rAreaX = WIDTH / 2 - rAreaW / 1.75), tAreaX = 14.95 * eSize, tAreaY = 11.85 * eSize, tAreaW = 2.8 * eSize, tAreaH = 2 * eSize, readReactions(), pTable = new PeriodicTable, elementInfo = new ElementInfoBox(3.25 * eSize, eSize, 1.5 * eSize, 7.25 * eSize), "iPad" == os ? (canvas.addEventListener("touchstart", touchDown, !1), canvas.addEventListener("touchmove", touchXY, !1), canvas.addEventListener("touchend", touchUp, !1), document.body.addEventListener("touchcancel", touchUp, !1)) : isAndroidTablet ? (hammer = new Hammer(document.getElementById("canvas")), hammer.ondragstart = function(e) {
            tabletDragStart(e)
        }, hammer.ondrag = function(e) {
            tabletDragging(e)
        }, hammer.ondragend = function(e) {
            tabletDragEnd(e)
        }, hammer.ontap = function(e) {
            tabletTap(e)
        }, hammer.ondoubletap = function(e) {
            tabletDouble(e)
        }) : (canvas.addEventListener("mousedown", mouseDown, !1), canvas.addEventListener("mousemove", mouseXY, !0), document.body.addEventListener("mouseup", mouseUp, !1), video = document.createElement("video"), videoCaption = document.createElement("div"), videoCaption.setAttribute("class", "videoCaption"), document.body.appendChild(video), document.body.appendChild(videoCaption), video.style.position = "absolute", video.addEventListener("ended", movieEnded, !1)), pt.canvas.width = WIDTH, pt.canvas.height = HEIGHT, menuList = readMenus();
        var e, t = 0,
            n = 9.25 * eSize;
        for ((isAndroidTablet || isWebBrowser) && (n = HEIGHT / 2), e = 0; menuList.length > e; e++) menuList[e].setPosition(t, n), t += menuList[e].width;
        learn = new learnMore, textWidth = eSize, setTimeout(function() {
            helpWindow = new InfoBox;
            var e = "Drag elements into reaction area to create chemical reactions! Try the 'Featured Reactions' menu for some suggestions.";
            displayHint(wrapText(e, 8 * eSize, dialogFont), 0)
        }, 1e3), draw(), setInterval(draw, 1e3 / FPS)
    }
    setInterval(timer, 1e3), timer()
}

function clear() {
    pt.clearRect(0, 0, WIDTH, HEIGHT), pt.fillStyle = "#000", pt.fillRect(0, 0, WIDTH, HEIGHT)
}

function draw() {
    if (reactionImage) {
        pt.fillStyle = "black", pt.globalAlpha = .3;
        var e = WIDTH;
        if (mobile) var t = HEIGHT - 3 * dialogFontHeight;
        else var t = HEIGHT - 6 * dialogFontHeight;
        var n = 0;
        n = e / reactionImage.width < t / reactionImage.height ? e / reactionImage.width : t / reactionImage.height, mobile ? pt.drawImage(reactionImage, WIDTH / 2 - reactionImage.width * n / 2, 2, reactionImage.width * n, reactionImage.height * n) : pt.drawImage(reactionImage, WIDTH / 2 - reactionImage.width * n / 2, HEIGHT / 2 - reactionImage.height * n / 2, reactionImage.width * n, reactionImage.height * n);
        for (var i = 0; reactionText.length > i; i++) {
            var r = pt.measureText(reactionText[0]),
                o = r.width;
            pt.font = dialogFont, pt.fillStyle = "white", pt.fillText(reactionText[i], WIDTH / 2 - o / 2, HEIGHT + (i - reactionText.length) * dialogFontHeight)
        }
    } else if (reactionVideo) clear();
    else {
        clear(), pTable.draw(), mobile && (pt.setTransform(1, 0, 0, 1, 0, 0), nav.draw()), pt.setTransform(1, 0, 0, 1, 0, 0), elementInfo.draw(), pt.setTransform(1, 0, 0, 1, 0, 0), 0 == molecules.length ? pt.drawImage(reactionImg0, rAreaX, rAreaY, rAreaW, rAreaH) : pt.drawImage(reactionImg1, rAreaX, rAreaY, rAreaW, rAreaH), pt.setTransform(1, 0, 0, 1, 0, 0);
        for (var a = 0; molecules.length > a; a++) {
            molecules[a].doSpringAndMass();
            for (var s = 0; molecules[a].mElements.length > s; s++) {
                var l = pt.createRadialGradient(molecules[a].mElements[s].x, molecules[a].mElements[s].y, 0, molecules[a].mElements[s].x, molecules[a].mElements[s].y, 10 + eSize * (molecules[a].mElements[s].rad / 300));
                mobile && (l = pt.createRadialGradient(molecules[a].mElements[s].x, molecules[a].mElements[s].y, 0, molecules[a].mElements[s].x, molecules[a].mElements[s].y, 10 + rAreaW / 12 * (molecules[a].mElements[s].rad / 300))), l.addColorStop(0, rgb(molecules[a].mElements[s].atomRed, molecules[a].mElements[s].atomGreen, molecules[a].mElements[s].atomBlue)), l.addColorStop(1, "rgba(0,0,0,0)"), pt.fillStyle = l, mobile ? pt.fillRect(molecules[a].mElements[s].x - rAreaW / 12, molecules[a].mElements[s].y - rAreaW / 12, rAreaW / 6, rAreaW / 6) : pt.fillRect(molecules[a].mElements[s].x - eSize, molecules[a].mElements[s].y - eSize, 2 * eSize, 2 * eSize)
            }
            for (var s = 0; molecules[a].mElements.length > s; s++)
                if (0 == s) {
                    pt.fillStyle = "white", pt.font = largeFont, correctedSymbol = addSubscript(molecules[a].symbol), mobile ? pt.fillText(correctedSymbol, molecules[a].mElements[s].x - 10 - rAreaW / 12 * (molecules[a].mElements[s].rad / 400), molecules[a].mElements[s].y - 10 - rAreaW / 12 * (molecules[a].mElements[s].rad / 600)) : pt.fillText(correctedSymbol, molecules[a].mElements[s].x - 10 - eSize * (molecules[a].mElements[s].rad / 400), molecules[a].mElements[s].y - 10 - eSize * (molecules[a].mElements[s].rad / 600));
                    break
                }
        }
        if (currentRecipes.length > 0) {
            var c = addSubscript(currentRecipes[0].formula);
            pt.font = dialogFont, pt.globalAlpha = .65, pt.fillStyle = "orange";
            var u = "Make " + c;
            if (0 == instructionLength) {
                var r = pt.measureText(u);
                instructionLength = r.width
            }
            var d = "215";
            d = String.fromCharCode(d) + " Cancel";
            var h = pt.measureText(d);
            if (h = h.width, h + 5 > instructionLength && (instructionLength = h + 10), pt.strokeStyle = "white", mobile) {
                pt.font = largeFont;
                var h = pt.measureText(d);
                h = h.width, h > instructionLength && (instructionLength = h + 5), pt.lineWidth = 1, pt.strokeStyle = "white", pt.strokeRect(15, 3.25 * dialogFontHeight + 1, h + 9, 3.25 * dialogFontHeight), pt.globalAlpha = 1, pt.fillStyle = "white", pt.fillText(u, 14, dialogFontHeight + 12), pt.fillStyle = "rgba(200,200,200,1)", pt.fillText(d, 19, 5 * dialogFontHeight + 5)
            } else pt.lineWidth = 1, pt.strokeStyle = "white", pt.strokeRect(40, 2.5 * dialogFontHeight, h + 29, 1.25 * dialogFontHeight), pt.globalAlpha = 1, pt.fillStyle = "white", pt.fillText(u, 40, 2 * dialogFontHeight), pt.globalAlpha = .65, pt.fillStyle = "white", pt.fillText(d, 45, 3.25 * dialogFontHeight + 4), pt.globalAlpha = 1
        }
        0 != globalHeat && (pt.setTransform(1, 0, 0, 1, 0, 0), globalHeat.draw(), globalHeat.isFinished() && (globalHeat = 0)), helpWindow && helpWindow.draw();
        var p;
        for (pt.setTransform(1, 0, 0, 1, 0, 0), p = 0; menuList.length > p; p++) menuList[p].draw()
    }
}

function scoreComplexity(e) {
    return splitByCase(e).length
}

function findReaction(e) {
    var t;
    for (t = 0; reactions.length > t; t++)
        if (reactions[t].molecule == e) return reactions[t]
}

function arrayShuffle(e) {
    for (var t = e.slice(), n = t.length, i = n; i--;) {
        var r = parseInt(Math.random() * n),
            o = t[i];
        t[i] = t[r], t[r] = o
    }
    return t
}

function checkReactions() {
    var e = 1e4,
        t = 0,
        n = 0,
        i = 0,
        r = 0,
        o = 0,
        a = arrayShuffle(reactions);
    for (currentRecipes.length > 0 && (a = [], a.push(currentRecipes[0].reaction)), t = 0; a.length > t; t++) {
        var s = [],
            l = [];
        for (n = 0; molecules.length > n; n++) l.push(molecules[n]);
        for (n = 0; a[t].eArray.length > n; n++) {
            var c = 0;
            for (i = 0; l.length > i; i++)
                if (l[i].symbol == a[t].eArray[n]) {
                    l.splice(i, 1), c = 1;
                    break
                }
            c || s.push(a[t].eArray[n])
        }
        if (1 == s.length && e > 1 && e > scoreComplexity(s[0]) && (e = scoreComplexity(s[0]), missingIngredient = s[0]), currentRecipes.length > 0 && (missingIngredient = s[0]), 0 == s.length) {
            var u = [];
            for (missingIngredient = 0, o = 0; a[t].eArray.length > o; o++) {
                var c = 0;
                for (i = 0; molecules.length > i; i++)
                    if (molecules[i].symbol == a[t].eArray[o]) {
                        u.push(molecules[i]), molecules.splice(i, 1), c = 1;
                        break
                    }
            }
            var d = [];
            for (d = a[t].molecule.split(","), n = 0; d.length > n; n++) {
                var h = new Molecule(d[n]);
                for (mArray = splitByCase(d[n]), i = 0; mArray.length > i; i++) {
                    var p = 0;
                    for (r = 0; u.length > r; r++) {
                        for (o = 0; u[r].mElements.length > o; o++)
                            if (mArray[i] == u[r].mElements[o].symbol) {
                                h.mElements.push(u[r].mElements[o]), u[r].mElements.splice(o, 1), p = 1;
                                break
                            }
                        if (1 == p) break
                    }
                }
                molecules.unshift(h), setTimeout(function() {
                    globalHeat = new Heat(h.mElements[0].x, h.mElements[0].y)
                }, 1e3), findImage(h.symbol)
            }
            return mobile && updateMoleculeLayout(), void 0
        }
    }
}

function movieEnded() {
    mediaPlaybackDidComplete(), draw(), video.style.top = "" + WIDTH + "px", video.style.left = "" + HEIGHT + "px", videoCaption.style.bottom = "" + -WIDTH + "px"
}

function addSubscript(e) {
    var t, n;
    for (n = 0; e.length > n; n++)
        if (t = e[n].match(/([0-9])/g)) {
            var i = 1 * t,
                r = "832" + i;
            i = String.fromCharCode(r), e = e.replace(t, i)
        }
    return e
}

function rgb(e, t, n) {
    var i = Math.floor;
    return "rgb(" + i(e) + "," + i(t) + "," + i(n) + ")"
}

function timer() {
    globalTime += 1, checkHintStatus()
}

function clearImage() {
    var e = 0;
    0 != reactionImage && (e = 1), reactionImage = 0, reactionText = 0, 1 == e && mediaPlaybackDidComplete(), draw()
}

function splitByCase(e) {
    var t = "" + e,
        n = [];
    n = t.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1);
    var i, r, o = 0,
        a = 0;
    for (o = 0; n.length > o; o++)
        if (i = n[o].match(/([0-9])/g))
            for (i = "" + i, r = n[o].indexOf(i), n[o] = n[o].slice(0, r), a = 0; i - 1 > a; a++) n.splice(o, 0, n[o]);
    return n
}

function mediaPlaybackDidComplete() {
    reactionVideo = 0;
    var e = 0;
    for (e = 0; currentRecipes.length > e; e++);
    if (currentRecipes.length > 0)
        if (currentRecipes.splice(0, 1), instructionLength = 0, currentRecipes.length > 0) {
            var t = new Hint(wrapText("Great! Now let's try " + addSubscript(currentRecipes[0].formula) + ".", textWidth * bubbleScale, dialogFont), 0, currentRecipes[0].formula);
            flushHintQueue(), queueHint(t), tendHintQueue()
        } else {
            var t = new Hint(wrapText("Nice work! You did all the recipes in that category!", textWidth * bubbleScale, dialogFont), 0);
            flushHintQueue(), queueHint(t), tendHintQueue()
        }
    setTimeout("checkReactions()", 7e3);
    var e = 0;
    for (e = 0; currentRecipes.length > e; e++);
}

function wrapText(e, t, n) {
    t = androidTabletScaleWH(t), pt.font = n;
    for (var i = e.split(" "), r = "", o = [], a = 0; i.length > a; a++) {
        var s = r + i[a] + " ",
            l = pt.measureText(s),
            c = l.width;
        c > t ? (o.push(r), r = i[a] + " ") : r = s
    }
    return o.push(r), o
}

function doCookingRecipes() {
    displayHint(wrapText("Let's make some molecules related to cooking!. First, try adding some oxygen.", 7 * eSize, dialogFont), 7)
}

function PeriodicTable() {
    function e(e, t, n, i, r, o) {
        return e > n && n + r > e && t > i && i + o > t
    }
    this.elements = readElements(), this.bg1 = new Image, this.bg2 = new Image, this.bg3 = new Image, this.bg4 = new Image, mobile ? (this.bg1.src = "media/ui/mStandard.jpg", this.bg2.src = "media/ui/mLewis.jpg", this.bg3.src = "media/ui/mIonic.jpg", this.bg4.src = "media/ui/mAtomic.jpg") : isAndroidTablet || isWebBrowser ? (this.bg1.src = "media/ui/tStandard.jpg", this.bg2.src = "media/ui/tLewis.jpg", this.bg3.src = "media/ui/tIonic.jpg", this.bg4.src = "media/ui/tAtomic.jpg") : (this.bg1.src = "media/ui/standard.jpg", this.bg2.src = "media/ui/lewis.jpg", this.bg3.src = "media/ui/ionic.jpg", this.bg4.src = "media/ui/atomic.jpg"), this.tableDisplay, this.drawMode = 0, this.scale = 1, this.tableWidth = 0, this.tableHeight = 0, this.offsetX = 0, this.offsetY = 0, this.dragStart = 0, this.trigger = !1, this.setDrawModeNormal = function() {
        pTable.drawMode = 0
    }, this.setDrawModeLewis = function() {
        pTable.drawMode = 1, displayHint(wrapText("Elements can bond by sharing electrons. Lewis dots show the number of electrons some of the elements have available to form bonds.", textWidth * bubbleScale, dialogFont), 0), displayHint(wrapText("Try combining elements so that the resulting molecule has eight (8) electrons - the most stable arrangement.", textWidth * bubbleScale, dialogFont), 0);
        var e = new Hint(wrapText("The transition metals, lanthanides and actinides don't always follow this rule, so they are not shown with Lewis dots.", textWidth * bubbleScale, dialogFont), 0);
        queueHint(e)
    }, this.setDrawModeIonic = function() {
        pTable.drawMode = 2, displayHint(wrapText("Elements can bond by being electrically attracted to one another, like static cling! Ions have gained or lost electrons, giving the element a positive or negative electrical charge.", textWidth * bubbleScale, dialogFont), 0);
        var e = new Hint(wrapText("Try combining elements so the total amount of positive and negative charge adds up to zero.", textWidth * bubbleScale, dialogFont), 0);
        queueHint(e)
    }, this.setDrawModeAtomic = function() {
        pTable.drawMode = 3
    }, this.draw = function() {
        switch (pTable.drawMode) {
            case 0:
                this.tableDisplay = this.bg1;
                break;
            case 1:
                this.tableDisplay = this.bg2;
                break;
            case 2:
                this.tableDisplay = this.bg3;
                break;
            case 3:
                this.tableDisplay = this.bg4;
                break;
            default:
                this.tableDisplay = this.bg1
        }
        if (mobile) {
            var e = this.tableWidth * this.scale,
                t = this.tableHeight * this.scale;
            pt.drawImage(this.tableDisplay, this.offsetX, this.offsetY, e, t)
        } else isAndroidTablet || isWebBrowser ? pt.drawImage(this.tableDisplay, androidTabletXOffset, androidTabletYOffset, 1324 * androidTabletScale, 1068 * androidTabletScale) : pt.drawImage(this.tableDisplay, 0, 0)
    }, this.changeScale = function(e) {
        var t = (-1 * this.offsetX + WIDTH / 2) * e / this.scale;
        this.offsetX = -1 * (t - WIDTH / 2);
        var n = (-1 * this.offsetY + HEIGHT / 2) * e / this.scale;
        this.offsetY = -1 * (n - HEIGHT / 2), this.scale = e, this.tableWidth * this.scale, this.tableHeight * this.scale;
        var i;
        for (i = 0; elements.length > i; i++) elements[i].x = (elements[i].pX * eSize - 8) * this.scale, elements[i].y = (elements[i].pY * eSize + 10) * this.scale, elements[i].num > 56 && 72 > elements[i].num && (elements[i].y = ((elements[i].pY - .67) * eSize + 10) * this.scale), elements[i].num > 88 && 104 > elements[i].num && (elements[i].y = ((elements[i].pY - .67) * eSize + 10) * this.scale);
        this.offsetX < WIDTH - this.tableWidth * this.scale && (this.offsetX = WIDTH - this.tableWidth * this.scale), this.offsetY < HEIGHT - this.tableHeight * this.scale && (this.offsetY = HEIGHT - this.tableHeight * this.scale), this.offsetX > 0 && (this.offsetX = 0), this.offsetY > 0 && (this.offsetY = 0)
    }, this.checkTrash = function(e, t) {
        e > tAreaX && tAreaX + tAreaW > e && t > tAreaY && tAreaY + tAreaH > t && (molecules.splice(0), this.trigger = !0)
    }, this.checkDeadZones = function(t, n) {
        for (var i = 0, r = menuList.length; r > i; i++) {
            var o = menuList[i];
            if (e(t, n, o.x, o.y, o.width, o.height)) return this.trigger = !0
        }
        return e(t, n, rAreaX, rAreaY, rAreaW, rAreaH) ? this.trigger = !0 : elementInfo.elementToDisplay && e(t, n, elementInfo.elementX, elementInfo.elementY, elementInfo.elementWidth, elementInfo.elementHeight) ? (elementInfo.elementToDisplay = 0, this.trigger = !0) : e(t, n, nav.x, nav.y, 1e4, 1e4) ? this.trigger = !0 : void 0
    }, this.handleMouseDown = function(e, t) {
        var n, i = e,
            r = t;
        for (n = 0; elements.length > n; n++)
            if (0 == elements[n].dragok) {
                if (elements[n].x + eSize * this.scale * androidTabletScale > i && i > elements[n].x && elements[n].y + eSize * this.scale * androidTabletScale > r && r > elements[n].y) {
                    var o = new Molecule(elements[n].symbol),
                        a = new Element(elements[n].x, elements[n].y, elements[n].red, elements[n].green, elements[n].blue, elements[n].ionTopRed, elements[n].ionTopGreen, elements[n].ionTopBlue, elements[n].ionBottomRed, elements[n].ionBottomBlue, elements[n].ionBottomGreen, elements[n].name, elements[n].symbol, elements[n].num, elements[n].rad, elements[n].atomRed, elements[n].atomGreen, elements[n].atomBlue);
                    mobile ? (a.x = rAreaX + .5 * eSize + -0.65 * eSize, a.y = rAreaY + .75 * rAreaH) : (a.x = e, a.y = t), o.mElements.push(a), o.mElements[0].dragok = !0, molecules.push(o), elementInfo.showElement(elements[n])
                }
            } else elements[n].x = e, elements[n].y = t
    }, this.handleMouseUp = function(e, t) {
        canX = e, canY = t;
        var n, i, r = [];
        for (n = 0; molecules.length > n; n++)
            for (i = 0; molecules[n].mElements.length > i; i++)
                if (1 == molecules[n].mElements[i].dragok)
                    if (molecules[n].mElements[i].x > rAreaX && rAreaX + rAreaW > molecules[n].mElements[i].x && molecules[n].mElements[i].y > rAreaY && rAreaY + rAreaH > molecules[n].mElements[i].y) {
                        if (molecules[n].mElements[i].dragok = !1, molecules.length > mLength) {
                            var o;
                            for (o = 0; molecules.length > o; o++) checkReactions()
                        }
                        mLength = molecules.length
                    } else r.push(n);
        for (n = 0; r.length > n; n++) molecules.splice(r[n], 1);
        r = []
    }
}

function Reaction(e) {
    this.molecule = e, this.eArray = []
}

function Molecule(e) {
    this.symbol = e, this.mElements = [];
    var t = 0,
        n = 0,
        i = 0,
        r = 30,
        o = 0,
        a = 0,
        s = 0;
    this.targetX = 0, this.targetY = 0, this.setTargetLocation = function(e, t) {
        this.targetX = e, this.targetY = t
    }, this.doSpringAndMass = function() {
        var e, l;
        for (e = 0; this.mElements.length > e; e++)
            for (l = 0; this.mElements.length > l; l++) e != l && (t = this.mElements[e].x - this.mElements[l].x + .1, n = this.mElements[e].y - this.mElements[l].y + .1, i = Math.sqrt(t * t + n * n), o = r - i, a = o * t / i, s = o * n / i, this.mElements[e].vx += .1 * a, this.mElements[e].vy += .1 * s, this.mElements[l].vx -= .1 * a, this.mElements[l].vy -= .1 * s);
        this.targetX > 0 && this.mElements.length > 0 && (t = this.mElements[0].x - this.targetX, n = this.mElements[0].y - this.targetY, i = Math.sqrt(t * t + n * n) + .01, o = 0 - i, a = o * t / i, s = o * n / i, this.mElements[0].vx += .1 * a, this.mElements[0].vy += .1 * s);
        var c, u = !1;
        for (c = 0; this.mElements.length > c; c++) 1 == this.mElements[c].dragok && (u = !0);
        for (e = 0; this.mElements.length > e; e++) this.mElements[e].x += this.mElements[e].vx, this.mElements[e].y += this.mElements[e].vy, this.mElements[e].vx *= .8, this.mElements[e].vy *= .8, 0 == this.mElements[e].dragok && 0 == u && (rAreaX > this.mElements[e].x && (this.mElements[e].x = rAreaX), rAreaY > this.mElements[e].y && (this.mElements[e].y = rAreaY), this.mElements[e].x > rAreaX + rAreaW && (this.mElements[e].x = rAreaX + rAreaW), this.mElements[e].y > rAreaY + rAreaH && (this.mElements[e].y = rAreaY + rAreaH))
    }
}

function androidTabletScaleX(e) {
    return (isAndroidTablet || isWebBrowser) && (e *= androidTabletScale, e += 150 * androidTabletScale + androidTabletXOffset), e
}

function androidTabletScaleY(e) {
    return (isAndroidTablet || isWebBrowser) && (e *= androidTabletScale, e += 150 * androidTabletScale + androidTabletYOffset), e
}

function androidTabletScaleWH(e) {
    return (isAndroidTablet || isWebBrowser) && (e *= androidTabletScale), e
}

function Element(e, t, n, i, r, o, a, s, l, c, u, d, h, p, f, m, g, y, v) {
    this.pX = e, this.pY = t, this.red = n, this.green = i, this.blue = r, this.atomRed = m, this.atomGreen = g, this.atomBlue = y, this.ionTopRed = o, this.ionTopGreen = a, this.ionTopBlue = s, this.ionBottomRed = l, this.ionBottomGreen = c, this.ionBottomBlue = u, this.name = d, this.shortName = d, this.symbol = h, this.num = p, this.rad = 1 * f, this.numLewisDots = v, mobile ? (this.x = e * eSize, this.y = t * eSize, this.num > 56 && 72 > this.num && (this.y = (t - .6) * eSize), this.num > 88 && 104 > this.num && (this.y = (t - .6) * eSize)) : (this.x = e * eSize - 6, this.y = t * eSize + 56, this.num > 56 && 72 > this.num && (this.y = t * eSize + 20), this.num > 88 && 104 > this.num && (this.y = t * eSize + 20)), (isAndroidTablet || isWebBrowser) && (this.x *= androidTabletScale, this.y *= androidTabletScale, this.x += 150 * androidTabletScale + androidTabletXOffset, this.y += 150 * androidTabletScale + androidTabletYOffset), this.vx = 0, this.vy = 0, pt.font = smallFont;
    var b = 0;
    if (pt.measureText(this.shortName).width > .92 * eSize) {
        for (; pt.measureText(this.shortName).width > .75 * eSize;) this.shortName = this.shortName.slice(0, this.shortName.length - 1), b = 1;
        b && (this.shortName += "...")
    }
}

function Message(e, t) {
    this.t = t, this.s = e
}

function learnMore() {
    this.x = 1024 - 1.25 * eSize, this.y = 14 * eSize, this.width = 2.5 * eSize, this.height = 2.5 * eSize, this.isOpen = !1, this.handleMouseDown = function(e, t) {
        this.isOpen ? this.isOpen = !1 : e > androidTabletScaleX(this.x) && androidTabletScaleX(this.x + this.width) > e && androidTabletScaleY(this.y + this.height) > t && t > androidTabletScaleY(this.y) && ("iPad" == os || isAndroidTablet ? (Ti.App.fireEvent("openHelp", {
            URL: "./help/tablet/how_to.html"
        }), this.isOpen = !0) : (window.open("./help/web/about.html"), this.isOpen = !0))
    }
}

function MenuCategory(e) {
    this.name = e, this.entries = [], this.offset = 0, this.idx = 0, mobile ? (this.menuClosed = new Image, this.menuClosed.src = "media/ui/mClosed.png", this.menuState = new Image) : (this.recipeImg = new Image, this.recipeImg.src = "media/ui/recipes.png", this.recipeOpen = new Image, this.recipeOpen.src = "media/ui/recipes_open.png"), this.isActive = !1, this.x = 0, this.y = 0, this.width = .75 * eSize, this.height = 5 * eSize, mobile && (this.width = WIDTH / 10, this.height = WIDTH / 10.5), this.setPosition = function(e, t) {
        this.x = e, this.y = t;
        var n;
        if (mobile) {
            var i = WIDTH / -15;
            for (n = 0; this.entries.length > n; n++) {
                var r = -1 * (WIDTH / 2.25);
                r *= this.entries[n].x, 0 != this.entries[n].y ? i = WIDTH / -15 + this.entries[n].height * this.entries[n].y : i += this.entries[n].height, this.entries[n].x = r + WIDTH - 3.5 * this.width, this.entries[n].y = i + this.height
            }
        } else if (isAndroidTablet || isWebBrowser) {
            var i = t - .325 * eSize;
            for (n = 0; this.entries.length > n; n++) i += this.entries[n].height, this.entries[n].x = e + 5, this.entries[n].y = i
        } else {
            var i = this.height + 3.9 * eSize;
            for (n = 0; this.entries.length > n; n++) i += this.entries[n].height, this.entries[n].x = e + 5, this.entries[n].y = i
        }
    }, this.addEntry = function(e) {
        this.entries.push(e)
    }, this.handleMouseDown = function(e, t) {
        var n;
        if (this.isActive) {
            for (n = 0; this.entries.length > n; n++) this.entries[n].handleMouseDown(e, t);
            this.isActive = !1, this.offset = 0
        } else if (mobile) {
            if (instructionLength - 5 + this.width - pTable.offsetX > e && e > 4 - pTable.offsetX && t > 3.25 * dialogFontHeight - pTable.offsetY + 10 && 6.5 * dialogFontHeight + this.height - pTable.offsetY + 10 > t && clearRecipes(), e > this.x - pTable.offsetX && this.x + this.width - pTable.offsetX > e && this.y + this.height - pTable.offsetY > t && t > this.y - pTable.offsetY && "Menu" == this.name)
                for (this.isActive = !this.isActive, n = 0; this.entries.length > n; n++) this.entries[n].offset = 0
        } else e > 20 && instructionLength + 30 > e && t > 2.5 * dialogFontHeight && 3.75 * dialogFontHeight > t && clearRecipes(), e > this.x && this.x + this.width > e && this.y + this.height > t && t > this.y && (this.isActive = !0)
    }, this.menuOptionWasSelected = function(e) {
        this.isActive = !1, (0 == e || 1 == e) && (this.idx = e)
    }, this.draw = function() {
        1 == this.isActive ? (pt.font = mediumFont, mobile ? ("Menu" == this.name && 0 == this.offset && (this.menuState.src = 0 == this.idx ? "media/ui/mOpen1.png" : 1 == this.idx ? "media/ui/mOpen2.png" : "media/ui/mOpen1.png", pt.drawImage(this.menuState, WIDTH / 1.8, 2, WIDTH / 1.8, WIDTH / 1.5)), "Recipes" == this.name && (this.menuState.src = "media/ui/mOpen3.png", pt.drawImage(this.menuState, WIDTH / 12, 2, 11 * (WIDTH / 12), WIDTH / 1.5))) : pt.drawImage(this.recipeOpen, this.x, this.y)) : (pt.font = mediumFont, mobile ? "Menu" == this.name && 0 == this.offset && pt.drawImage(this.menuClosed, this.x, this.y, this.width, this.height) : pt.drawImage(this.recipeImg, this.x, this.y))
    }
}

function MenuEntry(e, t, n, i, r, o, a, s) {
    this.name = t, this.x = 1 * n, this.y = 1 * i, this.cat = r, this.r = o, this.g = a, this.b = s, this.width = 2.5 * eSize, this.id = e, this.height = "iPad" == os ? eSize / 1.6 : eSize / 1.6, this.parent = 0, this.callback = 0, mobile && (this.width = WIDTH / 3, this.height = WIDTH / 11.25), this.setParent = function(e) {
        this.parent = e
    }, this.setCallback = function(e) {
        this.callback = e
    }, this.handleMouseDown = function(e, t) {
        mobile ? e > this.x - pTable.offsetX && this.x + this.width - pTable.offsetX > e && this.y + this.height - pTable.offsetY > t && t > this.y - pTable.offsetY && (this.parent.menuOptionWasSelected(this.id), this.parent.isActive = !1, 0 != this.callback && this.callback()) : e > this.x && this.x + this.width > e && this.y + this.height > t && t > this.y && (this.parent.menuOptionWasSelected(this.id), this.parent.isActive = !1, 0 != this.callback && this.callback())
    }
}

function clearRecipes() {
    currentRecipes = [], instructionLength = 0, highlightedElements && highlightedElements.splice(0)
}

function addStandard() {
    pTable.setDrawModeNormal()
}

function addLewis() {
    pTable.setDrawModeLewis()
}

function addAtomic() {
    pTable.setDrawModeAtomic()
}

function addIonic() {
    pTable.setDrawModeIonic()
}

function addLearn() {
    Ti.App.fireEvent("openHelp", {
        URL: "./help/mobile/how_to.html"
    }), learn.isOpen = !0
}

function addFeatured() {
    var e;
    for (e = 0; menuList.length > e; e++) "Menu" == menuList[e].name ? (menuList[e].offset = 100, menuList[e].isActive = !1) : menuList[e].isActive = !0
}

function addRecipesMotherNature() {
    var e;
    for (e = 0; menuList.length > e; e++) menuList[e].offset = 0;
    flushHintQueue(), displayHint(wrapText("Reactions help us understand and protect the environment around us.", textWidth * bubbleScale, dialogFont), 0);
    var t = new Hint(wrapText("First, lets make a molecule with the formula " + addSubscript("O3."), textWidth * bubbleScale, dialogFont), 0, "O3");
    queueHint(t), currentRecipes = [], instructionLength = 0;
    var t = new Recipe("O3", "", "Ozone is created when lightning strikes.");
    currentRecipes.push(t);
    var t = new Recipe("CuI", "", "Planes seed clouds with copper iodide to cause rain.");
    currentRecipes.push(t);
    var t = new Recipe("H2CO3", "", "Carbonic acid has lead to world-wide acidification of Earth's oceans and the 'bleaching' of coral reefs.");
    currentRecipes.push(t);
    var t = new Recipe("FeCl2", "", "Water treatment plants use iron chloride to collect suspended particles");
    currentRecipes.push(t);
    var t = new Recipe("AlN", "", "Aluminium nitride LEDs emit UV light and are used to purify water.");
    currentRecipes.push(t)
}

function addRecipesVroom() {
    var e;
    for (e = 0; menuList.length > e; e++) menuList[e].offset = 0;
    flushHintQueue(), displayHint(wrapText("Start your Engines! These reactions are all related to cars.", textWidth * bubbleScale, dialogFont), 0);
    var t = new Hint(wrapText("First, lets make a molecule with the formula " + addSubscript("NO2."), textWidth * bubbleScale, dialogFont), 0, "NO2");
    queueHint(t), currentRecipes = [], instructionLength = 0;
    var t = new Recipe("NO2", "", "Cars release nitrogen dioxide during the combustion reaction.");
    currentRecipes.push(t);
    var t = new Recipe("MoS2", "", "Molybdenum disulfide is used as a dry lubricant in two-stroke engines.");
    currentRecipes.push(t);
    var t = new Recipe("CrO3", "", "Hot rods get their cool look from chromium trioxide, or chrome plating.");
    currentRecipes.push(t);
    var t = new Recipe("FeO", "", "Rust forms when iron reacts with oxygen in the air to form iron oxide.");
    currentRecipes.push(t);
    var t = new Recipe("NaN3", "", "Sodium azide releases nitrogen gas, making airbags expand.");
    currentRecipes.push(t)
}

function addRecipesTechnical() {
    var e;
    for (e = 0; menuList.length > e; e++) menuList[e].offset = 0;
    flushHintQueue(), displayHint(wrapText("Devices and electronics rely on these compounds.", textWidth * bubbleScale, dialogFont), 0);
    var t = new Hint(wrapText("First, lets make a molecule with the formula " + addSubscript("Nd2O3."), textWidth * bubbleScale, dialogFont), 0, "Nd2O3");
    queueHint(t), currentRecipes = [], instructionLength = 0;
    var t = new Recipe("Nd2O3", "", "Neodymium oxide is used to make lasers.");
    currentRecipes.push(t);
    var t = new Recipe("Te3O2", "", "Tellurium suboxide is used to coat rewritable CD's, DVD's, and blue-ray discs.");
    currentRecipes.push(t);
    var t = new Recipe("PmCl3", "", "Promethium chloride is safe to use on glow-in-the-dark watches and clocks.");
    currentRecipes.push(t);
    var t = new Recipe("GeO2", "", "Germanium dioxide is found in the core of fiber optic cables.");
    currentRecipes.push(t);
    var t = new Recipe("VO2", "", "Vanadium oxide behaves like a semiconductor, and is widely used in electronics.");
    currentRecipes.push(t)
}

function addRecipesHouse() {
    var e;
    for (e = 0; menuList.length > e; e++) menuList[e].offset = 0;
    flushHintQueue(), displayHint(wrapText("Discover the chemistry inside the things you use every day.", textWidth * bubbleScale, dialogFont), 0);
    var t = new Hint(wrapText("First, lets make a molecule with the formula " + addSubscript("AmCl3."), textWidth * bubbleScale, dialogFont), 0, "AmCl3");
    queueHint(t), currentRecipes = [], instructionLength = 0;
    var t = new Recipe("AmCl3", "", "Americium trichloride is used in high-precision smoke detectors.");
    currentRecipes.push(t);
    var t = new Recipe("CCl4", "", "Carbon tetrachloride is a toxic chemical once used in fire extinguishers.");
    currentRecipes.push(t);
    var t = new Recipe("ClO2", "", "Chlorine dioxide bleaches wood pulp to make paper white.");
    currentRecipes.push(t);
    var t = new Recipe("Na2SO4", "", "Sodium sulfate is a filler for laundry detergents.");
    currentRecipes.push(t);
    var t = new Recipe("MoSi2", "", "Molybdenum disilicide is used in the heating elements of electric stoves.");
    currentRecipes.push(t)
}

function addRecipesPersonal() {
    var e;
    for (e = 0; menuList.length > e; e++) menuList[e].offset = 0;
    flushHintQueue(), displayHint(wrapText("Stay looking (and smelling!) your best with these reactions. You look marvelous!", textWidth * bubbleScale, dialogFont), 0);
    var t = new Hint(wrapText("First, lets make a molecule with the formula " + addSubscript("SeS2."), textWidth * bubbleScale, dialogFont), 0, "SeS2");
    queueHint(t), currentRecipes = [], instructionLength = 0;
    var t = new Recipe("SeS2", "", "Selenium disulfide is the active ingredient in some dandruff shampoos.");
    currentRecipes.push(t);
    var t = new Recipe("NaF", "", "Sodium fluoride prevents cavities.Say ahhhh!");
    currentRecipes.push(t);
    var t = new Recipe("NaOH", "", "Sodium hydroxide is lye, which is used to make soaps.");
    currentRecipes.push(t);
    var t = new Recipe("MgO", "", "Magnesium oxide crystals are epsom or bath salts.");
    currentRecipes.push(t);
    var t = new Recipe("ZrOCl", "", "No sweat! Some antiperspirants contain zirconyl hydroxy chloride.");
    currentRecipes.push(t)
}

function addRecipesAttractive() {
    pTable.setDrawModeIonic(), flushHintQueue(), displayHint(wrapText("Ionic bonds form when elements that have slight electrical charges, called ions, are attracted to one another.  ", textWidth * bubbleScale, dialogFont), 0), displayHint(wrapText("Compounds with ionic bonds tend to conduct electricity when they are melted or in a solution.  ", textWidth * bubbleScale, dialogFont), 0), displayHint(wrapText(" The slight charge of the ions also means these compounds dissolve easily in water. ", textWidth * bubbleScale, dialogFont), 0);
    var e = new Hint(wrapText("First, lets make a molecule with the formula " + addSubscript("BaTiO3."), textWidth * bubbleScale, dialogFont), 0, "BaTiO3");
    queueHint(e), currentRecipes = [], instructionLength = 0;
    var e = new Recipe("BaTiO3", "", "Scientists are studying barium titanate for use in electric car batteries.");
    currentRecipes.push(e);
    var e = new Recipe("CaCl2O2", "", "Calcium hypochlorite is used to disinfect water in swimming pools.");
    currentRecipes.push(e);
    var e = new Recipe("LiI", "", "Have a heart: Lithium iodide can be found in long-lasting batteries for pacemakers.");
    currentRecipes.push(e);
    var e = new Recipe("MgBr2", "", "Magnesium bromide is a sleep medication. Zzzzzzz!");
    currentRecipes.push(e);
    var e = new Recipe("NH4Cl", "", "Ammonium chloride is a common ingredient in shampoo.");
    currentRecipes.push(e)
}

function addRecipesDots() {
    pTable.setDrawModeLewis(), flushHintQueue(), displayHint(wrapText("Lewis dots show the number of electrons an element can share to form covalent bonds with other elements.", textWidth * bubbleScale, dialogFont), 0), displayHint(wrapText("Molecules that share electrons are very strongly bonded  so they tend to melt at lower temperatures and can be liquid, solids and gases.", textWidth * bubbleScale, dialogFont), 0), displayHint(wrapText(" Covalent molecules are not usually water soluble.", textWidth * bubbleScale, dialogFont), 0);
    var e = new Hint(wrapText("First, lets make a molecule with the formula " + addSubscript("NCl3."), textWidth * bubbleScale, dialogFont), 0, "NCl3");
    queueHint(e), currentRecipes = [], instructionLength = 0;
    var e = new Recipe("NCl3", "", "No peeing in the pool! Nitrogen trichloride can form when chlorine from pool water reacts with urine.");
    currentRecipes.push(e);
    var e = new Recipe("CBr4", "", "Tetrabromomethane can dissolve grease, wax and oils, a useful property for cleaning our fine feathered friends after an oil spill!");
    currentRecipes.push(e);
    var e = new Recipe("TiB2", "", "Titanium boride is a very hard metal used in tanks.");
    currentRecipes.push(e);
    var e = new Recipe("SCl2", "", "Sulfur dichloride is a cherry-red liquid.");
    currentRecipes.push(e);
    var e = new Recipe("SF6", "", "Sulfur hexafluoride is five times denser than air. Inhale it and your voice will deepen!");
    currentRecipes.push(e)
}

function updateMoleculeLayout() {
    if (1 == molecules.length) {
        var e = 1.2 * rAreaX + .45 * rAreaW,
            t = rAreaY + .75 * rAreaH;
        molecules[0].setTargetLocation(e, t)
    } else {
        var n;
        for (n = 0; molecules.length > n; n++) {
            var i = molecules.length - 1;
            1 > i && (i = 1e3);
            var e = 1.2 * rAreaX + rAreaW * (.65 * n / i),
                t = rAreaY + .75 * rAreaH;
            molecules[molecules.length - 1 - n].setTargetLocation(e, t)
        }
    }
}

function Recipe(e, t, n) {
    this.formula = e, this.name = t, this.caption = n, this.reaction = findReaction(e)
}

function Navigator(e, t, n, i) {
    this.mapImage = new Image;
    var r = "media/ui/ptmap.png";
    this.mapImage.src = r, this.mapImageW = WIDTH / 2.6, this.mapImageH = WIDTH / 5.56 - 3, this.x = e, this.y = t, this.rectW = n * .8 * this.mapImageW / (19 * eSize), this.rectH = i * this.mapImageH / (12 * eSize), this.trigger = !1, this.rectX = .25 * this.mapImageW, this.rectY = 0, this.updateOffset = function(e, t) {
        this.rectX = -1 * e * .8 * this.mapImageW / pTable.tableWidth / pTable.scale + .25 * this.mapImageW, this.rectY = -1 * t * this.mapImageH / pTable.tableHeight / pTable.scale, this.rectW = n * .8 * this.mapImageW / (pTable.tableWidth * pTable.scale), this.rectH = i * this.mapImageH / (pTable.tableHeight * pTable.scale)
    }, this.draw = function() {
        1 == this.mapImage.complete && this.mapImage.width > 0 && pt.drawImage(this.mapImage, this.x, this.y, this.mapImageW, this.mapImageH), pt.strokeStyle = "white", pt.strokeRect(this.rectX + this.x, this.rectY + this.y, this.rectW, this.rectH)
    }, this.handleMouseDown = function(e, t) {
        if (this.trigger = !1, e > this.x && this.x + this.mapImageH / 2 > e && t > this.y & this.y + this.mapImageH / 2 > t && (this.trigger = !0, 1 > pTable.scale)) {
            var n = pTable.scale;
            n += .1, pTable.changeScale(n)
        }
        if (e > this.x && this.x + this.mapImageH / 2 > e && t > this.y + this.mapImageH / 2 & this.y + this.mapImageH > t && (this.trigger = !0, pTable.scale > Math.max(WIDTH / pTable.tableWidth, HEIGHT / pTable.tableHeight))) {
            var n = pTable.scale;
            n -= .1, Math.max(WIDTH / pTable.tableWidth, HEIGHT / pTable.tableHeight) > n && (n = Math.max(WIDTH / pTable.tableWidth, HEIGHT / pTable.tableHeight)), pTable.changeScale(n)
        }
        mobile && this.updateOffset(pTable.offsetX, pTable.offsetY)
    }
}

function clearElementInfoBox() {
    elementInfo.dontShowElement()
}

function ElementInfoBox(e, t, n, i) {
    this.elementX = e, this.elementY = t, this.elementSize = n, this.infoWidth = i, this.elementWidth = WIDTH, this.elementHeight = HEIGHT / 3, this.elementToDisplay = 0, this.infoText = [], this.elementImage = new Image, this.clearAlarm = 0, this.highlightImg = new Image, this.highlightImg.src = "media/ui/highlight.png", this.dontShowElement = function() {
        this.elementToDisplay = 0, clearTimeout(this.clearAlarm), this.clearAlarm = 0
    }, this.showElement = function(e) {
        this.elementToDisplay = e, this.infoText = [], this.elementImage = new Image, this.clearAlarm && clearTimeout(this.clearAlarm), mobile && (this.clearAlarm = setTimeout(clearElementInfoBox, 5e3))
    }, this.draw = function() {
        var e;
        if (highlightedElements && highlightedElements.length)
            for (e = 0; 1 > e; e++) {
                var t, n, i, r;
                if (mobile) pt.translate(pTable.offsetX, pTable.offsetY, 0), t = highlightedElements[e].x - pTable.scale * (eSize / 2 + 3), n = highlightedElements[e].y - pTable.scale * (eSize / 2 + 2), i = 2 * pTable.scale * (eSize + 4), r = 2 * pTable.scale * (eSize + 3);
                else {
                    var o = 9.5,
                        a = 7;
                    isAndroidTablet || isWebBrowser ? (t = highlightedElements[e].x - (eSize / 2 + o) * androidTabletScale, n = highlightedElements[e].y - (eSize / 2 + a) * androidTabletScale, i = 118 * androidTabletScale, r = 117 * androidTabletScale) : (t = highlightedElements[e].x - eSize / 2 - o, n = highlightedElements[e].y - eSize / 2 - a, i = 118, r = 117)
                }
                pt.drawImage(this.highlightImg, t, n, i, r)
            }
        if (this.elementToDisplay) {
            var s = "media/elements/" + this.elementToDisplay.num + ".jpg";
            if (pt.setTransform(1, 0, 0, 1, 0, 0), this.elementImage.src != s) {
                this.elementImage = new Image, this.elementImage.src = s, mobile ? (pt.globalAlpha = 1, pt.fillStyle = "black", pt.strokeStyle = "white", pt.lineWidth = 3, pt.globalAlpha = .85, pt.fillRect(this.elementX, this.elementY, WIDTH, HEIGHT / 3)) : (pt.strokeStyle = "white", pt.lineWidth = 3, pt.globalAlpha = .25, pt.strokeRect(androidTabletScaleX(this.elementX - 1), androidTabletScaleY(this.elementY - 1), androidTabletScaleWH(1.25 * this.infoWidth + 2), androidTabletScaleWH(2 * this.elementSize + 2)), pt.lineWidth = 1, pt.globalAlpha = 1, pt.strokeRect(androidTabletScaleX(this.elementX), androidTabletScaleY(this.elementY), androidTabletScaleWH(1.25 * this.infoWidth), androidTabletScaleWH(2 * this.elementSize))), pt.fillStyle = "white", pt.globalAlpha = 1;
                var l;
                if (mobile ? (pt.font = largeFont, pt.drawImage(this.elementImage, this.elementX + 5, this.elementY + (HEIGHT - this.elementY - this.elementSize) / 2, this.elementSize, this.elementSize), l = this.elementY + this.elementSize / 3) : (pt.font = mediumFont, pt.drawImage(this.elementImage, androidTabletScaleX(this.elementX + 10), androidTabletScaleY(this.elementY + this.elementSize / 2), androidTabletScaleWH(this.elementSize), androidTabletScaleWH(this.elementSize)), l = this.elementY + this.elementSize / 2 + 20), 0 == this.infoText.length) {
                    var c = findInfo(this.elementToDisplay.num);
                    this.infoText = wrapText(c, this.infoWidth - 20, pt.Font)
                } else
                    for (e = 0; this.infoText.length > e; e++) pt.fillStyle = "white", pt.fillText(this.infoText[e], androidTabletScaleX(this.elementX + this.elementSize + 25), androidTabletScaleY(l)), l += mobile ? 1.75 * largeFontHeight : 1.15 * dialogFontHeight
            }
        }
    }
}

function InfoBox() {
    this.bubbleLead = new Image, this.bubbleMain = new Image, this.bubbleLead.src = "media/ui/lead_bubbles.png", this.bubbleMain.src = "media/ui/main_bubble.png", mobile && (this.bubbleMain.src = "media/ui/bubbles.png");
    var e = eSize;
    mobile && (e = HEIGHT / 9.5), this.xBubbles = [3.4, 2, 1.4, 2.4, 2, 1.5, 1.9, 1.6, 1.6, 1.3, 6], this.yBubbles = [2.4, 1.9, 2.6, 2.1, 3, 1.8, 2.4, 2, 2.2, 1.8, 2.8], this.bubbleDelays = [7, 5, 6, 3, 0, 2, 4, 1, 9, 10, 11], this.maxSizes = [100 * e / 50, 30 * e / 50, 70 * e / 50, 100 * e / 50, 20 * e / 50, 60 * e / 50, 70 * e / 50, 20 * e / 50, 80 * e / 50, 20 * e / 50, 18 * e / 50], this.currentSizes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], this.count = 0, this.movement = 0, this.message = "", this.xOffset = 0, this.yOffset = 0, this.numDrawn = 0, this.waitingForMediaPlaybackToFinish = 0, this.yStride = WIDTH / 37.5, mobile || (this.yStride /= 1.5), this.isOpen = !1, this.open = function(e) {
        this.message = e, this.count = 0, this.movement = 1, this.isOpen = !0, this.yOffset = this.message.length * this.yStride * -.5, this.xOffsets = [];
        var t = 0;
        pt.font = dialogFont;
        var n;
        for (n = 0; this.message.length > n; n++) {
            var i = pt.measureText(this.message[n]).width;
            this.xOffsets[n] = i / -2, i > t && (t = i)
        }
        this.xOffset = t / -2, setTimeout(function() {
            helpWindow.closeForMessage(e)
        }, 5e3)
    }, this.closeForMessage = function(e) {
        this.isOpen && this.message == e && (helpWindow.close(), tendHintQueue())
    }, this.close = function() {
        this.count = 0, this.movement = -1, this.isOpen = !1, 1 == this.waitingForMediaPlaybackToFinish && (this.waitingForMediaPlaybackToFinish = 0, mediaPlaybackDidComplete())
    }, this.draw = function() {
        var e;
        if (this.count += 1, 1 == this.isOpen) {
            pt.fillStyle = rgb(230, 230, 230), pt.font = dialogFont;
            var t = this.yOffset + HEIGHT / 2.2,
                n = 739,
                i = 419,
                r = i / n,
                o = .766 * WIDTH,
                a = o * r,
                s = (WIDTH - o) / 2,
                l = (HEIGHT - a) / 2 + (mobile ? 10 : 0);
            for (pt.drawImage(this.bubbleMain, s, l, o, a), e = 0; this.message.length > e; e++) {
                var c = WIDTH / 2 + this.xOffsets[e];
                pt.fillText(this.message[e], c, t), t += isAndroidTablet ? androidTabletScaleY(this.yStride) : this.yStride
            }
        }
    }
}

function Heat(e, t) {
    this.x = e, this.y = t, this.rays = [];
    var n = 0;
    for (this.numrays = 40, n = 0; this.numrays > n; n++) {
        var i = new HeatRay;
        i.start(Math.random()), this.rays.push(i)
    }
    this.isFinished = function() {
        var e;
        for (e = 0; this.numrays > e; e++)
            if (0 == this.rays[e].isFinished()) return !1;
        return !0
    }, this.draw = function() {
        var n = 0;
        pt.strokeStyle = "#FFB219", pt.globalAlpha = .7, pt.lineCap = "round", pt.lineWidth = 3, pt.translate(e, t);
        var i;
        for (i = 0; 360 > i; i += 360 / this.numrays) pt.rotate(2 / this.numrays * Math.PI), this.rays[n].draw(), n += 1;
        pt.setTransform(1, 0, 0, 1, 0, 0), pt.lineWidth = 1, pt.globalAlpha = 1
    }
}

function HeatRay() {
    this.startTime = 0, this.speed = 455, this.magicNumber = 15, this.frameIndex = 0, this.end = 0, this.isFinished = function() {
        return this.frameIndex > this.end ? !0 : !1
    }, this.start = function(e) {
        this.frameIndex = 0, this.startTime = 30 * e, this.end = this.startTime + this.magicNumber
    }, this.draw = function() {
        if (!this.isFinished()) {
            this.frameIndex += 1;
            var e;
            for (pt.beginPath(), e = Math.max(0, this.frameIndex - this.startTime), pt.moveTo(20 + 9 * e, 5 * Math.sin(e / 2)), e += 1; 10 + this.frameIndex - this.startTime > e; e++) pt.lineTo(20 + 9 * e, 5 * Math.sin(e / 2));
            pt.stroke()
        }
    }
}
var FPS = 30,
    browser, os, video, videoCaption, canvas, pt, largeFont, dialogFontHeight, largeFontHeight, mediumFont, smallFont, instructionLength = 0,
    WIDTH, HEIGHT, eSize, rAreaX, rAreaY, rAreaW, rAreaH, tAreaX, tAreaY, tAreaW, tAreaH, dialogFont, textWidth, maximumMoleculesInLab = 7,
    canX = 0,
    canY = 0,
    mouseIsDown = 0,
    reactions = [],
    molecules = [],
    hints = [],
    menuList = [],
    pTable = 0,
    reactionImg0, reactionImg1, currentRecipes = [],
    reactionImage = 0,
    reactionVideo = 0,
    reactionText = 0,
    globalHeat = 0,
    mLength = 0,
    globalTime = 0,
    menuSelect = 0,
    highlightedElements = [],
    pX = 0,
    pY = 0,
    cX = 0,
    cY = 0,
    nav = 0,
    missingIngredient = 0,
    hammer, learn, mobile = !1,
    helpWindow, elementInfo = 0,
    isWeb = 0,
    bubbleScale = 8,
    isAndroidTablet = !1,
    isWebBrowser = !1,
    androidWidth = 1024,
    androidHeight = 768,
    androidTabletScale = 1,
    androidTabletXOffset = 0,
    androidTabletYOffset = 0;
window.Ti && Ti.App.addEventListener("mediaPlaybackDidComplete", mediaPlaybackDidComplete);