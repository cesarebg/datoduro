# Generated by Django 3.0.3 on 2020-03-22 21:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0007_blogpage_topic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpage',
            name='topic',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
