export class Dialog<T>{
    title:string;
    content:T;
    public constructor(content:T,title?:string){
        this.title=title ? title :  '';
        this.content=content;
    }
}