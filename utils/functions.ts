export const debounce = (fn: () => void, ms = 1500) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this), ms);
  };
};
