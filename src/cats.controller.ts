import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  Put,
  Delete,
  Res,
  HttpStatus,
  /*
  HttpCode,
  Header,
  Redirect,
  */
} from '@nestjs/common'

import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto'
import { Response } from 'express'

@Controller('cats')
export class CatsController {
  @Post()
  /*
  Examples of decorators from documentation
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  */
  create(@Body() createCatDto: CreateCatDto): string {
    return 'This action adds a new cat'
  }

  @Get()
  findAll(@Query() query: ListAllEntities): string {
    return `This action returns all cats (limit ${query.limit} items)`
  }

  @Get(':id')
  findOne(@Param('id') id: any): string {
    return `This action returns a #${id} cat`
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`
  }

  /*
  // Examples of usage of library-specific approach
  @Post()
  createLibrarySpecific(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.CREATED).send()
  }

  @Get()
  findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() query: ListAllEntities,
  ) {
    res.status(HttpStatus.OK).json([])
  }
  */

  /*
  Another examples from documentation:
  @Get('ab*cd')
  findAllWithWildCard(): string {
    return 'This route uses a wildcard'
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302) // returned HttpRedirectResponse object overrides this decorator
  getDocs(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5' }
    }
  }
  */
}
