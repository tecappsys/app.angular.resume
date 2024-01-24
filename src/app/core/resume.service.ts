
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
  private profesionalSummary:string = `I am a Senior Front-End Developer at Knowmad mood, a web development company that specializes in creating user-friendly and responsive websites. My core competencies include web accessibility, data integration, code quality, and performance optimization.
  In my current role, I participate in new technologies and front-end architecture discussions to recommend system changes and enhancements. I employ best practices in software development to complete high-quality applications in line with scheduled targets. I integrate advanced technologies and tools to improve software performance. I also collaborate with back-end developers and other stakeholders to drive seamless integration of front-end and back-end components. Some of the skills that I use and develop in my projects are React, Angular, Ionic, Handlebars.js, Contentfull, and Tailwind CSS. I am creating web applications that are user-friendly, accessible, and responsive. I value teamwork, innovation, and customer satisfaction. I bring diverse perspectives and experiences to the team, as I have worked in different domains and industries, such as Expand Omnichannel and TINET S.A.
  `

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

  public getCabecera(){
    return `
    
    <p style="line-height:108%; border-bottom:0.5pt solid #000000;"><span>${this.formatTagSpan('Daniel Diaz')}</span></p>
    ${this.formatTagSpan('Mississauga, ON')}
    ${this.formatTagSpan('6477211540')}
    ${this.formatTagSpan('danieldiaz@tecappsys.com')}
    ${this.formatTagSpan(`Porfolios: <a href="https://tecappsys.com/">WebSite</a> | <a href="https://github.com/Tecappsys">Github</a> | <a href="https://www.linkedin.com/in/isaac-desousa/">Linkedin</a>`)}
    <br>
    <br>
    
    <p style="line-height:108%; border-bottom:0.5pt solid #000000;"><span>${this.formatTagSpan('Professional Summary')}</span></p>
    ${this.formatTagSpan(`${this.profesionalSummary}`)}
    <br>
    <br>
    
    <p style="line-height:108%; border-bottom:0.5pt solid #000000;"><span>${this.formatTagSpan('Work Experience')}</span></p>
    `
  }

  public getFooter(){
    return `
      <p style="line-height:108%; border-bottom:0.5pt solid #000000;"><span>${this.formatTagSpan('Certifications')}</span></p>
      ${this.certifications()}
      <br>
      <br>
      <p style="line-height:108%; border-bottom:0.5pt solid #000000;"><span>${this.formatTagSpan('Education')}</span></p>    
      ${this.formatTagSpan('Bachelor of Science : Software Systems Engineering')}
      ${this.formatTagSpan('<a href="http://www.unefa.edu.ve/portal/">UNEFA</a> - Venezuela')}   
      ${this.formatTagSpan('2016/03 - Unfinished 6 of to terms')}
      <br>
      <br>
      ${this.formatTagSpan('Computer Technology')}
      ${this.formatTagSpan('<a href="https://udelar.edu.uy/">UDELAR</a> - Uruguay')}      
      ${this.formatTagSpan('2022/01 - Unfinished 3 of 6 terms')}
    `
  }

  private certifications(){
    return `
      ${this.formatTagAHref('Next','https://www.udemy.com/certificate/UC-7da6dec3-62a3-4c3a-aa86-650866b620f6/')}
      ${this.formatTagAHref('Rxjs','https://www.udemy.com/certificate/UC-e46315c6-745f-4f6e-92de-1262a1565b1e/')}
      ${this.formatTagAHref('Basic Elements of Design: Design Principles and Software Overview','https://www.coursera.org/account/accomplishments/verify/AJSJH96FFVZK')}
      ${this.formatTagAHref('Graphic Elements of Design: Color Theory and Image Formats','https://coursera.org/share/dd1fdeee064a91351254c925e887a442')}
      ${this.formatTagAHref('Search Engine Optimization (SEO)Search Engine Optimization (SEO)','https://www.coursera.org/account/accomplishments/specialization/X8P3QT643YKZ')}
      ${this.formatTagAHref('Software Development Processes and Methodologies','https://coursera.org/share/6afc3cf3d89d9e449e462697c0a1377f')}
      ${this.formatTagAHref('Socket-IO','https://www.udemy.com/certificate/UC-7c15e873-5310-4661-86b8-cfea0fcdcab0/')}
      ${this.formatTagAHref('Progressive web app','https://www.udemy.com/certificate/UC-dc644da4-76bd-4e71-8494-4b8de4da635c/')}
      ${this.formatTagAHref('Node','https://www.udemy.com/certificate/UC-370026e7-9b13-46ae-bf40-275ed9259738/')}
      ${this.formatTagAHref('React','https://www.udemy.com/certificate/UC-ddb9049a-d779-49fc-b33d-0bb2d309b1f1/')}
      ${this.formatTagAHref('Angular','https://www.udemy.com/certificate/UC-44044361-c1de-4167-8807-142ec66d6a8b/')}
      ${this.formatTagAHref('Ionic','https://www.udemy.com/certificate/UC-9ce5659e-841f-4fb3-9a07-dcc5e08c3a1b/')}
    `
  }

  private formatTagAHref(text:string,url:string){
    return `${this.openAHref(url)}${text}</span></a><br>`
  }

  private openAHref(url:string){
    return `<a href="${url}"><span style="font-family: Arial; font-size:13px;font-weight: normal;">`
  }

  private formatTagSpan(text:string){
    return `${this.openSpan()}${text}</span><br>`
  }

  private openSpan(){
    return '<span style="font-family: Arial; font-size:13px;font-weight: normal;">'
  }



}