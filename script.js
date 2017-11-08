$(document).ready(function () {
    var searchInput;
    function findWiki () {

        searchInput = $(".search-input").val();

        var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&format=json&callback=?";
        if (searchInput) {
            $('#results .card').removeClass('bounceInUp').addClass('lightSpeedOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).remove();
            });
            $.ajax({
                type: "GET",
                url: url,
                async: false,
                dataType: "json",
                success: function (data) {
                    $('#results').html("");
                    //if search value is not found on wikipedia
                    if (data[1][0] === [] && data[2][0] === [] && data[3][0] === []) {
                        $('#results').append('<p class="card animated bounceInUp"><h2>' + searchInput + ' was not found on Wikipedia, Please try again.</h2></p>');
                    } else {
                        $('.search-wrapper').css('top', '150px');
                        setTimeout(function () {
                            for (var i = 0; i < data[1].length; i++) {
                                $('#results').append('<a class="card animated bounceInUp" href ="' + data[3][i] + '" target="_blank">' + '<h1>'+ data[1][i] + '</h1>' + '<p>' + data[2][i] + '</p><a/>')
                            }
                        }, 600);

                    }
                }
            })
        } else {
            $('.search-wrapper').css('top', '150px');

            //remove previous cards to make space for new.
            $('.card').removeClass('bounceInUp').addClass('lightSpeedOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).remove();
            });
            setTimeout(function () {
                $('#results').append('<a href="#" class="card animated bounceInUp"><h2>Please enter something to search for.</h2></a>');
            }, 600);
        } //
    }


   $('.search-btn').click(findWiki);



    //Keypress function, so you can search even by pressing enter
    $(document).keypress(function (e) {
        var searchInput = $('#search').val();
        if (e.which == 13) {
            findWiki();
        }
    });
})