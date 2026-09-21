/* ============================================================
   KATEMBO SAFARI — STRUCTURED CONTENT
   Single source of truth for all repeatable business content.
   Load before script.js on every page.
   ============================================================ */
window.KATEMBO = (function () {
  'use strict';

  var IMG = {
    hero: 'images/hero-safari.jpg',
    migration: 'images/exp-migration.jpg',
    crater: 'images/exp-crater.jpg',
    helicopter: 'images/exp-helicopter.jpg',
    tented: 'images/lodge-tented.jpg',
    villa: 'images/lodge-villa.jpg'
  };

  /* -------------------------------------------------------------------
     SITE CONFIG
     !!! OWNER ACTION REQUIRED — verify every value before production. !!!
     Social URLs, phone, address, baseUrl and any statistics are
     placeholders / unverified and MUST be confirmed by the business.
     ------------------------------------------------------------------- */
  var siteConfig = {
    name: 'Katembo Safari',
    legalName: 'Katembo Safari Ltd.',
    tagline: 'Timeless, untethered luxury.',
    logo: 'katemo safaris.jpeg',
    // Live deployment domain. Change to the owned domain before production.
    baseUrl: 'https://katembo-site.vercel.app',
    // Placeholder contact details — confirm before going live.
    email: 'journeys@katembosafari.com',
    phone: '+255 700 000 000',
    phoneHref: 'tel:+255700000000',
    locations: ['Arusha, Tanzania', 'Nairobi, Kenya'],

    // Social profiles. Leave url empty to hide the icon entirely.
    socials: [
      { name: 'Instagram', url: '' },
      { name: 'Facebook', url: '' },
      { name: 'YouTube', url: '' },
      { name: 'X', url: '' }
    ],

    // UNVERIFIED STATISTICS — shown on the homepage. These figures were
    // carried over from an earlier concept and MUST be confirmed (or
    // removed) by the owner before public launch.
    stats: [
      { value: '15+', label: 'Years of Excellence', verified: false },
      { value: '98%', label: 'Guest Return Rate', verified: false },
      { value: '40+', label: 'Private Concessions', verified: false }
    ],

    navigation: {
      primary: [
        { label: 'Home', href: '/' },
        { label: 'Journeys', href: '/journeys/' },
        { label: 'Destinations', href: '/destinations/' },
        { label: 'Experiences', href: '/experiences/' },
        { label: 'Places to Stay', href: '/stays/' },
        { label: 'About', href: '/about.html' },
        { label: 'Journal', href: '/journal.html' }
      ],
      cta: { label: 'Plan Your Safari', href: '/plan.html' }
    },

    footer: {
      destinations: [
        { label: 'Serengeti', href: '/destinations/serengeti' },
        { label: 'Ngorongoro', href: '/destinations/ngorongoro' },
        { label: 'Tarangire', href: '/destinations/tarangire' },
        { label: 'Ruaha', href: '/destinations/ruaha' },
        { label: 'Zanzibar', href: '/destinations/zanzibar' }
      ],
      experiences: [
        { label: 'Great Migration', href: '/experiences/great-migration' },
        { label: 'Balloon Safari', href: '/experiences/hot-air-balloon-safari' },
        { label: 'Walking Safari', href: '/experiences/walking-safari' },
        { label: 'Helicopter Safari', href: '/experiences/helicopter-safari' }
      ],
      legal: [
        { label: 'Privacy', href: '/privacy.html' },
        { label: 'Terms', href: '/terms.html' },
        { label: 'Responsible Tourism', href: '/responsible-tourism.html' }
      ]
    }
  };

  /* -------------------------------------------------------------------
     JOURNEYS
     ------------------------------------------------------------------- */
  var journeys = [
    {
      title: 'The Great Migration',
      slug: 'great-migration',
      destinations: ['Serengeti'],
      duration: '7–9 nights',
      image: IMG.migration,
      description: 'Follow the great herds across the Serengeti–Mara ecosystem during the river-crossing season.',
      overview: 'Nature’s grandest spectacle unfolds across the endless plains. Positioned in mobile camps that move with the herds, guests wake each morning to a landscape in motion — wildebeest, zebra and gazelle by the hundreds of thousands, and the river crossings that define the season.',
      highlights: ['River-crossing season, timed to the herds', 'Mobile camps that move with the migration', 'Private game vehicles and guides', 'Serengeti’s legendary open plains'],
      bestSeason: { label: 'June – October', note: 'The dry-season river crossings in the northern Serengeti.' },
      accommodation: { title: 'Under canvas', note: 'A mobile camp that relocates with the herds — the classic migration experience.' },
      itinerary: [
        { heading: 'Days 1–2', text: 'Arrive in the Serengeti by light aircraft and settle into camp, with an afternoon game drive across the plains.' },
        { heading: 'Days 3–5', text: 'Game drives tracking the herds, timed to the crossings. Sundowners at the water’s edge with the last light.' },
        { heading: 'Days 6–7', text: 'Move camp with the migration — including, by season, the banks of the Mara River. Bush breakfasts and night drives.' },
        { heading: 'Days 8–9', text: 'Final drives, a farewell lunch at camp, and onwards by air — or continue to the coast.' }
      ],
      gallery: [IMG.migration, IMG.hero, IMG.tented],
      related: ['serengeti-ngorongoro', 'bush-and-beach', 'family-safari'],
      cta: 'Request a Tailored Quote'
    },
    {
      title: 'Serengeti & Ngorongoro',
      slug: 'serengeti-ngorongoro',
      destinations: ['Serengeti', 'Ngorongoro'],
      duration: '6–8 nights',
      image: IMG.crater,
      description: 'Two of Africa’s most storied wildernesses in one seamless journey.',
      overview: 'The classic crossing of two incomparable reserves — the boundless savanna of the Serengeti and the enclosed natural wonder of the Ngorongoro Crater. Game drives range from open plains to the caldera floor, where the density of wildlife is unmatched anywhere on earth.',
      highlights: ['Full day inside the Ngorongoro Crater', 'Serengeti plains and river systems', 'Crater-rim accommodations', 'Good chances of spotting the complete Big Five'],
      bestSeason: { label: 'Year-round', note: 'Each season offers distinct wildlife and scenery in both reserves.' },
      accommodation: { title: 'Lodge & tented camp', note: 'A mix of crater-rim lodges and Serengeti camps.' },
      itinerary: [
        { heading: 'Days 1–2', text: 'Arusha to Ngorongoro, with an afternoon descent to the crater floor for the first game drive.' },
        { heading: 'Days 3–4', text: 'Further crater explorations, a visit to a Maasai community, and the scenic drive north.' },
        { heading: 'Days 5–6', text: 'Serengeti plains in full swing — kopjes, big cats and vast herds.' },
        { heading: 'Days 7–8', text: 'A hot-air balloon safari at dawn, farewell brunch at camp and onward flights.' }
      ],
      gallery: [IMG.crater, IMG.migration, IMG.tented],
      related: ['great-migration', 'tanzania-highlights', 'honeymoon-safari'],
      cta: 'Request a Tailored Quote'
    },
    {
      title: 'Tanzania Highlights',
      slug: 'tanzania-highlights',
      destinations: ['Tarangire', 'Serengeti', 'Ngorongoro', 'Zanzibar'],
      duration: '9–12 nights',
      image: IMG.tented,
      description: 'A grand sweep of northern Tanzania — from Tarangire’s baobabs to the crater and the spice-island coast.',
      overview: 'The definitive Tanzanian safari. Begin among the ancient baobabs and elephant herds of Tarangire, continue through the crater and Serengeti, and end with the white sand and turquoise waters of Zanzibar. A complete composition of the country’s greatest landscapes.',
      highlights: ['Tarangire’s elephants and baobab forests', 'Ngorongoro Crater', 'Serengeti plains', 'Zanzibar’s beaches and Stone Town'],
      bestSeason: { label: 'June – March', note: 'The broadest wildlife window for northern Tanzania.' },
      accommodation: { title: 'A journey of stays', note: 'Tented camps, crater-rim lodges and a beach retreat selected for each region.' },
      itinerary: [
        { heading: 'Days 1–3', text: 'Tarangire National Park — game drives punctuated by wild baobab landscapes.' },
        { heading: 'Days 4–6', text: 'Ngorongoro Crater and the Lake Manyara area, followed by the drive into the Serengeti.' },
        { heading: 'Days 7–9', text: 'The Serengeti in full, from open plains to woodland margins.' },
        { heading: 'Days 10–12', text: 'Fly to Zanzibar for the beach leg — swimming, sailing and the lanes of Stone Town.' }
      ],
      gallery: [IMG.tented, IMG.hero, IMG.villa],
      related: ['serengeti-ngorongoro', 'bush-and-beach', 'safari-and-zanzibar'],
      cta: 'Request a Tailored Quote'
    },
    {
      title: 'Bush & Beach',
      slug: 'bush-and-beach',
      destinations: ['Serengeti', 'Zanzibar'],
      duration: '8–11 nights',
      image: IMG.villa,
      description: 'The great game parks followed by the perfect Indian Ocean idyll.',
      overview: 'The balance most travellers dream of — days of raw, untamed wilderness followed by the stillness of an Indian Ocean beach. Combine the drama of the bush with the deep calm of the coast, and finish on a note of complete release.',
      highlights: ['Northern-circuit game viewing', 'Beach retreat with private plunge pool', 'Spice tours and dhow sailing', 'Big Five by day, salt air by night'],
      bestSeason: { label: 'Year-round', note: 'Wildlife peaks in the dry season; the coast is beautiful all year.' },
      accommodation: { title: 'Camp & retreat', note: 'A classic tented camp in the wilderness, then a low-key luxury beach retreat.' },
      itinerary: [
        { heading: 'Days 1–5', text: 'The wilderness leg — game drives in the Serengeti and Ngorongoro.' },
        { heading: 'Days 6–8', text: 'Fly to the coast. Days of swimming, sailing and long lunches under the palms.' },
        { heading: 'Days 9–11', text: 'Optional Stone Town, spice farms and the departure flight.' }
      ],
      gallery: [IMG.hero, IMG.migration, IMG.villa],
      related: ['honeymoon-safari', 'safari-and-zanzibar', 'great-migration'],
      cta: 'Request a Tailored Quote'
    },
    {
      title: 'Honeymoon Safari',
      slug: 'honeymoon-safari',
      destinations: ['Ngorongoro', 'Serengeti', 'Zanzibar'],
      duration: '7–10 nights',
      image: IMG.villa,
      description: 'An intimate journey for two — romantics of the bush and the coast.',
      overview: 'A private journey designed entirely around the two of you. Private vehicles, candle-lit dinners under the stars, a suite set high above the plains, and finally a barefoot beach escape. Africa at its most tender.',
      highlights: ['Private vehicle and guide throughout', 'Sundowner picnics in private locations', 'Romantic candle-lit dinners', 'Private beach villa on the coast'],
      bestSeason: { label: 'Year-round', note: 'Every season has its mood; we advise around your dates.' },
      accommodation: { title: 'Suite & private villa', note: 'High-end suites and an exclusive-use beach villa.' },
      itinerary: [
        { heading: 'Days 1–3', text: 'Private game drives at Ngorongoro and the surrounding highlands.' },
        { heading: 'Days 4–5', text: 'The Serengeti — hot-air balloon at dawn, private picnic in the plains.' },
        { heading: 'Days 6–8', text: 'The coast — a private villa, days of complete privacy by the sea.' }
      ],
      gallery: [IMG.villa, IMG.crater, IMG.hero],
      related: ['bush-and-beach', 'serengeti-ngorongoro', 'tanzania-highlights'],
      cta: 'Request a Tailored Quote'
    },
    {
      title: 'Family Safari',
      slug: 'family-safari',
      destinations: ['Tarangire', 'Ngorongoro', 'Serengeti'],
      duration: '6–8 nights',
      image: IMG.tented,
      description: 'A safari that delights every generation — interconnecting tents, flexible timings and gentle game viewing.',
      overview: 'Designed for families travelling together, with the pace set by the youngest and eldest among you. Interconnecting suites, dedicated rangers, half-day outings and games planned around nap times — a wilderness that feels made for your whole group.',
      highlights: ['Interconnecting family suites', 'Flexible drive times and child-friendly guides', 'Junior ranger activities', 'Space to stretch out between adventures'],
      bestSeason: { label: 'July – March', note: 'Reliable dry-weather game viewing and lighter crowds at many parks.' },
      accommodation: { title: 'Family-friendly camps', note: 'Camps and lodges as comfortable with children as with adults.' },
      itinerary: [
        { heading: 'Days 1–3', text: 'Tarangire — gentle drives, elephants and plenty of running room at camp.' },
        { heading: 'Days 4–5', text: 'Ngorongoro Crater — the world’s greatest natural amphitheatre.' },
        { heading: 'Days 6–8', text: 'The Serengeti plains, ending with a slower morning and the departure flight.' }
      ],
      gallery: [IMG.tented, IMG.migration, IMG.hero],
      related: ['great-migration', 'tanzania-highlights', 'safari-and-zanzibar'],
      cta: 'Request a Tailored Quote'
    },
    {
      title: 'Safari & Zanzibar',
      slug: 'safari-and-zanzibar',
      destinations: ['Serengeti', 'Ngorongoro', 'Zanzibar'],
      duration: '9–12 nights',
      image: IMG.hero,
      description: 'Wilderness and ocean — the full sweep of northern Tanzania with an island finish.',
      overview: 'The complete Tanzanian postcard. Deep days in the Serengeti and Ngorongoro flow into a slow, sunlit week on Zanzibar — spice-scented Stone Town at one end, powder-white beaches at the other.',
      highlights: ['Serengeti and crater game viewing', 'Private beach on the east coast', 'Stone Town and spice tours', 'Long, unhurried beach days'],
      bestSeason: { label: 'June – March', note: 'The classic dry season is tied to this journey’s pacing.' },
      accommodation: { title: 'Camp, lodge and island resort', note: 'Chosen for connection to the wild, then to the sea.' },
      itinerary: [
        { heading: 'Days 1–6', text: 'The northern circuit — Serengeti, Ngorongoro and the country between.' },
        { heading: 'Days 7–9', text: 'Zanzibar’s east-coast beaches — sailing, snorkelling and utter stillness.' },
        { heading: 'Days 10–12', text: 'Stone Town’s labyrinthine streets, spice farms, and the flight home.' }
      ],
      gallery: [IMG.hero, IMG.villa, IMG.migration],
      related: ['safari-and-zanzibar', 'bush-and-beach', 'honeymoon-safari'],
      cta: 'Request a Tailored Quote'
    },
    {
      title: 'Tanzania & Kenya',
      slug: 'tanzania-kenya',
      destinations: ['Serengeti', 'Ngorongoro', 'Kenya'],
      duration: '9–13 nights',
      image: IMG.hero,
      description: 'Two great East African ecosystems in a single seamless crossing of the border.',
      overview: 'A cross-border journey joining the Serengeti and the Masai Mara into one continuous story of the savanna. Fly between the two, letting the migration — and the landscape — unfold without interruption.',
      highlights: ['Both sides of the Serengeti–Mara ecosystem', 'Chartered light-aircraft transfers', 'Kenya’s conservancies at your own pace', 'Migration crossings, in season'],
      bestSeason: { label: 'June – October', note: 'The great river crossings roam between the two countries in these months.' },
      accommodation: { title: 'Cross-border camps', note: 'Camps tracking the herds across the Tanzanian–Kenyan border.' },
      itinerary: [
        { heading: 'Days 1–4', text: 'The southern and central Serengeti — plains and predators at scale.' },
        { heading: 'Days 5–8', text: 'Northern Serengeti and the border crossings into the Masai Mara.' },
        { heading: 'Days 9–11', text: 'The Mara conservancies — private concessions away from the crowds.' },
        { heading: 'Days 12–13', text: 'Final drives and outbound flights through Nairobi or Arusha.' }
      ],
      gallery: [IMG.migration, IMG.hero, IMG.tented],
      related: ['great-migration', 'serengeti-ngorongoro', 'tanzania-highlights'],
      cta: 'Request a Tailored Quote'
    }
  ];

  /* -------------------------------------------------------------------
     DESTINATIONS
     ------------------------------------------------------------------- */
  var destinations = [
    {
      title: 'Serengeti',
      slug: 'serengeti',
      region: 'Northern Tanzania',
      image: IMG.hero,
      intro: 'The endless plains — Africa in its largest, wildest register.',
      overview: 'The Serengeti is the great stage of East Africa: 14,000 square kilometres of open savanna supporting the planet’s last great terrestrial migration. Its scale delivers the purest form of wildlife viewing — herds that stretch to the horizon and the predators that follow them.',
      wildlife: ['Lions, leopards and cheetahs', 'The great wildebeest migration', 'Elephants, giraffes and buffalo', 'More than 500 recorded bird species'],
      landscapes: ['Open golden plains and kopjes', 'The Mara and Grumeti river systems', 'Acacia woodlands and marshes', 'The volcanic highlands on its eastern edge'],
      bestTime: 'Year-round game viewing; the migration runs its annual circuit through the reserve.',
      experiences: ['Great Migration', 'Hot Air Balloon Safari', 'Private Game Drive'],
      relatedJourneys: ['great-migration', 'serengeti-ngorongoro', 'tanzania-highlights'],
      gallery: [IMG.hero, IMG.migration, IMG.tented],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Ngorongoro',
      slug: 'ngorongoro',
      region: 'Northern Tanzania',
      image: IMG.crater,
      intro: 'A vast volcanic caldera that concentrates Africa’s wildlife into one bowl.',
      overview: 'The Ngorongoro Crater is the world’s largest intact volcanic caldera — a self-contained wilderness whose floor holds one of the densest concentrations of large mammals on earth. Descending into it is like entering a natural arena sealed by ancient ash.',
      wildlife: ['The complete Big Five', 'Large prides of lions', 'Black rhino, rarely elsewhere in such numbers', 'Hippo pools along the crater floor'],
      landscapes: ['The crater rim at altitude', 'Lush crater-floor grasslands', 'Lake Magadi and its soda flats', 'Volcanic highlands and Maasai grazing lands'],
      bestTime: 'Year-round; the crater floor is consistently rich in wildlife.',
      experiences: ['Private Game Drive', 'Cultural Experience', 'Photography Safari'],
      relatedJourneys: ['serengeti-ngorongoro', 'tanzania-highlights', 'bush-and-beach'],
      gallery: [IMG.crater, IMG.migration, IMG.tented],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Tarangire',
      slug: 'tarangire',
      region: 'Northern Tanzania',
      image: IMG.tented,
      intro: 'Baobabs, elephants and the quiet drama of one of Africa’s great hidden parks.',
      overview: 'Tarangire is the reserve connoisseurs love — less crowded than the north, yet immense. Ancient baobabs rise above elephant herds; the Tarangire river draws wildlife in the dry season, and the landscape holds a wildness the more famous parks have outgrown.',
      wildlife: ['Africa’s largest elephant populations', 'Tree-climbing lions of the region', 'Leopards in the riverine forest', 'Huge flocks of birds in the wet season'],
      landscapes: ['Baobab-studded plains', 'The Tarangire river and its gallery forest', 'Seasonal wetlands and swamps', 'Rocky hills and marsh edges'],
      bestTime: 'June – October, when the river concentrates the park’s wildlife.',
      experiences: ['Private Game Drive', 'Walking Safari', 'Photography Safari'],
      relatedJourneys: ['tanzania-highlights', 'family-safari'],
      gallery: [IMG.tented, IMG.hero, IMG.migration],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Nyerere',
      slug: 'nyerere',
      region: 'Southern Tanzania',
      image: IMG.hero,
      intro: 'Southern Africa’s great wild block — Africa’s largest national park by area.',
      overview: 'Formerly the Selous Game Reserve, Nyerere is Africa’s largest national park — a vast, wild canvas of bush, river and wetland in the far south. It offers the intimacy of true wilderness, vast without the crowds.',
      wildlife: ['Immense elephant and buffalo populations', 'Wild dogs in one of their strongholds', 'Lions, including the region’s tree-climbing prides', 'Hippo and crocodile along the Rufiji'],
      landscapes: ['The great Rufiji river system', 'Mopane and miombo woodlands', 'Lakes and seasonal floodplains', 'Untouched southern bush'],
      bestTime: 'June – October for game; some areas open year-round.',
      experiences: ['Walking Safari', 'Photography Safari', 'Conservation Experience'],
      relatedJourneys: ['serengeti-ngorongoro', 'tanzania-highlights'],
      gallery: [IMG.hero, IMG.tented, IMG.migration],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Ruaha',
      slug: 'ruaha',
      region: 'Southern Tanzania',
      image: IMG.migration,
      intro: 'Giant baobab valleys and one of Africa’s greatest densities of predators.',
      overview: 'Ruaha stitches together the eastern and southern game parks of Tanzania — a vast river-laced wilderness supporting densities of elephants and predators that rival anywhere on the continent. It rewards time and patience with returns no other park offers.',
      wildlife: ['Lions in unusual abundance', 'Leopards and cheetahs', 'Large elephant concentrations', 'Over 500 bird species including endemic rarities'],
      landscapes: ['The great Ruaha river', 'Baobab-studded escarpments', 'Woodland and open grassland mosaics', 'Remote, roadless wilderness'],
      bestTime: 'June – October for the dry-season concentration of wildlife.',
      experiences: ['Walking Safari', 'Photography Safari', 'Private Game Drive'],
      relatedJourneys: ['tanzania-highlights', 'great-migration'],
      gallery: [IMG.migration, IMG.crater, IMG.hero],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Zanzibar',
      slug: 'zanzibar',
      region: 'Tanzanian coast',
      image: IMG.villa,
      intro: 'White sand, spice-scented lanes and the aquamarine of the Indian Ocean.',
      overview: 'The island finish to so many great safaris — and a world in its own right. Corbelled beaches, the labyrinthine alleys of Stone Town, spice plantations and dhows on turquoise water. For many guests, the gentlest chapter of the entire journey.',
      wildlife: ['Tropical reef and sea-turtle waters', 'Humpback whales offshore in season', 'Colobus monkeys in Jozani Forest', 'Abundant coastal seabirds'],
      landscapes: ['Powder-white east-coast beaches', 'The historic streets of Stone Town', 'Spice plantations of the interior', 'Mangrove forests and tidal lagoons'],
      bestTime: 'June – October and December – February bring the best sea conditions.',
      experiences: ['Cultural Experience', 'Photography Safari', 'Honeymoon Safari'],
      relatedJourneys: ['bush-and-beach', 'safari-and-zanzibar', 'honeymoon-safari'],
      gallery: [IMG.villa, IMG.hero, IMG.tented],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Kilimanjaro',
      slug: 'kilimanjaro',
      region: 'Northern Tanzania',
      image: IMG.hero,
      intro: 'Africa’s crown — the snow-capped roof of the continent.',
      overview: 'Mount Kilimanjaro rises 5,895 metres from the plains — the highest free-standing mountain on earth. Whether it frames your arrival from the air or provides the backdrop to the first days of a journey, it is the symbol at the heart of East African travel.',
      wildlife: ['Montane forest elephants and Colobus monkeys', 'Buffalo on the forested slopes', 'Rich highland birdlife', 'Alpine desert above the treeline'],
      landscapes: ['The snow-capped Shira and Kibo peaks', 'Dense montane rainforest', 'Moorland and alpine desert', 'The plains spreading out beneath'],
      bestTime: 'Clear views are most reliable in the dry months of June – September and January – March.',
      experiences: ['Walking Safari', 'Photography Safari', 'Cultural Experience'],
      relatedJourneys: ['tanzania-highlights', 'serengeti-ngorongoro'],
      gallery: [IMG.hero, IMG.crater, IMG.migration],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Tanzania',
      slug: 'tanzania',
      region: 'East Africa',
      image: IMG.hero,
      intro: 'One country, an entire continent of landscapes.',
      overview: 'Tanzania holds a fuller spread of African wilderness than almost any other nation — the plains of the Serengeti, the crater of Ngorongoro, the southern wilds of Ruaha and Nyerere, the forests of Kilimanjaro, and an ocean coastline that needs no introduction. Rarely does a single country offer so much.',
      wildlife: 'The full sweep of East African wildlife, from the great migration to the rarest of forest endemics.',
      landscapes: ['Savanna, crater, river and mountain', 'Indian Ocean islands and reefs', 'The southern wild parks', 'Volcanic highlands and rift valleys'],
      bestTime: 'Dependable game viewing across the northern circuit in the dry months, with the coast beautiful year-round.',
      experiences: ['Great Migration', 'Hot Air Balloon Safari', 'Honeymoon Safari'],
      relatedJourneys: ['tanzania-highlights', 'bush-and-beach', 'safari-and-zanzibar'],
      gallery: [IMG.hero, IMG.crater, IMG.villa],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Kenya',
      slug: 'kenya',
      region: 'East Africa',
      image: IMG.tented,
      intro: 'The Masai Mara and the conservancies — Kenya’s great game country.',
      overview: 'Kenya pairs the unrivalled drama of the Masai Mara with a network of private conservancies around its borders — the finest model of low-impact, high-privacy safari land on the continent. Combined with Tanzania, it completes the migration story.',
      wildlife: ['The lions of the Mara', 'Migration crossings across the Mara River', 'Cheetah on the open grassland', 'The wildlife of the private conservancies'],
      landscapes: ['The tree-lined Mara and Talek rivers', 'Open golden grassland', 'The Loita hills on the horizon', 'Private conservancy wilderness'],
      bestTime: 'The July – October crossings draw the world; conservancies excel year-round.',
      experiences: ['Private Game Drive', 'Great Migration', 'Conservation Experience'],
      relatedJourneys: ['tanzania-kenya', 'great-migration', 'bush-and-beach'],
      gallery: [IMG.tented, IMG.migration, IMG.hero],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Rwanda',
      slug: 'rwanda',
      region: 'East Africa',
      image: IMG.migration,
      intro: 'The volcanoes and the mountain gorillas — the most profound wildlife encounter of all.',
      overview: 'Rwanda’s Volcanoes National Park protects the last great population of mountain gorillas. A permitted hour beside a silverback family is widely considered the single most profound wildlife encounter in Africa — a journey that belongs on any serious traveller’s list.',
      wildlife: ['Mountain gorillas of the Virunga massif', 'Golden monkeys in the bamboo forest', 'Forest birds and the volcanic highlands', 'The wider montane ecosystem'],
      landscapes: ['A chain of extinct volcanoes', 'Ancient bamboo and Hagenia forest', 'Rolling tea-country at the park’s edge', 'The lakes and hills of the land of a thousand hills'],
      bestTime: 'Dry months (June – September, December – February) make tracking easier.',
      experiences: ['Conservation Experience', 'Walking Safari', 'Photography Safari'],
      relatedJourneys: ['tanzania-highlights', 'tanzania-kenya'],
      gallery: [IMG.migration, IMG.hero, IMG.tented],
      cta: 'Plan Your Safari'
    }
  ];

  /* -------------------------------------------------------------------
     EXPERIENCES
     ------------------------------------------------------------------- */
  var experiences = [
    {
      title: 'The Great Migration',
      slug: 'great-migration',
      type: 'Wildlife',
      image: IMG.migration,
      description: 'The world’s last great terrestrial migration, witnessed from its very heart.',
      overview: 'Somewhere on the Serengeti–Mara ecosystem, a river crossing is always possible — the question is being in the right place at the right hour. Following the herds in mobile camps and private vehicles is one of the most rewarding disciplines in African travel.',
      highlights: ['River crossings, timed with the herds', 'Mobile camps that track the migration', 'The scale of the assembled herds', 'Sundowners among the movement'],
      bestFor: 'First-time safari-goers and returning enthusiasts alike.',
      duration: '4–6 nights',
      gallery: [IMG.migration, IMG.hero, IMG.tented],
      related: ['hot-air-balloon-safari', 'private-game-drive', 'photography-safari'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Hot Air Balloon Safari',
      slug: 'hot-air-balloon-safari',
      type: 'Signature',
      image: IMG.hero,
      description: 'Float above the plains at dawn, when the wild is still waking.',
      overview: 'The balloon lifts before light, drifting silently over the tipped silhouettes of the savanna as the savanna wakes beneath. Breakfast lands you afterwards on a table laid in the middle of nowhere — a morning that belongs only to the sky.',
      highlights: ['A dawn flight over the plains', 'A champagne breakfast at landing', 'Unrivalled perspective on the herds', 'Best reserved for the dry-season mornings'],
      bestFor: 'The single most unforgettable morning of a northern Tanzania journey.',
      duration: 'Half day',
      gallery: [IMG.hero, IMG.migration, IMG.crater],
      related: ['great-migration', 'private-game-drive', 'honeymoon-safari'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Walking Safari',
      slug: 'walking-safari',
      type: 'Active',
      image: IMG.tented,
      description: 'Leave the vehicle behind and meet the bush at ground level.',
      overview: 'On foot, the savanna reveals its smaller scale — the tracks, the scents, the insects and the silence beneath the noise. Led by trained guides and armed watchers, walks are gentle in distance and profound in effect.',
      highlights: ['Expert armed guides and trackers', 'Tracking at ground level', 'The smaller, quieter life of the bush', 'Sundowners on a returned trail'],
      bestFor: 'Those who want more than a window between them and the wild.',
      duration: 'Half – full day',
      gallery: [IMG.tented, IMG.migration, IMG.hero],
      related: ['great-migration', 'photography-safari', 'conservation-experience'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Helicopter Safari',
      slug: 'helicopter-safari',
      type: 'Signature',
      image: IMG.helicopter,
      description: 'Rise above it all — and land where no road leads.',
      overview: 'The helicopter rewrites the map of a safari. Cross the crater in minutes, skim the river from the air, and touch down at fly-camps and viewpoints unreachable by vehicle. Luxury in three dimensions.',
      highlights: ['Aerial game spotting over the plains', 'Access to remote camps and viewpoints', 'Dramatic scenic transits', 'Champagne picnics in the bush'],
      bestFor: 'Composing a shorter, more spectacular version of a large region.',
      duration: '1–3 hours in the air',
      gallery: [IMG.helicopter, IMG.crater, IMG.hero],
      related: ['hot-air-balloon-safari', 'great-migration', 'photography-safari'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Private Game Drive',
      slug: 'private-game-drive',
      type: 'Classic',
      image: IMG.hero,
      description: 'Your own vehicle, your own guide, your own pace — the definitive safari outing.',
      overview: 'The open 4x4, a guide who reads the day like a tide table, and no one’s schedule but your own. Mornings led by the bird chorus, evenings by the setting sun. This is the quiet core of every Katembo journey.',
      highlights: ['An exclusive vehicle for your party', 'A single dedicated professional guide', 'Flexible timing and route by day', 'Bush-crafted picnic or sundowner'],
      bestFor: 'Everyone — it is the foundation of the whole experience.',
      duration: 'Half or full day',
      gallery: [IMG.hero, IMG.migration, IMG.crater],
      related: ['great-migration', 'walking-safari', 'photography-safari'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Photography Safari',
      slug: 'photography-safari',
      type: 'Specialist',
      image: IMG.migration,
      description: 'Composed light, patient positioning and the wild in perfect frame.',
      overview: 'A safari arranged around light and composition. Accommodations chosen for position, drives timed for golden hour, and the patience to wait for the image rather than chase it. Complete photography support, without ever making the trip feel like a class.',
      highlights: ['Positioning timed to the light', 'Vantage points chosen for composition', 'Camera support and handling assistance', 'Portfolio-grade light across the journey'],
      bestFor: 'Serious hobbyists and first-time photographers alike.',
      duration: '4–8 nights',
      gallery: [IMG.migration, IMG.hero, IMG.crater],
      related: ['great-migration', 'hot-air-balloon-safari', 'walking-safari'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Cultural Experience',
      slug: 'cultural-experience',
      type: 'Immersive',
      image: IMG.tented,
      description: 'The people of the land — connection over performance.',
      overview: 'Meeting the Maasai — or any of the region’s communities — is a privilege when done quietly and with respect. These are unhurried visits arranged through long-standing relationships: daily life, not display; conversation, not applause.',
      highlights: ['Visits arranged through real relationships', 'Daily life and land use, seen firsthand', 'Handcrafts and trade done fairly', 'Space to listen more than to photograph'],
      bestFor: 'Travellers who want people in the picture as much as the wildlife.',
      duration: 'Half day or longer',
      gallery: [IMG.tented, IMG.villa, IMG.hero],
      related: ['walking-safari', 'conservation-experience', 'private-game-drive'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Conservation Experience',
      slug: 'conservation-experience',
      type: 'Immersive',
      image: IMG.migration,
      description: 'Behind the scenes of the land itself — for a day, part of the team.',
      overview: 'With accredited guides and researchers, join the work that keeps the wild wild: from habitat surveys to community projects, anti-poaching support to ecological monitoring. A rare note of purpose inside a journey of pleasure.',
      highlights: ['Field work with accredited teams', 'Insight into landscape-scale conservation', 'Community and ranger visits', 'Every contribution paid through local operators'],
      bestFor: 'Those who leave the wild better than they found it.',
      duration: 'Half day – several days',
      gallery: [IMG.migration, IMG.tented, IMG.hero],
      related: ['cultural-experience', 'walking-safari', 'great-migration'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Honeymoon Safari',
      slug: 'honeymoon-safari',
      type: 'Romantic',
      image: IMG.villa,
      description: 'A private world for two, from the crater’s edge to the ocean.',
      overview: 'Travelling as two who are new to being two. Private everything, from vehicle to dining tables, and a route that descends from the high bush to the beach in unhurried steps. Africa as a backdrop to the pair of you.',
      highlights: ['Private vehicle, guide and tables', 'Romantic suppers under the stars', 'Suites and villas set apart', 'A quiet beach finish'],
      bestFor: 'Honeymoons, anniversaries, or any journey where privacy is everything.',
      duration: '7–10 nights',
      gallery: [IMG.villa, IMG.crater, IMG.hero],
      related: ['bush-and-beach', 'hot-air-balloon-safari', 'private-game-drive'],
      cta: 'Plan Your Safari'
    },
    {
      title: 'Family Safari',
      slug: 'family-safari',
      type: 'Family',
      image: IMG.tented,
      description: 'Wilderness shared across the generations — at the pace of the youngest.',
      overview: 'Interconnecting suites, flexible drive times and guides who are twice as patient with children. A safari that lets grandparents and grandchildren share the same extraordinary day without anyone watching a clock.',
      highlights: ['Interconnecting family suites', 'Junior ranger programmes', 'Timing arranged around the family', 'Room to run at every camp'],
      bestFor: 'Multi-generational families travelling together.',
      duration: '6–8 nights',
      gallery: [IMG.tented, IMG.migration, IMG.hero],
      related: ['private-game-drive', 'walking-safari', 'great-migration'],
      cta: 'Plan Your Safari'
    }
  ];

  /* -------------------------------------------------------------------
     PLACES TO STAY
     !!! OWNER ACTION REQUIRED — these three properties were carried
     over from an earlier concept. Confirm they are real, current and
     that every listed feature is accurate before they go live.
     ------------------------------------------------------------------- */
  var stays = [
    {
      title: 'Serengeti Under Canvas',
      slug: 'serengeti-under-canvas',
      type: 'Luxury Tented Camp',
      image: IMG.tented,
      location: 'Central Serengeti, Tanzania',
      description: 'An intimate tented camp set for maximum wildlife immersion.',
      overview: 'Eight tented suites positioned for the rhythms of the plain — wake to the sound of the bush, with uninterrupted views stretching to the horizon and lantern-light guiding the way home after dark.',
      features: ['Private plunge pool', 'Stargazing deck', 'Dedicated butler', 'Farm-to-table dining'],
      gallery: [IMG.tented, IMG.hero, IMG.migration],
      verified: false,
      cta: 'Enquire About This Camp'
    },
    {
      title: 'Mara Heights Villa',
      slug: 'mara-heights-villa',
      type: 'Private Safari Villa',
      image: IMG.villa,
      location: 'Masai Mara Conservancy, Kenya',
      description: 'An exclusive-use villa with sweeping 270-degree views of the Mara plains.',
      overview: 'A private villa set on a hillside above the Mara, complete with its own chef, vehicle and guide dedicated solely to your party. The entire property yours alone.',
      features: ['Heated infinity pool', 'Private wine cellar', '24-hour concierge', 'In-villa spa'],
      gallery: [IMG.villa, IMG.tented, IMG.hero],
      verified: false,
      cta: 'Enquire About This Villa'
    },
    {
      title: 'Crater Edge Suite',
      slug: 'crater-edge-suite',
      type: 'Wilderness Suite',
      image: IMG.villa,
      location: 'Ngorongoro Crater Rim, Tanzania',
      description: 'Floor-to-ceiling suites perched on the very edge of the Ngorongoro Crater.',
      overview: 'An unparalleled vantage point over one of Earth’s most extraordinary natural arenas — the caldera’s ancient drama framed in glass from the crater rim.',
      features: ['Crater-view plunge pool', 'Observatory telescope', 'Private guide and vehicle', 'Maasai cultural excursions'],
      gallery: [IMG.villa, IMG.crater, IMG.tented],
      verified: false,
      cta: 'Enquire About This Suite'
    }
  ];

  var stayTypes = [
    { slug: 'camps', title: 'Camps', blurb: 'Mobile and permanent camps pitched in the heart of the action — canvas, lantern light and the bush at the door.' },
    { slug: 'lodges', title: 'Lodges', blurb: 'Bespoke lodges built from local stone and timber, set for views that last from breakfast to sundown.' },
    { slug: 'villas', title: 'Villas', blurb: 'Private, exclusive-use homes with chefs, vehicles and guides devoted entirely to your party.' },
    { slug: 'wilderness-suites', title: 'Wilderness Suites', blurb: 'Sculptural suites placed at the edge of things — the crater, the river, the escarpment.' },
    { slug: 'beach-retreats', title: 'Beach Retreats', blurb: 'Low-key luxury on the Indian Ocean — white sand, private pools and the sound of the tide.' }
  ];

  /* -------------------------------------------------------------------
     TESTIMONIALS — heart set subscribered for genuine, verified reviews.
     Only entries with verified: true are displayed on the site.
     ------------------------------------------------------------------- */
  var testimonials = [
    /* Example (DELETE before launch — illustrative only):
    {
      quote: '...',
      name: 'A. Traveller',
      location: 'United Kingdom',
      journey: 'Tanzania Highlights',
      verified: true,
      rating: 5
    }
    */
  ];

  /* -------------------------------------------------------------------
     JOURNAL — editorial field notes. No fabricated authors or dates.
     ------------------------------------------------------------------- */
  var journal = [
    {
      slug: 'the-great-migration-explained',
      title: 'The Great Migration, Explained',
      image: IMG.migration,
      excerpt: 'What it is, where to see it, and why the herds move at all.',
      body: [
        'The great wildebeest migration is not a single event but a permanent movement — roughly 1.5 million wildebeest, zebra and gazelle tracing an ancient season-circle across the Serengeti–Mara ecosystem, summoned by the rains.',
        'Its rhythms can be read in the grasses. When the plains of the south dry out, the herds gather and push west and north, massing at the Grumeti and Mara rivers. Crossings are a spectacle no image quite prepares you for — the surge, the dust, the waiting crocodiles.',
        'For planning purposes, the crossings of the Mara River are most reliably seen between July and October, but the migration is never truly still. Mobility is the secret: camps and vehicles that move with the herds will always be in the right place.'
      ]
    },
    {
      slug: 'conservation-in-east-africa',
      title: 'How Safari Land Keeps the Wild Wild',
      image: IMG.tented,
      excerpt: 'The quiet work behind the ivory-tower view — concessions, communities and wildlife economies.',
      body: [
        'The single most important fact about the great game reserves is this: they pay for themselves. Wildlife-based tourism generates the revenue that funds anti-poaching, research and community development across East Africa’s protected land.',
        'Private conservancies and game management areas take the model further — leased land, community dividends and low-density tourism. The result is habitat protected at a scale that government budgets alone could never sustain.',
        'Travellers are part of this economy. Choosing accredited operators, staying at lodges with real conservation programmes and paying fairly for community visits all put weight on the careful side of the balance.'
      ]
    },
    {
      slug: 'planning-a-first-safari',
      title: 'Planning a First Safari, Without the Overthinking',
      image: IMG.hero,
      excerpt: 'The trip of a lifetime — approached with calm. A gentle planner for the new traveller.',
      body: [
        'A safari suffers less from under-planning than from over-planning. The essentials are few: the season, the parks, the pace, and enough loose days for the wild to do what it does best — surprise you.',
        'Start with the dry season if you can, when wildlife concentrates around water, and let a specialist arrange the rest. The great advantage of a tailored journey is that someone else worries about the logistics while you hold nothing but a camera and a glass.',
        'Above all, leave room. The best days on safari are rarely the ones that were scheduled.'
      ]
    }
  ];

  /* -------------------------------------------------------------------
     ENQUIRY FORM CONFIG
     ------------------------------------------------------------------- */
  var enquiry = {
    destinations: [
      'Serengeti', 'Ngorongoro', 'Tarangire', 'Nyerere', 'Ruaha',
      'Zanzibar', 'Kilimanjaro', 'Tanzania (multi-region)', 'Kenya', 'Rwanda', 'Not sure yet'
    ],
    travellers: ['1 traveller', '2 travellers', '3–4 travellers', '5–8 travellers', '9+ (group or family)'],
    styles: ['Private Safari', 'Honeymoon', 'Family', 'Adventure Luxury', 'Ultra Luxury', 'Photography', 'Safari + Beach'],
    interests: [
      'Great Migration', 'Big Five', 'Photography', 'Walking', 'Culture',
      'Conservation', 'Beach', 'Balloon Safari', 'Private Villa'
    ],
    budgets: ['Under US$5,000 per person', 'US$5,000–10,000 per person', 'US$10,000–20,000 per person', 'US$20,000+ per person', 'Let’s discuss'],
    durations: ['5–7 days', '8–10 days', '11–14 days', '2 weeks or more', 'Flexible'],
    travelPeriods: ['Now / this season', 'In the next 6 months', '6–12 months', 'More than a year out', 'Dates flexible']
  };

  /* Helper: resolve a single item by slug, or undefined. */
  function bySlug(collection, slug) {
    return collection.filter(function (item) { return item.slug === slug; })[0];
  }

  /* Helper: related entries by slug list, skipping missing ones. */
  function relatedFrom(collection, slugs) {
    return (slugs || [])
      .map(function (slug) { return bySlug(collection, slug); })
      .filter(Boolean);
  }

  return {
    siteConfig: siteConfig,
    journeys: journeys,
    destinations: destinations,
    experiences: experiences,
    stays: stays,
    stayTypes: stayTypes,
    testimonials: testimonials,
    journal: journal,
    enquiry: enquiry,
    bySlug: bySlug,
    relatedFrom: relatedFrom
  };
})();