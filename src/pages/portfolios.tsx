import DefaultLayout from "@/layouts/default";
import { Link } from "@heroui/link";

export default function PortfoliosPage() {
	const portfolioItems = [
		{
			id: 1,
			title: "Web Development",
			description: [
				"Always free, always open source, mostly fun.",
				"I often draw inspritation from an immediate need. For example whambam.dev originated when I found out my then-favorite web performance tool was going out of business.",
			],
			image: "/images/handycomputerbloke.com.png",
			link: "https://handycomputerbloke.com",
		},
		{
			id: 2,
			title: "Photography",
			description: [
				"Random photos pretending to be curated portfolios.",
				"I always carry a camera with me. And I've been doing that a long time. So just by chance I've taken a couple I feel OK sharing.",
			],
			image: "/images/thelucidlens.com.jpg",
			link: "https://thelucidlens.com",
		},
		{
			id: 3,
			title: "Furniture",
			description: ["There can never be too many epoxy river tables."],
			image: "/images/portfolio-3.jpg",
			link: "https://handycomputerbloke.com",
		},
	];

	return (
		<DefaultLayout>
			<section className="flex flex-col gap-8 py-8 md:py-10">
				<div className="max-w-6xl w-full mx-auto">
					<h1 className="text-5xl font-bold mb-4">✏️ Portfolios</h1>
					<p className="text-lg text-default-600 mb-12">
						A diverse and amateur collection of my creative works and projects
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
						{portfolioItems.map((item) => (
							<Link
								key={item.id}
								href={item.link}
								isExternal
								className="group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
							>
								<div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center overflow-hidden">
									<img
										src={item.image}
										alt={item.title}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="p-6 bg-content1 flex-grow">
									<h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
										{item.title}
									</h3>
									<p className="text-sm text-default-500 mb-3">{item.link}</p>
									<div className="space-y-2">
										{item.description.map((paragraph, index) => (
											<p key={index} className="text-default-600">
												{paragraph}
											</p>
										))}
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>
		</DefaultLayout>
	);
}
