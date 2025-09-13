const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">About</h1>
        <p className="text-muted-foreground">
          Game developer passionate about creating innovative interactive experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Background</h2>
            <p className="text-foreground leading-relaxed mb-4">
              I'm XJ, a passionate game developer with expertise in gameplay programming, 
              AI systems, and procedural generation. I love creating interactive experiences 
              that push the boundaries of what's possible in games.
            </p>
            <p className="text-foreground leading-relaxed">
              My work spans from experimental AI-driven game engines to educational puzzle 
              games that make complex concepts accessible. I'm always exploring new 
              technologies and methodologies to create more engaging and innovative games.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Expertise</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-foreground mb-2">Programming</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>C# / Unity</li>
                  <li>C++ / Unreal Engine</li>
                  <li>Python / Machine Learning</li>
                  <li>JavaScript / Web Technologies</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Specializations</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
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
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h3 className="font-semibold text-card-foreground mb-3">Current Status</h3>
            <p className="text-sm text-muted-foreground mb-4">
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