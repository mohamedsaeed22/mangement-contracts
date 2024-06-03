const risksandDisablesOptions = [
  { id: 1, name: "نشط" },
  { id: 2, name: "مؤجل" },
  { id: 3, name: "مغلق" },
];

const getRisksAndDisablesName = (id) => {
  const option = risksandDisablesOptions.find((option) => option.id === id);
  return option ? option.name : "";
};

export { risksandDisablesOptions ,getRisksAndDisablesName };
