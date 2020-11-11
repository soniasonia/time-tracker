import datetime
from core.models import Project, Activity
from django.contrib.auth import get_user_model


def create_new_user(username):
    return get_user_model().objects.create_user(
        username,
        'testpass'
    )


def create_new_project(user, title="foobar"):
    return Project.objects.create(
        title=title,
        user=user
    )


def create_new_activity(project):
    return Activity.objects.create(
        start_time=datetime.datetime.now(),
        project=project
    )


def finish_activity(activity):
    activity.end_time = datetime.datetime.now()
    activity.save()
    return activity
