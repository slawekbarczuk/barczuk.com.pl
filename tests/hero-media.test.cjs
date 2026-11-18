"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const code = fs.readFileSync(path.join(__dirname, "../assets/hero-media-r16.js"), "utf8");
const settle = () => new Promise(resolve => setImmediate(resolve));

function eventTarget(properties = {}) {
  const listeners = new Map();
  return Object.assign(properties, {
    addEventListener(type, listener) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(listener);
    },
    emit(type) {
      for (const listener of listeners.get(type) || []) listener();
    }
  });
}

function harness({ reducedMotion = false, saveData = false, plays = [] } = {}) {
  const preference = eventTarget({ matches: reducedMotion });
  const connection = eventTarget({ saveData });
  const button = eventTarget({ hidden: true, textContent: "Odtwórz film" });
  const classes = new Set();
  const requests = [];
  let currentSource = null;
  let playCount = 0;
  let pendingPlay;
  let observe;
  const video = eventTarget({
    paused: true,
    ended: false,
    readyState: 0,
    muted: false,
    dataset: { src: "/assets/video/cities.mp4" },
    getAttribute(name) { return name === "src" ? currentSource : null; },
    play() {
      const outcome = plays[playCount++] || "success";
      if (outcome === "blocked") return Promise.reject(new Error("Autoplay denied"));
      const start = () => {
        video.paused = false;
        video.readyState = 2;
        video.emit("playing");
      };
      if (outcome === "pending") {
        return new Promise(resolve => {
          pendingPlay = () => { start(); resolve(); };
        });
      }
      start();
      return Promise.resolve();
    },
    pause() {
      if (!video.paused) {
        video.paused = true;
        video.emit("pause");
      }
    }
  });
  Object.defineProperty(video, "src", {
    get: () => currentSource,
    set(value) { currentSource = value; requests.push(value); }
  });
  const media = {
    classList: {
      toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); }
    },
    querySelector: selector => selector === "video" ? video : button
  };
  const document = eventTarget({
    hidden: false,
    querySelector: selector => selector === "[data-hero-media]" ? media : null
  });
  class IntersectionObserver {
    constructor(callback) { observe = callback; }
    observe(element) { assert.equal(element, media); }
  }
  vm.runInNewContext(code, {
    document,
    navigator: { connection },
    window: { matchMedia: () => preference, IntersectionObserver },
    IntersectionObserver
  }, { filename: "hero-media-r16.js" });

  return {
    video, button, media, classes, requests,
    get playCount() { return playCount; },
    click() { button.emit("click"); },
    visibility(hidden) { document.hidden = hidden; document.emit("visibilitychange"); },
    intersection(isIntersecting) { observe([{ isIntersecting }]); },
    reducedMotion(value) { preference.matches = value; preference.emit("change"); },
    saveData(value) { connection.saveData = value; connection.emit("change"); },
    finishPendingPlay() { assert.ok(pendingPlay, "A deferred play request must exist"); pendingPlay(); }
  };
}

for (const option of ["reducedMotion", "saveData"]) {
  test(`${option} retains the still without attaching a video source`, async () => {
    const h = harness({ [option]: true });
    h.visibility(true);
    h.visibility(false);
    h.intersection(false);
    h.intersection(true);
    await settle();
    assert.equal(h.requests.length, 0);
    assert.equal(h.playCount, 0);
    assert.equal(h.video.paused, true);
    assert.equal(h.button.hidden, true);
    assert.equal(h.classes.has("is-playing"), false);
  });
}

test("blocked autoplay leaves a visible manual play action and still", async () => {
  const h = harness({ plays: ["blocked", "success"] });
  await settle();
  assert.equal(h.video.paused, true);
  assert.equal(h.button.hidden, false);
  assert.equal(h.button.textContent, "Odtwórz film");
  assert.equal(h.classes.has("is-playing"), false);

  h.click();
  await settle();
  assert.equal(h.video.paused, false);
  assert.equal(h.button.textContent, "Zatrzymaj film");
  assert.equal(h.classes.has("is-playing"), true);
  assert.deepEqual(h.requests, ["/assets/video/cities.mp4"]);
});

test("a user pause survives returning to the page and viewport", async () => {
  const h = harness();
  await settle();
  h.click();
  await settle();
  assert.equal(h.video.paused, true);
  const playsAtPause = h.playCount;

  h.visibility(true);
  h.intersection(false);
  h.visibility(false);
  h.intersection(true);
  await settle();
  assert.equal(h.playCount, playsAtPause);
  assert.equal(h.video.paused, true);
  assert.equal(h.button.textContent, "Odtwórz film");
  assert.equal(h.classes.has("is-playing"), true, "An explicit pause retains the city frame");

  h.click();
  await settle();
  assert.equal(h.video.paused, false);
});

test("a media error restores the still, hides the action, and cannot auto-restart", async () => {
  const h = harness();
  await settle();
  h.video.emit("error");
  const playsAtFailure = h.playCount;
  h.visibility(true);
  h.visibility(false);
  h.intersection(false);
  h.intersection(true);
  await settle();
  assert.equal(h.video.paused, true);
  assert.equal(h.button.hidden, true);
  assert.equal(h.classes.has("is-playing"), false);
  assert.equal(h.playCount, playsAtFailure);
});

for (const option of ["reducedMotion", "saveData"]) {
  test(`enabling ${option} stops an already playing film and shows the still`, async () => {
    const h = harness();
    await settle();
    assert.equal(h.video.paused, false);
    h[option](true);
    await settle();
    assert.equal(h.video.paused, true);
    assert.equal(h.button.hidden, true);
    assert.equal(h.classes.has("is-playing"), false);
    assert.equal(h.requests.length, 1, "Preference changes must not reattach the source");
  });
}

test("a delayed play result cannot resume footage after it leaves the viewport", async () => {
  const h = harness({ plays: ["pending"] });
  h.intersection(false);
  h.finishPendingPlay();
  await settle();
  assert.equal(h.video.paused, true);
  assert.equal(h.button.textContent, "Odtwórz film");
});
