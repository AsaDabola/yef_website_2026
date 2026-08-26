export type Chapter = {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  /**
   * The campus itself, so the embed drops its pin on the building rather than
   * wherever Google's geocoder lands on the address string.
   */
  lat: number;
  lng: number;
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
    lat: 28.6024,
    lng: -81.2001,
    leader: "Tamara Hollis",
    role: "Campus Leader",
  },
  {
    id: "philadelphia",
    name: "YEF Philadelphia",
    country: "United States",
    city: "Philadelphia",
    address: "Temple University, Philadelphia, PA, USA",
    lat: 39.9812,
    lng: -75.1554,
    leader: "James Carter",
    role: "Campus Leader",
  },
  {
    id: "seoul",
    name: "YEF Korea",
    country: "Korea",
    city: "Seoul",
    address: "Yonsei University, Seoul, South Korea",
    lat: 37.5665,
    lng: 126.9387,
    leader: "Grace Kim",
    role: "Regional Director",
  },
  {
    id: "hong-kong",
    name: "YEF Hong Kong",
    country: "Hong Kong",
    city: "Kowloon",
    address: "Hong Kong Baptist University, Kowloon, Hong Kong",
    lat: 22.3383,
    lng: 114.182,
    leader: "James Wong",
    role: "Campus Leader",
  },
  {
    id: "bujumbura",
    name: "YEF Burundi",
    country: "Burundi",
    city: "Bujumbura",
    address: "University of Burundi, Bujumbura, Burundi",
    lat: -3.3838,
    lng: 29.3644,
    leader: "Esther Niyonzima",
    role: "Campus Leader",
  },
  {
    id: "addis-ababa",
    name: "YEF Ethiopia",
    country: "Ethiopia",
    city: "Addis Ababa",
    address: "Addis Ababa University, Addis Ababa, Ethiopia",
    lat: 9.0405,
    lng: 38.7626,
    leader: "Daniel Bekele",
    role: "Regional Director",
  },
  {
    id: "nukualofa",
    name: "YEF Tonga",
    country: "Tonga",
    city: "Nuku'alofa",
    address: "Tupou Tertiary Institute, Nuku'alofa, Tonga",
    lat: -21.1394,
    lng: -175.2018,
    leader: "Sione Taufa",
    role: "Campus Leader",
  },
];
