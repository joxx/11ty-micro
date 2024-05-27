module.exports = function (eleventyConfig) {

    // Copy `css/fonts/` to `_site/css/fonts`
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy("src/assets/css");

    // 	--------------------- general config -----------------------
    return {
        // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',

        // Optional (default is set): If your site deploys to a subdirectory, change `pathPrefix`, for example with with GitHub pages
        pathPrefix: '/',

        dir: {
            output: 'dist',
            input: 'src',
            includes: '_includes',
            layouts: '_layouts'
        }
    };

};