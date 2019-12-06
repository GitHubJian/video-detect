window['UC_VIDEO_MONITOR_OPEN'] = true
window['UC_VIDEO_MONITOR_TIMEOUT_ARR'] = [15, 25, 35]
//res=video_detect_T3_js;
;(function() {
  function v(a) {
    !0 !== a.ucAccessible ||
      (a.contentWindow && a.contentDocument) ||
      (a.ucAccessible = !1)
    return !0 === a.ucAccessible
  }
  function K(a, c) {
    if (void 0 == a) return 0
    for (
      var b = a.getElementsByTagName('video'), d = b.length, e = 0;
      e < d;
      ++e
    )
      A(b[e], c)
    for (var f = (e = 0); f < d; ++f) {
      var g = b[f],
        h = l(g)
      if (h && 0 < h.length)
        if ('none' == a.defaultView.getComputedStyle(g).display) e || (e = g)
        else return g
    }
    return e
  }
  function L() {
    var a = {},
      a = void 0 != h.videoUrl && 0 < h.videoUrl.length ? h : M()
    a.pageGuid = k.guid
    return a
  }
  function pa() {
    return JSON.stringify(L())
  }
  function N() {
    return 4 != h.errorCode
  }
  function M() {
    var a = {
        videoUrl: '',
        posterUrl: ''
      },
      c = O()
    if (c) {
      var b = c.oriHookVideo ? c.oriHookVideo : c
      h.errorCode =
        b.error && b.error.code ? (!0 === b.ucSrcReset ? 0 : b.error.code) : 0
      N() ? ((a.videoUrl = l(c)), (a.posterUrl = B(c))) : (c.src = '')
    }
    return a
  }
  function O() {
    var a = K(window.document, 0)
    if (a) return a
    for (
      var c = document.getElementsByTagName('iframe'), b = 0;
      b < c.length;
      ++b
    ) {
      var d = c[b]
      if (v(d)) {
        var e = d.contentWindow
        if (a) {
          if (((e = e.document), void 0 != e))
            for (
              var e = e.getElementsByTagName('video'), f = e.length, g = 0;
              g < f;
              ++g
            )
              A(e[g], d)
        } else a = K(e.document, d)
      }
    }
    return a
  }
  function q(a) {
    a.videoUrl && (a.pageGuid = k.guid)
    'undefined' != typeof ucbrowser &&
    ucbrowser.isMethodSupported('playVideoAtURL')
      ? ucbrowser.playVideoAtURL(JSON.stringify(a))
      : window.ucapi &&
        window.ucapi.invoke &&
        window.ucapi.invoke('video.playVideoAtURL', {
          videoInfo: JSON.stringify(a)
        })
  }
  function P(a) {
    'undefined' != typeof ucbrowser &&
    ucbrowser.isMethodSupported('loadVideoAtURL')
      ? ucbrowser.loadVideoAtURL(a)
      : window.ucapi &&
        window.ucapi.invoke &&
        window.ucapi.invoke('video.loadVideoAtURL', {
          videoInfo: a
        })
  }
  function l(a) {
    var c = a.getAttribute('src')
    if (c && 0 < c.length) c = a.src
    else
      for (var b = a.getElementsByTagName('source'), d = 0; d < b.length; ++d) {
        var e = b[d],
          f = e.getAttribute('src')
        if (f && 0 < f.length) {
          c = e.src
          break
        }
      }
    k.updateUrl(a.monitorKey, c ? c : '')
    return c ? c : ''
  }
  function B(a) {
    var c = a.getAttribute('poster')
    if (c && 0 < c.length) c = a.poster
    else {
      var b = window.UCVPosterUrlGetter
      if ('function' === typeof b) {
        if (null === a.parentNode)
          a: {
            for (
              var d = document.getElementsByTagName('video'),
                e = d.length,
                f = 0;
              f < e;
              ++f
            )
              if (d[f].oriHookVideo === a) {
                a = d[f]
                break a
              }
            for (
              var g = document.getElementsByTagName('iframe'),
                h = g.length,
                k = 0;
              k < h;
              ++k
            )
              if (((d = g[k]), v(d)))
                for (
                  d = d.contentDocument.getElementsByTagName('video'),
                    e = d.length,
                    f = 0;
                  f < e;
                  ++f
                )
                  if (d[f].oriHookVideo === a) {
                    a = d[f]
                    break a
                  }
            a = null
          }
        a && (c = b(a))
      }
    }
    return c ? c : ''
  }
  function Q(a) {
    w && clearTimeout(w)
    w = m(function() {
      w = null
      q(a)
    }, 100)
  }
  function R(a) {
    return (
      a &&
      ('click' == a.type || 'tap' == a.type || 0 == a.type.indexOf('touch'))
    )
  }
  function S() {
    if (window.event) return window.event
    for (
      var a = document.getElementsByTagName('iframe'), c = 0;
      c < a.length;
      ++c
    ) {
      var b = a[c].contentWindow
      if (b && b.event) return b.event
    }
    return null
  }
  function x() {
    var a = S()
    if (
      void 0 != window.UC_VIDEO_SHOULD_AUTO_PLAY ||
      R(a) ||
      ('number' == typeof this.ucRetryLeft && 0 < this.ucRetryLeft)
    ) {
      if ((a = l(this))) {
        var c = {
          videoUrl: a,
          posterUrl: B(this)
        }
        q(c)
        this.ucRetryLeft = null
      } else
        (this.ucRetryLeft =
          'number' == typeof this.ucRetryLeft ? this.ucRetryLeft - 1 : 3),
          0 < this.ucRetryLeft && m(x, 10)
      k.updatePlayed(this.monitorKey, a, !0)
    } else (a = l(this)), k.updatePlayFailed(this.monitorKey, a, !0)
  }
  function T() {
    R(S()) && P(l(this))
  }
  function U(a, c, b) {
    b = null
    switch (qa) {
      case 'live':
        b = a
        break
      case 'dis':
        b = null
        break
      default:
        b = a.oriHookVideo ? a.oriHookVideo : a
    }
    b &&
      ((a = document.createEvent('HTMLEvents')),
      a.initEvent(c, !1, !0),
      (a.isUCEvent = !0),
      b.dispatchEvent(a))
  }
  function V(a) {
    a.webkitEnterFullscreen = function(a) {}
    a.webkitEnterFullScreen = function(a) {}
    a.webkitRequestFullScreen = function(a) {}
    a.webkitRequestFullscreen = function(a) {}
    a.setAttribute('webkit-playsinline', '')
    a.setAttribute('playsinline', '')
    a.controls = !0
  }
  function p(a, c, b, d) {
    a.removeEventListener(c, b, d)
    a.addEventListener(c, b, d)
  }
  function W(a, c) {
    debugger
    p(a, 'play', X, !1)
    p(a, 'ended', Y, !1)
    p(a, 'error', Z, !1)
    p(a, 'abort', aa, !1)
    p(a, 'canplaythrough', ba, !1)
    p(a, 'webkitendfullscreen', ca, !1)
  }
  function C(a, c) {
    var b = a.parentNode
    if (b) {
      var d = a.cloneNode(!0)
      d.ucVCusPlayDisabled = a.ucVCusPlayDisabled
      d.monitorKey = a.monitorKey
      c && 0 < c.length && (d.src = c)
      a.oriHookVideo
        ? (a.removeEventListener('play', X, !1),
          a.removeEventListener('ended', Y, !1),
          a.removeEventListener('error', Z, !1),
          a.removeEventListener('abort', aa, !1),
          a.removeEventListener('canplaythrough', ba, !1),
          a.removeEventListener('webkitendfullscreen', ca, !1),
          (d.oriHookVideo = a.oriHookVideo),
          (a.oriHookVideo = null))
        : ((d.oriHookVideo = a), (a.ucLastCheckSrc = c), (a.ucSkipError = !0))
      d.ucSkipError = !0
      d.ucListened = !0
      V(d)
      W(d, !0)
      d.onclick = ra
      b.replaceChild(d, a)
      return d
    }
  }
  function ra(a) {
    a &&
      a.target &&
      ((a = a.target), 'video' == a.nodeName.toLowerCase() && a.play())
  }
  function r(a, c) {
    var b = []
    switch (c.vEvent) {
      case 'play':
        b.push(c.vEvent)
        b.push(c.isNextPlay)
        k.updateCrossDomainSystemPlayed(c.monitorKeys, a, !0)
        break
      case 'error':
        b.push(c.vEvent)
        k.updateCrossDomainSystemPlayError(c.monitorKeys, a, !0)
        break
      case 'succ':
        b.push(c.vEvent), b.push(c.loadTime)
    }
    if (0 < b.length) {
      var d = {
        cmd: 'ucvsys:'
      }
      d.params = b
      d.videoUrl = a
      q(d)
    }
  }
  function X(a) {
    if (!a.isUCEvent && ((a = a.target), 'video' == a.nodeName.toLowerCase())) {
      var c = {
          videoUrl: l(a)
        },
        b
      if (
        (b =
          !n &&
          1 !== a.ucVCusPlayDisabled &&
          c.videoUrl !== window.location.href)
      )
        (b = !1),
          a &&
            'function' === typeof a.webkitExitFullScreen &&
            (a.pause(), a.webkitExitFullScreen(), (b = !0))
      b
        ? ((c.posterUrl = B(a)),
          (a.src = ''),
          'function' === typeof a.ucOriLoad ? a.ucOriLoad() : a.load(),
          C(a, c.videoUrl),
          Q(c))
        : !0 !== a.ucIsPlaying &&
          ((b = {
            vEvent: 'play',
            isNextPlay: !0 === a.ucIsPlayerShown
          }),
          r(c.videoUrl, b),
          (a.ucIsPlaying = !0),
          (a.ucIsPlayerShown = !0),
          (a.ucStartLoadTime = new Date().getTime()),
          !0 === a.ucFirstLoaded &&
            ((b = {
              vEvent: 'succ',
              loadTime: 1
            }),
            r(c.videoUrl, b)))
      k.updateSystemPlayed(a.monitorKey, c.videoUrl, !0)
    }
  }
  function Z(a) {
    if (!a.isUCEvent) {
      a = a.target
      a.ucIsPlaying = !1
      if (!0 !== a.ucSkipError) {
        var c = l(a)
        c &&
          0 < c.length &&
          r(c, {
            vEvent: 'error'
          })
      }
      a.ucFirstLoaded = !1
      a.ucStartLoadTime = 0
      k.updateSystemPlayError(a.monitorKey, !0)
    }
  }
  function Y(a) {
    a.isUCEvent ||
      ((a = a.target),
      (a.ucIsPlaying = !1),
      (a.ucFirstLoaded = !1),
      (a.ucStartLoadTime = 0))
  }
  function aa(a) {
    a.isUCEvent ||
      ((a = a.target),
      (a.ucIsPlaying = !1),
      (a.ucFirstLoaded = !1),
      (a.ucStartLoadTime = 0))
  }
  function ba(a) {
    if (
      !a.isUCEvent &&
      ((a = a.target),
      !0 !== a.ucFirstLoaded && ((a.ucFirstLoaded = !0), 0 < a.ucStartLoadTime))
    ) {
      var c = {
        vEvent: 'succ',
        loadTime: new Date().getTime() - a.ucStartLoadTime
      }
      r(l(a), c)
    }
  }
  function ca(a) {
    a.isUCEvent ||
      ((a = a.target), (a.ucIsPlaying = !1), (a.ucIsPlayerShown = !1))
  }
  function A(a, c) {
    void 0 == a.monitorKey && (a.monitorKey = k.addVideo(c ? 1 : 0))
    // if (!n) {
    //   var b = (c ? c.contentWindow : window).HTMLVideoElement.prototype
    //   b.play !== x && ((b.play = x), (b.load = T))
    //   k.updateSuccessHook(a.monitorKey, !0)
    // }
    !0 !== a.ucListened &&
      ((a.ucListened = !0),
      (b = l(a)),
      W(a, b !== window.location.href),
      k.updateSuccessListen(a.monitorKey, !0),
      n ||
        (a.removeAttribute('autoplay'),
        (a.ucVCusPlayDisabled = c ? c.ucVCusPlayDisabled : da),
        1 !== a.ucVCusPlayDisabled &&
          b !== window.location.href &&
          (a.pause(), V(a), '1' !== y && C(a, b))))
    a.oriHookVideo &&
      ((b = l(a.oriHookVideo)) &&
      0 < b.length &&
      b != a.oriHookVideo.ucLastCheckSrc
        ? ((a.src = b),
          (a.oriHookVideo.ucLastCheckSrc = b),
          (a.oriHookVideo.ucSrcReset = !0))
        : (b = l(a)) &&
          0 < b.length &&
          b != a.oriHookVideo.ucLastCheckSrc &&
          ((a.oriHookVideo.ucLastCheckSrc = b),
          (a.oriHookVideo.ucSrcReset = !0),
          (a.oriHookVideo.src = b)))
  }
  function sa(a) {
    var c = a || window.event,
      b = c.data
    if (b) {
      var d = b.UC_MSG_NAME
      if (d && 0 != d.length) {
        var e = b.UC_VIDEO_URL
        a = {
          videoUrl: e ? e : '',
          posterUrl: b.extInfo && b.extInfo.posterUrl ? b.extInfo.posterUrl : ''
        }
        switch (d) {
          case 'UCVideoURLGot':
            for (
              var c = c.source,
                b = b.extInfo,
                d = 0,
                e = document.getElementsByTagName('iframe'),
                f = 0;
              f < e.length;
              ++f
            ) {
              var g = e[f]
              if (g.contentWindow == c) {
                g.ucVideoFlag = !0
                d = g
                break
              }
            }
            d &&
              ((t = d),
              b && b.errorcode && (h.errorCode = b.errorcode),
              0 < a.posterUrl.length && (h.posterUrl = a.posterUrl),
              u(a.videoUrl, a.posterUrl, b && !0 === b.changed))
            break
          case 'UCPlayVideo':
            k.updateCrossDomainPlayed(b.extInfo.monitorKeys, e, !0)
            q(a)
            break
          case 'UCLoadVideo':
            P(a.videoUrl)
            break
          case 'UCCusSysPlayVideo':
            k.updateCrossDomainPlayed(b.extInfo.monitorKeys, e, !0)
            Q(a)
            break
          case 'UCOnSysVEvent':
            r(a.videoUrl, b.extInfo)
            break
          case 'UCSeekVideo':
            ea(b.extInfo.seekTime, a)
            break
          case 'UCVideoGot':
            k.addCrossDomainVideo(b.extInfo.monitorKeys)
        }
      }
    }
  }
  function D(a, c) {
    if (a && 0 < a.length && c.src && 0 < c.src.length)
      try {
        var b,
          d = c.src
        if (d && 0 < d.length) {
          var e = d.indexOf('?')
          ;-1 < e && (d = d.substring(0, e))
        }
        b = d
        for (d = 0; d < a.length; ++d) if (-1 < b.indexOf(a[d])) return !0
      } catch (f) {}
    return !1
  }
  function E(a, c) {
    for (
      var b = document.getElementsByTagName('iframe'), d = 0;
      d < b.length;
      ++d
    ) {
      var e = b[d]
      if (!v(e))
        a: {
          var f = a,
            g = c
          if (1 != e.ucNotRecvMsg) {
            if (1 != e.ucVideoFlag) {
              if (void 0 === e.ucPostRetryCount) e.ucPostRetryCount = 0
              else if (30 <= e.ucPostRetryCount) break a
              e.ucPostRetryCount += 1
            }
            f = {
              UC_MSG_NAME: f
            }
            g && (f.extInfo = g)
            1 === e.ucVCusPlayDisabled && (f.disCusSysPlay = 1)
            1 === e.ucVInsertObserveEnabled && (f.obsVIn = 1)
            ;(e = e.contentWindow) && e.postMessage(f, '*')
          }
        }
    }
  }
  function u(a, c, b) {
    !n &&
      (b || a != h.videoUrl || 1 > z) &&
      ((h.videoUrl = a),
      (h.posterUrl = c),
      !0 === fa &&
        (a.length && ++z,
        'undefined' != typeof ucbrowser &&
        ucbrowser.isMethodSupported('videoTagDetected')
          ? ucbrowser.videoTagDetected(JSON.stringify(h))
          : window.ucapi && window.ucapi.invoke
          ? window.ucapi.invoke('video.videoTagDetected', {
              videoInfo: JSON.stringify(h)
            })
          : document.addEventListener(
              'UCBrowserReady',
              function() {
                'undefined' != typeof ucbrowser &&
                ucbrowser.isMethodSupported('videoTagDetected')
                  ? ucbrowser.videoTagDetected(JSON.stringify(h))
                  : window.ucapi &&
                    window.ucapi.invoke &&
                    window.ucapi.invoke('video.videoTagDetected', {
                      videoInfo: JSON.stringify(h)
                    })
              },
              !1
            )))
  }
  function ta(a) {
    debugger
    a = a.target
    var c
    'video' == a.nodeName.toLowerCase()
      ? (c = a)
      : 0 < a.childElementCount &&
        ((a = a.getElementsByTagName('video')), 0 < a.length && (c = a[0]))
    c && A(c, 0)
  }
  function ga() {
    var a = document.getElementsByTagName('iframe')
    window.disCusSysPlaySites &&
      ((ha = window.disCusSysPlaySites.split(',')),
      (window.disCusSysPlaySites = void 0))
    window.vInsertObserveSites &&
      ((ia = window.vInsertObserveSites.split(',')),
      (window.vInsertObserveSites = void 0))
    for (var c = 0; c < a.length; ++c) {
      var b = a[c]
      b.ucLastCheckSrc != b.src &&
        ((b.ucVCusPlayDisabled = D(ha, b) ? 1 : 0),
        (b.ucVInsertObserveEnabled = D(ia, b) ? 1 : 0),
        (b.ucAccessible = b.contentWindow && b.contentDocument ? !0 : !1),
        (b.ucNotRecvMsg = window.ucNotRecvMsgFrames
          ? D(window.ucNotRecvMsgFrames, b)
          : !1),
        (b.ucPostRetryCount = 0),
        (b.ucLastCheckSrc = b.src))
    }
    if (
      1 == F &&
      ((F = 0), (h.videoUrl = ''), (h.posterUrl = ''), (h.errorcode = 0), !n)
    ) {
      c = []
      if (1 !== da)
        for (
          var b = document.getElementsByTagName('video'), d = 0;
          d < b.length;
          ++d
        ) {
          var e = b[d]
          !0 === e.ucListened && c.push(e)
        }
      for (
        var d = document.getElementsByTagName('iframe'), f = 0;
        f < d.length;
        ++f
      )
        if (((b = d[f]), v(b) && 1 !== b.ucVCusPlayDisabled))
          for (
            var b = b.contentDocument.getElementsByTagName('video'), g = 0;
            g < b.length;
            ++g
          )
            (e = b[g]), !0 === e.ucListened && c.push(e)
      for (d = 0; d < c.length; ++d) (e = c[d]), C(e, l(e))
      E('UCBROWSER_VIDEO_BACKFORWARD', null)
    }
    window.location.href !== ja && ((ja = window.location.href), (z = 0))
    c = M()
    if (0 < c.videoUrl.length)
      (t = 0), (h.posterUrl = c.posterUrl), u(c.videoUrl, c.posterUrl, !1)
    else {
      if (h.videoUrl && 0 < h.videoUrl.length)
        if (t) {
          c = !1
          for (b = 0; b < a.length; ++b)
            if (a[b] === t) {
              c = !0
              break
            }
          !0 !== c ? ((t = 0), u('', '', !0)) : u(h.videoUrl, h.posterUrl, !1)
        } else u('', '', !0)
      E('UCBROWSER_GET_VIDEO_URL', null)
    }
    k.beginMonitor()
  }
  function ka() {
    ga()
    var a = 1e3
    5 > G++ && (0 < h.videoUrl.length ? (G = 5) : (a = 200))
    m(ka, a)
  }
  function ua() {
    delay(ga, 100)

    if (0 === la) {
      la = 1
      delay(ka, 0)
      window.addEventListener('message', sa, !1)

      if (1 === window.videoInsertObserveEnabled) {
        document.addEventListener('DOMNodeInserted', ta, !1)
      }
    }
  }
  function ea(a, c) {
    var b = JSON.parse(JSON.stringify(c))
    b.cmd = 'webseek:'
    b.params = [a]
    q(b)
  }
  function va() {
    return this.ucDuration ? this.ucDuration : 0
  }
  function wa() {
    return this.ucCurTime ? this.ucCurTime : 0
  }
  function xa(a) {
    !0 !== ya && ((this.ucCurTime = a), ea(a, h))
  }
  function H(a) {
    if (!0 !== za && !n) {
      if (!0 !== a.ucVideoPropertiesHooked)
        try {
          ;(a.ucVideoPropertiesHooked = !0),
            Object.defineProperty(a, 'duration', {
              get: va
            }),
            Object.defineProperty(a, 'currentTime', {
              get: wa,
              set: xa
            }),
            Object.defineProperty(a, 'seekable', {
              get: function() {
                return ma
              }
            })
        } catch (c) {}
      a.oriHookVideo && H(a.oriHookVideo)
    }
  }
  function Aa(a) {
    m(function() {
      var c = O()
      if (c) {
        switch (a.vEvent) {
          case 'durationchange':
            var b = a.duration
            ma.duration = b
            c.ucDuration = parseInt(b, 10)
            if ((b = c.oriHookVideo)) b.ucDuration = c.ucDuration
            H(c)
            break
          case 'timeupdate':
            c.ucCurTime = parseFloat(a.currentTime)
            if ((b = c.oriHookVideo)) b.ucCurTime = c.ucCurTime
            H(c)
            break
          case 'play':
            c.ucWaitPlaying = !0
            c.oriHookVideo && (c.oriHookVideo.ucWaitPlaying = !0)
            break
          case 'playing':
            c.ucWaitPlaying = !1
            c.oriHookVideo && (c.oriHookVideo.ucWaitPlaying = !1)
            break
          case 'pause':
            !0 === c.ucWaitPlaying && '1' == a.stop && U(c, 'playing', !0)
        }
        U(c, a.vEvent, !0)
      } else E('UCBROWSER_VIDEO_PLAYBACK_EVENTS', a)
    }, 1)
  }
  function Ba() {
    F = 1
    G = 0
  }
  function Ca() {
    return 1 >= z
  }
  function na() {
    var a = L()
    fa = !0
    return a.videoUrl
  }
  function Da(a) {
    '2' !== y && ((a && window.ucbrowser_readmode_detect) || m(na, 1))
  }
  function m(a, c) {
    window.setTimeout(a, c)
  }
  function Ea(a) {
    a = window.parent.document.getElementsByTagName('meta')
    for (var c = 0; c < a.length; c++) {
      if ('control_video_type' === a[c].getAttribute('name')) {
        var b = a[c].getAttribute('id'),
          d = b.charAt(4),
          e = b.substr(5)
        b = document.domain
        d = parseInt(d, 10)
        if (b) {
          for (var f = '', g = void 0, h = 0; h < b.length; h++)
            (g = b.charCodeAt(h)),
              47 < g && 58 > g
                ? ((g = g + d - 10 * parseInt((g + d) / 10, 10)),
                  (f += String.fromCharCode(48 + g)))
                : 64 < g && 91 > g
                ? (f += String.fromCharCode(65 + ((g + d) % 26)))
                : 96 < g &&
                  123 > g &&
                  (f += String.fromCharCode(97 + ((g + d) % 26)))
          b = e == f ? !0 : !1
        } else b = void 0
        b &&
          ((b = a[c].getAttribute('content')),
          8 < b.length && (y = b.charAt(8)))
      }
    }

    if ('2' !== y) {
      if (!n) {
        debugger
        HTMLVideoElement.prototype.play = x
        HTMLVideoElement.prototype.load = T

        m(ua, 1)
      }
    }
  }
  if (void 0 == window.K_UCKUIWebViewVideoFinder) {
    var ma = {
        length: 1,
        duration: 0,
        start: function(a) {
          return 0
        },
        end: function(a) {
          return this.duration
        }
      },
      la = 0,
      ja = '',
      t = 0,
      w,
      F = 0,
      ha,
      ia,
      h = {
        videoUrl: '',
        posterUrl: '',
        errorCode: 0
      },
      G = 0,
      z = 0,
      fa = !1,
      I = window.UCVVideoEvtReceiver,
      qa = I && 0 < I.length ? I : 'ori',
      ya = window.ucvSkipVideoPropDefine,
      za = window.ucvSkipVideoCustomProp,
      da = window.videoCustomPlayDisabled,
      n = window.ucVideoAutoHookDisabled,
      Fa = window.UC_VIDEO_MONITOR_OPEN,
      J = window.UC_VIDEO_MONITOR_TIMEOUT_ARR,
      oa = {
        createNew: function() {
          return {
            url: '',
            domainType: 0,
            successHook: !1,
            successListen: !1,
            played: !1,
            systemPlayed: !1,
            systemPlayError: !1,
            monitorKey: ''
          }
        }
      },
      k = (function() {
        var a = {
          videoList: [],
          monitorBegan: !1,
          guid: null
        }
        a.pageUrl = window.location.href
        a.timeoutIndex = 0
        a.curDocVideoCount = 0
        a.addVideo = function(a) {
          var b = oa.createNew()
          b.domainType = a
          a = this.generateVideoKey()
          b.monitorKey = a
          this.videoList.push(b)
          return a
        }
        a.updateUrl = function(a, b) {
          var d = this.findVideoByMonitorKey(a)
          d && (d.url = b)
        }
        a.updateSuccessHook = function(a, b) {
          var d = this.findVideoByMonitorKey(a)
          d && (d.successHook = b)
        }
        a.updateSuccessListen = function(a, b) {
          var d = this.findVideoByMonitorKey(a)
          d && (d.successListen = b)
        }
        a.updatePlayed = function(a, b, d) {
          if ((a = this.findVideoByMonitorKey(a)))
            (a.played = d), (a.url = b ? b : '')
        }
        a.updateSystemPlayed = function(a, b, d) {
          if ((a = this.findVideoByMonitorKey(a)))
            (a.systemPlayed = d), (a.url = b ? b : '')
        }
        a.updateSystemPlayError = function(a, b) {
          var d = this.findVideoByMonitorKey(a)
          d && (d.systemPlayError = b)
        }
        a.addCrossDomainVideo = function(a) {
          for (var b = 0; b < a.length; b++) {
            var d = a[b]
            if (!this.findVideoByMonitorKey(d)) {
              var e = oa.createNew()
              e.domainType = 2
              e.monitorKey = d
              e.successHook = !0
              e.successListen = !0
              this.videoList.push(e)
            }
          }
        }
        a.findVideoByMonitorKey = function(a) {
          if (!a || 0 == a.length) return null
          for (var b = 0; b < this.videoList.length; b++)
            if (this.videoList[b].monitorKey === a) return this.videoList[b]
          return null
        }
        a.findVideoByUrl = function(a) {
          if (!a || 0 == a.length) return null
          for (var b = 0; b < this.videoList.length; b++)
            if (this.videoList[b].url === a) return this.videoList[b]
          return null
        }
        a.updateCrossDomainPlayed = function(a, b, d) {
          if (a)
            for (var e = 0; e < a.length; e++) {
              var f = this.findVideoByMonitorKey(a[e])
              f && ((f.played = d), (f.url = b))
            }
        }
        a.updateCrossDomainSystemPlayed = function(a, b, d) {
          if (a)
            for (var e = 0; e < a.length; e++) {
              var f = this.findVideoByMonitorKey(a[e])
              f && ((f.systemPlayed = d), (f.url = b))
            }
        }
        a.updateCrossDomainSystemPlayError = function(a, b, d) {
          if (a)
            for (var e = 0; e < a.length; e++) {
              var f = this.findVideoByMonitorKey(a[e])
              f && ((f.systemPlayError = d), (f.url = b))
            }
        }
        a.updatePlayFailed = function(a, b, d) {
          if ((a = this.findVideoByMonitorKey(a)))
            (a.playFailed = d), (a.url = b ? b : '')
        }
        a.beginMonitor = function() {
          if (
            Fa &&
            (this.guid || (this.guid = this.genrateGuid()), !this.monitorBegan)
          ) {
            this.monitorBegan = !0
            for (var a = 0; a < J.length && 10 > a; a++)
              m(function() {
                if (0 != k.videoList.length) {
                  var a = {
                      notifyType: 'videoMonitor',
                      key: k.guid,
                      pageUrl: k.pageUrl,
                      videoStats: k.videoList,
                      timeout: J[k.timeoutIndex++]
                    },
                    a = JSON.stringify(a)
                  k.sendVideoInfoToNative(a)
                }
              }, 1e3 * J[a])
          }
        }
        a.genrateGuid = function() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function(a) {
              var b = (16 * Math.random()) | 0
              return ('x' == a ? b : (b & 3) | 8).toString(16)
            }
          )
        }
        a.generateVideoKey = function() {
          return window.location.host + '_v' + this.curDocVideoCount++
        }
        a.sendVideoInfoToNative = function(a) {
          'undefined' != typeof ucbrowser &&
          ucbrowser.isMethodSupported('videoTagDetected')
            ? ucbrowser.videoTagDetected(a)
            : window.ucapi && window.ucapi.invoke
            ? window.ucapi.invoke('video.videoTagDetected', a)
            : document.addEventListener(
                'UCBrowserReady',
                function() {
                  'undefined' != typeof ucbrowser &&
                  ucbrowser.isMethodSupported('videoTagDetected')
                    ? ucbrowser.videoTagDetected(a)
                    : window.ucapi &&
                      window.ucapi.invoke &&
                      window.ucapi.invoke('video.videoTagDetected', a)
                },
                !1
              )
        }
        return a
      })()
    window.UCV_accept_flvscheme = 1
    window.UC_VIDEO_isFirstDetected = Ca
    window.UC_VIDEO_checkVideoSupported = N
    window.UC_VIDEO_findVideoURL = pa
    window.UC_VIDEO_sniffVideoUrl = na
    window.UC_VIDEO_enableAutoSniff = Da
    window.UC_VIDEO_Playback_Event = Aa
    window.UC_VIDEO_onBackForward = Ba
    window.K_UCKUIWebViewVideoFinder = 0
    var y = ''
    Ea(null)
  }
})()
