"use client"

const experiences = [
  {
    period: "2025 — Presente",
    role: "Mobile Developer",
    company: "App Development",
    description: "Desarrollo de aplicación móvil multiplataforma con React Native.",
    technologies: ["React Native", "TypeScript", "Firebase", "Supabase"],
  },
  {
    period: "2024 — 2025",
    role: "ERP Developer",
    company: "Proyecto Supermercado",
    description: "Diseño e implementación completa de un sistema ERP para gestión de supermercados. Módulos de inventario, ventas, reportes y administración.",
    technologies: ["Python", "MySQL", "Desktop App", "Reports"],
  },
  {
    period: "2023 — 2024",
    role: "Fullstack Developer",
    company: "Freelance",
    description: "Desarrollo de soluciones personalizadas para diversos clientes. Aplicaciones web, móviles y sistemas de gestión empresarial.",
    technologies: ["React", "TypeScript", "PostgreSQL", "Redux"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Trayectoria
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experiencia profesional
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? "" : "md:direction-rtl"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary md:-translate-x-1/2 -translate-x-1" />
                
                {/* Period - left side on desktop */}
                <div className={`hidden md:block ${index % 2 === 0 ? "text-right pr-12" : "text-left pl-12 md:order-2"}`}>
                  <span className="text-muted-foreground text-sm">{exp.period}</span>
                </div>
                
                {/* Content card */}
                <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:order-1"}`}>
                  <span className="md:hidden text-muted-foreground text-sm block mb-2">{exp.period}</span>
                  <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                    <h3 className="text-lg font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-primary text-sm mb-3">{exp.company}</p>
                    <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
