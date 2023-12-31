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
  DefaultValuePipe,
  UseInterceptors,
  Inject,
  /*
  ValidationPipe,
  UsePipes,
  UseGuards,
  ParseIntPipe,
  HttpException,
  UseFilters,
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
  /*ListAllEntities,*/
} from './dto/create-cat.dto'

import { CatsService } from './cats.service'
import { ParseIntPipe } from 'src/pipes/parse-int.pipe'
import { Roles } from 'src/decorators/roles.decorators'
import { CacheInterceptor } from 'src/interceptors/cache.interceptor'
import { User } from 'src/decorators/user.decorator'
import { connectionToken } from 'src/utils/constants'
// import { Response } from 'express'
// import { ICat } from './interfaces/cat.interface'
// import { ForbiddenException } from 'src/exceptions/forbidden.exception'
// import { HttpExceptionFilter } from 'src/exceptionFilters/http-exception.filter'
// import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe'
// import { createCatSchema } from './validationSchemas'
// import { ValidationPipe } from 'src/validation.pipe'
// import { RolesGuard } from 'src/guards/role.guard'
// import { LoggingInterceptor } from 'src/interceptors/logging.interceptor'

// import { Auth } from 'src/decorators/auth.decorator'

// @UseGuards(/*new RolesGuard()*/ RolesGuard) // Guards Usage Example - Controller level
// @UseFilters(HttpExceptionFilter) // Exception Filters Usage Example - Controller level
// @UseInterceptors(/*new LoggingInterceptor()*/ LoggingInterceptor) // Interceptors Usage Example - Controller level
@Controller('cats' /*{ host: 'localhost2', path: '' }*/)
export class CatsController {
  constructor(
    private catsService: CatsService,
    @Inject(connectionToken) private connection: any,
  ) {}

  @Post()
  /*
  Examples of decorators from documentation
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  */
  // @UseFilters(HttpExceptionFilter) // Exception Filters Usage Example - Method level
  // @UsePipes(new ZodValidationPipe(createCatSchema)) // Pipes Usage Example - Method level
  // @UsePipes(ValidationPipe) // Pipes Usage Example - Method level
  @Roles(['admin'])
  async create(
    @Body(/*new ValidationPipe() OR Validation Pipe*/) // Pipes Usage Example - Parameter level
    createCatDto: CreateCatDto,
  ) {
    // throw new ForbiddenException() // Throwing custom exception example
    this.catsService.create(createCatDto)
  }

  // @UseGuards(RolesGuard)
  @Get()
  // @Auth('admin') // Composed Decorator Example - Method level
  async findAll(
    @Query('limit', new DefaultValuePipe('60'), ParseIntPipe) limit: number,
  ) /*: Promise<ICat[]>*/ {
    const allCats = this.catsService.findAll()
    return allCats
    try {
      await this.catsService.findAll() // example of handling async operations
      throw new Error('Random Cause') // example of handling generic errors
    } catch (error) {
      // throw new ForbiddenException() // Throwing custom exception example
      // throw { message: 'test123', statusCode: 404 } // Throwing object, that fullfills type requirements
      throw new BadRequestException('Something bad happened', {
        // Throwing error imported from @nestjs/common - 1st way
        cause: new Error(),
        description: 'Some error description',
      })
      /*throw new HttpException(  // Throwing error imported from @nestjs/common - 2nd way
        { error: 'This is custom message', status: HttpStatus.FORBIDDEN },
        HttpStatus.FORBIDDEN,
        { cause: error },
      )*/
    }
  }

  @Get(':id')
  // @UseInterceptors(CacheInterceptor)
  findOne(
    @Param(
      'id',
      // Example of using pipe with parameter decorator
      /*ParseIntPipe OR new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      })*/
      ParseIntPipe,
    )
    id: number,
  ): string {
    // examples, what might be returned: value (complex one too - i.e. Array), observable, promise
    /* return 5 */
    /* return [1, 2, 3] as any[] */
    /* return of(10, 20) */
    /*
    const promise = new Promise((res, rej) => {
      res('XD')
    })

    return promise
    */
    const connectionInfo = this.connection
    return `This action returns a #${id} cat - ${connectionInfo}`
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
    @User('name' /*, new ValidationPipe({ validateCustomDecorators: true })*/) // it's ValidationPipe from nestjs/common // Example of using pipe with custom parameter decorator
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
