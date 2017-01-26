var ls;
(function (ls) {
    var AIAudio = (function (_super) {
        __extends(AIAudio, _super);
        function AIAudio() {
            _super.call(this);
            this.loopTimes = 1;
            this.volume = 1;
            this.isPlaying = false;
            this.isPlayOnStart = false;
            this.playOnStart = false;
            this.loop = 1;
            this.position = 0;
            this.isMuted = false;
            this.isPaused = false;
            this.curPlayTimes = 0;
            this.pausePosition = 0;
            this.isClick = false;
            this.isloop = false;
            this.name = "Audio";
        }
        var d = __define,c=AIAudio,p=c.prototype;
        p.initialize = function () {
            this.url = ls.eval_e(this.url);
            this.isPlayOnStart = ls.eval_e(this.playOnStart);
            this.loopTimes = ls.eval_e(this.loop);
            this.volume = ls.eval_e(this.volume);
            this.loopTimes = (this.loopTimes <= 0) ? Number.MAX_VALUE : this.loopTimes;
            if (this.volume < 0)
                this.volume = 0;
            if (this.volume > 1)
                this.volume = 1;
            if (AIAudio.soundCaches[this.url] === undefined)
                AIAudio.soundCaches[this.url] = this;
            if (!this.isClick) {
                var onComplete = function ($sound) {
                    if ($sound)
                        this.sound = $sound;
                    if (this.isPlayOnStart) {
                        this.isPlaying = true;
                        this.soundChannel = this.sound.play(this.position, this.loopTimes);
                        this.soundChannel.volume = this.volume;
                        this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onLoopComplete, this);
                    }
                    this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onAudioLoadComplete));
                };
                RES.getResByUrl(this.url, onComplete, this, RES.ResourceItem.TYPE_SOUND);
                ls.GameUILayer.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchTest, this);
            }
        };
        p.onLoopComplete = function (event) {
            var soundChannel = event.currentTarget;
            this.dispatchEvent(new ls.TriggerEvent(ls.TriggerEvent.TRIGGER, this.onended));
            soundChannel.stop();
            this.isPlaying = false;
        };
        p.onTouchTest = function (event) {
            if (this.sound && !this.isClick) {
                this.isClick = true;
                this.clickChannel = this.sound.play(0, 1);
                this.clickChannel.volume = 0;
                this.clickChannel.stop();
            }
        };
        p.isSilent = function (isSilentEvent) {
            var _status = false;
            if (this.isMuted)
                _status = true;
            else {
                _status = (this.volume <= 0) ? true : false;
            }
            return { instances: [this], status: _status };
        };
        p.isAnyPlaying = function (isAnyPlayingEvent) {
            var _status = false;
            for (var url in AIAudio.soundCaches) {
                var audio = AIAudio.soundCaches[url];
                if (audio.isPlaying) {
                    _status = true;
                    break;
                }
            }
            return { instances: [this], status: _status };
        };
        p.isSoundPlaying = function (isSoundPlayingEvent) {
            return { instances: [this], status: this.isPlaying };
        };
        p.onended = function (onEndedEvent) {
            return { instances: [this], status: true };
        };
        p.onLoopOnTimeEnded = function (event) {
            return { instances: [this], status: true };
        };
        p.onAllPreloadComplete = function (onAllPreloadCompleteEvent) {
            return { instances: [this], status: false };
        };
        p.onAudioLoadComplete = function ($onAudioLoadCompleteEvent) {
            return { instances: [this], status: true };
        };
        p.play = function (loopTimes, volume) {
            if (volume === void 0) { volume = 1; }
            this.loopTimes = ls.eval_e(loopTimes);
            this.volume = ls.eval_e(volume);
            this.loopTimes = (this.loopTimes <= 0) ? Number.MAX_VALUE : this.loopTimes;
            if (this.volume < 0)
                this.volume = 0;
            if (this.volume > 1)
                this.volume = 1;
            if (this.sound) {
                this.soundChannel = this.sound.play(this.position, this.loopTimes);
                this.soundChannel.volume = (this.isMuted) ? 0 : this.volume;
                this.soundChannel.position = this.position;
            }
        };
        p.setLoop = function (state) {
            var _isLoop = (ls.eval_e(state) == 0);
            this.loopTimes = (_isLoop) ? Number.MAX_VALUE : 1;
            if (this.sound)
                this.sound.play(this.position, this.loopTimes);
        };
        p.setMasterVolume = function (volume) {
            this.volume = ls.eval_e(volume);
            for (var url in AIAudio.soundCaches) {
                var audio = AIAudio.soundCaches[url];
                audio.setVolume(this.volume);
            }
        };
        p.setVolume = function (volume) {
            this.volume = ls.eval_e(volume);
            if (this.soundChannel)
                this.soundChannel.volume = ls.eval_e(volume);
        };
        p.setMuted = function (state) {
            this.isMuted = (ls.eval_e(state) == 0);
            if (this.soundChannel) {
                this.soundChannel["isStopped"] = false;
                this.soundChannel.volume = (this.isMuted) ? 0 : this.volume;
            }
        };
        p.setPaused = function (state) {
            this.isPaused = (ls.eval_e(state) == 0);
            if (this.isPaused) {
                this.isPlaying = false;
                this.pausePosition = this.soundChannel.position;
                if (this.soundChannel)
                    this.soundChannel.stop();
                this.position = 0;
            }
            else {
                this.isPlaying = true;
                this.position = this.pausePosition;
                this.soundChannel.stop();
                this.play(this.loopTimes, this.volume);
            }
        };
        p.stop = function () {
            if (this.soundChannel)
                this.soundChannel.stop();
            this.position = 0;
            delete AIAudio.soundCaches[this.url];
            this.isPlaying = false;
        };
        p.clear = function () {
            if (this.sound)
                this.sound.close();
        };
        p.stopAll = function () {
            for (var url in AIAudio.soundCaches) {
                var audio = AIAudio.soundCaches[url];
                audio.stop();
            }
        };
        p.setPausedAllSound = function (status) {
            for (var url in AIAudio.soundCaches) {
                var audio = AIAudio.soundCaches[url];
                audio.setPaused(status);
            }
        };
        p.destory = function () {
            if (!this.isModel) {
                var _name = this.name;
                var list = ls.World.getInstance().objectHash[_name];
                if (list) {
                    var _index = list.indexOf(this);
                    if (_index != -1)
                        list.splice(_index, 1);
                }
            }
            ls.World.getInstance().removeChild(this);
            if (!this.global) {
                this.isDead = true;
                this.stop();
            }
        };
        p.saveToJSON = function () {
            var o = _super.prototype.saveToJSON.call(this);
            o.url = this.url;
            o.loop = this.loop;
            o.volume = this.volume;
            o.playOnStart = this.playOnStart;
            return o;
        };
        p.loadFromJSON = function (o) {
            if (o) {
                _super.prototype.loadFromJSON.call(this, o);
                this.url = o.url;
                this.loop = o.loop;
                this.volume = o.volume;
                this.playOnStart = o.playOnStart;
            }
        };
        p.clone = function () {
            var cl = _super.prototype.clone.call(this);
            cl.url = this.url;
            cl.loop = this.loop;
            cl.volume = this.volume;
            cl.playOnStart = this.playOnStart;
            return cl;
        };
        AIAudio.soundCaches = {};
        return AIAudio;
    }(ls.AIObject));
    ls.AIAudio = AIAudio;
    egret.registerClass(AIAudio,'ls.AIAudio');
    var IsSilentEvent = (function (_super) {
        __extends(IsSilentEvent, _super);
        function IsSilentEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsSilentEvent,p=c.prototype;
        return IsSilentEvent;
    }(ls.BaseEvent));
    ls.IsSilentEvent = IsSilentEvent;
    egret.registerClass(IsSilentEvent,'ls.IsSilentEvent');
    var IsAnyPlayingEvent = (function (_super) {
        __extends(IsAnyPlayingEvent, _super);
        function IsAnyPlayingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsAnyPlayingEvent,p=c.prototype;
        return IsAnyPlayingEvent;
    }(ls.BaseEvent));
    ls.IsAnyPlayingEvent = IsAnyPlayingEvent;
    egret.registerClass(IsAnyPlayingEvent,'ls.IsAnyPlayingEvent');
    var IsSoundPlayingEvent = (function (_super) {
        __extends(IsSoundPlayingEvent, _super);
        function IsSoundPlayingEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=IsSoundPlayingEvent,p=c.prototype;
        return IsSoundPlayingEvent;
    }(ls.BaseEvent));
    ls.IsSoundPlayingEvent = IsSoundPlayingEvent;
    egret.registerClass(IsSoundPlayingEvent,'ls.IsSoundPlayingEvent');
    var OnEndEvent = (function (_super) {
        __extends(OnEndEvent, _super);
        function OnEndEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnEndEvent,p=c.prototype;
        return OnEndEvent;
    }(ls.BaseEvent));
    ls.OnEndEvent = OnEndEvent;
    egret.registerClass(OnEndEvent,'ls.OnEndEvent');
    var OnLoopOnTimeEndedEvent = (function (_super) {
        __extends(OnLoopOnTimeEndedEvent, _super);
        function OnLoopOnTimeEndedEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnLoopOnTimeEndedEvent,p=c.prototype;
        return OnLoopOnTimeEndedEvent;
    }(ls.BaseEvent));
    ls.OnLoopOnTimeEndedEvent = OnLoopOnTimeEndedEvent;
    egret.registerClass(OnLoopOnTimeEndedEvent,'ls.OnLoopOnTimeEndedEvent');
    var PreloadCompleteEvent = (function (_super) {
        __extends(PreloadCompleteEvent, _super);
        function PreloadCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=PreloadCompleteEvent,p=c.prototype;
        return PreloadCompleteEvent;
    }(ls.BaseEvent));
    ls.PreloadCompleteEvent = PreloadCompleteEvent;
    egret.registerClass(PreloadCompleteEvent,'ls.PreloadCompleteEvent');
    var OnAudioLoadCompleteEvent = (function (_super) {
        __extends(OnAudioLoadCompleteEvent, _super);
        function OnAudioLoadCompleteEvent() {
            _super.apply(this, arguments);
        }
        var d = __define,c=OnAudioLoadCompleteEvent,p=c.prototype;
        return OnAudioLoadCompleteEvent;
    }(ls.BaseEvent));
    ls.OnAudioLoadCompleteEvent = OnAudioLoadCompleteEvent;
    egret.registerClass(OnAudioLoadCompleteEvent,'ls.OnAudioLoadCompleteEvent');
})(ls || (ls = {}));
