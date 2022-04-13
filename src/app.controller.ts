import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';
import { editFileName, generatePath, imageFileFilter } from './utils/file-uploading.utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hash/:text')
  getHash(@Param() param: any){
    return this.appService.getHash(param.text);
  }

  @Post('hash')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: generatePath,
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    return this.appService.getFileHash(file.destination);
  }
}
