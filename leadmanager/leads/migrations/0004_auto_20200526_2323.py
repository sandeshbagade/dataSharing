# Generated by Django 3.0.5 on 2020-05-26 23:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0003_auto_20200526_2319'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lead',
            name='eeg',
            field=models.FileField(blank=True, upload_to='eeg_data_files/'),
        ),
    ]
