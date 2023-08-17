from django.core.management.base import BaseCommand

from app.models import Product


class Command(BaseCommand):
    help = 'Seeds products into the database.'

    def handle(self, *args, **kwargs):
        # List of sample products
        products = [
            {
                'name': 'Product A',
                'description': 'Description for Product A',
                'price': 10.50,
                'stock': 100,
                'selected': False
            },
            {
                'name': 'Product B',
                'description': 'Description for Product B',
                'price': 20.75,
                'stock': 50,
                'selected': False
            },
            {
                'name': 'Product C',
                'description': 'Description for Product C',
                'price': 30.75,
                'stock': 50,
                'selected': False
            },
            {
                'name': 'Product D',
                'description': 'Description for Product D',
                'price': 10.75,
                'stock': 10,
                'selected': False
            },
            {
                'name': 'test E',
                'description': 'test for Product E',
                'price': 10.75,
                'stock': 10,
                'selected': False
            },
        ]

        for product_data in products:
            # Check if product with the same name already exists
            product_exists = Product.objects.filter(name=product_data['name']).exists()

            if not product_exists:
                product = Product(**product_data)
                product.save()
                self.stdout.write(self.style.SUCCESS(f'Added product "{product_data["name"]}" to the database.'))
            else:
                self.stdout.write(self.style.WARNING(f'Product "{product_data["name"]}" already exists!'))