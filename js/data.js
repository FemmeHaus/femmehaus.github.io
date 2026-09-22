/* ==========================================================================
   FemmeHaus — content data. Add an entry here and every page that lists
   events / media updates itself.
   Photos live in assets/img/p/ as  <slug>.jpg (1600px, lightbox)  and
   <slug>-s.jpg (720px, grids). P("slug", "alt text") builds the pair.
   ========================================================================== */
(function () {
  function P(slug, alt, cap) { return { s: "assets/img/p/" + slug + "-s.jpg", f: "assets/img/p/" + slug + ".jpg", alt: alt, cap: cap || "" }; }

  window.FH_DATA = {

    // One entry per event: its photos, blurb and facts. Everything that lists events
    // (Events page, Community cards, calendar) reads from here.
    //   date  = "YYYY-MM-DD" or null (facts left blank are simply not shown)
    //   flyer = flyer image, or poster = typographic poster when there isn't one
    //   photos[0] is the cover unless `cover` is set. Add attendance: 120 to show a guest count.
    // Events dated today or later show in the "Upcoming" calendar; the rest are past.
    events: [
      {
        id: "ten-percent",
        title: "10% — <em>A Masquerade</em> Film Screening",
        plain: "10% — A Masquerade Themed Private Film Screening",
        presenter: "FemmeHaus presents",
        date: "2026-08-22", time: "6:30 – 10:00 PM",
        venue: "Heaven Gallery, 1550 N Milwaukee Ave, Chicago",
        flyer: "assets/img/flyer-10pct.jpg",
        blurb: "A masquerade-themed private film screening at Heaven Gallery. Guests came masked and dressed for the occasion — satin, sequins, evening wear — for a night of film, mystery and good company. RSVP only.",
        photos: [
          P("mask-group", "Four guests in masquerade masks and evening wear pose in front of a graffiti wall"),
          P("mask-train", "A guest in a red satin dress photographs herself with a passing train behind her"),
          P("mask-crowd", "A crowd at the masquerade, a guest in a sequined hood at the centre"),
          P("pocket-watch", "A hand holding an antique pocket watch against a rust-coloured wall")
        ],
        attendance: null, rsvp: ""
      },
      {
        id: "wnba-happy-hour",
        title: "WNBA All-Star Weekend <em>Happy Hour</em>",
        plain: "WNBA All-Star Weekend Happy Hour",
        presenter: "Presented with Marc Nolan",
        date: "2026-07-23", time: "6:00 – 9:00 PM",
        venue: "Marc Nolan, Chicago",
        flyer: "assets/img/flyer-wnba-happy-hour.jpg",
        blurb: "FemmeHaus and Marc Nolan came together for an evening of connection, culture and celebration during WNBA All-Star Weekend Chicago 2026. Basketball tees, croc-embossed accessories, a full bar and guests posing with the sign — the store became the weekend's happy hour.",
        photos: [
          P("wnba-sign", "Two guests hold the WNBA All-Star Weekend Happy Hour sign inside Marc Nolan"),
          P("marcnolan-guest", "A guest in a chocolate bodysuit and denim poses beside a leather duffel"),
          P("wnba-tee", "A guest in a 'Root'n for Women's Basketball' tee holds a tortoiseshell phone"),
          P("marcnolan-trio", "Three guests, one in a Chicago Sky tee, pose against a rust-red wall"),
          P("wnba-wallet", "A guest holds a basketball and a croc-embossed wallet"),
          P("wnba-ball", "A basketball, a croc-embossed bag and a guest against a red wall"),
          P("wnba-shelf", "A guest holds a product beside Marc Nolan's shelves"),
          P("wnba-party", "A crowded night at the bar, with a DJ and a red Marc Nolan Social Club cooler"),
          P("wnba-bar", "Guests crowd the bar beside a box of Chicago-made spirits"),
          P("wnba-friends", "A couple pose at a counter under warm light"),
          P("wnba-trio", "Three guests pose in front of screens showing the game"),
          P("wnba-ice", "Cans and bottles chilling in a tub of ice"),
          P("wnba-coaster", "A 'femmehaus presents' coaster reading 'Let's Marc the Summer'"),
          P("wnba-board", "A hand-written 'Let's Marc the Summer' message board beside a check-in"),
          P("gifting-pattern", "Pattern hair-care products laid out on a tote reading 'Hair Care Is Self-Care'")
        ],
        attendance: null, rsvp: ""
      },
      {
        id: "dinner-at-the-haus",
        title: "Dinner at <em>the Haus</em>",
        plain: "Dinner at the Haus",
        presenter: "FemmeHaus presents",
        date: null, time: "", venue: "",
        blurb: "One long table dressed in red roses, candlelight and hand-set place cards, in a brick-walled kitchen space. Friends toasted, a host took the mic, and there was a white-wall photo corner for everyone who wanted the picture.",
        photos: [
          P("kitchen-group", "A large group of women gathered around a kitchen island"),
          P("dinner-roses", "A tablescape of red roses, candles and place cards"),
          P("dinner-four", "Four friends seated at a table dressed with red roses and candles"),
          P("dinner-speaker", "A host speaks into a microphone above a table of red flowers"),
          P("dinner-long", "Guests seated along a table of roses and candles"),
          P("kitchen-cheers", "Two friends toast in front of a 'Bon Appetit' poster"),
          P("kitchen-pink", "Three friends in bright summer dresses at a table"),
          P("kitchen-laugh", "Friends laugh together over drinks"),
          P("kitchen-counter", "Friends in bright tops at the counter"),
          P("kitchen-duo", "Two friends smile at the kitchen island"),
          P("dinner-magazine", "A magazine open on a wooden table beside a notebook"),
          P("dinner-bench", "Three friends on a bench against a white wall"),
          P("dinner-green", "A guest in a ruffled green dress stands beside a cream chair")
        ],
        attendance: null, rsvp: ""
      },
      {
        id: "legacy-edit",
        title: "The Legacy <em>Edit</em>",
        plain: "The Legacy Edit",
        presenter: "The Girls Room · Girls in the Hood",
        date: null, time: "", venue: "",
        blurb: "A Girls Room edition from our Girls in the Hood days. Friends against a clean white wall, a wash of pink light, and the kind of portraits people actually save.",
        photos: [
          P("legacy-cover", "The Legacy Edit graphic: two friends laughing beneath the title"),
          P("legacy-1", "Two friends embrace against a white backdrop"),
          P("legacy-2", "A guest in a black bow top poses with a friend against a white backdrop"),
          P("legacy-cheers", "Two friends laugh and raise a glass of red wine"),
          P("booth-bw", "Three friends pose in a black-and-white photo booth shot"),
          P("booth-pink", "Four friends pose with finger guns against a white wall")
        ],
        attendance: null, rsvp: ""
      },
      {
        id: "fore-the-girls",
        title: "Fore <em>the Girls</em>",
        plain: "Fore the Girls",
        presenter: "FemmeHaus presents",
        date: null, time: "", venue: "",
        blurb: "Tennis whites, a golf cart and a welcome sign that said it all. Fore the Girls took a day on the course and made it ours.",
        photos: [
          P("golf-cart", "Two guests in tennis whites lean on a golf cart beside a 'Fore the Girls' welcome sign"),
          P("fore-the-girls-2", "Four women in tennis whites on and around a golf cart")
        ],
        attendance: null, rsvp: ""
      },
      {
        id: "race-day",
        title: "<em>Race</em> Day",
        plain: "Race Day",
        presenter: "FemmeHaus presents",
        date: null, time: "", venue: "",
        blurb: "Race suits, helmets and a stock car on the track — proof that a FemmeHaus outing doesn't have to happen indoors.",
        photos: [
          P("race-helmets", "Two guests in racing suits fixing each other's helmets on a track"),
          P("race-car", "A stock car parked on a racetrack under a big sky")
        ],
        attendance: null, rsvp: ""
      },
      {
        id: "vs-watch-party",
        title: "Fashion Show <em>Watch Party</em>",
        plain: "Victoria's Secret Fashion Show Watch Party",
        presenter: "FemmeHaus presents",
        date: null, time: "", venue: "",
        blurb: "The Victoria's Secret Fashion Show, watched together: friends, a branded backdrop and full glam — the runway, on our terms.",
        photos: [
          P("vs-watch-party", "Three friends in front of the Victoria's Secret Fashion Show Watch Party backdrop")
        ],
        attendance: null, rsvp: ""
      },
      {
        id: "pre-summer-smash",
        title: "Pre Summer <em>Smash</em>",
        plain: "Pre Summer Smash",
        presenter: "FemmeHaus presents",
        date: null, time: "", venue: "",
        poster: { kicker: "FemmeHaus presents", title: "Pre Summer <em>Smash</em>" },
        blurb: "Our kickoff to summer — the night the season officially started. Photos are on their way.",
        photos: [],
        attendance: null, rsvp: ""
      }
    ],

    // Curated for visual rhythm. Home uses the first 6 (data-limit).
    moments: [
      P("golf-cart", "Two guests in tennis whites lean on a golf cart beside a 'Fore the Girls' welcome sign", "Fore the Girls"),
      P("wnba-sign", "Two guests hold the WNBA All-Star Weekend Happy Hour sign", "WNBA All-Star Weekend"),
      P("mask-group", "Four guests in masks and evening wear in front of a graffiti wall", "10%"),
      P("dinner-four", "Four friends seated at a table dressed with red roses and candles", "Dinner"),
      P("portrait-3", "A guest with long curls in a cream top, lit by camera flash", "Faces of the Haus"),
      P("race-helmets", "Two guests in racing suits fixing each other's helmets on a track", "Race day"),
      P("kitchen-group", "A large group of women gathered around a kitchen island", "The kitchen"),
      P("booth-bw", "Three friends pose in a black-and-white photo booth shot", "Photo booth"),
      P("legacy-2", "A guest in a black bow top poses with a friend against a white backdrop", "The Legacy Edit"),
      P("dinner-speaker", "A host speaks into a microphone above a table of red flowers", "Dinner"),
      P("mask-train", "A guest in a red satin dress photographs herself at night", "10%"),
      P("wnba-tee", "A 'Root'n for Women's Basketball' tee and stacked rings", "WNBA All-Star Weekend"),
      P("kitchen-cheers", "Two friends toast in front of a 'Bon Appetit' poster", "The kitchen"),
      P("dinner-green", "A guest in a ruffled green dress stands beside a cream chair", "Dinner"),
      P("portrait-1", "A guest in a denim jacket and a black bandana, lit by flash", "Faces of the Haus"),
      P("night-hug", "Two friends hug and laugh at night", "After hours"),
      P("kitchen-pink", "Three friends in bright summer dresses at a table", "The kitchen"),
      P("race-car", "A stock car parked on a racetrack under a big sky", "Race day"),
      P("booth-pink", "Four friends pose with finger guns against a white wall", "Photo booth"),
      P("portrait-4", "A smiling guest in a denim jacket, lit by flash", "Faces of the Haus"),
      P("wnba-party", "A crowded night at the Marc Nolan bar", "WNBA All-Star Weekend"),
      P("dinner-roses", "A tablescape of red roses, candles and place cards", "Dinner"),
      P("mask-crowd", "A crowd at the masquerade, a guest in a sequined hood at the centre", "10%"),
      P("legacy-1", "Two friends embrace against a white backdrop", "The Legacy Edit")
    ],

    // Faces of the Haus strip
    portraits: [
      P("portrait-1", "A guest in a denim jacket and black bandana"),
      P("portrait-2", "A guest laughing in a black cap"),
      P("portrait-3", "A guest with long curls in a cream top"),
      P("portrait-4", "A smiling guest in a denim jacket"),
      P("portrait-5", "A guest with arms crossed and a knowing look")
    ],

    // Brand-side proof for the Activations page
    activation: [
      P("wnba-coaster", "A 'femmehaus presents' coaster reading 'Let's Marc the Summer'", "Branded touchpoints"),
      P("gifting-pattern", "Pattern hair-care products laid out on a tote reading 'Hair Care Is Self-Care'", "Gifting"),
      P("wnba-shelf", "A guest holds a product beside Marc Nolan's shelves", "Product moments"),
      P("wnba-board", "A hand-written 'Let's Marc the Summer' message board beside a check-in", "On-site signage")
    ],

    // Short vertical clips. Compressed mp4s live in assets/video/.
    reels: [
      { src: "assets/video/reel-marcnolan.mp4", poster: "assets/video/reel-marcnolan.jpg", cap: "Marc Nolan, before doors" }
    ],

    // Media / content hub. cat: recap | editorial | culture
    media: [
      { cat: "recap", tag: "Recap", title: "WNBA All-Star Weekend Happy Hour — the recap", note: "Connection, culture and celebration with Marc Nolan.", img: P("wnba-sign", "Guests holding the WNBA All-Star Weekend Happy Hour sign") },
      { cat: "recap", tag: "Recap", title: "10% — inside the masquerade", note: "A private film screening at Heaven Gallery.", img: P("mask-group", "Masked guests at the 10% screening") },
      { cat: "recap", tag: "Recap", title: "Fore the Girls", note: "Tennis whites, golf carts and a very good day out.", img: P("golf-cart", "Guests at Fore the Girls") },
      { cat: "recap", tag: "Recap", title: "Race day", note: "Helmets on, phones out, no lap times recorded.", img: P("race-helmets", "Guests in racing suits") },
      { cat: "culture", tag: "Culture", title: "Dinner at the Haus", note: "Roses, candlelight and the good kind of loud.", img: P("dinner-four", "Friends seated at a rose-dressed table") },
      { cat: "editorial", tag: "Editorial", title: "Faces of the Haus", note: "Five portraits, one flash, no filter.", img: P("portrait-3", "Flash portrait of a guest") },
      { cat: "editorial", tag: "Editorial", title: "The Legacy Edit", note: "The Girls Room, in print.", img: P("legacy-2", "Two guests against a white backdrop") },
      { cat: "editorial", tag: "Editorial", title: "Freshman Class: Raven, the curator of boundless creativity", note: "From the heart of Chicago — a multidisciplinary creative.", img: { s: "assets/img/gith-raven.jpg", f: "assets/img/gith-raven.jpg", alt: "Editorial spread featuring Raven" } },
      { cat: "culture", tag: "Culture", title: "Victoria's Secret Fashion Show Watch Party", note: "The runway, on our terms.", img: { s: "assets/img/vs-watch-party.jpg", f: "assets/img/vs-watch-party.jpg", alt: "Friends at the watch party backdrop" } }
    ]
  };
})();

