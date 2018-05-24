// Pretty much an exact copy of lodash's method but with some extras.

const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#039;': "'",
};

const reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#039);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

function unescape(string) {
  return string && reHasEscapedHtml.test(string)
    ? string.replace(reEscapedHtml, entity => htmlUnescapes[entity])
    : string;
}

export default unescape;
