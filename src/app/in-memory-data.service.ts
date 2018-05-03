import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const articles = [
      { id : 1,
        title : 'Qui est El ?',
        corpus : '',
        date : new Date("November 21, 2017") },
      { id : 2,
        title : 'El a emprunté un Reflex',
        corpus : '',
        date:new Date("February 4, 2018") },
      { id : 3,
        title : 'Un week-end avec El',
        corpus : '',
        date : new Date("March 15, 2018") },
      { id : 4,
        title : 'El a testé pour vous : Angular',
        corpus : 'C\'est super !',
        date : new Date(Date.now()) }
    ];
    return {articles};
  }
}
