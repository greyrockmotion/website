/* Greyrock Motion website. Puts the text from content.js on the page.
   You should not need to edit this file. */
(function () {
  "use strict";

  var G = window.GREYROCK || {};
  var contact = G.contact || {};
  var missing = [];

  function $(id) { return document.getElementById(id); }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  // Fill an element with text, or remove it when there is no text.
  function fill(id, text) {
    var n = $(id);
    if (!n) return;
    if (text) n.textContent = text; else n.remove();
  }

  var digits = String(contact.whatsapp || "").replace(/\D/g, "");
  var email = String(contact.email || "").trim();
  var insta = String(contact.instagram || "").trim().replace(/^@/, "");
  if (!digits) missing.push("WhatsApp number");
  if (!email) missing.push("email");
  if (!insta) missing.push("Instagram handle");

  /* ---------- hero ---------- */
  var hero = G.hero || {};
  fill("hero-headline", hero.headline);
  fill("hero-line", hero.line);

  var heroFilm = $("hero-film");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (hero.film && !calm) {
    var v = el("video");
    v.muted = true; v.loop = true; v.autoplay = true; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
    v.preload = "auto";
    if (hero.poster) v.poster = hero.poster;
    v.src = hero.film;
    heroFilm.appendChild(v);
  } else if (hero.poster) {
    var hp = el("img");
    hp.src = hero.poster; hp.alt = "";
    heroFilm.appendChild(hp);
  } else if (!G.hideDraftBar) {
    heroFilm.appendChild(el("p", "hero-film-note", "The hero film loop goes on this side."));
  }
  if (!hero.film) missing.push("hero film loop");

  /* ---------- work ---------- */
  var work = G.work || {};
  fill("work-heading", work.heading);
  var filmsBox = $("films");

  function playIcon() {
    var ns = "http://www.w3.org/2000/svg";
    var s = document.createElementNS(ns, "svg");
    s.setAttribute("viewBox", "0 0 20 22");
    s.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(ns, "polygon");
    p.setAttribute("points", "0,0 20,11 0,22");
    s.appendChild(p);
    return s;
  }

  (work.films || []).forEach(function (f) {
    if (!f || !f.show) return;
    var art = el("article", "film");
    var media = el("div", "film-media");
    var frame = el("div", "frame");
    var stills = (f.stills || []).filter(Boolean);
    var shown = f.poster || stills[0] || "";

    // What the big frame shows before anyone presses play.
    function showStill(src) {
      frame.textContent = "";
      if (src) {
        var img = el("img");
        img.src = src; img.alt = "Still from " + f.title;
        img.loading = "lazy";
        frame.appendChild(img);
      }
      if (f.video) {
        var btn = el("button", "play");
        btn.type = "button";
        btn.setAttribute("aria-label", "Play " + f.title);
        var disc = el("span", "play-disc");
        disc.appendChild(playIcon());
        btn.appendChild(disc);
        btn.addEventListener("click", playFilm);
        frame.appendChild(btn);
      }
    }

    function playFilm() {
      var vid = el("video");
      vid.controls = true; vid.playsInline = true; vid.preload = "auto";
      if (f.poster) vid.poster = f.poster;
      vid.src = f.video;
      frame.textContent = "";
      frame.appendChild(vid);
      setPressed(-1);
      var started = vid.play();
      if (started && started.catch) started.catch(function () {});
      vid.focus();
    }

    showStill(shown);
    if (!f.video) {
      missing.push("film file for " + f.title);
      if (!shown) {
        frame.classList.add("frame-empty");
        if (!G.hideDraftBar) frame.appendChild(el("p", "frame-note", "Film not added yet"));
      }
    } else if (!f.poster) {
      missing.push("still picture for " + f.title);
    }
    media.appendChild(frame);

    // Row of stills under the frame. Clicking one shows it large.
    var thumbs = [];
    function setPressed(i) {
      thumbs.forEach(function (t, j) { t.setAttribute("aria-pressed", String(i === j)); });
    }
    if (stills.length > 1) {
      var row = el("div", "thumbs");
      row.setAttribute("role", "group");
      row.setAttribute("aria-label", "Stills from " + f.title);
      stills.forEach(function (src, i) {
        var b = el("button", "thumb");
        b.type = "button";
        b.setAttribute("aria-label", "Show still " + (i + 1) + " of " + stills.length);
        var t = el("img");
        t.src = src.replace(/\.jpg$/i, "-thumb.jpg");
        t.alt = ""; t.loading = "lazy";
        t.onerror = function () { t.onerror = null; t.src = src; };   // no thumbnail file: use the full still
        b.appendChild(t);
        b.addEventListener("click", function () { showStill(src); setPressed(i); });
        thumbs.push(b);
        row.appendChild(b);
      });
      setPressed(stills.indexOf(shown));
      media.appendChild(row);
    }

    var text = el("div", "film-text");
    text.appendChild(el("h3", "", f.title));
    if (f.kind) text.appendChild(el("p", "film-kind", f.kind));
    if (f.line) text.appendChild(el("p", "film-line", f.line));
    if (f.label) text.appendChild(el("p", "film-label", f.label));

    art.appendChild(media);
    art.appendChild(text);
    filmsBox.appendChild(art);
  });

  /* ---------- services ---------- */
  var services = G.services || {};
  fill("services-heading", services.heading);
  (services.items || []).forEach(function (s) {
    var d = el("div", "service");
    d.appendChild(el("h3", "", s.title));
    d.appendChild(el("p", "", s.text));
    $("services-list").appendChild(d);
  });
  fill("services-also", services.also);

  /* ---------- process ---------- */
  var process = G.process || {};
  fill("process-heading", process.heading);
  (process.steps || []).forEach(function (s) {
    var li = el("li", "step");
    li.appendChild(el("h3", "", s.title));
    li.appendChild(el("p", "", s.text));
    $("steps").appendChild(li);
  });

  /* ---------- studio ---------- */
  var studio = G.studio || {};
  fill("studio-heading", studio.heading);
  fill("studio-lead", studio.lead);
  fill("studio-text", studio.text);
  fill("studio-closing", studio.closing);

  /* ---------- contact ---------- */
  var cs = G.contactSection || {};
  fill("contact-heading", cs.heading);
  fill("contact-line", [cs.line, contact.replyLine].filter(Boolean).join(" "));

  var actions = $("contact-actions");
  function action(label, href, cls, offLabel) {
    var a;
    if (href) {
      a = el("a", "btn " + cls, label);
      a.href = href;
      if (/^https:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    } else {
      a = el("span", "btn btn-off", offLabel);
    }
    actions.appendChild(a);
  }
  action("WhatsApp us", digits ? "https://wa.me/" + digits : "", "btn-ember", "WhatsApp number not added");
  action("Email us", email ? "mailto:" + email : "", "btn-line", "Email not added");
  if (insta) {
    var ip = el("p", "contact-insta", "Instagram: ");
    var ia = el("a", "", "@" + insta);
    ia.href = "https://www.instagram.com/" + encodeURIComponent(insta) + "/";
    ia.target = "_blank"; ia.rel = "noopener";
    ip.appendChild(ia);
    actions.parentNode.appendChild(ip);
  }

  var need = $("need");
  (cs.needs || []).forEach(function (n) { need.appendChild(el("option", "", n)); });

  var form = $("form");
  var send = $("send");
  var note = $("form-note");
  if (digits) {
    send.textContent = "Send on WhatsApp";
    note.textContent = "This opens WhatsApp with your message ready. Nothing is sent until you press send there.";
  } else if (email) {
    send.textContent = "Send by email";
    note.textContent = "This opens your email app with the message ready. Nothing is sent until you press send there.";
  } else {
    note.textContent = "The form will work once a WhatsApp number or email is added in content.js.";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = {};
    ["name", "company", "phone", "need", "message"].forEach(function (k) { d[k] = form.elements.namedItem(k); });
    var name = d.name.value.trim();
    d.name.classList.toggle("is-missing", !name);
    if (!name) {
      note.textContent = "Add your name so we know who is writing.";
      d.name.focus();
      return;
    }
    var lines = ["Hello Greyrock Motion,", "", "Name: " + name];
    if (d.company.value.trim()) lines.push("Company: " + d.company.value.trim());
    if (d.phone.value.trim()) lines.push("Phone: " + d.phone.value.trim());
    if (d.need.value) lines.push("I need: " + d.need.value);
    if (d.message.value.trim()) lines.push("", d.message.value.trim());
    var body = lines.join("\n");

    if (digits) {
      window.open("https://wa.me/" + digits + "?text=" + encodeURIComponent(body), "_blank", "noopener");
      note.textContent = "WhatsApp is open with your message. Press send there to finish.";
    } else if (email) {
      window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent("New project: " + (d.need.value || "enquiry")) + "&body=" + encodeURIComponent(body);
      note.textContent = "Your email app is open with the message. Press send there to finish.";
    } else {
      note.textContent = "Nothing was sent. A WhatsApp number or email still has to be added in content.js.";
    }
  });

  /* ---------- footer ---------- */
  var foot = G.footer || {};
  var list = $("foot-list");
  (foot.cities || []).forEach(function (c) { list.appendChild(el("li", "", c)); });
  function footLink(label, href) {
    var li = el("li");
    var a = el("a", "", label);
    a.href = href;
    if (/^https:/.test(href)) { a.target = "_blank"; a.rel = "noopener"; }
    li.appendChild(a);
    list.appendChild(li);
  }
  if (insta) footLink("Instagram", "https://www.instagram.com/" + encodeURIComponent(insta) + "/");
  if (email) footLink(email, "mailto:" + email);
  fill("foot-legal", "© " + (foot.year || new Date().getFullYear()) + " Greyrock Motion");

  /* ---------- top bar turns solid after the hero starts to leave ---------- */
  var top = document.querySelector(".top");
  function onScroll() { top.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- draft bar: lists what is still missing ---------- */
  var draft = $("draft");
  if (missing.length && !G.hideDraftBar) {
    var p = el("p");
    p.appendChild(el("strong", "", "Draft. "));
    p.appendChild(document.createTextNode("Still to add in content.js: " + missing.join(", ") + "."));
    var hide = el("button", "", "Hide");
    hide.type = "button";
    hide.addEventListener("click", function () { draft.hidden = true; });
    draft.appendChild(p);
    draft.appendChild(hide);
    draft.hidden = false;
  }
})();
