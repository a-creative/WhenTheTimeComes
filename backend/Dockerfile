FROM php:7.4.30-apache

ARG DEBIAN_FRONTEND=noninteractive

# BEGIN Prepare access rights for the host system
ARG USER_ID
ARG GROUP_ID

RUN addgroup --gid $GROUP_ID host_group
RUN adduser --disabled-password --gecos '' --uid $USER_ID --gid $GROUP_ID host_user
# END Prepare access rights for the host system

RUN apt-get update;
RUN apt-get install -y --no-install-recommends apt-utils;
RUN apt-get install -y --no-install-recommends unzip;
RUN docker-php-ext-install pdo_mysql;
RUN docker-php-ext-install bcmath;
RUN apt-get autoclean -y;
RUN a2enmod rewrite;
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer;

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

USER host_user

EXPOSE 80  
#ENTRYPOINT ["/var/www/html/dev-run.sh"]