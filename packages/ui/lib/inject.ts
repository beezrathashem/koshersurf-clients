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

const video1 = `

  var ytpElements = document.querySelectorAll('.ytp-chrome-bottom, .ytp-chrome-controls');
  ytpElements.forEach(function(el) {
    el.remove();
  });

  function replaceVideoWithClone(video) {
    var clone = video.cloneNode(true);
    clone.setAttribute('controls', 'true');
  
    // Pause and reset the original video to prevent it from playing in the background
    video.pause();
    video.removeAttribute('src'); // This will unload the video
    video.load();
  
    // Replace the original video with the clone
    video.parentNode.replaceChild(clone, video);
    return clone;
  }
  
  var originalPlayMethod = HTMLVideoElement.prototype.play;
  // Function to hide the video and create a CONTINUE button
  function setupVideoAndButton(video) {
    var newVideo = replaceVideoWithClone(video);
    
    // Immediately pause the video and clear its source
    newVideo.pause();
    newVideo.removeAttribute('src'); // Remove any source if set
    newVideo.load(); // Load the video with the removed source to cancel any preloading
  
    // Set the video visibility to hidden instead of changing the opacity
    newVideo.style.visibility = 'hidden';
  
    // Create a CONTINUE button
    var continueButton = document.createElement('button');
    continueButton.textContent = 'CONTINUE';
    // Style the CONTINUE button
    continueButton.style.position = 'absolute';
    continueButton.style.zIndex = '100000';
    continueButton.style.fontSize = '20px';
  
    continueButton.style.height = newVideo.offsetHeight + 'px';
    continueButton.style.width = newVideo.offsetWidth + 'px';
    continueButton.style.padding = '10px 20px';
    continueButton.style.border = 'none';
    continueButton.style.background = 'red';
    continueButton.style.color = 'white';
    continueButton.style.cursor = 'pointer';
  
    // Append the CONTINUE button to the higher level parent
    var higherLevelParent = newVideo.parentNode.parentNode; // Adjust this to target the correct ancestor
    higherLevelParent.style.position = 'relative';
    higherLevelParent.insertBefore(continueButton, higherLevelParent.firstChild); // Insert it as the first child
  
    // Event listener for the CONTINUE button
    continueButton.addEventListener('click', function() {
      // Set the new video source
      HTMLVideoElement.prototype.play = originalPlayMethod;
      newVideo.src = 'https://firebasestorage.googleapis.com/v0/b/beezrathashem-f811f.appspot.com/o/%D7%9C%D7%9E%D7%94%20%D7%94%D7%9E%D7%A6%D7%91%20%D7%91%D7%90%D7%A8%D7%A5%20%D7%99%D7%A9%D7%A8%D7%90%D7%9C%20%D7%96%D7%A7%D7%95%D7%A7%20%D7%9C%D7%A2%D7%96%D7%A8%D7%AA%D7%9A%3F.mp4?alt=media&token=b1328a97-e721-4b61-932e-ed72f1708ecf';
      newVideo.load(); // Load the new source
      newVideo.style.visibility = 'visible'; // Make the video visible
      newVideo.play(); // Play the video
      continueButton.remove(); // Remove the CONTINUE button
    });
  }
  
  // Select the video element on the page
  var videoElement = document.querySelector('video');
  
  if (videoElement) {
    setupVideoAndButton(videoElement);
  } else {
    console.error('No video element found on the page.');
  }
  
  // If the video element is inserted after some user interaction or dynamically, use a MutationObserver to detect when it is added to the DOM
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.tagName === 'VIDEO') {
          setupVideoAndButton(node);
        }
      });
    });
  });  
  observer.observe(document.body, { childList: true, subtree: true });
  
  HTMLVideoElement.prototype.play = function() {
    // Log or handle the attempt to play the video
    console.log('Prevented video autoplay');
    return new Promise((resolve, reject) => {
      // Do nothing, effectively "overriding" the play action
    });
  };
true;
`;

// doesn't always work on some sites, doesn't work with content origin errors
const video2 = `
const videoSource = 'https://bh-lectures.s3.us-west-1.amazonaws.com/-_9AwxBcLg4-240.mp4';

// Function to update video sources
function updateVideoSources() {
  var videoElements = document.querySelectorAll('video');
  
  videoElements.forEach(function(video) {
    // Check if the video src is not already set
    if (video.src !== videoSource) {
      video.src = videoSource;
      video.crossOrigin = "anonymous";
      video.setAttribute('controls', 'true'); // Ensure controls are enabled
      video.load(); // Load the new video source
      video.play(); // Load the new video source
    }
  });
}

// Start a loop that runs every second
var intervalId = setInterval(updateVideoSources, 1000);
true;
`;

