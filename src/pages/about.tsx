import DefaultLayout from "@/layouts/default";

export default function AboutPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-8 py-8 md:py-10">
        <div className="max-w-3xl w-full">
          <h1 className="text-5xl font-bold mb-8">✏️ About Me</h1>
          
          <div className="space-y-6 text-lg text-default-700">
            <p>
              Welcome! I'm passionate about creating meaningful work that combines 
              creativity with technical excellence.
            </p>
            
            <p>
              This space showcases my journey, projects, and the things I'm 
              passionate about. Feel free to explore my portfolios and get in touch 
              if you'd like to collaborate.
            </p>
            
            <div className="mt-8 pt-8 border-t border-default-200">
              <h2 className="text-2xl font-semibold mb-4">Skills & Interests</h2>
              <div className="flex flex-wrap gap-2">
                {['Design', 'Development', 'Creative Writing', 'Photography', 'Art'].map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
