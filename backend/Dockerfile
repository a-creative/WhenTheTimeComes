FROM php:7.4.30-apache

ARG DEBIAN_FRONTEND=noninteractive

# BEGIN Prepare access rights for the host system
ARG USER_ID
ARG GROUP_ID

RUN addgroup --gid $GROUP_ID host_group
RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID host_user
USER host_user
# END Prepare access rights for the host system

RUN apt-get update; \
    apt-get install -y --no-install-recommends apt-utils; \
    apt-get install -y --no-install-recommends unzip; \
    docker-php-ext-install pdo_mysql; \
    docker-php-ext-install bcmath; \
    apt-get autoclean -y; \
    a2enmod rewrite; \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer;

WORKDIR /var/www/html

COPY src/ /var/www/html/

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf;
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf;
RUN chown -R www-data:www-data storage;
RUN chown -R www-data:www-data bootstrap/cache;
RUN chmod -R 775 storage;
RUN chmod -R 775 bootstrap/cache;
RUN chmod +x dev-run.sh
RUN chmod +x wait-for-it.sh
EXPOSE 80  
#ENTRYPOINT ["/var/www/html/dev-run.sh"]