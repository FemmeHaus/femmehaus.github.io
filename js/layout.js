/* Shared header + footer, injected so nav edits happen in one place. */
(function () {
  var page = document.body.getAttribute("data-page") || "";
  var C = window.FH_CONFIG || {};
  function cur(id) { return page === id ? ' aria-current="page"' : ""; }

  var header =
    '<header class="nav" id="nav"><div class="nav__in">' +
      '<a class="brand" href="index.html" aria-label="FemmeHaus home"><img src="assets/img/logo.png" alt=""><span>FemmeHaus</span></a>' +
      '<button class="nav__toggle" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><i></i><i></i><i></i></button>' +
      '<ul class="nav__links" id="nav-links">' +
        '<li><a href="community.html"' + cur("community") + '>Community</a></li>' +
        '<li><a href="events.html"' + cur("events") + '>Events</a></li>' +
        '<li><a href="activations.html"' + cur("activations") + '>Activations</a></li>' +
        '<li><a href="academy.html"' + cur("academy") + '>Academy</a></li>' +
        '<li><a href="about.html"' + cur("about") + '>About</a></li>' +
        '<li><a class="btn" href="activations.html#proposal">Work with us</a></li>' +
        '<li><a class="btn btn--solid" href="community.html#join">Get on the list</a></li>' +
      '</ul></div></header>';

  var footer =
    '<footer class="foot"><div class="wrap">' +
      '<div class="foot__grid">' +
        '<div><a class="brand" href="index.html"><img src="assets/img/logo.png" alt=""><span>FemmeHaus</span></a>' +
        '<p>A community platform and media company at the intersection of women, culture and brand activation.</p></div>' +
        '<div><h4>The Haus</h4><ul>' +
          '<li><a href="community.html">Community + Media</a></li>' +
          '<li><a href="activations.html">Activations</a></li>' +
          '<li><a href="academy.html">Academy</a></li></ul></div>' +
        '<div><h4>Explore</h4><ul>' +
          '<li><a href="events.html">Events</a></li>' +
          '<li><a href="media.html">Media hub</a></li>' +
          '<li><a href="community.html#sponsor">Sponsor with us</a></li>' +
          '<li><a href="about.html">About</a></li>' +
          '<li><a href="press.html">Press</a></li></ul></div>' +
        '<div><h4>Say hello</h4><ul>' +
          '<li><a href="contact.html">Contact</a></li>' +
          '<li><a href="mailto:' + C.email + '">' + C.email + '</a></li>' +
          '<li><a href="' + C.instagram + '" target="_blank" rel="noopener">Instagram</a></li></ul></div>' +
      '</div>' +
      '<div class="foot__base"><span>© ' + new Date().getFullYear() + ' FemmeHaus · Chicago</span><span>We create the moments ✦</span></div>' +
    '</div></footer>';

  var h = document.getElementById("site-header"), f = document.getElementById("site-footer");
  if (h) h.outerHTML = header;
  if (f) f.outerHTML = footer;
})();
