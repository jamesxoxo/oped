import uniqueId from 'lodash/uniqueId';

function veryUniqueId(ids, prefix) {
  const id = uniqueId(prefix);

  if (!ids.includes(id)) {
    return id;
  }

  return veryUniqueId(ids, prefix);
}

export default veryUniqueId;
