from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import render_to_string
from .models import (
    CompanyProfile, OrbibolInfo, Feature, GameType, Product, GalleryItem,
    BackgroundSettings, Section, CarouselSlide, SEOSettings
)

def home_page_view(request):
    company_profile = CompanyProfile.objects.first()
    seo_settings = SEOSettings.objects.first()

    if company_profile:
        orbibol_info = getattr(company_profile, 'orbibol_info', None)
        features = company_profile.features.all()
        game_types = company_profile.game_types.all()
        products = company_profile.products.all()
        gallery_items = company_profile.gallery_items.all()
        carousel_slides = company_profile.carousel_slides.all()
    else:
        orbibol_info, features, game_types, products, gallery_items, carousel_slides = None, [], [], [], [], []

    background_settings = BackgroundSettings.objects.prefetch_related('background_objects').first()
    sections = Section.objects.filter(is_active=True).order_by('order')

    context = {
        'company_profile': company_profile,
        'seo_settings': seo_settings,
        'orbibol_info': orbibol_info,
        'features': features,
        'game_types': game_types,
        'products': products,
        'gallery_items': gallery_items,
        'background_settings': background_settings,
        'sections': sections,
        'carousel_slides': carousel_slides,
    }
    return render(request, 'main/home_page.html', context)

def robots_txt_view(request):
    lines = [
        "User-Agent: *",
        "Disallow: /admin/",
        f"Sitemap: {request.build_absolute_uri('/sitemap.xml')}"
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

def sitemap_xml_view(request):
    context = { 'url': request.build_absolute_uri('/') }
    return HttpResponse(render_to_string('sitemap.xml', context), content_type='application/xml')

# === ИЗМЕНЕНИЯ ЗДЕСЬ ===
def custom_handler404(request, exception):
    context = {
        'company_profile': CompanyProfile.objects.first(),
        'background_settings': BackgroundSettings.objects.prefetch_related('background_objects').first(),
        'seo_settings': SEOSettings.objects.first(), # <-- ДОБАВЛЕНО
    }
    return render(request, "404.html", context, status=404)

def custom_handler500(request):
    context = {
        'company_profile': CompanyProfile.objects.first(),
        'background_settings': BackgroundSettings.objects.prefetch_related('background_objects').first(),
        'seo_settings': SEOSettings.objects.first(), # <-- ДОБАВЛЕНО
    }
    return render(request, "500.html", context, status=500)