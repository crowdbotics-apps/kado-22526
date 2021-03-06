"""kado_22526 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from allauth.account.views import confirm_email
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from home.api.v1.viewsets import LoginViewToken, RegisterViewToken, ResetPasswordViewToken
from users.views import AdminAccountForgotPassword

urlpatterns = [
    path("", include("home.urls")),
    path('accounts/forgot-password/', AdminAccountForgotPassword.as_view(), name="account_forgot_password"),
    path("accounts/", include("allauth.urls")),

    path("admin/", admin.site.urls),
    path("users/", include("users.urls", namespace="users")),
    path('rest-auth/login/', csrf_exempt(LoginViewToken.as_view()), name='rest_login'),
    path('rest-auth/registration/', csrf_exempt(RegisterViewToken.as_view()), name='rest_register'),
    path('rest-auth/password/reset/', csrf_exempt(ResetPasswordViewToken.as_view()), name='rest_reset_password'),
    path("rest-auth/", include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path("rest-auth/registration/account-confirm-email/<str:key>/", confirm_email),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path("home/", include("home.urls")),
    path('chat/', include('chat_user.urls', )),
    path('api/v1/', include([
        path("", include("chat_user.api.v1.urls", namespace='chat')),
        path("", include("chat_profile.api.v1.urls")),
        path("", include("users.api.v1.urls")),
        path("", include("job.api.v1.urls")),
        path("", include("home.api.v1.urls")),
        path("", include("faq.api.v1.urls")),
    ])),

    path("profile/", include("chat_profile.urls")),

]

admin.site.site_header = "Kado"
admin.site.site_title = "Kado Admin Portal"
admin.site.index_title = "Kado Admin"

# swagger
api_info = openapi.Info(
    title="Kado API",
    default_version="v1",
    description="API documentation for Kado App",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

urlpatterns += [
    path("api-docs/", schema_view.with_ui("swagger", cache_timeout=0), name="api_docs")
]
