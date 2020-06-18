from rest_framework import generics, authentication, permissions
from rest_framework import viewsets, mixins, views, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api import serializers
from core.models import Tag, Project, Activity
import datetime


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = serializers.UserSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = serializers.UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """Retrieve and return authenticated user"""
        return self.request.user


class LogoutView(views.APIView):
    authentication_classes = (authentication.TokenAuthentication,)

    def get(self, request):
        try:
            request.user.auth_token.delete()
            return Response({}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class TagViewSet(viewsets.GenericViewSet,
                            mixins.ListModelMixin,
                            mixins.CreateModelMixin):
    """Manage tags in the database"""
    queryset = Tag.objects.all()
    serializer_class = serializers.TagSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-name')

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save(user=self.request.user)
        # Have to override save behavior because
        # tag belongs to authenticated user
        # authentication class takes care of getting the authenticated user
        # and assigning it to request so we can get self.request.user


class ProjectViewSet(viewsets.ModelViewSet):
    """Manage projects in the DB"""
    queryset = Project.objects.all()
    serializer_class = serializers.ProjectSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Retrieve the projects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.ProjectDetailSerializer
        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new object"""
        serializer.save(user=self.request.user)


class ActivityViewSet(viewsets.GenericViewSet,
                            mixins.CreateModelMixin,
                            mixins.UpdateModelMixin):
    queryset = Activity.objects.all()
    serializer_class = serializers.ActivitySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        request.data['start_time'] = datetime.datetime.now()
        project = Project.objects.get(id=request.data["project"])
        if project.in_progress:
            return Response("This project already has activity in progress",
                            status=status.HTTP_412_PRECONDITION_FAILED)
        return super().create(request)

    def partial_update(self, request, *args, **kwargs):
        request.data['end_time'] = datetime.datetime.now()
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
