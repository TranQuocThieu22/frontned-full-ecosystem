interface I_Theme {
  id: string;
  name: string;
  background: string;
  imagePath: string;
}

// Danh sách chủ đề với background
export const themes : I_Theme[] = [
  {
    id: "ocean",
    name: "Blue Ocean",
    background:
      "linear-gradient(135deg, #a2d4f5 0%, #0077be 50%, #e0f7fa 100%)",
    imagePath: "/imgs/theme/ocean.jpg",
  },
  {
    id: "forest",
    name: "Dense Forest",
    background:
      "linear-gradient(135deg, #b2f2bb 0%, #69db7c 50%, #2b8a3e 100%)",
    imagePath: "/imgs/theme/forest.jpg",
  },
  {
    id: "sunset",
    name: "Good Morning",
    background:
      "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)",
    imagePath: "/imgs/theme/sunset.jpg",
  },
  {
    id: "mountain",
    name: "Everest",
    background:
      "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #ffffff 100%)",
    imagePath: "/imgs/theme/mountains.jpg",
  },
  {
    id: "blueberry",
    name: "Blueberry",
    background:
      "linear-gradient(135deg, #cddbff 0%, #6ea8fe 50%, #3b5bdb 100%)",
    imagePath: "/imgs/theme/blueberry.jpg",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    background:
      "linear-gradient(135deg, #ffc9c9 0%, #ff8787 50%, #fa5252 100%)",
    imagePath: "/imgs/theme/strawberry.jpg",
  },
  {
    id: "capybara",
    name: "Capybara",
    background:
      "linear-gradient(135deg, #e0c3fc 0%, #c084fc 50%, #a78bfa 100%)",
    imagePath: "/imgs/theme/capy.jpg",
  },
  {
    id: "nuts",
    name: "Nuts",
    background:
      "linear-gradient(135deg, #f1e0c6 0%, #ddb892 50%, #b08968 100%)",
    imagePath: "/imgs/theme/nuts.jpg",
  },
  {
    id: "sunflower",
    name: "Sunflower",
    background:
      "linear-gradient(135deg, #fff9c4 0%, #fde047 50%, #facc15 100%)",
    imagePath: "/imgs/theme/sunflower.jpg",
  },
];

