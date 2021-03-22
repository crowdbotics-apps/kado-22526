# Generated by Django 2.2.17 on 2021-03-02 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('job', '0006_auto_20210302_0811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='budget_type',
            field=models.CharField(blank=True, choices=[('fixed_price', 'Fixed Price'), ('per_hour', 'Per Hour'), ('negotiable', 'Negotiable')], default=None, max_length=150, null=True, verbose_name='Budget type'),
        ),
        migrations.AlterField(
            model_name='job',
            name='duration',
            field=models.CharField(blank=True, choices=[('less_than_two_weeks', 'Less than 2 weeks'), ('two_to_four_weeks', '2 to 4 weeks'), ('more_than_four_weeks', 'More than 4 weeks')], default=None, max_length=150, null=True, verbose_name='Duration'),
        ),
        migrations.AlterField(
            model_name='job',
            name='job_type',
            field=models.CharField(blank=True, choices=[('part_time', 'Part-time'), ('full_time', 'Full-time'), ('remote', 'Remote'), ('one_time', 'One-time Project'), ('ongoing_project', 'Ongoing Project')], default=None, max_length=150, null=True, verbose_name='Job type'),
        ),
        migrations.AlterField(
            model_name='job',
            name='time',
            field=models.CharField(blank=True, choices=[('less_than_10_hours', 'Less than 10 hours/week'), ('ten_to_twenty_hours', '10-20 hours/week'), ('more_than_four_weeks', 'More than 20 hours/week')], default=None, max_length=150, null=True, verbose_name='Time'),
        ),
    ]