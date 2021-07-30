import { Controller, Get} from '@nestjs/common';
import { Public } from 'src/commons/guards/skip-auth.decorator';

@Controller()
export class AppController {
  @Public()
  @Get('/')
  async hello() {
    return {result :'hello!!!!za'}
  }

}
