const formatDate = (date: string) => {
  return Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
  }).format(new Date(date));
};

export default formatDate;
