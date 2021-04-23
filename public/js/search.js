const API_URL_PREFIX = '/api';
const API_CITIES_ENDPOINT = `${API_URL_PREFIX}/cities`;
const API_CITY_ENDPOINT = `${API_URL_PREFIX}/city`;

function urlBuilder(prefix, urlParameter, queryParameters) {
    return prefix + (urlParameter === null ? '' : `/${urlParameter}`) + (queryParameters !== null ? '?' + Object.entries(queryParameters).map(([key, value]) => `${key}=${value}`).join('&') : '');
}

function get(prefix, urlParameter, queryParameters, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = () => callback(xhttp.responseText);
    xhttp.open('GET', urlBuilder(prefix, urlParameter, queryParameters), true);
    xhttp.send();
}

function load(json) {
    try {
        cities = JSON.parse(json).cities;
        $('#search-dropdown').empty();

        if (cities && cities.length > 0)
            cities.slice(0, 10).forEach(city => {
                $('#search-dropdown').append(
                    $('<li>').addClass('dropdown-item').attr('data-geonameid', city.geonameid).click(function() {
                        get(API_CITY_ENDPOINT, $(this).data('geonameid'), null, show);
                    }).append(
                        $('<span>').text(city.name)
                    ).append($('<br>')).append(
                        $('<small>').addClass('text-muted').text(city.country)
                    ));
            });
        else
            $('#search-dropdown').append(
                $('<li>').addClass('dropdown-item').text('No city found'));

    } catch (error) {
        console.error(error);
    }
}

function show(json) {
    try {
        city = JSON.parse(json).city;
        $('#modal-city-name').text(city.name);
        $('#modal-city-country').text(city.country);
        $('#modal-city-subcountry').text(city.subcountry);
        $('#modal-city-geonameid').text(city.geonameid);
        $('#modal-city').modal('show');
    } catch (error) {
        console.error(error);
    }
}

$('#search-field').on('input', () => {
    if ($('#search-field').val() != '') {
        get(API_CITIES_ENDPOINT, null, { 'filter': $('#search-field').val() }, load);
        $('#search-dropdown').show();
    } else
        $('#search-dropdown').hide();
});

$('#search-field').on('keypress', event => {
    if (event.which == 13)
        $('#search-dropdown > li:first')[0].click();
});