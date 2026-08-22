export type Chapter = {
  id: string;
  name: string;
  region: string;
  address: string;
  image: string;
  leader: string;
  role: string;
  position: { x: number; y: number };
};

export const chapters: Chapter[] = [
  {
    id: "orlando",
    name: "YEF Orlando",
    region: "United States",
    address: "University of Central Florida, Orlando, FL, USA",
    image: "/images/home-v2/testimonial-tamara.png",
    leader: "Tamara Hollis",
    role: "Campus Leader",
    position: { x: 22, y: 42 },
  },
  {
    id: "philadelphia",
    name: "YEF Philadelphia",
    region: "United States",
    address: "Temple University, Philadelphia, PA, USA",
    image: "/images/home-v2/get-involved-bible-study.png",
    leader: "James Carter",
    role: "Campus Leader",
    position: { x: 26, y: 33 },
  },
  {
    id: "seoul",
    name: "YEF Korea",
    region: "Korea",
    address: "Yonsei University, Seoul, South Korea",
    image: "/images/home-v2/get-involved-summer-training.png",
    leader: "Grace Kim",
    role: "Regional Director",
    position: { x: 79, y: 33 },
  },
  {
    id: "hong-kong",
    name: "YEF Hong Kong",
    region: "Hong Kong",
    address: "Hong Kong Baptist University, Kowloon, Hong Kong",
    image: "/images/home-v2/testimonial-james.png",
    leader: "James Wong",
    role: "Campus Leader",
    position: { x: 76, y: 40 },
  },
  {
    id: "bujumbura",
    name: "YEF Burundi",
    region: "Burundi",
    address: "University of Burundi, Bujumbura, Burundi",
    image: "/images/home-v2/testimonial-esther.png",
    leader: "Esther Niyonzima",
    role: "Campus Leader",
    position: { x: 55, y: 57 },
  },
  {
    id: "addis-ababa",
    name: "YEF Ethiopia",
    region: "Ethiopia",
    address: "Addis Ababa University, Addis Ababa, Ethiopia",
    image: "/images/home-v2/movement-africa.png",
    leader: "Daniel Bekele",
    role: "Regional Director",
    position: { x: 57, y: 48 },
  },
  {
    id: "nukualofa",
    name: "YEF Tonga",
    region: "Tonga",
    address: "Tupou Tertiary Institute, Nuku'alofa, Tonga",
    image: "/images/home-v2/get-involved-mission-trips.png",
    leader: "Sione Taufa",
    role: "Campus Leader",
    position: { x: 92, y: 68 },
  },
];
