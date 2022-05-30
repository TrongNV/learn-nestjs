import { Module } from '@nestjs/common';
import { CaslController } from 'src/common/controllers/casl/casl.controller';
import { CaslAbilityFactory } from 'src/common/factory/casl/casl-ability.factory';

@Module({
    controllers: [CaslController],
    providers: [CaslAbilityFactory],
    exports: [CaslAbilityFactory],
})
export class CaslModule { }