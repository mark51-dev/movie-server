import { AdminGuard } from './admin.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  @Get('')
  getAllMovies() {
    return {
      user: 'good',
    };
  }
}
