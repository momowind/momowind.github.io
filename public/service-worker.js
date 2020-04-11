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

var precacheConfig = [["/404/index.html","bd99d7304d99cb134ce4c7a756d1b81c"],["/Hexo-Frp-iAWriter-Overclocked-Blogger/index.html","17c408eaede484cfd588982fac5330b8"],["/about/index.html","4d4c55fcb96dd783afb019f474f9da78"],["/archives/2020/02/index.html","b4ce617c5f023a465beedfc1b07daf2c"],["/archives/2020/03/index.html","bf50e5b4c09ba2f3fb29bc79ae919eea"],["/archives/2020/04/index.html","43a84295f56d86a484b91e415eb4e572"],["/archives/2020/index.html","5035f01c92da78d522a7a89c3049db9d"],["/archives/index.html","c133dfd9ab3a10738e26eff0b01908b1"],["/categories/index.html","e6aa364dc3f4d72bfc509bd4038e8754"],["/categories/学习/index.html","5a6d163d59127b8c082c053707ceac78"],["/categories/树梅派/index.html","d8467865d228bbce1be97637aef3528a"],["/categories/网站/index.html","72a2787a490cc5a09d910317ff56e81f"],["/css/style.css","204b48ab9ac286c61aa33a0af4f5709c"],["/fonts/Monaco.ttf","7d1b5cf51af724a2641a89a881b342fe"],["/fonts/Skranji-Regular.ttf","0f860580e235e4ae4ae655c2bbb9c943"],["/fonts/Ubuntu-Regular.ttf","75adbf87abbf62e27f6a738caeb71f75"],["/friends/index.html","973e0ea94e026301ed260815d902caa9"],["/from-san-francisco-to-singapore-we-finally-arrived-in-seoul/index.html","ff7015ab5aaaf747b2ea4b22ebc39793"],["/images/2020/02/Apple-iMac.jpg","10f5226bd70b632f67e52d75d8031ae0"],["/images/2020/02/artificial-intelligence-conscious-3d-illustration-neuron-concept-ai-consciousness-592921421.jpg","0e5e1057890d32499c9b41dfb2fd1954"],["/images/2020/02/quantum.jpg","69374b62890f46635205577c4596d132"],["/images/2020/02/seoul.jpg","93ca9d46b83c8199db2f45c06b235709"],["/images/2020/03/Crevisio-101-vOIDtN8rT.jpg","c8e453424ba6874f43eb988acabfa632"],["/images/2020/03/IMG_2377.jpg","f3e6bf2c01804b0a498cdca7d23d3acb"],["/images/2020/03/IMG_2391-scaled.jpg","f0109ca94def4f113296bd62f06bcc3f"],["/images/2020/03/IMG_2391.jpg","dc9f8afe1223be603131c84cc8b55d66"],["/images/2020/03/pi.png","35adbd73d2fda7b40f95c59090b238cc"],["/images/2020/03/pi3.5.jpg","bf654ce61a30a4b48eb9dd0adc9fbdb9"],["/images/2020/03/pi3.52.jpg","ce634369c07c7121d154039e1e5c36be"],["/images/2020/03/pi4shan.png","5f99a41561c821b2c3546e78f101f0b7"],["/images/2020/03/psychedelic-treatments-consciousness-disorder-news-oct-2019.jpg","f57d51425a28ad408b3bb176f079346b"],["/images/2020/04/ac1200-scaled.jpg","f33ef77274824ca4f338d53de83f2058"],["/images/2020/04/ac1200.jpg","be1956d8092833ef351b9923fe6271a9"],["/images/2020/04/ac1200m.jpg","c4de60daf61328fcf049d6b1a80a2271"],["/images/2020/04/hexo-index.png","328f8a151b5b15402f5ad78ee2f14851"],["/images/2020/04/spi-black.jpg","fcb9b6461fac0dbf5bfa4f1d212b0635"],["/images/2020/04/spi-night.jpg","e2bd386f7157dde789555927101b242d"],["/images/2020/04/spi-scaled.jpg","3a7c56694fddbda75b390a4cb5725c60"],["/images/2020/04/spi.jpg","5b5e6fdc3f17e18bb11c16560f5c966d"],["/images/2020/04/sys_info.jpg","264a81c10b69e55fcc38e9afbaa1dd05"],["/images/background/index.jpg","12ddb45072a7eac5c82688848d798ca7"],["/images/background/index3.jpg","69d6874e0726a1199feac178b32c9e35"],["/img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["/img/azure.svg","570248db796e292bf7b59a650cd079c8"],["/img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["/index.html","1be850ac342a348cb04d9a729fec1878"],["/js/app.js","ea306851b6276a0ffeec351d138589e5"],["/js/busuanzi.pure.mini.js","4c9a89414b97bb2053ccc7cb83c83b6e"],["/js/comment_typing.js","ab7b34f055a2bf8e036daec67e968d1a"],["/js/instant_page.js","1a3be845085b8d94a2997a3a472feb42"],["/js/jinrishici.js","2908509a9dcc3568f599286d64932af3"],["/js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["/js/valine.js","a2d5ecdb8234d2c5f61aac757ebf73fb"],["/meet-again-why-is-purel-in/index.html","ae1f3f1783fe5b7df1fa65ab1e96be61"],["/mylist/index.html","423917a0a4b4dffb73da0a95b9e43bb3"],["/raspberry-pi-install-0-96-inch-spi-interface-ssd1306-screen/index.html","70ffae7adee9fe8f230acaccdcac93ba"],["/raspberry-pi-install-rtl8812bu-dual-band-wireless-network-card-driver/index.html","69f5f2d7709f89ed59687e81ecac9d79"],["/raspberry-pi-quantum-cloud-lab-in-your-pocket-hardware/index.html","9fabf1b8d1916af4a1760a410f775bb7"],["/raspberry-pi-quantum-cloud-lab-in-your-pocket-software/index.html","ff46ff6240a8554d894b56eed149d611"],["/seven-practices-of-great-leaders/index.html","47480dd77750b81d6c149286c7c76aef"],["/tags/3-5inch/index.html","7d98905fe7fd59dcc4607f65546b2cce"],["/tags/Blog/index.html","60aac731d81f0a0f269617ddc0926ac9"],["/tags/Frp/index.html","40a0e8cd158c516b9067a0d5c356a9b0"],["/tags/Hexo/index.html","2f50b227b519ae29b584e8097c24812c"],["/tags/LCD/index.html","cb6cbf1ed94bdb97424fa9055c1fe752"],["/tags/Leadership/index.html","fdc3d25a1e16882de085628fb13efa8c"],["/tags/Lofree/index.html","431d4597843c349075713ca76064e59b"],["/tags/Markdown/index.html","5a13b634eefc748a00f6ba18786fae24"],["/tags/Pi/index.html","0c5e3726134eb37197ce475672b38598"],["/tags/Purel-in/index.html","742a483d8a22d4cb0f2a7fc2f0a1f314"],["/tags/Python/index.html","d9db902a70b8300d41313a8fdf576ecf"],["/tags/SPI/index.html","a3f210ea2071a06cd2bd8a134cb57540"],["/tags/SSH/index.html","c49d860c1d0ed575e905070958656ae3"],["/tags/SSR/index.html","6520234b316ad4defecd053ed826119e"],["/tags/Samba/index.html","722c0ac25fba645a412be860b48fb2e6"],["/tags/WIFI/index.html","05cf093b81718b49e3e8513f4251e5a6"],["/tags/Wordpress/index.html","c0f5368c17dbbd5ad169566b2145b4fc"],["/tags/iA-Writer/index.html","9c013c04f4a1c16113d5764a96839d19"],["/tags/index.html","bdfb8c765a5aeed92d644de5217a19c8"],["/tags/root/index.html","5f06cda2c17395567f90b91f853d19ca"],["/tags/rtl8812bu/index.html","e1a87176f645e2e0fea0db061bcf9199"],["/tags/ssd1306/index.html","5257b23a08ee4e8da8011c30b5d42a2a"],["/tags/修炼/index.html","df42bc8bec1560b4d5bab0df7cd33865"],["/tags/内网穿透/index.html","2be04950956fbe0eff69c4f674e8e62d"],["/tags/合一/index.html","c0c1576b2c98edc2d87a57285a3dffe3"],["/tags/学习/index.html","32b3980b3053d72f18655a37e35ee261"],["/tags/数据中心/index.html","9936cbe8ac5a65807f86b5c460786a1a"],["/tags/无线网卡/index.html","7b9fc937f17fa1c65d6fb88cc8c375dc"],["/tags/服务器/index.html","4395380f02bc42330f53c71548d397ad"],["/tags/树梅派/index.html","8183b183ab723ebd1a3b348230e7ee30"],["/tags/树莓派/index.html","23d09dfb526c98d410a347e344fa3c97"],["/tags/疫情/index.html","92ef07c6ec82b75cd6996dd0292c610e"],["/tags/领导力/index.html","a5e1cd997b27bfa3df0f38eb02727484"],["/tags/驱动/index.html","1882b0cd60ac442f952e26507a515d23"]];
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







