from django.contrib.auth import get_user_model
from rest_framework import serializers

from core.models import Tag, Project, Activity


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)


class ActivitySerializer(serializers.ModelSerializer):
    duration = serializers.ReadOnlyField()

    class Meta:
        model = Activity
        fields = ("id", "start_time", "end_time", "duration", "project")
        read_only_fields = ("id",)


class ProjectSerializer(serializers.ModelSerializer):
    tags = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Tag.objects.all()
    )
    total_duration = serializers.ReadOnlyField()
    in_progress = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = ("id", "title", "description", "total_duration", "tags", "in_progress")
        read_only_fields = ("id",)


class ProjectActivitiesListSerializer(ProjectSerializer):
    activities = ActivitySerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ("id", "title", "description", "total_duration", "tags", "in_progress", "activities")
        read_only_fields = ("id",)
