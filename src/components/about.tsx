"use client"

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Native"] },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "REST APIs"] },
  { category: "Mobile", items: ["Android", "iOS", "React Native", "Kotlin", "Swift"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "Figma", "Linux"] },
]

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - About text */}
          <div>
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Sobre mí
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Desarrollador apasionado por crear soluciones que impactan
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Soy un desarrollador fullstack con experiencia en la creación de aplicaciones 
                que abarcan desde sistemas empresariales hasta aplicaciones móviles multiplataforma.
              </p>
              <p>
                Mi enfoque combina un profundo conocimiento técnico con una comprensión clara 
                de las necesidades del negocio, permitiéndome entregar soluciones que no solo 
                funcionan, sino que generan valor real.
              </p>
              <p>
                He trabajado en proyectos diversos, desde un <strong className="text-foreground">ERP completo para supermercados</strong> hasta 
                una <strong className="text-foreground">aplicación móvil cross-platform</strong> para Android e iOS, 
                además de múltiples proyectos web con tecnologías modernas.
              </p>
            </div>
          </div>
          
          {/* Right column - Skills */}
          <div className="space-y-6">
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Stack técnico
            </span>
            <div className="grid sm:grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div key={skill.category} className="bg-card border border-border rounded-lg p-5">
                  <h3 className="text-foreground font-semibold mb-3">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
