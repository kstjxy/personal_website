import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const Resume = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Resume</h1>
        <p className="text-muted-foreground">
          Game Developer & Designer • Available for Internships
        </p>
      </div>

      {/* Download Section */}
      <div className="mb-8 rounded-xl border bg-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-card-foreground">Download Resume</h2>
            <p className="text-sm text-muted-foreground">PDF format • Last updated March 2024</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div className="space-y-8">
        {/* Experience */}
        <section>
          <h2 className="mb-4 border-b border-border pb-2 text-xl font-semibold text-foreground">
            Experience
          </h2>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Independent Game Developer</h3>
                  <p className="text-muted-foreground">Personal Projects</p>
                </div>
                <span className="text-sm text-muted-foreground">2023 - Present</span>
              </div>
              <ul className="ml-4 space-y-1 text-sm text-muted-foreground">
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
          <h2 className="mb-4 border-b border-border pb-2 text-xl font-semibold text-foreground">
            Education
          </h2>
          <div>
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="font-medium text-foreground">Computer Science</h3>
                <p className="text-muted-foreground">University • Focus on Game Development</p>
              </div>
              <span className="text-sm text-muted-foreground">2022 - 2026</span>
            </div>
            <p className="ml-4 text-sm text-muted-foreground">
              Relevant coursework: Computer Graphics, AI, Data Structures, Software Engineering
            </p>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="mb-4 border-b border-border pb-2 text-xl font-semibold text-foreground">
            Technical Skills
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-medium text-foreground">Programming Languages</h3>
              <p className="text-sm text-muted-foreground">
                C#, C++, Python, JavaScript, TypeScript, HLSL
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Game Engines & Tools</h3>
              <p className="text-sm text-muted-foreground">
                Unity, Unreal Engine, Blender, Git, Perforce
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Specializations</h3>
              <p className="text-sm text-muted-foreground">
                AI/ML, Procedural Generation, Network Programming, Game Design
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Platforms</h3>
              <p className="text-sm text-muted-foreground">PC, Mobile (iOS/Android), AR/VR, Web</p>
            </div>
          </div>
        </section>

        {/* Projects Highlight */}
        <section>
          <h2 className="mb-4 border-b border-border pb-2 text-xl font-semibold text-foreground">
            Notable Projects
          </h2>
          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-medium text-foreground">Neural Dream Engine</h3>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/work/neural-dream-engine">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered game engine with real-time procedural environment generation
              </p>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-medium text-foreground">Quantum Puzzle Mechanics</h3>
                <Button variant="ghost" size="sm" asChild>
                  <a href="/work/quantum-puzzle-mechanics">
                    <ExternalLink className="h-3 w-3" />
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
