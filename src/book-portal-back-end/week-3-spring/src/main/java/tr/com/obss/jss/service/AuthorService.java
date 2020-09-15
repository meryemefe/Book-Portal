package tr.com.obss.jss.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tr.com.obss.jss.entity.Author;
import tr.com.obss.jss.model.AuthorDTO;
import tr.com.obss.jss.repo.AuthorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    // Final variables
    private static final String AUTHOR_NOT_FOUND = "Author is not found!";

    //Properties
    @Autowired
    private AuthorRepository authorRepository;

    /**
     * This method saves a new author.
     * @param authorDTO
     * @return
     */
    public Author save(AuthorDTO authorDTO){
        Optional<Author> author = authorRepository.findByAuthorDTOInfo(authorDTO.getName(), authorDTO.getSurname(), authorDTO.getBirthYear(), authorDTO.getDeathYear());
        if(author.isPresent()){
            author.get().setActive(true);
            return authorRepository.save(author.get());
        } else {
            Author savedAuthor = new Author();
            savedAuthor.setName(authorDTO.getName());
            savedAuthor.setSurname(authorDTO.getSurname());
            savedAuthor.setBirthYear(authorDTO.getBirthYear());
            savedAuthor.setDeathYear(authorDTO.getDeathYear());
            return authorRepository.save(savedAuthor);
        }
    }

    /**
     * This method updates author information.
     * @param id
     * @param authorDTO
     * @return
     */
    public Author update(long id, AuthorDTO authorDTO){
        Optional<Author> byId = authorRepository.findById(id);
        if(byId.isPresent()){
            Author author = byId.get();
            author.setName(authorDTO.getName());
            author.setSurname(authorDTO.getSurname());
            author.setBirthYear(authorDTO.getBirthYear());
            author.setDeathYear(authorDTO.getDeathYear());

            return authorRepository.save(author);
        }
        throw new IllegalArgumentException(AUTHOR_NOT_FOUND);
    }

    /**
     * This method lists all the authors.
     * @param pageSize
     * @param pageNumber
     * @return
     */
    public Page<Author> findAll(int pageSize, int pageNumber, String fullname){
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        if(fullname.equals("")){
            return authorRepository.findAllByActiveTrue(paged);
        } else {
            return authorRepository.findByNameContainsAndActiveTrue(fullname, paged);
        }
    }

    /**
     * This method deactivates the given user.
     * @param id
     * @return deleted user
     */
    public Author delete(long id){
        Optional<Author> byId = authorRepository.findById(id);
        if( byId.isPresent()){
            Author author = byId.get();
            author.setActive(!author.isActive());
            return authorRepository.save(author);
        }
        throw new IllegalArgumentException(AUTHOR_NOT_FOUND);
    }


    public List<Author> findAll(){
        return authorRepository.findAll();
    }

}