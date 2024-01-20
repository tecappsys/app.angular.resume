
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';
import { EntityTotals } from '../shared/interface/entity-totals.interface';
import { Summary } from '../shared/interface/summary.interface';
import { Skill } from '../shared/interface/skill.interface';
import { SkillCategory } from '../shared/interface/skill-category.interface';
import { JobTitle } from '../shared/interface/job-title.interface';
@Injectable()
export class ResumeService {

  private API:string = environment.app_resume
  private URL_SUMMARY:string = `${this.API}/summary`
  private URL_SKILL:string = `${this.API}/skill`
  private URL_SKILL_CATEGORY:string = `${this.API}/skill_category`
  private URL_JOB_TITLES:string = `${this.API}/job_title`

  constructor(private http: HttpClient) { }

  public getSummaries() {
    return this.http.get(this.URL_SUMMARY) as Observable<EntityTotals<Summary>>;
  }

  public postSummaries(data:any) {
    return this.http.post(this.URL_SUMMARY,data) as Observable<any>;
  }

  public putSummaries(data:any) {
    return this.http.put(this.URL_SUMMARY,data) as Observable<any>;
  }

  public deleteSummaries(data:any) {
    return this.http.delete(this.URL_SUMMARY,{body:data}) as Observable<any>;
  }

  public getSkills() {
    return this.http.get(this.URL_SKILL) as Observable<EntityTotals<Skill>>;
  }

  public getSkillsCategory() {
    return this.http.get(this.URL_SKILL_CATEGORY) as Observable<EntityTotals<SkillCategory>>;
  }

  public getJobTitles() {
    return this.http.get(this.URL_JOB_TITLES) as Observable<EntityTotals<JobTitle>>;
  }

}