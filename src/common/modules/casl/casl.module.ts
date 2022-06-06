import { Module } from '@nestjs/common';
import { CaslController } from 'src/common/controllers/casl/casl.controller';
import { CaslAbilityFactory } from 'src/common/factory/casl/casl-ability.factory';
import { CaslService } from 'src/common/services/casl/casl.service';

@Module({
    controllers: [CaslController],
    providers: [CaslAbilityFactory, CaslService],
    exports: [CaslAbilityFactory],
})
export class CaslModule { }