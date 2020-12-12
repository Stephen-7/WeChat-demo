const app = getApp();

let videoContext = '';
module.exports =
    /******/
    (function (modules) { // webpackBootstrap
        /******/ // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/ // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/
            if (installedModules[moduleId]) {
                /******/
                return installedModules[moduleId].exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
                /******/
            };
            /******/
            /******/ // Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/
            return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/ // define getter function for harmony exports
        /******/
        __webpack_require__.d = function (exports, name, getter) {
            /******/
            if (!__webpack_require__.o(exports, name)) {
                /******/
                Object.defineProperty(exports, name, {
                    enumerable: true,
                    get: getter
                });
                /******/
            }
            /******/
        };
        /******/
        /******/ // define __esModule on exports
        /******/
        __webpack_require__.r = function (exports) {
            /******/
            if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: 'Module'
                });
                /******/
            }
            /******/
            Object.defineProperty(exports, '__esModule', {
                value: true
            });
            /******/
        };
        /******/
        /******/ // create a fake namespace object
        /******/ // mode & 1: value is a module id, require it
        /******/ // mode & 2: merge all properties of value into the ns
        /******/ // mode & 4: return value when already ns object
        /******/ // mode & 8|1: behave like require
        /******/
        __webpack_require__.t = function (value, mode) {
            /******/
            if (mode & 1) value = __webpack_require__(value);
            /******/
            if (mode & 8) return value;
            /******/
            if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
            /******/
            var ns = Object.create(null);
            /******/
            __webpack_require__.r(ns);
            /******/
            Object.defineProperty(ns, 'default', {
                enumerable: true,
                value: value
            });
            /******/
            if (mode & 2 && typeof value != 'string')
                for (var key in value) __webpack_require__.d(ns, key, function (key) {
                    return value[key];
                }.bind(null, key));
            /******/
            return ns;
            /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function (module) {
            /******/
            var getter = module && module.__esModule ?
                /******/
                function getDefault() {
                    return module['default'];
                } :
                /******/
                function getModuleExports() {
                    return module;
                };
            /******/
            __webpack_require__.d(getter, 'a', getter);
            /******/
            return getter;
            /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/
        __webpack_require__.p = "";
        /******/
        /******/
        /******/ // Load entry module and return exports
        /******/
        return __webpack_require__(__webpack_require__.s = 0);
        /******/
    })
/************************************************************************/
/******/
([
    /* 0 */
    /***/
    (function (module, exports, __webpack_require__) {
        "use strict";
        Component({
            options: {
                addGlobalClass: true,
                pureDataPattern: /^_/
            },
            properties: {
                videoIndex: {
                    type: Number,
                    value: 0,
                },
                duration: {
                    type: Number,
                    value: 500
                },
                easingFunction: {
                    type: String,
                    value: 'default'
                },
                loop: {
                    type: Boolean,
                    value: true
                },
                videoList: {
                    type: Array,
                    value: [],
                    observer: function observer() {
                        var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                        console.log(newVal)
                        this._videoListChanged(newVal);
                    }
                },
                dataList: {
                    type: Array,
                    value: [],
                    observer: function observer() {
                        var newVal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                        this.setData({
                            animation: '',
                            dataList: newVal
                        })
                    }
                }
            },
            observers: {
                "videoIndex": function (index) {
                    this.setData({
                        current: index || 0
                    })
                    this.triggerEvent('videoView', false)
                }
            },
            data: {
                index: 0,
                pageSize: 12,
                pageIndex: 1,
                current: 0,
                nextQueue: [],
                prevQueue: [],
                curQueue: [],
                circular: false,
                _last: 1,
                _change: -1,
                _invalidUp: 0,
                _invalidDown: 0,
                _videoContexts: [],
                animation: '',
                data: [],
            },
            lifetimes: {
                attached: function attached() {
                    // this.data._videoContexts = [wx.createVideoContext('video_0', this), wx.createVideoContext('video_1', this), wx.createVideoContext('video_2', this)];
                }
            },
            methods: {
                _videoListChanged: function _videoListChanged(newVal) {
                    console.log(newVal, 'newVal')
                    this.setData({
                        curQueue: newVal
                    });
                },
                animationfinish: function animationfinish(e) {
                    this.setData({
                        current: e.detail.current,
                        stop: false,
                    })
                },
                playCurrent: function playCurrent(current) {
                    let than = this;
                    this.data._videoContexts.forEach(function (ctx, index) {
                        index !== current ? ctx.pause() : ctx.play();
                        if (index !== current) {
                            ctx.pause();
                            ctx.seek(0)
                        } else {
                            ctx.play();
                        }
                    });
                },
                onChange: function onChange(e) {
                    this.trigger(e, 'change');
                },
                onPlay: function onPlay(e) {
                    this.trigger(e, 'play');
                },
                onPause: function onPause(e) {
                    this.trigger(e, 'pause');
                },
                onEnded: function onEnded(e) {
                    this.trigger(e, 'ended');
                },
                onError: function onError(e) {
                    this.trigger(e, 'error');
                },
                onTimeUpdate: function onTimeUpdate(e) {
                    this.trigger(e, 'timeupdate');
                },
                onWaiting: function onWaiting(e) {
                    this.trigger(e, 'wait');
                },
                onProgress: function onProgress(e) {
                    this.trigger(e, 'progress');
                },
                onLoadedMetaData: function onLoadedMetaData(e) {
                    this.trigger(e, 'loadedmetadata');
                },
                trigger: function trigger(e, type) {
                    let than = this;
                    var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
                    var detail = e.detail;
                    var activeId = e.target.dataset.id;
                    this.triggerEvent(type, Object.assign(Object.assign(Object.assign({}, detail), {
                        activeId: activeId
                    }), ext));
                }
            }
        });

        /***/
    })
    /******/
]);