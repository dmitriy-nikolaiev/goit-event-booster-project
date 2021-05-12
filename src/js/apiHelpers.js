export const request = async (path, options) => {
  const rawResult = await fetch(path, { ...options });

  if (!rawResult.ok) {
    throw rawResult;
  }

  return await rawResult.json();
};
