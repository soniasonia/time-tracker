import datetime

from django.db import models
from django.conf import settings


class Tag(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    tags = models.ManyToManyField('Tag')

    def __str__(self):
        return self.title

    @property
    def total_duration(self):
        activities = self.activities.filter(end_time__isnull=False)
        if len(activities) > 0:
            return sum([a.duration for a in activities], datetime.timedelta())

    @property
    def in_progress(self):
        activities = self.activities.filter(end_time__isnull=True)
        if activities:
            return activities[0].id, activities[0].start_time,
        else:
            return False


class Activity(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True)
    # duration = models.DurationField(null=True)
    project = models.ForeignKey(
        'Project',
        on_delete=models.CASCADE,
        related_name="activities",
    )

    @property
    def duration(self):
        if self.end_time:
            return self.end_time - self.start_time
