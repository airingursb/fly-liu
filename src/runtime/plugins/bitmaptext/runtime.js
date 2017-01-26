var ls;
(function (ls) {
    var AIBitmapText = (function (_super) {
        __extends(AIBitmapText, _super);
        function AIBitmapText() {
            _super.call(this);
            this.name = "bitmapText";
            this._bitmapText = new egret.BitmapText();
            this.container.addChild(this._bitmapText);
        }
        var d = __define,c=AIBitmapText,p=c.prototype;
        p.initialize = function () {
            var url = decodeURIComponent(this["bmpUrl"]);
            var fnturl = decodeURIComponent(this["fntUrl"]);
            this._bitmapURL = url;
            this._fntUrl = fnturl;
            var data = ls.ResCache.componentResources[fnturl];
            if (data) {
                this.onFntComplete(data);
            }
            else {
                var onFntResComplete = function (bitmapFont) {
                    this.onFntComplete(bitmapFont);
                };
                RES.getResByUrl(fnturl, onFntResComplete, this, RES.ResourceItem.TYPE_FONT);
            }
        };
        p.onFntComplete = function (bitmapFont) {
            this._bitmapText.font = bitmapFont;
            this._sourceWidth = this._bitmapText.width;
            this._sourceHeight = this._bitmapText.height;
            if (this.text)
                this._bitmapText.text = this.text.toString();
            this._bitmapText.width = this.width;
            this._bitmapText.height = this.height;
            this._bitmapText.letterSpacing = this.letterSpacing;
            this._bitmapText.lineSpacing = this.lineSpacing;
            this._bitmapText.verticalAlign = this._verticalAlign;
            this._bitmapText.textAlign = this._textAlign;
            this._bitmapText.smoothing = this._smoothing;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onResourceLoaded));
        };
        d(p, "letterSpacing"
            ,function () {
                return this._letterSpacing;
            }
            ,function (value) {
                if (this._letterSpacing != value) {
                    if (this._bitmapText)
                        this._bitmapText.letterSpacing = value;
                    else
                        this._letterSpacing = value;
                }
            }
        );
        d(p, "lineSpacing"
            ,function () {
                return this._lineSpacing;
            }
            ,function (value) {
                if (this._lineSpacing != value) {
                    if (this._bitmapText)
                        this._bitmapText.lineSpacing = value;
                    else
                        this._lineSpacing = value;
                }
            }
        );
        d(p, "text"
            ,function () {
                return this._text;
            }
            ,function ($text) {
                if (this._bitmapText)
                    this._bitmapText.text = $text;
                else
                    this._text = $text;
            }
        );
        d(p, "width"
            ,function () {
                return this._width;
            }
            ,function (value) {
                if (this._bitmapText) {
                    if (this._bitmapText.width != value)
                        this._bitmapText.width = value;
                }
                if (this._width != value) {
                    this.update = true;
                    this._width = value;
                }
            }
        );
        d(p, "height"
            ,function () {
                return this._height;
            }
            ,function (value) {
                if (this._bitmapText) {
                    if (this._bitmapText.height != value)
                        this._bitmapText.height = value;
                }
                if (this._height != value) {
                    this.update = true;
                    this._height = value;
                }
            }
        );
        d(p, "scaleX"
            ,function () {
                return this._scaleX;
            }
            ,function (value) {
                if (this._scaleX != value) {
                    this._scaleX = value;
                    this.width = this._scaleX * this._sourceWidth;
                    this.update = true;
                }
            }
        );
        d(p, "scaleY"
            ,function () {
                return this._scaleY;
            }
            ,function (value) {
                if (this._scaleY != value) {
                    this._scaleY = value;
                    this.height = this._scaleY * this._sourceHeight;
                    this.update = true;
                }
            }
        );
        d(p, "scale"
            ,function () {
                if (this._scaleX == this._scaleY)
                    return this._scaleX;
                else
                    return 1;
            }
            ,function (value) {
                if (this.scale != value) {
                    this.update = true;
                    this.scaleX = this.scaleY = value;
                }
            }
        );
        p.compareBitmapFontText = function (event) {
            return { instances: [this], status: this._text == ls.eval_e(event.text) };
        };
        p.setBitmapText = function ($text) {
            var text = ls.eval_e($text);
            if (this._text != text) {
                if (this._bitmapText) {
                    if (typeof text === "number")
                        this._bitmapText.text = text.toString();
                    else
                        this._bitmapText.text = text;
                }
                this._text = text;
            }
        };
        p.appendBitmapText = function ($text) {
            var text = ls.eval_e($text);
            if (this._bitmapText) {
                if (typeof text === "number")
                    this._bitmapText.text += text.toString();
                else
                    this._bitmapText.text += text;
            }
            this._text += text;
        };
        p.setBitmapLetterSpace = function ($letterSpace) {
            this._letterSpacing = ls.eval_e($letterSpace);
            if (this._bitmapText)
                this._bitmapText.letterSpacing = this._letterSpacing;
        };
        p.setBitmapLineSpace = function ($lineSpace) {
            this._lineSpacing = ls.eval_e($lineSpace);
            if (this._bitmapText)
                this._bitmapText.lineSpacing = this._lineSpacing;
        };
        p.setBitmapTextAlign = function (textAlign) {
            this._textAlign = ls.eval_e(textAlign);
            if (this._bitmapText)
                this._bitmapText.textAlign = this._textAlign;
        };
        p.setBitmapVerticalAlign = function (verticalAlign) {
            this._verticalAlign = ls.eval_e(verticalAlign);
            if (this._bitmapText)
                this._bitmapText.verticalAlign = this._verticalAlign;
        };
        p.setBitmapSmoothing = function (smooth) {
            this._smoothing = ls.eval_e(smooth);
            if (this._bitmapText)
                this._bitmapText.smoothing = this._smoothing;
        };
        d(p, "bitmapText"
            ,function () {
                return this._bitmapText;
            }
        );
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["text"] = this.text;
            o["letterSpacing"] = this.letterSpacing;
            o["lineSpacing"] = this.lineSpacing;
            o["bmpUrl"] = this["bmpUrl"];
            o["fntUrl"] = this["fntUrl"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this["bmpUrl"] = o["bmpUrl"];
                this["fntUrl"] = o["fntUrl"];
                this.text = o["text"];
                this.letterSpacing = o["letterSpacing"];
                this.lineSpacing = o["lineSpacing"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.text = this.text;
            cl.letterSpacing = this.letterSpacing;
            cl.lineSpacing = this.lineSpacing;
            cl["bmpUrl"] = this["bmpUrl"];
            cl["fntUrl"] = this["fntUrl"];
            return cl;
        };
        return AIBitmapText;
    }(ls.AISprite));
    ls.AIBitmapText = AIBitmapText;
    egret.registerClass(AIBitmapText,'ls.AIBitmapText');
    var CompareBitmapFontTextEvent = (function (_super) {
        __extends(CompareBitmapFontTextEvent, _super);
        function CompareBitmapFontTextEvent() {
            _super.call(this);
        }
        var d = __define,c=CompareBitmapFontTextEvent,p=c.prototype;
        return CompareBitmapFontTextEvent;
    }(ls.BaseEvent));
    ls.CompareBitmapFontTextEvent = CompareBitmapFontTextEvent;
    egret.registerClass(CompareBitmapFontTextEvent,'ls.CompareBitmapFontTextEvent');
})(ls || (ls = {}));
