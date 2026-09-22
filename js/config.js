/* ==========================================================================
   FemmeHaus — site configuration
   Every form posts JSON to its endpoint. Leave an endpoint empty and the form
   still validates and shows its success state (payload is logged to the
   console) so the site is reviewable before an email tool is connected.

   Each form carries a `segment` tag so the three funnels never share a list:
     community  → women who attend / want to attend events
     brand      → Activations inquiries, sponsors, media-kit requests
     academy    → Academy waitlist / enrollment interest
   ========================================================================== */
window.FH_CONFIG = {
  endpoints: {
    community:   "",   // e.g. email platform form/API URL (Kit, Mailchimp, Klaviyo) — tag: community
    sponsor:     "",   // Sponsor With Us — tag: brand, sub-tag: sponsor
    activations: "",   // Request a Proposal — e.g. Formspree / HubSpot form URL — tag: brand
    mediakit:    "",   // Media kit request — tag: brand, sub-tag: mediakit
    academy:     "",   // Academy waitlist — tag: academy
    contact:     ""    // General contact
  },
  // Once the media kit PDF exists, put its path here (e.g. "assets/FemmeHaus-Media-Kit.pdf").
  // The media-kit form reveals this link after a successful submit.
  mediaKitUrl: "",
  email: "hello@femmehaus.com",          // TODO: confirm real address
  instagram: "https://instagram.com/",   // TODO: add real handle
  city: "Chicago"
};
