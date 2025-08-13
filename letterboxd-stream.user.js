// ==UserScript==
// @name         Letterboxd: Stream
// @author       ejmlr
// @version      2.0.4
// @description  Embeds the movie directly into the Letterboxd UI.
// @match        https://letterboxd.com/film/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com
// @grant        GM_addStyle
// @license      MIT
// @downloadURL  https://ezmiller-su.github.io/LetterBoxd/letterboxd-stream.user.js
// @updateURL    https://ezmiller-su.github.io/LetterBoxd/letterboxd-stream.user.js
// ==/UserScript==

(function() {
	'use strict';

	window.addEventListener('scroll', () => {
		if (window.scrollY === 0) {
			document.body.classList.add('header-hidden');
		} else {
			document.body.classList.remove('header-hidden');
		}
	});

	const customCSS = `.watch-panel, .js-actions-panel > li:nth-child(6) {display: none !important}
    .backdrop-container {top: auto;}
    #header {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 100;
        transition: transform 0.3s cubic-bezier(0.05, 0, 0, 1);
        transform: translateY(0);
    }

    body.header-hidden #header {
        transform: translateY(-100%);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.05, 0, 0, 1), opacity 0s 0.3s;
    }
    body.header-static #header {
        position: static;
        top: 50px;
        left: 50px;
    }
    .video-container {position: relative; width: 100%; height: 100vh; overflow: hidden; z-index: 99;}
    .video-container iframe {position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;}
    `;
	GM_addStyle(customCSS);

	function getIframe(url) {
		const iframe = document.createElement("iframe");
		iframe.src = url;
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "");
		iframe.setAttribute("allow", "autoplay; picture-in-picture");
		return iframe;
	}

	const tmdbId = document.body.getAttribute('data-tmdb-id');
	console.log(`tmdbId = ${tmdbId}`);

	const embedUrl = `https://2embed.cc/embed/${tmdbId}`;
	console.log(`embedUrl = ${embedUrl}`);

	const iframe = getIframe(embedUrl);

	const wrapper = document.createElement("div");
	wrapper.className = "video-container";
	wrapper.appendChild(iframe);

	document.body.insertAdjacentElement("afterbegin", wrapper);

	const viewportHeight = window.innerHeight;
	window.addEventListener('scroll', () => {
		if (window.scrollY >= viewportHeight) {
			document.body.classList.add('header-static');
			GM_addStyle(`.site-body.-backdrop {padding-top: 328px;}`)
		} else {
			document.body.classList.remove('header-static');
			GM_addStyle(`.site-body.-backdrop {padding-top: 400px;}`)
		}
	});
})();
