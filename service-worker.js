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

var precacheConfig = [["404/index.html","bda10ca2e23dfb9a9a6e3f24e687a1d1"],["Deploy-Hexo-to-Raspberry-Pi-and-Github/index.html","f9828c9fc3af541b6655c3ca00df3867"],["Hexo-Frp-iAWriter-Overclocked-Blogger/index.html","87835f4e4d81d4d4c28fb8e4f67ccad4"],["about/index.html","fcd93fa8bc7e282a3e6df4aa85020248"],["archives/2020/02/index.html","745989bf993a0823bca7592f952f0e37"],["archives/2020/03/index.html","f3568ed158348fa678ed8b06940f0911"],["archives/2020/04/index.html","3296f3f12347a2c680a9e99fc4c83fca"],["archives/2020/index.html","1decd32167768fec70be347fcb4ca347"],["archives/index.html","e733db1c30d1686ad940db2bf72d2e48"],["categories/index.html","3757f6f590555bae00c5b91f8079eba6"],["categories/学习/index.html","928f73a4cfd5008efa7530d2d6b22dd6"],["categories/树梅派/index.html","584587a1cfc3ced22a89e436d0f85378"],["categories/网站/index.html","54a46e54eaa8143361b7be4f38ad115e"],["css/style.css","204b48ab9ac286c61aa33a0af4f5709c"],["fonts/Monaco.ttf","7d1b5cf51af724a2641a89a881b342fe"],["fonts/Skranji-Regular.ttf","0f860580e235e4ae4ae655c2bbb9c943"],["fonts/Ubuntu-Regular.ttf","75adbf87abbf62e27f6a738caeb71f75"],["friends/index.html","8b2b837125e2962ab59b26fe8c38818b"],["from-san-francisco-to-singapore-we-finally-arrived-in-seoul/index.html","87ab819875c8cc579573102849730023"],["images/2020/02/Apple-iMac.jpg","10f5226bd70b632f67e52d75d8031ae0"],["images/2020/02/artificial-intelligence-conscious-3d-illustration-neuron-concept-ai-consciousness-592921421.jpg","0e5e1057890d32499c9b41dfb2fd1954"],["images/2020/02/quantum.jpg","69374b62890f46635205577c4596d132"],["images/2020/02/seoul.jpg","93ca9d46b83c8199db2f45c06b235709"],["images/2020/03/Crevisio-101-vOIDtN8rT.jpg","c8e453424ba6874f43eb988acabfa632"],["images/2020/03/IMG_2377.jpg","f3e6bf2c01804b0a498cdca7d23d3acb"],["images/2020/03/IMG_2391-scaled.jpg","f0109ca94def4f113296bd62f06bcc3f"],["images/2020/03/IMG_2391.jpg","dc9f8afe1223be603131c84cc8b55d66"],["images/2020/03/pi.png","35adbd73d2fda7b40f95c59090b238cc"],["images/2020/03/pi3.5.jpg","bf654ce61a30a4b48eb9dd0adc9fbdb9"],["images/2020/03/pi3.52.jpg","ce634369c07c7121d154039e1e5c36be"],["images/2020/03/pi4shan.png","5f99a41561c821b2c3546e78f101f0b7"],["images/2020/03/psychedelic-treatments-consciousness-disorder-news-oct-2019.jpg","f57d51425a28ad408b3bb176f079346b"],["images/2020/04/ac1200-scaled.jpg","f33ef77274824ca4f338d53de83f2058"],["images/2020/04/ac1200.jpg","be1956d8092833ef351b9923fe6271a9"],["images/2020/04/ac1200m.jpg","e331b34554c3da1d0f003d802fe1fdde"],["images/2020/04/hexo-index.png","328f8a151b5b15402f5ad78ee2f14851"],["images/2020/04/hexopi.jpg","47320d240c2148fca7c36114603c387d"],["images/2020/04/spi-black.jpg","fcb9b6461fac0dbf5bfa4f1d212b0635"],["images/2020/04/spi-night.jpg","e2bd386f7157dde789555927101b242d"],["images/2020/04/spi-scaled.jpg","3a7c56694fddbda75b390a4cb5725c60"],["images/2020/04/spi.jpg","5b5e6fdc3f17e18bb11c16560f5c966d"],["images/2020/04/sys_info.jpg","264a81c10b69e55fcc38e9afbaa1dd05"],["images/background/index.jpg","12ddb45072a7eac5c82688848d798ca7"],["images/background/index3.jpg","69d6874e0726a1199feac178b32c9e35"],["img/algolia.svg","7907ab6b9a7b05076e0751fa3a0bda3a"],["img/azure.svg","570248db796e292bf7b59a650cd079c8"],["img/baidu.svg","dc8c2616588c33ff4f70f43579c639d6"],["index.html","08dae152ae89de90829e3f0c490d9f6a"],["js/app.js","ea306851b6276a0ffeec351d138589e5"],["js/busuanzi.pure.mini.js","4c9a89414b97bb2053ccc7cb83c83b6e"],["js/comment_typing.js","ab7b34f055a2bf8e036daec67e968d1a"],["js/instant_page.js","1a3be845085b8d94a2997a3a472feb42"],["js/jinrishici.js","2908509a9dcc3568f599286d64932af3"],["js/search.js","8c5e55f8a12105822ef6793c880f0aa7"],["js/valine.js","a2d5ecdb8234d2c5f61aac757ebf73fb"],["meet-again-why-is-purel-in/index.html","df7fb246aedd5ae9a33e3f4e10f28161"],["mylist/index.html","69159705cd170a94f57906ffcade9e8b"],["raspberry-pi-install-0-96-inch-spi-interface-ssd1306-screen/index.html","3deb35d638c8a5df7790f335fe7e63e8"],["raspberry-pi-install-rtl8812bu-dual-band-wireless-network-card-driver/index.html","c136bb8a8634965252b62425489cf521"],["raspberry-pi-quantum-cloud-lab-in-your-pocket-hardware/index.html","56b994d381299243c0c4bd8f25418e19"],["raspberry-pi-quantum-cloud-lab-in-your-pocket-software/index.html","34bb29f78a9bb20b9266eec50b4a6b11"],["seven-practices-of-great-leaders/index.html","f86e3bd8eee73dddec002b7587f83b44"],["tags/3-5inch/index.html","14194dffabfe49eaeaa750e72d8c32e1"],["tags/Blog/index.html","1faa3003abceb047b16fec41253d35bd"],["tags/Frp/index.html","8039bd944d825fdc46f8ce0a819733db"],["tags/Github/index.html","898f7e80f83d36b010f10f726203fc02"],["tags/Hexo/index.html","466d9f866072831ae1e5aaca06930496"],["tags/LCD/index.html","940e9e916863058b8d6255a3afeac16a"],["tags/Leadership/index.html","5fdff3416a5ec9af8e5c90007afa2847"],["tags/Lofree/index.html","323a13fa6006f6e7c9c3b3cfa300a598"],["tags/Markdown/index.html","e7719b4fb5ef29732356bd3fc51ba963"],["tags/Pi/index.html","28c6828d70bda2aee5e17c039cf187fc"],["tags/Purel-in/index.html","6ca4366fe19d48289e2d6ac657f1875f"],["tags/Python/index.html","67ed72ffd3b86f8e8b059105afcaa3e5"],["tags/SPI/index.html","f559de570c4fde7cad8d9e8eb96b6bae"],["tags/SSH/index.html","201f8b1e1b363721423dc0dedd965ad8"],["tags/SSR/index.html","9f869f4a282b5fb2173d12f24d46868e"],["tags/Samba/index.html","0dea51bb3e62a83ac27a9467cc83961f"],["tags/WIFI/index.html","abf45edecc43d7362a6a5e47bd85d00e"],["tags/Wordpress/index.html","d3271a64ecc9811e8670f8cb37b030be"],["tags/iA-Writer/index.html","ae5881334d6ac3d764f34250c9a9fdc3"],["tags/index.html","a32a8b601d208a6add5e0276043e7f60"],["tags/root/index.html","631753f3e99030dc1f9330ccfb8b92b7"],["tags/rtl8812bu/index.html","7372a85c34a4b3777d39df336d0ff63a"],["tags/ssd1306/index.html","7c02fba6a82f34e19396d15e93033e2f"],["tags/修炼/index.html","0d0252ba1ea983926e0f5010cf4ed79c"],["tags/内网穿透/index.html","6d19627db6ff0f7810557f177cb9bc26"],["tags/合一/index.html","59b091f795c6bf519b80e7467adbedbb"],["tags/学习/index.html","9c44056469625c43d8fa631e23d22027"],["tags/数据中心/index.html","ebbc13caf653e485ec1e9585fc30cd7f"],["tags/无线网卡/index.html","452dce3f4aaad4ba892c96f8d8f145e7"],["tags/服务器/index.html","a96f4bbdc39be585d2bb97413f5afdd2"],["tags/树梅派/index.html","2230873f64fa5f708e88ffc30f8f8bf0"],["tags/树莓派/index.html","0496cf7b5f3abfbf9377f96d96a72ec9"],["tags/疫情/index.html","c72ddebe8d26ff696cb3cc18176b5eb3"],["tags/领导力/index.html","ebd63a94975886982056f673dd2d01b5"],["tags/驱动/index.html","10ca57193bdc9f1cec02067ae9dc8fbb"]];
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







