from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Seeds users into the database.'

    def handle(self, *args, **kwargs):
        # Check if user already exists
        user_exists = User.objects.filter(username='testuser').exists()

        if not user_exists:
            user = User(username='testuser', email='testuser@mail.com')
            user.set_password('Qwerty12345!')
            user.save()
        else:
            self.stdout.write(self.style.WARNING('User "testuser" already exists!'))

            from django.core.management.base import BaseCommand