/* ---- generated: thumbnail sizes so lazy photos reserve their space. Re-run when adding photos; missing entries just load without a reserved size. ---- */
window.FH_DIMS = {"booth-bw":[720,480],"booth-pink":[720,480],"dinner-bench":[480,720],"dinner-four":[720,705],"dinner-green":[480,720],"dinner-long":[720,480],"dinner-magazine":[540,720],"dinner-roses":[480,720],"dinner-speaker":[480,720],"fore-the-girls-2":[592,736],"gifting-pattern":[561,720],"golf-cart":[720,480],"kitchen-cheers":[576,720],"kitchen-counter":[720,480],"kitchen-duo":[720,480],"kitchen-group":[540,360],"kitchen-laugh":[720,576],"kitchen-pink":[720,576],"legacy-1":[480,720],"legacy-2":[480,720],"legacy-cheers":[536,788],"legacy-cover":[590,716],"marcnolan-guest":[720,771],"marcnolan-trio":[720,408],"mask-crowd":[480,720],"mask-group":[480,720],"mask-train":[480,720],"night-hug":[480,720],"pocket-watch":[480,720],"portrait-1":[540,720],"portrait-2":[540,720],"portrait-3":[540,720],"portrait-4":[540,720],"portrait-5":[540,720],"race-car":[540,720],"race-helmets":[540,720],"team-asha":[380,507],"vs-watch-party":[586,680],"wnba-ball":[576,720],"wnba-bar":[576,720],"wnba-board":[540,720],"wnba-coaster":[576,720],"wnba-friends":[480,720],"wnba-ice":[575,720],"wnba-party":[480,720],"wnba-shelf":[480,720],"wnba-sign":[576,720],"wnba-tee":[576,720],"wnba-trio":[480,720],"wnba-wallet":[575,720]};
