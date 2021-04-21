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

function loadDatalist(json) {
    try {
        cities = JSON.parse(json).cities;
        $('#search-datalist').empty();
        cities.forEach(city => {
            $('<option>').val(city.name).attr('data-geonameid', city.geonameid).appendTo('#search-datalist');
        });
        $('#search-field').focus();
    } catch (error) {
        console.error(error);
    }
}

function showCity(json) {
    try {
        city = JSON.parse(json).city;
        $('#city-name').html(city.name);
        $('#city-country').html(city.country);
        $('#city-subcountry').html(city.subcountry);
        $('#city-geonameid').html(city.geonameid);
        $('#city-success').removeClass('d-none');
        $('#city-error').addClass('d-none');
    } catch (error) {
        console.error(error);
    }
}

function submit() {
    let input = $('#search-field').val();
    let selectedCity = $(`option[value="${input}"]`);
    if (selectedCity.length) {
        get(API_CITY_ENDPOINT, selectedCity.data('geonameid'), null, showCity);
    } else {
        $('#city-error').removeClass('d-none');
        $('#city-success').addClass('d-none');
    }
}

$('#search-field').on('input', () => {
    if ($('#search-field').val() != '')
        get(API_CITIES_ENDPOINT, null, { 'value': $('#search-field').val() }, loadDatalist);
});

$('#search-submit').click(submit);

$(document).keypress((event) => {
    if (event.which == 13) submit();
});