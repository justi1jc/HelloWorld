from django.db import models

class User(models.Model):
    """
    Stores a single user.
    """
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    first_address = models.CharField(max_length=200)
    second_address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=2)
    zip = models.CharField(max_length=7)
    country = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Returns a string representation of this model."""
        return '{},{}'.format(self.first_name, self.last_name)