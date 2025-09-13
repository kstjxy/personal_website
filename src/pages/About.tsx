const About = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">About</h1>
        <p className="text-muted-foreground">
          Game developer passionate about creating innovative interactive experiences.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Background</h2>
            <p className="mb-4 leading-relaxed text-foreground">
              I'm Xiaoyue Jin, a passionate game developer with expertise in gameplay programming,
              AI systems, and procedural generation. I love creating interactive experiences that
              push the boundaries of what's possible in games.
            </p>
            <p className="leading-relaxed text-foreground">
              My work spans from experimental AI-driven game engines to educational puzzle games
              that make complex concepts accessible. I'm always exploring new technologies and
              methodologies to create more engaging and innovative games.
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Expertise</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-medium text-foreground">Programming</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>C# / Unity</li>
                  <li>C++ / Unreal Engine</li>
                  <li>Python / Machine Learning</li>
                  <li>JavaScript / Web Technologies</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">Specializations</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>AI & Machine Learning</li>
                  <li>Procedural Generation</li>
                  <li>Network Programming</li>
                  <li>Game Design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="mb-3 font-semibold text-card-foreground">Current Status</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Available for internships and collaborative projects in game development.
            </p>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Location:</span>
                <span className="ml-2 text-foreground">Remote / Flexible</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Interests:</span>
                <span className="ml-2 text-foreground">AI, VR/AR, Indie Games</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
