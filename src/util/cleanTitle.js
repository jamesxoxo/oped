import unescape from './unescape';

function cleanTitle(title) {
  const cleanedTitle = unescape(title)
    .replace(/#[0-9]+:? /, '')
    .replace(/\(TV Broadcast[:;]?.*?\)/i, '')
    .replace(/\(((TV|BD\/DVD): )?eps? .*?\)/i, '')
    .replace(/\(Japanese version.*\)/i, '')
    .trim();

  return cleanedTitle;
}

export default cleanTitle;
