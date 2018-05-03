import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { Article } from '../article';
import { ArticleService } from '../article.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  articles: Article[];
  ARTICLES: Article[];

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private location: Location) { }

  getArticles(): void{
    const category = this.route.snapshot.paramMap.get('type');
    if(category){
      this.articleService.getArticles()
        .subscribe(articles => this.ARTICLES = articles);
      for(var i = 0; i<this.ARTICLES.length; i++) {
          if(this.ARTICLES[i].category == category){
            this.articles.push(this.ARTICLES[i]);
          }
      }
    }
    else{
      this.articleService.getArticles()
          .subscribe(articles => this.articles = articles);
    }
  }

  ngOnInit() {
    this.getArticles();
  }

  add(title: string): void{
    title = title.trim();
    if(!title){ return; }
    this.articleService.addArticle({ title, date: new Date(Date.now()) } as Article)
      .subscribe(article => {
        this.articles.push(article);
      });
  }

  delete(article: Article): void {
    this.articles = this.articles.filter(h => h !== article);
    this.articleService.deleteArticle(article).subscribe();
  }

}
