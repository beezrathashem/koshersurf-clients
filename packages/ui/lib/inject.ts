// const initial = `
// var inject_styles___________________ = document.createElement( 'style' );
// inject_styles___________________.innerHTML = 'div { background-image: none !important; background-url: none !important; };'
// document.body.appendChild( inject_styles___________________ );

// var inject_styles_______________ = document.createElement( 'style' );
// inject_styles_______________.innerHTML = 'span { background-image: none !important; };'
// document.body.appendChild( inject_styles_______________ );

// var inject_styles__________________ = document.createElement( 'style' );
// inject_styles__________________.innerHTML = 'video { display: none !important; background-image: none !important; }'
// document.body.appendChild( inject_styles__________________ );

// var inject_styles___________ = document.createElement( 'style' );
// inject_styles___________.innerHTML = 'video-element { display: none !important; background-image: none !important; }'
// document.body.appendChild( inject_styles___________ );

// // var inject_styles__image = document.createElement( 'style' );
// // inject_styles__image.innerHTML = 'img { display: none !important;}'
// // document.body.appendChild( inject_styles__image );

// var inject_styles_iframe = document.createElement( 'style' );
// inject_styles_iframe.innerHTML = 'iframe { display: none !important;}'
// document.body.appendChild( inject_styles_iframe );

// var cleanAImagez = (arr,bbbbbb) => {
//       arr[bbbbbb].alt = arr[bbbbbb].src;
//         arr[bbbbbb].src = "https://firebasestorage.googleapis.com/v0/b/beezrathashem-f811f.appspot.com/o/BHtransparent.png?alt=media&token=afa1554a-1827-447d-80e9-a602ddc61a96&hehe=";
//         arr[bbbbbb].srcset = arr[bbbbbb].src;
//         return {
//            src: arr[bbbbbb].src,
//           alt: arr[bbbbbb].alt,
//         }

// };

//   var allEvilHellImagesLol = document.getElementsByTagName('img');
//   const initalImageToClean = [];
//     for (var ii = 0; ii < allEvilHellImagesLol.length; ii++) {
//          initalImageToClean.push(cleanAImagez( allEvilHellImagesLol, ii));
//     };

//    if (initalImageToClean.length > 0) {
//      window.ReactNativeWebView.postMessage(
//         JSON.stringify({
//           type: "filter",
//           nodes: initalImageToClean,
//         })
//       )
//    };

//   setInterval(function() {
//     var allEvilHellVideosLol = document.getElementsByTagName('video');
//     for (var iii = 0; iii < allEvilHellVideosLol.length; iii++) {
//         allEvilHellVideosLol[iii].pause = true;
//         allEvilHellVideosLol[iii].autoplay = false;
//         allEvilHellVideosLol[iii].src = "";
//         allEvilHellVideosLol[iii].parentNode.removeChild(allEvilHellVideosLol[iii]);
//     }
//   }, 100);

// // setInterval(function() {
// //     var imgimg = document.getElementsByTagName('img');
// //     for (var bbb = 0; bbb < imgimg.length; bbb++) {
// //       // if (!imgimg[bbb].src.includes('firebasestorage.googleapis.com')) {
// //         imgimg[bbb].parentNode.removeChild(imgimg[bbb]);
// //         // cleanAImagez(imgimg, bbb)
// //         // }
// //     }
// // }, 100);

// const superSickObserver = new MutationObserver(function (mutations) {
//   mutations.forEach(function (mutation) {
//     if (mutation.addedNodes && mutation.addedNodes.length > 0) {
//       // Extract all the new img tags, including nested ones
//       const newImgTags = [];
//       [].slice.call(mutation.addedNodes).forEach(function processNode(node) {
//         if (node.nodeName === "IMG") {
//           newImgTags.push(node);
//         } else if (node.nodeName === "VIDEO") {
//           node.pause = true;
//           node.autoplay = false;
//           node.src = "";
//         };

//         if (node.childNodes && node.childNodes.length > 0) {
//           [].slice.call(node.childNodes).forEach(processNode);
//         }
//       })

//       if (newImgTags.length > 0)  {
//       const newImagesToPush = []
//       newImgTags.forEach((n) => {
//         n.alt = n.src || n.srcset;
//         n.src = "https://firebasestorage.googleapis.com/v0/b/beezrathashem-f811f.appspot.com/o/BHtransparent.png?alt=media&token=afa1554a-1827-447d-80e9-a602ddc61a96&hehe=";
//         n.srcset = n.src;
//         newImagesToPush.push({
//           src: n.src,
//           alt: n.alt,
//         })
//       })

//       if (newImagesToPush?.length) {
//       window.ReactNativeWebView.postMessage(
//         JSON.stringify({
//           type: "filter",
//           nodes: newImagesToPush,
//         })
//       )
//       }
//       }
//     }
//   });
// });

// superSickObserver.observe(document.body, {
//   childList: true,
//   subtree: true,
// });

//   window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ready' }));

//   true;
// `;

const processImages = `
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  // Check if it's within the viewport
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

  const images = document.querySelectorAll('img');
  const imagesInViewport = [...images].filter(img => isInViewport(img));
  // // update images from response with updated images

  // updatedImageUrls.forEach((updatedUrl, index) => {
  //   const found = imagesInViewport.find(i => i.src === updatedUrl.originalUrl);
  //   if (found) {
  //     found.src = updatedUrl.updatedUrl;
  //     // overwite style to be visible again
  //     found.style = 'display: block !important;';
  //   }
  // });
  triggerProcessImages();
`;

const initial = `
(function() {
  function sendUrlUpdate(url) {
      window.ReactNativeWebView.postMessage(url);
  }

  // Override pushState and replaceState
  (function(history) {
      var pushState = history.pushState;
      var replaceState = history.replaceState;

      history.pushState = function(state) {
          sendUrlUpdate(window.location.href);
          return pushState.apply(history, arguments);
      };

      history.replaceState = function(state) {
          sendUrlUpdate(window.location.href);
          return replaceState.apply(history, arguments);
      };
  })(window.history);

  // Listen for hash changes
  window.addEventListener('hashchange', function() {
      sendUrlUpdate(window.location.href);
  });

  // Additional listeners or MutationObservers can be added here

})();
alert('done');
true;
`;

export default { initial, processImages };
