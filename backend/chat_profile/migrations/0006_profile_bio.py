# Generated by Django 2.2.4 on 2021-01-28 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_profile', '0005_auto_20210128_1411'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='bio',
            field=models.TextField(blank=True, null=True),
        ),
    ]
