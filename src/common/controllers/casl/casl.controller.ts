import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Action } from 'src/common/constants/constants';
import { CheckPolicies } from 'src/common/decorator/casl.decorator';
import { PoliciesGuard } from 'src/common/guard/casl/roles.guard';
import { ReadArticlePolicyHandler } from 'src/common/policies/casl.policy';
import { CaslService } from 'src/common/services/casl/casl.service';

@ApiBearerAuth()
@ApiTags('casl')
@Controller('/casl')
export class CaslController {
    constructor(private caslservice: CaslService) {}
    @Get()
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new ReadArticlePolicyHandler())
    findAll() {
        return this.caslservice.findAll();
    }
}
