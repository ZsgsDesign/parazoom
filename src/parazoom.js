!function(jQuery) {
    jQuery.fn.parazoom = function(options) {
        function is_touch() {
            try {
                return document.createEvent("TouchEvent"),
                !0
            } catch (t) {
                return !1
            }
        }
        function is_mobile() {
            return !!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)
        }
        var pluginEnable;
        if (1 == is_mobile() && 1 == is_touch() && (pluginEnable = !1),
        1 == is_mobile() && 0 == is_touch() && (pluginEnable = !1),
        0 == is_mobile() && 1 == is_touch() && (pluginEnable = !0),
        0 == is_mobile() && 0 == is_touch() && (pluginEnable = !0),
        pluginEnable) {
            var dataHeight, dataWidth, dataBackgroundImage, dataPosition, dataFinalWidth, dataImg, dataLargeImg, dataFirstImg, dataFirstLink, dataScale, dataOverflow, dataTransitionTime, dataTransitionTimeLeave, dataOpacity, dataOpacityHover, dataCursor, dataCustomCursorIcon = "", dataCustomCursorSize, dataTilt, dataTiltXamount, dataTiltYamount, dataPosX, dataPosY, dataPercentX, dataPercentY, dataLink, dataText, dataTextContent = "", dataTextClass, dataTextPosition, dataTextAlignment, dataTextOpacity, dataTextOpacityHover, dataRandom = "", dataCSSZIndex, dataCSSPosition, dataCSSTop, dataCSSRight, dataCSSBottom, dataCSSLeft, textXParallax, textYParallax, result, targetID, dataIndex, dataCallback, mouseCoordinates, i = 1, numberOfNodes = this.length, iNode = 1, mouseMoveThreshold = 20, mouseMove = mouseMoveThreshold, mouseMoveTransition = "400ms", quikRandom = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", imagesLoaded = [], defaults = {
                scale: "1.2",
                transitionTime: "0.3s",
                transitionTimeLeave: "1s",
                opacity: "1",
                opacityHover: "1",
                overflow: "hidden",
                cursor: "default",
                customCursorIcon: "",
                customCursorSize: "20px",
                tilt: !1,
                tiltXamount: 10,
                tiltYamount: 10,
                text: !1,
                textClass: !1,
                textPosition: "middle",
                textAlignment: "center",
                textXParallax: 10,
                textYParallax: 10,
                textOpacity: 0,
                textOpacityHover: 1
            };
            void 0 !== options && (void 0 !== options.scale && (defaults.scale = options.scale),
            void 0 !== options.transitionTime && (defaults.transitionTime = options.transitionTime),
            void 0 !== options.transitionTimeLeave && (defaults.transitionTimeLeave = options.transitionTimeLeave),
            void 0 !== options.opacity && (defaults.opacity = options.opacity),
            void 0 !== options.opacityHover && (defaults.opacityHover = options.opacityHover),
            void 0 !== options.overflow && (defaults.overflow = options.overflow),
            void 0 !== options.cursor && (defaults.cursor = options.cursor),
            void 0 !== options.customCursorIcon && (defaults.customCursorIcon = options.customCursorIcon),
            void 0 !== options.customCursorSize && (defaults.customCursorSize = options.customCursorSize),
            void 0 !== options.tilt && (defaults.tilt = options.tilt),
            void 0 !== options.tiltXamount && (defaults.tiltXamount = options.tiltXamount),
            void 0 !== options.tiltYamount && (defaults.tiltYamount = options.tiltYamount),
            void 0 !== options.text && (defaults.text = options.text),
            void 0 !== options.textClass && (defaults.textClass = options.textClass),
            void 0 !== options.textPosition && (defaults.textPosition = options.textPosition),
            void 0 !== options.textAlignment && (defaults.textAlignment = options.textAlignment),
            void 0 !== options.textXParallax && (defaults.textXParallax = options.textXParallax),
            void 0 !== options.textYParallax && (defaults.textYParallax = options.textYParallax),
            void 0 !== options.textOpacity && (defaults.textOpacity = options.textOpacity),
            void 0 !== options.textOpacityHover && (defaults.textOpacityHover = options.textOpacityHover),
            void 0 !== options.onClick && (defaults.onClick = options.onClick),
            void 0 !== options.onHover && (defaults.onHover = options.onHover),
            void 0 !== options.onMove && (defaults.onMove = options.onMove),
            void 0 !== options.onLeave && (defaults.onLeave = options.onLeave));
            var style = "<style>.prz-wrapper{display:inline-block}.prz-container{position:absolute;pointer-events:none;perspective:150vh;}.prz-overlay{position:absolute;width:100%;height:100%;top:0;left:0;background-position:center;background-size:cover;background-repeat:no-repeat;will-change:transform}.prz-text{position:absolute;display:table;width:100%;height:100%;top:0;left:0;will-change:transform,opacity;transition-property:opacity,transform;}.prz-text>div{display:table-cell;}.prz-custom-cursor{display:none;position:absolute;z-index:auto;transform:translateX(-50%) translateY(-50%);opacity:0;transition-property:opacity,background-color;transition-duration:300ms;background-size:contain;background-position:center;}.prz-container.hover>.prz-custom-cursor{display:block}.prz-container.hover.active>.prz-custom-cursor,.prz-container.loading>.prz-custom-cursor{opacity:1}</style>";
            jQuery("head").append(style);
            var jQparazoomNodes = jQuery(this)
              , parazoomNodesLength = jQparazoomNodes.length;
            jQuery(this).each(function() {
                if (void 0 !== jQuery(this).attr("src") ? (dataImg = jQuery(this).attr("src"),
                dataTextContent = jQuery(this).attr("alt")) : dataTextContent = jQuery(this).text(),
                jQuery(this).wrap('<div class="prz-wrapper"></div>'),
                void 0 !== jQuery(this).attr("data-prz-img") && (dataImg = jQuery(this).attr("data-prz-img")),
                void 0 !== dataImg && "" !== dataImg) {
                    -1 == imagesLoaded.indexOf(dataImg) && imagesLoaded.push(dataImg),
                    jQparazoomNodes.index(this) + 1 == parazoomNodesLength && imagesLoaded.forEach(function(t) {
                        jQuery('<img src="' + t + '">').on("load", function() {
                            var a = jQuery('.prz-set[src="' + t + '"]')
                              , e = jQuery('.prz-container[data-prz-img="' + t + '"]');
                            a.each(function() {
                                jQuery(this).css({
                                    opacity: 0
                                }),
                                e.css({
                                    display: "inline-block",
                                    height: jQuery(this).height() + "px",
                                    width: jQuery(this).width() + "px"
                                }).find(".prz-overlay").css({
                                    "background-image": 'url("' + t + '")'
                                })
                            })
                        })
                    }),
                    void 0 === (dataTransitionTime = jQuery(this).attr("data-prz-transition-time")) && (dataTransitionTime = defaults.transitionTime),
                    void 0 === (dataOpacity = jQuery(this).attr("data-prz-opacity")) && (dataOpacity = defaults.opacity),
                    void 0 === (dataOverflow = jQuery(this).attr("data-prz-overflow")) && (dataOverflow = defaults.overflow),
                    void 0 === (dataCursor = jQuery(this).attr("data-prz-cursor")) && (dataCursor = defaults.cursor),
                    void 0 === (dataCustomCursorIcon = jQuery(this).attr("data-prz-custom-cursor-icon")) && (dataCustomCursorIcon = defaults.customCursorIcon),
                    "" != dataCustomCursorIcon && (dataCursor = "none"),
                    void 0 === (dataCustomCursorSize = jQuery(this).attr("data-prz-custom-cursor-size")) && (dataCustomCursorSize = defaults.customCursorSize),
                    void 0 !== jQuery(this).attr("data-prz-text-content") && (dataTextContent = jQuery(this).attr("data-prz-text-content")),
                    void 0 === (dataTextPosition = jQuery(this).attr("data-prz-text-position")) && (dataTextPosition = defaults.textPosition),
                    void 0 === (dataTextAlignment = jQuery(this).attr("data-prz-text-alignment")) && (dataTextAlignment = defaults.textAlignment),
                    void 0 === (dataTextClass = jQuery(this).attr("data-prz-text-class")) && (dataTextClass = defaults.textClass),
                    void 0 === (dataTextOpacity = jQuery(this).attr("data-prz-text-opacity")) && (dataTextOpacity = defaults.textOpacity),
                    dataIndex = i;
                    for (var t = 0; t < 5; t++)
                        dataIndex += quikRandom.charAt(Math.floor(Math.random() * quikRandom.length)) + i;
                    jQuery(this).attr("data-prz-id", dataIndex),
                    i++,
                    dataHeight = jQuery(this).height(),
                    dataWidth = jQuery(this).width(),
                    dataPosition = jQuery(this).offset(),
                    jQuery(this).before('<div class="prz-container" data-prz-img="' + dataImg + '" data-prz-id="' + dataIndex + '" style="display:none;width:' + dataWidth + "px; height:" + dataHeight + "px; overflow:" + dataOverflow + '"><div class="prz-overlay" data-prz-id="' + dataIndex + '" style="opacity:' + dataOpacity + "; transition-property:transform,opacity; transition-duration: " + dataTransitionTime + '"></div><div class="prz-text" data-prz-id="' + dataIndex + '" style="transition-duration: ' + dataTransitionTime + "; text-align:" + dataTextAlignment + "; opacity:" + dataTextOpacity + '"><div class="' + dataTextClass + '" style="vertical-align:' + dataTextPosition + '">' + dataTextContent + '</div></div><div class="prz-custom-cursor" style="background-image:url(' + dataCustomCursorIcon + ");width:" + dataCustomCursorSize + ";height:" + dataCustomCursorSize + '"></div></div>').css({
                        backgroundColor: "transparent",
                        backgroundImage: "none",
                        cursor: dataCursor
                    }).addClass("prz-set"),
                    dataCSSPosition = jQuery(this).css("position"),
                    dataCSSTop = jQuery(this).css("top"),
                    dataCSSRight = jQuery(this).css("right"),
                    dataCSSBottom = jQuery(this).css("bottom"),
                    dataCSSLeft = jQuery(this).css("left"),
                    dataCSSZIndex = jQuery(this).css("z-index"),
                    "static" != dataCSSPosition && jQuery('.prz-container[data-prz-id="' + dataIndex + '"]').css({
                        position: dataCSSPosition,
                        top: dataCSSTop,
                        left: dataCSSLeft,
                        right: dataCSSRight,
                        bottom: dataCSSBottom,
                        "z-index": dataCSSZIndex
                    })
                }
            }).on("click", function() {
                var t = document.createEvent("Event");
                t.initEvent("przClick", !0, !0),
                this.addEventListener("przClick", function(t) {}, !1),
                this.dispatchEvent(t)
            }).on("mouseenter", function(e) {
                if (jQuery(this).hasClass("prz-set")) {
                    dataWidth = jQuery(this).width(),
                    dataHeight = jQuery(this).height(),
                    dataScale = jQuery(this).attr("data-prz-scale"),
                    void 0 === dataScale && (dataScale = defaults.scale),
                    dataOpacity = jQuery(this).attr("data-prz-opacity"),
                    void 0 === dataOpacity && (dataOpacity = defaults.opacity),
                    dataOpacityHover = jQuery(this).attr("data-prz-opacity-hover"),
                    void 0 === dataOpacityHover && (dataOpacityHover = defaults.opacityHover),
                    dataTransitionTime = jQuery(this).attr("data-prz-transition-time"),
                    void 0 === dataTransitionTime && (dataTransitionTime = defaults.transitionTime),
                    dataCursor = jQuery(this).attr("data-prz-cursor"),
                    void 0 === dataCursor && (dataCursor = defaults.cursor),
                    dataCustomCursorIcon = jQuery(this).attr("data-prz-custom-cursor-icon"),
                    void 0 === dataCustomCursorIcon && (dataCustomCursorIcon = defaults.customCursorIcon),
                    "" != dataCustomCursorIcon && (dataCursor = "none"),
                    dataCustomCursorSize = jQuery(this).attr("data-prz-custom-cursor-size"),
                    void 0 === dataCustomCursorSize && (dataCustomCursorSize = defaults.customCursorSize),
                    dataText = jQuery(this).attr("data-prz-text"),
                    void 0 === dataText && (dataText = defaults.text),
                    dataTextOpacity = jQuery(this).attr("data-prz-text-opacity"),
                    void 0 === dataTextOpacity && (dataTextOpacity = defaults.textOpacity),
                    dataTextOpacityHover = jQuery(this).attr("data-prz-text-opacity-hover"),
                    void 0 === dataTextOpacityHover && (dataTextOpacityHover = defaults.textOpacityHover),
                    dataTextXParallax = jQuery(this).attr("data-prz-text-x-parallax"),
                    void 0 === dataTextXParallax && (dataTextXParallax = defaults.textXParallax),
                    dataTextYParallax = jQuery(this).attr("data-prz-text-y-parallax"),
                    void 0 === dataTextYParallax && (dataTextYParallax = defaults.textYParallax),
                    dataTilt = jQuery(this).attr("data-prz-tilt"),
                    dataTilt = void 0 === dataTilt ? defaults.tilt : eval(dataTilt),
                    dataTiltXamount = jQuery(this).attr("data-prz-tilt-x-amount"),
                    dataTiltXamount = void 0 === dataTiltXamount ? defaults.tiltXamount : parseInt(dataTiltXamount),
                    dataTiltYamount = jQuery(this).attr("data-prz-tilt-y-amount"),
                    dataTiltYamount = void 0 === dataTiltYamount ? defaults.tiltYamount : parseInt(dataTiltYamount),
                    dataLargeImg = jQuery(this).attr("data-prz-large-img"),
                    targetID = jQuery(this).attr("data-prz-id");
                    var jQcontainer = jQuery('.prz-container[data-prz-id="' + targetID + '"]')
                      , jQtarget = jQcontainer.find(".prz-overlay").eq(0)
                      , jQtargetText = jQcontainer.find(".prz-text").eq(0);
                    if (void 0 !== dataLargeImg) {
                        var jQtargetCustomCursor = jQcontainer.find(".prz-custom-cursor").eq(0)
                          , jQcurrentNode = jQuery(this);
                        jQcurrentNode.css({
                            cursor: "wait"
                        }),
                        jQtargetCustomCursor.addClass("loading");
                        var img = $('<img src="' + dataLargeImg + '">');
                        img.on("load", function() {
                            jQtarget.css({
                                backgroundImage: "url(" + dataLargeImg + ")"
                            }),
                            jQtargetCustomCursor.removeClass("loading"),
                            "" != defaults.customCursorIcon ? (jQcurrentNode.css({
                                cursor: "none"
                            }),
                            jQtargetCustomCursor.css({
                                backgroundImage: "url(" + dataCustomCursorIcon + ")"
                            })) : jQcurrentNode.css({
                                cursor: dataCursor
                            })
                        })
                    }
                    jQtarget.css({
                        opacity: dataOpacityHover,
                        transitionDuration: dataTransitionTime
                    }),
                    jQcontainer.addClass("hover"),
                    setTimeout(function() {
                        jQcontainer.addClass("active")
                    }, 1),
                    1 != dataText && "true" != dataText || jQtargetText.css({
                        opacity: dataTextOpacityHover,
                        transitionDuration: dataTransitionTime
                    }).children().addClass("active")
                }
                var event = document.createEvent("Event");
                event.initEvent("przHover", !0, !0),
                this.addEventListener("przHover", function(t) {}, !1),
                this.dispatchEvent(event)
            }).on("mousemove", function(t) {
                targetID = jQuery(this).attr("data-prz-id");
                var a = jQuery('.prz-container[data-prz-id="' + targetID + '"]')
                  , e = a.find(".prz-overlay").eq(0)
                  , o = a.find(".prz-text").eq(0)
                  , i = a.find(".prz-custom-cursor").eq(0);
                void 0 !== dataImg && ("" != dataCustomCursorIcon && i.css({
                    top: t.offsetY + "px",
                    left: t.offsetX + "px",
                    transform: "translateY(-50%) translateX(-50%)  rotateX(" + dataTiltYamount * dataPercentY + "deg) rotateY(" + dataTiltXamount * dataPercentX + "deg) translateZ(50px) ",
                    "transition-property": "transform,opacity",
                    "transition-duration": mouseMoveTransition
                }),
                e.css({
                    "transform-origin": 100 * t.offsetX / dataWidth + "% " + 100 * t.offsetY / dataHeight + "%"
                }),
                o.css({
                    "transform-origin": 100 * t.offsetX / dataWidth + "% " + 100 * t.offsetY / dataHeight + "%"
                }),
                dataPosX = -(dataWidth / 2 - dataWidth * (t.offsetX / dataWidth)),
                dataPosY = dataHeight / 2 - dataHeight * (t.offsetY / dataHeight),
                dataPercentX = 2 * dataPosX / dataWidth,
                dataPercentY = 2 * dataPosY / dataHeight,
                1 == dataTilt ? mouseMove > mouseMoveThreshold ? (e.css({
                    transform: "scale(" + dataScale + ") rotateX(" + dataTiltYamount * dataPercentY + "deg) rotateY(" + dataTiltXamount * dataPercentX + "deg)",
                    "transition-duration": mouseMoveTransition
                }),
                1 != dataText && "true" != dataText || o.css({
                    transform: "scale(" + dataScale + ") translateX(" + .1 * dataTextXParallax * dataTiltXamount * dataPercentX + "px) translateY(" + -.1 * dataTextYParallax * dataTiltYamount * dataPercentY + "px) translateZ(10px) rotateX(" + dataTiltYamount * dataPercentY + "deg) rotateY(" + dataTiltXamount * dataPercentX + "deg)",
                    "transition-property": "opacity,transform",
                    "transition-duration": mouseMoveTransition
                }),
                mouseMove = 0) : mouseMove++ : (e.css({
                    transform: "scale(" + dataScale + ")"
                }),
                1 != dataText && "true" != dataText || o.css({
                    transform: "scale(" + dataScale + ") translateX(" + .1 * dataTextXParallax * dataTiltXamount * dataPercentX + "px) translateY(" + -.1 * dataTextYParallax * dataTiltYamount * dataPercentY + "px) translateZ(10px)",
                    "transition-property": "opacity"
                }))),
                callbacks = {
                    id: targetID,
                    x: t.offsetX,
                    y: t.offsetY,
                    mouseMove: mouseMove,
                    mouseMoveThreshold: mouseMoveThreshold,
                    height: dataHeight,
                    width: dataWidth,
                    tilt: dataTilt,
                    percentX: dataPercentX,
                    percentY: dataPercentY,
                    tiltXamount: dataTiltXamount,
                    tiltYamount: dataTiltYamount,
                    transitionTime: dataTransitionTime,
                    transitionTimeLeave: dataTransitionTimeLeave
                },
                defaults.onMove && defaults.onMove(callbacks)
            }).on("mouseleave", function(t) {
                targetID = jQuery(this).attr("data-prz-id"),
                void 0 === (dataTransitionTimeLeave = jQuery(this).attr("data-prz-transition-time-leave")) && (dataTransitionTimeLeave = defaults.transitionTimeLeave);
                var a = jQuery('.prz-container[data-prz-id="' + targetID + '"]')
                  , e = a.find(".prz-overlay").eq(0)
                  , o = a.find(".prz-text").eq(0);
                e.css({
                    "transition-property": "transform",
                    opacity: dataOpacity,
                    "background-image": "url(" + e.parent().attr("data-prz-img") + ")",
                    "transition-duration": dataTransitionTimeLeave
                }),
                a.removeClass("active"),
                setTimeout(function() {
                    a.removeClass("hover")
                }, 300),
                o.css({
                    opacity: dataTextOpacity,
                    "transition-duration": dataTransitionTimeLeave
                }),
                setTimeout(function() {
                    e.css({
                        transform: "scale(1) rotateX(0deg) rotateY(0deg)"
                    }),
                    1 != dataText && "true" != dataText || o.css({
                        transform: "scale(1) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px)",
                        "transition-property": "transform,opacity"
                    }).children().removeClass("active")
                }, 1);
                var i = document.createEvent("Event");
                i.initEvent("przLeave", !0, !0),
                this.addEventListener("przLeave", function(t) {}, !1),
                this.dispatchEvent(i),
                mouseMove = mouseMoveThreshold + 1
            }).on("przClick", function(e) {
                if (void 0 !== (dataCallback = jQuery(this).attr("data-prz-callback-click")))
                    eval(dataCallback);
                else {
                    dataIndex = jQuery(this).attr("data-prz-id");
                    var callbacks = {
                        id: dataIndex
                    };
                    defaults.onClick && defaults.onClick(callbacks)
                }
                void 0 !== (dataLink = jQuery(this).attr("data-prz-link")) && (window.location.href = dataLink)
            }).on("przHover", function(e) {
                if (void 0 !== (dataCallback = jQuery(this).attr("data-prz-callback-hover")))
                    eval(dataCallback);
                else {
                    dataIndex = jQuery(this).attr("data-prz-id");
                    var callbacks = {
                        id: targetID,
                        width: dataWidth,
                        height: dataHeight
                    };
                    defaults.onHover && defaults.onHover(callbacks)
                }
            }).on("przLeave", function(e) {
                if (void 0 !== (dataCallback = jQuery(this).attr("data-prz-callback-leave")))
                    eval(dataCallback);
                else {
                    dataIndex = jQuery(this).attr("data-prz-id");
                    var callbacks = {
                        id: targetID
                    };
                    defaults.onLeave && defaults.onLeave(callbacks)
                }
            }),
            jQuery(window).on("resize", function() {
                jQuery(".prz-set").each(function() {
                    dataHeight = jQuery(this).height(),
                    dataWidth = jQuery(this).width(),
                    dataIndex = jQuery(this).attr("data-prz-id"),
                    jQuery('.prz-container[data-prz-id="' + dataIndex + '"]').css({
                        width: dataWidth + "px",
                        height: dataHeight + "px"
                    }),
                    dataCSSPosition = jQuery(this).css("position"),
                    dataCSSTop = jQuery(this).css("top"),
                    dataCSSRight = jQuery(this).css("right"),
                    dataCSSBottom = jQuery(this).css("bottom"),
                    dataCSSLeft = jQuery(this).css("left"),
                    dataCSSZIndex = jQuery(this).css("z-index"),
                    "static" != dataCSSPosition && jQuery('.prz-container[data-prz-id="' + dataIndex + '"]').css({
                        position: dataCSSPosition,
                        top: dataCSSTop,
                        left: dataCSSLeft,
                        right: dataCSSRight,
                        bottom: dataCSSBottom,
                        "z-index": dataCSSZIndex
                    })
                })
            })
        }
    }
}(jQuery);
