'use strict';

let articleView = {};

// TODO: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// Arrow functions do not dynamically bind 'this' inside the function body. 'this' will still be attached to the window. A function will be refactored if it does not contain 'this'.

articleView.populateFilters = () => {
    const authorSource = $('#author-temp').html();
    const authorTemplate = Handlebars.compile(authorSource);

    const catSource = $('#category-temp').html();
    const catTemplate = Handlebars.compile(catSource);

    $('article').each(function() {
        const author = $(this).attr('data-author');
        const category = $(this).attr('data-category');

        const authFilledOut = authorTemplate({author:author});
        const catFilledOut = catTemplate({category:category});  
      
        $('#author-filter').append(authFilledOut);
        $('#category-filter').append(catFilledOut);
        
    });
};

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-author="${$(this).val()}"]`).fadeIn();
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
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
});
