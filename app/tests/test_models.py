import datetime

from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models
from tests import create_new_user, create_new_project, create_new_activity, finish_activity


class ModelTests(TestCase):

    def setUp(self):
        self.user = create_new_user("user1")
        self.project = create_new_project(user=self.user)

    def test_project_str(self):
        """Test the api string representation"""
        project = self.project
        self.assertEqual(str(project), project.title)

    def test_tag_str(self):
        """Test the tag string representation"""
        tag = models.Tag.objects.create(
            name='Programming',
            user=self.user,
        )
        self.assertEqual(str(tag), tag.name)

    def test_project_duration(self):
        """Test the activity string representation"""
        activity1 = create_new_activity(project=self.project)
        activity2 = create_new_activity(project=self.project)
        finish_activity(activity1)
        finish_activity(activity2)
        self.assertEqual(self.project.total_duration, activity1.duration + activity2.duration)

    def test_activity_in_progress(self):
        activity1 = create_new_activity(project=self.project)
        self.assertEqual(self.project.in_progress, True)

    def test_no_activity_in_progress(self):
        activity1 = create_new_activity(project=self.project)
        finish_activity(activity1)
        self.assertEqual(self.project.in_progress, False)