from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from tests import create_new_user, create_new_project


class UnauthorizedTest(TestCase):
    def setUp(self):
        # Setup project/activity/tags/project_details GET urls
        user = create_new_user("unauthorized_test@example.com")
        project = create_new_project(user)

        self.get_urls = [
            reverse('api:project-list'),
            reverse('api:project-detail', args=[project.id]),
            reverse('api:activity-list'),
            reverse('api:tag-list')
        ]

        # Setup project/activity/tags POST urls with data
        self.post_test_table = [
            {"url": reverse('api:project-list'), "data": {"title": "Project 1"}},
            {"url": reverse('api:activity-list'), "data": {"project": project}},
            {"url": reverse('api:tag-list'), "data": {"name": "Tag 1"}},
        ]

        self.client = APIClient()

    def test_auth_required(self):
        """Test that authentication is required"""
        for url in self.get_urls:
            res = self.client.get(url)
            self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

        for test_scenario in self.post_test_table:
            res = self.client.post(test_scenario.get("url"), test_scenario.get("data"))
            self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
