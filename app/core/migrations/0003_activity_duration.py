# Generated by Django 3.0.5 on 2020-05-20 15:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20200520_1524'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='duration',
            field=models.DurationField(null=True),
        ),
    ]
