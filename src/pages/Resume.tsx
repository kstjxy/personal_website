import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const Resume = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Resume</h1>
        <p className="text-muted-foreground">
          Game Developer & Designer • Available for Internships
        </p>
      </div>

      {/* Download Section */}
      <div className="mb-8 p-4 bg-card rounded-xl border shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-card-foreground">Download Resume</h2>
            <p className="text-sm text-muted-foreground">PDF format • Last updated March 2024</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="space-y-8">
        {/* Experience */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
            Experience
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-foreground">Independent Game Developer</h3>
                  <p className="text-muted-foreground">Personal Projects</p>
                </div>
                <span className="text-sm text-muted-foreground">2023 - Present</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Developed 5+ complete game projects using Unity and Unreal Engine</li>
                <li>• Implemented AI systems and procedural generation algorithms</li>
                <li>• Created multiplayer networked games with custom netcode</li>
                <li>• Collaborated with teams of 2-5 developers on larger projects</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
            Education
          </h2>
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium text-foreground">Computer Science</h3>
                <p className="text-muted-foreground">University • Focus on Game Development</p>
              </div>
              <span className="text-sm text-muted-foreground">2022 - 2026</span>
            </div>
            <p className="text-sm text-muted-foreground ml-4">
              Relevant coursework: Computer Graphics, AI, Data Structures, Software Engineering
            </p>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
            Technical Skills
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-foreground mb-2">Programming Languages</h3>
              <p className="text-sm text-muted-foreground">
                C#, C++, Python, JavaScript, TypeScript, HLSL
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Game Engines & Tools</h3>
              <p className="text-sm text-muted-foreground">
                Unity, Unreal Engine, Blender, Git, Perforce
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Specializations</h3>
              <p className="text-sm text-muted-foreground">
                AI/ML, Procedural Generation, Network Programming, Game Design
              </p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Platforms</h3>
              <p className="text-sm text-muted-foreground">
                PC, Mobile (iOS/Android), AR/VR, Web
              </p>
            </div>
          </div>
        </section>

        {/* Projects Highlight */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4 border-b border-border pb-2">
            Notable Projects
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground">Neural Dream Engine</h3>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/work/neural-dream-engine">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered game engine with real-time procedural environment generation
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground">Quantum Puzzle Mechanics</h3>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/work/quantum-puzzle-mechanics">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Educational puzzle game teaching quantum physics concepts
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;