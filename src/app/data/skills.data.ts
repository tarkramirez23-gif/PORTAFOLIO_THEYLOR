import { tileIcon } from '../core/icons';

export interface SkillTool { name: string; icon: string; logo?: string }
export interface SkillGroup { name: string; icon: string; tools: SkillTool[] }

// Logos oficiales desde Simple Icons (https://simpleicons.org). Si un logo no existe o falla,
// se muestra el icono genérico de respaldo. `logo` = slug de Simple Icons; `logoColor` = color hex opcional.
const SI = 'https://cdn.simpleicons.org';
const tool = (name: string, glyph: string, color: string, logo?: string, logoColor?: string): SkillTool => ({
  name,
  icon: tileIcon(glyph, color),
  logo: logo ? `${SI}/${logo}${logoColor ? '/' + logoColor : ''}` : undefined,
});

// Logo propio guardado en /public/iconos/ (ruta relativa)
const own = (name: string, glyph: string, color: string, file: string): SkillTool => ({
  name,
  icon: tileIcon(glyph, color),
  logo: file,
});

// Edita aquí tus áreas y herramientas. Deja solo lo que realmente dominas.
export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: 'Ciberseguridad',
    icon: tileIcon('shield', '#8F7BFF', false),
    tools: [
      own('Kali Linux', 'terminal', '#8F7BFF', 'iconos/kali.png'),
      own('Nmap', 'target', '#8F7BFF', 'iconos/nmap.png'),
      own('Wireshark', 'activity', '#8F7BFF', 'iconos/wireshark.png'),
      tool('OWASP Top 10', 'shield', '#8F7BFF', 'owasp', 'ffffff'),
      own('Análisis de vulnerabilidades', 'bug', '#8F7BFF', 'iconos/vulnerabilidades.png'),
    ],
  },
  {
    name: 'Redes',
    icon: tileIcon('network', '#4DA3FF', false),
    tools: [
      tool('TCP/IP', 'globe', '#4DA3FF'),
      tool('Cisco Packet Tracer', 'network', '#4DA3FF', 'cisco'),
      tool('Routers & Switches', 'wifi', '#4DA3FF'),
      tool('DNS / DHCP', 'server', '#4DA3FF'),
    ],
  },
  {
    name: 'Sistemas',
    icon: tileIcon('terminal', '#2BD9A0', false),
    tools: [
      own('Linux', 'server', '#2BD9A0', 'iconos/linux.png'),
      own('Bash', 'terminal', '#2BD9A0', 'iconos/bash.png'),
      own('Git', 'git', '#2BD9A0', 'iconos/git.png'),
      own('GitHub', 'code', '#2BD9A0', 'iconos/github.png'),
    ],
  },
];