export const fillTemplate = (template, data) => {
  return template.replace(/\${(.*?)}/g, (_, key) => data[key] || "");
};
