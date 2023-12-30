import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  Put,
  Delete,
  BadRequestException,
  HttpException,
  HttpStatus,
  UseFilters,
  DefaultValuePipe,
  // ParseIntPipe,
  UsePipes,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  /*
  Res,
  HttpStatus,
  HttpCode,
  Header,
  Redirect,
  */
} from '@nestjs/common'

import {
  CreateCatDto,
  UpdateCatDto,
  ListAllEntities,
} from './dto/create-cat.dto'
// import { Response } from 'express'

import { CatsService } from './cats.service'
import { Cat } from './interfaces/cat.interface'
import { ForbiddenException } from 'src/exceptions/forbidden.exception'
import { HttpExceptionFilter } from 'src/exceptionFilters/http-exception.filter'
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe'
import { createCatSchema } from './validationSchemas'
// import { ValidationPipe } from 'src/validation.pipe'
import { ParseIntPipe } from 'src/pipes/parse-int.pipe'
import { RolesGuard } from 'src/guards/role.guard'
import { Roles } from 'src/decorators/roles.decorators'
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor'
import { CacheInterceptor } from 'src/interceptors/cache.interceptor'
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor'
import { User } from 'src/decorators/user.decorator'
import { Auth } from 'src/decorators/auth.decorator'

// @UseGuards(/*new RolesGuard()*/ RolesGuard)
// @UseFilters(HttpExceptionFilter)
// @UseInterceptors(/*new LoggingInterceptor()*/ LoggingInterceptor)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  /*
  Examples of decorators from documentation
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  */
  // @UseFilters(HttpExceptionFilter)
  // @UsePipes(new ZodValidationPipe(createCatSchema))
  // @UsePipes(ValidationPipe)
  @Roles(['admin'])
  async create(
    @Body(/*new ValidationPipe() OR Validation Pipe*/)
    createCatDto: CreateCatDto,
  ) {
    // throw new ForbiddenException()
    this.catsService.create(createCatDto)
  }

  // @UseGuards(RolesGuard)
  @Get()
  // @Auth('admin')
  async findAll(
    @Query('limit', new DefaultValuePipe('60'), ParseIntPipe) limit: number,
  ) /*: Promise<Cat[]>*/ {
    const allCats = this.catsService.findAll()
    return allCats
    try {
      await this.catsService.findAll()
      throw new Error('Random Cause')
    } catch (error) {
      // throw new ForbiddenException()
      // throw { message: 'test123', statusCode: 404 }
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      })
      /*throw new HttpException(
        { error: 'This is custom message', status: HttpStatus.FORBIDDEN },
        HttpStatus.FORBIDDEN,
        { cause: error },
      )*/
    }
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  findOne(
    @Param(
      'id',
      /*ParseIntPipe OR new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      })*/
      ParseIntPipe,
    )
    id: number,
  ): string {
    return `This action returns a #${id} cat`
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    async function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    }
    await delay(6000)
    return `This action updates a #${id} cat`
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @User('name' /*, new ValidationPipe({ validateCustomDecorators: true })*/) // it's ValidationPipe from nestjs/common
    username: string,
  ) {
    return `This action removes a #${id} cat - by ${username}`
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
