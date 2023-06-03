module.exports = extractHashtags = (text) => {
  const hashtagRegex = /#[\wÀ-ú-]+/g;
  const hashtags = text.match(hashtagRegex);
  return hashtags;
};
