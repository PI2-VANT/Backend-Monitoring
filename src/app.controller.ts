import { CACHE_MANAGER, Controller, Get, Inject, Param } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('/monitoring')
export class AppController {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get(':id')
  async setGetSimpleString(@Param('id') id: string) {
    const value = await this.cacheManager.get(id);
    if (value) {
      return {
        data: value,
        status: '200',
      };
    }
    await this.cacheManager.set(id, '', { ttl: 300 });
    return {
      data: null,
      status: '404',
    };
  }

  @EventPattern()
  public async getNotification(data: any) {
    console.log('data', data.id, data.voo);
    await this.cacheManager.set(data.id, `[${data.voo}]`, { ttl: 300 });
    const dataVant = { flyId: data.flyId, data: data.voo };
    this.httpService.post(
      `http://localhost:8081/flayData/${data.id}`,
      dataVant,
    );
  }
}
