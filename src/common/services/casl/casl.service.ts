import { Injectable } from '@nestjs/common';
import { Action } from 'src/common/constants/constants';
import { CaslAbilityFactory } from 'src/common/factory/casl/casl-ability.factory';
import { Article } from 'src/common/model/article/article.model';
import { UserModel } from 'src/common/model/user/user.model';

@Injectable()
export class Service {
    constructor(private caslAbilityFactory: CaslAbilityFactory) {
        const user = new UserModel();
        user.isAdmin = false;
        const ability = this.caslAbilityFactory.createForUser(user);
        ability.can(Action.Read, Article);
        ability.can(Action.Delete, Article);
        ability.can(Action.Create, Article);
        const user1 = new UserModel();
        user1.id = 1;

        const article = new Article();
        article.authorId = user1.id;

        const ability1 = this.caslAbilityFactory.createForUser(user1);
        ability1.can(Action.Update, article); // true

        article.authorId = 2;
        ability1.can(Action.Update, article);
    }
    findAll() {
        return;
    }
}