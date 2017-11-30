'use strict';

const articles = [];

function Article (rawDataObj) {
    this.author = rawDataObj.author;
    this.authorUrl = rawDataObj.authorUrl;
    this.title = rawDataObj.title;
    this.category = rawDataObj.category;
    this.body = rawDataObj.body;
    this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function() {
    const $newArticle = $('article.template').clone();
    $newArticle.removeClass('template');
    if (!this.publishedOn) {
        $newArticle.addClass('draft');
    }
    $newArticle.attr('data-category', this.category);
    $newArticle.attr('data-author', this.author);
    $newArticle.find('.byline a').html(this.author);
    $newArticle.find('.byline a').attr('href', this.authorUrl);
    $newArticle.find('h1:first').html(this.title);
    $newArticle.find('.article-body').html(this.body);
    $newArticle.find('time[pubdate]').attr('datetime', this.publishedOn);
    $newArticle.find('time[pubdate]').attr('title', this.publishedOn);
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000) + ' days ago');
    $newArticle.append('<hr>');

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

    const theTemplateScript = $('#address-template').html();
    const theTemplate = Handlebars.compile(theTemplateScript);

    const filledTemplate = theTemplate(this);

    $('.content-placeholder').html(filledTemplate);
    return $newArticle;
};

// COMMENT: Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?
// because there are multiple parameters. no parens are needed for a single one.
rawData.sort((a,b) => {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
    articles.push(new Article(articleObject));
});

articles.forEach(article => {
    $('#articles').append(article.toHtml());
});