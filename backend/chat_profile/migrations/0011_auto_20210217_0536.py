# Generated by Django 2.2.17 on 2021-02-17 05:36

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_profile', '0010_profile_industry'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='availability',
            field=models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Availability'),
        ),
        migrations.AddField(
            model_name='profile',
            name='languages',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=250), blank=True, default=list, size=None),
        ),
        migrations.AddField(
            model_name='profile',
            name='time_per_week',
            field=models.CharField(blank=True, default=None, max_length=255, null=True, verbose_name='Time commitment per week '),
        ),
        migrations.AddField(
            model_name='profile',
            name='work_experience',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='work_types',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=250), blank=True, default=list, size=None, verbose_name='Work Type'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='work_type',
            field=models.CharField(blank=True, choices=[('part_time', 'Part-time'), ('full_time', 'Full-time'), ('remote', 'Remote'), ('one_time', 'One Time Project'), ('ongoing_project', 'Ongoing Project'), ('short_term_project', 'Short-term Project'), ('long_term_project', 'Long-term Project')], default=None, max_length=15, null=True, verbose_name='Work Type'),
        ),
    ]