import { Skill } from "./skill.interface";

export interface SkillCategoryGroupBy<T>{
    skill:T;
    category:Skill[]
};