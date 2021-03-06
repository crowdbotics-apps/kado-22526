# Generated by Django 2.2.17 on 2021-01-13 02:12

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('chat_profile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Thread',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='ThreadMember',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unread', models.BooleanField()),
                ('deleted', models.BooleanField()),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thread_member', to='chat_profile.Profile')),
                ('thread', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='thread_member', to='chat_user.Thread')),
            ],
        ),
        migrations.AddField(
            model_name='thread',
            name='profiles',
            field=models.ManyToManyField(through='chat_user.ThreadMember', to='chat_profile.Profile'),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sent_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('content', models.TextField()),
                ('attachment', models.URLField(blank=True, null=True)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_messages', to='chat_profile.Profile')),
                ('thread', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='chat_user.Thread')),
            ],
            options={
                'ordering': ('sent_at',),
            },
        ),
    ]
