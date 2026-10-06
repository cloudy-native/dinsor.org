import type { ImageMetadata } from "astro";
import thelucidlensComShot from "../assets/images/thelucidlens.com.jpg";
import fallingtreestudioComShot from "../assets/images/fallingtreestudio.com.png";
import dinsorDesignShot from "../assets/images/dinsor-design.png";
import lucidmusicianComShot from "../assets/images/lucidmusician.com.png";
import lucidgeometryComShot from "../assets/images/lucidgeometry.com.png";
import byedonaldComShot from "../assets/images/byedonald.com.png";
import brandboffinComShot from "../assets/images/brandboffin.com.png";
import visacheatsheetComShot from "../assets/images/visacheatsheet.com.png";
import retireGuruShot from "../assets/images/retire.guru.png";
import weatherwombatComShot from "../assets/images/weatherwombat.com.png";
import timezoneGuruShot from "../assets/images/timezone.guru.png";
import chakrathemesComShot from "../assets/images/chakrathemes.com.png";
import baremetalHelpShot from "../assets/images/baremetal.help.png";
import lingolotusComShot from "../assets/images/lingolotus.com.png";
import trumpwisdomComShot from "../assets/images/trumpwisdom.com.png";
import nogbadthebadComShot from "../assets/images/nogbadthebad.com.png";
import magbaUkShot from "../assets/images/magba.uk.png";

export interface Portfolio {
	/** Display title */
	title: string;
	/** Live site URL */
	url: string;
	/** Short blurb (no tech stack) */
	description: string;
	/** Screenshot, imported from src/assets/images so Astro can optimize it */
	image: ImageMetadata;
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
		image: thelucidlensComShot,
		featured: true,
		galleryCaption: "Snapshots, pretending.",
	},
	{
		title: "Falling Tree Studio",
		url: "https://fallingtreestudio.com",
		description: "Wood and epoxy furniture, built by hand.",
		image: fallingtreestudioComShot,
		featured: true,
		galleryCaption: "Wood and epoxy, by hand.",
	},
	{
		title: "Dinsor Design",
		url: "https://github.com/cloudy-native/dinsor-design/blob/main/README.md",
		description:
			"Warm paper, one green. Pages that read like a typeset document, then work like a site.",
		image: dinsorDesignShot,
	},
	{
		title: "Lucid Musician",
		url: "https://lucidmusician.com",
		description:
			"An innovative music harmony generator trained on centuries of compositions. Create infinite beautiful harmonies for your workflow.",
		image: lucidmusicianComShot,
		galleryCaption: "Harmony from old scores.",
	},
	{
		title: "Lucid Geometry",
		url: "https://lucidgeometry.com",
		description:
			"Spirograph extended into 3D — play with interactive generative designs.",
		image: lucidgeometryComShot,
		galleryCaption: "Spirograph, in 3D.",
	},
	{
		title: "Bye Donald",
		url: "https://byedonald.com",
		description:
			"A searchable news aggregator for Donald Trump's second term.",
		image: byedonaldComShot,
	},
	{
		title: "Brand Boffin",
		url: "https://brandboffin.com",
		description:
			"Interactive brand strategy and design. Ideate names and domains with real-time availability checks.",
		image: brandboffinComShot,
	},
	{
		title: "Visa Cheat Sheet",
		url: "https://visacheatsheet.com",
		description:
			"Clear, concise visa guides driven by official data. A decision tree that finds the right visa for you.",
		image: visacheatsheetComShot,
	},
	{
		title: "Retire Guru",
		url: "https://retire.guru",
		description:
			"Retirement planning tools. Set savings and goals, tweak economic conditions, and see the long-term plan.",
		image: retireGuruShot,
	},
	{
		title: "Weather Wombat",
		url: "https://weatherwombat.com",
		description:
			"Historical climate data and trends since records began — weather from 1750 for thousands of cities.",
		image: weatherwombatComShot,
	},
	{
		title: "Timezone Guru",
		url: "https://timezone.guru",
		description:
			"Find the best overlap for meetings across cities and timezones, with adjustable work and free hours.",
		image: timezoneGuruShot,
	},
	{
		title: "Chakra Themes",
		url: "https://chakrathemes.com",
		description:
			"Accessible, harmonious color themes — find cohesive combinations without the finickiness.",
		image: chakrathemesComShot,
	},
	{
		title: "Baremetal Help",
		url: "https://baremetal.help",
		description:
			"Guides and patterns for bringing up enterprise cloud infrastructure from the ground up.",
		image: baremetalHelpShot,
	},
	{
		title: "Lingo Lotus",
		url: "https://lingolotus.com",
		description:
			"Interactive language learning with flashcard decks you can study from either side of the translation.",
		image: lingolotusComShot,
	},
	{
		title: "Trump Wisdom",
		url: "https://trumpwisdom.com",
		description:
			"A tongue-in-cheek site built from tens of thousands of pages of CSV data.",
		image: trumpwisdomComShot,
	},
	{
		title: "Nogbad The Bad",
		url: "https://nogbadthebad.com",
		description:
			"A fan site dedicated to Noggin the Nog's wicked uncle.",
		image: nogbadthebadComShot,
	},
	{
		title: "Make America Great Britain Again",
		url: "https://magba.uk",
		description: "Pure tongue-in-cheek satire.",
		image: magbaUkShot,
	},
];

export const featuredPortfolios = portfolios.filter((p) => p.featured);
export const otherPortfolios = portfolios.filter((p) => !p.featured);
export const galleryPortfolios = portfolios.filter((p) => p.galleryCaption);
