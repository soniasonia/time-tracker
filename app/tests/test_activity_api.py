from django.test import TestCase
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.models import Activity
from api.serializers import ActivitySerializer

from tests import create_new_user, create_new_project, create_new_activity


class PrivateActivityNotAllowedTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_new_user("Seba")
        self.client.force_authenticate(self.user)

    def test_activity_list_not_allowed(self):
        """Test that retrieving list of activities is not allowed"""
        general_url = reverse('api:activity-list')
        res = self.client.get(general_url)
        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)


class PrivateActivityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_new_user("Seba")
        self.client.force_authenticate(self.user)
        self.project = create_new_project(user=self.user, title="Learn Python")

    def test_starting_activity(self):
        """Test that activity is started with start_time info but without end_time"""
        general_url = reverse('api:activity-list')
        res = self.client.post(general_url, {"project": self.project.id}, format='json')
        serializer = ActivitySerializer(Activity.objects.last())
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data, serializer.data)
        self.assertIsNotNone(res.data.get("start_time"))
        self.assertIsNone(res.data.get("end_time"))

    def test_finishing_activity(self):
        """Test that patch request finishes an activity and this activity has all information"""
        activity = create_new_activity(project=self.project)
        detail_url = reverse('api:activity-detail', args=[activity.id])
        res = self.client.patch(detail_url)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data["project"], self.project.id)
        self.assertIsNotNone(res.data.get("start_time"))
        self.assertIsNotNone(res.data.get("end_time"))
        self.assertIsNotNone(res.data.get("duration"))

    def test_cannot_has_multiple_activities(self):
        """Test that activity is started with start_time info"""
        general_url = reverse('api:activity-list')
        self.client.post(general_url, {"project": self.project.id}, format='json')
        res = self.client.post(general_url, {"project": self.project.id}, format='json')
        self.assertEqual(res.status_code, status.HTTP_412_PRECONDITION_FAILED)
