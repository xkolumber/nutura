export const getTime = (time: string) => {
  const createdAtDate = new Date(time);
  const hour = createdAtDate.getHours().toString().padStart(2, "0");
  const minute = createdAtDate.getMinutes().toString().padStart(2, "0");
  const second = createdAtDate.getSeconds().toString().padStart(2, "0");
  const formattedTime = `${hour}:${minute}:${second}`;
  return formattedTime;
};

export const categories = ["prijatá", "expedovaná", "storno"];

export const getDate = (time: string) => {
  const createdAtDate = new Date(time);

  const day = createdAtDate.getDate();
  const month = createdAtDate.getMonth() + 1;
  const year = createdAtDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
