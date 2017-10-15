from django.forms import ModelForm, ValidationError
from .models import User

class UserForm(ModelForm):
    """ A ModelForm based upon register.models.User. """
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'first_address',
            'second_address',
            'city',
            'state',
            'zip',
            'country'
        ]

    def clean(self):
        cleaned_data = super(UserForm, self).clean()
        if 'zip' not in cleaned_data:
            raise ValidationError('Zip code is missing.')
        if len(cleaned_data['zip']) != 5 and len(cleaned_data['zip']) != 7:
            raise ValidationError('Zip code must be 5 or 7 digits in length.')
        if cleaned_data['zip'].isdigit() is False:
            raise ValidationError('Zip code must contain only digits 0-9.')
        if cleaned_data['country'] != 'US':
            raise ValidationError('Country must be US.')
        states = [
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI',
            'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI',
            'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
            'ND', 'OH', 'OK', 'OR', 'PA', 'PA', 'RI', 'SC', 'SD', 'TN', 'tX',
            'UT', 'VT', 'VA', 'WA', 'WV','WI', 'WY', 'GU', 'PR', 'VI'
        ]
        if cleaned_data['state'] not in states:
            raise ValidationError('Invalid state.')
        return cleaned_data