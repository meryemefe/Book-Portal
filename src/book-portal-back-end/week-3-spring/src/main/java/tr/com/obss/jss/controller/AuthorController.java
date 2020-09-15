package tr.com.obss.jss.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.jss.entity.Author;
import tr.com.obss.jss.model.AuthorDTO;
import tr.com.obss.jss.service.AuthorService;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {


    // Properties
    private AuthorService authorService;

    // Constructor
    @Autowired
    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }


    /**
     * This method saves a new author to database.
     * @param authorDTO
     * @return
     */
    @PostMapping("")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> post(@Valid @RequestBody AuthorDTO authorDTO){

        Author author = authorService.save(authorDTO);
        return ResponseEntity.ok(author);
    }

    /**
     * This method updates author information.
     * @param id
     * @param authorDTO
     * @return
     */
    @PutMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable long id, @Valid @RequestBody AuthorDTO authorDTO){
        Author author = authorService.update(id, authorDTO);
        return ResponseEntity.ok(author);
    }

    /**
     * This method gets the authors in the page format by searching the given name.
     * @param pageSize
     * @param pageNumber
     * @param fullname
     * @return
     */
    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> get(@RequestParam(name = "pageSize", defaultValue = "10") int pageSize,
                                 @RequestParam(name = "pageNumber", defaultValue = "0") int pageNumber,
                                 @RequestParam(name = "fullname", defaultValue = "") String fullname){
        return ResponseEntity.ok(authorService.findAll(pageSize, pageNumber, fullname));
    }

    /**
     * This method just returns list of all the authors.
     * @return
     */
    @GetMapping("/list")
    @ResponseBody
    public ResponseEntity<?> get(){
        return ResponseEntity.ok(authorService.findAll());
    }

    /**
     * This method performs delete and re-save operations by changing "active" status of author entity.
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable long id){
        Author author = authorService.delete(id);
        return ResponseEntity.ok(author);
    }
}
