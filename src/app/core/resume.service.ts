
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { Summaries } from '../shared/interface/summaries.interface';
@Injectable()
export class ResumeService {

  private API:string = environment.app_resume

  constructor(private http: HttpClient) { }

  public getSummaries() {
    const uri = `${this.API}/summary`;
    return this.http.get(uri) as Observable<Summaries>;
  }

  public postSummaries(data:any) {
    const uri = `${this.API}/summary`;
    return this.http.post(uri,data) as Observable<Summaries>;
  }

}