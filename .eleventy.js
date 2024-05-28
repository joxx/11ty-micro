module.exports = function (eleventyConfig) {
    // Copy `src/assets/css/` to `dist/assets/css`
    // Keeps the same directory structure.
    eleventyConfig.addPassthroughCopy({
        'src/assets/css/global.css': 'src/_includes/global.css'
    });

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