import { PrismaClient } from "@prisma/client"
import { date_to_day } from "./BookDepository.service";
import { log } from "@/configs/logger";

const prisma = new PrismaClient();

/**
 * Класс для управление книгами посредством библиотеки Prisma
 */
class BooksSqlite {

    /**
     * Генерирует книги для БД
     * @param num Число генераций
     */
    static async generateBooks(num: number = 10) {
        for (let i = 0; i<num; i++) {
            let name = `book${i}`
            prisma.books.create({
                data: {
                    title: name,
                    date: date_to_day(),
                    readed: false,
                }
            })
            log.debug("(generateBooks): Книга была добавлена!");
        }
    }
    
    /**
     * Возврращает все книги из БД
     * @returns Вывод всех книг
     */
    static async getAllBooks () {
        const result =  prisma.books.findMany();
        return result;
    }
}

export default BooksSqlite 