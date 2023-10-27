exports.allArticlesQuery = (author, title, tags) => {
	const query = {};
	if (author) {
		query.author = author.replace(/"/g, "");
	}
	if (title) {
		query.title = title.replace(/"/g, "");
	}
	if (tags) {
		query.tags = tags.replace(/"/g, "");
	}
	return query;
};

exports.myArticlesQuery = (author_id, state) => {
	const query = {
		author_id
	};
	if (state) {
		query.state = state.replace(/"/g, "");
	}
	return query;
};
