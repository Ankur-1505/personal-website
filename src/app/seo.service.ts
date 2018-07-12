import { Meta } from '@angular/platform-browser';
import { Injectable } from '@angular/core';

@Injectable()
export class SeoService {

  constructor(private meta : Meta) { }

  generateTags(config){
    config = {
      title : 'Website Project',
      description : 'Welcome!',
      image : 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/star-icon.png',
      slug : '',
      ...config
    }
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ name: 'og:type', content: 'article' });
    this.meta.updateTag({ name: 'og:site_name', content: 'Website' });
    this.meta.updateTag({ name: 'og:title', content: config.title });
    this.meta.updateTag({ name: 'og:description', content: config.description });
    this.meta.updateTag({ name: 'og:image', content: config.image });
  }

}
