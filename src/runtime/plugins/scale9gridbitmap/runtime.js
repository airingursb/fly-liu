var ls;
(function (ls) {
    var AIScale9GridBitmap = (function (_super) {
        __extends(AIScale9GridBitmap, _super);
        function AIScale9GridBitmap() {
            _super.call(this);
            this.name = "scale9GridBitmap";
            this.container.addChild(this._bitmap);
        }
        var d = __define,c=AIScale9GridBitmap,p=c.prototype;
        p.initialize = function () {
            var scale9GridData = this["scale9Grid"].split(",");
            if (scale9GridData.length == 4)
                var back9Grid = new egret.Rectangle(+scale9GridData[0], +scale9GridData[1], +scale9GridData[2], +scale9GridData[3]);
            var $url = decodeURIComponent(this["url"]);
            var $scale9GridData = back9Grid;
            this._bitmapURL = $url;
            this._scale9GridData = $scale9GridData;
            var self = this;
            var textureDatas = ls.getTexture($url);
            if (textureDatas != null)
                var texture = textureDatas[0];
            if (texture != null) {
                self._bitmap.texture = texture;
                self._sourceWidth = texture.textureWidth;
                self._sourceHeight = texture.textureHeight;
                self._bitmap.width = self.width;
                self._bitmap.height = self.height;
                self._bitmap.scale9Grid = $scale9GridData;
                if (textureDatas) {
                    self._bitmap.x = textureDatas[1];
                    self._bitmap.y = textureDatas[2];
                }
                self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
            }
            else {
                var onRESComplete = function (texture) {
                    self._bitmap.texture = texture;
                    self._sourceWidth = texture.textureWidth;
                    self._sourceHeight = texture.textureHeight;
                    self._bitmap.width = self.width;
                    self._bitmap.height = self.height;
                    self._bitmap.scale9Grid = this;
                    self.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, self.onResourceLoaded));
                };
                RES.getResByUrl($url, onRESComplete, $scale9GridData, RES.ResourceItem.TYPE_IMAGE);
            }
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o["scale9Grid"] = this["scale9Grid"];
            o["url"] = this["url"];
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this["scale9Grid"] = o["scale9Grid"];
                this["url"] = o["url"];
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl["scale9Grid"] = this["scale9Grid"];
            cl["url"] = this["url"];
            return cl;
        };
        return AIScale9GridBitmap;
    }(ls.AISprite));
    ls.AIScale9GridBitmap = AIScale9GridBitmap;
    egret.registerClass(AIScale9GridBitmap,'ls.AIScale9GridBitmap');
})(ls || (ls = {}));
