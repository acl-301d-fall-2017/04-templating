'use strict';

const articleView = {};

// TODO: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// Arrow functions take 'this' out of the scope of the function, so 'this' will refer to the window if used in an arrow function. A function can be refactored if it is not dependent on object-specific properties. You can also use arrow functions on the outside function if other fns nested inside it use 'this'.  
const authors = [];

articleView.populateAuthors = () => {
    rawData.forEach(function(element) {
        authors.push(element.author);
    });
        
    const authorTemplate = $('#author-template').html();
    const templateFiller = Handlebars.compile(authorTemplate);
    authors.forEach(author => {
        const filledTemplate = templateFiller({author});
        $('#author-filter').append(filledTemplate);
    });
};

const categories = [];

articleView.populateCategories = () => {
    rawData.forEach(function(element) {
        categories.push(element.category);
    });
        
    const categoryTemplate = $('#category-template').html();
    const templateFiller = Handlebars.compile(categoryTemplate);
    categories.forEach(category => {
        const filledTemplate = templateFiller({category});
        $('#category-filter').append(filledTemplate);
    });
};

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            const selector = `article[data-author='${$(this).val()}']`;
            console.log(selector);
            $(selector).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-category="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#author-filter').val('');
    });
};

articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function() {
        $('.tab-content').hide();
        $(`#${$(this).data('content')}`).fadeIn();
    });

    $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function(e) {
        e.preventDefault();
        if ($(this).text() === 'Read on →') {
            $(this).parent().find('*').fadeIn();
            $(this).html('Show Less &larr;');
        } else {
            $('body').animate({
                scrollTop: ($(this).parent().offset().top)
            },200);
            $(this).html('Read on &rarr;');
            $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
        }
    });
};

$(document).ready(() => {
    articleView.populateAuthors();
    articleView.populateCategories();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
});
