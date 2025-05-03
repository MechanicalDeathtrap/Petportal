export const deleteAuthCookie = () => {
  document.cookie = `jwttoken=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;`;
};

export const findAllCookies = () => {
  return document.cookie
    .split("; ")
    .reduce((acc: Record<string, string>, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {});
};
