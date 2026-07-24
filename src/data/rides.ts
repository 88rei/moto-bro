export type Ride = {
  id: string;
  title: string;
  date: string;
  meetTime: string;
  location: string;
  mapUrl: string;
  pace: "Chill" | "Spirited" | "Rapid" | "Lethal";
  distance: string;
  status: "upcoming" | "past";
  notes?: string;
};

export const rides: Ride[] = [
  {
    id: "rolling-kemayoran-senayan-26072026",
    title: "Fun Kemayoran-Senayan Ride",
    date: "Jul 26, 2026",
    meetTime: "23:30",
    location: "Kemayoran-Senayan Route, Jakarta",
    mapUrl:
      "https://www.google.com/maps/place/Kemayoran+to+Senayan/data=!4m2!3m1!1s0x0:0x162be0874016b4b0?sa=X&ved=1t:2428&ictx=111",
    pace: "Chill",
    distance: "unknown",
    status: "upcoming",
    notes: "Casual Ride, minimum 10 units checked in. No incidents.",
  },
  // {
  //   id: "hudson-loop",
  //   title: "Hudson Valley Loop",
  //   date: "Nov 22, 2026",
  //   meetTime: "22:00",
  //   location: "Bear Mountain Traffic Circle",
  //   mapUrl: "https://maps.google.com/?q=Bear+Mountain+NY",
  //   pace: "Rapid",
  //   distance: "112 mi",
  //   status: "upcoming",
  //   notes: "Seven Lakes Drive at night. Watch for deer past midnight.",
  // },
  // {
  //   id: "portside-drift",
  //   title: "Portside Drifts",
  //   date: "Oct 10, 2026",
  //   meetTime: "21:00",
  //   location: "Long Beach Docks",
  //   mapUrl: "https://maps.google.com/?q=Long+Beach+Docks",
  //   pace: "Spirited",
  //   distance: "56 mi",
  //   status: "past",
  //   notes: "12 units checked in. Zero incidents.",
  // },
  // {
  //   id: "skyline-express",
  //   title: "Skyline Drive Express",
  //   date: "Sep 28, 2026",
  //   meetTime: "20:30",
  //   location: "Skyline Blvd Overlook",
  //   mapUrl: "https://maps.google.com/?q=Skyline+Blvd",
  //   pace: "Rapid",
  //   distance: "94 mi",
  //   status: "past",
  //   notes: "Full moon run. Fog rolled in past mile 40.",
  // },
  // {
  //   id: "tunnel-vision",
  //   title: "Tunnel Vision",
  //   date: "Sep 12, 2026",
  //   meetTime: "01:00",
  //   location: "Second Ave Tunnel",
  //   mapUrl: "https://maps.google.com/?q=Second+Avenue+Tunnel",
  //   pace: "Lethal",
  //   distance: "22 mi",
  //   status: "past",
  //   notes: "Acoustics check. Ears still ringing.",
  // },
];