const video3 = `
const videoSource = 'https://bh-lectures.s3.us-west-1.amazonaws.com/-_9AwxBcLg4-240.mp4';

function replaceVideo(videoElement) {
  // Avoid replacing if the video source is already set
  if (videoElement.src === videoSource) {
    return;
  }

  // Create a new video element
  const newVideo = document.createElement('video');

  // Copying styles from the original video to the new one
  newVideo.style.cssText = videoElement.style.cssText;
  newVideo.style.width = '100%'; // Ensure the new video fits the container width
  newVideo.style.height = '100%'; // Ensure the new video fits the container height

  // Set the new source and attributes to the new video element
  newVideo.src = videoSource;
  newVideo.setAttribute('controls', ''); // Show video controls
  newVideo.setAttribute('playsinline', ''); // Suggest to the browser that the video should play inline
  newVideo.muted = false; // Make sure the video is not muted

  // Replace the old video element with the new one
  videoElement.parentNode.insertBefore(newVideo, videoElement);

  // Remove the old video element
  videoElement.parentNode.removeChild(videoElement);
}

function replaceAllVideos() {
  const originalVideos = document.querySelectorAll('video');

  originalVideos.forEach((video) => {
    // Check if the video is not already replaced by checking the src
    if (video.src !== videoSource) {
      replaceVideo(video);
    }
  });
}

// Continuously attempt to replace videos at an interval
const intervalId = setInterval(replaceAllVideos, 1000);

// If you want to stop this process, use clearInterval(intervalId);

`;

const video = `
// Inject CSS to hide all video and img elements and potential video-related elements immediately
var injectStyles = document.createElement('style');
injectStyles.innerHTML =
  'video, img, .video-element, [style*="background-image"], [style*="background: url"] {' +
  '  display: none !important;' +
  '  background: none !important;' +
  '}';
document.head.appendChild(injectStyles);

// Function to remove all video and img elements and elements with a background image
function obliterateMedia() {
  var allVideosAndImages = document.querySelectorAll('video, img, .video-element');
  allVideosAndImages.forEach(function(media) {
    if (media.parentNode) {
      if(media.tagName.toLowerCase() === 'video') {
        media.removeAttribute('src'); // Clear the source for videos
        media.removeAttribute('poster'); // Clear the poster image for videos
        media.load(); // Load the video with empty source to cancel current load
      }
      // Remove the media element from the DOM
      media.parentNode.removeChild(media);
    }
  });
  
  // Also remove elements that might be placeholders with background images
  var elementsWithBackgroundImage = document.querySelectorAll('[style*="background-image"], [style*="background: url"]');
  elementsWithBackgroundImage.forEach(function(element) {
    element.style.backgroundImage = 'none';
  });
}

// Run the function to obliterate all media immediately
obliterateMedia();

// Set an interval to check for new media and placeholders every 3 seconds
var intervalId = setInterval(obliterateMedia, 3000);

// Optional: Clear the interval with clearInterval(intervalId) when it's no longer needed.

`;

const img = `
var inject_styles___________________ = document.createElement( 'style' );
inject_styles___________________.innerHTML = 'div { background-image: none !important; background-url: none !important; };'
document.body.appendChild( inject_styles___________________ );

var inject_styles_______________ = document.createElement( 'style' );
inject_styles_______________.innerHTML = 'span { background-image: none !important; };'
document.body.appendChild( inject_styles_______________ );

var inject_styles__________________ = document.createElement( 'style' );
inject_styles__________________.innerHTML = 'video { display: none !important; background-image: none !important; }'
document.body.appendChild( inject_styles__________________ );

var inject_styles___________ = document.createElement( 'style' );
inject_styles___________.innerHTML = 'video-element { display: none !important; background-image: none !important; }'
document.body.appendChild( inject_styles___________ );

var inject_styles__image = document.createElement( 'style' );
inject_styles__image.innerHTML = 'img { display: none !important;}'
document.body.appendChild( inject_styles__image );

var inject_styles_iframe = document.createElement( 'style' );
inject_styles_iframe.innerHTML = 'iframe { display: none !important;}'
document.body.appendChild( inject_styles_iframe );

`;

export default {
  initial,
  processImages,
  //  video: video2
  video: img,
};
