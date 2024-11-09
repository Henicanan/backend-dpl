import { SetMetadata } from '@nestjs/common';

export const Roles = (role: 'admin' | 'moderator' | 'student') => {
  return SetMetadata('role', role);
};
