addEventListener("load", function () {
    let sideWidth = $(".side-options").outerWidth();
    $('main').css({ 'margin-left': `${sideWidth}px` });
})

/********************************************************************************************/

$(".open-close").click(function () {
    if ($("aside").css("left") === "0px") {
        $("aside").animate({ "left": "-250px" }, 500);
        $(".open-close").html('<i class="fa-solid fa-bars fa-2x"></i>');
        $(".list ul li").animate({ "padding-top": "700px" }, 200);
        $(".list ul li").animate({ "opacity": "0" }, 200);

    } else {
        $("aside").animate({ "left": "0px" }, 500);
        $(".open-close").html('<i class="fa-solid fa-xmark fa-2x"></i>');
        $(".list ul li").animate({ "opacity": "1" }, 200);
        $(".list ul li").animate({ "padding-top": "40px" }, 200);
    }

})

/********************************************************************************************/

$('#search').keyup(function () {
    let value = $(this).val();
    if (value != "") {
        getData("search", value);
    }
})

$('#search-here').keyup(function () {
    let value = $(this).val();
    $('#for-search .row').html("");
    $("#main-movies .row .movie-card .movie .movie-overlay .text-center .title h2").each(index => {
        let movieName = $("#main-movies .row .movie-card .movie .movie-overlay .text-center .title h2").eq(index).html();
        let currentParent = $("#main-movies .row .movie-card .movie .movie-overlay .text-center .title h2").eq(index).parents(".movie-card");
        if (movieName.includes(value) && value != "") {
            let copiedParent = currentParent.clone(true);
            $('#for-search .row').append(copiedParent);
        } else {
            $('hr').css({ "display": "block" });
        }
    })
    $('#for-search').css({ "display": "block" });
    $('hr').css({ "display": "block" });
})



/********************************************************************************************/

getData("now_playing");

function getData(category, value = "") {
    $('#movies .row').html("");
    let moviesData;
    if (category === "trending") {
        moviesData = fetch(`https://api.themoviedb.org/3/${category}/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0wRbmpY_6_vlQKlsxkPUgNUBGaceNyngdGCksL8bu-YqlVUlX64OaR3ks`)
    } else if (category === "search") {
        moviesData = fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0wRbmpY_6_vlQKlsxkPUgNUBGaceNyngdGCksL8bu-YqlVUlX64OaR3ks&query=${value}`)
    }
    else {
        moviesData = fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR0wRbmpY_6_vlQKlsxkPUgNUBGaceNyngdGCksL8bu-YqlVUlX64OaR3ks`)
    }

    moviesData.then(Response => Response.json())
        .then(data => {
            data.results.forEach(movie => {
                let title = movie.original_title;
                let overview = movie.overview;
                let rating = movie.vote_average;
                let date = movie.release_date;
                let posterurl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

                $('#movies .row').append(`
                <div class="col-md-6 col-lg-4 pb-4 movie-card">
                    <div class="movie position-relative rounded overflow-hidden">
                        <div class="movie-overlay position-absolute h-100 p-3 d-flex align-items-center">
                            <div class="text-center">
                                <div class="title">
                                    <h2>
                                        ${title}
                                    </h2>
                                </div>
                                <div class="overview">
                                    <p>
                                        ${overview}
                                    </p>
                                </div>
                                <div class="rate">
                                    <p>
                                        Rate: <strong>${rating}</strong>
                                    </p>
                                </div>
                                <div class="date">
                                    <p>
                                        ${date}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <img src="${posterurl}" alt="poster" class="w-100">
                    </div>
                </div>`
                )
            });
        })

}

$(".list ul li:not(:last-child)").click(function () {
    let category = $.trim($(this).text()).toLowerCase().replace(/ /g, '_');;
    getData(category);
    $(window).scrollTop(0);
})

/********************************************************************************************/
$('.inputs input').focus(function () {
    $(this).next().css({ "display": "block" });
})

let validName;
let validEmail;
let validPhone;
let validAge;
let validPassword;
let validRepassword;


$('#name').keyup(function () {
    let value = $(this).val().toLowerCase();
    let regEx = /^[a-zA-Z]+$/;
    validName = regEx.test(value);
    if (validName && value.length >= 3) {
        $(this).next().css({ "display": "none" });
        $(this).unbind("focus");
    } else {
        $(this).next().css({ "display": "block" });
    }
})

$('#email').keyup(function () {
    let value = $(this).val().toLowerCase();
    let regEx = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    validEmail = regEx.test(value);
    if (validEmail) {
        $(this).next().css({ "display": "none" });
        $(this).unbind("focus");

    } else {
        $(this).next().css({ "display": "block" });
    }
})

$('#phone').keyup(function () {
    let value = $(this).val()
    let regEx = /^(01)[0-2][0-9]{8}$/;
    validPhone = regEx.test(value);
    if (validPhone) {
        $(this).next().css({ "display": "none" });
        $(this).unbind("focus");

    } else {
        $(this).next().css({ "display": "block" });
    }
})

$('#age').keyup(function () {
    let value = $(this).val();
    let regEx = /^[0-9]{1,2}$/;
    validAge = regEx.test(value);
    if (validAge) {
        $(this).next().css({ "display": "none" });
        $(this).unbind("focus");

    } else {
        $(this).next().css({ "display": "block" });
    }
})

let passwordValue;

$('#password').keyup(function () {
    passwordValue = $(this).val();
    console.log(passwordValue)
    let regEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    validPassword = regEx.test(passwordValue);
    if (validPassword) {
        $(this).next().css({ "display": "none" });
        $(this).unbind("focus");
    } else {
        $(this).next().css({ "display": "block" });
    }
})

$('#repassword').keyup(function () {
    let value = $(this).val();
    validRepassword = value === passwordValue;
    if (validRepassword) {
        $(this).next().css({ "display": "none" });
        $(this).unbind("focus");
    } else {
        $(this).next().css({ "display": "block" });
    }
})

$('#submit-contact').hover(function () {
    if (validName && validEmail && validPhone && validAge && validPassword && validRepassword) {
        $(this).css({ "background-color": "var(--pink)", "color": "var(--grey)", "cursor": "pointer"});
    }
}, function () {
    $(this).css({ "background-color": "transparent", "color": "var(--pink)", "cursor": "default"});
});
/********************************************************************************************/