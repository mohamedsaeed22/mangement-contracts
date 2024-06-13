const projectStateOptions = [
  { id: 1, name: "مرحله البدء" },
  { id: 2, name: "مرحله التخطيط" },
  { id: 3, name: "مرحله التنفيذ" },
  { id: 4, name: "مرحله الاغلاق" },
];

const getProjectStateName = (id) => {
  const option = projectStateOptions.find((option) => option.id === id);
  return option ? option.name : "";
};

export { projectStateOptions, getProjectStateName };
