# -*- coding: utf-8 -*-
from .base import *

DEBUG = False

ALLOWED_HOSTS = ["167.172.205.131", "www.datoduro.com.mx"]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config('DATABASE_NAME'),
        'USER': config('DATABASE_USER'),
        'PASSWORD': config('DATABASE_PASSWORD'),
        'HOST': '',
        'PORT': '',
    }
}
