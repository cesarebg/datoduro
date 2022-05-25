# -*- coding: utf-8 -*-
from .base import *
from decouple import config

DEBUG = config('DEBUG', cast=bool)

ALLOWED_HOSTS = ['*']

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