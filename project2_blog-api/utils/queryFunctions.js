const searchQuery = (author, title, tags) => {
    const query = {};
    if (author) {
        query.author = author.replace(/"/g, '');
    }
    if (title) {
        query.title = title.replace(/"/g, '');
    }
    if (tags) {
        query.tags = tags.replace(/"/g, '');
    }
    return query;
};

module.exports = searchQuery;   