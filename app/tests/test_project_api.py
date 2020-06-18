from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

from core.models import Project
from api.serializers import ProjectSerializer, ProjectDetailSerializer
from tests import create_new_user, create_new_project, create_new_activity

PROJECTS_URL = reverse('api:project-list')


def detail_url(_id):
    return reverse('api:project-detail', args=[_id])



class PrivateProjectTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = create_new_user("user1")
        self.client.force_authenticate(self.user)

    def test_project_list(self):
        """Test retreving a list of projects"""
        create_new_project(user=self.user, title="Wash dishes")
        create_new_project(user=self.user, title="Learn Python")
        res = self.client.get(PROJECTS_URL)
        projects = Project.objects.all().order_by('-id')
        serializer = ProjectSerializer(projects, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_project_list_limited_to_user(self):
        """Test retreving a list of projects per user"""
        user2 = get_user_model().objects.create_user(
            'anotheruser',
            'testpass2'
        )
        create_new_project(user=self.user, title="Wash dishes")
        create_new_project(user=user2, title="Learn Python")
        res = self.client.get(PROJECTS_URL)
        projects = Project.objects.filter(user=self.user)
        serializer = ProjectSerializer(projects, many=True)

        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data, serializer.data)

    def test_project_detail(self):
        """Test viewing project details"""
        project = create_new_project(user=self.user, title="Learn Python")
        project.activities.add(create_new_activity(project=project))
        project.activities.add(create_new_activity(project=project))
        url = detail_url(project.id)
        res = self.client.get(url)
        serializer = ProjectDetailSerializer(project)
        self.assertEqual(res.data, serializer.data)

    def test_creating_project(self):
        res = self.client.post(PROJECTS_URL, {"title": "Seba", "tags": []}, format='json')
        serializer = ProjectSerializer(Project.objects.last())
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data, serializer.data)

