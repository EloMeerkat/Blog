import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Article } from '../article';
import { ARTICLES } from '../mock-articles';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  articles: Article[];

  constructor(private articleService: ArticleService) { }

  getArticles(): void{
    this.articleService.getArticles()
        .subscribe(articles => this.articles = articles);
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
