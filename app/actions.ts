"use server";

export const getData = async () => {
  const data = {
    x: 54,
    y: 68,
    width: 275,
    height: 18,
    text: "Get started by editing app/page.tsx",
  };
  return new Promise<typeof data>((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1);
  });
};
