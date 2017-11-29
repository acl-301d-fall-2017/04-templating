'use strict';

let articles = []; // eslint-disable-line

function Article (rawDataObj) {
    this.author = rawDataObj.author;
    this.authorUrl = rawDataObj.authorUrl;
    this.title = rawDataObj.title;
    this.category = rawDataObj.category;
    this.body = rawDataObj.body;
    this.publishedOn = rawDataObj.publishedOn;
}

Article.prototype.toHtml = function() {
  // [X]TODO: Use Handlebars to render your articles. Get your template from the DOM and "compile" your template with Handlebars.
    const theTemplateScript = $('#article-template').html();
    const theTemplate = Handlebars.compile(theTemplateScript);

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn)) / 60 / 60 / 24 / 1000);
    this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';

    const filledTemplate = theTemplate(this);
    return filledTemplate;
  // REVIEW: If your template will use properties that aren't on the object yet, add them.
  // Since your template can't hold any JS logic, we need to execute the logic here.
  // The result is added to the object as a new property, which can then be referenced by key in the template.
  // For example, you might want to display how old a post is, or say "(draft)" if it has no publication date:
  // [X]TODO: Use the method that Handlebars gave you to return your filled-in html template for THIS article.

};

// []COMMENT: Why are there parentheses around "(a,b)" in the .sort() method, but not around the "articleObject" or "article" arguments in the .forEach() methods?
// It is not around them because they are on the same line. And you use different syntax for very short arrow functions. For some reason.
rawData.sort((a,b) => {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(articleObject => {
    articles.push(new Article(articleObject));
});

articles.forEach(article => {
    $('#articles').append(article.toHtml());
});
Article.prototype.toHtml();