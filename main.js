const newsApp = {};

newsApp.API = 'bc68261c03d44dc18e97b094126337ab'
newsApp.baseURL = `https://newsapi.org/v2/top-headlines`

newsApp.mainNav = function(){
    $('a').on('click', function(){
        $(this).children('h3').addClass("typewriter-text");
    });

    $("h3").on("animationend", function(){
        $(this).removeClass("typewriter-text")  
    });

    $('input[type=radio][name=country]').change(function() {

        setTimeout(function(){ 
            $('html, body').animate({
                scrollTop: $("section").offset().top
            }, 1500);
        }, 2500);

    });

}

newsApp.getSelectedVal = function(){
    $("form").on('submit', function(e) {
        
        e.preventDefault();
        $(".results").empty();

        const searchTerm = $("input[type='text']").val();
        newsApp.getNews(searchTerm);

        //update flag icon on news title bar
        const countrySelected = $("input[name='country']:checked").val();
        if (countrySelected === undefined){
            countrySelected = ' '
        };
        $('.country-selected').empty();
        $("h1").append(`<span class="country-selected"> <img src="assets/${countrySelected}.svg"></span>`);
    });

    $('input[type=radio][name=category]').change(function() {
        $(".results").empty();

        newsApp.getNews();
        
        $("input[type=text]").val(" ");

        //update flag icon on news title bar
        const countrySelected = $("input[name='country']:checked").val();
        if (countrySelected === undefined){
            countrySelected = ' '
        };
        $('.country-selected').empty();
        $("h1").append(`<span class="country-selected"> <img src="assets/${countrySelected}.svg"></span>`);
    });
}

newsApp.getNews = function(query){
    const countrySelected = $("input[name='country']:checked").val();
    const topicSelected = $("input[name='category']:checked").val();
        $.ajax({
        url: `https://newsapi.org/v2/top-headlines`,
        method: "GET",
        dataType: "json",
        data: {
            apiKey: 'bc68261c03d44dc18e97b094126337ab',
            q: query,
            country: countrySelected,
            category: topicSelected
        }
    }).then(function(data){
        console.log(data);
        if (data.articles.length===0){
            $('.results').html(`
                <div class="instructions">
                    <p>Sorry! We couldn't find what you were looking for!</p>
                </div>
            `);
        }else{
        newsApp.displayNews(data);
        };
    }).fail(function(error){
        console.log(error);
    });
};

newsApp.displayNews = function (data) {
    data.articles.forEach(function(articles){
        const newsHTML = `
        <div class="results-container">
            <a href="${articles.url}">
                <img src='${articles.urlToImage}'/>
                <h2 class="article-title">${articles.title}</h2>
            </a>
            <p class="description">${articles.description}</p>
        </div>
        `
        $('.results').append(newsHTML);
    });
};

newsApp.init = function(){
    newsApp.mainNav ();
    newsApp.getSelectedVal();
};

$(function(){
    newsApp.init();
});
