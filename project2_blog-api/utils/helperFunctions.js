exports.calculateReadingTime = (blogContent, averageReadingSpeed) => {
	const words = blogContent.split(/\s+/);
	const wordCount = words.length;
	const readingTimeMinutes = Math.ceil(wordCount / averageReadingSpeed);
	return readingTimeMinutes;
};
