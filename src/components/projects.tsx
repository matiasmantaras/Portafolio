"use client"

import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const projects = [
  {
    id: 1,
    title: "Mobile App",
    subtitle: "Android & iOS",
    description: "Aplicación móvil multiplataforma desarrollada con React Native. Diseño moderno, rendimiento optimizado y experiencia de usuario fluida tanto en Android como iOS.",
    tags: ["React Native", "TypeScript", "Redux", "Firebase"],
    type: "mobile",
    featured: true,
    cover: "/homescreen.png",
    images: [
      "/homescreen.png",
      "/homescreen2.png",
      "/tv.png",
      "/radio.png",
      "/radio2.png",
      "/videos.png",
      "/videos2.png",
      "/bible.png",
      "/bible2.png",
      "/bible3.png",
      "/bible4.png",
      "/bible5.png",
      "/redes.png",
      "/donaciones.png",
    ],
  },
  {
  id: 2,
  title: "ERP Supermercado",
  subtitle: "Aplicación Desktop",
  description: "Sistema de gestión empresarial completo para supermercados. Incluye gestión de inventario, punto de venta, reportes financieros y administración de empleados.",
  tags: ["Python", "PostgreSQL", "Desktop", "Reports"],
  type: "desktop",
  featured: true,
  cover: "/inicioerp.png",
  images: [
    "/inicioerp.png",
    "/erp.png",
    "/pointofsale.png",
    "/ubicacion.png",
    "/role.png",
    "/sucursales.png",
    "/categorias.png",
    "/unidades.png",
    "/facturas.png",
    "/metododepago.png",
    "/movimientos.png",
    "/reportes.png",
  ],
  },
  {
    id: 3,
    title: "Web App 1",
    subtitle: "Full Stack Web",
    description: "Plataforma web moderna con arquitectura full-stack. Backend robusto con API REST y frontend responsive con las últimas tecnologías.",
    tags: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
    type: "web",
    featured: false,
    image: "/vibrato.png",
    images: [
      "/vibrato.png",
      "/titulos.png",
      "/servicios.png",
      "/instrumentos.png",
      "/comentarios.png",
      "/galeria.png",
      "/precios.png",
      "/contacto.png",

    ],
  },
  {
    id: 4,
    title: "Web App 2",
    subtitle: "Full Stack Web",
    description: "Aplicación web con autenticación, dashboard administrativo y sistema de gestión de contenido. Optimizada para SEO y rendimiento.",
    tags: ["React", "Express", "PostgreSQL", "AWS"],
    type: "web",
    featured: false,
    image: "/hometicket.png",
    images: [
      "/hometicket.png",
      "/homeevento.png",
      "/entradas.png",
      "/entradas2.png",
      "/qr.png",
      "/mp.png",

    ],
  },
//  {
  //  id: 5,
    //title: "Web App 3",
    //subtitle: "Full Stack Web",
    //description: "E-commerce completo con carrito de compras, pasarela de pagos y panel de administración. Integración con múltiples servicios externos.",
    //tags: ["Next.js", "Stripe", "Prisma", "Vercel"],
    //type: "web",
    //featured: false,
    //images: [],
  //},
]

const filters = [
  { label: "Todos", value: "all" },
  { label: "Mobile", value: "mobile" },
  { label: "Desktop", value: "desktop" },
  { label: "Web", value: "web" },
]

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.type === activeFilter
  )

  const openGallery = (project: typeof projects[0]) => {
    if (project.images && project.images.length > 0) {
      setSelectedProject(project)
      setCurrentImageIndex(0)
    }
  }

  const closeGallery = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject && selectedProject.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      )
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeGallery()
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  return (
    <section id="projects" className="py-24 bg-card/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            Portafolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Proyectos destacados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una selección de mis trabajos más relevantes, desde aplicaciones móviles 
            hasta sistemas empresariales complejos.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => openGallery(project)}
              className={`group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer ${
                project.featured ? "md:col-span-1" : ""
              }`}
            >
              {/* Project preview area */}
              <div className="aspect-video bg-secondary/50 relative overflow-hidden">
                {project.image || (project.cover) ? (
                  <img 
                    src={project.image || project.cover} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      {project.type === "mobile" && (
                        <svg className="w-16 h-16 text-primary/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      )}
                      {project.type === "desktop" && (
                        <svg className="w-16 h-16 text-primary/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                      {project.type === "web" && (
                        <svg className="w-16 h-16 text-primary/50 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      )}
                    </div>
                  </div>
                )}
                {/* Image count badge */}
                {project.images && project.images.length > 0 && (
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {project.images.length}
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {project.images && project.images.length > 0 && (
                    <span className="text-white font-medium text-sm bg-primary/90 px-4 py-2 rounded-lg">
                      Ver galería
                    </span>
                  )}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                  </div>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md">
                      Destacado
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Gallery Modal */}
        {selectedProject && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeGallery}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation arrows */}
            {selectedProject.images && selectedProject.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                  className="absolute left-4 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                  className="absolute right-4 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-10"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Image container */}
            <div 
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Project title */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6 z-10">
                <h3 className="text-white text-2xl font-bold">{selectedProject.title}</h3>
                <p className="text-white/70 text-sm">{selectedProject.subtitle}</p>
              </div>

              {/* Main image */}
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - Imagen ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />

              {/* Image counter and thumbnails */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-center mb-4">
                  <span className="text-white/80 text-sm">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </span>
                </div>

                {/* Thumbnails */}
                {selectedProject.images.length > 1 && (
                  <div className="flex gap-2 justify-center overflow-x-auto pb-2 max-w-4xl mx-auto">
                    {selectedProject.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          idx === currentImageIndex 
                            ? "border-primary scale-110" 
                            : "border-white/30 hover:border-white/60 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Miniatura ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
