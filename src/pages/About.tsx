const About = () => {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">About</h1>
        <p className="text-muted-foreground">
          I build systems at the intersection of software engineering and games —
          C++/TypeScript/Java developer and gameplay/graphics engineer.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">What I Do</h2>
            <p className="mb-3 leading-relaxed text-foreground">
              My work spans engine‑side features (rendering, gameplay systems, tools) and full‑stack
              software. I enjoy designing clean APIs, profiling bottlenecks, and shipping
              experiences that feel great — whether that’s a responsive UI, a performant renderer,
              or a rock‑solid gameplay loop.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-medium text-foreground">Software Engineering</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>C++, TypeScript/React, Java, Python</li>
                  <li>Networking (TCP/UDP/WebSocket/WebRTC)</li>
                  <li>Data pipelines, config‑driven tooling</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">Gameplay & Graphics</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>Unity / Unreal • Shading & rendering</li>
                  <li>Procedural systems, spline/geometry tooling</li>
                  <li>UX/HUD implementation & polish</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-foreground">Tech Stack</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-medium text-foreground">Languages</h3>
                <p className="text-sm text-muted-foreground">
                  C++, C#, TypeScript/JavaScript, Java, Python, Lua, GLSL
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">Engines & Frameworks</h3>
                <p className="text-sm text-muted-foreground">
                  Unity, Unreal Engine, OpenGL, CUDA, React
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">Strengths</h3>
                <p className="text-sm text-muted-foreground">
                  Gameplay systems, rendering/shaders, networking, UI/UX
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-foreground">Platforms & Tools</h3>
                <p className="text-sm text-muted-foreground">
                  PC, Mobile, Web, AR/VR • Git/Perforce, Maya, Blender, Figma, Qt
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="mb-3 font-semibold text-card-foreground">Current Status</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Open to Software Engineer (C++/TypeScript/Java) and Gameplay/Graphics roles.
            </p>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Location:</span>
                <span className="ml-2 text-foreground">Philadelphia, PA • Flexible</span>
              </div>
              <div>
                <span className="text-muted-foreground">Contact:</span>
                <span className="ml-2 text-foreground">xiaoyuejin01@gmail.com</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default About;
