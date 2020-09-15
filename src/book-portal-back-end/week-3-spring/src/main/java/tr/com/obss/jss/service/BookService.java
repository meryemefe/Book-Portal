package tr.com.obss.jss.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.entity.Author;
import tr.com.obss.jss.entity.Book;
import tr.com.obss.jss.model.BookDTO;
import tr.com.obss.jss.repo.AuthorRepository;
import tr.com.obss.jss.repo.BookRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    // Final variables
    private static final String BOOK_NOT_FOUND = "Book is not found!";
    private static final String AUTHOR_NOT_FOUND = "Author is not found!";

    // Properties
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private AuthorRepository authorRepository;

    /**
     * This is util method to be used for saving and updating a book.
     * @param bookDTO
     * @param book
     * @return
     */
    private Book getBook(BookDTO bookDTO, Book book) {
        book.setName(bookDTO.getName());
        book.setIsbn(bookDTO.getIsbn());
        book.setPublisher(bookDTO.getPublisher());
        book.setPublicationYear(bookDTO.getPublicationYear());
        book.setCategory(bookDTO.getCategory());
        book.setLanguage(bookDTO.getLanguage());

        return bookRepository.save(book);
    }

    /**
     * This method saves a new book.
     * @param bookDTO
     * @return
     */
    public Book save(BookDTO bookDTO){
        Book book = new Book();
        return getBook(bookDTO, book);
    }

    /**
     * This method updates the book information.
     * @param id
     * @param bookDTO
     * @return
     */
    public Book update(long id, BookDTO bookDTO){
        Optional<Book> byId = bookRepository.findById(id);
        if(byId.isPresent()){
            Book book = byId.get();
            return getBook(bookDTO, book);
        }
        throw new IllegalArgumentException(BOOK_NOT_FOUND);
    }

    /**
     *
     * @param bookId
     * @param authorId
     * @return
     */
    public Book addAuthors(long bookId, List<Long> authorId){
        Optional<Book> book = bookRepository.findById(bookId);
        if(book.isPresent()){
            List<Author> authors = new ArrayList<>();
            for(int i= 0; i< authorId.size(); i++){
                Optional<Author> author = authorRepository.findById(authorId.get(i));
                if(author.isPresent()){
                    authors.add(author.get());
                } else {
                    throw new IllegalArgumentException(AUTHOR_NOT_FOUND);
                }
            }
            book.get().setAuthors(authors);
            bookRepository.save(book.get());
            return book.get();
        }
        throw new IllegalArgumentException(BOOK_NOT_FOUND);

    }

    /**
     * This method lists all the books.
     * @param pageSize
     * @param pageNumber
     * @return
     */
    public Page<Book> findAll(int pageSize, int pageNumber, String name){
        Pageable paged = PageRequest.of( pageNumber, pageSize);
        if( name.equals("")){
            return bookRepository.findAllByActiveTrue(paged);
        } else {
            return bookRepository.findByNameContainsAndActiveTrue(name, paged);
        }
    }

    /**
     *
     * @param id
     * @return
     */
    public Book delete(long id){
        Optional<Book> byId = bookRepository.findById(id);
        if( byId.isPresent()){
            Book book = byId.get();
            book.setActive(!book.isActive());
            return bookRepository.save(book);
        }
        throw new IllegalArgumentException(BOOK_NOT_FOUND);
    }

}