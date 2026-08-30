export interface Portfolio {
	/** Display title */
	title: string;
	/** Live site URL */
	url: string;
	/** Short blurb (no tech stack) */
	description: string;
	/** Path under /public, e.g. /images/example.com.png */
	image: string;
	/** Featured projects appear in the top row; promote/demote freely */
	featured?: boolean;
	/** Poetic line for the homepage gallery; omit to keep it off the carousel */
	galleryCaption?: string;
}

/**
 * Portfolio entries for the homepage.
 * Toggle `featured: true` to promote a project into the featured row.
 */
export const portfolios: Portfolio[] = [
	{
		title: "The Lucid Lens",
		url: "https://thelucidlens.com",
		description: "Random photos pretending to be curated portfolios.",
		image: "/images/thelucidlens.com.jpg",
		featured: true,
		galleryCaption: "Snapshots, pretending.",
	},
	{
		title: "Falling Tree Studio",
		url: "https://fallingtreestudio.com",
		description: "Wood and epoxy furniture, built by hand.",
		image: "/images/fallingtreestudio.com.png",
		featured: true,
		galleryCaption: "Wood and epoxy, by hand.",
	},
	{
		title: "Lucid Musician",
		url: "https://lucidmusician.com",
		description:
			"An innovative music harmony generator trained on centuries of compositions. Create infinite beautiful harmonies for your workflow.",
		image: "/images/lucidmusician.com.png",
		galleryCaption: "Harmony from old scores.",
	},
	{
		title: "Lucid Geometry",
		url: "https://lucidgeometry.com",
		description:
			"Spirograph extended into 3D — play with interactive generative designs.",
		image: "/images/lucidgeometry.com.png",
		galleryCaption: "Spirograph, in 3D.",
	},
	{
		title: "Bye Donald",
		url: "https://byedonald.com",
		description:
			"A searchable news aggregator for Donald Trump's second term.",
		image: "/images/byedonald.com.png",
	},
	{
		title: "Brand Boffin",
		url: "https://brandboffin.com",
		description:
			"Interactive brand strategy and design. Ideate names and domains with real-time availability checks.",
		image: "/images/brandboffin.com.png",
	},
	{
		title: "Visa Cheat Sheet",
		url: "https://visacheatsheet.com",
		description:
			"Clear, concise visa guides driven by official data. A decision tree that finds the right visa for you.",
		image: "/images/visacheatsheet.com.png",
	},
	{
		title: "Retire Guru",
		url: "https://retire.guru",
		description:
			"Retirement planning tools. Set savings and goals, tweak economic conditions, and see the long-term plan.",
		image: "/images/retire.guru.png",
	},
	{
		title: "Weather Wombat",
		url: "https://weatherwombat.com",
		description:
			"Historical climate data and trends since records began — weather from 1750 for thousands of cities.",
		image: "/images/weatherwombat.com.png",
	},
	{
		title: "Timezone Guru",
		url: "https://timezone.guru",
		description:
			"Find the best overlap for meetings across cities and timezones, with adjustable work and free hours.",
		image: "/images/timezone.guru.png",
	},
	{
		title: "Chakra Themes",
		url: "https://chakrathemes.com",
		description:
			"Accessible, harmonious color themes — find cohesive combinations without the finickiness.",
		image: "/images/chakrathemes.com.png",
	},
	{
		title: "Baremetal Help",
		url: "https://baremetal.help",
		description:
			"Guides and patterns for bringing up enterprise cloud infrastructure from the ground up.",
		image: "/images/baremetal.help.png",
	},
	{
		title: "Lingo Lotus",
		url: "https://lingolotus.com",
		description:
			"Interactive language learning with flashcard decks you can study from either side of the translation.",
		image: "/images/lingolotus.com.png",
	},
	{
		title: "Trump Wisdom",
		url: "https://trumpwisdom.com",
		description:
			"A tongue-in-cheek site built from tens of thousands of pages of CSV data.",
		image: "/images/trumpwisdom.com.png",
	},
	{
		title: "Nogbad The Bad",
		url: "https://nogbadthebad.com",
		description:
			"A fan site dedicated to Noggin the Nog's wicked uncle.",
		image: "/images/nogbadthebad.com.png",
	},
	{
		title: "Make America Great Britain Again",
		url: "https://magba.uk",
		description: "Pure tongue-in-cheek satire.",
		image: "/images/magba.uk.png",
	},
];

export const featuredPortfolios = portfolios.filter((p) => p.featured);
export const otherPortfolios = portfolios.filter((p) => !p.featured);
export const galleryPortfolios = portfolios.filter((p) => p.galleryCaption);
