export type Chapter = {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  image: string;
  leader: string;
  role: string;
};

export const chapters: Chapter[] = [
  {
    id: "orlando",
    name: "YEF Orlando",
    country: "United States",
    city: "Orlando",
    address: "University of Central Florida, Orlando, FL, USA",
    image: "/images/home-v2/testimonial-tamara.png",
    leader: "Tamara Hollis",
    role: "Campus Leader",
  },
  {
    id: "philadelphia",
    name: "YEF Philadelphia",
    country: "United States",
    city: "Philadelphia",
    address: "Temple University, Philadelphia, PA, USA",
    image: "/images/home-v2/get-involved-bible-study.png",
    leader: "James Carter",
    role: "Campus Leader",
  },
  {
    id: "seoul",
    name: "YEF Korea",
    country: "Korea",
    city: "Seoul",
    address: "Yonsei University, Seoul, South Korea",
    image: "/images/home-v2/get-involved-summer-training.png",
    leader: "Grace Kim",
    role: "Regional Director",
  },
  {
    id: "hong-kong",
    name: "YEF Hong Kong",
    country: "Hong Kong",
    city: "Kowloon",
    address: "Hong Kong Baptist University, Kowloon, Hong Kong",
    image: "/images/home-v2/testimonial-james.png",
    leader: "James Wong",
    role: "Campus Leader",
  },
  {
    id: "bujumbura",
    name: "YEF Burundi",
    country: "Burundi",
    city: "Bujumbura",
    address: "University of Burundi, Bujumbura, Burundi",
    image: "/images/home-v2/testimonial-esther.png",
    leader: "Esther Niyonzima",
    role: "Campus Leader",
  },
  {
    id: "addis-ababa",
    name: "YEF Ethiopia",
    country: "Ethiopia",
    city: "Addis Ababa",
    address: "Addis Ababa University, Addis Ababa, Ethiopia",
    image: "/images/home-v2/movement-africa.png",
    leader: "Daniel Bekele",
    role: "Regional Director",
  },
  {
    id: "nukualofa",
    name: "YEF Tonga",
    country: "Tonga",
    city: "Nuku'alofa",
    address: "Tupou Tertiary Institute, Nuku'alofa, Tonga",
    image: "/images/home-v2/get-involved-mission-trips.png",
    leader: "Sione Taufa",
    role: "Campus Leader",
  },
];
