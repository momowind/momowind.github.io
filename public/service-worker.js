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

var precacheConfig = [["/404/index.html","d3332c2e0ba168b382327d31abab2c2e"],["/Hexo-Github-Overclocked-Blog/index.html","ada3cda1d1379f5debd5313a3ba70707"],["/about/index.html","d4ba77b3e6b6926c6679e151ee87063e"],["/archives/2020/02/index.html","1deffb3f815617cf1332939e995f2208"],["/archives/2020/03/index.html","10293b5e675b0297df170bbf8e802585"],["/archives/2020/04/index.html","94766b6e6203dd7b86c8b738879a1174"],["/archives/2020/index.html","ad8f4220eaeef0cd269f7ab2867389c5"],["/archives/index.html","749397316f9f0f375641c675ad67830d"],["/categories/index.html","fb0f16d53c00f66857c518b8b29d30f2"],["/categories/树梅派/index.html","ae2b3226836ab1d3f38e0fdbbdc9a163"],["/categories/网站/index.html","c19159bbe2028cc1947e9df2d7ef5be3"],["/categories/领导力/index.html","55cebc35b5f748af708e24acf85b3911"],["/css/style.css","204b48ab9ac286c61aa33a0af4f5709c"],["/fonts/Monaco.ttf","7d1b5cf51af724a2641a89a881b342fe"],["/fonts/Skranji-Regular.ttf","0f860580e235e4ae4ae655c2bbb9c943"],["/fonts/Ubuntu-Regular.ttf","75adbf87abbf62e27f6a738caeb71f75"],["/friends/index.html","ac02232a7a899ea6a43d8acd71471efc"],["/from-san-francisco-to-singapore-we-finally-arrived-in-seoul/index.html","616624707b3271bfd13bdde1895e05f6"],["/images/2020/02/Apple-iMac.jpg","10f5226bd70b632f67e52d75d8031ae0"],["/images/2020/02/artificial-intelligence-conscious-3d-illustration-neuron-concept-ai-consciousness-592921421.jpg","0e5e1057890d32499c9b41dfb2fd1954"],["/images/2020/02/quantum.jpg","69374b62890f46635205577c4596d132"],["/images/2020/02/seoul.jpg","93ca9d46b83c8199db2f45c06b235709"],["/images/2020/03/Crevisio-101-vOIDtN8rT.jpg","c8e453424ba6874f43eb988acabfa632"],["/images/2020/03/IMG_2377.jpg","f3e6bf2c01804b0a498cdca7d23d3acb"],["/images/2020/03/IMG_2391-scaled.jpg","f0109ca94def4f113296bd62f06bcc3f"],["/images/2020/03/IMG_2391.jpg","dc9f8afe1223be603131c84cc8b55d66"],["/images/2020/03/pi.png","35adbd73d2fda7b40f95c59090b238cc"],["/images/2020/03/pi3.5.jpg","bf654ce61a30a4b48eb9dd0adc9fbdb9"],["/images/2020/03/pi3.52.jpg","ce634369c07c7121d154039e1e5c36be"],["/images/2020/03/pi4shan.png","5f99a41561c821b2c3546e78f101f0b7"],["/images/2020/03/psychedelic-treatments-consciousness-disorder-news-oct-2019.jpg","f57d51425a28ad408b3bb176f079346b"],["/images/2020/04/ac1200-scaled.jpg","f33ef77274824ca4f338d53de83f2058"],["/images/2020/04/ac1200.jpg","be1956d8092833ef351b9923fe6271a9"],["/images/2020/04/ac1200m.jpg","c4de60daf61328fcf049d6b1a80a2271"],["/images/2020/04/hexo-index.png","328f8a151b5b15402f5ad78ee2f14851"],["/images/2020/04/spi-black.jpg","fcb9b6461fac0dbf5bfa4f1d212b0635"],["/images/2020/04/spi-night.jpg","e2bd386f7157dde789555927101b242d"],["/images/2020/04/spi-scaled.jpg","3a7c56694fddbda75b390a4cb5725c60"],["/images/2020/04/spi.jpg","5b5e6fdc3f17e18bb11c16560f5c966d"],["/images/2020/04/sys_info.jpg","264a81c10b69e55fcc38e9afbaa1dd05"],["/images/background/index.jpg","12ddb45072a7eac5c82688848d798ca7"],["/images/background/index3.jpg","69d6874e0726a1199feac178b32c9e35"],["/img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["/img/azure.svg","570248db796e292bf7b59a650cd079c8"],["/img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["/index.html","1133ed6fe7c022d4e0f879929432ad97"],["/js/app.js","ea306851b6276a0ffeec351d138589e5"],["/js/busuanzi.pure.mini.js","4c9a89414b97bb2053ccc7cb83c83b6e"],["/js/comment_typing.js","ab7b34f055a2bf8e036daec67e968d1a"],["/js/instant_page.js","1a3be845085b8d94a2997a3a472feb42"],["/js/jinrishici.js","2908509a9dcc3568f599286d64932af3"],["/js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["/js/valine.js","a2d5ecdb8234d2c5f61aac757ebf73fb"],["/meet-again-why-is-purel-in/index.html","e4cd7bc379032520ab320e6ecc16eddd"],["/mylist/index.html","06e756daa4509fe0b0d152f58f34e1ae"],["/raspberry-pi-install-0-96-inch-spi-interface-ssd1306-screen/index.html","4380a88d3bc4d0078344793849a6e520"],["/raspberry-pi-install-rtl8812bu-dual-band-wireless-network-card-driver/index.html","c6fc5fb14d0dacca147ccd53e0f7225b"],["/raspberry-pi-quantum-cloud-lab-in-your-pocket-hardware/index.html","962db5e996ef0a34c64868eff02149a8"],["/raspberry-pi-quantum-cloud-lab-in-your-pocket-software/index.html","6e95a0b9ab3382a63c3fab161288e41b"],["/seven-practices-of-great-leaders/index.html","00e72377bec4c34582bac4c6defd7a95"],["/tags/3-5inch/index.html","762343704ad5197dbb687952422030b2"],["/tags/Blog/index.html","83dcb16cdad74d094ec50ec6e8805673"],["/tags/Frp/index.html","23a74a69e8e19fa33e4b0bb433506d87"],["/tags/Hexo/index.html","adcfd9fa1002cd5f8a4a5d4e86f26ea4"],["/tags/LCD/index.html","0f472fa2a5c9b383b7239d7462d5647e"],["/tags/Leadership/index.html","7049697f8c0415e4d4fa30f7b78e2ab8"],["/tags/Lofree/index.html","db117751518c61a0191698a5c1f90689"],["/tags/Markdown/index.html","3d764832ac026e4e33f3fe5f19eea9ee"],["/tags/Pi/index.html","168e360a1272c36ef700fe4b81ab9c4d"],["/tags/Purel-in/index.html","28d6576806b6f77c353f7ebba52609df"],["/tags/Python/index.html","fa8b2751994d913e2515c951300b6ac9"],["/tags/SPI/index.html","971dbb7b880a29269b8fedc520a4b100"],["/tags/SSH/index.html","a2e983e4403324c73a49f06e4752d622"],["/tags/SSR/index.html","e91d27611b92ae8d9f0caee62ccb6749"],["/tags/WIFI/index.html","611480851a49a7b0f36a49ffd2849cbb"],["/tags/Wordpress/index.html","ce5d4c6a1bf92e086dadcc8ae5122cd0"],["/tags/index.html","f14df93f82835d023e52353a4faab227"],["/tags/root/index.html","c6ddb1e07e86f86066babc160e86dc67"],["/tags/rtl8812bu/index.html","3a0f600b79f403f6518d625a3080303a"],["/tags/ssd1306/index.html","1280e74d698e90182bc8c499182df9e7"],["/tags/修炼/index.html","c2c405ae22a9e6396c43be2bd0d39daa"],["/tags/内网穿透/index.html","295baaf44abb312d1e50ebcdac521fc3"],["/tags/合一/index.html","3603c56cb2b028ea96d06a0f8562cfb6"],["/tags/数据中心/index.html","b540cdb7ab76bcb67f8f4ee8345b0c18"],["/tags/无线网卡/index.html","df95a89c8bd6e73b7ab26c5850970362"],["/tags/服务器/index.html","961f6856eafa9f920a26f2c7a9e5379c"],["/tags/树梅派/index.html","29223d3b364ae316633f2e2860709225"],["/tags/疫情/index.html","51984b9ebb118de3f370350541cc67fa"],["/tags/领导力/index.html","de3a6a432a6429fc217f42830c8c751a"],["/tags/驱动/index.html","bbc34fb12c9aee5c521efbd9316d82d7"]];
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







