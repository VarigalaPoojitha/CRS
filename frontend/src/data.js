export const categories = {
  Kids: {
    Boys: ["Fancy", "Ethnic Wear", "Suits"],
    Girls: ["Fancy", "Ethnic Wear", "Dresses", "Sarees"]
  },
  Adults: {
    Male: ["Fancy", "Ethnic Wear", "Suits"],
    Female: ["Fancy", "Ethnic Wear", "Sarees", "Dresses"]
  }
};

export const sizesByCategory = {
  Kids: ["S", "M", "L", "XL"],
  Adults: ["XS", "S", "M", "L", "XL", "XXL"]
};

export const costumes = [
  { id: "kbfs1", name: "Superman", size: "S", age: "Kids", gender: "Boys", type: "Fancy", image: "https://via.placeholder.com/200x250?text=Superman+S" },
  { id: "kbfp1", name: "Spiderman", size: "S", age: "Kids", gender: "Boys", type: "Fancy", image: "https://via.placeholder.com/200x250?text=Spiderman+S" },
  { id: "kbe1", name: "Kurta", size: "M", age: "Kids", gender: "Boys", type: "Ethnic Wear", image: "https://via.placeholder.com/200x250?text=Kurta+M" },
  { id: "kgf1", name: "Princess", size: "XL", age: "Kids", gender: "Girls", type: "Fancy", image: "https://via.placeholder.com/200x250?text=Princess+XL" },
  { id: "amf1", name: "Superhero", size: "L", age: "Adults", gender: "Male", type: "Fancy", image: "https://via.placeholder.com/200x250?text=Superhero+L" },
  { id: "aff1", name: "Gown", size: "L", age: "Adults", gender: "Female", type: "Fancy", image: "https://via.placeholder.com/200x250?text=Gown+L" }
];
