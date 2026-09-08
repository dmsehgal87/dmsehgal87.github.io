/*
  This is the only file you should need to edit.

  To add a new Medium article: add an object to the `publications` array.
  Include an `image` if you have one (see the "Getting an article's cover
  image" note below); leave it as "" if not, the card just renders without one.

  To add media coverage (a podcast, a quote in an article, a talk): add an
  object to the `mediaCoverage` array. That section starts empty on purpose,
  you add to it as things happen.

  Getting an article's cover image: open the article on Medium, right-click
  its cover image, "Copy image address". Save that file into
  assets/img/ (a right-click "Save image as" from the same menu works too),
  and point `image` at "assets/img/<the filename you saved>.jpg". Keeping a
  local copy instead of linking Medium's URL directly means the image won't
  break if Medium ever changes how it hosts images. JPEG rather than PNG
  keeps file size down for a photo, PNG is fine too if that's what you saved.

  After editing, commit the change on github.com (or push from your machine)
  and the live site updates automatically within about a minute. No build
  step, nothing else to run.
*/

const SITE_DATA = {
  profile: {
    name: "Deep Sehgal",
    title: "Engineering Manager, Systems Integration, Test Infrastructure, and AI Evaluation",
    location: "Sunnyvale, CA",
    // Path to a square-ish headshot, e.g. "assets/img/headshot.jpg". Leave ""
    // to show the initials avatar instead.
    photo: "assets/img/headshot.jpg",
    bio:
      "I lead the teams that decide whether software is actually ready to ship. Sixteen years " +
      "in software engineering, eight of them leading engineering and quality organizations, " +
      "spent mostly on the problem of turning “it works on my machine” into a release " +
      "criterion a whole organization can trust. Most recently that has meant building the " +
      "evaluation infrastructure for AI products: an LLM-as-judge framework that gates every " +
      "release against response-quality regressions, and the golden-set discipline behind it. " +
      "Before that, four years validating consumer hardware in the field, and eight years before " +
      "that in regulated financial systems where a missed defect was a compliance finding, not a " +
      "rollback. I write about AI quality and evaluation on Medium and IEEE and ACL venues.",
    // No public email, on purpose: LinkedIn is the contact channel, since it
    // has its own spam filtering and an email address in a page's source is
    // one of the first things harvesting bots scrape. `primary: true` gives
    // a link the filled-button treatment instead of the plain outline style.
    links: [
      { label: "Message me on LinkedIn", href: "https://www.linkedin.com/in/deep-sehgal-850865a1", primary: true },
      { label: "Medium", href: "https://medium.com/@dmsehgal" },
      { label: "GitHub", href: "https://github.com/dmsehgal87" }
    ]
  },

  focusAreas: [
    {
      title: "AI Evaluation and LLM-as-Judge Systems",
      body:
        "Designing golden-set evaluation frameworks that turn model response quality into a " +
        "measurable, CI/CD-gated signal instead of a subjective read."
    },
    {
      title: "Test Infrastructure and Release Governance",
      body:
        "Release criteria, failure triage, regression management, and the presubmit gates that " +
        "let a large org ship on a predictable cadence."
    },
    {
      title: "Consumer Hardware Validation",
      body:
        "Over-the-air update validation, on-device debugging, and the diagnostics pipeline that " +
        "turns a field failure into a reproducible ticket."
    },
    {
      title: "Engineering Leadership",
      body:
        "Hiring, mentoring, and running distributed engineering organizations across the United " +
        "States and India, including vendor and lab partners."
    }
  ],

  impact: [
    "Architected an LLM-as-judge evaluation framework for Alexa+ scoring thousands of golden-set " +
      "cases across four quality dimensions, gating every release against response-quality " +
      "regressions.",
    "Built and drove adoption of an agentic tool that cut requirements analysis from roughly 3 " +
      "days to under 10 minutes, adopted across 20+ organizations with no mandate behind it.",
    "Four years validating Alexa across Echo family consumer devices: over-the-air update " +
      "validation, on-device debugging over the command line, and the log-capture process the " +
      "org uses to turn field failures into reproducible tickets.",
    "Lead a 40+ person organization of engineers and vendor partners across two continents.",
    "Cut release cycle time by 30% while sustaining 99.99% availability for experiences reaching " +
      "10M+ users."
  ],

  experience: [
    {
      company: "Amazon",
      title: "Quality Assurance Manager, L6",
      location: "Sunnyvale, CA",
      dates: "June 2022 to Present"
    },
    {
      company: "FINRA",
      title: "Quality Assurance Manager",
      location: "Reston, VA",
      dates: "October 2017 to May 2022"
    },
    {
      company: "Gartner",
      title: "Senior Software Developer, Java",
      location: "",
      dates: "September 2013 to October 2017"
    },
    {
      company: "QA Infotech (Adobe)",
      title: "Senior Software Engineer in Test",
      location: "Noida, India",
      dates: "November 2010 to August 2013"
    }
  ],

  education: {
    degree: "Bachelor of Engineering, Information Technology",
    school: "Bharati Vidyapeeth University, Pune, India",
    year: "2010"
  },

  affiliations: ["IEEE Member"],

  volunteerAffiliations: ["Tracy Community Connections Center", "Amazon Volunteer Programs"],

  certifications: [
    "AWS Certified Associate",
    "Shift-Left Security Engineering",
    "Quality Control Foundations, Test Engineering (QCFLTE)",
    "Microsoft Enterprise Product Management Fundamentals"
  ],

  // Peer-reviewed and editorial work. Add new entries at the top.
  // `image` is optional, see the note at the top of this file for how to add one.
  publications: [
    {
      title: "Kasauti: a voice hallucination benchmark",
      status: "Under review, NAACL 2027",
      description:
        "500 utterances evaluated across four AI models under time constraints. Finds that " +
        "models contradict themselves on factual data.",
      href: "",
      image: ""
    },
    {
      title: "LLM-as-a-judge calibration",
      status: "Under review, IEEE Computer Society magazine",
      description:
        "Four LLM graders scored 374 human-labelled statements under matched and unmatched " +
        "information conditions, measured against a two-annotator human baseline.",
      href: "",
      image: ""
    },
    {
      title: "Your Test Suite Is Lying to You: Why Static Validation Can’t Catch What Generative AI Breaks",
      status: "AI Quality Engineer, Medium, 2026",
      description: "Why deterministic QA fails for LLMs, and how semantic evaluation and guardrails prevent hallucinations.",
      href: "https://medium.com/ai-in-quality-assurance/your-test-suite-is-lying-to-you-why-static-validation-cant-catch-what-generative-ai-breaks-ff2354e21344",
      image: "assets/img/pub-test-suite-lying.jpg"
    },
    {
      title: "Why QA Engineers Are the New Guardians of AI Trust",
      status: "Medium and LinkedIn, 2025",
      description: "Reached 1,471 LinkedIn impressions and 729 members.",
      href: "https://medium.com/@dmsehgal/why-qa-engineers-are-the-new-guardians-of-ai-trust-2c51c7b8a004",
      image: "assets/img/pub-guardians-of-ai-trust.jpg"
    },
    {
      title: "The Next Step in AI Maturity: Rethinking Human-in-the-Loop",
      status: "Medium, 2026",
      description: "",
      href: "https://medium.com/@dmsehgal/the-next-step-in-ai-maturity-rethinking-human-in-the-loop-d9491b6b5f51",
      image: "assets/img/pub-human-in-the-loop.jpg"
    },
    {
      title: "Cubic Test Automation",
      status: "Presentation, International Software Testing Conference, Nov 17, 2011",
      description: "",
      href: "",
      image: ""
    }
  ],

  // Starts empty. Add an entry here whenever you're quoted, interviewed, or
  // featured somewhere. Example shape:
  // { outlet: "Example Publication", title: "Article title", date: "2026-11", href: "https://..." }
  mediaCoverage: [],

  projects: [
    {
      title: "ICC Cricket Watchface",
      body: "WatchOS app that scrapes live cricket scores onto an Apple Watch face.",
      href: "https://github.com/dmsehgal87/ICC-watchface"
    },
    {
      title: "FinPulse Watchface",
      body: "WatchOS health-tracking face with step metrics and a live leaderboard.",
      href: "https://github.com/dmsehgal87"
    }
  ]
};
