import { CACHE_MANAGER, Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';

@Controller('/monitoring')
export class AppController {
  fakeString = 'my name is naveen';
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get(':id')
  async setGetSimpleString(@Param('id') id: string) {
    const value = await this.cacheManager.get(id);
    if (value) {
      console.log('Encontrou');
      return {
        data: value,
      };
    }
    await this.cacheManager.set(id, '{joao:"Joazin"}', { ttl: 300 });
    return {
      data: this.fakeString,
      loadsFrom: 'fake database',
    };
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
