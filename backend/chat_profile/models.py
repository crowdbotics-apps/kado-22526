from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MaxValueValidator, MinValueValidator

from .enums import StudentEnum, CompanyEnum, WorkTypeEnum, AvailabilityDurationEnum, TimePerWeekRange
from .utils import validate_profile_search_params


class VerificationCode(models.Model):
    "Generated Model"
    code = models.CharField(
        max_length=255,
    )
    sent_to = models.ForeignKey(
        "chat_profile.Profile",
        on_delete=models.CASCADE,
        related_name="verificationcode_sent_to",
    )
    is_verified = models.BooleanField()
    timestamp_created = models.DateTimeField(
        auto_now_add=True,
    )
    timestamp_verified = models.DateTimeField()


"""
part time; full time; remote; one time project; ongoing project
"""
Work_types = (
    (WorkTypeEnum.part_time.name, WorkTypeEnum.part_time.value),
    (WorkTypeEnum.full_time.name, WorkTypeEnum.full_time.value),
    (WorkTypeEnum.remote.name, WorkTypeEnum.remote.value),
    (WorkTypeEnum.one_time.name, WorkTypeEnum.one_time.value),
    (WorkTypeEnum.ongoing_project.name, WorkTypeEnum.ongoing_project.value),
    (WorkTypeEnum.short_term_project.name, WorkTypeEnum.short_term_project.value),
    (WorkTypeEnum.long_term_project.name, WorkTypeEnum.long_term_project.value)
)

"""
 System profile types
    Profile type 1: Undergraduate Students “u/s”
    Profile type 2: Graduate Students “g/s”
    Profile type 3: International Students “i/s”
    Profile type 4: Companies “c”
    Profile type 5: Start-ups “s”

"""
Profile_types = (
    (StudentEnum.undergraduate.name, StudentEnum.undergraduate.value),
    (StudentEnum.graduate.name, StudentEnum.undergraduate.value),
    (StudentEnum.international.name, StudentEnum.international.value),
    (CompanyEnum.companies.name, CompanyEnum.companies.value),
    (CompanyEnum.start_up.name, CompanyEnum.start_up.value),
)

Time_Availability = (
    (AvailabilityDurationEnum.less_than_two_weeks.name, AvailabilityDurationEnum.less_than_two_weeks.value),
    (AvailabilityDurationEnum.two_to_four_weeks.name, AvailabilityDurationEnum.two_to_four_weeks.value),
    (AvailabilityDurationEnum.more_than_four_weeks.name, AvailabilityDurationEnum.more_than_four_weeks.value),
)

Time_per_week_range = (
    (TimePerWeekRange.less_than_10_hours.name, TimePerWeekRange.less_than_10_hours.value),
    (TimePerWeekRange.ten_to_twenty_hours.name, TimePerWeekRange.ten_to_twenty_hours.value),
    (TimePerWeekRange.more_than_20_hours.name, TimePerWeekRange.more_than_20_hours.value),
)


class Profile(models.Model):
    MALE = "Male"
    FEMALE = "Female"
    GENDER_CHOICES = (
        (MALE, MALE),
        (FEMALE, FEMALE)
    )
    user = models.OneToOneField(
        "users.User",
        on_delete=models.CASCADE,
        related_name="profile",
    )
    favorites = models.ManyToManyField('chat_profile.Profile', related_name='favorite_profiles', blank=True, )

    profile_type = models.CharField('Profile Type', choices=Profile_types, default=None, null=True, blank=True,
                                    max_length=15)
    bio = models.TextField(null=True, blank=True, )
    work_experience = models.TextField(null=True, blank=True, )
    mobile_number = models.CharField(
        max_length=20, null=True, blank=True,
    )
    pin = models.CharField(
        max_length=100,
        null=True, blank=True,
    )
    tagline = models.CharField(
        max_length=100,
        null=True, blank=True,
    )
    location = models.CharField('User Location', default=None, null=True, blank=True, max_length=255)
    company_name = models.CharField('Company', default=None, null=True, blank=True, max_length=255)
    photo = models.URLField(null=True, blank=True, )
    status = models.BooleanField(
       default=True, null=True, blank=True,
    )
    birthdate = models.DateField(null=True, blank=True, )
    gender = models.CharField('Select Gender', choices=GENDER_CHOICES, max_length=10, null=True, blank=True)
    university = models.CharField('Name of university ', default=None, null=True, blank=True, max_length=255)
    industry = models.CharField(default=None, null=True, blank=True, max_length=255)
    field_of_study = models.CharField('Field of study ', default=None, null=True, blank=True, max_length=255)
    skills = ArrayField(models.CharField(max_length=250), verbose_name='Relevant skills', blank=True, default=list)
    work_types = ArrayField(models.CharField(max_length=250), verbose_name='Work Type', blank=True, default=list)
    work_type = models.CharField('Work Type', choices=Work_types, default=None, null=True, blank=True,
                                 max_length=15)  # Todo: remove after migrations
    availability = models.CharField('Availability', default=None, null=True, blank=True, max_length=255)
    time_per_week = models.CharField('Time commitment per week ', default=None, null=True, blank=True, max_length=255)
    languages = ArrayField(models.CharField(max_length=250), blank=True, default=list)
    services = ArrayField(models.CharField(max_length=250), blank=True, default=list)
    years_of_experience = models.IntegerField(
        verbose_name='Years of experience',
        validators=[
            MaxValueValidator(60),
            MinValueValidator(0)
        ],
        blank=True,
        null=True,
        default=0
    )
    hours_per_week = models.IntegerField(
        verbose_name='Hours available per week',
        validators=[
            MaxValueValidator(168),
            MinValueValidator(0)
        ],
        blank=True,
        null=True,
        default=0
    )
    min_pay = models.IntegerField(
        verbose_name='Minimum pay',
        validators=[
            MinValueValidator(0)
        ],
        blank=True,
        null=True,
        default=0
    )
    max_pay = models.IntegerField(
        verbose_name='Maximum pay',
        validators=[
            MinValueValidator(0)
        ],
        blank=True,
        null=True,
        default=0
    )

    allowed_to_work = models.CharField(
        default='Yes',
        verbose_name='Allowed to work in US?',
        max_length=20,
    )

    timestamp_created = models.DateTimeField(
        auto_now_add=True,
    )
    last_updated = models.DateTimeField(
        auto_now=True,
    )
    last_login = models.DateTimeField(null=True, blank=True, )

    @classmethod
    def search(cls, search_query=None, **kwargs):
        params = validate_profile_search_params(kwargs.get('params', {}))

        queryset = cls.objects.all()
        if search_query:
            queryset = queryset.filter(
                models.Q(company_name__icontains=search_query) |
                models.Q(user__last_name__icontains=search_query) |
                models.Q(user__first_name__icontains=search_query) |
                models.Q(university__icontains=search_query)
            )
        return queryset.filter(**params)

    def fullname(self):
        """ Display either first name and last name or username """
        if any([self.user.first_name, self.user.last_name]):
            return f'{self.user.first_name} {self.user.last_name}'
        return f'{self.user.username}'

    def __str__(self):
        return f'{self.user}'


class Contact(models.Model):
    "Generated Model"
    added_by = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="contact_added_by",
    )
    added_profile = models.ForeignKey(
        "chat_profile.Profile",
        on_delete=models.CASCADE,
        related_name="contact_added_profile",
    )
    is_blocked = models.BooleanField()
    is_favorite = models.BooleanField()
    timestamp_created = models.DateTimeField(
        auto_now_add=True,
    )
