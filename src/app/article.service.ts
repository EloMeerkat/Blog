import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Article } from './article'
import { MessageService } from './message.service'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': 'my-auth-token' })
};

@Injectable()
export class ArticleService {

  private articleUrl = 'api/articles';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getArticles(): Observable<Article[]> {
    this.messageService.add('ArticleService: fetched articles');
    return this.http.get<Article[]>(this.articleUrl)
      .pipe(
        tap(articles => this.log(`fetched articles`)),
        catchError(this.handleError('getArticles', []))
      );
  }

  getArticles_ctgr(category : string): Observable<Article[]> {
    const url = `${this.articleUrl}/?category=${category}+`;
    return this.http.get<Article[]>(url).pipe(
        tap(articles => this.log(`fetched articles category=${category}`)),
        catchError(this.handleError<Article[]>(`getArticles_ctgr category=${category}`, []))
      );
  }
  getArticle(id: number): Observable<Article> {
    const url = `${this.articleUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      tap(_=> this.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    )
  }

  private log(message: string) {
    this.messageService.add('ArticleService: ' + message);
  }

  updateArticle (article: Article): Observable<any>{
    return this.http.put(this.articleUrl, article, httpOptions).pipe(
      tap(_ => this.log(`update article id=${article.id}`)),
      catchError(this.handleError<any>(`updateArticle`))
    )
  }

  addArticle(article: Article): Observable<Article>{
    return this.http.post<Article>(this.articleUrl, article,
    httpOptions).pipe(
      tap((article: Article) => this.log(`added article w/ id=${article.id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }

  deleteArticle (article: Article | number): Observable<Article>{
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.articleUrl}/${id}`;

    return this.http.delete<Article>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted article id=${id}`)),
      catchError(this.handleError<Article>('deleteArticle'))
    );
  }

  searchArticles(term: string): Observable<Article[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Article[]>(`api/articles/?title=${term}`).pipe(
      tap(_ => this.log(`found articles matching "${term}"`)),
      catchError(this.handleError<Article[]>('searchArticles', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
