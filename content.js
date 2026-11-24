/* ------------------------------------------------------------------
   GREYROCK MOTION WEBSITE: ALL THE TEXT AND DETAILS

   This is the only file you edit. Change the words between the
   quotation marks, save, and refresh the page in the browser.

   Rules:
   - Keep the quotation marks and the commas at the ends of lines.
   - Anything left as "" counts as "not added yet". The grey bar at
     the bottom of the page lists what is still missing.
   ------------------------------------------------------------------ */

window.GREYROCK = {

  /* ---------- CONTACT DETAILS ---------- */
  contact: {
    whatsapp: "918269419357",        // number with country code, digits only: 91 then the 10 digits
    email: "greyrockmotion@gmail.com",           // the studio email address
    instagram: "greyrockmotion",       // the handle without the @
    replyLine: "We reply within one working day."   // "" removes this promise
  },

  /* ---------- TOP OF THE PAGE ---------- */
  hero: {
    headline: "See it before it's built.",
    line: "Greyrock Motion makes launch films, 3D walkthroughs and ad films for builders, hotels and brands in Ujjain and Indore.",
    // Stand-in loop made from the piece 3 stills. Swap for a cut of the real walkthrough once it is rendered.
    film: "assets/films/greyrock_hero-loop_web.mp4",
    poster: "assets/stills/hero-poster.jpg"
  },

  /* ---------- THE FILMS ----------
     show: true  = the film is on the page
     show: false = hidden (use this until a film is finished)
     video:  the web copy of the film, e.g. "assets/films/syah.mp4"
     poster: the still shown before play,  e.g. "assets/stills/syah.jpg"
     stills: optional row of stills under the film (a "-thumb.jpg" file
             next to each one is used for the small version if it exists) */
  work: {
    heading: "Selected work",
    films: [
      {
        show: true,
        title: "Private Residence",
        kind: "3D walkthrough",
        label: "Studio project",
        line: "A three-floor home, built in 3D from the architect's floor plan and lit for dusk.",
        video: "",       // add the walkthrough's web copy here once it is rendered
        poster: "assets/stills/home-01-exterior-front.jpg",
        stills: [
          "assets/stills/home-01-exterior-front.jpg",
          "assets/stills/home-06-living-room.jpg",
          "assets/stills/home-05-courtyard.jpg",
          "assets/stills/home-07-stair.jpg",
          "assets/stills/home-10-bedroom.jpg",
          "assets/stills/home-11-walk-in-wardrobe.jpg"
        ]
      },
      {
        show: true,
        title: "SYAH Cold Brew",
        kind: "Ad film, 15 seconds",
        label: "Concept film",
        line: "A launch ad for a canned cold brew. One can, five shots, one line: Dark. Cold. Awake.",
        video: "assets/films/greyrock_syah-ad_web.mp4",
        poster: "assets/stills/syah-poster.jpg"
      },
      {
        show: false,     // PIECE 2: fill in and set to true when the film is done
        title: "",
        kind: "Launch film",
        label: "",
        line: "",
        video: "",
        poster: ""
      },
      {
        show: false,     // PIECE 4: fill in and set to true when the film is done
        title: "",
        kind: "Promo reel",
        label: "",
        line: "",
        video: "",
        poster: ""
      }
    ]
  },

  /* ---------- SERVICES ---------- */
  services: {
    heading: "What we make",
    items: [
      {
        title: "Launch films",
        text: "A 30 to 45 second film that introduces your project: the location, the design and the life it offers. Made for launch day, the site office and social media."
      },
      {
        title: "3D walkthroughs",
        text: "From floor plan to film. Send us the plan. We build the property in 3D and walk your buyer through it, room by room, before construction is finished."
      },
      {
        title: "Ad films",
        text: "Short films for products and brands, delivered wide for screens and vertical for Reels and Shorts."
      }
    ],
    also: "We also make motion graphics, brand identities and landing pages."
  },

  /* ---------- HOW IT WORKS ---------- */
  process: {
    heading: "How it works",
    steps: [
      { title: "Brief",      text: "Tell us about the project. A call or a WhatsApp message is enough to start." },
      { title: "Concept",    text: "We send a script and storyboard. You approve the direction before we build anything." },
      { title: "Production", text: "We build and finish the film: 3D, edit, colour and sound." },
      { title: "Delivery",   text: "You get the final film in every format you need." }
    ]
  },

  /* ---------- THE STUDIO ---------- */
  studio: {
    heading: "The studio",
    lead: "Greyrock Motion is a film and visuals studio based in Ujjain and Indore.",
    text: "We make a small number of films and finish each one properly: picture, motion and sound. The studio is led by Tanishq Borasi, trained in VFX and multimedia.",
    closing: "The name comes from stone. Solid, cut clean, made to last."   // "" removes this line
  },

  /* ---------- CONTACT SECTION ---------- */
  contactSection: {
    heading: "Have a project coming up?",
    line: "Send the floor plan, the brief, or just a message.",
    needs: ["Launch film", "3D walkthrough", "Ad film", "Something else"]
  },

  /* ---------- BOTTOM OF THE PAGE ---------- */
  footer: {
    cities: ["Ujjain", "Indore"],
    year: "2026"
  },

  /* Set to true to hide the grey "still to add" bar even when
     something is missing. Leave false while building. */
  hideDraftBar: true
};
