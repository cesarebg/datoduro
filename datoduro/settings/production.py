# -*- coding: utf-8 -*-
from .base import *

DEBUG = False

ALLOWED_HOSTS = ["www.datoduro.com.mx", "167.172.205.131"]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config("DATABASE_NAME"),
        'USER': config("DATABASE_USER"),
        'PASSWORD': config("DATABASE_PASSWORD"),
        'HOST': '',
        'PORT': '',
    }
}



# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': get_env_variable('DATABASE_NAME'),
#         'USER': get_env_variable('DATABASE_USER'),
#         'PASSWORD': get_env_variable('DATABASE_PASSWORD'),
#         'HOST': '',
#         'PORT': '',
#     }
# }
