from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    token = serializers.CharField(allow_blank=True, read_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            data["token"] = str(refresh.access_token)
            return (
                {
                "username": user.username,
                "token": data["token"],
                }
            )
        raise serializers.ValidationError("Incorrect Credentials.")


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return (
            {
                "username": user.username,
            }
        )


class UserLoginOrRegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=False)  # Optional if you're only providing it during registration
    token = serializers.CharField(allow_blank=True, read_only=True)

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        
        # If user doesn't exist, create the user
        if not user:

            user = User.objects.create_user(
                username=data['username'],
                password=data['password']
            )

        # If user exists or after registration, generate the token
        if user:
            refresh = RefreshToken.for_user(user)
            data["token"] = str(refresh.access_token)
            ## remove password from response
            return (
                {
                    "username": user.username,
                    "token": data["token"],
                }
            )

        raise serializers.ValidationError("Error occurred during authentication.")


from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'