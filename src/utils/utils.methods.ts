const pick = <T extends Record<string, string>, K extends keyof T> (object: T, keys: K[]) => {
    const result = {} as { [P in K]: T[P] };
  
    keys.forEach((key) => {
        if (key in object) {
            result[key] = object[key];
        }
    });
  
    return result;
};

export {
    pick
};
