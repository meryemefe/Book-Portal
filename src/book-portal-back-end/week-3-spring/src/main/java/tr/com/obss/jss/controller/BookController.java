package tr.com.obss.jss.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.entity.Book;
import tr.com.obss.jss.model.BookDTO;
import tr.com.obss.jss.service.BookService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    // Properties
    private BookService bookService;

    // Constructor
    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }


    /**
     * This method saves a new book to database.
     * @param bookDTO
     * @return
     */
    @PostMapping("")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> post(@Valid @RequestBody BookDTO bookDTO){

        Book book = bookService.save(bookDTO);
        return ResponseEntity.ok(book);
    }

    /**
     * This method updates the book information.
     * @param id
     * @param bookDTO
     * @return
     */
    @PutMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable long id, @Valid @RequestBody BookDTO bookDTO){
        Book book = bookService.update(id, bookDTO);
        return ResponseEntity.ok(book);
    }

    /**
     * This method sets the author list of th book.
     * @param bookId
     * @param authorId
     * @return
     */
    @GetMapping("/add-author")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addAuthor(@RequestParam(name = "bookId", defaultValue = "0") long bookId,
                                       @RequestParam(name = "authorId", defaultValue = "0")List<Long> authorId){
        return ResponseEntity.ok(bookService.addAuthors(bookId, authorId));
    }

    /**
     * This method returns all the books in the page format by searching name.
     * @param pageSize
     * @param pageNumber
     * @param name
     * @return
     */
    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                 @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                 @RequestParam(name = "name", defaultValue = "") String name){
        return ResponseEntity.ok(bookService.findAll(pageSize, pageNumber, name));
    }

    /**
     * This method updates the authors of the book.
     * @param id
     * @param authorId
     * @return
     */
    @PutMapping("/update-author/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateAuthor(@PathVariable long id, @Valid @RequestBody List<Long> authorId){
        return ResponseEntity.ok(bookService.addAuthors(id, authorId));
    }

    /**
     * This method performs delete and re-save operations by changing "active" status of book entity.
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable long id){
        Book book = bookService.delete(id);
        return ResponseEntity.ok(book);
    }
}