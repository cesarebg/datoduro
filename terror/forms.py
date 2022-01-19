from django import forms

LOCATIONS_CHOICES = (
        ('Western Europe'),
        ('United States'),
        ('Middle East & North Africa'),
        ('South Asia'),
    )
class locationselect(forms.Form):
    country = forms.ChoiceField(choices=LOCATIONS_CHOICES)
