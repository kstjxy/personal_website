import { ExternalLink } from "lucide-react";

const Resume = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Resume</h1>
        <p className="text-muted-foreground">
          Game Developer & Designer • Available for Internships
        </p>
      </div>

      {/* No download section per request */}

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
                  <h3 className="font-medium text-foreground">Game Developer Intern — Tencent</h3>
                  <p className="text-muted-foreground">Guangzhou, China</p>
                </div>
                <span className="text-sm text-muted-foreground">June 2024 – August 2024</span>
              </div>
              <ul className="ml-4 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Top 3 contributor to open‑source minigame‑unity‑webgl‑transform (3.4k★); ported
                  Unity games to WeChat Mini‑Game via WebGL/Wasm; reviewed PRs and supported
                  external devs.
                </li>
                <li>
                  • Maintained 10+ public demos and upgraded projects to new Unity LTS; resolved 5+
                  public issues; built TCP/UDP networking and gameclub API demos.
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">
                    Game Developer Intern — Lingxi Games (Alibaba)
                  </h3>
                  <p className="text-muted-foreground">Guangzhou, China</p>
                </div>
                <span className="text-sm text-muted-foreground">June 2023 – August 2023</span>
              </div>
              <ul className="ml-4 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Built a config‑driven Python pipeline to translate Excel sheets into Lua with
                  Jinja; cut iteration from ~30 min to ~1 min.
                </li>
                <li>
                  • Refactored season‑rewards UI in Lua/FairyGUI with data‑driven column merging;
                  prototyped SRPG/Contra‑style mechanics on in‑house engine.
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">
                    Game Developer Intern — 4399 Network
                  </h3>
                  <p className="text-muted-foreground">Guangzhou, China</p>
                </div>
                <span className="text-sm text-muted-foreground">June 2022 – August 2022</span>
              </div>
              <ul className="ml-4 space-y-1 text-sm text-muted-foreground">
                <li>
                  • Led 3‑person team to build TexasHoldemBattle, a Unity online Poker arena for AI
                  bots; organized a 50+‑participant internal contest and synthesized
                  recommendations.
                </li>
                <li>
                  • Engineered a modular integration stack for C# modules, Lua scripts, and
                  WebSocket APIs; added configurable tournaments, adjustable sim speeds, and
                  event‑log replays.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="mb-4 border-b border-border pb-2 text-xl font-semibold text-foreground">
            Education
          </h2>
          <div className="space-y-6">
            <div>
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">University of Pennsylvania</h3>
                  <p className="text-muted-foreground">
                    Dual MSE in CGGT & Computer Science • GPA 3.95
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">Aug 2024 – Dec 2026</span>
              </div>
              <p className="ml-4 text-sm text-muted-foreground">
                Coursework: Game Design, GPU Programming, PBR, Procedural Graphics
              </p>
            </div>
            <div>
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Cornell University</h3>
                  <p className="text-muted-foreground">
                    B.S. Computer Science • GPA 3.65 • Minors: Game Design, IS (UI/UX), Fine Art
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">Aug 2020 – Dec 2023</span>
              </div>
              <p className="ml-4 text-sm text-muted-foreground">
                Coursework: Operating Systems, Algorithms, Computer Graphics, 3D Modeling
              </p>
            </div>
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
                C++, C#, Lua, Python, Java, HTML/CSS, GLSL, TypeScript
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Game Engines & Tools</h3>
              <p className="text-sm text-muted-foreground">
                Unity, Unreal Engine, CUDA, CUGL, LibGDX, OpenGL, Qt
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-medium text-foreground">Specializations</h3>
              <p className="text-sm text-muted-foreground">
                Procedural Rendering, Real‑time Graphics, Networking, UI/UX
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
                <h3 className="font-medium text-foreground">Physically Based Renderer</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                OpenGL deferred renderer with Cook–Torrance BRDF, HDR, SSR, and SDF ray‑marching for
                subsurface effects.
              </p>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="font-medium text-foreground">DDMaya Plugin</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                C++ Maya deformer implementing Direct Delta Mush with Eigen; real‑time viewport UI
                with PyMEL/Qt tools.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
