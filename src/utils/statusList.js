const projectStateOptions = [
  { id: 1, name: "لم يتم البدء" },
  { id: 2, name: "جار العمل علية" },
  { id: 3, name: "اكتمل" },
  { id: 4, name: "معلق" },
];

const getProjectStateName = (id) => {
  const option = projectStateOptions.find((option) => option.id === id);
  return option ? option.name : "";
};

export { projectStateOptions, getProjectStateName };
