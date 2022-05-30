import { Action } from "../constants/constants";
import { AppAbility } from "../factory/casl/casl-ability.factory";
import { Article } from "../model/article/article.model";

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;


export class ReadArticlePolicyHandler implements IPolicyHandler {
  handle(ability: AppAbility) {
    return ability.can(Action.Read, new Article);
  }
}