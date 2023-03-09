import { AuthUser } from '@app/core/decorators/auth-user.decorator';
import { GenericController } from '@app/core/decorators/generic-controller.decorator';
import { UUIDParam } from '@app/core/decorators/uuid-param.decorator';
import { Body, Delete, Get, Post, Put } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { User } from 'src/entities/user.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@GenericController('books', true)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  public async create(
    @Body() dto: CreateBookDto,
    @AuthUser<User>() user: User,
  ): Promise<Partial<Book>> {
    return await this.bookService.create(dto, user);
  }

  @Get()
  public async list(@AuthUser<User>('id') userId: number): Promise<Book[]> {
    return await this.bookService.list(userId);
  }

  @Get(':idx')
  public async read(
    @UUIDParam('idx') idx: string,
    @AuthUser<User>() user: User,
  ): Promise<Book> {
    return await this.bookService.read(idx, user);
  }

  @Put(':idx')
  public async update(
    @UUIDParam('idx') idx: string,
    @Body() dto: UpdateBookDto,
    @AuthUser<User>() user: User,
  ): Promise<Partial<Book>> {
    return await this.bookService.update(idx, dto, user);
  }

  @Delete(':idx')
  public async delete(
    @UUIDParam('idx') index: string,
    @AuthUser<User>() user: User,
  ): Promise<void> {
    return await this.bookService.delete(index, user);
  }
}
