import { applyDecorators, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Auth } from './auth.decorator';

export const GenericController = (name: string, secured = true) => {
  const decsToApply = [ApiTags(name), Controller(name)];

  if (secured) {
    decsToApply.push(Auth());
  }

  return applyDecorators(...decsToApply);
};
