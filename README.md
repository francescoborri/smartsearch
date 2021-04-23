# Cities smartsearch
This project is a simple google-search-like search engine based on a cities database. Built with [Symfony](https://symfony.com/), AJAX and [Bootstrap](https://getbootstrap.com/).

## Installation
Clone this repository, install the required dependencies and configure the database. 
```sh
git clone https://github.com/francescoborri/smartsearch
cd smartsearch
composer update

echo "DATABASE_URL=\"{your_database_URL_here}\"" > .env.local
bin/console doctrine:database:create #or symfony console doctrine:database:create
bin/console doctrine:schema:create #or symfony console doctrine:schema:create
```

## Usage
Run the built-in symfony web server.
```sh
symfony serve
```
In the `/search` path there's the actual search engine, which uses a very minimal web service located in the `/api` path. In the `/api/cities` path you can search a city by its initials, specifying them in the `filter` query parameter (e.g. `/api/cities?filter=Lond`). If you want more information about a specific city, you can find them in the `/api/city/{geonameid}` path specifying the geonameid of the city.




