import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
				<div className="flex items-center justify-center w-full">
					<img
						src="/images/dinsor.jpg"
						alt="Dinsor"
						className="max-w-2xl w-full h-auto rounded-lg shadow-lg"
					/>
				</div>
				<div className="text-center max-w-2xl">
					<h1 className="text-4xl font-bold mb-4">Call me Dinsor</h1>
					<p className="text-lg text-default-600">
						My Thai name is ดินสอ, meaning pencil. It's pronounced din-sɔ̌ɔ, or
						Dinsor.
					</p>
					<p className="text-lg text-default-600 mb-4">
						Everyone calls me that.
					</p>
					<p className="text-lg text-default-600">
						My passport says I'm Dr. Stephen James Roger Harrison.
					</p>
					<p className="text-lg text-default-600">
						No one's ever called me that.
					</p>
					<div className="flex gap-4 mt-8 justify-center">
						<Button
							as={Link}
							href="/about"
							color="primary"
							size="lg"
							radius="full"
							variant="shadow"
						>
							About Me
						</Button>
						<Button
							as={Link}
							href="/portfolios"
							color="primary"
							size="lg"
							radius="full"
							variant="shadow"
						>
							View Portfolios
						</Button>
					</div>
				</div>
			</section>
		</DefaultLayout>
	);
}
