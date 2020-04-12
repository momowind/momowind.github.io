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

var precacheConfig = [["404/index.html","b012e39f420eede5bca69e0b19a44780"],["Deploy-Hexo-to-Raspberry-Pi-and-Github/index.html","9c9b51dfc20231c36e69786a39191b6b"],["Hexo-Frp-iAWriter-Overclocked-Blogger/index.html","0d2590f280edb33ff786cf0ffeb1f9fc"],["about/index.html","b48f0086daeaaa5be962293eaa0129fc"],["archives/2020/02/index.html","cfdf12881030992f4cfc2fb7d5541323"],["archives/2020/03/index.html","e69a53ae6609ee1d605ecfeced15c807"],["archives/2020/04/index.html","0422a982d7e9dc4dad37d96b82be84a7"],["archives/2020/index.html","84b56396b269946f185eb04184a4e596"],["archives/index.html","80ebc241712253ac46186abb448c20c2"],["categories/index.html","8e4af3e4c9ddc8e9a537622c49ea8578"],["categories/学习/index.html","53a74acf8a0325183b5ce8be2e56bc16"],["categories/树梅派/index.html","4a1dfd373bc432de3da85c07f5f4ca4f"],["categories/网站/index.html","a789aa0283cfa4aca428c3fe9f7e198c"],["css/style.css","204b48ab9ac286c61aa33a0af4f5709c"],["fonts/Monaco.ttf","7d1b5cf51af724a2641a89a881b342fe"],["fonts/Skranji-Regular.ttf","0f860580e235e4ae4ae655c2bbb9c943"],["fonts/Ubuntu-Regular.ttf","75adbf87abbf62e27f6a738caeb71f75"],["friends/index.html","5233b7791d85e56420eebfdc64cc83ff"],["from-san-francisco-to-singapore-we-finally-arrived-in-seoul/index.html","de22883ddf1312d08140051489e2987f"],["images/2020/02/Apple-iMac.jpg","10f5226bd70b632f67e52d75d8031ae0"],["images/2020/02/artificial-intelligence-conscious-3d-illustration-neuron-concept-ai-consciousness-592921421.jpg","0e5e1057890d32499c9b41dfb2fd1954"],["images/2020/02/quantum.jpg","69374b62890f46635205577c4596d132"],["images/2020/02/seoul.jpg","93ca9d46b83c8199db2f45c06b235709"],["images/2020/03/Crevisio-101-vOIDtN8rT.jpg","c8e453424ba6874f43eb988acabfa632"],["images/2020/03/IMG_2377.jpg","f3e6bf2c01804b0a498cdca7d23d3acb"],["images/2020/03/IMG_2391-scaled.jpg","f0109ca94def4f113296bd62f06bcc3f"],["images/2020/03/IMG_2391.jpg","dc9f8afe1223be603131c84cc8b55d66"],["images/2020/03/pi.png","35adbd73d2fda7b40f95c59090b238cc"],["images/2020/03/pi3.5.jpg","bf654ce61a30a4b48eb9dd0adc9fbdb9"],["images/2020/03/pi3.52.jpg","ce634369c07c7121d154039e1e5c36be"],["images/2020/03/pi4shan.png","5f99a41561c821b2c3546e78f101f0b7"],["images/2020/03/psychedelic-treatments-consciousness-disorder-news-oct-2019.jpg","f57d51425a28ad408b3bb176f079346b"],["images/2020/04/ac1200-scaled.jpg","f33ef77274824ca4f338d53de83f2058"],["images/2020/04/ac1200.jpg","be1956d8092833ef351b9923fe6271a9"],["images/2020/04/ac1200m.jpg","e331b34554c3da1d0f003d802fe1fdde"],["images/2020/04/hexo-index.png","328f8a151b5b15402f5ad78ee2f14851"],["images/2020/04/hexopi.jpg","47320d240c2148fca7c36114603c387d"],["images/2020/04/spi-black.jpg","fcb9b6461fac0dbf5bfa4f1d212b0635"],["images/2020/04/spi-night.jpg","e2bd386f7157dde789555927101b242d"],["images/2020/04/spi-scaled.jpg","3a7c56694fddbda75b390a4cb5725c60"],["images/2020/04/spi.jpg","5b5e6fdc3f17e18bb11c16560f5c966d"],["images/2020/04/sys_info.jpg","264a81c10b69e55fcc38e9afbaa1dd05"],["images/background/index.jpg","12ddb45072a7eac5c82688848d798ca7"],["images/background/index3.jpg","69d6874e0726a1199feac178b32c9e35"],["img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["img/azure.svg","570248db796e292bf7b59a650cd079c8"],["img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["index.html","16e6b707adffb44547efa794182b2463"],["js/app.js","ea306851b6276a0ffeec351d138589e5"],["js/busuanzi.pure.mini.js","4c9a89414b97bb2053ccc7cb83c83b6e"],["js/comment_typing.js","ab7b34f055a2bf8e036daec67e968d1a"],["js/instant_page.js","1a3be845085b8d94a2997a3a472feb42"],["js/jinrishici.js","2908509a9dcc3568f599286d64932af3"],["js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["js/valine.js","a2d5ecdb8234d2c5f61aac757ebf73fb"],["meet-again-why-is-purel-in/index.html","30c70ed81845e040df49167a498c4348"],["mylist/index.html","766c0522c308dcdd51b2be4738922ba6"],["raspberry-pi-install-0-96-inch-spi-interface-ssd1306-screen/index.html","928ad9fb6ab42bd1020e397b2658926e"],["raspberry-pi-install-rtl8812bu-dual-band-wireless-network-card-driver/index.html","245cd00d0f9f6870cbd917443a129656"],["raspberry-pi-quantum-cloud-lab-in-your-pocket-hardware/index.html","5f980a7680e4b57f0c09f809fdc33150"],["raspberry-pi-quantum-cloud-lab-in-your-pocket-software/index.html","819224ce1d3b74b83b4de8540a298724"],["seven-practices-of-great-leaders/index.html","2b704f0d0b1ff2438c0c714e458a50fd"],["tags/3-5inch/index.html","20585ef97161142202a4f8ab4ebdd9bf"],["tags/Blog/index.html","303428496065944eddf63e49e32b2522"],["tags/Frp/index.html","b290ee4f9e2b3de4fe017623da0fe579"],["tags/Github/index.html","0a06378cfd0715e58ebf6416aea22673"],["tags/Hexo/index.html","675bf370a2667bf00e8df3f41ce21920"],["tags/LCD/index.html","5d3b55d044332b1ddd086e3be7aa80db"],["tags/Leadership/index.html","105995c3266e6d388dfdb598bd8ad57d"],["tags/Lofree/index.html","0c36904455e75a0a1b2197b68a3b279a"],["tags/Markdown/index.html","019c4fbb57e5c23b1e3ce3dad493987c"],["tags/Pi/index.html","367826b37dd96cf76b987c5526393b27"],["tags/Purel-in/index.html","fc1e24374e03a10da79cca9b0f22cfe0"],["tags/Python/index.html","4d545054f27d95db2f1357c1b585a66b"],["tags/SPI/index.html","0e1b4b95d4630bc8d7b7219804207758"],["tags/SSH/index.html","eef3ff5c2b0ceb213850b7d3797c0da1"],["tags/SSR/index.html","075b005eecd362391a7ee077de9653b8"],["tags/Samba/index.html","ef2f66dafe1fd91da390c848019085a1"],["tags/WIFI/index.html","eb61605475df99fa4ea9a551835f71cb"],["tags/Wordpress/index.html","8206d1360b5ab42896c64d25bbb4c55d"],["tags/iA-Writer/index.html","9a347ac0ff9f269fff3c339433be9869"],["tags/index.html","622f595c8e8a50d86777929497a5e23b"],["tags/root/index.html","f20039e3d0ba6d56487f2061e74c6a02"],["tags/rtl8812bu/index.html","97d9dc2c4a55f65a5f6e829471c7ca61"],["tags/ssd1306/index.html","d1319b1413f9c1665aa1f321090393f3"],["tags/修炼/index.html","f2bddf070010fad45bb0a70187ec3773"],["tags/内网穿透/index.html","6b9ac190ddf6fe73015cd17c16e47453"],["tags/合一/index.html","aa90e3853ed982e9c08a70963eab8360"],["tags/学习/index.html","fdec9f8c476beff5aa8739fa545bbde4"],["tags/数据中心/index.html","f9cdd2b85dd307594635ec6f1c26915a"],["tags/无线网卡/index.html","ac2c29a181dca8e8983f5f8f24407c51"],["tags/服务器/index.html","39a164dc886fc1472cdacd6effdb35b7"],["tags/树梅派/index.html","876478c4bddf8d5166c69317da74b1a9"],["tags/树莓派/index.html","03bf9f780e901f380ae6af45355abc43"],["tags/疫情/index.html","0b3445ce0234e31b64b068b856ceb4c3"],["tags/领导力/index.html","7d6516e78b2371348ef069ce6af70968"],["tags/驱动/index.html","f740a2185cf966d4514d40dde4adc14a"]];
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







