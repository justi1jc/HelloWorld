from django.test import TestCase, Client
from django.urls import reverse

class ReportViewTestClass(TestCase):
    def setUp(self):
        self.client = Client()

    def test_users_in_context(self):
        """
        Test that index supplies users in the context.
        """
        response = self.client.get(reverse('report'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.context is not None)
        self.assertTrue(response.context.has_key('users'))