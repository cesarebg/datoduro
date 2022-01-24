from django.db import models

# New imports added for ParentalKey, Orderable, InlinePanel, ImageChooserPanel

from modelcluster.fields import ParentalKey
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.search import index

# Create your models here.

class BlogIndexPage(Page):
    intro = RichTextField(blank=True)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        blogpages = BlogPage.objects.live().order_by('-first_published_at')
        paginator = Paginator(blogpages, 5)
        page = request.GET.get("page")

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)

        context['blogpages'] = posts
        return context

        content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

class CvIndexPage(Page):
    intro = RichTextField(blank=True)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        cvpages = CvPage.objects.live().order_by('-first_published_at')
        paginator = Paginator(cvpages, 10)
        page = request.GET.get("page")

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)

        context['cvpages'] = posts
        return context

        content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

class ExperienceIndexPage(Page):
    intro = RichTextField(blank=True)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        cvpages = CvPage.objects.live().order_by('-first_published_at')
        paginator = Paginator(cvpages, 10)
        page = request.GET.get("page")

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)

        context['cvpages'] = posts
        return context

        content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

class EducationIndexPage(Page):
    intro = RichTextField(blank=True)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        cvpages = CvPage.objects.live().order_by('-first_published_at')
        paginator = Paginator(cvpages, 10)
        page = request.GET.get("page")

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)

        context['cvpages'] = posts
        return context

        content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

class PortafolioIndexPage(Page):
    intro = RichTextField(blank=True)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        cvpages = CvPage.objects.live().order_by('-first_published_at')
        paginator = Paginator(cvpages, 10)
        page = request.GET.get("page")

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)

        context['cvpages'] = posts
        return context

        content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

class NewsIndexPage(Page):
    intro = RichTextField(blank=True)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        blogpages = BlogPage.objects.live().order_by('-first_published_at')
        paginator = Paginator(blogpages, 5)
        page = request.GET.get("page")

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)


        context['blogpages'] = posts
        return context

        content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

class OpinionIndexPage(Page):
    intro = RichTextField(blank=True)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        blogpages = BlogPage.objects.live().order_by('-first_published_at')
        paginator = Paginator(blogpages, 5)
        page = request.GET.get("page")

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)


        context['blogpages'] = posts
        return context

        content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

class DataIndexPage(Page):
    intro = RichTextField(blank=True)

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        blogpages = BlogPage.objects.live().order_by('-first_published_at')
        paginator = Paginator(blogpages, 5)
        page = request.GET.get("page")

        try:
            posts = paginator.page(page)
        except PageNotAnInteger:
            posts = paginator.page(1)
        except EmptyPage:
            posts = paginator.page(paginator.num_pages)


        context['blogpages'] = posts
        return context

        content_panels = Page.content_panels + [
        FieldPanel('intro', classname="full")
    ]

class BlogPage(Page):
    CATEGORIES = (
        ('News', 'News Post'),
        ('Data', 'Data Story'),
        ('Opinion', 'Opinion'),
        ('Fact', 'Fact check')
    )
    date = models.DateTimeField("Post date")
    intro = models.CharField(max_length=250)
    body = RichTextField(blank=True)
    category = models.CharField(max_length=7, choices=CATEGORIES, default="Blog")
    topic = models.CharField(max_length=20, null = True)
    paginate_by = 3

    def main_image(self):
        gallery_item = self.gallery_images.first()
        if gallery_item:
            return gallery_item.image
        else:
            return None

    def caption_image(self):
        gallery_item = self.gallery_images.first()
        if gallery_item:
            return gallery_item.caption
        else:
            return None

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('intro'),
        FieldPanel('body', classname="full"),
        FieldPanel('category'),
        FieldPanel('topic'),
        InlinePanel('gallery_images', label="Gallery images"),
    ]

class CvPage(Page):
    CATEGORIES = (
        ('Experience', 'Experience'),
        ('Education', 'Education'),
        ('Portafolio', 'Portafolio'),
        ('About me', 'About me')
    )
    date = models.DateTimeField("Post date")
    start = models.DateTimeField("Start")
    finish = models.DateTimeField("Finish")
    intro = models.CharField(max_length=250)
    body = RichTextField(blank=True)
    category = models.CharField(max_length=10, choices=CATEGORIES, default="Blog")
    topic = models.CharField(max_length=20, null = True)
    paginate_by = 3

    search_fields = Page.search_fields + [
        index.SearchField('intro'),
        index.SearchField('body'),
    ]

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('start'),
        FieldPanel('finish'),
        FieldPanel('intro'),
        FieldPanel('body', classname="full"),
        FieldPanel('category'),
        FieldPanel('topic'),
        # InlinePanel('gallery_images', label="Gallery images"),
    ]

class BlogPageGalleryImage(Orderable):
    page = ParentalKey(BlogPage, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.CASCADE, related_name='+'
    )
    caption = models.CharField(blank=True, max_length=250)

    panels = [
        ImageChooserPanel('image'),
        FieldPanel('caption'),
    ]
