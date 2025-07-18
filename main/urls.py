from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.home_page_view, name='home_page'),
    path('robots.txt', views.robots_txt_view, name='robots_txt'),
    path('sitemap.xml', views.sitemap_xml_view, name='sitemap_xml'),
]