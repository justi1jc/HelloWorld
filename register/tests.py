from django.test import TestCase, RequestFactory
from django.urls import reverse
from . import views

class RegisterViewTestClass(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_empty_post(self):
        """
        Test that posting empty data fails with status code 400.
        """
        data = {}
        request = self.factory.post(reverse('register'), data)
        response = views.index(request)
        self.assertEqual(response.status_code, 400)

    def test_valid_post(self):
        """
        Test that posting valid data returns with status code 302, found.
        """
        data = {
            'first_name' : 'John',
            'last_name' : 'Smith',
            'first_address' : '1234 Pillgrims ave',
            'second_address': '',
            'city' : 'Jamestown',
            'state' : 'VA',
            'zip' : '23081',
            'country' : 'US'
        }
        request = self.factory.post(reverse('register'), data)
        response = views.index(request)
        self.assertEqual(response.status_code, 302)
