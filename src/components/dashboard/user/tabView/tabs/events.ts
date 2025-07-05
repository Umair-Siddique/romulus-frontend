const now = new Date();

export default [
  {
    id: 14,
    title: "3 Missions",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3))
  },
  {
    id: 15,
    title: "2 Missions",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 13, 0)
  },
  {
    id: 16,
    title: "4 Missions",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 9, 30),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2, 12, 45)
  },
  {
    id: 17,
    title: "1 Mission",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 14, 0),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 15, 30)
  },
  {
    id: 18,
    title: "5 Missions",
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 8, 0),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4, 12, 0)
  },
];
