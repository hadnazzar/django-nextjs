from rest_framework import status, generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q


from .serializers import UserLoginSerializer, UserRegistrationSerializer, ProductSerializer, UserLoginOrRegisterSerializer
from .models import Product


@api_view(['POST'])
def user_login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_login_or_register(request):
    serializer = UserLoginOrRegisterSerializer(data=request.data)
    
    if serializer.is_valid():
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def user_registration(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


@api_view(['GET'])
def product_search(request):
    query = request.query_params.get('query', '')  # getting the search query from request params

    # Using Q objects for lookups across multiple fields
    products = Product.objects.filter(Q(name__icontains=query) | Q(description__icontains=query)).order_by('id')
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)