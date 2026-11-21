// =============================================================
// Todo el contenido del portafolio vive aquí. Edita SOLO este archivo.
// =============================================================

export interface NavItem { id: string; label: string }
export interface AboutRow { label: string; value: string; tone?: 'accent' | 'ok'; href?: string }
export interface SkillCard { percent: number; title: string; detail: string }
export interface Project { title: string; description: string; tags: string[]; image?: string; url: string; wide?: boolean }

export const PROFILE = {
  name: 'Theylor Ramirez Vasquez',
  logo: 'TRV',
  roleA: 'Ingeniero de Sistemas',
  roleB: 'Especialista en Ciberseguridad ',
  email: 'tarkramirez23@gmail.com',
  github: 'https://github.com/tarkramirez23-gif',
  linkedin: 'https://www.linkedin.com/in/theylor-ramirez-vasquez-4799112a6/',
  // Coloca tu CV en la carpeta /public con este nombre exacto
  cv: 'Theylor_Ramirez_CV.pdf',
};

export const NAV: NavItem[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre Mí' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'contacto', label: 'Contacto' },
];

export const ABOUT_ROWS: AboutRow[] = [
  { label: 'Carrera:', value: 'Ingeniería de Sistemas Computacionales' },
  { label: 'Especialidad:', value: 'Ciberseguridad', tone: 'accent' },
  { label: 'Enfoque:', value: 'Análisis Forense & Vulnerabilidades' },
  { label: 'Residencia:', value: 'Perú' },
  { label: 'Correo Directo:', value: PROFILE.email, tone: 'accent', href: 'mailto:' + PROFILE.email },
];

export const LAB = { caption: 'SOC & Network Research Lab', place: 'Cajamarca, PE' };

export const SKILLS: SkillCard[] = [
  { percent: 100, title: 'Seguridad', detail: 'Linux bastionado, iptables, CVEs' },
  { percent: 100, title: 'Redes & Conectividad', detail: 'TCP/IP, Wireshark, VLANs, Routing' },
  { percent: 100, title: 'Automatización & Scripting', detail: 'Python, Bash, Git, Docker CI/CD' },
  { percent: 100, title: 'Seguridad Ofensiva / defensiva', detail: 'OWASP Top 10, Nmap, Monitoreo SIEM' },
];

export const PROJECTS: Project[] = [
  {
    title: 'Auditoría & Hardening de Servidor Linux',
    description: 'Aseguramiento de servidores Ubuntu/Debian implementando políticas CIS Benchmark, Fail2ban, SSH key authentication y análisis con Lynis.',
    tags: ['Bash', 'Linux', 'Lynis'],
    image: 'Proyectos/hardening.jpg',
    url: PROFILE.github,
  },
  {
    title: 'Sniffer & Detector de Anomalías TCP/IP',
    description: 'Herramienta desarrollada en Python y Scapy para la detección en tiempo real de escaneos SYN maliciosos y saturación de puertos UDP.',
    tags: ['Python', 'Scapy', 'Wireshark'],
    image: 'Proyectos/sniffer.jpg',
    url: PROFILE.github,
  },
  {
    title: 'Laboratorio Seguro de Simulación de Red',
    description: 'Despliegue de topología con GNS3 y pfSense para segmentación de zonas seguras (DMZ, LAN administrativa y Servidores Internos).',
    tags: ['pfSense', 'GNS3', 'VLANs'],
    image: 'Proyectos/laboratorio.jpg',
    url: PROFILE.github,
  },
];

export const CTA = {
  title: '¿Listo para fortalecer tu infraestructura?',
  text: 'Estoy disponible para unirme a tu equipo en proyectos de ciberseguridad, arquitectura de redes seguras y administración de sistemas.',
};
