export function getTextQuery(search) {
  const searchArr = search.split(' ');
  const textQuery = searchArr.reduce((acc, curr) => {
    if (curr) return `${acc ? `${acc} | ` : ''}${curr}:*`;
    return acc;
  }, '');
  return textQuery;
}