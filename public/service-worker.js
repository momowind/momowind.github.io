/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["404/index.html","371ff80c7751c6e34549f69fa79ce155"],["Deploy-Hexo-to-Raspberry-Pi-and-Github/index.html","4073ca3681e04841757e4a7250e02e57"],["Hexo-Frp-iAWriter-Overclocked-Blogger/index.html","2f472f94a594e5d06cf19997c2d28ade"],["about/index.html","0121055db5a1f7b406c81f26e52de4f8"],["archives/2020/02/index.html","004e9c5b0ce018264a470e820348b083"],["archives/2020/03/index.html","ae749640e906454b35f2ecd5e43158c1"],["archives/2020/04/index.html","bb9f13b01d54c0adb9574dcd9f386ef9"],["archives/2020/index.html","cfa0c3b9947dc1bc19fbd9e8c68845e3"],["archives/index.html","99b558a6c87c1287ed9cc720a235f941"],["categories/index.html","000f4cb0eb6afef880cbefbdbe8e676d"],["categories/学习/index.html","a68711107e5d3ecee1374729cf3f812d"],["categories/树梅派/index.html","2fb6b90645ca5abf7ed228f959ca2a36"],["categories/网站/index.html","c55b2524da0faa98eeb0c901f4a43309"],["css/style.css","204b48ab9ac286c61aa33a0af4f5709c"],["fonts/Monaco.ttf","7d1b5cf51af724a2641a89a881b342fe"],["fonts/Skranji-Regular.ttf","0f860580e235e4ae4ae655c2bbb9c943"],["fonts/Ubuntu-Regular.ttf","75adbf87abbf62e27f6a738caeb71f75"],["friends/index.html","563b053cac7a1456a0d97e72f6679465"],["from-san-francisco-to-singapore-we-finally-arrived-in-seoul/index.html","07e65ab7b6a112f47c498025f3f4f665"],["images/2020/02/Apple-iMac.jpg","10f5226bd70b632f67e52d75d8031ae0"],["images/2020/02/artificial-intelligence-conscious-3d-illustration-neuron-concept-ai-consciousness-592921421.jpg","0e5e1057890d32499c9b41dfb2fd1954"],["images/2020/02/quantum.jpg","69374b62890f46635205577c4596d132"],["images/2020/02/seoul.jpg","93ca9d46b83c8199db2f45c06b235709"],["images/2020/03/Crevisio-101-vOIDtN8rT.jpg","c8e453424ba6874f43eb988acabfa632"],["images/2020/03/IMG_2377.jpg","f3e6bf2c01804b0a498cdca7d23d3acb"],["images/2020/03/IMG_2391-scaled.jpg","f0109ca94def4f113296bd62f06bcc3f"],["images/2020/03/IMG_2391.jpg","dc9f8afe1223be603131c84cc8b55d66"],["images/2020/03/pi.png","35adbd73d2fda7b40f95c59090b238cc"],["images/2020/03/pi3.5.jpg","bf654ce61a30a4b48eb9dd0adc9fbdb9"],["images/2020/03/pi3.52.jpg","ce634369c07c7121d154039e1e5c36be"],["images/2020/03/pi4shan.png","5f99a41561c821b2c3546e78f101f0b7"],["images/2020/03/psychedelic-treatments-consciousness-disorder-news-oct-2019.jpg","f57d51425a28ad408b3bb176f079346b"],["images/2020/04/ac1200-scaled.jpg","f33ef77274824ca4f338d53de83f2058"],["images/2020/04/ac1200.jpg","be1956d8092833ef351b9923fe6271a9"],["images/2020/04/ac1200m.jpg","e331b34554c3da1d0f003d802fe1fdde"],["images/2020/04/hexo-index.png","328f8a151b5b15402f5ad78ee2f14851"],["images/2020/04/hexopi.jpg","47320d240c2148fca7c36114603c387d"],["images/2020/04/spi-black.jpg","fcb9b6461fac0dbf5bfa4f1d212b0635"],["images/2020/04/spi-night.jpg","e2bd386f7157dde789555927101b242d"],["images/2020/04/spi-scaled.jpg","3a7c56694fddbda75b390a4cb5725c60"],["images/2020/04/spi.jpg","5b5e6fdc3f17e18bb11c16560f5c966d"],["images/2020/04/sys_info.jpg","264a81c10b69e55fcc38e9afbaa1dd05"],["images/background/index.jpg","12ddb45072a7eac5c82688848d798ca7"],["images/background/index3.jpg","69d6874e0726a1199feac178b32c9e35"],["img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["img/azure.svg","570248db796e292bf7b59a650cd079c8"],["img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["index.html","016aa7d3341fbeced1ae445a1167c15c"],["js/app.js","ea306851b6276a0ffeec351d138589e5"],["js/busuanzi.pure.mini.js","4c9a89414b97bb2053ccc7cb83c83b6e"],["js/comment_typing.js","ab7b34f055a2bf8e036daec67e968d1a"],["js/instant_page.js","1a3be845085b8d94a2997a3a472feb42"],["js/jinrishici.js","2908509a9dcc3568f599286d64932af3"],["js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["js/valine.js","a2d5ecdb8234d2c5f61aac757ebf73fb"],["meet-again-why-is-purel-in/index.html","9963d31eac3244e1c872eb169ee7fa6f"],["mylist/index.html","0a18a1995f5de12e0e6b95986c9d1a59"],["raspberry-pi-install-0-96-inch-spi-interface-ssd1306-screen/index.html","365fecff93103fc42e62b1cd44de3854"],["raspberry-pi-install-rtl8812bu-dual-band-wireless-network-card-driver/index.html","7d8c90114c450082f9eb7aba72cab779"],["raspberry-pi-quantum-cloud-lab-in-your-pocket-hardware/index.html","e94d3b78a0c9a9e527f037c7dba0f5e2"],["raspberry-pi-quantum-cloud-lab-in-your-pocket-software/index.html","2615834f043d2271e53a8b4af3fe34e8"],["seven-practices-of-great-leaders/index.html","aab1024d44aa7b007da34525cf62ed35"],["tags/3-5inch/index.html","112a7afed9d969b96e83f4608bfb6d05"],["tags/Blog/index.html","12f480ecd373197190f9c2c6c5d8ac26"],["tags/Frp/index.html","af52189f8bd1bcfa9c74e5df225fc8fe"],["tags/Github/index.html","68d5ea116fc38424f2c0169f1ecaa85e"],["tags/Hexo/index.html","d129ce6e4ab5cb4db6da32f6f4eaac6a"],["tags/LCD/index.html","bdab9c24d2170ca7276e00a5d7e15ccb"],["tags/Leadership/index.html","84cee21e4d7d321c1743b517c9302436"],["tags/Lofree/index.html","b283f6e4231d48ba5a0559059a980bae"],["tags/Markdown/index.html","00896781cceb25a9524ea1835f14c05c"],["tags/Pi/index.html","b28d4c35f6396b963c1a12e5b01544b0"],["tags/Purel-in/index.html","40a5c6eae66ddd0d572978a6f185847b"],["tags/Python/index.html","fb741b9043e7b8172108e048d33691b9"],["tags/SPI/index.html","5053c40486d9eb8cb326d75fa0275962"],["tags/SSH/index.html","22df0c02c54c3fb2ab2e39b3729821c7"],["tags/SSR/index.html","9b9e1bb0cf88e6a6cc1e5138f7323f83"],["tags/Samba/index.html","ad728eab4cb7907fa11bfa78dfd492cb"],["tags/WIFI/index.html","38e74f4f27245aca5e8fac97c3fecb93"],["tags/Wordpress/index.html","96ae0f4998885bd6af575cee1f952e2f"],["tags/iA-Writer/index.html","e4493aecb22ae12b100658dcd7508587"],["tags/index.html","e5ef369d802971357fecaf80140b7684"],["tags/root/index.html","ba291e74281ef27919e07add85fa8942"],["tags/rtl8812bu/index.html","c6dbc4126b317670ca068b925d0d0d1b"],["tags/ssd1306/index.html","9159325e35c8c926ffbbab55dc7d6c3a"],["tags/修炼/index.html","6fa468864a2d6c852a6e52ba5803f0c9"],["tags/内网穿透/index.html","e201ca3dd2ae362dbcd2a67a082a3552"],["tags/合一/index.html","e7f50173541563880f65f0a3a26cab60"],["tags/学习/index.html","0b6d1219c670807c6cce1faa4cc4c33e"],["tags/数据中心/index.html","e4d743a071636c4119d88ac2799009cf"],["tags/无线网卡/index.html","90b48cf8aaf03d363cec01f142b5a450"],["tags/服务器/index.html","cb1ec1f65d65c82e3251c1a95a0f37f8"],["tags/树梅派/index.html","765d4a0fe5b11442b6846780f533fb05"],["tags/树莓派/index.html","657d990c7e6fa29068e71d6ee530579d"],["tags/疫情/index.html","e54c7b7f91900f38157f5d7a3e2285d5"],["tags/领导力/index.html","593edc06050f57148cbdfa89903772ce"],["tags/驱动/index.html","77c8325038cbea7a859b2d8e23dd142f"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







