import { wrap } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { User } from 'src/entities/user.entity';
import { BookRepository } from 'src/repositories/book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly bookRepo: BookRepository) {}

  public async create(
    createBookDto: CreateBookDto,
    user: User,
  ): Promise<Partial<Book>> {
    const newBook = this.bookRepo.create({ user, ...createBookDto });
    await this.bookRepo.persistAndFlush(newBook);

    return newBook;
  }

  public async list(userId: number): Promise<Book[]> {
    return await this.bookRepo.find({ user: userId }, { orderBy: { id: -1 } });
  }

  public async read(idx: string, user: User): Promise<Book> {
    return await this.bookRepo.findOne({ idx, user });
  }

  public async update(
    idx: string,
    updateBookDto: UpdateBookDto,
    user: User,
  ): Promise<Partial<Book>> {
    const book = await this.bookRepo.findOne({ idx, user });

    if (!book) throw new NotFoundException('Cannot find this book');

    wrap(book).assign(updateBookDto);

    await this.bookRepo.persistAndFlush(book);

    return book;
  }

  public async delete(idx: string, { id: user }: User): Promise<void> {
    const book = await this.bookRepo.findOne({ idx, user });

    return await this.bookRepo.softRemoveAndFlush(book);
  }
}
