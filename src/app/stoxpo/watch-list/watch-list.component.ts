import { Component, OnInit } from '@angular/core';
import { FundName } from '../models/fund-name';
import { WatchlisthandlerService } from '../services/watchlisthandler.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit {
  fundNames: FundName[] = [];

  constructor() {
  
    this.fundNames.push({ schemeCode: 0, schemeName: 'name00' });
    this.fundNames.push({ schemeCode: 1, schemeName: 'name01' });
    this.fundNames.push({ schemeCode: 2, schemeName: 'name02' });
  }

  ngOnInit(): void {

  }

}
