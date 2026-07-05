import ana from "@/assets/mentor-ana.jpg";
import lucas from "@/assets/mentor-lucas.jpg";
import marina from "@/assets/mentor-marina.jpg";
import rafael from "@/assets/mentor-rafael.jpg";
import julia from "@/assets/mentor-julia.jpg";
import pedro from "@/assets/mentor-pedro.jpg";

export type MentorSlot = { id: string; date: string; label: string };
export type Mentor = {
  id: string;
  name: string;
  course: string;
  university: string;
  period: string;
  photo: string;
  rating: number;
  price: "Gratuita" | "Paga";
  bio: string;
  tags: string[];
  slots: MentorSlot[];
};

// build a few relative days from "now" so datas parecem sempre atuais
const day = (offsetDays: number, hour: number, minute = 0): MentorSlot => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  d.setHours(hour, minute, 0, 0);
  return {
    id: `${offsetDays}-${hour}-${minute}`,
    date: d.toISOString(),
    label: d.toLocaleString("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export const mentors: Mentor[] = [
  {
    id: "ana",
    name: "Ana Beatriz",
    course: "Medicina",
    university: "USP",
    period: "6º semestre",
    photo: ana,
    rating: 4.9,
    price: "Gratuita",
    bio: "Ajudo estudantes a entender a rotina intensa da medicina com calma e honestidade.",
    tags: ["Rotina de estudos", "Primeiros semestres", "Dúvidas sobre hospital"],
    slots: [day(2, 18), day(3, 20), day(5, 19, 30), day(7, 17)],
  },
  {
    id: "lucas",
    name: "Lucas Mendes",
    course: "Engenharia de Software",
    university: "UNICAMP",
    period: "4º semestre",
    photo: lucas,
    rating: 4.8,
    price: "Paga",
    bio: "Converso sobre programação, projetos, matemática e a diferença entre cursos de tecnologia.",
    tags: ["Projetos", "Mercado tech", "Diferença entre cursos"],
    slots: [day(1, 19), day(2, 21), day(4, 18, 30)],
  },
  {
    id: "marina",
    name: "Marina Rocha",
    course: "Psicologia",
    university: "UFRGS",
    period: "8º semestre",
    photo: marina,
    rating: 4.7,
    price: "Gratuita",
    bio: "Compartilho a vivência do curso, leituras, estágios e campos de atuação sem romantizar.",
    tags: ["Campos de atuação", "Leituras", "Estágios"],
    slots: [day(3, 17), day(4, 20), day(6, 18), day(8, 19, 30)],
  },
  {
    id: "rafael",
    name: "Rafael Costa",
    course: "Engenharia Civil",
    university: "UFRJ",
    period: "5º semestre",
    photo: rafael,
    rating: 4.9,
    price: "Gratuita",
    bio: "Cálculo, física e a real de como é o dia a dia em uma engenharia pesada.",
    tags: ["Cálculo", "Vestibular", "Rotina universitária"],
    slots: [day(2, 20), day(5, 18), day(7, 21)],
  },
  {
    id: "julia",
    name: "Júlia Ferreira",
    course: "Direito",
    university: "PUC-RS",
    period: "7º semestre",
    photo: julia,
    rating: 4.8,
    price: "Paga",
    bio: "Conversamos sobre carreiras jurídicas, OAB e escolha entre público e privado.",
    tags: ["Carreira jurídica", "OAB", "Estágios em bancas"],
    slots: [day(1, 18), day(3, 20, 30), day(6, 19)],
  },
  {
    id: "pedro",
    name: "Pedro Almeida",
    course: "Arquitetura",
    university: "Mackenzie",
    period: "6º semestre",
    photo: pedro,
    rating: 4.7,
    price: "Gratuita",
    bio: "Portfólio, atelier, softwares e a rotina real do curso — sem filtro do Pinterest.",
    tags: ["Portfólio", "Softwares", "Atelier"],
    slots: [day(2, 17), day(4, 19), day(5, 20, 30), day(8, 18)],
  },
];

export const getMentor = (id: string) => mentors.find((m) => m.id === id);

// alunos fictícios que já agendaram com o "mentor logado" (Ana)
export type BookedSession = {
  id: string;
  studentName: string;
  grade: string;
  school: string;
  topic: string;
  status: "pending" | "accepted" | "completed";
  slot: MentorSlot;
};

export const bookedSessions: BookedSession[] = [
  {
    id: "s1",
    studentName: "Beatriz Oliveira",
    grade: "3º EM",
    school: "Colégio Anchieta",
    topic: "Quero entender se medicina é pra mim",
    status: "pending",
    slot: day(2, 18),
  },
  {
    id: "s2",
    studentName: "Gabriel Santos",
    grade: "2º EM",
    school: "Colégio Marista",
    topic: "Como é a rotina do primeiro ano do curso?",
    status: "pending",
    slot: day(3, 20),
  },
  {
    id: "s3",
    studentName: "Isabela Costa",
    grade: "3º EM",
    school: "Colégio Farroupilha",
    topic: "Dicas para o ENEM na área de biológicas",
    status: "accepted",
    slot: day(5, 19, 30),
  },
  {
    id: "s4",
    studentName: "Matheus Lima",
    grade: "3º EM",
    school: "IFRS",
    topic: "Comparar medicina em pública x privada",
    status: "accepted",
    slot: day(7, 17),
  },
  {
    id: "s5",
    studentName: "Larissa Pereira",
    grade: "2º EM",
    school: "Colégio Rosário",
    topic: "Como estudar para a rotina puxada",
    status: "completed",
    slot: day(-3, 19),
  },
  {
    id: "s6",
    studentName: "Rodrigo Alves",
    grade: "3º EM",
    school: "Colégio João XXIII",
    topic: "Vale a pena cursinho antes de medicina?",
    status: "completed",
    slot: day(-7, 20),
  },
];