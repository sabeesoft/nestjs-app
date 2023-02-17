import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @Get("/list")
  getAllHello(): string[] {
    return this.appService.getAllHello();
  }

  @Get("/test/:id")
  getTest(@Param('id') id: string): Promise<{ result: string }> {
    return this.appService.getTest(id);
  }

  @Post("/test")
  createTest() {
    return "Hello World!"
  }

  @Put("/test")
  updateTest() {

  }


  @Delete("/test")
  deleteTest() {

  }

}

