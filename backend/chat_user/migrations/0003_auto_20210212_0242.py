# Generated by Django 2.2.17 on 2021-02-12 02:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat_user', '0002_populate_messages'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ('-sent_at',)},
        ),
        migrations.AlterField(
            model_name='message',
            name='content',
            field=models.TextField(blank=True, null=True),
        ),
    ]
