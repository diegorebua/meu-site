
import { Project, Skill, Experience } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Sistema ERP Empresarial',
    description: 'Sistema ERP de grande escala construído para logística de manufatura utilizando Spring Boot e React.',
    tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
    image: 'https://picsum.photos/seed/erp/800/600',
    category: 'fullstack'
  },
  {
    id: '2',
    title: 'Plataforma de E-commerce',
    description: 'Vitrine moderna com estoque em tempo real e frontend de alta performance em Vue 3.',
    tech: ['Vue', 'Node.js', 'Express', 'MongoDB', 'Tailwind'],
    image: 'https://picsum.photos/seed/shop/800/600',
    category: 'fullstack'
  },
  {
    id: '3',
    title: 'Dashboard de Análise',
    description: 'Ferramenta de visualização de dados em tempo real para monitoramento de performance de servidores e métricas de API.',
    tech: ['Node.js', 'React', 'D3.js', 'Redis'],
    image: 'https://picsum.photos/seed/analytics/800/600',
    category: 'frontend'
  },
  {
    id: '4',
    title: 'Gateway de API Bancária',
    description: 'Arquitetura de microsserviços de alta segurança para processamento de transações financeiras.',
    tech: ['Java', 'Kafka', 'Spring Cloud', 'Kubernetes'],
    image: 'https://picsum.photos/seed/bank/800/600',
    category: 'backend'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Java', level: 95, icon: '☕', category: 'language' },
  { name: 'Node.js', level: 92, icon: '🟢', category: 'language' },
  { name: 'React', level: 90, icon: '⚛️', category: 'framework' },
  { name: 'Vue', level: 85, icon: '🖖', category: 'framework' },
  { name: 'Spring Boot', level: 92, icon: '🍃', category: 'framework' },
  { name: 'TypeScript', level: 88, icon: 'TS', category: 'language' },
  { name: 'Docker', level: 80, icon: '🐳', category: 'tool' },
  { name: 'PostgreSQL', level: 85, icon: '🐘', category: 'tool' },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Tech Solutions Global',
    role: 'Desenvolvedor Full Stack Sênior',
    period: '2021 - Presente',
    description: [
      'Arquitetura de microsserviços com Spring Boot e Node.js para sistemas de alta disponibilidade.',
      'Liderou a migração do frontend legado em jQuery para Vue 3 Composition API.',
      'Reduziu o tempo de resposta do servidor em 40% através de estratégias de cache com Redis.'
    ]
  },
  {
    company: 'Innovation Labs',
    role: 'Engenheiro Full Stack',
    period: '2018 - 2021',
    description: [
      'Desenvolveu múltiplos produtos SaaS baseados em React lidando com milhares de usuários.',
      'Projetou backends escaláveis em Java para processamento complexo de regras de negócio.',
      'Implementou pipelines CI/CD utilizando GitHub Actions e Docker.'
    ]
  }
];

export const BIO = "Sou um Desenvolvedor Full Stack apaixonado, com mais de 7 anos de experiência construindo aplicações web escaláveis. Minha expertise abrange os ecossistemas robustos do Java e Spring Boot, bem como os modernos ambientes ágeis do Node.js, React e Vue. Tenho prazer em resolver problemas arquitetônicos complexos e entregar um código limpo e de fácil manutenção.";
