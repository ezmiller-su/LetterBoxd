// ==UserScript==
// @name         LetterBoxd: Watch
// @version      1.0
// @description  Adds link to www.cineby.app
// @match        https://letterboxd.com/film/*
// @match        https://letterboxd.com/tv/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=letterboxd.com
// @grant        GM_addStyle
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
  'use strict';

  const customCSS = `.watch-panel, .js-actions-panel > li:nth-child(6) {display: none !important}`;
  GM_addStyle(customCSS);

  function waitForElement(selector, callback) {
    const el = document.querySelector(selector);
    if (el) {
      callback(el);
    } else {
      setTimeout(() => waitForElement(selector, callback), 300);
    }
  }

  const href = document.querySelector('a.micro-button:nth-child(2)')?.href;
  const pathname = href?.split('/').filter(Boolean) ? href?.split('/').filter(Boolean).slice(-2).join('/') : '';
  const url = `https://www.cineby.app/${pathname}`;

  waitForElement('#userpanel', (actionsPanel) => {
    const newList = document.createElement('ul');
    const newListItem = document.createElement('li');
    const newLink = document.createElement('a');

    newList.class = 'js-actions-panel';
    newLink.href = url;
    newLink.textContent = 'Watch movie';
    newListItem.style = 'margin-bottom: 1.53846154rem;';

    newList.appendChild(newListItem);
    newListItem.appendChild(newLink);
    actionsPanel.insertBefore(newList, actionsPanel.firstChild);
  });
})();
