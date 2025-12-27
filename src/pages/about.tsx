import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
        <div className="max-w-3xl w-full">
          <h1 className="text-5xl font-bold mb-8">✏️ About Me</h1>

          <div className="space-y-6 text-lg text-default-700">
            <p>I make things at the intersection of art and tech.</p>
            <p>
              Take a look around and feel free to explore my portfolios and get
              in touch if you'd like to collaborate.
            </p>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
