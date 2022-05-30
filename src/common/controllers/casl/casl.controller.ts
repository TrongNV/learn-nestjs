import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Action } from 'src/common/constants/constants';
import { CheckPolicies } from 'src/common/decorator/casl.decorator';
import { PoliciesGuard } from 'src/common/guard/casl/roles.guard';
import { ReadArticlePolicyHandler } from 'src/common/policies/casl.policy';

@Controller('/casl')
export class CaslController {

    @Get()
    @UseGuards(PoliciesGuard)
    @CheckPolicies(new ReadArticlePolicyHandler())
    findAll() {
        return "";
    }
}
