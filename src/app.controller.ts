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
        data: JSON.parse(String(value)),
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
    console.log('data', data.registrationCode, data);
    await this.cacheManager.set(
      data.registrationCode,
      `${JSON.stringify(data)}`,
      {
        ttl: 300,
      },
    );

    const dataVant = {
      flyCode: data.flyCode,

      velocidade: data.velocidade,

      bateria: data.bateria,

      pesticida: data.pesticida,

      temperatura: data.temperatura,

      umidade: data.umidade,

      latitude: data.latitude,

      longitude: data.longitude,

      date: data.date,

      registrationCode: data.registrationCode,
    };

    const response = await this.httpService
      .post(`http://backend_vant:8081/vant/fly-data/002`, dataVant)
      .toPromise();
    console.log(response.data);
  }
}
